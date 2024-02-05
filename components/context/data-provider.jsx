'use client';

import { createContext, useState } from 'react';

export const DataContext = createContext(null);

export default function DataProvider({ children }) {
  const [section, setSection] = useState('anime');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  return (
    <DataContext.Provider
      value={{
        section,
        setSection,
        user,
        setUser,
        loading,
        setLoading,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}
