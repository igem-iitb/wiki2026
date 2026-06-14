import styles from "./cards.module.css";

export default function CardsPage() {
  return (
    <div className="px-4 py-8">
      {/* Team photo placeholder */}
      <div className={styles.teamPhoto}>
        <span className={styles.teamPhotoLabel}>TEAM PHOTO</span>
      </div>

      {/* Cascading panel stack */}
      <div className={styles.stack}>
        <div className={`${styles.panel} ${styles.web} ${styles.pink}`}>
          <span className={styles.label}>(WEB)</span>
        </div>

        <div className={`${styles.panel} ${styles.hp} ${styles.blue}`}>
          <span className={styles.label}>(HUMAN PRACTICES)</span>
        </div>

        <div className={`${styles.panel} ${styles.dry} ${styles.pink}`}>
          <span className={styles.label}>(DRY LAB)</span>
        </div>

        <div className={`${styles.panel} ${styles.wet} ${styles.blue}`}>
          <span className={styles.label}>(WET LAB)</span>
        </div>

        <div className={`${styles.panel} ${styles.leads} ${styles.navy}`}>
          <span className={styles.label}>(PROJECT LEADS)</span>
        </div>
      </div>
    </div>
  );
}