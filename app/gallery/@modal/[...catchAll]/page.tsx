/**
 * Catch-all route for the @modal slot
 * 
 * This returns null for any route that doesn't match the intercepted photo route.
 * It's necessary to close the modal when navigating away from photo pages.
 * 
 * For example, when using a Link to navigate from /gallery/photo/1 to /gallery,
 * this catch-all ensures the modal slot returns null instead of trying to render
 * the previous modal content.
 */
export default function CatchAll() {
  return null;
}
