import React, { createContext, useContext, useState, useEffect } from "react";

type ClassSlugContextType = {
  value: string;
  setValue: (val: string) => void;
};

const ClassSlugContext = createContext<ClassSlugContextType | undefined>(undefined);

export const ClassSlugProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [value, setValue] = useState(() => {
    return localStorage.getItem("classSlug") || "home";
  });

  useEffect(() => {
    localStorage.setItem("classSlug", value);
  }, [value]);

  return (
    <ClassSlugContext.Provider value={{ value, setValue }}>
      {children}
    </ClassSlugContext.Provider>
  );
};

export const useClassSlug = () => {
  const ctx = useContext(ClassSlugContext);
  if (!ctx) throw new Error("usePersistent must be used inside PersistentProvider");
  return ctx;
};
