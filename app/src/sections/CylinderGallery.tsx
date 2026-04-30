import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { galleryImages } from "@/lib/data";

gsap.registerPlugin(ScrollTrigger);

export default function CylinderGallery() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cylinderRef = useRef<HTMLDivElement>(null);
  const gallery = galleryImages;

  const fallbackGallery = [
    { id: 1, src: "/hero-main.jpg", alt: "Advanced Technology" },
    { id: 2, src: "/clinic-interior.jpg", alt: "Premium Clinic" },
    { id: 3, src: "/teeth-whitening.jpg", alt: "Whitening" },
    { id: 4, src: "/dental-implants.jpg", alt: "Implants" },
    { id: 5, src: "/smile-design.jpg", alt: "Smile Design" },
    { id: 6, src: "/clear-aligners.jpg", alt: "Aligners" },
    { id: 7, src: "/smile-perfect.jpg", alt: "Results" },
    { id: 8, src: "/braces.jpg", alt: "Orthodontics" },
  ];

  const images = gallery?.length ? gallery : fallbackGallery;
  const cardCount = images.length;
  const angleStep = 360 / cardCount;
  const cardWidth = 320;
  const radius = cardWidth / (2 * Math.tan(Math.PI / cardCount));

  useEffect(() => {
    if (!sectionRef.current || !cylinderRef.current) return;

    // Entrance animation
    gsap.fromTo(
      sectionRef.current.querySelectorAll(".cyl-animate"),
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.12,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      }
    );

    // Cylinder rotation on scroll
    const cylinder = cylinderRef.current;
    gsap.to(cylinder, {
      rotateY: -360,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      },
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32 bg-slate-50 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <p className="cyl-animate text-sky-500 text-sm font-semibold tracking-widest uppercase mb-4">
            Gallery
          </p>
          <h2 className="cyl-animate text-3xl md:text-5xl font-bold text-slate-900 mb-4">
            Our <span className="text-sky-500">World</span>
          </h2>
          <p className="cyl-animate text-slate-500 max-w-2xl mx-auto text-lg">
            Explore our state-of-the-art facility and the technology that powers
            every smile transformation.
          </p>
        </div>
      </div>

      {/* 3D Cylinder */}
      <div
        className="relative h-[500px] md:h-[600px] w-full"
        style={{ perspective: "1500px" }}
      >
        <div
          ref={cylinderRef}
          className="absolute inset-0 flex items-center justify-center"
          style={{
            transformStyle: "preserve-3d",
            willChange: "transform",
          }}
        >
          {images.map((img: typeof images[0], i: number) => (
            <div
              key={i}
              className="absolute w-[280px] md:w-[320px] h-[200px] md:h-[240px] rounded-2xl overflow-hidden shadow-2xl"
              style={{
                transform: `rotateY(${i * angleStep}deg) translateZ(${radius}px)`,
                backfaceVisibility: "hidden",
              }}
            >
              <img
                src={img.src}
                alt={img.alt ?? "Gallery"}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <p className="text-white text-sm font-medium">{img.alt}</p>
              </div>
              {/* Glass overlay */}
              <div
                className="absolute inset-0 bg-white/5 backdrop-blur-[2px] pointer-events-none"
                style={{
                  transform: `rotateY(${-i * angleStep}deg)`,
                  transformStyle: "preserve-3d",
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
