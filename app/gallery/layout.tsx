import { ReactNode } from "react";

interface GalleryLayoutProps {
  children: ReactNode;
  modal: ReactNode;
}

/**
 * Gallery Layout with Modal Slot
 * 
 * This layout demonstrates using parallel routes with intercepting routes
 * to create a modal pattern that supports:
 * - Opening photos in a modal via client-side navigation
 * - Direct URL access to photos (shareable links)
 * - Proper handling of browser back/forward navigation
 * - Context preservation on page refresh
 */
export default function GalleryLayout({ children, modal }: GalleryLayoutProps) {
  return (
    <>
      {children}
      {modal}
    </>
  );
}
