import Link from "next/link";

interface PhotoPageProps {
  params: Promise<{
    id: string;
  }>;
}

/**
 * Direct Photo Route (Full Page)
 * 
 * This route is shown when:
 * - Directly accessing /gallery/photo/[id] via URL
 * - Refreshing the page while viewing a photo modal
 * - Opening the link in a new tab
 * 
 * This provides a shareable, standalone page for each photo.
 */
export default async function PhotoPage({ params }: PhotoPageProps) {
  const { id } = await params;
  const photo = getPhotoData(id);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
              />
            </svg>
            Back to Gallery
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {photo.title}
            </h1>
            <p className="text-sm text-gray-500">
              Photo #{photo.id} • Full Page View
            </p>
          </div>

          <div className="mb-8">
            <div
              className={`w-full h-[500px] rounded-lg bg-gradient-to-br ${photo.color} flex items-center justify-center`}
            >
              <div className="text-white text-9xl">📷</div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-800">
                <strong>📄 Direct Route Active</strong> - This is the full page version of the photo, 
                accessed via the direct route at{" "}
                <code className="bg-blue-100 px-2 py-0.5 rounded">
                  photo/[id]/page.tsx
                </code>
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-sm font-semibold text-gray-700 mb-3">
                    Photo Information
                  </h3>
                  <dl className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Title:</dt>
                      <dd className="font-medium text-gray-900">{photo.title}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-600">ID:</dt>
                      <dd className="font-medium text-gray-900">{photo.id}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Resolution:</dt>
                      <dd className="font-medium text-gray-900">4K Ultra HD</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Format:</dt>
                      <dd className="font-medium text-gray-900">JPEG</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Size:</dt>
                      <dd className="font-medium text-gray-900">8.5 MB</dd>
                    </div>
                  </dl>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-sm font-semibold text-gray-700 mb-3">
                    How You Got Here
                  </h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-start gap-2">
                      <span>•</span>
                      <span>Direct URL access</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span>•</span>
                      <span>Page refresh while viewing modal</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span>•</span>
                      <span>Opened in new tab</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span>•</span>
                      <span>Shared URL link</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="text-sm font-semibold text-green-800 mb-2">
                    💡 Benefit of This Pattern
                  </h3>
                  <p className="text-xs text-green-700">
                    This photo has a <strong>shareable URL</strong> that works in both contexts:
                    modal (via navigation) and full page (via direct access). Best of both worlds!
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                Download Photo
              </button>
              <button className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm font-medium">
                Share
              </button>
              <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium">
                Add to Collection
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function getPhotoData(id: string) {
  const photos: Record<string, { id: string; title: string; color: string }> = {
    "1": { id: "1", title: "Mountain Sunrise", color: "from-orange-400 to-pink-500" },
    "2": { id: "2", title: "Ocean Waves", color: "from-blue-400 to-cyan-500" },
    "3": { id: "3", title: "Forest Path", color: "from-green-400 to-emerald-600" },
    "4": { id: "4", title: "Desert Dunes", color: "from-yellow-400 to-orange-500" },
    "5": { id: "5", title: "City Lights", color: "from-purple-400 to-indigo-600" },
    "6": { id: "6", title: "Northern Lights", color: "from-teal-400 to-green-500" },
    "7": { id: "7", title: "Autumn Colors", color: "from-red-400 to-yellow-500" },
    "8": { id: "8", title: "Snowy Peaks", color: "from-slate-300 to-blue-400" },
  };

  return photos[id] || photos["1"];
}
