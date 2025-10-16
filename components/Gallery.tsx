"use client";

import Link from "next/link";
import { usePhotos } from "@/app/providers/PhotoProvider";

/**
 * Shared Gallery Component
 * 
 * Displays a grid of photos with real-time updates via PhotoProvider context.
 * Used by both /gallery page and the @gallery parallel slot in /photo/[id].
 * 
 * Features:
 * - Real-time updates when photo titles are edited
 * - Responsive grid layout
 * - Hover effects and transitions
 */
export default function Gallery() {
  const { photos } = usePhotos();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            [Photo] Gallery - Modal with Intercepting Routes
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
              <li>Gallery remains visible underneath the modal</li>
              <li>Press ESC or click backdrop → Closes modal, navigates to /gallery</li>
              <li>Copy /photo/[id] URL and paste in new tab → Opens as modal over gallery</li>
              <li>Direct URL access always shows modal over gallery</li>
            </ul>
          </div>
        </header>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {photos.map((photo) => (
            <Link
              key={photo.id}
              href={`/app/photo/${photo.id}`}
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
              <li><code className="bg-gray-200 px-2 py-0.5 rounded">photo/[id]/page.tsx</code> - Photo modal (client component)</li>
              <li><code className="bg-gray-200 px-2 py-0.5 rounded">photo/[id]/@gallery/page.tsx</code> - Gallery background</li>
            </ul>
            <p className="mt-3">
              <strong>Parallel Routes for Persistent Modals:</strong> The <code className="bg-gray-200 px-2 py-0.5 rounded">/photo/[id]</code> 
              route uses a layout with a <code className="bg-gray-200 px-2 py-0.5 rounded">@gallery</code> parallel slot. This ensures 
              the gallery always renders underneath the photo modal, regardless of how you access the URL. Closing the modal navigates to 
              <code className="bg-gray-200 px-2 py-0.5 rounded">/gallery</code>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
