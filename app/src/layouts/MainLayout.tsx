import { type ReactNode } from "react";
import NavbarSelector from "@/components/Navbar/NavbarSelector";

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-[100dvh] bg-slate-50">
      <NavbarSelector />
      <main>{children}</main>
    </div>
  );
}