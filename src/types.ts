/**
 * Celebrare - Frontend Intern Pre-Screening Assignment
 * Type Definitions
 */

export interface Photo {
  id: string;
  author: string;
  width: number;
  height: number;
  url: string;
  download_url: string;
}

export type FavouritesAction =
  | { type: 'TOGGLE_FAVOURITE'; payload: string }
  | { type: 'CLEAR_ALL' };

export type FavouritesState = string[];
