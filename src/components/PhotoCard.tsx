/**
 * Celebrare - Frontend Intern Pre-Screening Assignment
 * Requirement 3: Photo Card with Photo, Author Name, and single Heart Toggle Button
 */

import React, { useState } from 'react';
import { Heart } from 'lucide-react';
import { Photo } from '../types';

interface PhotoCardProps {
  photo: Photo;
  isFavourite: boolean;
  onToggleFavourite: (id: string) => void;
}

export const PhotoCard: React.FC<PhotoCardProps> = React.memo(
  ({ photo, isFavourite, onToggleFavourite }) => {
    const [imageLoaded, setImageLoaded] = useState(false);
    const [imageError, setImageError] = useState(false);

    // Optimized Picsum thumbnail URL (600x420) for responsive loading
    const imageUrl = `https://picsum.photos/id/${photo.id}/600/420`;

    return (
      <div className="flex flex-col bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-xs hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
        {/* Photo Container */}
        <div className="relative aspect-4/3 w-full bg-slate-100 overflow-hidden">
          {/* Skeleton placeholder while image loads */}
          {!imageLoaded && !imageError && (
            <div className="absolute inset-0 bg-slate-200 animate-pulse" />
          )}

          {!imageError ? (
            <img
              src={imageUrl}
              alt={`Photo by ${photo.author}`}
              loading="lazy"
              onLoad={() => setImageLoaded(true)}
              onError={() => {
                setImageError(true);
                setImageLoaded(true);
              }}
              className={`w-full h-full object-cover transition-transform duration-500 hover:scale-105 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center p-4 text-slate-400 text-xs text-center">
              <span>Image unavailable</span>
            </div>
          )}
        </div>

        {/* Card Footer: Author Name & Single Heart Button */}
        <div className="p-4 flex items-center justify-between gap-3 bg-white">
          <div className="min-w-0 flex-1">
            <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-0.5">
              Photographer
            </p>
            <h3
              title={photo.author}
              className="font-semibold text-slate-800 text-sm truncate"
            >
              {photo.author}
            </h3>
          </div>

          {/* Single Heart Toggle Button */}
          <button
            type="button"
            onClick={() => onToggleFavourite(photo.id)}
            aria-label={
              isFavourite
                ? `Remove photo by ${photo.author} from favourites`
                : `Add photo by ${photo.author} to favourites`
            }
            aria-pressed={isFavourite}
            className={`p-2.5 rounded-xl border transition-all duration-200 cursor-pointer ${
              isFavourite
                ? 'bg-rose-50 border-rose-200 text-rose-600 hover:bg-rose-100'
                : 'bg-slate-50 border-slate-200 text-slate-400 hover:text-rose-500 hover:bg-rose-50/50 hover:border-rose-100'
            }`}
          >
            <Heart
              className={`w-5 h-5 transition-transform duration-200 ${
                isFavourite ? 'fill-rose-600 text-rose-600 scale-110' : ''
              }`}
            />
          </button>
        </div>
      </div>
    );
  }
);

PhotoCard.displayName = 'PhotoCard';
