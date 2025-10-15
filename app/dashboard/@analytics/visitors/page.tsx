/**
 * Visitors Analytics Page
 * 
 * This page is rendered within the @analytics slot when navigating to /dashboard/visitors
 */
export default function VisitorsPage() {
  const visitorsData = [
    { country: "United States", visitors: 8234, percentage: 35 },
    { country: "United Kingdom", visitors: 4521, percentage: 19 },
    { country: "Canada", visitors: 3412, percentage: 14 },
    { country: "Germany", visitors: 2876, percentage: 12 },
    { country: "Australia", visitors: 2341, percentage: 10 },
    { country: "Others", visitors: 2398, percentage: 10 },
  ];

  return (
    <div>
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-1">
          Visitor Analytics
        </h3>
        <p className="text-sm text-gray-500">
          Geographic distribution of your visitors
        </p>
      </div>

      <div className="space-y-3">
        {visitorsData.map((item, index) => (
          <div key={index} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{getCountryFlag(item.country)}</span>
                <span className="font-medium text-gray-800">{item.country}</span>
              </div>
              <div className="text-right">
                <p className="font-semibold text-gray-800">
                  {item.visitors.toLocaleString()}
                </p>
                <p className="text-xs text-gray-500">{item.percentage}%</p>
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all"
                style={{ width: `${item.percentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="bg-indigo-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600 mb-1">Total Visitors</p>
          <p className="text-2xl font-bold text-indigo-700">23.8K</p>
          <p className="text-xs text-green-600 mt-1">↑ 18% from last week</p>
        </div>
        <div className="bg-orange-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600 mb-1">New Visitors</p>
          <p className="text-2xl font-bold text-orange-700">14.2K</p>
          <p className="text-xs text-green-600 mt-1">↑ 24% from last week</p>
        </div>
      </div>
    </div>
  );
}

function getCountryFlag(country: string): string {
  const flags: Record<string, string> = {
    "United States": "🇺🇸",
    "United Kingdom": "🇬🇧",
    "Canada": "🇨🇦",
    "Germany": "🇩🇪",
    "Australia": "🇦🇺",
    "Others": "🌍",
  };
  return flags[country] || "🌍";
}
