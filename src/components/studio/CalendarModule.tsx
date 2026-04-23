"use client";

import { useState } from "react";
import {
  type SocialAccount,
  type StudioData,
  type AlertLevel,
  alertLevel,
  daysSince,
  formatDateFr,
  todayIso,
} from "@/lib/studio-storage";

type Props = {
  data: StudioData;
  onChange: (next: StudioData) => void;
};

const COLUMNS = [
  { key: "post" as const, label: "POST" },
  { key: "story" as const, label: "STORY" },
  { key: "reel" as const, label: "REEL" },
];

const ALERT_STYLES: Record<AlertLevel, string> = {
  ok: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  warn: "bg-amber-500/15 text-amber-400 border-amber-500/30",
  alert: "bg-red-500/15 text-red-400 border-red-500/30",
  empty: "bg-bg-secondary text-text-tertiary border-border",
};

const ALERT_DOT: Record<AlertLevel, string> = {
  ok: "bg-emerald-400",
  warn: "bg-amber-400",
  alert: "bg-red-400",
  empty: "bg-text-tertiary/40",
};

/** Score d'alerte global d'un compte (max sur les 3 colonnes) — sert au tri. */
function accountScore(account: SocialAccount): number {
  const days = COLUMNS.map((c) => daysSince(account[c.key]));
  // Pas de date → priorité max
  const max = days.reduce<number>((acc, d) => {
    if (d === null) return Math.max(acc, 9999);
    return Math.max(acc, d);
  }, 0);
  return max;
}

