/**
 * Helpers LocalStorage pour le dashboard /studio.
 * Toutes les données sont stockées sur l'appareil de l'utilisateur (pas de backend).
 * Bouton export/import JSON pour la sauvegarde manuelle entre appareils.
 */

const STORAGE_KEY = "paper34_studio_v1";

export type SocialAccount = {
  id: string;
  name: string;
  emoji: string;
  /** ISO date YYYY-MM-DD pour chaque type de contenu */
  post?: string;
  story?: string;
  reel?: string;
};

export type StudioData = {
  accounts: SocialAccount[];
  /** Métadonnées libres pour évolutions futures */
  meta?: Record<string, unknown>;
};

/** Compte par défaut basé sur la capture du calendrier Numbers */
export const DEFAULT_ACCOUNTS: SocialAccount[] = [
  { id: "blackpearl", name: "Le Black Pearl", emoji: "\uD83C\uDFF4\u200D\u2620\uFE0F" },
  { id: "matos", name: "Matos Import", emoji: "\uD83D\uDEE5\uFE0F" },
  { id: "marinabay", name: "Marina Bay", emoji: "\uD83D\uDC1A" },
  { id: "copacabana", name: "Copacabana", emoji: "\uD83E\uDD9C" },
  { id: "ledix9", name: "Le Dix9", emoji: "\u26F3" },
  { id: "paper34", name: "Paper34", emoji: "\u2708\uFE0F" },
  { id: "chiringuito", name: "Chiringuito", emoji: "\uD83C\uDFDD\uFE0F" },
  { id: "infinimouv", name: "Infini Mouv", emoji: "\uD83D\uDCAA" },
  { id: "viastech", name: "Viastech", emoji: "\uD83D\uDE97" },
  { id: "safran", name: "Le Safran", emoji: "\uD83C\uDF57" },
  { id: "europark", name: "Europark Indoor", emoji: "\uD83E\uDDF8" },
  { id: "delices", name: "D\u00e9lices de Farinette", emoji: "\uD83E\uDDC1" },
  { id: "cocomango", name: "Coco Mango", emoji: "\uD83C\uDF66" },
  { id: "komptoir45", name: "Le Komptoir45", emoji: "\uD83C\uDF77" },
  { id: "cem", name: "CEM", emoji: "\uD83D\uDCBB" },
  { id: "guinguette", name: "La Guinguette", emoji: "\uD83C\uDF33" },
];

export function loadStudioData(): StudioData {
  if (typeof window === "undefined") {
    return { accounts: DEFAULT_ACCOUNTS };
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { accounts: DEFAULT_ACCOUNTS };
    const parsed = JSON.parse(raw) as StudioData;
    if (!parsed.accounts || !Array.isArray(parsed.accounts)) {
      return { accounts: DEFAULT_ACCOUNTS };
    }
    return parsed;
  } catch {
    return { accounts: DEFAULT_ACCOUNTS };
  }
}

export function saveStudioData(data: StudioData): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

/** Nombre de jours entre une date ISO et aujourd'hui. Null si pas de date. */
export function daysSince(iso: string | undefined): number | null {
  if (!iso) return null;
  const then = new Date(iso);
  if (isNaN(then.getTime())) return null;
  const now = new Date();
  const diffMs = now.setHours(0, 0, 0, 0) - then.setHours(0, 0, 0, 0);
  return Math.floor(diffMs / (1000 * 60 * 60 * 24));
}

/** Niveau d'alerte basé sur l'ancienneté (seuils choisis : vert 0-2j, jaune 3-4j, rouge 5+j). */
export type AlertLevel = "ok" | "warn" | "alert" | "empty";

export function alertLevel(days: number | null): AlertLevel {
  if (days === null) return "empty";
  if (days <= 2) return "ok";
  if (days <= 4) return "warn";
  return "alert";
}

export function todayIso(): string {
  return new Date().toISOString().slice(0, 10);
}

/** Format FR JJ/MM/AAAA pour l'affichage. */
export function formatDateFr(iso: string | undefined): string {
  if (!iso) return "—";
  const d = new Date(iso);
  if (isNaN(d.getTime())) return "—";
  return d.toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

export function exportJson(data: StudioData): void {
  if (typeof window === "undefined") return;
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `paper34-studio-${todayIso()}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

export function importJson(file: File): Promise<StudioData> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(reader.result as string) as StudioData;
        if (!parsed.accounts || !Array.isArray(parsed.accounts)) {
          reject(new Error("Format invalide"));
          return;
        }
        resolve(parsed);
      } catch (e) {
        reject(e);
      }
    };
    reader.onerror = () => reject(reader.error);
    reader.readAsText(file);
  });
}
