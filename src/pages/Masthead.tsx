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

const LOREM_BIO =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.";

export default function Masthead() {
  return (
    <div className="page container">
      <span className="kicker">The People Behind the Pages</span>
      <h1 className="page-title">Masthead</h1>
      <p className="lede">
        Lorem ipsum dolor sit amet — meet the editors, readers, and designers
        of Threshold.
      </p>

      <hr className="rule-double" />

      <section className="team-grid">
        {TEAM.map((member, index) => (
          <div className="member" key={`${member.role}-${index}`}>
            <PlaceholderImage ratio="1" />
            <h3>{member.name}</h3>
            <p className="role">{member.role}</p>
            <p>{LOREM_BIO}</p>
          </div>
        ))}
      </section>

      <blockquote className="pullquote">
        “Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse
        quam nihil molestiae consequatur.”
        <cite>— The Threshold editors (placeholder)</cite>
      </blockquote>
    </div>
  );
}
