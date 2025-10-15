import { ReactNode } from "react";

interface PhotoLayoutProps {
  children: ReactNode;
  gallery: ReactNode;
}

/**
 * Photo Layout
 * 
 * This layout ensures that when accessing /photo/[id] directly,
 * the photo modal is rendered over the gallery page.
 * When the modal closes, it navigates back to /gallery.
 */
export default function PhotoLayout({ children, gallery }: PhotoLayoutProps) {
  return (
    <>
      {gallery}
      {children}
    </>
  );
}
