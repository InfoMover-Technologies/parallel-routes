import { ReactNode } from "react";

interface GalleryLayoutProps {
  children: ReactNode;
}

/**
 * Gallery Layout
 * 
 * Simple layout for the gallery page. Photos open at /photo/[id]
 * which always renders as a modal over the gallery using parallel routes.
 * PhotoProvider is now in the parent app layout.
 */
export default function GalleryLayout({ children }: GalleryLayoutProps) {
  return children;
}
