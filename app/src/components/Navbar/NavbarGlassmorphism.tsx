import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { Menu, X, Phone, User as UserIcon, LogOut } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import type { User } from "@supabase/supabase-js";

interface NavbarGlassProps {
  siteName?: string;
  phone?: string;
}

export default function NavbarGlassmorphism({
  siteName = "Aurora Dental",
  phone = "+1 (555) 234-5678",
}: NavbarGlassProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/auth");
  };

  const navLinks = [
    { label: "Services", href: "#services" },
    { label: "Results", href: "#before-after" },
    { label: "Doctor", href: "#doctor" },
    { label: "Reviews", href: "#testimonials" },
    { label: "Contact", href: "#appointment" },
  ];

  return (
    <nav
      className={`fixed top-4 left-4 right-4 z-50 rounded-2xl transition-all duration-500 ${
        scrolled
          ? "bg-white/70 backdrop-blur-2xl shadow-lg border border-white/20"
          : "bg-white/10 backdrop-blur-md border border-white/10"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
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
              scrolled ? "bg-sky-500" : "bg-white/20"
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
            className={`flex items-center gap-2 text-sm font-medium transition-colors mr-2 ${
              scrolled ? "text-sky-600" : "text-white/80"
            }`}
          >
            <Phone className="w-4 h-4" />
            {phone}
          </a>

          {user ? (
            <button
              onClick={handleLogout}
              className={`px-4 py-2 flex items-center gap-2 text-sm font-medium border rounded-full transition-colors ${
                scrolled 
                  ? "border-slate-200 text-slate-700 hover:bg-slate-50" 
                  : "border-white/20 text-white hover:bg-white/10"
              }`}
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          ) : (
            <Link
              to="/auth"
              className={`px-4 py-2 flex items-center gap-2 text-sm font-medium border rounded-full transition-colors ${
                scrolled 
                  ? "border-slate-200 text-slate-700 hover:bg-slate-50" 
                  : "border-white/20 text-white hover:bg-white/10"
              }`}
            >
              <UserIcon className="w-4 h-4" />
              Sign In
            </Link>
          )}

          <a
            href="#appointment"
            className="px-5 py-2 bg-gradient-to-r from-sky-500 to-blue-600 text-white text-sm font-medium rounded-full hover:opacity-90 transition-opacity shadow-lg shadow-sky-500/25"
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
        <div className="md:hidden bg-white/95 backdrop-blur-xl border-t border-white/20 px-6 py-6 space-y-4 rounded-b-2xl">
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
          
          {user ? (
            <button
              onClick={() => {
                handleLogout();
                setMenuOpen(false);
              }}
              className="block w-full text-left text-slate-700 font-medium pb-2"
            >
              Sign Out
            </button>
          ) : (
            <Link
              to="/auth"
              onClick={() => setMenuOpen(false)}
              className="block text-slate-700 font-medium pb-2"
            >
              Sign In
            </Link>
          )}

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
