"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Gallery } from "@/lib/gallery-shared";
import { assetUrl, formatBytes } from "@/lib/gallery-shared";

type Props = { gallery: Gallery };

/**
 * Galerie photo client : grille masonry + lightbox + téléchargement.
 *
 * Téléchargement individuel : lien direct vers l'original (même origine →
 * octets intacts, aucune recompression). « Tout télécharger » : JSZip en
 * mode STORE (archivage sans compression → bytes identiques aux originaux).
 */
export default function ClientGallery({ gallery }: Props) {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [zipping, setZipping] = useState(false);
  const [zipProgress, setZipProgress] = useState(0);

  const photos = gallery.photos;

  /* ─── Téléchargement d'un original (octets intacts) ───
   * Les URLs Blob sont cross-origin → l'attribut `download` est ignoré
   * par le navigateur. On récupère donc les octets via fetch puis on force
   * la sauvegarde via un object URL (même origine). Bytes identiques. */
  const downloadOriginal = useCallback(
    async (index: number) => {
      const p = photos[index];
      try {
        const res = await fetch(assetUrl(gallery.slug, p.original));
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = p.downloadName;
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
      } catch (e) {
        console.error(e);
        window.open(assetUrl(gallery.slug, p.original), "_blank");
      }
    },
    [photos, gallery.slug]
  );

  /* ─── Téléchargement ZIP (sans compression) ─── */
  async function downloadAll() {
    if (zipping) return;
    setZipping(true);
    setZipProgress(0);
    try {
      const { default: JSZip } = await import("jszip");
      const zip = new JSZip();

      for (let i = 0; i < photos.length; i++) {
        const p = photos[i];
        const res = await fetch(assetUrl(gallery.slug, p.original));
        const buf = await res.arrayBuffer();
        // STORE = aucune compression → octets identiques à l'original
        zip.file(p.downloadName, buf, { compression: "STORE" });
        setZipProgress(i + 1);
      }

      const blob = await zip.generateAsync({ type: "blob" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${gallery.client} - ${gallery.title}.zip`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error(e);
      alert("Erreur lors de la préparation du ZIP. Réessayez.");
    } finally {
      setZipping(false);
      setZipProgress(0);
    }
  }

  /* ─── Navigation lightbox ─── */
  const close = useCallback(() => setLightbox(null), []);
  const next = useCallback(
    () => setLightbox((i) => (i === null ? i : (i + 1) % photos.length)),
    [photos.length]
  );
  const prev = useCallback(
    () =>
      setLightbox((i) =>
        i === null ? i : (i - 1 + photos.length) % photos.length
      ),
    [photos.length]
  );

  useEffect(() => {
    if (lightbox === null) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
    }
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightbox, close, next, prev]);

  /* ─── Swipe tactile ─── */
  const touchStartX = useRef(0);
  function onTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX;
  }
  function onTouchEnd(e: React.TouchEvent) {
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (dx > 50) prev();
    else if (dx < -50) next();
  }

  return (
    <>
      {/* Barre d'action sticky */}
      <div className="sticky top-0 z-20 bg-bg-primary/85 backdrop-blur-xl border-b border-border">
        <div className="mx-auto max-w-7xl px-6 py-3 flex items-center justify-between gap-4">
          <p className="text-sm text-text-secondary">
            <span className="text-text-primary font-medium">{gallery.count}</span>{" "}
            photos · {formatBytes(gallery.totalOriginalBytes)}
          </p>
          <button
            onClick={downloadAll}
            disabled={zipping}
            className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-white hover:bg-accent-hover transition-colors disabled:opacity-60 disabled:cursor-wait"
          >
            {zipping ? (
              <>
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Préparation {zipProgress}/{gallery.count}…
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1M12 4v12m0 0l-4-4m4 4l4-4" />
                </svg>
                Tout télécharger
              </>
            )}
          </button>
        </div>
      </div>

      {/* Grille masonry */}
      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="columns-2 md:columns-3 gap-3 [&>*]:mb-3">
          {photos.map((p, i) => (
            <div
              key={p.id}
              className="group relative break-inside-avoid rounded-xl overflow-hidden bg-bg-card cursor-pointer"
              onClick={() => setLightbox(i)}
            >
              <img
                src={assetUrl(gallery.slug, p.display)}
                alt={`${gallery.title} — photo ${i + 1}`}
                width={p.width}
                height={p.height}
                loading="lazy"
                className="w-full h-auto block transition-transform duration-500 group-hover:scale-[1.03]"
              />
              {/* Overlay download au hover */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  downloadOriginal(i);
                }}
                className="absolute bottom-2.5 right-2.5 w-9 h-9 rounded-full bg-black/55 backdrop-blur-sm text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-accent"
                title="Télécharger l'original"
                aria-label="Télécharger l'original"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1M12 4v12m0 0l-4-4m4 4l4-4" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex flex-col"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          {/* Barre haut */}
          <div className="flex items-center justify-between px-5 py-4 text-white/80">
            <span className="text-sm">
              {lightbox + 1} / {photos.length}
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => downloadOriginal(lightbox)}
                className="inline-flex items-center gap-2 rounded-full bg-white/10 hover:bg-accent px-4 py-2 text-sm font-medium text-white transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1M12 4v12m0 0l-4-4m4 4l4-4" />
                </svg>
                Télécharger
              </button>
              <button
                onClick={close}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
                aria-label="Fermer"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Image */}
          <div className="flex-1 flex items-center justify-center px-4 pb-4 min-h-0">
            <img
              src={assetUrl(gallery.slug, photos[lightbox].display)}
              alt={`${gallery.title} — photo ${lightbox + 1}`}
              className="max-w-full max-h-full object-contain select-none"
            />
          </div>

          {/* Flèches */}
          <button
            onClick={prev}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            aria-label="Précédent"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={next}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            aria-label="Suivant"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}
    </>
  );
}
