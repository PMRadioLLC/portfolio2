import FadeIn from '../components/FadeIn';

const SKILLS = [
  {
    number: '01',
    name: 'Data Analysis & SQL',
    description:
      'Data analysis, SQL, reporting, and analytics — turning raw data into clear, actionable insights and analytics-based improvements.',
  },
  {
    number: '02',
    name: 'Full-Stack Development',
    description:
      'Building websites, software platforms, and mobile-friendly web apps end to end — designed, developed, tested, and deployed live with real features like dashboards, CMS, search & filtering, and auth workflows.',
  },
  {
    number: '03',
    name: 'Frontend Engineering',
    description:
      'Responsive interfaces and reusable UI components with React, Next.js, TypeScript, and Tailwind CSS, focused on clean layouts and performance.',
  },
  {
    number: '04',
    name: 'Backend & Databases',
    description:
      'Server-side API routes, database structures with Firebase & Firestore, third-party integrations, and troubleshooting deployment or production issues.',
  },
  {
    number: '05',
    name: 'Web Platform & SEO',
    description:
      'SEO setup, structured data, XML sitemaps, RSS feeds, podcast/streaming interfaces, image optimization, and cloud hosting.',
  },
];

export default function ServicesSection() {
  return (
    <section
      className="bg-white rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32"
    >
      <h2
        className="text-[#000000] font-black uppercase text-center mb-16 sm:mb-20 md:mb-28"
        style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
      >
        Skills
      </h2>

      <div className="max-w-5xl mx-auto">
        {SKILLS.map((service, i) => (
          <FadeIn
            key={service.number}
            delay={i * 0.1}
            y={30}
            className="flex items-start gap-6 sm:gap-10 py-8 sm:py-10 md:py-12"
            style={{ borderBottom: '1px solid rgba(0, 0, 0, 0.15)' }}
          >
            <span
              className="text-[#000000] font-black leading-none flex-shrink-0"
              style={{ fontSize: 'clamp(3rem, 10vw, 140px)' }}
            >
              {service.number}
            </span>
            <div className="flex flex-col gap-3 pt-2">
              <h3
                className="text-[#000000] font-medium uppercase"
                style={{ fontSize: 'clamp(1rem, 2.2vw, 2.1rem)' }}
              >
                {service.name}
              </h3>
              <p
                className="text-[#000000] font-light leading-relaxed max-w-2xl"
                style={{
                  fontSize: 'clamp(0.85rem, 1.6vw, 1.25rem)',
                  opacity: 0.6,
                }}
              >
                {service.description}
              </p>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
