# Celebrare — Frontend Intern Pre-Screening Assignment
## Photo Gallery Web Application

A responsive Photo Gallery web application built with **React, Vite, and Tailwind CSS**. The app fetches 30 photos from the Picsum Photos API, displays them in a responsive grid, allows real-time search filtering by photographer name, and provides favourite toggling managed via `useReducer` and persisted in `localStorage`.

Built strictly according to the **Celebrare Frontend React Internship Pre-Screening Assignment** specifications.

---

## 🛠️ Technologies Used

- **React 19** (Functional components and React Hooks only)
- **Vite** (Build tool and fast development server)
- **Tailwind CSS v4** (Utility-first styling without external UI component libraries)
- **TypeScript** (Type safety and clean interfaces)
- **Lucide React** (Icons: Search, Heart, Loader, Alert)

---

## 📂 Project Folder Structure

```text
├── src/
│   ├── components/
│   │   ├── Gallery.tsx              # Main gallery container (responsive grid, search, useEffect persistence)
│   │   ├── PhotoCard.tsx            # Photo card (image, photographer name, single heart toggle button)
│   │   └── SearchBar.tsx            # Search input component receiving useCallback handler
│   ├── hooks/
│   │   └── useFetchPhotos.ts        # Custom hook fetching photos from Picsum API
│   ├── reducer/
│   │   └── favouriteReducer.ts      # Pure useReducer function for favourites state transitions
│   ├── types.ts                     # TypeScript interfaces (Photo, FavouritesAction, FavouritesState)
│   ├── App.tsx                      # Root application layout
│   ├── main.tsx                     # React DOM entry point
│   └── index.css                    # Tailwind CSS imports
├── index.html                       # HTML entry point with metadata
├── package.json                     # Clean dependencies without unused packages
├── tsconfig.json                    # TypeScript configuration
└── vite.config.ts                   # Vite configuration
```

---

## 🚀 Installation & Running the Application

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Development Server
```bash
npm run dev
```
Open your browser at `http://localhost:3000` (or the URL shown in terminal).

### 3. Build for Production
```bash
npm run build
```

---

## 🎯 Implementation of the 7 Core Requirements

| # | Requirement | How It Is Implemented | Code Location |
|---|---|---|---|
| **1** | **Project Setup** | Functional components and hooks only. Tailwind CSS used exclusively. No external UI libraries (no MUI, Ant Design, Bootstrap). | `package.json`, `src/index.css` |
| **2** | **Fetch Photos from API** | Fetches 30 photos on load from `https://picsum.photos/v2/list?limit=30`. Displays a loading spinner while fetching and an error message with retry button if fetch fails. | `src/hooks/useFetchPhotos.ts`, `src/components/Gallery.tsx` |
| **3** | **Responsive Grid** | Desktop (≥1024px): 4 columns (`lg:grid-cols-4`). Tablet (768px-1023px): 2 columns (`md:grid-cols-2`). Mobile (<768px): 1 column (`grid-cols-1`). Each card contains the photo, author name, and a single heart toggle button. | `src/components/Gallery.tsx`, `src/components/PhotoCard.tsx` |
| **4** | **Real-Time Search Filter** | Search input filters photos by author name in real time without page reload or additional API requests. | `src/components/SearchBar.tsx`, `src/components/Gallery.tsx` |
| **5** | **Favourites with `useReducer`** | Pure `favouriteReducer` handles `TOGGLE_FAVOURITE`. Side effects (`localStorage`) are decoupled and managed via `useEffect` in `Gallery.tsx`. Restored on refresh via `initFavourites`. | `src/reducer/favouriteReducer.ts`, `src/components/Gallery.tsx` |
| **6** | **Custom Hook (`useFetchPhotos`)** | Encapsulates all fetching logic and state into a custom hook. Returns `{ photos, loading, error }`. Used directly by `<Gallery />`. | `src/hooks/useFetchPhotos.ts`, `src/components/Gallery.tsx` |
| **7** | **`useCallback` + `useMemo`** | `useCallback` wraps the search filter handler. `useMemo` computes the filtered photo list. | `src/components/Gallery.tsx` |

