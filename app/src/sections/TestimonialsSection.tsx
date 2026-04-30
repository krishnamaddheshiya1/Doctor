import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { testimonials as staticTestimonials } from "@/lib/data";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const testimonials = staticTestimonials;
  const [currentIndex, setCurrentIndex] = useState(0);

  const fallbackTestimonials = [
    {
      id: 1,
      name: "Sarah Mitchell",
      role: "Marketing Executive",
      content:
        "The entire experience felt like visiting a luxury spa rather than a dental clinic. Dr. Anderson and the team made my smile transformation absolutely seamless. I have never felt more confident.",
      avatar: "/testimonial-01.jpg",
      rating: 5,
    },
    {
      id: 2,
      name: "James Rodriguez",
      role: "Business Consultant",
      content:
        "After years of dental anxiety, Aurora Dental changed everything for me. The technology is incredible — digital scans, painless procedures, and results that exceeded every expectation.",
      avatar: "/testimonial-02.jpg",
      rating: 5,
    },
    {
      id: 3,
      name: "Emily Chen",
      role: "Architect",
      content:
        "I came in for a consultation and walked out with a completely new smile plan. The 3D simulation let me see my results before we even started. Truly next-generation dentistry.",
      avatar: "/testimonial-01.jpg",
      rating: 5,
    },
  ];

  const data = testimonials?.length ? testimonials : fallbackTestimonials;

  useEffect(() => {
    if (!sectionRef.current) return;
    gsap.fromTo(
      sectionRef.current.querySelectorAll(".testi-animate"),
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.12,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      }
    );
  }, []);

  const next = () => setCurrentIndex((i) => (i + 1) % data.length);
  const prev = () => setCurrentIndex((i) => (i - 1 + data.length) % data.length);

  const current = data[currentIndex];

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="relative py-24 md:py-32 bg-white overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-sky-100/50 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative">
        <div className="text-center mb-16">
          <p className="testi-animate text-sky-500 text-sm font-semibold tracking-widest uppercase mb-4">
            Patient Stories
          </p>
          <h2 className="testi-animate text-3xl md:text-5xl font-bold text-slate-900 mb-4">
            Trusted by <span className="text-sky-500">Thousands</span>
          </h2>
          <p className="testi-animate text-slate-500 max-w-2xl mx-auto text-lg">
            Real stories from real patients who discovered confidence through
            exceptional dental care.
          </p>
        </div>

        {/* Main testimonial card */}
        <div className="testi-animate max-w-4xl mx-auto">
          <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-slate-100 shadow-xl shadow-slate-200/50">
            {/* Quote icon */}
            <div className="absolute top-6 left-8 w-12 h-12 bg-sky-100 rounded-2xl flex items-center justify-center">
              <Quote className="w-6 h-6 text-sky-500" />
            </div>

            <div className="mt-8">
              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {Array.from({ length: 5 }).map((_x: unknown, i: number) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(current.rating)
                        ? "text-amber-400 fill-amber-400"
                        : "text-slate-200"
                    }`}
                  />
                ))}
              </div>

              <p className="text-xl md:text-2xl text-slate-700 leading-relaxed mb-8 font-light">
                "{current.content}"
              </p>

              <div className="flex items-center gap-4">
                <img
                  src={current.avatar ?? "/testimonial-01.jpg"}
                  alt={current.name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-sky-100"
                />
                <div>
                  <p className="font-semibold text-slate-900 text-lg">
                    {current.name}
                  </p>
                  <p className="text-slate-500 text-sm">{current.role}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="flex gap-2">
              {data.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    i === currentIndex
                      ? "bg-sky-500 w-8"
                      : "bg-slate-200 hover:bg-slate-300"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
