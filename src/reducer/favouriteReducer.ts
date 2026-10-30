/**
 * Celebrare - Frontend Intern Pre-Screening Assignment
 * Requirement 5: Favourite Management with pure useReducer
 * 
 * Pure reducer function for favourites state transitions.
 * No side effects (localStorage operations moved to React component useEffect).
 */

import { FavouritesAction, FavouritesState } from '../types';

export const FAVOURITES_STORAGE_KEY = 'celebrare_favourite_photo_ids';

/**
 * Lazy initializer for useReducer.
 * Loads saved favourites from browser localStorage on initialization.
 */
export function initFavourites(): FavouritesState {
  if (typeof window === 'undefined') return [];
  try {
    const stored = localStorage.getItem(FAVOURITES_STORAGE_KEY);
    if (!stored) return [];
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error('Failed to load favourites from localStorage:', error);
    return [];
  }
}

/**
 * Pure reducer function for favourites.
 * Returns new state immutably without side effects.
 */
export function favouriteReducer(
  state: FavouritesState,
  action: FavouritesAction
): FavouritesState {
  switch (action.type) {
    case 'TOGGLE_FAVOURITE': {
      const photoId = action.payload;
      const isAlreadyFav = state.includes(photoId);

      return isAlreadyFav
        ? state.filter((id) => id !== photoId)
        : [...state, photoId];
    }

    case 'CLEAR_ALL': {
      return [];
    }

    default:
      return state;
  }
}
