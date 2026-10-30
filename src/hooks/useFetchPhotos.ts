/**
 * Celebrare - Frontend Intern Pre-Screening Assignment
 * Requirement 6: Custom Hook (useFetchPhotos)
 * 
 * Fetches 30 photos on load from the Picsum Photos API.
 * Returns: { photos, loading, error, refetch }
 */

import { useState, useEffect, useCallback } from 'react';
import { Photo } from '../types';

const PICSUM_API_URL = 'https://picsum.photos/v2/list?limit=30';

export function useFetchPhotos() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPhotos = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(PICSUM_API_URL);

      if (!response.ok) {
        throw new Error(
          `Failed to fetch photos: Server responded with status ${response.status} (${response.statusText})`
        );
      }

      const data: Photo[] = await response.json();
      setPhotos(data);
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : 'An unexpected error occurred while fetching photos from Picsum API.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPhotos();
  }, [fetchPhotos]);

  return {
    photos,
    loading,
    error,
    refetch: fetchPhotos,
  };
}
