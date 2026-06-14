import styles from "../cards.module.css";
import TeamCard from "../../components/TeamCard";

const members = [
  { name: "NAME" },
  { name: "NAME" },
  { name: "NAME" },

];

export default function WebTeamPage() {
  return (
    <div className="px-4 py-8">
      <div className={`${styles.framePanel} ${styles.pink}`}>
        <span className={styles.label}>(WEB)</span>
        <div className={`${styles.framePanelInner} ${styles.pink}`}>
          <div className={styles.memberGrid}>
            {members.map((member, i) => (
              <TeamCard key={i} name={member.name} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}