import { Modal } from "@/components/modal";

interface PhotoModalPageProps {
  params: Promise<{
    id: string;
  }>;
}

/**
 * Intercepted Photo Route (Modal)
 * 
 * This route is shown when navigating to /gallery/photo/[id] via client-side navigation.
 * The (.) convention intercepts the route at the same segment level.
 * It displays the photo in a modal overlay without navigating away from the gallery.
 */
export default async function PhotoModalPage({ params }: PhotoModalPageProps) {
  const { id } = await params;
  const photo = getPhotoData(id);

  return (
    <Modal>
      <div className="p-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {photo.title}
          </h2>
          <p className="text-sm text-gray-500">
            Photo #{photo.id} • Opened via Intercepted Route
          </p>
        </div>

        <div className="mb-6">
          <div
            className={`w-full h-[400px] rounded-lg bg-gradient-to-br ${photo.color} flex items-center justify-center`}
          >
            <div className="text-white text-8xl">📷</div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-sm text-green-800">
              <strong>✅ Intercepted Route Active</strong> - This modal was opened using the 
              intercepted route at <code className="bg-green-100 px-2 py-0.5 rounded">
              @modal/(.)photo/[id]/page.tsx</code>
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm font-semibold text-gray-700 mb-2">Photo Details</p>
              <dl className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <dt className="text-gray-600">ID:</dt>
                  <dd className="font-medium text-gray-900">{photo.id}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-600">Resolution:</dt>
                  <dd className="font-medium text-gray-900">4K</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-600">Format:</dt>
                  <dd className="font-medium text-gray-900">JPEG</dd>
                </div>
              </dl>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm font-semibold text-gray-700 mb-2">Modal Features</p>
              <ul className="space-y-1 text-xs text-gray-600">
                <li>✓ ESC key to close</li>
                <li>✓ Click backdrop to close</li>
                <li>✓ Browser back button</li>
                <li>✓ Preserves gallery state</li>
              </ul>
            </div>
          </div>

          <div className="text-sm text-gray-600">
            <p>
              <strong>Note:</strong> The URL shows <code className="bg-gray-100 px-2 py-0.5 rounded">
              /gallery/photo/{id}</code>, making this modal <strong>shareable</strong>. However, accessing 
              this URL directly (refresh or new tab) will show the full page version instead.
            </p>
          </div>
        </div>
      </div>
    </Modal>
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
