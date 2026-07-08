import PlaceholderImage from "../components/PlaceholderImage";

const TEAM = [
  { name: "Emma Wu", role: "Editor-in-Chief", grade: "Senior", image: "/pfp/ewu.jpg" },
  { name: "Michelle Lin", role: "Operations Director", grade: "Junior", image: "/pfp/mlin.jpg" },
  { name: "Elaine Zhang", role: "Communications Director", grade: "Junior", image: "/pfp/ezhang.jpg" },
  { name: "Audrey Na", role: "Technology Director", grade: "Junior", image: "/pfp/ana.jpg" },
  { name: "Yanling Lin", role: "Editorial Director", grade: "Junior", image: "/pfp/ylin.jpg" },
  { name: "Maya John", role: "Visual Director", grade: "Senior", image: "/pfp/mjohn.jpg" },
  { name: "Anna Ching", role: "Shadwell Director", grade: "Junior", image: "/pfp/aching.jpg" },
  { name: "Reeanah Rahman", role: "Spotlight Director", grade: "Senior", image: "/pfp/rrahman.jpg" },
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
            <img ratio="1">{member.image}</img>
            <h3>{member.name}</h3>
            <p className="role">{member.role}</p>
            <p>{member.grade}</p>
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
