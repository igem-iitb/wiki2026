"use client";

import styles from "./WaveFooter.module.css";

export default function WaveFooter() {
  return (
    <div className={styles.waveContainer}>
      <div className={`${styles.waveLayer} ${styles.waveLayer1}`} />
      <div className={`${styles.waveLayer} ${styles.waveLayer2}`} />
      <div className={`${styles.waveLayer} ${styles.waveLayer3}`} />
    </div>
  );
}
