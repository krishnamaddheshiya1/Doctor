import { type ReactNode } from "react";
import NavbarLoader from "@/components/Navbar/NavbarLoader";

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-[100dvh] bg-slate-50">
      <NavbarLoader />
      <main>{children}</main>
    </div>
  );
}