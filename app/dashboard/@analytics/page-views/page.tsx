/**
 * Page Views Analytics Page
 * 
 * This page is rendered within the @analytics slot when navigating to /dashboard/page-views
 */
export default function PageViewsPage() {
  const pageViewsData = [
    { page: "/", views: 12453, change: "+12.5%" },
    { page: "/dashboard", views: 8921, change: "+8.3%" },
    { page: "/products", views: 5432, change: "-2.1%" },
    { page: "/about", views: 3210, change: "+5.7%" },
    { page: "/contact", views: 1876, change: "+15.2%" },
  ];

  return (
    <div>
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-1">
          Page Views Analytics
        </h3>
        <p className="text-sm text-gray-500">
          Track your most visited pages and their performance
        </p>
      </div>

      <div className="space-y-2">
        {pageViewsData.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-white font-semibold text-xs">
                {index + 1}
              </div>
              <div>
                <p className="font-medium text-gray-800">{item.page}</p>
                <p className="text-sm text-gray-500">
                  {item.views.toLocaleString()} views
                </p>
              </div>
            </div>
            
            <span
              className={`text-sm font-medium ${
                item.change.startsWith("+")
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {item.change}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-3 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600 mb-1">Total Views</p>
          <p className="text-2xl font-bold text-blue-700">31.9K</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600 mb-1">Avg. Time</p>
          <p className="text-2xl font-bold text-green-700">2:34</p>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600 mb-1">Bounce Rate</p>
          <p className="text-2xl font-bold text-purple-700">42%</p>
        </div>
      </div>
    </div>
  );
}
