export type ManagedAccount = {
  name: string;
  handle: string; // sans @
  category: string;
  description?: string;
};

// Liste \u00e0 enrichir avec les vrais comptes que tu g\u00e8res.
// Pour chaque compte, le screenshot du profil sera g\u00e9n\u00e9r\u00e9 automatiquement
// via Microlink \u00e0 partir de https://www.instagram.com/{handle}/
export const MANAGED_ACCOUNTS: ManagedAccount[] = [
  {
    name: "Chiringuito Vias",
    handle: "chiringuitovias",
    category: "Plage priv\u00e9e",
  },
  {
    name: "Le Dix9",
    handle: "ledix9restaurant",
    category: "Restaurant",
  },
  {
    name: "Pampa",
    handle: "pampaviasplage",
    category: "Restaurant",
  },
  {
    name: "Fabrikus World",
    handle: "fabrikusworldviasplage",
    category: "Parc \u00e9v\u00e9nementiel",
  },
  {
    name: "Etienne Coffee & Shop",
    handle: "etienne_france",
    category: "Coffee shop",
  },
  {
    name: "Infini Mouv",
    handle: "infinimouv_agde",
    category: "Sport & loisirs",
  },
];

export function getProfileUrl(handle: string): string {
  return `https://www.instagram.com/${handle}/`;
}

/**
 * G\u00e9n\u00e8re l'URL Microlink pour un screenshot du profil Instagram.
 * Viewport mobile (375x812) pour avoir un rendu app-like.
 */
export function getProfileScreenshotUrl(handle: string): string {
  const profileUrl = encodeURIComponent(getProfileUrl(handle));
  return `https://api.microlink.io/?url=${profileUrl}&screenshot=true&meta=false&embed=screenshot.url&type=jpeg&viewport.width=400&viewport.height=820&viewport.deviceScaleFactor=2&waitUntil=networkidle0&overlay.browser=light`;
}