export default function CalendarModule({ data, onChange }: Props) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingField, setEditingField] = useState<"post" | "story" | "reel" | null>(null);
  const [showAddRow, setShowAddRow] = useState(false);
  const [newName, setNewName] = useState("");
  const [newEmoji, setNewEmoji] = useState("");
  const [sortByUrgency, setSortByUrgency] = useState(true);

  const sorted = sortByUrgency
    ? [...data.accounts].sort((a, b) => accountScore(b) - accountScore(a))
    : data.accounts;

  function updateField(id: string, field: "post" | "story" | "reel", value: string) {
    const next: StudioData = {
      ...data,
      accounts: data.accounts.map((a) =>
        a.id === id ? { ...a, [field]: value || undefined } : a
      ),
    };
    onChange(next);
  }

  function setToday(id: string, field: "post" | "story" | "reel") {
    updateField(id, field, todayIso());
  }

  function removeAccount(id: string) {
    if (!confirm("Supprimer ce compte ?")) return;
    onChange({ ...data, accounts: data.accounts.filter((a) => a.id !== id) });
  }

  function addAccount() {
    const name = newName.trim();
    if (!name) return;
    const id = name.toLowerCase().replace(/[^a-z0-9]+/g, "").slice(0, 20) + Date.now().toString(36).slice(-3);
    const next: StudioData = {
      ...data,
      accounts: [
        ...data.accounts,
        { id, name, emoji: newEmoji.trim() || "📱" },
      ],
    };
    onChange(next);
    setNewName("");
    setNewEmoji("");
    setShowAddRow(false);
  }

  return (
    <div className="rounded-2xl border border-border bg-bg-card overflow-hidden">
      {/* Header module */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-border">
        <div>
          <h2 className="text-lg font-semibold">Calendrier social</h2>
          <p className="text-xs text-text-tertiary mt-0.5">
            Vert &lt;3j · Jaune 3-4j · Rouge 5j+
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setSortByUrgency(!sortByUrgency)}
            className={`text-xs rounded-full px-3 py-1.5 border transition-colors ${
              sortByUrgency
                ? "bg-accent/10 text-accent border-accent/30"
                : "bg-bg-secondary text-text-secondary border-border hover:border-border-hover"
            }`}
          >
            {sortByUrgency ? "Tri urgence" : "Ordre saisi"}
          </button>
          <button
            onClick={() => setShowAddRow(!showAddRow)}
            className="text-xs rounded-full px-3 py-1.5 bg-accent text-white hover:bg-accent-hover transition-colors"
          >
            + Compte
          </button>
        </div>
      </div>

      {/* Add row */}
      {showAddRow && (
        <div className="flex items-center gap-2 px-5 py-3 border-b border-border bg-bg-secondary/40">
          <input
            value={newEmoji}
            onChange={(e) => setNewEmoji(e.target.value)}
            placeholder="🎯"
            maxLength={4}
            className="w-12 text-center bg-bg-secondary border border-border rounded-lg px-2 py-1.5 text-sm focus:outline-none focus:border-accent"
          />
          <input
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="Nom du compte"
            onKeyDown={(e) => e.key === "Enter" && addAccount()}
            className="flex-1 bg-bg-secondary border border-border rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-accent"
          />
          <button
            onClick={addAccount}
            className="text-xs rounded-full px-4 py-1.5 bg-accent text-white hover:bg-accent-hover transition-colors"
          >
            Ajouter
          </button>
          <button
            onClick={() => setShowAddRow(false)}
            className="text-xs text-text-tertiary hover:text-text-primary transition-colors px-2"
          >
            Annuler
          </button>
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-xs uppercase tracking-wider text-text-tertiary border-b border-border">
              <th className="text-left px-5 py-3 font-medium">Compte</th>
              {COLUMNS.map((c) => (
                <th key={c.key} className="text-center px-3 py-3 font-medium">
                  {c.label}
                </th>
              ))}
              <th className="w-10" />
            </tr>
          </thead>
          <tbody>
            {sorted.map((account) => (
              <tr
                key={account.id}
                className="border-b border-border/50 last:border-0 hover:bg-white/[0.02] transition-colors"
              >
                <td className="px-5 py-3">
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{account.emoji}</span>
                    <span className="font-medium">{account.name}</span>
                  </div>
                </td>
                {COLUMNS.map((c) => {
                  const value = account[c.key];
                  const days = daysSince(value);
                  const level = alertLevel(days);
                  const isEditing = editingId === account.id && editingField === c.key;
                  return (
                    <td key={c.key} className="px-2 py-2 text-center">
                      {isEditing ? (
                        <input
                          type="date"
                          autoFocus
                          defaultValue={value ?? ""}
                          onBlur={(e) => {
                            updateField(account.id, c.key, e.target.value);
                            setEditingId(null);
                            setEditingField(null);
                          }}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              updateField(account.id, c.key, (e.target as HTMLInputElement).value);
                              setEditingId(null);
                              setEditingField(null);
                            }
                            if (e.key === "Escape") {
                              setEditingId(null);
                              setEditingField(null);
                            }
                          }}
                          className="bg-bg-secondary border border-accent rounded-md px-2 py-1 text-xs"
                        />
                      ) : (
                        <button
                          onClick={() => {
                            setEditingId(account.id);
                            setEditingField(c.key);
                          }}
                          className={`inline-flex items-center gap-2 rounded-md px-2.5 py-1 text-xs border ${ALERT_STYLES[level]} hover:scale-105 transition-transform`}
                          title={
                            days === null
                              ? "Pas encore renseigné"
                              : `Il y a ${days} jour${days > 1 ? "s" : ""}`
                          }
                        >
                          <span className={`w-1.5 h-1.5 rounded-full ${ALERT_DOT[level]}`} />
                          {formatDateFr(value)}
                        </button>
                      )}
                      {!isEditing && (
                        <button
                          onClick={() => setToday(account.id, c.key)}
                          className="ml-1 text-[10px] text-text-tertiary hover:text-accent transition-colors"
                          title="Marquer aujourd'hui"
                        >
                          •
                        </button>
                      )}
                    </td>
                  );
                })}
                <td className="px-2 py-2 text-right">
                  <button
                    onClick={() => removeAccount(account.id)}
                    className="text-text-tertiary/40 hover:text-red-400 text-sm transition-colors"
                    title="Supprimer"
                  >
                    ×
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="px-5 py-3 text-xs text-text-tertiary border-t border-border">
        Cliquez sur une date pour la modifier · Cliquez sur le point pour marquer aujourd&apos;hui
      </div>
    </div>
  );
}
