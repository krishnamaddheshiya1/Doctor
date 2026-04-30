import { useEffect, useRef, useCallback } from "react";
import { gsap } from "gsap";
import { heroContent } from "@/lib/data";
import { ArrowRight, ChevronDown } from "lucide-react";

export default function Hero3D() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const hero = heroContent;

  // Neural grid spotlight effect
  const drawGrid = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.scale(dpr, dpr);

    const cols = Math.floor(w / 40);
    const rows = Math.floor(h / 40);
    const cellW = w / cols;
    const cellH = h / rows;
    const mx = mouseRef.current.x;
    const my = mouseRef.current.y;
    const radius = 180;

    ctx.clearRect(0, 0, w, h);

    for (let i = 0; i <= cols; i++) {
      for (let j = 0; j <= rows; j++) {
        const x = i * cellW;
        const y = j * cellH;
        const dist = Math.sqrt((x - mx) ** 2 + (y - my) ** 2);
        if (dist < radius) {
          const intensity = 1 - dist / radius;
          ctx.beginPath();
          ctx.arc(x, y, 1.5 * intensity, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(14, 165, 232, ${0.4 * intensity})`;
          ctx.fill();

          // Draw connecting lines to neighbors
          if (i < cols) {
            const nextX = (i + 1) * cellW;
            const nextDist = Math.sqrt((nextX - mx) ** 2 + (y - my) ** 2);
            if (nextDist < radius) {
              ctx.beginPath();
              ctx.moveTo(x, y);
              ctx.lineTo(nextX, y);
              ctx.strokeStyle = `rgba(14, 165, 232, ${0.08 * intensity})`;
              ctx.lineWidth = 0.5;
              ctx.stroke();
            }
          }
          if (j < rows) {
            const nextY = (j + 1) * cellH;
            const nextDist = Math.sqrt((x - mx) ** 2 + (nextY - my) ** 2);
            if (nextDist < radius) {
              ctx.beginPath();
              ctx.moveTo(x, y);
              ctx.lineTo(x, nextY);
              ctx.strokeStyle = `rgba(14, 165, 232, ${0.08 * intensity})`;
              ctx.lineWidth = 0.5;
              ctx.stroke();
            }
          }
        }
      }
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let animId: number;
    const animate = () => {
      drawGrid();
      animId = requestAnimationFrame(animate);
    };
    animate();

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouseRef.current.x = -1000;
      mouseRef.current.y = -1000;
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      cancelAnimationFrame(animId);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [drawGrid]);

  // GSAP entrance animations
  useEffect(() => {
    if (!textRef.current || !imageRef.current) return;

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(
      imageRef.current,
      { scale: 1.1, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1.2 }
    )
      .fromTo(
        textRef.current.querySelectorAll(".hero-animate"),
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.15 },
        "-=0.6"
      )
      .fromTo(
        ".hero-scroll-indicator",
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.6 },
        "-=0.3"
      );

    return () => {
      tl.kill();
    };
  }, [hero]);

  const headline = hero?.headline ?? "Experience Next-Level Dental Care";
  const subheadline =
    hero?.subheadline ??
    "Where precision meets artistry. Advanced technology, compassionate care, and stunning results redefine your dental experience.";
  const ctaText = hero?.ctaText ?? "Book Appointment";
  const bgImage = hero?.backgroundImage ?? "/clinic-interior.jpg";

  return (
    <section
      ref={sectionRef}
      className="relative h-[100dvh] w-full overflow-hidden bg-slate-900"
    >
      {/* Background Image */}
      <div
        ref={imageRef}
        className="absolute inset-0 w-full h-full"
        style={{ willChange: "transform" }}
      >
        <img
          src={bgImage}
          alt="Dental Clinic"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/60 to-slate-900/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-slate-900/40" />
      </div>

      {/* Neural Grid Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full z-10 pointer-events-auto"
        style={{ mixBlendMode: "screen" }}
      />

      {/* Floating Particles */}
      <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-sky-400/20 animate-float"
            style={{
              width: `${Math.random() * 6 + 2}px`,
              height: `${Math.random() * 6 + 2}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 10 + 10}s`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div
        ref={textRef}
        className="relative z-20 h-full flex flex-col justify-end pb-20 md:pb-28 px-6 md:px-12 max-w-7xl mx-auto"
      >
        <div className="max-w-3xl">
          <p className="hero-animate text-sky-400 text-sm font-semibold tracking-widest uppercase mb-4">
            Aurora Dental
          </p>
          <h1 className="hero-animate text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] mb-6">
            {headline}
          </h1>
          <p className="hero-animate text-lg md:text-xl text-slate-300 max-w-xl mb-8 leading-relaxed">
            {subheadline}
          </p>
          <div className="hero-animate flex flex-wrap gap-4">
            <a
              href="#appointment"
              className="group inline-flex items-center gap-3 px-8 py-4 bg-sky-500 text-white font-semibold rounded-full hover:bg-sky-600 transition-all shadow-lg shadow-sky-500/25 hover:shadow-sky-500/40"
            >
              {ctaText}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#services"
              className="inline-flex items-center gap-2 px-8 py-4 border border-white/30 text-white font-medium rounded-full hover:bg-white/10 transition-colors backdrop-blur-sm"
            >
              Explore Services
            </a>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="hero-scroll-indicator absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-white/60">
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <ChevronDown className="w-5 h-5 animate-bounce" />
      </div>
    </section>
  );
}
