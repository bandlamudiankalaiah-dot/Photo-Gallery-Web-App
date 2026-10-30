/**
 * Celebrare - Frontend Intern Pre-Screening Assignment
 * Requirement 3, 4, 5, 6, 7:
 * - Uses custom hook useFetchPhotos
 * - Grid: 4 columns on desktop, 2 on tablet, 1 on mobile
 * - Search filter with useCallback
 * - Computed filtered photos with useMemo
 * - Favourites managed with useReducer and persisted in localStorage via useEffect
 */

import React, { useState, useReducer, useEffect, useCallback, useMemo } from 'react';
import { Loader2, AlertCircle, RefreshCw, Heart, Filter } from 'lucide-react';
import { useFetchPhotos } from '../hooks/useFetchPhotos';
import {
  favouriteReducer,
  initFavourites,
  FAVOURITES_STORAGE_KEY,
} from '../reducer/favouriteReducer';
import { SearchBar } from './SearchBar';
import { PhotoCard } from './PhotoCard';

export const Gallery: React.FC = () => {
  // Requirement 6: Custom Hook for fetching data
  const { photos, loading, error, refetch } = useFetchPhotos();

  // Requirement 5: useReducer for favourites
  const [favourites, dispatch] = useReducer(favouriteReducer, [], initFavourites);

  // Requirement 5: Persist favourites to localStorage using useEffect
  useEffect(() => {
    try {
      localStorage.setItem(FAVOURITES_STORAGE_KEY, JSON.stringify(favourites));
    } catch (err) {
      console.error('Failed to persist favourites to localStorage:', err);
    }
  }, [favourites]);

  // Search filter query state
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Requirement 7: useCallback on search filter handler
  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  }, []);

  // Handler to clear search with useCallback
  const handleClearSearch = useCallback(() => {
    setSearchTerm('');
  }, []);

  // Handler to toggle favourite with useCallback
  const handleToggleFavourite = useCallback((id: string) => {
    dispatch({ type: 'TOGGLE_FAVOURITE', payload: id });
  }, []);

  // Set lookup for O(1) performance during grid rendering
  const favouriteSet = useMemo(() => new Set(favourites), [favourites]);

  // Requirement 7: useMemo to compute filtered photos list
  const filteredPhotos = useMemo(() => {
    const trimmed = searchTerm.trim().toLowerCase();
    if (!trimmed) {
      return photos;
    }
    return photos.filter((photo) =>
      photo.author.toLowerCase().includes(trimmed)
    );
  }, [photos, searchTerm]);

  return (
    <div className="w-full">
      {/* Header Info & Stats Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <span>Explore Photos</span>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700 border border-indigo-100">
              Picsum API
            </span>
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Browse high-resolution photographs, filter by author in real-time, and save your favourites.
          </p>
        </div>

        {/* Favourites Counter Badge */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-4 py-2 bg-rose-50 border border-rose-200/70 rounded-xl text-rose-700 text-sm font-medium shadow-xs">
            <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
            <span>
              Favourites: <strong>{favourites.length}</strong>
            </span>
          </div>
        </div>
      </div>

      {/* Requirement 4 & 7: Search Input at Top */}
      <SearchBar
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        onClearSearch={handleClearSearch}
        totalCount={photos.length}
        filteredCount={filteredPhotos.length}
      />

      {/* Requirement 2: Loading State with Spinner */}
      {loading && (
        <div
          role="status"
          aria-live="polite"
          className="flex flex-col items-center justify-center py-20 px-4"
        >
          <div className="relative">
            <div className="w-16 h-16 rounded-full border-4 border-indigo-100 border-t-indigo-600 animate-spin" />
            <Loader2 className="w-6 h-6 text-indigo-600 absolute inset-0 m-auto animate-pulse" />
          </div>
          <p className="mt-4 text-base font-medium text-slate-700">
            Fetching photos from Picsum API...
          </p>
          <p className="text-xs text-slate-400 mt-1">
            Requesting 30 photos with author metadata
          </p>
        </div>
      )}

      {/* Requirement 2: Error State with Message and Retry Button */}
      {!loading && error && (
        <div
          role="alert"
          className="max-w-xl mx-auto my-12 p-6 bg-red-50/80 border border-red-200 rounded-2xl shadow-xs text-center"
        >
          <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-red-100 text-red-600 flex items-center justify-center">
            <AlertCircle className="w-6 h-6" />
          </div>
          <h2 className="text-lg font-bold text-red-900 mb-1">
            Unable to Load Photos
          </h2>
          <p className="text-sm text-red-700 mb-5">{error}</p>
          <button
            type="button"
            onClick={refetch}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-600 text-white font-medium text-sm hover:bg-red-700 transition shadow-xs cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" />
            Try Again
          </button>
        </div>
      )}

      {/* Empty State: No search results */}
      {!loading && !error && photos.length > 0 && filteredPhotos.length === 0 && (
        <div className="text-center py-16 px-4 bg-slate-50/70 border border-dashed border-slate-200 rounded-2xl max-w-xl mx-auto my-6">
          <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center">
            <Filter className="w-6 h-6" />
          </div>
          <h3 className="text-base font-semibold text-slate-800 mb-1">
            No photos found for &ldquo;{searchTerm}&rdquo;
          </h3>
          <p className="text-sm text-slate-500 mb-4">
            Try checking for typos or clear the search to view all {photos.length} photos.
          </p>
          <button
            type="button"
            onClick={handleClearSearch}
            className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-xl hover:bg-indigo-700 transition shadow-xs cursor-pointer"
          >
            Clear Search
          </button>
        </div>
      )}

      {/* Requirement 3: Responsive Grid
          - Desktop (lg: 1024px+): 4 columns
          - Tablet (md: 768px-1023px): 2 columns
          - Mobile (< 768px): 1 column
      */}
      {!loading && !error && filteredPhotos.length > 0 && (
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          data-testid="photo-grid"
        >
          {filteredPhotos.map((photo) => (
            <PhotoCard
              key={photo.id}
              photo={photo}
              isFavourite={favouriteSet.has(photo.id)}
              onToggleFavourite={handleToggleFavourite}
            />
          ))}
        </div>
      )}
    </div>
  );
};
