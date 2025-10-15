/**
 * Default fallback for the @analytics slot
 * 
 * This is rendered when the @analytics slot doesn't match the current URL
 * during a hard navigation (page refresh).
 */
export default function DefaultAnalytics() {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Analytics</h2>
        <span className="text-sm text-gray-500">@analytics slot (default)</span>
      </div>
      
      <p className="text-gray-600 text-sm bg-yellow-50 border border-yellow-200 rounded p-3">
        This is the <strong>default fallback</strong> for the @analytics slot. 
        Navigate to <strong>/dashboard/page-views</strong> or <strong>/dashboard/visitors</strong> 
        to see the tab group in action.
      </p>
    </div>
  );
}
