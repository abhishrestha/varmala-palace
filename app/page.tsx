"use client";

import { FormEvent, useEffect, useState } from "react";
import { ArrowRight, Menu, X } from "lucide-react";

const phone = "+917796437796";
const displayPhone = "077964 37796";
const images = [
  ["/images/wedding-lawn.svg", "A decorated outdoor wedding lawn at Varmala Palace"],
  ["/images/banquet-hall.svg", "Elegant banquet hall prepared for a wedding reception"],
  ["/images/celebration-stage.svg", "Varmala ceremony stage with warm floral details"],
  ["/images/family-celebration.svg", "Family celebration at a spacious marriage venue"],
];
const highlights = [
  ["✦", "Spacious 2-Acre Lawn"], ["⌂", "Banquet Hall"], ["◌", "AC Rooms"], ["▱", "Ample Car Parking"],
  ["♡", "Kids Play Area"], ["✧", "Decoration & Sound"], ["◒", "Generator Backup"], ["♿", "Wheelchair Accessible"],
];
const packages: [string, string, string[]][] = [
  ["Wedding", "A considered setting for a full wedding celebration.", ["Decoration", "Sound system", "Generator backup", "Waiters", "Jaimala / Varmala arrangements"]],
  ["Engagement", "Mark the beginning of a beautiful new chapter.", ["Decoration", "Sound system", "Generator backup", "Waiters", "Jaimala / Varmala arrangements"]],
  ["Reception", "A welcoming evening for family, friends and guests.", ["Decoration", "Sound system", "Generator backup", "Waiters"]],
  ["Other Events", "Birthdays and gatherings, shaped around your occasion.", ["Decoration", "Sound system", "Generator backup", "Waiters"]],
];

