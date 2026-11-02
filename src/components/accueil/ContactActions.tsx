"use client";

import Link from "next/link";
import { track } from "@vercel/analytics";
import { CONTACT_INFO } from "@/lib/constants";
import styles from "./accueil.module.css";

/** Tous les canaux, au choix du visiteur (décision du 27/10/2026). Chaque clic est mesuré. */
const TEL = `tel:${CONTACT_INFO.phone.replace(/\s/g, "")}`;
// WhatsApp sur le même numéro, au format international (à confirmer par Benjamin).
const WHATSAPP = `https://wa.me/33${CONTACT_INFO.phone.replace(/\s/g, "").slice(1)}`;

type Where = "hero" | "contact" | "barre-mobile";

export default function ContactActions({ where, withEmail = false }: { where: Where; withEmail?: boolean }) {
  const mesure = (canal: string) => () => track(canal, { emplacement: where });
  return (
    <div className={where === "barre-mobile" ? styles.barActions : styles.actions}>
      <a className={styles.actionPrimary} href={TEL} onClick={mesure("tel")}>Appeler</a>
      <a className={styles.actionSecondary} href={WHATSAPP} target="_blank" rel="noopener noreferrer" onClick={mesure("whatsapp")}>WhatsApp</a>
      <Link className={styles.actionSecondary} href="/contact" onClick={mesure("formulaire")}>Écrire</Link>
      {withEmail && <a className={styles.actionText} href={`mailto:${CONTACT_INFO.email}`} onClick={mesure("email")}>{CONTACT_INFO.email}</a>}
    </div>
  );
}
