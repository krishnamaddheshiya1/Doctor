export interface SiteConfig {
  navbarStyle: string;
  siteName: string;
  siteTagline: string;
  primaryColor: string;
  secondaryColor: string;
  phone: string;
  address: string;
  city: string;
  whatsapp: string;
}

export interface HeroData {
  id: number;
  headline: string;
  subheadline: string;
  ctaText: string;
  ctaLink: string;
  backgroundImage: string | null;
  backgroundVideo: string | null;
}

export interface ServiceData {
  id: number;
  title: string;
  description: string;
  image: string | null;
  icon: string | null;
  order: number;
  featured: boolean;
}

export interface TestimonialData {
  id: number;
  name: string;
  role: string | null;
  content: string;
  avatar: string | null;
  rating: number;
}

export interface DoctorData {
  id: number;
  name: string;
  title: string;
  credentials: string | null;
  bio: string | null;
  image: string | null;
  specialties: string | null;
  experience: string | null;
}

export interface GalleryImageData {
  id: number;
  src: string;
  alt: string | null;
  category: string | null;
  order: number;
}

export interface BeforeAfterData {
  id: number;
  title: string;
  beforeImage: string;
  afterImage: string;
  description: string | null;
}
