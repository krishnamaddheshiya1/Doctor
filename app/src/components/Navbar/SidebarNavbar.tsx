import { useState } from "react";
import { Link, NavLink } from "react-router";
import { Menu, X } from "lucide-react";
import type { NavbarConfig } from "@/types/navbar";

export default function SidebarNavbar({ config }: { config: NavbarConfig }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 p-2 bg-white rounded-md shadow-md text-slate-800"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      <div
        className={`fixed inset-y-0 left-0 w-64 bg-slate-900 text-white transform transition-transform duration-300 z-40 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{
          backgroundColor: config.theme?.bgColor || "#0f172a",
          color: config.theme?.textColor || "#ffffff"
        }}
      >
        <div className="p-6 h-full flex flex-col">
          <div className="text-2xl font-bold mb-8 tracking-tight">
            {config.logo ? (
              <img src={config.logo} alt="Logo" className="h-8 object-contain" />
            ) : (
              "Dashboard"
            )}
          </div>
          
          <nav className="flex-1 space-y-2">
            {config.menu.map((item) => (
              <NavLink
                key={item.label}
                to={item.link}
                className={({ isActive }) => 
                  `block px-4 py-2 rounded-md transition-colors ${
                    isActive ? "bg-white/20 font-semibold" : "hover:bg-white/10"
                  }`
                }
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
          
          {config.cta && (
            <div className="mt-auto pt-6 border-t border-white/10">
              <Link
                to={config.cta.link}
                className="block w-full text-center px-4 py-2 bg-sky-500 text-white rounded-md hover:bg-sky-600 transition-colors"
              >
                {config.cta.label}
              </Link>
            </div>
          )}
        </div>
      </div>
      
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
