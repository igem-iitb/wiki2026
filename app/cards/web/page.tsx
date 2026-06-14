import styles from "../cards.module.css";
import TeamCard from "../../components/TeamCard";

const members = [
  { name: "NAME" },
  { name: "NAME" },
  { name: "NAME" },
];

export default function WebTeamPage() {
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