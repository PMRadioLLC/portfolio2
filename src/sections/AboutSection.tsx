import FadeIn from '../components/FadeIn';
import AnimatedText from '../components/AnimatedText';
import ContactButton from '../components/ContactButton';
import { InteractiveRobotSpline } from '../components/ui/interactive-3d-robot';

const ABOUT_TEXT =
  'Hi, I am a Data Analyst with skills in SQL, data analysis, reporting, and analytics, along with strong knowledge of full-stack development for software, websites, and mobile applications. I also have hands-on experience working on live projects and currently have websites and apps running online.';

const ROBOT_SCENE_URL =
  'https://prod.spline.design/PyzDhpQ9E5f1E3MT/scene.splinecode';

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative min-h-screen px-5 sm:px-8 md:px-10 py-20 overflow-hidden"
    >
      <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center min-h-[80vh]">
        {/* Left: About me */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left gap-10 sm:gap-12 md:gap-14 order-2 lg:order-1">
          <FadeIn delay={0} y={40}>
            <h2
              className="hero-heading font-black uppercase leading-none tracking-tight"
              style={{ fontSize: 'clamp(2.75rem, 9vw, 120px)' }}
            >
              About me
            </h2>
          </FadeIn>

          <AnimatedText
            text={ABOUT_TEXT}
            className="text-[#D7E2EA] font-medium leading-relaxed max-w-[560px]"
            style={{ fontSize: 'clamp(1rem, 2vw, 1.35rem)' }}
          />

          <FadeIn delay={0} y={30}>
            <ContactButton />
          </FadeIn>
        </div>

        {/* Right: interactive 3D robot */}
        <div className="order-1 lg:order-2 relative w-full h-[45vh] sm:h-[55vh] lg:h-[80vh]">
          {/* Radial mask fades the canvas edges so they blend into the black */}
          <div
            className="w-full h-full"
            style={{
              WebkitMaskImage:
                'radial-gradient(ellipse 72% 66% at 50% 50%, #000 58%, transparent 100%)',
              maskImage:
                'radial-gradient(ellipse 72% 66% at 50% 50%, #000 58%, transparent 100%)',
            }}
          >
            <InteractiveRobotSpline
              scene={ROBOT_SCENE_URL}
              className="w-full h-full"
            />
          </div>
          {/* Heavy fade to black at the bottom — blends the glow into the
              background and dissolves the in-canvas "Built with Spline" badge */}
          <div
            className="absolute inset-x-0 bottom-0 h-2/3 pointer-events-none"
            style={{
              background:
                'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.6) 45%, #000000 72%)',
            }}
          />
          {/* Invisible click-catcher over the hidden badge so it can't open spline.design */}
          <div className="absolute bottom-0 right-0 h-16 w-52" />
        </div>
      </div>
    </section>
  );
}
