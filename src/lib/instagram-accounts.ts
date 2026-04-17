export type ManagedAccount = {
  name: string;
  handle: string; // sans @
  category: string;
  description?: string;
  /** Optionnel : palette de gradient pour le fallback visuel */
  gradient?: [string, string];
  /** Optionnel : chemin local d'un screenshot (ex: /images/social/chiringuitovias.jpg) */
  screenshot?: string;
};

// Liste à enrichir avec les vrais comptes que tu gères.
// Pour chaque compte, deux options :
//  - Tu déposes un screenshot dans public/images/social/{handle}.jpg
//    et tu ajoutes screenshot: "/images/social/{handle}.jpg"
//  - Sinon, un mockup visuel avec gradient sera affiché (avatar + grille colorée)
export const MANAGED_ACCOUNTS: ManagedAccount[] = [
  {
    name: "Chiringuito Vias",
    handle: "chiringuitovias",
    category: "Plage privée",
    gradient: ["#0ea5e9", "#0369a1"],
  },
  {
    name: "Le Dix9",
    handle: "ledix9restaurant",
    category: "Restaurant",
    gradient: ["#f59e0b", "#b45309"],
  },
  {
    name: "Pampa",
    handle: "pampaviasplage",
    category: "Restaurant",
    gradient: ["#10b981", "#047857"],
  },
  {
    name: "Fabrikus World",
    handle: "fabrikusworldviasplage",
    category: "Parc événementiel",
    gradient: ["#8b5cf6", "#5b21b6"],
  },
  {
    name: "Etienne Coffee & Shop",
    handle: "etienne_france",
    category: "Coffee shop",
    gradient: ["#d97706", "#78350f"],
  },
  {
    name: "Infini Mouv",
    handle: "infinimouv_agde",
    category: "Sport & loisirs",
    gradient: ["#ef4444", "#991b1b"],
  },
];

export function getProfileUrl(handle: string): string {
  return `https://www.instagram.com/${handle}/`;
}
