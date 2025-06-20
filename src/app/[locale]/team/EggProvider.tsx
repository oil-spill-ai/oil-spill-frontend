"use client";
import React, { createContext, useContext, useState } from "react";

type EggContextType = {
  isSettings: boolean;
  setIsSettings: (v: boolean) => void;
};

const EggContext = createContext<EggContextType | undefined>(undefined);

export const EggProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSettings, setIsSettings] = useState(false);
  return (
    <EggContext.Provider value={{ isSettings, setIsSettings }}>
      {children}
      <EggButton />
    </EggContext.Provider>
  );
};

export function useEgg() {
  const ctx = useContext(EggContext);
  if (!ctx) throw new Error("useEgg must be used within EggProvider");
  return ctx;
}

// Невидимая кнопка-пасхалка
const EggButton: React.FC = () => {
  const { setIsSettings, isSettings } = useEgg();
  return (
    <button
      aria-label="egg"
      style={{ position: 'fixed', right: 0, bottom: 0, width: 40, height: 40, opacity: 0, zIndex: 50 }}
      onClick={() => setIsSettings(!isSettings)}
      tabIndex={-1}
    />
  );
}; 