import Gallery from "@/components/Gallery";

/**
 * Gallery Slot within Photo Route
 * 
 * This renders the gallery page as a background when accessing /photo/[id] directly.
 * It provides the visual context that the modal appears over.
 * 
 * Uses the shared Gallery component to avoid code duplication with /gallery page.
 */
export default function GallerySlot() {
  return <Gallery />;
}
