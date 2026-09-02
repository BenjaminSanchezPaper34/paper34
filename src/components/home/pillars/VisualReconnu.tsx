"use client";

import HalftoneCmyk from "@/components/lab/HalftoneCmyk";
import LogoPaper34 from "@/components/layout/LogoPaper34";
import { useFx } from "@/lib/useFx";

/**
 * Pilier « Être reconnu » : une feuille de papier crème avec traits de coupe
 * et repères de calage, sur laquelle la trame offset CMJN se dépose en direct
 * (effet du lab, gouttes automatiques + curseur). L'ADN print du studio.
 */
export default function VisualReconnu() {
  const { ref, on } = useFx<HTMLDivElement>();
  return (
    <div ref={ref} className="relative mx-auto w-full max-w-[440px] py-6 md:py-2">
      <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-[#f3ede1] shadow-2xl shadow-black/60 md:[transform:perspective(1400px)_rotateY(6deg)_rotateX(2deg)]">
        {on && <HalftoneCmyk autoDrops autoInterval={460} />}
        {/* Repères d'imprimeur */}
        <CropMarks />
        {/* Logo à l'encre */}
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-4 px-10">
          <LogoPaper34 fill="#1d1e1c" className="w-3/4" />
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#1d1e1c]/60">
            CMJN · 300 dpi · fond perdu 3 mm
          </p>
        </div>
        {/* Barre de contrôle couleur */}
        <div className="pointer-events-none absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-0.5">
          {["#00afe6", "#e10082", "#ffd700", "#1d1e1c", "#00afe6aa", "#e10082aa", "#ffd700aa", "#1d1e1c66"].map((c, i) => (
            <span key={i} className="h-3 w-5" style={{ background: c }} />
          ))}
        </div>
      </div>
    </div>
  );
}

function CropMarks() {
  const mark = "absolute h-4 w-px bg-[#1d1e1c]/50";
  const markH = "absolute h-px w-4 bg-[#1d1e1c]/50";
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      <span className={`${mark} left-6 top-0`} /><span className={`${markH} left-0 top-6`} />
      <span className={`${mark} right-6 top-0`} /><span className={`${markH} right-0 top-6`} />
      <span className={`${mark} left-6 bottom-0`} /><span className={`${markH} left-0 bottom-6`} />
      <span className={`${mark} right-6 bottom-0`} /><span className={`${markH} right-0 bottom-6`} />
      {/* Repère de calage */}
      <span className="absolute right-8 top-8 h-5 w-5 rounded-full border border-[#1d1e1c]/50">
        <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-[#1d1e1c]/50" />
        <span className="absolute top-1/2 left-0 h-px w-full -translate-y-1/2 bg-[#1d1e1c]/50" />
      </span>
    </div>
  );
}
