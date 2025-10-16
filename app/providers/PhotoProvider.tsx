"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

export interface Photo {
  id: string;
  title: string;
  color: string;
}

interface PhotoContextType {
  photos: Photo[];
  updatePhoto: (id: string, title: string) => void;
}

const PhotoContext = createContext<PhotoContextType | undefined>(undefined);

export function PhotoProvider({ children }: { children: ReactNode }) {
  const [photos, setPhotos] = useState<Photo[]>([
    { id: "1", title: "Mountain Sunrise", color: "from-orange-400 to-pink-500" },
    { id: "2", title: "Ocean Waves", color: "from-blue-400 to-cyan-500" },
    { id: "3", title: "Forest Path", color: "from-green-400 to-emerald-600" },
    { id: "4", title: "Desert Dunes", color: "from-yellow-400 to-orange-500" },
    { id: "5", title: "City Lights", color: "from-purple-400 to-indigo-600" },
    { id: "6", title: "Northern Lights", color: "from-teal-400 to-green-500" },
    { id: "7", title: "Autumn Colors", color: "from-red-400 to-yellow-500" },
    { id: "8", title: "Snowy Peaks", color: "from-slate-300 to-blue-400" },
  ]);

  const updatePhoto = (id: string, title: string) => {
    setPhotos((prevPhotos) =>
      prevPhotos.map((photo) =>
        photo.id === id ? { ...photo, title } : photo
      )
    );
  };

  return (
    <PhotoContext.Provider value={{ photos, updatePhoto }}>
      {children}
    </PhotoContext.Provider>
  );
}

export function usePhotos() {
  const context = useContext(PhotoContext);
  if (!context) {
    throw new Error("usePhotos must be used within a PhotoProvider");
  }
  return context;
}
