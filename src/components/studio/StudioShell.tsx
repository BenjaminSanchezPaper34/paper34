"use client";

import { useEffect, useRef, useState } from "react";
import {
  type StudioData,
  loadStudioData,
  saveStudioData,
  exportJson,
  importJson,
} from "@/lib/studio-storage";
import CalendarModule from "./CalendarModule";

const SYNC_DEBOUNCE_MS = 1500;

type SyncState = "idle" | "loading" | "saving" | "saved" | "error" | "offline";

export default function StudioShell() {
  const [data, setData] = useState<StudioData | null>(null);
  const [syncState, setSyncState] = useState<SyncState>("idle");
  const [secret, setSecret] = useState<string | null>(null);
  const [needsSecret, setNeedsSecret] = useState(false);
  const [secretInput, setSecretInput] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Au mount : récupère le secret stocké, charge le local, puis tente la sync cloud
  useEffect(() => {
    const stored = localStorage.getItem("paper34_studio_secret");
    setData(loadStudioData());
    if (stored) {
      setSecret(stored);
    } else {
      setNeedsSecret(true);
    }
  }, []);

  // Quand le secret est défini : on tente de charger depuis le cloud
  useEffect(() => {
    if (!secret) return;
    setSyncState("loading");
    fetch(`/api/studio/data?secret=${encodeURIComponent(secret)}`, {
      cache: "no-store",
    })
      .then(async (res) => {
        if (res.status === 401) {
          setSyncState("error");
          alert("Mot de passe incorrect");
          localStorage.removeItem("paper34_studio_secret");
          setSecret(null);
          setNeedsSecret(true);
          return;
        }
        const json = await res.json();
        if (json.data && json.data.accounts && Array.isArray(json.data.accounts)) {
          // Cloud > Local : on adopte la version cloud
          setData(json.data);
          saveStudioData(json.data);
        }
        setSyncState("idle");
      })
      .catch(() => setSyncState("offline"));
  }, [secret]);

  function pushToCloud(next: StudioData) {
    if (!secret) return;
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => {
      setSyncState("saving");
      fetch(`/api/studio/data?secret=${encodeURIComponent(secret)}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: next }),
      })
        .then(async (res) => {
          if (!res.ok) throw new Error("save failed");
          setSyncState("saved");
          setTimeout(() => setSyncState("idle"), 1500);
        })
        .catch(() => setSyncState("offline"));
    }, SYNC_DEBOUNCE_MS);
  }

  function handleChange(next: StudioData) {
    setData(next);
    saveStudioData(next); // local immédiat
    pushToCloud(next); // cloud en debounce
  }

  function handleImport(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    importJson(file)
      .then((parsed) => {
        if (
          confirm(
            `Importer ${parsed.accounts.length} comptes ? Cela remplacera les données actuelles (sur cet appareil ET dans le cloud).`
          )
        ) {
          handleChange(parsed);
        }
      })
      .catch(() => alert("Fichier invalide"));
    e.target.value = "";
  }

  function submitSecret(e: React.FormEvent) {
    e.preventDefault();
    const v = secretInput.trim();
    if (!v) return;
    localStorage.setItem("paper34_studio_secret", v);
    setSecret(v);
    setNeedsSecret(false);
    setSecretInput("");
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-bg-primary flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-accent/30 border-t-accent rounded-full animate-spin" />
      </div>
    );
  }

  // Statut sync (pastille en haut à droite)
  const syncMeta: Record<SyncState, { label: string; color: string }> = {
    idle: { label: "Synchronisé", color: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30" },
    loading: { label: "Chargement…", color: "bg-blue-500/15 text-blue-400 border-blue-500/30" },
    saving: { label: "Enregistrement…", color: "bg-blue-500/15 text-blue-400 border-blue-500/30" },
    saved: { label: "✓ Enregistré", color: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30" },
    error: { label: "Erreur", color: "bg-red-500/15 text-red-400 border-red-500/30" },
    offline: { label: "Hors ligne", color: "bg-amber-500/15 text-amber-400 border-amber-500/30" },
  };

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary">
      {/* Modal mot de passe (1ère visite) */}
      {needsSecret && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur flex items-center justify-center p-6">
          <form
            onSubmit={submitSecret}
            className="bg-bg-card border border-border rounded-2xl p-8 max-w-sm w-full"
          >
            <h2 className="text-xl font-bold mb-2">Studio Paper34</h2>
            <p className="text-sm text-text-secondary mb-5">
              Entrez le mot de passe de synchronisation pour activer le partage
              entre vos appareils.
            </p>
            <input
              type="password"
              value={secretInput}
              onChange={(e) => setSecretInput(e.target.value)}
              autoFocus
              placeholder="Mot de passe"
              className="w-full bg-bg-secondary border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-accent mb-4"
            />
            <button
              type="submit"
              className="w-full rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white hover:bg-accent-hover transition-colors"
            >
              D&eacute;verrouiller
            </button>
            <button
              type="button"
              onClick={() => setNeedsSecret(false)}
              className="w-full mt-3 text-xs text-text-tertiary hover:text-text-secondary transition-colors"
            >
              Continuer hors ligne (sans sync)
            </button>
          </form>
        </div>
      )}

      {/* Header */}
      <header className="border-b border-border bg-bg-primary/80 backdrop-blur-xl sticky top-0 z-10">
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold tracking-[-0.5px]">
              Studio <span className="gradient-text">Paper34</span>
            </h1>
            <p className="text-xs text-text-tertiary mt-0.5">
              {secret
                ? "Synchronisation cloud activée"
                : "Mode local seul · données sur cet appareil uniquement"}
            </p>
          </div>
          <div className="flex items-center gap-2">
            {secret && (
              <span
                className={`text-xs rounded-full px-3 py-1 border ${syncMeta[syncState].color}`}
              >
                {syncMeta[syncState].label}
              </span>
            )}
            <button
              onClick={() => fileInputRef.current?.click()}
              className="text-xs rounded-full px-3 py-1.5 bg-bg-card border border-border text-text-secondary hover:text-text-primary hover:border-border-hover transition-colors"
            >
              Importer
            </button>
            <button
              onClick={() => exportJson(data)}
              className="text-xs rounded-full px-3 py-1.5 bg-bg-card border border-border text-text-secondary hover:text-text-primary hover:border-border-hover transition-colors"
            >
              Exporter
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="application/json"
              onChange={handleImport}
              className="hidden"
            />
          </div>
        </div>
      </header>

      {/* Modules grid */}
      <main className="mx-auto max-w-7xl px-6 py-8 space-y-6">
        <CalendarModule data={data} onChange={handleChange} />

        {/* Placeholder pour futurs modules */}
        <div className="rounded-2xl border border-dashed border-border bg-bg-card/30 p-8 text-center">
          <p className="text-sm text-text-tertiary">
            Espace pour de futurs modules (analytics, todos, mémos clients…)
          </p>
        </div>
      </main>
    </div>
  );
}
