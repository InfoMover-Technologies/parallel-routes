import { ReactNode } from "react";
import { PhotoProvider } from "../providers/PhotoProvider";

interface GalleryLayoutProps {
  children: ReactNode;
}

/**
 * Gallery Layout
 * 
 * Simple layout for the gallery page. Photos open at /photo/[id]
 * which always renders as a modal over the gallery using parallel routes.
 * PhotoProvider is scoped to gallery/photo demos only.
 */
export default function GalleryLayout({ children }: GalleryLayoutProps) {
  return <PhotoProvider>{children}</PhotoProvider>;
}
