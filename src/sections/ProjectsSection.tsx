import { useState } from 'react';
import FadeIn from '../components/FadeIn';

const REQUEST_EMAIL = 'sankalpsandeepsingh@icloud.com';

type Status = 'idle' | 'sending' | 'sent' | 'error';

export default function ProjectsSection() {
  const [status, setStatus] = useState<Status>('idle');
  const submitted = status === 'sent';

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get('name') || ''),
      email: String(data.get('email') || ''),
      message: String(data.get('message') || ''),
    };

    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) throw new Error(json.error || 'Failed to send');
      form.reset();
      setStatus('sent');
    } catch {
      setStatus('error');
    }
  };

  const inputClass =
    'w-full rounded-2xl bg-white/5 border border-[#D7E2EA]/25 text-[#D7E2EA] placeholder-[#D7E2EA]/40 px-5 py-4 outline-none transition-colors focus:border-[#D7E2EA]/70';

  return (
    <section
      id="projects"
      className="relative z-10 bg-[#000000] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32"
    >
      <h2
        className="hero-heading font-black uppercase leading-none tracking-tight text-center"
        style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
      >
        Projects
      </h2>

      {/* Request access to projects */}
      <FadeIn delay={0.1} y={30}>
        <div className="mx-auto mt-8 sm:mt-10 max-w-2xl text-center flex flex-col items-center gap-6">
          <p
            className="text-[#D7E2EA] font-light leading-relaxed"
            style={{ fontSize: 'clamp(1rem, 2vw, 1.35rem)' }}
          >
            My projects are private. Request access and I&apos;ll share live
            links and case studies with you.
          </p>
          <a
            href={`mailto:${REQUEST_EMAIL}?subject=${encodeURIComponent('Request access to projects')}`}
            className="rounded-full border-2 border-[#D7E2EA] text-[#D7E2EA] font-medium uppercase tracking-widest px-8 py-3 sm:px-10 sm:py-3.5 text-sm sm:text-base transition-colors duration-200 hover:bg-[#D7E2EA]/10"
          >
            Request Access
          </a>
          <span className="text-[#D7E2EA]/50 text-sm">{REQUEST_EMAIL}</span>
        </div>
      </FadeIn>

      {/* Contact form */}
      <div className="mx-auto mt-20 sm:mt-28 max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        {/* Left: dog image (swaps when the form is submitted) */}
        <FadeIn delay={0.1} x={-40} y={0} className="order-2 lg:order-1">
          <img
            src={submitted ? '/media/dog_2.png' : '/media/dog_1.png'}
            alt={submitted ? 'Thanks — message sent!' : 'Say hello'}
            className="w-full max-w-[420px] mx-auto h-auto select-none transition-opacity duration-300"
          />
        </FadeIn>

        {/* Right: form */}
        <FadeIn delay={0.15} y={30} className="order-1 lg:order-2">
          <h3
            className="text-[#D7E2EA] font-black uppercase tracking-tight mb-8"
            style={{ fontSize: 'clamp(1.75rem, 5vw, 3rem)' }}
          >
            Get in touch
          </h3>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              name="name"
              required
              placeholder="Your name"
              className={inputClass}
            />
            <input
              type="email"
              name="email"
              required
              placeholder="Your email"
              className={inputClass}
            />
            <textarea
              name="message"
              required
              rows={5}
              placeholder="Your message"
              className={`${inputClass} resize-none`}
            />
            <button
              type="submit"
              disabled={status === 'sending'}
              className="mt-2 self-start rounded-full text-white font-medium uppercase tracking-widest px-10 py-4 text-sm sm:text-base transition-transform duration-200 hover:scale-[1.03] disabled:opacity-60 disabled:hover:scale-100"
              style={{
                background:
                  'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
                boxShadow:
                  '0px 4px 4px rgba(181, 1, 167, 0.25), 4px 4px 12px #7721B1 inset',
                outline: '2px solid #ffffff',
                outlineOffset: '-3px',
              }}
            >
              {status === 'sending' ? 'Sending…' : 'Send Message'}
            </button>
            {status === 'sent' && (
              <p className="text-green-400/80 text-sm mt-1">
                Thanks! Your message was sent — I&apos;ll get back to you soon.
              </p>
            )}
            {status === 'error' && (
              <p className="text-red-400/80 text-sm mt-1">
                Something went wrong. Please try again, or email me directly at{' '}
                {REQUEST_EMAIL}.
              </p>
            )}
          </form>
        </FadeIn>
      </div>
    </section>
  );
}
