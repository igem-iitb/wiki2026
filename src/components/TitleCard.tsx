import styles from './PageShell.module.css';

type Props = {
  title: string;
  /** Kept for callers; the icon is picked by title. */
  art?: string;
};

/**
 * The title banner on every tab: the Figma title frame with the title in the home page's font.
 */
export default function TitleCard({ title }: Props) {

  return (
    <div className={styles.titleWrap}>
      <div className={styles.collage}>

        <h1 className={styles.collageTitle}>{title}</h1>

      </div>
    </div>
  );
}
