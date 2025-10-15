import Link from "next/link";

/**
 * Gallery Main Page
 * 
 * Displays a grid of photos. When clicked via Link, photos open in a modal
 * through the intercepted route. Direct navigation opens the full page.
 */
export default function GalleryPage() {
  const photos = [
    { id: "1", title: "Mountain Sunrise", color: "from-orange-400 to-pink-500" },
    { id: "2", title: "Ocean Waves", color: "from-blue-400 to-cyan-500" },
    { id: "3", title: "Forest Path", color: "from-green-400 to-emerald-600" },
    { id: "4", title: "Desert Dunes", color: "from-yellow-400 to-orange-500" },
    { id: "5", title: "City Lights", color: "from-purple-400 to-indigo-600" },
    { id: "6", title: "Northern Lights", color: "from-teal-400 to-green-500" },
    { id: "7", title: "Autumn Colors", color: "from-red-400 to-yellow-500" },
    { id: "8", title: "Snowy Peaks", color: "from-slate-300 to-blue-400" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Photo Gallery - Modal with Intercepting Routes
          </h1>
          <p className="text-gray-600 mb-4">
            Click any photo to open it in a modal. The modal uses intercepting routes
            to provide a seamless experience.
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-2 text-sm">
            <p className="text-blue-800">
              <strong>🎯 Try these behaviors:</strong>
            </p>
            <ul className="list-disc list-inside ml-4 space-y-1 text-blue-700">
              <li>Click a photo → Opens in modal at /photo/[id] URL</li>
              <li>Press ESC or click backdrop → Closes modal, returns to gallery</li>
              <li>Browser back button → Closes modal, returns to gallery</li>
              <li>Right-click photo → Open in new tab → Full page view at /photo/[id]</li>
              <li>Refresh on modal → Shows full page (direct route)</li>
            </ul>
          </div>
        </header>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {photos.map((photo) => (
            <Link
              key={photo.id}
              href={`/photo/${photo.id}`}
              className="group relative aspect-square rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${photo.color}`} />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center p-4">
                  <div className="text-white text-4xl mb-2">📷</div>
                  <h3 className="text-white font-semibold text-lg group-hover:scale-110 transition-transform">
                    {photo.title}
                  </h3>
                  <p className="text-white/80 text-sm mt-1">Photo #{photo.id}</p>
                </div>
              </div>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
            </Link>
          ))}
        </div>

        <div className="mt-8 bg-gray-50 border border-gray-200 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">
            How Intercepting Routes Work
          </h2>
          <div className="space-y-2 text-sm text-gray-600">
            <p>
              <strong>File Structure:</strong>
            </p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li><code className="bg-gray-200 px-2 py-0.5 rounded">@modal/(...)photo/[id]/page.tsx</code> - Intercepted route (modal)</li>
              <li><code className="bg-gray-200 px-2 py-0.5 rounded">photo/[id]/page.tsx</code> - Direct route (full page)</li>
            </ul>
            <p className="mt-3">
              <strong>The (...) convention</strong> intercepts routes from the app root level.
              When navigating via <code className="bg-gray-200 px-2 py-0.5 rounded">Link</code> from the gallery, 
              the intercepted route is shown as a modal. Direct URL access or page refresh uses the original route.
              The photo URL is <code className="bg-gray-200 px-2 py-0.5 rounded">/photo/[id]</code>, not nested under /gallery.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
