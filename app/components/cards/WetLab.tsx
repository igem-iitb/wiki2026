import styles from "../../team/kyt/cards.module.css";
import TeamCard from "../TeamCard";

const members = [
  { name: "NAME" },
  { name: "NAME" },
  { name: "NAME" },
  { name: "NAME" },
  { name: "NAME" },
  { name: "NAME" },
];

export default function WetLab() {
  return (
    <div className={styles.panelWrapper} style={{ backgroundImage: "url('/panels/wetlab-panel.png')" }}>
      <div className={styles.memberGrid}>
        {members.map((member, i) => (
          <TeamCard key={i} name={member.name} />
        ))}
      </div>
    </div>
  );
}
