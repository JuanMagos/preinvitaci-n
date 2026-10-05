"use client";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
import { event } from "@/lib/event";
import { Countdown } from "./countdown";
import { useMusic } from "./music";

function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  return <motion.div className={className} initial={false}
    whileInView={reduce ? undefined : { opacity: [0.4, 1], y: [24, 0] }}
    viewport={{ once: true, amount: 0.15 }} transition={{ duration: 1.25, ease: [0.22, 1, 0.36, 1] }}>
    {children}
  </motion.div>;
}
function Photo({ src, alt, className = "", priority = false }: { src: string; alt: string; className?: string; priority?: boolean }) {
  return <Image src={src} alt={alt} unoptimized={process.env.NODE_ENV === "development"} fill priority={priority} sizes="(max-width: 700px) 100vw, 65vw" className={`editorial-photo ${className}`} />;
}

export function Invitation() {
  const hero = useRef<HTMLElement>(null);
  const story = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: hero, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "16%"]);
  const { play, controls } = useMusic();
  useEffect(() => {
    const startAfterScroll = (event: Event) => {
      // Ignore tiny movements at the top, and retry after a touch gesture
      // when the browser requires user activation to allow audio.
      if (document.hidden || !hero.current || hero.current.getBoundingClientRect().top > -80) return;
      if (event.target instanceof Element && event.target.closest("button, a")) return;
      void play(event.type === "scroll" ? "scroll" : "gesture");
    };
    window.addEventListener("scroll", startAfterScroll, { passive: true });
    window.addEventListener("touchend", startAfterScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", startAfterScroll);
      window.removeEventListener("touchend", startAfterScroll);
    };
  }, [play]);
  const discover = () => {
    void play();
    story.current?.focus({ preventScroll: true });
    story.current?.scrollIntoView({ behavior: reduce ? "instant" : "smooth" });
  };
  return <>
    <a href="#historia" className="skip-link">Saltar a la historia</a>
    <main>
      <section ref={hero} className="hero" aria-labelledby="hero-title">
        <motion.div className="hero-image" style={{ y: reduce ? 0 : y }}>
          <Photo src={event.images.hero} priority alt="Retrato provisional de una joven con vestido plum en una terraza iluminada con velas al anochecer" />
        </motion.div>
        <div className="hero-shade" />
        <header className="hero-header"><a href="#" aria-label="Volver al inicio" className="monogram">XV<span>·</span></a><span className="eyebrow">Una noche. Una nueva historia.</span></header>
        <div className="hero-copy">
          <p className="eyebrow hero-kicker">El comienzo de algo inolvidable</p>
          <h1 id="hero-title">MIS <span>XV</span></h1>
          <p className="celebrant">{event.name}</p>
          <div className="fine-rule" />
          <p className="hero-date"><time dateTime="2026-12-19">19 <span>·</span> 12 <span>·</span> 2026</time></p>
          <button onClick={discover} className="discover">
            Descubrir
            <svg className="discover-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
              <path d="M5 19 19 5M5 5h14v14" />
            </svg>
          </button>
          <p className="sound-note">Una experiencia para sentir. Activa el sonido.</p>
        </div>
        <div className="hero-bottom"><span className="eyebrow">Preinvitación · Reserva la fecha</span><a href="#historia" aria-label="Continuar a la historia" className="scroll-mark">↓</a><span className="eyebrow desktop-note">Diciembre / 2026</span></div>
      </section>

      <section id="historia" ref={story} tabIndex={-1} className="story section-shell" aria-labelledby="story-title">
        <Reveal className="story-copy"><p className="eyebrow"><span className="chapter">01 /</span> El preludio</p>
          <h2 id="story-title">Hay momentos<br />que quedan<br /><em>para siempre.</em></h2>
          <p className="body-copy">Una mirada al cielo. Las luces de la ciudad.<br />Y la ilusión de una noche que será nuestra.</p>
          <span className="small-star" aria-hidden="true">✧</span>
        </Reveal>
        <Reveal className="story-frame"><div className="story-photo"><Photo src={event.images.portrait} alt="Retrato editorial provisional, con luces cálidas de la ciudad al fondo" className="portrait-crop" /></div><p className="photo-caption">Entre luces y sueños <span>01 — XV</span></p></Reveal>
      </section>

      <section className="date-section" aria-labelledby="date-title">
        <div className="orb" aria-hidden="true" />
        <Reveal><p id="date-title" className="eyebrow">Reserva la fecha</p>
          <time dateTime="2026-12-19" className="date-lockup"><span className="day">19</span><span className="month">Diciembre</span><span className="year">— 2026 —</span></time>
          <p className="date-quote">Los sueños también tienen fecha.</p>
        </Reveal>
        <Reveal><Countdown /></Reveal>
      </section>

      <section className="editorial section-shell" aria-labelledby="editorial-title">
        <Reveal className="editorial-heading"><p className="eyebrow"><span className="chapter">02 /</span> Un pequeño adelanto</p><h2 id="editorial-title">La magia está<br /><em>en los detalles.</em></h2><p className="body-copy">Una noche que empieza a imaginarse.</p></Reveal>
        <div className="editorial-sequence">
          <Reveal className="editorial-one"><figure><div className="gallery-photo tall"><Photo src={event.images.portrait} alt="Foto provisional para reemplazar por un retrato de la festejada" /></div><figcaption><span>01</span> La ilusión</figcaption></figure></Reveal>
          <Reveal className="editorial-two"><figure><div className="gallery-photo detail"><Photo src={event.images.detail} className="dress-crop" alt="Detalle provisional del vestido color plum" /></div><figcaption><span>02</span> Cada detalle</figcaption></figure><p className="gallery-note">Un instante.<br /><em>Mil recuerdos.</em></p></Reveal>
          <Reveal className="editorial-three"><figure><div className="gallery-photo atmosphere"><Photo src={event.images.atmosphere} className="candle-crop" alt="Velas y luces de ciudad, imagen provisional de ambiente" /></div><figcaption><span>03</span> La atmósfera</figcaption></figure></Reveal>
        </div>
      </section>

      <section className="interlude" aria-labelledby="interlude-title"><Photo src={event.images.hero} alt="" className="interlude-photo" /><div className="interlude-shade" /><Reveal className="interlude-copy"><p className="eyebrow">Lo que viene será inolvidable</p><h2 id="interlude-title">Un día para<br /><em>celebrar la vida.</em></h2><div className="fine-rule" /><p>Este es solo el inicio de una historia increíble.</p><p className="invitation-note">Próximamente recibirás la invitación.</p></Reveal></section>

      <footer className="closing"><Reveal><p className="eyebrow">Gracias por ser parte de esta historia</p><div className="seal" aria-hidden="true">XV</div><p className="closing-name">{event.name}</p><p className="eyebrow">MIS XV <span className="footer-dot">·</span> 19 · 12 · 2026</p><h2>Esto apenas comienza...</h2><p className="closing-note">La mejor parte aún está por venir.</p><a className="back-top" href="#">Volver al inicio <span aria-hidden="true">↑</span></a></Reveal></footer>
    </main>
    {controls}
  </>;
}
