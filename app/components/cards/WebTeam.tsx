import styles from "../../team/kyt/cards.module.css";
import TeamCard from "../TeamCard";

const members = [
  { name: "NAME" },
  { name: "NAME" },
  { name: "NAME" },
];

export default function WebTeam() {
  return (
    <div className={styles.panelWrapper} style={{ backgroundImage: "url('/panels/web-panel.png')" }}>
      <div className={styles.memberGrid}>
        {members.map((member, i) => (
          <TeamCard key={i} name={member.name} />
        ))}
      </div>
    </div>
  );
}
