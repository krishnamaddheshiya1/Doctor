import { useEffect, useState } from "react";
import { Link } from "react-router";
import { Menu, X, Phone } from "lucide-react";

interface NavbarTransparentProps {
  siteName?: string;
  phone?: string;
}

export default function NavbarTransparent({
  siteName = "Aurora Dental",
  phone = "+1 (555) 234-5678",
}: NavbarTransparentProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Services", href: "#services" },
    { label: "Results", href: "#before-after" },
    { label: "Doctor", href: "#doctor" },
    { label: "Reviews", href: "#testimonials" },
    { label: "Contact", href: "#appointment" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/90 backdrop-blur-xl shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link 
          to="/" 
          onClick={(e) => {
            if (window.location.pathname === "/") {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}
          className="flex items-center gap-2"
        >
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
              scrolled ? "bg-sky-500" : "bg-white/20 backdrop-blur-sm"
            }`}
          >
            <span className="text-white text-xs font-bold">A</span>
          </div>
          <span
            className={`text-lg font-semibold tracking-tight transition-colors ${
              scrolled ? "text-slate-900" : "text-white"
            }`}
          >
            {siteName}
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:opacity-70 ${
                scrolled ? "text-slate-700" : "text-white/90"
              }`}
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-4">
          <a
            href={`tel:${phone}`}
            className={`flex items-center gap-2 text-sm font-medium transition-colors ${
              scrolled ? "text-sky-600" : "text-white/80"
            }`}
          >
            <Phone className="w-4 h-4" />
            {phone}
          </a>
          <a
            href="#appointment"
            className="px-5 py-2 bg-sky-500 text-white text-sm font-medium rounded-full hover:bg-sky-600 transition-colors"
          >
            Book Now
          </a>
        </div>

        <button
          className="md:hidden p-2"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? (
            <X className={`w-6 h-6 ${scrolled ? "text-slate-900" : "text-white"}`} />
          ) : (
            <Menu className={`w-6 h-6 ${scrolled ? "text-slate-900" : "text-white"}`} />
          )}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-xl border-t border-slate-100 px-6 py-6 space-y-4">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="block text-slate-700 font-medium"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#appointment"
            className="block w-full text-center px-5 py-3 bg-sky-500 text-white font-medium rounded-full"
          >
            Book Appointment
          </a>
        </div>
      )}
    </nav>
  );
}
