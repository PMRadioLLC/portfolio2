import { useRef, useState, useEffect } from 'react';

type Media = { type: 'image' | 'video'; src: string };

// Personal images & video clips from /section2, in numeric order
// (served from /public/media).
const MEDIA: Media[] = [
  { type: 'video', src: '/media/1.mp4' },
  { type: 'image', src: '/media/2.jpg' },
  { type: 'image', src: '/media/3.jpg' },
  { type: 'video', src: '/media/4.mp4' },
  { type: 'image', src: '/media/5.jpg' },
  { type: 'video', src: '/media/6.mp4' },
  { type: 'image', src: '/media/7.jpg' },
  { type: 'image', src: '/media/8.jpg' },
];

const ROW_1 = MEDIA.slice(0, 4);
const ROW_2 = MEDIA.slice(4);

function Tile({ media }: { media: Media }) {
  if (media.type === 'video') {
    return (
      <video
        src={media.src}
        autoPlay
        muted
        loop
        playsInline
        className="rounded-2xl object-cover flex-shrink-0"
        style={{ width: 420, height: 270 }}
      />
    );
  }
  return (
    <img
      src={media.src}
      alt=""
      loading="lazy"
      className="rounded-2xl object-cover flex-shrink-0"
      style={{ width: 420, height: 270 }}
    />
  );
}

export default function MarqueeSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current;
      if (!section) return;
      const sectionTop = section.offsetTop;
      const value =
        (window.scrollY - sectionTop + window.innerHeight) * 0.3;
      setOffset(value);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const row1 = [...ROW_1, ...ROW_1, ...ROW_1];
  const row2 = [...ROW_2, ...ROW_2, ...ROW_2];

  return (
    <section
      ref={sectionRef}
      className="bg-[#000000] pt-24 sm:pt-32 md:pt-40 pb-10 overflow-hidden"
    >
      <div className="flex flex-col gap-3">
        {/* Row 1 -> moves right */}
        <div
          className="flex gap-3"
          style={{
            transform: `translateX(${offset - 200}px)`,
            willChange: 'transform',
          }}
        >
          {row1.map((media, i) => (
            <Tile key={`r1-${i}`} media={media} />
          ))}
        </div>

        {/* Row 2 -> moves left */}
        <div
          className="flex gap-3"
          style={{
            transform: `translateX(${-(offset - 200)}px)`,
            willChange: 'transform',
          }}
        >
          {row2.map((media, i) => (
            <Tile key={`r2-${i}`} media={media} />
          ))}
        </div>
      </div>
    </section>
  );
}
