import styles from "./Footer.module.css";
import WaveFooter from "./WaveFooter";

type FooterProps = {
  bgColor?: string;
};

export default function Footer({ bgColor = "#181830" }: FooterProps) {
  return (
    <footer className={styles.footer} style={{ background: bgColor }}>
      {/* Animated water waves — positioned at the top of the footer */}
      <div className={styles.wavesArea}>
        <WaveFooter />
      </div>

      {/* Footer content sitting IN the water body (below the wave crests) */}
      <div className={styles.body}>
        <div className={styles.content}>
          {/* Left: iGEM IITB logo */}
          <div className={styles.logoBox}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/igem-iitb-logo.png"
              alt="iGEM IIT Bombay"
              className={styles.logo}
            />
          </div>

          {/* Center: Aureolyze logo + Sponsors */}
          <div className={styles.middle}>
            <div className={styles.aureolyzeBox}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/aureolyze-logo.png"
                alt="Aureolyze"
                className={styles.aureolyzeLogo}
              />
            </div>
            <p className={styles.sponsorsLabel}>SPONSORS</p>
            <div className={styles.sponsorsBox} />
          </div>

          {/* Right: Contact + Social circles */}
          <div className={styles.right}>
            <h2 className={styles.contactHeading}>CONTACT US</h2>
            <address className={styles.address}>
              IIT Bombay, Powai,
              <br />
              Mumbai, Maharashtra, 400076
              <br />
              <a href="mailto:igem.iitb@gmail.com" className={styles.email}>
                igem.iitb@gmail.com
              </a>
            </address>

            {/* Social icons */}
            <div className={styles.socials}>
              <a href="mailto:igem.iitb@gmail.com" className={styles.socialCircle} aria-label="Email">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><polyline points="22,7 12,13 2,7"/></svg>
              </a>
              <a href="https://twitter.com" className={styles.socialCircle} aria-label="Twitter">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
              </a>
              <a href="https://instagram.com/igem_iitb" className={styles.socialCircle} aria-label="Instagram">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1.5"/></svg>
              </a>
              <a href="https://www.linkedin.com/company/igem-iit-bombay/" className={styles.socialCircle} aria-label="LinkedIn">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className={styles.bottomBar}>
          <span>© 2026 iGEM IIT Bombay Team | Licensed under <a href="https://creativecommons.org/licenses/by/4.0/" className={styles.link}>CC BY 4.0</a></span>
          <span>The repository used to create this website is available at <a href="https://gitlab.igem.org/2026/iit-bombay" className={styles.link}>gitlab.igem.org/2026/iit-bombay</a></span>
        </div>
      </div>
    </footer>
  );
}
