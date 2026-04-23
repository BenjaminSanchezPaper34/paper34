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

/**
 * Nombre de jours (calendaire, basé sur le début de jour) entre une date ISO et aujourd'hui.
 * Null si pas de date. Utilisé pour le code couleur d'alerte.
 */
export function daysSince(iso: string | undefined): number | null {
  if (!iso) return null;
  const then = new Date(iso);
  if (isNaN(then.getTime())) return null;
  const now = new Date();
  const startThen = new Date(then.getFullYear(), then.getMonth(), then.getDate()).getTime();
  const startNow = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  return Math.floor((startNow - startThen) / (1000 * 60 * 60 * 24));
}

/** Niveau d'alerte basé sur l'ancienneté (seuils choisis : vert 0-2j, jaune 3-4j, rouge 5+j). */
export type AlertLevel = "ok" | "warn" | "alert" | "empty";

export function alertLevel(days: number | null): AlertLevel {
  if (days === null) return "empty";
  if (days <= 2) return "ok";
  if (days <= 4) return "warn";
  return "alert";
}

/** ISO datetime complet de maintenant (avec heure locale) */
export function nowIso(): string {
  return new Date().toISOString();
}

/** Format JJ/MM/AAAA pour l'export filename */
export function todayIso(): string {
  return new Date().toISOString().slice(0, 10);
}

/**
 * Format intelligent pour l'affichage compact :
 * - Aujourd'hui → "Aujourd'hui 14h32"
 * - Hier → "Hier 14h32"
 * - 2-7 jours → "Il y a 3j"
 * - + → "JJ/MM/AA"
 */
export function formatDateFr(iso: string | undefined): string {
  if (!iso) return "—";
  const d = new Date(iso);
  if (isNaN(d.getTime())) return "—";
  const days = daysSince(iso);
  const hh = String(d.getHours()).padStart(2, "0");
  const mm = String(d.getMinutes()).padStart(2, "0");
  const hasTime = d.getHours() !== 0 || d.getMinutes() !== 0;

  if (days === 0) return hasTime ? `Aujourd'hui ${hh}h${mm}` : "Aujourd'hui";
  if (days === 1) return hasTime ? `Hier ${hh}h${mm}` : "Hier";
  if (days !== null && days > 0 && days < 7) return `Il y a ${days}j`;

  return d.toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  });
}

/**
 * Parser intelligent pour saisie rapide.
 * Accepte :
 *   "5"        → jour 5, mois et année actuels
 *   "5 10"     → 5 octobre, année actuelle
 *   "5/10"     → idem
 *   "510"      → idem (2 ou 4 chiffres)
 *   "5/10/26"  → 5 oct 2026
 *   "5/10/2026"→ idem
 *   "051026"   → idem
 * Retourne ISO string (avec heure 12h00 par défaut pour ne pas avoir l'air "à la minute")
 * ou null si parse impossible.
 */
export function parseDateInput(input: string): string | null {
  const cleaned = input.trim();
  if (!cleaned) return null;

  // Sépare par espaces, slashes, tirets, points
  const parts = cleaned.split(/[\s/\-.]+/).filter(Boolean);
  let day: number, month: number, year: number;

  if (parts.length === 1) {
    const digits = parts[0].replace(/\D/g, "");
    // Concat number type
    if (digits.length <= 2) {
      // Seulement jour
      day = parseInt(digits, 10);
      month = new Date().getMonth() + 1;
      year = new Date().getFullYear();
    } else if (digits.length === 4) {
      // JJMM
      day = parseInt(digits.slice(0, 2), 10);
      month = parseInt(digits.slice(2, 4), 10);
      year = new Date().getFullYear();
    } else if (digits.length === 6) {
      // JJMMAA
      day = parseInt(digits.slice(0, 2), 10);
      month = parseInt(digits.slice(2, 4), 10);
      year = 2000 + parseInt(digits.slice(4, 6), 10);
    } else if (digits.length === 8) {
      // JJMMAAAA
      day = parseInt(digits.slice(0, 2), 10);
      month = parseInt(digits.slice(2, 4), 10);
      year = parseInt(digits.slice(4, 8), 10);
    } else {
      return null;
    }
  } else if (parts.length === 2) {
    day = parseInt(parts[0], 10);
    month = parseInt(parts[1], 10);
    year = new Date().getFullYear();
  } else if (parts.length === 3) {
    day = parseInt(parts[0], 10);
    month = parseInt(parts[1], 10);
    let y = parseInt(parts[2], 10);
    if (y < 100) y += 2000;
    year = y;
  } else {
    return null;
  }

  // Validation
  if (
    isNaN(day) || isNaN(month) || isNaN(year) ||
    day < 1 || day > 31 || month < 1 || month > 12 ||
    year < 2020 || year > 2100
  ) {
    return null;
  }

  // Construit la date à 12h00 locale (pas 00h00 pour ne pas afficher d'heure parasite)
  const d = new Date(year, month - 1, day, 12, 0, 0);
  if (d.getMonth() !== month - 1 || d.getDate() !== day) {
    return null; // jour invalide pour le mois (ex: 31 février)
  }
  return d.toISOString();
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
