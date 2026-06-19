import styles from "./Footer.module.css";
import WaveFooter from "./WaveFooter";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      {/* Animated water waves */}
      <WaveFooter />
    </footer>
  );
}
