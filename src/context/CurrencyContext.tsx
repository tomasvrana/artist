// CurrencyContext.tsx
import React, { createContext, useContext, useState, useEffect } from "react";

type CurrencyContextType = {
  value: string;
  setValue: (val: string) => void;
};

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [value, setValue] = useState(() => {
    return localStorage.getItem("myValue") || "CZK";
  });

  useEffect(() => {
    localStorage.setItem("myValue", value);
  }, [value]);

  return (
    <CurrencyContext.Provider value={{ value, setValue }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const ctx = useContext(CurrencyContext);
  if (!ctx) throw new Error("usePersistent must be used inside PersistentProvider");
  return ctx;
};
