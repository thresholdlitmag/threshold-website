import { FormEvent } from "react";
import PlaceholderImage from "../components/PlaceholderImage";

export default function Contact() {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // Wire this to a form backend (Formspree, Google Forms, etc.) later.
    alert("Thank you! (This form is a placeholder — no message was sent.)");
  }

  return (
    <div className="page container">
      <span className="kicker">Get in Touch</span>
      <h1 className="page-title">Contact</h1>
      <p className="lede">
        Lorem ipsum dolor sit amet — questions, ideas, or just want to say
        hello? Write to us.
      </p>

      <hr className="rule-double" />

      <section className="grid-2">
        <form className="form" onSubmit={handleSubmit}>
          <label>
            Name
            <input type="text" name="name" placeholder="Your name" required />
          </label>
          <label>
            Email
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              required
            />
          </label>
          <label>
            Subject
            <select name="subject" defaultValue="general">
              <option value="general">General inquiry</option>
              <option value="submissions">Submissions</option>
              <option value="joining">Joining the team</option>
              <option value="other">Something else</option>
            </select>
          </label>
          <label>
            Message
            <textarea
              name="message"
              rows={6}
              placeholder="Lorem ipsum dolor sit amet..."
              required
            />
          </label>
          <div>
            <button className="btn" type="submit">
              Send Message
            </button>
          </div>
        </form>

        <aside className="sidebar">
          <PlaceholderImage ratio="16 / 11" caption="Photo — placeholder" />
          <div className="sidebar__box">
            <h3>Elsewhere</h3>
            <ul>
              <li>
                <a href="mailto:hello@example.com">hello@example.com</a>
                <em>General inquiries</em>
              </li>
              <li>
                <a href="mailto:submissions@example.com">
                  submissions@example.com
                </a>
                <em>Submissions only</em>
              </li>
              <li>
                <a href="#" onClick={(e) => e.preventDefault()}>
                  @threshold.magazine
                </a>
                <em>Instagram</em>
              </li>
            </ul>
          </div>
        </aside>
      </section>
    </div>
  );
}
