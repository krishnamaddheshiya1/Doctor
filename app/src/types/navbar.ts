export type NavbarType = "glass" | "minimal" | "sidebar";

export interface MenuItem {
  label: string;
  link: string;
}

export interface CallToAction {
  label: string;
  link: string;
}

export interface NavbarTheme {
  bgColor?: string;
  textColor?: string;
  [key: string]: string | undefined;
}

export interface NavbarConfig {
  type: NavbarType;
  logo?: string;
  menu: MenuItem[];
  cta?: CallToAction;
  theme?: NavbarTheme;
}

export interface NavbarData {
  activeNavbar: NavbarType;
  navbars: {
    glass: NavbarConfig;
    minimal: NavbarConfig;
    sidebar: NavbarConfig;
  };
}