---

## 🧠 Explanation of React Hooks Used

Be ready to explain these during your 5-minute video recording:

### 1. `useFetchPhotos` (Custom Hook)
- **Location:** `src/hooks/useFetchPhotos.ts`
- **What it returns:** An object containing `{ photos, loading, error, refetch }`.
- **What happens if the API fails:** When the network request fails or the server returns a non-200 status (`!response.ok`), the `catch` block captures the error, stores a descriptive error message in `error`, and sets `loading: false`. The `Gallery` component renders an error alert with a retry button instead of crashing.

### 2. `useReducer` (Favourites Management)
- **Location:** `src/reducer/favouriteReducer.ts` and `src/components/Gallery.tsx`
- **Why `useReducer` instead of `useState`?**
  1. `useReducer` keeps state transition logic centralized in a **pure function** outside the UI components.
  2. It makes state mutations predictable and easy to test without component coupling.
  3. It prevents stale closure bugs when multiple components trigger toggles.
- **Pure Function & Decoupled Persistence:**
  - `favouriteReducer` is a pure function: it receives `(state, action)` and immutably returns the next state without side effects.
  - Initial state is loaded from `localStorage` using the lazy initializer function `initFavourites()`.
  - Persistence is handled in `Gallery.tsx` using a dedicated `useEffect` listening to `[favourites]`, ensuring separation of concerns.

### 3. `useCallback` (Search Filter Handler)
- **Location:** `src/components/Gallery.tsx` (`handleSearchChange`)
- **What problem it solves:** In React, inline functions are re-created with new references on every render. Wrapping the handler in `useCallback` memoizes the function reference across renders.
- **Why it matters:** Passing a stable function to the memoized `SearchBar` component (`React.memo`) prevents `SearchBar` from re-rendering when unrelated state changes (such as toggling favourite hearts).

### 4. `useMemo` (Filtered Photos Calculation)
- **Location:** `src/components/Gallery.tsx` (`filteredPhotos`)
- **What problem it solves:** Filters the 30-item photo array by matching `photo.author` with the search query. `useMemo` memoizes the filtered array and only recomputes it when `photos` or `searchTerm` changes.
- **Why it matters:** When the user clicks the heart button to favourite a photo, `favourites` state changes and triggers a re-render. Because `filteredPhotos` is memoized with dependencies `[photos, searchTerm]`, React skips re-filtering the entire array during favourite toggles.

---

## 🎥 5-Minute Video Recording Guide

During your screen recording:
1. **Show the app working:**
   - Reload the page to show the loading spinner while fetching from Picsum.
   - Type in the search box (e.g., "Dan" or "Alejandro") to show real-time filtering without page reloads.
   - Click the heart button on 2–3 photos to toggle favourites.
   - Refresh the page (`F5` or `Ctrl+R`) to demonstrate that favourites persist from `localStorage`.
2. **Open `src/hooks/useFetchPhotos.ts`:**
   - Read the hook signature and explain what it returns (`photos`, `loading`, `error`).
   - Point to the `try/catch` block and explain error handling on API failure.
3. **Open `src/reducer/favouriteReducer.ts` and `src/components/Gallery.tsx`:**
   - Show that `favouriteReducer` is a pure function handling `TOGGLE_FAVOURITE`.
   - Show `useEffect` in `Gallery.tsx` saving favourites to `localStorage`.
   - Explain why `useReducer` was used instead of `useState`.
4. **Open `src/components/Gallery.tsx`:**
   - Point out `useCallback` on `handleSearchChange` and explain referential stability.
   - Point out `useMemo` on `filteredPhotos` and explain why recalculations are avoided during favourite toggles.
5. **Show one thing that was difficult & how you solved it:**
   - Discuss keeping the reducer pure by decoupling `localStorage` updates into a `useEffect` hook and using a lazy initializer (`initFavourites`) to safely restore stored state without hydration or parse crashes.
