import { useEffect, useRef, type KeyboardEvent } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

export const isVideo = (src: string) => src.toLowerCase().endsWith(".mp4");

interface LightboxProps {
  items: string[];
  index: number;
  label: string;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

/**
 * Full-screen viewer for gallery media.
 * Keyboard: Escape closes, Left/Right move between items (wrapping), Tab stays inside the dialog.
 * Page scroll is locked while open, and focus goes back to the tile that opened it on close.
 */
export function Lightbox({ items, index, label, onClose, onNavigate }: LightboxProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const src = items[index];
  const hasMany = items.length > 1;

  const prev = () => onNavigate((index - 1 + items.length) % items.length);
  const next = () => onNavigate((index + 1) % items.length);

  // Remember the opener, lock scroll and move focus in; undo all three on close.
  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = previousOverflow;
      opener?.focus();
    };
  }, []);

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") return onClose();
    if (hasMany && e.key === "ArrowLeft") return prev();
    if (hasMany && e.key === "ArrowRight") return next();
    if (e.key !== "Tab") return;
    // Trap focus: wrap from the last control to the first and back.
    const focusable = dialogRef.current?.querySelectorAll<HTMLElement>("button, video[controls]");
    if (!focusable?.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  const controlClass =
    "absolute rounded-full bg-black/60 p-3 text-white hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={label}
      onKeyDown={onKeyDown}
      onClick={(e) => e.target === e.currentTarget && onClose()}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 md:p-12"
    >
      {isVideo(src) ? (
        <video key={src} src={src} className="max-h-full max-w-full rounded-lg" controls autoPlay playsInline />
      ) : (
        <img src={src} alt={label} className="max-h-full max-w-full rounded-lg object-contain" />
      )}

      <button ref={closeRef} type="button" onClick={onClose} aria-label="Close viewer" className={`${controlClass} right-4 top-4`}>
        <X aria-hidden="true" className="h-6 w-6" />
      </button>

      {hasMany && (
        <>
          <button type="button" onClick={prev} aria-label="Previous item" className={`${controlClass} left-4 top-1/2 -translate-y-1/2`}>
            <ChevronLeft aria-hidden="true" className="h-6 w-6" />
          </button>
          <button type="button" onClick={next} aria-label="Next item" className={`${controlClass} right-4 top-1/2 -translate-y-1/2`}>
            <ChevronRight aria-hidden="true" className="h-6 w-6" />
          </button>
          <p aria-live="polite" className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/60 px-4 py-1 text-sm text-white">
            {index + 1} / {items.length}
          </p>
        </>
      )}
    </div>
  );
}
