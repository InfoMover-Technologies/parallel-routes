"use client";

import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useRef } from "react";

interface ModalProps {
  children: ReactNode;
}

/**
 * Reusable Modal Component
 * 
 * This modal is used with parallel routes and intercepting routes.
 * It closes on:
 * - Clicking the close button
 * - Clicking the backdrop
 * - Pressing the Escape key
 * - Using browser back navigation
 */
export function Modal({ children }: ModalProps) {
  const router = useRouter();
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    // Open the dialog when component mounts
    dialog.showModal();

    // Handle ESC key
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        router.back();
      }
    };

    dialog.addEventListener("keydown", handleEscape);

    return () => {
      dialog.removeEventListener("keydown", handleEscape);
    };
  }, [router]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    // Close when clicking on the backdrop (outside the content)
    if (e.target === e.currentTarget) {
      router.back();
    }
  };

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
            onClick={() => router.back()}
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
          {children}
        </div>
      </div>
    </dialog>
  );
}
