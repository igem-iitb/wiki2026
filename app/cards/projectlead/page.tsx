import styles from "../cards.module.css";
import TeamCard from "../../components/TeamCard";

const members = [
  { name: "NAME" },
  { name: "NAME" },
];

export default function ProjectLeadsPage() {
  return (
    <div className="px-4 py-8">
      <div className={`${styles.framePanel} ${styles.navy}`}>
        <span className={styles.labelLeft}>(PROJECT LEADS)</span>
        <div className={`${styles.framePanelInner} ${styles.navy}`}>
          <div className={styles.leadsGrid}>
            {members.map((member, i) => (
              <TeamCard key={i} name={member.name} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}