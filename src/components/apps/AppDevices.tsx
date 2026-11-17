import type { AppDevice } from "@/lib/apps";

/**
 * Appareils sur lesquels l'app est disponible, à la manière de la fiche App Store :
 * un pictogramme au trait et le nom de l'appareil. Les tracés héritent de la couleur du texte.
 */
const DEVICES: Record<AppDevice, { label: string; icon: React.ReactNode }> = {
  mac: {
    label: "Mac",
    icon: (
      <>
        <rect x="4" y="4.5" width="16" height="11" rx="1.6" />
        <path d="M2 18.5h20l-1.2 1.5H3.2z" />
      </>
    ),
  },
  iphone: {
    label: "iPhone",
    icon: (
      <>
        <rect x="6.5" y="2" width="11" height="20" rx="2.8" />
        <path d="M10.5 4.6h3" />
      </>
    ),
  },
  ipad: {
    label: "iPad",
    icon: (
      <>
        <rect x="4" y="2.5" width="16" height="19" rx="2.2" />
        <circle cx="12" cy="4.6" r="0.35" />
      </>
    ),
  },
  watch: {
    label: "Apple Watch",
    icon: (
      <>
        <rect x="6.5" y="6" width="11" height="12" rx="3" />
        <path d="M9 6V3h6v3M9 18v3h6v-3M17.5 10.5h.8" />
      </>
    ),
  },
};

export default function AppDevices({ devices }: { devices: AppDevice[] }) {
  return (
    <div>
      <p className="text-sm text-text-secondary mb-2">Disponible sur</p>
      <ul className="flex flex-wrap gap-x-5 gap-y-2">
        {devices.map((d) => (
          <li key={d} className="flex items-center gap-2 text-sm font-medium text-text-primary">
            <svg
              viewBox="0 0 24 24"
              width="22"
              height="22"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              className="shrink-0 text-text-secondary"
            >
              {DEVICES[d].icon}
            </svg>
            {DEVICES[d].label}
          </li>
        ))}
      </ul>
    </div>
  );
}
