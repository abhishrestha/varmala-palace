"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Check, ChevronDown, Menu, MessageCircle, Phone, X } from "lucide-react";

type Dictionary = typeof import("./dictionaries/en.json");
type Language = "en" | "hi";
const phone1 = "+917796437796";
const phone2 = "+919097565654";
const phoneLabel1 = "+91 77964 37796";
const phoneLabel2 = "+91 90975 65654";
const imagePaths = ["/images/weddinglawn01.webp", "/images/weddinglawn02.jpeg", "/images/weddinglawn03.jpeg", "/images/celebrations.webp"];
const galleryImages = [
  "/images/weddinglawn01.webp",
  "/images/weddinglawn02.jpeg",
  "/images/weddinglawn03.jpeg",
  "/images/hall.jpeg",
  "/images/hall2.jpeg",
  "/images/stage.webp",
  "/images/celebrations.webp",
];
const galleryDimensions = [[1360, 609], [1600, 900], [1600, 720], [1280, 960], [4096, 1834], [1360, 907], [1360, 1020]] as const;
const icons = ["✦", "⌂", "◌", "▱", "♡", "✧", "◒", "⌁"];

export default function VenuePage({ dictionary, language }: { dictionary: Dictionary; language: Language }) {
  const t = dictionary;
  const [slide, setSlide] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [paused, setPaused] = useState(false);
  const [sent, setSent] = useState(false);
  const touchStart = useRef<number | null>(null);

  useEffect(() => {
    document.documentElement.lang = language;
    const savedLanguage = localStorage.getItem("varmala-language");
    if (savedLanguage && savedLanguage !== language) window.location.replace(savedLanguage === "hi" ? "/hi/" : "/");
    localStorage.setItem("varmala-language", language);
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [language]);
  useEffect(() => {
    const timer = window.setInterval(() => { if (!paused) setSlide((value) => (value + 1) % imagePaths.length); }, 5000);
    return () => window.clearInterval(timer);
  }, [paused]);
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (lightbox === null) return;
      if (event.key === "Escape") setLightbox(null);
      if (event.key === "ArrowRight") setLightbox((lightbox + 1) % galleryImages.length);
      if (event.key === "ArrowLeft") setLightbox((lightbox + galleryImages.length - 1) % galleryImages.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox]);

  const href = (id: string) => `#${id}`;
  const whatsapp = `https://wa.me/${phone1}`;
  const mapUrl = "https://www.google.com/maps/search/?api=1&query=Varmala%20Palace%2C%202JPJ%2BMC2%2C%20Bhabua%2C%20Sikra%2C%20Bihar%20821101";
  function closeMenu() { setMenuOpen(false); }
  function submitForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const body = encodeURIComponent(`New Varmala Palace enquiry\n\n${Array.from(data.entries()).map(([key, value]) => `${key}: ${value}`).join("\n")}`);
    window.location.href = `${whatsapp}?text=${body}`;
    setSent(true);
  }
  function moveLightbox(direction: number) { setLightbox((value) => value === null ? 0 : (value + direction + galleryImages.length) % galleryImages.length); }

  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
      "@context": "https://schema.org", "@type": ["LocalBusiness", "EventVenue"],
      name: "Varmala Palace – Banquet Hall & Marriage Lawn", alternateName: "वरमाला पैलेस",
      address: { "@type": "PostalAddress", addressLocality: "Bhabua", addressRegion: "Bihar", postalCode: "821101", addressCountry: "IN" },
      telephone: [phone1, phone2], email: "vermalapalace@gmail.com", geo: { "@type": "GeoCoordinates", latitude: "[TBD]", longitude: "[TBD]" },
      image: "/images/weddinglawn01.webp", sameAs: ["[YouTube URL TBD]", "[Facebook URL TBD]", "[Instagram URL TBD]"]
    }) }} />
    <link rel="preload" as="image" href={imagePaths[0]} />
    <header className={`site-header ${scrolled ? "scrolled" : ""}`}><nav className="nav-inner" aria-label={language === "hi" ? "मुख्य नेविगेशन" : "Primary navigation"}>
      <div className="nav-links"><a href={href("about")}>{t.nav.about}</a><a href={href("packages")}>{t.nav.packages}</a><a href={href("menu")}>{t.nav.menu}</a><a href={href("gallery")}>{t.nav.gallery}</a><a href={href("contact")}>{t.nav.contact}</a></div>
      <a className="logo" href="#top" aria-label="Varmala Palace home">Varmala <span className="logo-mark">✦</span> Palace<small>वरमाला पैलेस · Banquet Hall &amp; Marriage Lawn</small></a>
      <div className="language-switcher" aria-label="Language switcher"><a className={language === "en" ? "active" : ""} href="/" onClick={() => localStorage.setItem("varmala-language", "en")}>ENG</a><span>|</span><a className={language === "hi" ? "active" : ""} href="/hi/" onClick={() => localStorage.setItem("varmala-language", "hi")}>HIN</a></div>
      <button className="menu-button" aria-label={language === "hi" ? "मेन्यू खोलें" : "Open menu"} aria-expanded={menuOpen} onClick={() => setMenuOpen(true)}><Menu aria-hidden="true" /></button>
    </nav>
    <div className="mobile-menu" hidden={!menuOpen}><div className="mobile-language"><a href="/" onClick={() => localStorage.setItem("varmala-language", "en")}>ENG</a><span>|</span><a href="/hi/" onClick={() => localStorage.setItem("varmala-language", "hi")}>HIN</a></div><button className="menu-button" aria-label={language === "hi" ? "मेन्यू बंद करें" : "Close menu"} onClick={closeMenu}><X aria-hidden="true" /></button><a href={href("about")} onClick={closeMenu}>{t.nav.about}</a><a href={href("packages")} onClick={closeMenu}>{t.nav.packages}</a><a href={href("menu")} onClick={closeMenu}>{t.nav.menu}</a><a href={href("gallery")} onClick={closeMenu}>{t.nav.gallery}</a><a href={href("contact")} onClick={closeMenu}>{t.nav.contact}</a><a className="button" href={href("contact")} onClick={closeMenu}>{t.nav.availability} <ArrowRight size={16} /></a></div>
    </header>

    <main id="top">
      <section className="hero" aria-label={language === "hi" ? "वरमाला पैलेस इमेज स्लाइडर" : "Varmala Palace image slider"} onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onTouchStart={(event) => { touchStart.current = event.touches[0].clientX; }} onTouchEnd={(event) => { if (touchStart.current === null) return; const delta = event.changedTouches[0].clientX - touchStart.current; if (Math.abs(delta) > 40) setSlide((slide + (delta < 0 ? 1 : 3)) % 4); touchStart.current = null; }}>
        {imagePaths.map((src, index) => <div key={src} className={`hero-slide ${index === slide ? "active" : ""}`} style={{ backgroundImage: `url(${src})` }} role="img" aria-label={t.gallery.alts[index]} />)}
        <div className="hero-content"><p className="eyebrow">{t.hero.eyebrow}</p><h1>{t.hero.title.replace(t.hero.accent, "")}<em>{t.hero.accent}</em></h1><p className="hero-copy">{t.hero.copy}</p><a className="button" href={href("contact")}>{t.hero.cta} <ArrowRight size={16} aria-hidden="true" /></a><div className="slider-dots" role="tablist" aria-label={language === "hi" ? "स्लाइड चुनें" : "Choose hero image"}>{imagePaths.map((src, index) => <button key={src} className={index === slide ? "active" : ""} role="tab" aria-label={`${index + 1}`} aria-selected={index === slide} onClick={() => setSlide(index)} />)}</div></div>
      </section>

      <section className="section" id="about"><div className="inner about-grid"><div><p className="section-kicker">{t.about.kicker}</p><h2>{t.about.title.replace(t.about.accent, "")}<em>{t.about.accent}</em></h2><div className="rule" /><p className="about-copy">{t.about.copyFirst}</p><p className="about-copy">{t.about.copySecond}</p></div><div className="image-frame about-image"><img src="/images/hall.jpeg" alt={t.about.alt} width="1280" height="960" /></div></div></section>

      <section className="section highlights"><div className="inner"><p className="section-kicker">{t.highlights.kicker}</p><h2>{t.highlights.title}</h2><p className="section-intro">{t.highlights.intro}</p><div className="highlight-grid">{t.highlights.items.map((item, index) => <article className="highlight" key={item}><div className="highlight-icon" aria-hidden="true">{icons[index]}</div><h3>{item}</h3></article>)}</div></div></section>

      <section className="section" id="packages"><div className="inner"><p className="section-kicker">{t.packages.kicker}</p><h2>{t.packages.title}</h2><p className="section-intro">{t.packages.intro}</p><div className="packages-grid"><PackageCard title={t.packages.silver} items={t.packages.silverItems} quote={t.packages.quote} /><PackageCard title={t.packages.gold} note={t.packages.goldNote} items={[...t.packages.silverItems, ...t.packages.goldItems]} quote={t.packages.quote} /><PackageCard title={t.packages.platinum} note={t.packages.platinumNote} items={[...t.packages.silverItems, ...t.packages.goldItems, ...t.packages.platinumItems]} quote={t.packages.quote} /></div><div className="good-to-know"><strong>{t.packages.goodToKnow}</strong>{t.packages.notes.map((note) => <span key={note}><Check size={15} />{note}</span>)}</div></div></section>

      <section className="section menu-section" id="menu"><div className="inner"><p className="section-kicker">{t.menu.kicker}</p><h2>{t.menu.title}</h2><p className="section-intro">{t.menu.intro}</p><div className="menu-grid">{t.menu.cards.map((card) => <article className="menu-card" key={card.title}><h3>{card.title}</h3><span>{card.tag}</span><ul>{card.items.map((item) => <li key={item}>{item}</li>)}</ul></article>)}</div><div className="menu-caption"><p>{t.menu.caption}</p><span>{t.menu.request}</span><a className="button" href={href("contact")}>{t.packages.quote} <ArrowRight size={16} /></a></div></div></section>

      <section className="section gallery" id="gallery"><div className="inner"><p className="section-kicker">{t.gallery.kicker}</p><h2>{t.gallery.title.replace(t.gallery.accent, "")}<em>{t.gallery.accent}</em></h2><div className="gallery-grid">{galleryImages.map((src, index) => <button className="gallery-item" key={src} onClick={() => setLightbox(index)} aria-label={`${language === "hi" ? "खोलें" : "Open"} ${t.gallery.alts[index % t.gallery.alts.length]}`}><img src={src} alt={t.gallery.alts[index % t.gallery.alts.length]} loading="lazy" width={galleryDimensions[index][0]} height={galleryDimensions[index][1]} /></button>)}</div></div></section>

      <section className="section"><div className="inner location-grid"><div><p className="section-kicker">{t.location.kicker}</p><h2>{t.location.title.replace(t.location.accent, "")}<em>{t.location.accent}</em></h2><div className="accordion"><details open><summary>{t.location.getting}<ChevronDown size={20} /></summary><p>{t.location.address}<br /><a className="contact-link" href={mapUrl} target="_blank" rel="noreferrer">{t.location.maps} <ArrowRight size={16} /></a></p></details><details><summary>{t.location.rail}<ChevronDown size={20} /></summary><p>{t.location.railCopy}</p></details></div></div><div className="map"><iframe title={t.location.mapAlt} loading="lazy" src="https://www.google.com/maps?q=Varmala%20Palace%2C%202JPJ%2BMC2%2C%20Bhabua%2C%20Sikra%2C%20Bihar%20821101&output=embed" /></div></div></section>

      <section className="section" id="contact"><div className="inner contact-grid"><div><p className="section-kicker">{t.contact.kicker}</p><h2>{t.contact.title.replace(t.contact.accent, "")}<em>{t.contact.accent}</em></h2><p className="section-intro">{t.contact.intro}</p><form className="contact-form" onSubmit={submitForm}><div className="form-row"><label>{t.contact.name}<input name="name" required /></label><label>{t.contact.phone}<input name="phone" type="tel" required /></label></div><div className="form-row"><label>{t.contact.date}<input name="event date" type="date" required /></label><label>{t.contact.type}<select name="event type" required defaultValue=""><option value="" disabled>{t.contact.choose}</option>{t.events.map((event) => <option key={event}>{event}</option>)}</select></label></div><label>{t.contact.guests}<input name="guests" type="number" min="1" placeholder={t.contact.placeholderGuests} /></label><label>{t.contact.message}<textarea name="message" placeholder={t.contact.placeholderMessage} /></label><button className="button" type="submit">{t.contact.send} <ArrowRight size={16} /></button>{sent && <p role="status">{t.contact.sent}</p>}</form></div><aside className="contact-aside"><p>{t.contact.call}</p><a className="contact-link" href={`tel:${phone1}`}>{phoneLabel1}</a><a className="contact-link" href={`tel:${phone2}`}>{phoneLabel2}</a><a className="button" href={whatsapp} target="_blank" rel="noreferrer"><MessageCircle size={16} />{t.contact.whatsapp}</a><p className="contact-address">{t.location.address}</p><a href={`mailto:${t.contact.email}`}>{t.contact.email}</a></aside></div></section>
    </main>

    <footer><div className="inner"><div className="footer-grid"><div><a className="logo" href="#top">Varmala <span className="logo-mark">✦</span> Palace<small>{t.footer.tagline}</small></a></div><div><h3>{t.footer.quick}</h3><div className="footer-links"><a href={href("about")}>{t.nav.about}</a><a href={href("packages")}>{t.nav.packages}</a><a href={href("menu")}>{t.nav.menu}</a><a href={href("gallery")}>{t.nav.gallery}</a><a href={href("contact")}>{t.nav.contact}</a></div></div><div><h3>{t.footer.touch}</h3><p>{t.location.address}</p><a href={`tel:${phone1}`}>{phoneLabel1}</a><a href={`tel:${phone2}`}>{phoneLabel2}</a><a href={`mailto:${t.contact.email}`}>{t.contact.email}</a></div><div><h3>{t.footer.social}</h3><div className="socials"><a href="#" aria-label="YouTube">YT</a><a href="#" aria-label="Facebook">f</a><a href="#" aria-label="Instagram">ig</a></div></div></div></div></footer>
    <div className="bottom-bar"><a href={`tel:${phone1}`}><Phone size={15} />{t.contact.call}</a><a href={whatsapp} target="_blank" rel="noreferrer"><MessageCircle size={15} />WhatsApp</a></div>
    {lightbox !== null && <div className="lightbox" role="dialog" aria-modal="true" aria-label={language === "hi" ? "गैलरी इमेज" : "Gallery image viewer"} onClick={() => setLightbox(null)}><button className="close" aria-label={language === "hi" ? "बंद करें" : "Close gallery"} onClick={() => setLightbox(null)}><X /></button><button className="previous" aria-label="Previous image" onClick={(event) => { event.stopPropagation(); moveLightbox(-1); }}><ArrowLeft /></button><img src={galleryImages[lightbox]} alt={t.gallery.alts[lightbox % t.gallery.alts.length]} width={galleryDimensions[lightbox][0]} height={galleryDimensions[lightbox][1]} onClick={(event) => event.stopPropagation()} /><button className="next" aria-label="Next image" onClick={(event) => { event.stopPropagation(); moveLightbox(1); }}><ArrowRight /></button></div>}
  </>;
}

function PackageCard({ title, note, items, quote }: { title: string; note?: string; items: string[]; quote: string }) {
  return <article className="package"><h3>{title}</h3>{note && <p className="package-note">{note}</p>}<ul>{items.map((item) => <li key={item}>{item}</li>)}</ul><a className="button outline" href="#contact">{quote} <ArrowRight size={15} /></a></article>;
}
