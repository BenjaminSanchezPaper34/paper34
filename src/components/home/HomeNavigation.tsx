"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import styles from "./home-navigation.module.css";

const chapters = [
  { label: "Accompagnement", href: "#accompagnement" },
  { label: "Prestations", href: "#expertises" },
  { label: "Réalisations", href: "#realisations" },
  { label: "À propos", href: "#a-propos" },
];

/** Navigation toujours accessible sur l'accueil, avec un CTA visible sans ouvrir le menu. */
export default function HomeNavigation() {
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  return <nav className={styles.nav} aria-label="Navigation principale"
    onKeyDown={(event) => {
      if (event.key === "Escape") { setOpen(false); menuButton.current?.focus(); }
    }}
    onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false); }}>
    <div className={styles.bar}>
      <a className={styles.logo} href="#accueil" onClick={() => setOpen(false)}><Image src="/images/logo-paper34.svg" width={154} height={28} alt="Paper34 — Accueil" /></a>
      <div className={styles.desktop}>{chapters.map(chapter => <a key={chapter.href} href={chapter.href}>{chapter.label}</a>)}<a className={styles.cta} href="/contact">Démarrer un projet</a></div>
      <button className={styles.menuButton} ref={menuButton} type="button" aria-expanded={open} aria-controls={open ? "home-mobile-navigation" : undefined} onClick={() => setOpen(!open)}>{open ? "Fermer" : "Menu"}<span aria-hidden="true">{open ? "×" : "+"}</span></button>
    </div>
    <div className={styles.mobileActions}><a href="#accompagnement" onClick={() => setOpen(false)}>Accompagnement</a><a className={styles.cta} href="/contact">Démarrer un projet</a></div>
    {open && <div className={styles.mobileMenu} id="home-mobile-navigation" data-lenis-prevent>{chapters.map(chapter => <a key={chapter.href} href={chapter.href} onClick={() => setOpen(false)}>{chapter.label}</a>)}<a href="#contact" onClick={() => setOpen(false)}>Coordonnées</a></div>}
  </nav>;
}
