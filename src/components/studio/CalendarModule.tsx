"use client";

import { useEffect, useRef, useState } from "react";
import {
  type SocialAccount,
  type StudioData,
  type AlertLevel,
  alertLevel,
  daysSince,
  formatDateFr,
  nowIso,
  parseDateInput,
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
  const max = days.reduce<number>((acc, d) => {
    if (d === null) return Math.max(acc, 9999);
    return Math.max(acc, d);
  }, 0);
  return max;
}

/* ─── Cellule date ─── */

type CellProps = {
  value: string | undefined;
  onChange: (next: string | undefined) => void;
  onSetNow: () => void;
};

function DateCell({ value, onChange, onSetNow }: CellProps) {
  const [editing, setEditing] = useState(false);
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const days = daysSince(value);
  const level = alertLevel(days);

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [editing]);

  function commit() {
    const trimmed = input.trim();
    if (!trimmed) {
      onChange(undefined);
      setEditing(false);
      setError(false);
      return;
    }
    const parsed = parseDateInput(trimmed);
    if (!parsed) {
      setError(true);
      // Reset après 1.5s
      setTimeout(() => setError(false), 1500);
      return;
    }
    onChange(parsed);
    setEditing(false);
    setError(false);
  }

  function startEdit() {
    // Pré-remplit avec la date actuelle au format JJ/MM/AA + heure si renseignée
    if (value) {
      const d = new Date(value);
      const dd = String(d.getDate()).padStart(2, "0");
      const mm = String(d.getMonth() + 1).padStart(2, "0");
      const yy = String(d.getFullYear()).slice(-2);
      const hh = d.getHours();
      const min = d.getMinutes();
      const hasTime = hh !== 12 || min !== 0; // 12h00 = heure neutre par défaut
      const time = hasTime
        ? ` ${String(hh).padStart(2, "0")}h${String(min).padStart(2, "0")}`
        : "";
      setInput(`${dd}/${mm}/${yy}${time}`);
    } else {
      setInput("");
    }
    setEditing(true);
  }

  function clear() {
    onChange(undefined);
  }

  return (
    <div className="flex items-center justify-center gap-1.5 group/cell">
      {editing ? (
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            setError(false);
          }}
          onBlur={commit}
          onKeyDown={(e) => {
            if (e.key === "Enter") commit();
            if (e.key === "Escape") {
              setEditing(false);
              setError(false);
            }
          }}
          placeholder="22 ou 22/04 14h30"
          className={`w-36 bg-bg-secondary border rounded-md px-2 py-1.5 text-xs text-center focus:outline-none ${
            error
              ? "border-red-500 text-red-400 animate-pulse"
              : "border-accent text-text-primary"
          }`}
        />
      ) : (
        <button
          onClick={startEdit}
          className={`inline-flex items-center gap-2 rounded-md px-2.5 py-1.5 text-xs border ${ALERT_STYLES[level]} hover:scale-105 transition-transform`}
          title={
            days === null
              ? "Pas encore renseigné — cliquer pour saisir"
              : `Il y a ${days} jour${days > 1 ? "s" : ""} — cliquer pour modifier`
          }
        >
          <span className={`w-1.5 h-1.5 rounded-full ${ALERT_DOT[level]}`} />
          {formatDateFr(value)}
        </button>
      )}

      {/* Bouton check : marquer maintenant */}
      <button
        onClick={onSetNow}
        className="w-6 h-6 rounded-md bg-bg-secondary border border-border text-text-tertiary hover:text-emerald-400 hover:border-emerald-500/40 hover:bg-emerald-500/10 transition-colors flex items-center justify-center shrink-0"
        title="Marquer maintenant (date + heure)"
        aria-label="Marquer maintenant"
      >
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </button>

      {/* Bouton effacer (visible si une date est définie) */}
      {value && !editing && (
        <button
          onClick={clear}
          className="w-6 h-6 rounded-md bg-bg-secondary border border-border text-text-tertiary hover:text-red-400 hover:border-red-500/40 hover:bg-red-500/10 transition-all flex items-center justify-center shrink-0 opacity-0 group-hover/cell:opacity-100"
          title="Effacer la date"
          aria-label="Effacer la date"
        >
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
}

/* ─── Module principal ─── */

export default function CalendarModule({ data, onChange }: Props) {
  const [showAddRow, setShowAddRow] = useState(false);
  const [newName, setNewName] = useState("");
  const [newEmoji, setNewEmoji] = useState("");
  const [sortByUrgency, setSortByUrgency] = useState(true);

  const sorted = sortByUrgency
    ? [...data.accounts].sort((a, b) => accountScore(b) - accountScore(a))
    : data.accounts;

  function updateField(id: string, field: "post" | "story" | "reel", value: string | undefined) {
    const next: StudioData = {
      ...data,
      accounts: data.accounts.map((a) =>
        a.id === id ? { ...a, [field]: value } : a
      ),
    };
    onChange(next);
  }

  function setNow(id: string, field: "post" | "story" | "reel") {
    updateField(id, field, nowIso());
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
            Vert &lt;3j · Jaune 3-4j · Rouge 5j+ · Saisie rapide : tape juste le jour
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
                {COLUMNS.map((c) => (
                  <td key={c.key} className="px-2 py-2 text-center">
                    <DateCell
                      value={account[c.key]}
                      onChange={(v) => updateField(account.id, c.key, v)}
                      onSetNow={() => setNow(account.id, c.key)}
                    />
                  </td>
                ))}
                <td className="px-2 py-2 text-right">
                  <button
                    onClick={() => removeAccount(account.id)}
                    className="text-text-tertiary/40 hover:text-red-400 text-sm transition-colors"
                    title="Supprimer le compte"
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
      <div className="px-5 py-3 text-xs text-text-tertiary border-t border-border space-y-1">
        <p>
          <strong className="text-text-secondary">Saisie</strong> : « 22 » →
          22 du mois en cours · « 22/04 14h30 » → date + heure · « 22/04/26 » → année précise
        </p>
        <p>
          <strong className="text-text-secondary">Bouton ✓</strong> marque
          maintenant · <strong className="text-text-secondary">×</strong> efface la date
        </p>
      </div>
    </div>
  );
}
