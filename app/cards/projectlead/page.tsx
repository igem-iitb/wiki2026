import styles from "../cards.module.css";
import TeamCard from "../../components/TeamCard";

const members = [
  { name: "NAME" },
  { name: "NAME" },
];

export default function ProjectLeadsPage() {
  return (
    <div className={styles.panelWrapper} style={{ backgroundImage: "url('/panels/leads-panel.png')" }}>
      <div className={styles.leadsGrid}>
        {members.map((member, i) => (
          <TeamCard key={i} name={member.name} />
        ))}
      </div>
    </div>
  );
}