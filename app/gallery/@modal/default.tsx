/**
 * Default fallback for the @modal slot
 * 
 * This returns null to ensure the modal slot doesn't render
 * when it's not active (i.e., when not viewing a photo).
 */
export default function DefaultModal() {
  return null;
}
