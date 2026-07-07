import PlaceholderImage from "../components/PlaceholderImage";

const TEAM = [
  { name: "Emma Wu", role: "Editor-in-Chief" },
  { name: "Michelle Lin", role: "Operations Director" },
  { name: "Elaine Zhang", role: "Communications Director" },
  { name: "Audrey Na", role: "Technology Director" },
  { name: "Yanling Lin", role: "Editorial Director" },
  { name: "Maya John", role: "Visual Director" },
  { name: "Anna Ching", role: "Shadwell Director" },
  { name: "Reeanah Rahman", role: "Spotlight Director" },
];

const GRADES = [
  "Senior",
  "Junior",
  "Junior",
  "Junior",
  "Junior",
  "Senior",
  "Junior",
  "Senior",
];

export default function Masthead() {
  return (
    <div className="page container">
      <span className="kicker">The People Behind the Pages</span>
      <h1 className="page-title">Masthead</h1>
      <p className="lede">
        Meet the directors of <i>Threshold</i>
      </p>

      <hr className="rule-double" />

      <section className="team-grid">
        {TEAM.map((member, index) => (
          <div className="member" key={`${member.role}-${index}`}>
            <PlaceholderImage ratio="1" />
            <h3>{member.name}</h3>
            <p className="role">{member.role}</p>
            <p>{GRADES[index]}</p>
          </div>
        ))}
      </section>

      <blockquote className="pullquote">
        “I am out with lanterns looking for myself.”
        <cite>— Emily Dickinson</cite>
      </blockquote>
    </div>
  );
}
