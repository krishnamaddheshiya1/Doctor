import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { services as staticServices } from "@/lib/data";
import {
  Sparkles,
  AlignCenter,
  CircleDot,
  Palette,
  Settings,
  type LucideIcon,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const iconMap: Record<string, LucideIcon> = {
  Sparkles,
  AlignCenter,
  CircleDot,
  Palette,
  Settings,
};

interface ServiceCardData {
  title: string;
  description: string | null;
  image: string | null;
  icon: string | null;
  order?: number;
}

function ServiceCard({
  service,
  index,
}: {
  service: ServiceCardData;
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const IconComponent = service.icon
    ? iconMap[service.icon] ?? Sparkles
    : Sparkles;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({
      rotateX: y * -15,
      rotateY: x * 15,
    });
  };

  const handleMouseLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0 });
    setIsHovered(false);
  };

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    gsap.fromTo(
      card,
      { y: 60, opacity: 0, scale: 0.95 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.7,
        delay: index * 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      }
    );
  }, [index]);

  return (
    <div
      ref={cardRef}
      className="group relative"
      style={{ perspective: "1000px" }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="relative bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-lg shadow-slate-200/50 transition-shadow duration-500"
        style={{
          transform: `rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) translateZ(${isHovered ? "30px" : "0px"})`,
          transformStyle: "preserve-3d",
          transition: isHovered ? "transform 0.1s ease-out" : "transform 0.5s ease-out",
          willChange: "transform",
        }}
      >
        {/* Glow overlay */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10 rounded-3xl"
          style={{
            background: `radial-gradient(circle at ${50 + tilt.rotateY * 3}% ${50 + tilt.rotateX * 3}%, rgba(14,165,232,0.12) 0%, transparent 70%)`,
          }}
        />

        {/* Image */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={service.image ?? "/clinic-interior.jpg"}
            alt={service.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
          <div className="absolute top-4 left-4 w-12 h-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/20">
            <IconComponent className="w-6 h-6 text-white" />
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-sky-600 transition-colors">
            {service.title}
          </h3>
          <p className="text-slate-500 text-sm leading-relaxed line-clamp-3">
            {service.description}
          </p>
          <div className="mt-4 flex items-center gap-2 text-sky-500 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
            <span>Learn more</span>
            <span className="inline-block transition-transform group-hover:translate-x-1">
              &rarr;
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Services3D() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const services = staticServices;

  useEffect(() => {
    if (!titleRef.current) return;

    gsap.fromTo(
      titleRef.current.querySelectorAll(".services-title-animate"),
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.12,
        ease: "power2.out",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      }
    );
  }, []);

  const fallbackServices: ServiceCardData[] = [
    {
      title: "Teeth Whitening",
      description:
        "Professional-grade LED whitening technology that brightens your smile up to 8 shades in a single session.",
      image: "/teeth-whitening.jpg",
      icon: "Sparkles",
    },
    {
      title: "Clear Aligners",
      description:
        "Invisible orthodontics using state-of-the-art 3D scanning and custom aligner fabrication.",
      image: "/clear-aligners.jpg",
      icon: "AlignCenter",
    },
    {
      title: "Dental Implants",
      description:
        "Titanium implant solutions with computer-guided placement for permanent, natural-looking replacements.",
      image: "/dental-implants.jpg",
      icon: "CircleDot",
    },
    {
      title: "Smile Design",
      description:
        "Digital smile simulation and custom veneer crafting tailored to your facial symmetry.",
      image: "/smile-design.jpg",
      icon: "Palette",
    },
  ];

  const displayServices = services?.length ? services : fallbackServices;

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative py-24 md:py-32 bg-slate-50"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div ref={titleRef} className="text-center mb-16">
          <p className="services-title-animate text-sky-500 text-sm font-semibold tracking-widest uppercase mb-4">
            Our Services
          </p>
          <h2 className="services-title-animate text-3xl md:text-5xl font-bold text-slate-900 mb-4">
            Precision Crafted
            <br />
            <span className="text-sky-500">For Your Smile</span>
          </h2>
          <p className="services-title-animate text-slate-500 max-w-2xl mx-auto text-lg">
            Every treatment combines advanced technology with an artistic
            approach to deliver results that look and feel completely natural.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {displayServices.map((service: typeof displayServices[0], index: number) => (
            <ServiceCard key={service.title} service={service as ServiceCardData} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
