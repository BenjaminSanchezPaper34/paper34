/* eslint-disable @next/next/no-img-element -- Labo : illustrations provisoires servies telles quelles depuis R2 */
import { piece } from "./pieces";
import LoopVideo from "./LoopVideo";
import styles from "./accueil.module.css";

/**
 * Emplacement d'une pièce, au format réel de la future image ou vidéo.
 * Labo : une illustration provisoire (vraie photo ou vidéo de Benjamin) remplit le cadre,
 * le numéro reste visible pour savoir quoi remplacer ; la pièce attendue est décrite
 * dans la liste « Pièces à fournir ». Sans illustration, le cadre décrit la pièce.
 */
export default function PieceSlot({ id, legend, className = "", priority = false }: { id: string; legend?: string; className?: string; priority?: boolean }) {
  const p = piece(id);
  const m = p.media;
  return (
    <figure className={`${styles.piece} ${className}`}>
      <div className={m ? styles.mediaFrame : styles.pieceFrame} style={{ aspectRatio: p.ratio }}>
        {m?.type === "image" && <img className={styles.mediaFill} src={m.src} alt={m.credit} loading={priority ? "eager" : "lazy"} decoding="async" />}
        {m?.type === "video" && <LoopVideo src={m.src} poster={m.poster} label={m.credit} />}
        {m ? (
          <span className={styles.pieceBadge} title={`À remplacer : ${p.sujet}`}>{p.id}</span>
        ) : (
          <>
            <span className={styles.pieceTop}><b>{p.id}</b> {p.kind} · {p.format}</span>
            <span className={styles.pieceSujet}>{p.sujet}</span>
            <span className={styles.pieceSource}>Piste : {p.source}</span>
          </>
        )}
      </div>
      {(legend ?? m?.credit) && <figcaption>{legend ?? m?.credit}</figcaption>}
    </figure>
  );
}
