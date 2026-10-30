/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Celebrare - Frontend Intern Pre-Screening Assignment
 * Photo Gallery Web App in React + Vite + Tailwind CSS
 */

import React from 'react';
import { Gallery } from './components/Gallery';
import { Image as ImageIcon } from 'lucide-react';

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-indigo-100 selection:text-indigo-900">
      {/* Top Header */}
      <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-xs">
              <ImageIcon className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-900 tracking-tight text-base sm:text-lg">
                  Celebrare Gallery
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-md bg-purple-100 text-purple-800">
                  Photo App
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                React • Vite • Tailwind • Picsum Photos API
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Gallery Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Gallery />
      </main>

      {/* Clean Footer */}
      <footer className="bg-white border-t border-slate-200 mt-16 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            Celebrare Frontend React Internship Pre-Screening Assignment
          </p>
          <span className="text-slate-400">
            React 19 • Tailwind CSS • Vite
          </span>
        </div>
      </footer>
    </div>
  );
}
