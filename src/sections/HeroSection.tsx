import { useRef, useEffect } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
} from 'framer-motion';
import FadeIn from '../components/FadeIn';
import ContactButton from '../components/ContactButton';

const NAV_LINKS = ['About', 'Price', 'Projects', 'Contact'];

// Re-encoded all-intra (every frame is a keyframe) so seeking is instant.
const VIDEO_SRC = '/hero-scrub.mp4';

export default function HeroSection() {
  const trackRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Scroll progress across the tall track (0 at top -> 1 at bottom).
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start start', 'end end'],
  });

  // Smooth the raw scroll value with a spring so the playhead eases
  // instead of snapping frame-to-frame — this is what makes it buttery.
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.4,
    restDelta: 0.0001,
  });

  // The heading rises as the video scrubs.
  const headingY = useTransform(smoothProgress, [0, 1], ['0vh', '-60vh']);

  // Drive the video playhead from the smoothed progress on its own
  // animation frame. Only seek when the target frame actually changes,
  // and skip while a previous seek is still resolving, to avoid stutter.
  useEffect(() => {
    let raf = 0;
    let seeking = false;
    let lastTime = -1;

    const tick = () => {
      const v = videoRef.current;
      const d = v?.duration ?? 0;
      if (v && d && !Number.isNaN(d)) {
        const target = Math.min(d, Math.max(0, smoothProgress.get() * d));
        if (!seeking && Math.abs(target - lastTime) > 1 / 60) {
          lastTime = target;
          seeking = true;
          v.currentTime = target;
        }
      }
      raf = requestAnimationFrame(tick);
    };

    const onSeeked = () => {
      seeking = false;
    };

    const v = videoRef.current;
    v?.addEventListener('seeked', onSeeked);
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      v?.removeEventListener('seeked', onSeeked);
    };
  }, [smoothProgress]);

  return (
    <section
      ref={trackRef}
      className="relative h-[300vh]"
      style={{ overflowX: 'clip' }}
    >
      {/* Pinned viewport — stays fixed while the track scrolls underneath */}
      <div className="sticky top-0 h-screen flex flex-col overflow-hidden">
        {/* Navbar */}
        <FadeIn
          as="nav"
          delay={0}
          y={-20}
          className="relative z-20 flex justify-between px-6 md:px-10 pt-6 md:pt-8"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="text-[#D7E2EA] font-medium uppercase tracking-wider text-sm md:text-lg lg:text-[1.4rem] transition-opacity duration-200 hover:opacity-70"
            >
              {link}
            </a>
          ))}
        </FadeIn>

        {/* Hero heading — rises as you scroll through the video */}
        <motion.h1
          style={{ y: headingY }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15, duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          className="relative z-20 hero-heading font-black uppercase tracking-tight leading-none whitespace-nowrap w-full text-center text-[11vw] sm:text-[12vw] md:text-[13vw] lg:text-[14vw] mt-6 sm:mt-4 md:-mt-2"
        >
          Hi, I&apos;m Sankalp
        </motion.h1>

        {/* Centered scroll-scrubbed video */}
        <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
          <video
            ref={videoRef}
            src={VIDEO_SRC}
            muted
            playsInline
            preload="auto"
            className="h-[45vh] sm:h-[52vh] md:h-[58vh] w-auto max-w-[92vw] object-contain select-none"
          />
        </div>

        {/* Bottom bar — Contact Me stays in place for the whole section */}
        <div className="mt-auto relative z-20 flex justify-between items-end px-6 md:px-10 pb-7 sm:pb-8 md:pb-10">
          <FadeIn delay={0.35} y={20}>
            <p
              className="text-[#D7E2EA] font-light uppercase tracking-wide leading-snug max-w-[160px] sm:max-w-[220px] md:max-w-[260px]"
              style={{ fontSize: 'clamp(0.75rem, 1.4vw, 1.5rem)' }}
            >
              An experienced Data Analyst with Skills in Full Stack Websites and App Development
            </p>
          </FadeIn>
          <FadeIn delay={0.5} y={20}>
            <ContactButton />
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
