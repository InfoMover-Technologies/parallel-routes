import Gallery from "@/components/Gallery";

/**
 * Gallery Main Page
 * 
 * Displays a grid of photos using the shared Gallery component.
 * When clicked via Link, photos open in a modal through parallel routes.
 * 
 * Features:
 * - Real-time updates when photo titles are edited in the modal
 * - Uses Context to share state with modal
 * - Reuses Gallery component to avoid code duplication
 */
export default function GalleryPage() {
  return <Gallery />;
}
