import { useState } from "react";
import { Home, Stethoscope, Star, Phone, User, Menu, X } from "lucide-react";

interface NavbarMinimalProps {
  siteName?: string;
}

export default function NavbarMinimal({
}: NavbarMinimalProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { label: "Home", href: "/", icon: Home },
    { label: "Services", href: "#services", icon: Stethoscope },
    { label: "Doctor", href: "#doctor", icon: User },
    { label: "Reviews", href: "#testimonials", icon: Star },
    { label: "Contact", href: "#appointment", icon: Phone },
  ];

  return (
    <>
      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 hidden md:flex items-center gap-1 bg-slate-900/90 backdrop-blur-xl px-3 py-3 rounded-full border border-white/10 shadow-2xl shadow-black/50">
        {navLinks.map((link) => {
          const Icon = link.icon;
          return (
            <a
              key={link.label}
              href={link.href}
              className="group relative flex items-center justify-center w-12 h-12 rounded-full hover:bg-white/10 transition-colors"
              title={link.label}
              onClick={(e) => {
                if (link.href === "/" && window.location.pathname === "/") {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }
              }}
            >
              <Icon className="w-5 h-5 text-white/70 group-hover:text-white transition-colors" />
              <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-slate-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                {link.label}
              </span>
            </a>
          );
        })}
      </nav>

      <button
        className="md:hidden fixed bottom-6 right-6 z-50 w-14 h-14 bg-slate-900 rounded-full flex items-center justify-center shadow-2xl shadow-black/50 border border-white/10"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <Menu className="w-6 h-6 text-white" />
        )}
      </button>

      {menuOpen && (
        <div className="md:hidden fixed bottom-24 right-6 z-50 bg-slate-900/95 backdrop-blur-xl border border-white/10 rounded-2xl px-4 py-4 space-y-2 shadow-2xl min-w-[180px]">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.label}
                href={link.href}
                className="flex items-center gap-3 px-3 py-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                onClick={(e) => {
                  setMenuOpen(false);
                  if (link.href === "/" && window.location.pathname === "/") {
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }
                }}
              >
                <Icon className="w-5 h-5" />
                <span className="text-sm font-medium">{link.label}</span>
              </a>
            );
          })}
        </div>
      )}
    </>
  );
}
