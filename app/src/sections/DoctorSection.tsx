import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useDoctors } from "@/hooks/useDoctors";
import { Award, GraduationCap, Clock, Stethoscope } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function DoctorSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  const { doctors, loading } = useDoctors();
  const doctor = doctors?.[0];

  useEffect(() => {
    if (!sectionRef.current || !imageRef.current || !textRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
        toggleActions: "play none none none",
      },
    });

    tl.fromTo(
      imageRef.current,
      { x: -80, opacity: 0, scale: 0.95 },
      { x: 0, opacity: 1, scale: 1, duration: 1, ease: "power3.out" }
    ).fromTo(
      textRef.current.querySelectorAll(".doc-animate"),
      { x: 60, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.7, stagger: 0.12, ease: "power2.out" },
      "-=0.6"
    );

    return () => {
      tl.kill();
    };
  }, [doctor]);

  const fallbackDoctor = {
    name: "Dr. Michael Anderson",
    title: "Lead Dental Surgeon & Founder",
    credentials:
      "DDS, Harvard School of Dental Medicine | Fellow, American Academy of Cosmetic Dentistry | 15+ Years Clinical Excellence",
    bio: "Dr. Anderson founded Aurora Dental with a singular vision: to merge cutting-edge dental technology with an uncompromising patient experience. A pioneer in digital smile design and minimally invasive implantology, he has transformed over 3,000 smiles with precision-guided techniques.",
    image: "/doctor-portrait.jpg",
    specialties: "Implantology, Cosmetic Dentistry, Digital Smile Design",
    experience: "15+ Years",
  };

  const d = doctor ?? fallbackDoctor;

  return (
    <section
      id="doctor"
      ref={sectionRef}
      className="relative py-24 md:py-32 bg-slate-50 overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-sky-50 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {loading ? (
            <div className="flex justify-center items-center py-12 lg:col-span-2">
              <div className="w-8 h-8 border-4 border-sky-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <>
              {/* Image */}
              <div ref={imageRef} className="relative">
                <div className="relative aspect-[3/4] max-w-md mx-auto lg:mx-0 rounded-3xl overflow-hidden shadow-2xl shadow-slate-300/50">
                  <img
                    src={d.image ?? "/doctor-portrait.jpg"}
                    alt={d.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent" />
                </div>

                {/* Floating stats card */}
                <div className="absolute -bottom-6 -right-4 md:right-8 bg-white rounded-2xl p-5 shadow-xl shadow-slate-200/50 border border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-sky-100 rounded-xl flex items-center justify-center">
                      <Award className="w-6 h-6 text-sky-500" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-slate-900">3,000+</p>
                      <p className="text-sm text-slate-500">Smiles Transformed</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Text Content */}
              <div ref={textRef}>
                <p className="doc-animate text-sky-500 text-sm font-semibold tracking-widest uppercase mb-4">
                  Meet Your Doctor
                </p>
                <h2 className="doc-animate text-3xl md:text-5xl font-bold text-slate-900 mb-2">
                  {d.name}
                </h2>
                <p className="doc-animate text-lg text-slate-400 font-medium mb-6">
                  {d.title}
                </p>

                <div className="doc-animate flex flex-wrap gap-3 mb-6">
                  {d.credentials?.split(" | ").map((cred: string, i: number) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full text-sm text-slate-600 border border-slate-100 shadow-sm"
                    >
                      <GraduationCap className="w-4 h-4 text-sky-500" />
                      {cred}
                    </span>
                  )) ?? (
                    <>
                      <span className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full text-sm text-slate-600 border border-slate-100 shadow-sm">
                        <GraduationCap className="w-4 h-4 text-sky-500" />
                        DDS, Harvard
                      </span>
                      <span className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full text-sm text-slate-600 border border-slate-100 shadow-sm">
                        <Award className="w-4 h-4 text-sky-500" />
                        Fellow, AACD
                      </span>
                    </>
                  )}
                </div>

                <p className="doc-animate text-slate-600 leading-relaxed mb-8 text-lg">
                  {d.bio}
                </p>

                <div className="doc-animate grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-slate-100">
                    <div className="w-10 h-10 bg-sky-100 rounded-xl flex items-center justify-center">
                      <Clock className="w-5 h-5 text-sky-500" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">Experience</p>
                      <p className="text-lg font-bold text-slate-900">
                        {d.experience ?? "15+ Years"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-slate-100">
                    <div className="w-10 h-10 bg-sky-100 rounded-xl flex items-center justify-center">
                      <Stethoscope className="w-5 h-5 text-sky-500" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">Specialties</p>
                      <p className="text-lg font-bold text-slate-900">
                        {d.specialties?.split(",")[0] ?? "Implantology"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
