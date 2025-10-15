"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

interface PhotoPageProps {
  params: Promise<{
    id: string;
  }>;
}

/**
 * Photo Modal Page
 * 
 * This page always renders as a modal over the gallery.
 * When closed, it navigates to /gallery.
 */
export default function PhotoPage({ params }: PhotoPageProps) {
  const router = useRouter();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [id, setId] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    params.then((p) => {
      setId(p.id);
      setIsOpen(true);
    });
  }, [params]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog || !isOpen) return;

    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      dialog.showModal();
    }, 10);

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        router.push("/gallery");
      }
    };

    dialog.addEventListener("keydown", handleEscape);

    return () => {
      clearTimeout(timer);
      dialog.removeEventListener("keydown", handleEscape);
    };
  }, [router, isOpen]);

  const handleClose = () => {
    router.push("/gallery");
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  const photo = id ? getPhotoData(id) : null;
  
  if (!photo) return <div className="hidden" />;

  return (
    <dialog
      ref={dialogRef}
      onClick={handleBackdropClick}
      className="fixed inset-0 z-50 backdrop:bg-black/70 bg-transparent p-0 max-w-none max-h-none w-full h-full"
    >
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="relative bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-auto">
          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors text-gray-600 hover:text-gray-900"
            aria-label="Close modal"
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* Modal content */}
          <div className="p-8">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {photo.title}
              </h2>
              <p className="text-sm text-gray-500">
                Photo #{photo.id} • Always Opens as Modal
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
                  <strong>✅ Modal Pattern Active</strong> - This photo is displayed as a modal 
                  regardless of how you accessed the URL. When closed, you'll be taken to the gallery.
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
                  <p className="text-sm font-semibold text-gray-700 mb-2">Close Methods</p>
                  <ul className="space-y-1 text-xs text-gray-600">
                    <li>✓ ESC key → /gallery</li>
                    <li>✓ Click backdrop → /gallery</li>
                    <li>✓ Close button → /gallery</li>
                    <li>✓ Always shows gallery underneath</li>
                  </ul>
                </div>
              </div>

              <div className="text-sm text-gray-600 bg-blue-50 border border-blue-200 rounded-lg p-3">
                <p>
                  <strong>💡 This Pattern:</strong> The URL <code className="bg-blue-100 px-2 py-0.5 rounded">
                  /photo/{id}</code> <strong>always</strong> displays the photo as a modal over the gallery. 
                  This works whether you navigate from the gallery or paste the URL directly. Closing the modal 
                  navigates to <code className="bg-blue-100 px-2 py-0.5 rounded">/gallery</code>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </dialog>
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
