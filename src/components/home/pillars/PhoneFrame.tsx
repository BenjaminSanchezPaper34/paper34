/** Cadre iPhone minimal (dynamic island, bords fins) — le contenu remplit l'écran. */
export default function PhoneFrame({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`relative aspect-[9/19.5] rounded-[2.6rem] border border-white/15 bg-[#0b0b0d] p-[6px] shadow-2xl shadow-black/60 ${className}`}
    >
      <div className="relative h-full w-full overflow-hidden rounded-[2.2rem] bg-bg-secondary">
        {children}
        {/* Dynamic island */}
        <div className="pointer-events-none absolute left-1/2 top-2.5 h-[22px] w-[34%] -translate-x-1/2 rounded-full bg-black" />
      </div>
    </div>
  );
}
