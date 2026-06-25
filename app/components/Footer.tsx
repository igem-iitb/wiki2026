import styles from "./Footer.module.css";
import WaveFooter from "./WaveFooter";

type FooterProps = {
  bgColor?: string;
};

export default function Footer({ bgColor = "#181830" }: FooterProps) {
  return (
    <footer className={styles.footer} style={{ background: bgColor }}>
      {/* Animated water waves */}
      <WaveFooter />
    </footer>
  );
}
