import { useState, useRef, useEffect, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { beforeAfter } from "@/lib/data";
import { MoveHorizontal } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

function BeforeAfterSlider({
  beforeImage,
  afterImage,
  title,
  description,
}: {
  beforeImage: string;
  afterImage: string;
  title: string;
  description: string | null;
}) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback(
    (clientX: number) => {
      const container = containerRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
      const percentage = (x / rect.width) * 100;
      setSliderPosition(percentage);
    },
    []
  );

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);
  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) handleMove(e.clientX);
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  useEffect(() => {
    const handleGlobalMouseUp = () => setIsDragging(false);
    window.addEventListener("mouseup", handleGlobalMouseUp);
    return () => window.removeEventListener("mouseup", handleGlobalMouseUp);
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div
        ref={containerRef}
        className="relative w-full aspect-[3/2] rounded-3xl overflow-hidden cursor-ew-resize select-none shadow-2xl shadow-slate-300/50"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        onTouchStart={() => setIsDragging(true)}
        onTouchEnd={() => setIsDragging(false)}
      >
        {/* After image (full background) */}
        <img
          src={afterImage}
          alt="After"
          className="absolute inset-0 w-full h-full object-cover"
          draggable={false}
        />

        {/* Before image (clipped) */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
        >
          <img
            src={beforeImage}
            alt="Before"
            className="absolute inset-0 w-full h-full object-cover"
            draggable={false}
          />
        </div>

        {/* Slider handle */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-white shadow-lg z-10"
          style={{ left: `${sliderPosition}%`, transform: "translateX(-50%)" }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center border-4 border-sky-500">
            <MoveHorizontal className="w-5 h-5 text-sky-500" />
          </div>
        </div>

        {/* Labels */}
        <div className="absolute bottom-4 left-4 bg-slate-900/80 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium">
          Before
        </div>
        <div className="absolute bottom-4 right-4 bg-sky-500 text-white px-4 py-2 rounded-full text-sm font-medium">
          After
        </div>
      </div>

      <div className="mt-8 text-center">
        <h3 className="text-2xl font-bold text-slate-900 mb-2">{title}</h3>
        {description && (
          <p className="text-slate-500 max-w-xl mx-auto">{description}</p>
        )}
      </div>
    </div>
  );
}

export default function BeforeAfterSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const beforeAfterData = beforeAfter;

  useEffect(() => {
    if (!sectionRef.current) return;
    gsap.fromTo(
      sectionRef.current.querySelectorAll(".ba-animate"),
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      }
    );
  }, []);

  const fallbackData = {
    id: 1,
    title: "Complete Smile Makeover",
    beforeImage: "/before-after-01.jpg",
    afterImage: "/smile-perfect.jpg",
    description:
      "Full veneer reconstruction with gum contouring. Transformed in 3 visits over 6 weeks.",
  };

  const data = beforeAfterData?.[0] ?? fallbackData;

  return (
    <section
      id="before-after"
      ref={sectionRef}
      className="relative py-24 md:py-32 bg-white"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <p className="ba-animate text-sky-500 text-sm font-semibold tracking-widest uppercase mb-4">
            Real Results
          </p>
          <h2 className="ba-animate text-3xl md:text-5xl font-bold text-slate-900 mb-4">
            See the <span className="text-sky-500">Transformation</span>
          </h2>
          <p className="ba-animate text-slate-500 max-w-2xl mx-auto text-lg">
            Drag the slider to see real patient transformations. Every smile
            tells a story of renewed confidence.
          </p>
        </div>

        <div className="ba-animate">
          <BeforeAfterSlider
            beforeImage={data.beforeImage}
            afterImage={data.afterImage}
            title={data.title}
            description={data.description}
          />
        </div>
      </div>
    </section>
  );
}
