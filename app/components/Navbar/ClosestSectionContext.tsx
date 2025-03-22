'use client'

import React, { createContext, useState, useEffect } from 'react';

export const ClosestSectionContext = createContext('');

interface ClosestSectionProviderProps {
  children: React.ReactNode;
}

const ClosestSectionProvider: React.FC<ClosestSectionProviderProps> = ({ children }) => {
  const [closestSectionId, setClosestSectionId] = useState('');

  useEffect(() => {
    const highlightClosestSection = () => {
      const sections = document.querySelectorAll('[id^="section-"]');
      let currentClosestSectionId = '';
      let maxVisibility = 0;

      sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        const visibleHeight = Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0);
        const totalHeight = rect.bottom - rect.top;
        const visibilityPercentage = (visibleHeight > 0) ? (visibleHeight / totalHeight) : 0;

        if (visibilityPercentage > maxVisibility) {
          maxVisibility = visibilityPercentage;
          currentClosestSectionId = section.id;
        }
      });
      setClosestSectionId(currentClosestSectionId); // Aktualizuj stan za pomocą wyznaczonej najbliższej sekcji
    };

    window.addEventListener('scroll', highlightClosestSection);
    setTimeout(() => {
      highlightClosestSection();
    }, 100);

    return () => window.removeEventListener('scroll', highlightClosestSection);
  }, []);

  return (
    <ClosestSectionContext.Provider value={closestSectionId}>
      {children}
    </ClosestSectionContext.Provider>
  );
};

export default ClosestSectionProvider