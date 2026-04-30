import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { services as staticServices } from "@/lib/data";
import { supabase } from "@/lib/supabaseClient";
import { Calendar, User, Phone, Mail, MessageSquare, Send, CheckCircle } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function AppointmentSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    date: "",
    service: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const services = staticServices;
  useEffect(() => {
    if (!sectionRef.current) return;
    gsap.fromTo(
      sectionRef.current.querySelectorAll(".appt-animate"),
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    try {
      const { error: submitError } = await supabase.from('Appointments Table').insert([
        {
          name: formData.name,
          email: formData.email || null,
          phone: formData.phone,
          date: formData.date,
          service: formData.service,
          message: formData.message || null,
        }
      ]);
      if (submitError) throw submitError;
      
      setSubmitted(true);
      setFormData({ name: "", phone: "", email: "", date: "", service: "", message: "" });
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to submit appointment. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const serviceOptions = services?.map((s: { title: string }) => s.title) ?? [
    "Teeth Whitening",
    "Clear Aligners",
    "Dental Implants",
    "Smile Design",
    "General Checkup",
  ];

  return (
    <section
      id="appointment"
      ref={sectionRef}
      className="relative py-24 md:py-32 bg-slate-900 overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-sky-900/20 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left side info */}
          <div>
            <p className="appt-animate text-sky-400 text-sm font-semibold tracking-widest uppercase mb-4">
              Book Your Visit
            </p>
            <h2 className="appt-animate text-3xl md:text-5xl font-bold text-white mb-6">
              Ready for Your
              <br />
              <span className="text-sky-400">New Smile?</span>
            </h2>
            <p className="appt-animate text-slate-400 text-lg leading-relaxed mb-8">
              Schedule your consultation today. Our team will confirm your
              appointment within 24 hours and send you a personalized treatment
              plan.
            </p>

            <div className="appt-animate space-y-6">
              <div className="flex items-center gap-4 p-4 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
                <div className="w-12 h-12 bg-sky-500/20 rounded-xl flex items-center justify-center">
                  <Phone className="w-6 h-6 text-sky-400" />
                </div>
                <div>
                  <p className="text-sm text-slate-400">Call us directly</p>
                  <p className="text-white font-semibold">+1 (555) 234-5678</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
                <div className="w-12 h-12 bg-sky-500/20 rounded-xl flex items-center justify-center">
                  <Mail className="w-6 h-6 text-sky-400" />
                </div>
                <div>
                  <p className="text-sm text-slate-400">Email us</p>
                  <p className="text-white font-semibold">hello@auroradental.com</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
                <div className="w-12 h-12 bg-sky-500/20 rounded-xl flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-sky-400" />
                </div>
                <div>
                  <p className="text-sm text-slate-400">Open hours</p>
                  <p className="text-white font-semibold">Mon-Sat, 9AM - 7PM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="appt-animate">
            <form
              onSubmit={handleSubmit}
              className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 md:p-10 border border-white/10"
            >
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <CheckCircle className="w-16 h-16 text-green-400 mb-4" />
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Appointment Requested!
                  </h3>
                  <p className="text-slate-400">
                    We will contact you within 24 hours to confirm.
                  </p>
                </div>
              ) : (
                <>
                  <h3 className="text-xl font-bold text-white mb-6">
                    Request an Appointment
                  </h3>
                  
                  {error && (
                    <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
                      <p className="text-sm text-red-400">{error}</p>
                    </div>
                  )}

                  <div className="space-y-4">
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input
                        type="text"
                        placeholder="Full Name"
                        required
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-sky-500 transition-colors"
                      />
                    </div>

                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input
                        type="tel"
                        placeholder="Phone Number"
                        required
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-sky-500 transition-colors"
                      />
                    </div>

                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input
                        type="email"
                        placeholder="Email (optional)"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-sky-500 transition-colors"
                      />
                    </div>

                    <div className="relative">
                      <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input
                        type="date"
                        required
                        value={formData.date}
                        onChange={(e) =>
                          setFormData({ ...formData, date: e.target.value })
                        }
                        className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-sky-500 transition-colors [color-scheme:dark]"
                      />
                    </div>

                    <select
                      value={formData.service}
                      onChange={(e) =>
                        setFormData({ ...formData, service: e.target.value })
                      }
                      className="w-full px-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-sky-500 transition-colors appearance-none"
                    >
                      <option value="" className="bg-slate-800">
                        Select a service
                      </option>
                      {serviceOptions.map((s: string) => (
                        <option key={s} value={s} className="bg-slate-800">
                          {s}
                        </option>
                      ))}
                    </select>

                    <div className="relative">
                      <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-slate-400" />
                      <textarea
                        placeholder="Any specific concerns or questions?"
                        rows={3}
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({ ...formData, message: e.target.value })
                        }
                        className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-sky-500 transition-colors resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-sky-500 text-white font-semibold rounded-xl hover:bg-sky-600 transition-colors disabled:opacity-50 shadow-lg shadow-sky-500/25"
                    >
                      {isSubmitting ? (
                        "Submitting..."
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          Request Appointment
                        </>
                      )}
                    </button>
                  </div>
                </>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}