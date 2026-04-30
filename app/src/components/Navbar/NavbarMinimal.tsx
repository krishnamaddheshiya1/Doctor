import { useState } from "react";
import { NavLink, Link } from "react-router";
import { Home, Stethoscope, Star, Phone, User, Menu, X, HelpCircle } from "lucide-react";
import type { NavbarConfig } from "@/types/navbar";

export default function NavbarMinimal({ config }: { config: NavbarConfig }) {
  const [menuOpen, setMenuOpen] = useState(false);

  // Helper to resolve an icon based on the label text
  const getIconForLabel = (label: string) => {
    const l = label.toLowerCase();
    if (l.includes("home")) return Home;
    if (l.includes("service") || l.includes("clinic")) return Stethoscope;
    if (l.includes("doctor") || l.includes("user")) return User;
    if (l.includes("review") || l.includes("result")) return Star;
    if (l.includes("contact") || l.includes("appointment")) return Phone;
    return HelpCircle; // Fallback icon
  };

  const navLinks = config.menu;

  return (
    <>
      <nav 
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 hidden md:flex items-center gap-1 backdrop-blur-xl px-3 py-3 rounded-full border border-white/10 shadow-2xl shadow-black/50"
        style={{
          backgroundColor: config.theme?.bgColor || "rgba(15, 23, 42, 0.9)",
        }}
      >
        {navLinks.map((link) => {
          const Icon = getIconForLabel(link.label);
          return (
            <NavLink
              key={link.label}
              to={link.link}
              className={({ isActive }) => 
                `group relative flex items-center justify-center w-12 h-12 rounded-full transition-colors ${
                  isActive ? "bg-white/20" : "hover:bg-white/10"
                }`
              }
              title={link.label}
              onClick={(e) => {
                if (link.link === "/" && window.location.pathname === "/") {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }
              }}
            >
              {({ isActive }) => (
                <>
                  <Icon 
                    className="w-5 h-5 transition-colors" 
                    style={{ color: isActive ? "#ffffff" : config.theme?.textColor ? `${config.theme.textColor}B3` : "rgba(255,255,255,0.7)" }}
                  />
                  <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-slate-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                    {link.label}
                  </span>
                </>
              )}
            </NavLink>
          );
        })}
      </nav>

      <button
        className="md:hidden fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-2xl shadow-black/50 border border-white/10"
        style={{
          backgroundColor: config.theme?.bgColor || "#0f172a",
        }}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? (
          <X className="w-6 h-6" style={{ color: config.theme?.textColor || "white" }} />
        ) : (
          <Menu className="w-6 h-6" style={{ color: config.theme?.textColor || "white" }} />
        )}
      </button>

      {menuOpen && (
        <div 
          className="md:hidden fixed bottom-24 right-6 z-50 backdrop-blur-xl border border-white/10 rounded-2xl px-4 py-4 space-y-2 shadow-2xl min-w-[180px]"
          style={{
            backgroundColor: config.theme?.bgColor ? `${config.theme.bgColor}` : "rgba(15, 23, 42, 0.95)",
          }}
        >
          {navLinks.map((link) => {
            const Icon = getIconForLabel(link.label);
            return (
              <NavLink
                key={link.label}
                to={link.link}
                className={({ isActive }) => 
                  `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                    isActive ? "bg-white/20 text-white" : "hover:bg-white/10"
                  }`
                }
                style={{ color: config.theme?.textColor ? `${config.theme.textColor}CC` : "rgba(255,255,255,0.8)" }}
                onClick={(e) => {
                  setMenuOpen(false);
                  if (link.link === "/" && window.location.pathname === "/") {
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }
                }}
              >
                <Icon className="w-5 h-5" />
                <span className="text-sm font-medium" style={{ color: config.theme?.textColor || "white" }}>{link.label}</span>
              </NavLink>
            );
          })}
          {config.cta && (
            <Link
              to={config.cta.link}
              className="flex items-center gap-3 px-3 py-2 mt-2 bg-sky-500 rounded-lg transition-colors text-white text-sm font-medium"
              onClick={() => setMenuOpen(false)}
            >
              {config.cta.label}
            </Link>
          )}
        </div>
      )}
    </>
  );
}
