import { useEffect, useState, lazy, Suspense } from "react";
import type { NavbarData, NavbarConfig } from "@/types/navbar";

const NavbarGlassmorphism = lazy(() => import("./NavbarGlassmorphism"));
const NavbarMinimal = lazy(() => import("./NavbarMinimal"));
const SidebarNavbar = lazy(() => import("./SidebarNavbar"));

const DEFAULT_CONFIG: NavbarConfig = {
  type: "minimal",
  logo: "",
  menu: [
    { label: "Home", link: "/" },
    { label: "Services", link: "/#services" }
  ],
  cta: {
    label: "Contact",
    link: "/#appointment"
  }
};

export default function NavbarLoader() {
  const [config, setConfig] = useState<NavbarConfig | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadNavbarConfig() {
      try {
        // Appending timestamp to avoid caching during development/updates
        const response = await fetch(`/data/navbar.json?t=${new Date().getTime()}`);
        if (!response.ok) throw new Error("Failed to load navbar config");
        
        const data: NavbarData = await response.json();
        
        const activeType = data.activeNavbar;
        const activeConfig = data.navbars[activeType];
        
        if (activeConfig) {
          setConfig(activeConfig);
        } else {
          throw new Error("Invalid active navbar type");
        }
      } catch (error) {
        console.error("Navbar Config Error:", error);
        // Fallback to default minimal config if fetch fails
        setConfig(DEFAULT_CONFIG);
      } finally {
        setLoading(false);
      }
    }

    loadNavbarConfig();
  }, []);

  if (loading) {
    return <div className="h-16" />; // Placeholder while loading
  }

  if (!config) return null;

  return (
    <Suspense fallback={<div className="h-16" />}>
      {config.type === "glass" && <NavbarGlassmorphism config={config} />}
      {config.type === "minimal" && <NavbarMinimal config={config} />}
      {config.type === "sidebar" && <SidebarNavbar config={config} />}
    </Suspense>
  );
}
