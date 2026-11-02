import { piece } from "./pieces";
import styles from "./accueil.module.css";

/**
 * Emplacement d'une pièce à fournir, au format réel de la future image ou vidéo.
 * Il décrit ce qu'on doit y voir et où la trouver : la page sert à choisir quoi mettre.
 */
export default function PieceSlot({ id, legend, className = "" }: { id: string; legend?: string; className?: string }) {
  const p = piece(id);
  return (
    <figure className={`${styles.piece} ${className}`}>
      <div className={styles.pieceFrame} style={{ aspectRatio: p.ratio }} role="img" aria-label={`Emplacement ${p.id} à fournir : ${p.kind.toLowerCase()}, ${p.sujet}`}>
        <span className={styles.pieceTop}><b>{p.id}</b> {p.kind} · {p.format}</span>
        <span className={styles.pieceSujet}>{p.sujet}</span>
        <span className={styles.pieceSource}>Piste : {p.source}</span>
      </div>
      {legend && <figcaption>{legend}</figcaption>}
    </figure>
  );
}
