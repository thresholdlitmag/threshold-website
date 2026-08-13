import { FormEvent } from "react";
import { CONTACT_EMAIL } from "../data/site";
import { showerPetals } from "../lib/petals";

export default function Contact() {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    showerPetals();
    // Wire this to a form backend (Formspree, Google Forms, etc.) later.
    // The alert waits a beat so the petals are on screen behind it.
    window.setTimeout(
      () =>
        alert("Thank you! (This form is a placeholder — no message was sent.)"),
      450,
    );
  }

  return (
    <div className="page container">
      <span className="kicker">Get in Touch</span>
      <h1 className="page-title">Contact</h1>
      <p className="lede">
        Questions, ideas, or just want to say hello? Write to us — we read
        everything that comes in.
      </p>

      <hr className="rule-double" />

      <section className="contact-single">
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
              placeholder="hello@gmail.com"
              required
            />
          </label>
          <label>
            Subject
            <select name="subject" defaultValue="general">
              <option value="general">General inquiry</option>
              <option value="submissions">Submissions</option>
              <option value="other">Something else</option>
            </select>
          </label>
          <label>
            Message
            <textarea
              name="message"
              rows={6}
              placeholder="Salutations! My name is hello, and I was wondering whether I could say hi..."
              required
            />
          </label>
          <div>
            <button className="btn" type="submit">
              Send Message
            </button>
          </div>
        </form>

        <div className="sidebar__box">
          <h3>Elsewhere</h3>
          <ul>
            <li>
              <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
              <em>Email</em>
            </li>
            <li>
              <a
                href="https://www.instagram.com/threshlitmag"
                target="_blank"
                rel="noreferrer"
              >
                @threshlitmag
              </a>
              <em>Instagram</em>
            </li>
            <li>
              <a
                href="https://www.facebook.com/p/Threshold-Literary-and-Arts-Magazine-100049047613023/"
                target="_blank"
                rel="noreferrer"
              >
                Threshold Literary and Arts Magazine
              </a>
              <em>Facebook</em>
            </li>
            <li>
              <a href="#" onClick={(e) => e.preventDefault()}>
                7GV5-NS9W-SBDDC
              </a>
              <em>Schoology Group Code</em>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
