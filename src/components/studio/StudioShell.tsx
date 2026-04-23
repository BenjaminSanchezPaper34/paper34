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

export default function StudioShell() {
  const [data, setData] = useState<StudioData | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Charge depuis LocalStorage au mount
  useEffect(() => {
    setData(loadStudioData());
  }, []);

  function handleChange(next: StudioData) {
    setData(next);
    saveStudioData(next);
  }

  function handleImport(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    importJson(file)
      .then((parsed) => {
        if (
          confirm(
            `Importer ${parsed.accounts.length} comptes ? Cela remplacera les données actuelles.`
          )
        ) {
          handleChange(parsed);
        }
      })
      .catch(() => alert("Fichier invalide"));
    e.target.value = "";
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-bg-primary flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-accent/30 border-t-accent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary">
      {/* Header */}
      <header className="border-b border-border bg-bg-primary/80 backdrop-blur-xl sticky top-0 z-10">
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold tracking-[-0.5px]">
              Studio <span className="gradient-text">Paper34</span>
            </h1>
            <p className="text-xs text-text-tertiary mt-0.5">
              Tableau de bord interne · données sauvegardées sur cet appareil
            </p>
          </div>
          <div className="flex gap-2">
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
