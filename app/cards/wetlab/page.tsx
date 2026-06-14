import styles from "../cards.module.css";
import TeamCard from "../../components/TeamCard";

const members = [
  { name: "NAME" },
  { name: "NAME" },
  { name: "NAME" },
  { name: "NAME" },
  { name: "NAME" },
  { name: "NAME" },
];

export default function WetLabPage() {
  return (
    <div className="px-4 py-8">
      <div className={`${styles.framePanel} ${styles.blue}`}>
        <span className={styles.label}>(WET LAB)</span>
        <div className={`${styles.framePanelInner} ${styles.blue}`}>
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