/**
 * Celebrare - Frontend Intern Pre-Screening Assignment
 * Requirement 4 & 7: Search Input with useCallback handler
 */

import React from 'react';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClearSearch: () => void;
  totalCount: number;
  filteredCount: number;
}

export const SearchBar: React.FC<SearchBarProps> = React.memo(
  ({ searchTerm, onSearchChange, onClearSearch, totalCount, filteredCount }) => {
    return (
      <div className="w-full max-w-2xl mx-auto mb-8">
        <div className="relative flex items-center">
          <div className="absolute left-4 pointer-events-none text-slate-400">
            <Search className="w-5 h-5" aria-hidden="true" />
          </div>

          <input
            type="text"
            value={searchTerm}
            onChange={onSearchChange}
            placeholder="Search photos by author name (e.g. Alejandro, Dan)..."
            aria-label="Filter photos by author name"
            className="w-full pl-12 pr-12 py-3.5 bg-white border border-slate-200 rounded-xl shadow-xs text-slate-900 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-base transition-all duration-150"
          />

          {searchTerm && (
            <button
              type="button"
              onClick={onClearSearch}
              aria-label="Clear search input"
              className="absolute right-3.5 p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Live Filter Counter Indicator */}
        <div className="flex items-center justify-between text-xs sm:text-sm text-slate-500 mt-2 px-1">
          <span>
            {searchTerm.trim() ? (
              <>
                Showing <strong className="font-semibold text-slate-700">{filteredCount}</strong> of{' '}
                <strong className="font-semibold text-slate-700">{totalCount}</strong> photos matching &ldquo;{searchTerm}&rdquo;
              </>
            ) : (
              <>
                Showing all <strong className="font-semibold text-slate-700">{totalCount}</strong> fetched photos
              </>
            )}
          </span>
          {searchTerm.trim() && filteredCount === 0 && (
            <span className="text-amber-600 font-medium">No authors found</span>
          )}
        </div>
      </div>
    );
  }
);

SearchBar.displayName = 'SearchBar';
