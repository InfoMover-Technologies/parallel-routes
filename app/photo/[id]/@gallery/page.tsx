import Link from "next/link";

/**
 * Gallery Slot within Photo Route
 * 
 * This renders the gallery page as a background when accessing /photo/[id] directly.
 * It provides the visual context that the modal appears over.
 */
export default function GallerySlot() {
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
              <li>Press ESC or click backdrop → Closes modal, shows gallery at /gallery</li>
              <li>Browser back button → Closes modal, shows gallery at /gallery</li>
              <li>Direct URL (/photo/[id]) → Opens modal over gallery</li>
              <li>All photo URLs work as modals over the gallery</li>
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
            How This Pattern Works
          </h2>
          <div className="space-y-2 text-sm text-gray-600">
            <p>
              <strong>File Structure:</strong>
            </p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li><code className="bg-gray-200 px-2 py-0.5 rounded">photo/[id]/layout.tsx</code> - Layout with @gallery slot</li>
              <li><code className="bg-gray-200 px-2 py-0.5 rounded">photo/[id]/page.tsx</code> - Photo modal</li>
              <li><code className="bg-gray-200 px-2 py-0.5 rounded">photo/[id]/@gallery/page.tsx</code> - Gallery background</li>
            </ul>
            <p className="mt-3">
              When you visit <code className="bg-gray-200 px-2 py-0.5 rounded">/photo/[id]</code>, 
              the layout renders both the gallery (via @gallery slot) and the modal (via children).
              This ensures photos always appear as modals over the gallery, even with direct URL access.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
