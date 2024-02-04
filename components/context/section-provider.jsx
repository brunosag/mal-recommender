'use client';

import { createContext, useState } from 'react';

export const SectionContext = createContext(null);

export default function SectionProvider({ children }) {
  const [section, setSection] = useState('anime');

  return (
    <SectionContext.Provider
      value={{
        section,
        setSection,
      }}
    >
      {children}
    </SectionContext.Provider>
  );
}