export default function Home() {
  const [slide, setSlide] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [sent, setSent] = useState(false);
  const [heroPaused, setHeroPaused] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    const timer = window.setInterval(() => { if (!heroPaused) setSlide((current) => (current + 1) % images.length); }, 5000);
    return () => window.clearInterval(timer);
  }, [heroPaused]);
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (lightbox === null) return;
      if (event.key === "Escape") setLightbox(null);
      if (event.key === "ArrowRight") setLightbox((lightbox + 1) % images.length);
      if (event.key === "ArrowLeft") setLightbox((lightbox + images.length - 1) % images.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox]);

  function submitForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const subject = encodeURIComponent(`Varmala Palace enquiry from ${data.get("name")}`);
    const body = encodeURIComponent(Array.from(data.entries()).map(([key, value]) => `${key}: ${value}`).join("\n"));
    window.location.href = `mailto:[TBD]?subject=${subject}&body=${body}`;
    setSent(true);
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": ["LocalBusiness", "EventVenue"],
        name: "Varmala Palace – Banquet Hall & Marriage Lawn", telephone: displayPhone,
        address: { "@type": "PostalAddress", streetAddress: "Sikra, Khadaura", addressLocality: "Bhabua", addressRegion: "Bihar", addressCountry: "IN", postalCode: "[PIN code TBD]" },
        geo: { "@type": "GeoCoordinates", latitude: "[TBD]", longitude: "[TBD]" },
        image: "/images/wedding-lawn.svg", openingHours: "[TBD]", sameAs: ["[TBD]", "[TBD]", "[TBD]"]
      }) }} />
      <header className={`site-header ${scrolled ? "scrolled" : ""}`}>
        <nav className="nav-inner" aria-label="Primary navigation">
          <div className="nav-links"><a href="#about">About Us</a><a href="#gallery">Gallery</a><a href="#contact">Contact</a></div>
          <a className="logo" href="#top" aria-label="Varmala Palace home">Varmala <span className="logo-mark">✦</span> Palace<small>Marriage Lawn &amp; Banquet Hall</small></a>
          <a className="button nav-action" href="#contact">Check Availability <ArrowRight size={16} aria-hidden="true" /></a>
          <button className="menu-button" aria-label="Open menu" aria-expanded={menuOpen} onClick={() => setMenuOpen(true)}><Menu aria-hidden="true" /></button>
        </nav>
        <div className="mobile-menu" hidden={!menuOpen}>
          <button className="menu-button" aria-label="Close menu" onClick={() => setMenuOpen(false)}><X aria-hidden="true" /></button>
          <a href="#about" onClick={() => setMenuOpen(false)}>About Us</a><a href="#gallery" onClick={() => setMenuOpen(false)}>Gallery</a><a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
          <a className="button" href="#contact" onClick={() => setMenuOpen(false)}>Check Availability →</a>
        </div>
      </header>

      <main id="top">
        <section className="hero" aria-label="Varmala Palace gallery slider" onMouseEnter={() => setHeroPaused(true)} onMouseLeave={() => setHeroPaused(false)}>
          {images.map(([src, alt], index) => <div key={src} className={`hero-slide ${index === slide ? "active" : ""}`} style={{ backgroundImage: `url(${src})` }} role="img" aria-label={alt} />)}
          <div className="hero-content"><p className="eyebrow">Varmala Palace · Khadaura, Bhabua</p><h1>Curated Luxury <em>Wedding Lawn</em> in Kaimur</h1><p className="hero-copy">A spacious 2-acre setting for thoughtful celebrations, timeless rituals and your most cherished people.</p><a className="button" href="#contact">Schedule a Visit <span aria-hidden="true">→</span></a><div className="slider-dots" role="tablist" aria-label="Choose hero image">{images.map(([, alt], index) => <button key={alt} className={index === slide ? "active" : ""} role="tab" aria-label={`Show slide ${index + 1}`} aria-selected={index === slide} onClick={() => setSlide(index)} />)}</div></div>
        </section>

        <section className="section" id="about"><div className="inner about-grid"><div><p className="section-kicker">The Varmala Palace story</p><h2>Where every <em>शादी</em> feels personal</h2><div className="rule" /><p className="about-copy">Varmala Palace is a marriage lawn and banquet hall in Bhabua, Kaimur, created for celebrations that feel generous, welcoming and beautifully yours. Across about 2 acres, our property brings together a grassy outdoor lawn, a banquet hall and dedicated car parking so that every part of your gathering has room to breathe.<br /><br />Rooted in the warmth of Bihar&apos;s traditional weddings, the space is made for the full rhythm of the occasion: the joyful welcome, the family rituals, the music, the meal and the quiet moments between them. Clean air-conditioned rooms and restrooms help guests settle in comfortably, while a children&apos;s play area keeps younger visitors happily occupied. From decoration and sound to generator backup, waiters and Jaimala or Varmala arrangements, our customizable packages are designed to make planning feel clear and celebrations feel effortless.</p></div><div className="image-frame"><img src="/images/banquet-hall.svg" alt="Airy banquet hall at Varmala Palace" /></div></div></section>

        <section className="section highlights"><div className="inner"><p className="section-kicker">Made for togetherness</p><h2>The details that <em>matter</em></h2><p className="section-intro">Comfort, care and practical spaces come together at this wedding venue in Bihar.</p><div className="highlight-grid">{highlights.map(([icon, title]) => <article className="highlight" key={title}><div className="highlight-icon" aria-hidden="true">{icon}</div><h3>{title}</h3></article>)}</div></div></section>

        <section className="section"><div className="inner"><p className="section-kicker">For every chapter</p><h2>Event <em>packages</em></h2><p className="section-intro">A flexible starting point for weddings, family milestones and celebrations of every shape. Contact us for pricing.</p><div className="packages-grid">{packages.map(([title, copy, inclusions]) => <article className="package" key={title}><h3>{title}</h3><p className="about-copy">{copy}</p><ul>{inclusions.map((item) => <li key={item}>{item}</li>)}</ul><p className="price">Contact for pricing</p></article>)}</div></div></section>

        <section className="section gallery" id="gallery"><div className="inner"><p className="section-kicker">A glimpse of the setting</p><h2>Moments made <em>memorable</em></h2><div className="gallery-grid">{images.concat(images.slice(0, 2)).map(([src, alt], index) => <button className="gallery-item" key={`${src}-${index}`} onClick={() => setLightbox(index % images.length)} aria-label={`Open ${alt}`}><img src={src} alt={alt} loading="lazy" /></button>)}</div></div></section>

        <section className="section"><div className="inner location-grid"><div><p className="section-kicker">Visit us</p><h2>Find your way <em>here</em></h2><div className="accordion"><details open><summary>Getting Here <span>+</span></summary><p>Sikra, Khadaura, Bhabua, Kaimur district, Bihar [PIN code TBD]<br /><a className="contact-link" href="https://www.google.com/maps/search/?api=1&query=Sikra+Khadaura+Bhabua+Bihar" target="_blank" rel="noreferrer">Open Google Maps →</a></p></details><details><summary>Nearest Railway Station / Airport <span>+</span></summary><p>Distances [TBD]. Please contact the team for current local guidance.</p></details><details><summary>Local Transport <span>+</span></summary><p>Local transport information [TBD].</p></details></div></div><div className="map"><iframe title="Map showing Varmala Palace area in Khadaura, Bhabua" loading="lazy" src="https://www.google.com/maps?q=Khadaura%2C%20Bhabua%2C%20Bihar&output=embed" /></div></div></section>

        <section className="section" id="contact"><div className="inner contact-grid"><div><p className="section-kicker">Let&apos;s plan something beautiful</p><h2>Start your <em>conversation</em></h2><p className="section-intro">Tell us a little about your occasion. We&apos;ll help you find the right setting and package.</p><form className="contact-form" onSubmit={submitForm}><div className="form-row"><label>Name<input name="name" required /></label><label>Phone<input name="phone" type="tel" required /></label></div><div className="form-row"><label>Event Date<input name="event date" type="date" required /></label><label>Event Type<select name="event type" required defaultValue=""><option value="" disabled>Select one</option><option>Wedding</option><option>Engagement / Ring Ceremony</option><option>Reception</option><option>Birthday / Other Event</option></select></label></div><label>Guests<input name="guests" type="number" min="1" placeholder="Approximate guest count" /></label><label>Message<textarea name="message" placeholder="Tell us about your plans" /></label><button className="button" type="submit">Send Enquiry →</button>{sent && <p role="status">Your email client should open with the enquiry details. You can also reach us on WhatsApp.</p>}</form></div><aside className="contact-aside"><p>Call or message us directly</p><a className="contact-link" href={`tel:${phone}`}>{displayPhone}</a><a className="button" href={`https://wa.me/${phone.replace("+", "")}`} target="_blank" rel="noreferrer">WhatsApp Us →</a><p className="contact-link">Sikra, Khadaura,<br />Bhabua, Kaimur district,<br />Bihar [PIN code TBD]</p><p>Email: [TBD]</p></aside></div></section>
      </main>

      <footer><div className="inner"><div className="footer-grid"><div><a className="logo" href="#top">Varmala <span className="logo-mark">✦</span> Palace<small>Marriage Lawn &amp; Banquet Hall</small></a><p>Gather beautifully. Celebrate completely.</p></div><div><h3>Quick Links</h3><div className="footer-links"><a href="#about">About Us</a><a href="#gallery">Gallery</a><a href="#contact">Contact</a></div></div><div><h3>Get in Touch</h3><p>Sikra, Khadaura, Bhabua,<br />Kaimur district, Bihar [PIN code TBD]</p><a href={`tel:${phone}`}>{displayPhone}</a><p>[TBD]</p></div><div><h3>Follow Along</h3><div className="socials"><a href="#" aria-label="YouTube">YT</a><a href="#" aria-label="Facebook">f</a><a href="#" aria-label="Instagram">ig</a></div></div></div><div className="copyright"><span>© 2026 Varmala Palace. All rights reserved.</span><a href="#">Privacy Policy</a></div></div></footer>
      <div className="bottom-bar"><a href={`tel:${phone}`}>Call</a><a href={`https://wa.me/${phone.replace("+", "")}`} target="_blank" rel="noreferrer">WhatsApp</a></div>
      {lightbox !== null && <div className="lightbox" role="dialog" aria-modal="true" aria-label="Gallery image viewer" onClick={() => setLightbox(null)}><button className="close" aria-label="Close gallery" onClick={() => setLightbox(null)}>×</button><button className="previous" aria-label="Previous image" onClick={(event) => { event.stopPropagation(); setLightbox((lightbox + images.length - 1) % images.length); }}>‹</button><img src={images[lightbox][0]} alt={images[lightbox][1]} onClick={(event) => event.stopPropagation()} /><button className="next" aria-label="Next image" onClick={(event) => { event.stopPropagation(); setLightbox((lightbox + 1) % images.length); }}>›</button></div>}
    </>
  );
}
