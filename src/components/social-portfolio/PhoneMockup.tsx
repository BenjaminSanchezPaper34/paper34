import {
  getProfileUrl,
  getProfileScreenshotUrl,
  type ManagedAccount,
} from "@/lib/instagram-accounts";

type Props = {
  account: ManagedAccount;
  /** Léger tilt 3D pour les hero showcases. Désactivé par défaut. */
  tilt?: "left" | "right" | "none";
};

export default function PhoneMockup({ account, tilt = "none" }: Props) {
  const screenshot = getProfileScreenshotUrl(account.handle);
  const profileUrl = getProfileUrl(account.handle);

  const tiltClass =
    tilt === "left"
      ? "md:[transform:perspective(1200px)_rotateY(8deg)_rotateX(2deg)]"
      : tilt === "right"
      ? "md:[transform:perspective(1200px)_rotateY(-8deg)_rotateX(2deg)]"
      : "";

  return (
    <a
      href={profileUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group block"
      aria-label={`Voir le compte Instagram de ${account.name}`}
    >
      {/* Cadre iPhone */}
      <div
        className={`relative mx-auto w-[240px] md:w-[280px] aspect-[9/19] rounded-[2.5rem] bg-[#0a0a0a] p-2.5 shadow-2xl shadow-black/50 transition-all duration-500 group-hover:shadow-accent-glow ${tiltClass}`}
      >
        {/* Bordure brillante */}
        <div className="absolute inset-0 rounded-[2.5rem] border border-white/10 pointer-events-none" />

        {/* Encoche dynamic island */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-20 h-5 bg-black rounded-full z-20" />

        {/* Écran */}
        <div className="relative w-full h-full rounded-[2rem] overflow-hidden bg-bg-secondary">
          <img
            src={screenshot}
            alt={`Compte Instagram de ${account.name}`}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
          {/* Overlay hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        </div>
      </div>

      {/* Caption */}
      <div className="mt-5 text-center">
        <p className="text-xs text-accent font-semibold uppercase tracking-wider mb-1">
          {account.category}
        </p>
        <h3 className="text-base font-semibold text-text-primary group-hover:text-accent transition-colors">
          {account.name}
        </h3>
        <p className="text-sm text-text-tertiary mt-1">@{account.handle}</p>
      </div>
    </a>
  );
}
