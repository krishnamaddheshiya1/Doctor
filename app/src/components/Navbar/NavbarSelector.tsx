import { lazy, Suspense } from "react";
import { siteConfig } from "@/lib/data";

const NavbarTransparent = lazy(() => import("./NavbarTransparent"));
const NavbarSolid = lazy(() => import("./NavbarSolid"));
const NavbarGlassmorphism = lazy(() => import("./NavbarGlassmorphism"));
const NavbarMinimal = lazy(() => import("./NavbarMinimal"));

export default function NavbarSelector() {
  const config = siteConfig;

  const navbarStyle = config?.navbarStyle ?? "glassmorphism";
  const siteName = config?.siteName ?? "Aurora Dental";
  const phone = config?.phone ?? "+1 (555) 234-5678";

  return (
    <Suspense fallback={<div className="h-16" />}>
      {navbarStyle === "transparent" && (
        <NavbarTransparent siteName={siteName} phone={phone} />
      )}
      {navbarStyle === "solid" && (
        <NavbarSolid siteName={siteName} phone={phone} />
      )}
      {navbarStyle === "glassmorphism" && (
        <NavbarGlassmorphism siteName={siteName} phone={phone} />
      )}
      {navbarStyle === "minimal" && (
        <NavbarMinimal siteName={siteName} />
      )}
    </Suspense>
  );
}
