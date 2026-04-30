export const siteConfig = {
  navbarStyle: "glassmorphism",
  siteName: "Aurora Dental",
  siteTagline: "Next-Level Dental Care",
  primaryColor: "#2563eb",
  secondaryColor: "#0ea5e9",
  phone: "+1 (555) 234-5678",
  address: "123 Smile Avenue, Suite 400",
  city: "New York, NY 10001",
  whatsapp: "+15552345678",
};

export const heroContent = {
  headline: "Experience Next-Level Dental Care",
  subheadline:
    "Where precision meets artistry. Advanced technology, compassionate care, and stunning results redefine your dental experience.",
  ctaText: "Book Appointment",
  ctaLink: "#appointment",
  backgroundImage: "/clinic-interior.jpg",
  backgroundVideo: null,
};

export const services = [
  {
    title: "Teeth Whitening",
    description:
      "Professional-grade LED whitening technology that brightens your smile up to 8 shades in a single session. Safe, effective, and long-lasting results.",
    image: "/teeth-whitening.jpg",
    icon: "Sparkles",
    order: 1,
    featured: true,
  },
  {
    title: "Clear Aligners",
    description:
      "Invisible orthodontics using state-of-the-art 3D scanning and custom aligner fabrication. Straighten your teeth discreetly with precision-engineered comfort.",
    image: "/clear-aligners.jpg",
    icon: "AlignCenter",
    order: 2,
    featured: true,
  },
  {
    title: "Dental Implants",
    description:
      "Titanium implant solutions with computer-guided placement. Restore missing teeth with permanent, natural-looking replacements that last a lifetime.",
    image: "/dental-implants.jpg",
    icon: "CircleDot",
    order: 3,
    featured: true,
  },
  {
    title: "Smile Design",
    description:
      "Digital smile simulation and custom veneer crafting. Transform your smile with porcelain veneers tailored to your facial symmetry and aesthetic goals.",
    image: "/smile-design.jpg",
    icon: "Palette",
    order: 4,
    featured: true,
  },
  {
    title: "Traditional Braces",
    description:
      "Advanced orthodontic brackets and wire systems for complex alignment cases. Precision engineering for optimal bite correction and jaw alignment.",
    image: "/braces.jpg",
    icon: "Settings",
    order: 5,
    featured: false,
  },
];

export const testimonials = [
  {
    name: "Sarah Mitchell",
    role: "Marketing Executive",
    content:
      "The entire experience felt like visiting a luxury spa rather than a dental clinic. Dr. Anderson and the team made my smile transformation absolutely seamless. I have never felt more confident.",
    avatar: "/testimonial-01.jpg",
    rating: 5,
  },
  {
    name: "James Rodriguez",
    role: "Business Consultant",
    content:
      "After years of dental anxiety, Aurora Dental changed everything for me. The technology is incredible — digital scans, painless procedures, and results that exceeded every expectation.",
    avatar: "/testimonial-02.jpg",
    rating: 5,
  },
  {
    name: "Emily Chen",
    role: "Architect",
    content:
      "I came in for a consultation and walked out with a completely new smile plan. The 3D simulation let me see my results before we even started. Truly next-generation dentistry.",
    avatar: "/testimonial-01.jpg",
    rating: 5,
  },
];

export const doctors = [
  {
    name: "Dr. Michael Anderson",
    title: "Lead Dental Surgeon & Founder",
    credentials:
      "DDS, Harvard School of Dental Medicine | Fellow, American Academy of Cosmetic Dentistry | 15+ Years Clinical Excellence",
    bio: "Dr. Anderson founded Aurora Dental with a singular vision: to merge cutting-edge dental technology with an uncompromising patient experience. A pioneer in digital smile design and minimally invasive implantology, he has transformed over 3,000 smiles with precision-guided techniques.",
    image: "/doctor-portrait.jpg",
    specialties: "Implantology, Cosmetic Dentistry, Digital Smile Design",
    experience: "15+ Years",
    order: 1,
  }
];

export const galleryImages = [
  { src: "/hero-main.jpg", alt: "Advanced Dental Technology", category: "tech", order: 1 },
  { src: "/clinic-interior.jpg", alt: "Premium Clinic Interior", category: "clinic", order: 2 },
  { src: "/teeth-whitening.jpg", alt: "Teeth Whitening Procedure", category: "service", order: 3 },
  { src: "/dental-implants.jpg", alt: "Dental Implant Technology", category: "tech", order: 4 },
  { src: "/smile-design.jpg", alt: "Digital Smile Design", category: "tech", order: 5 },
  { src: "/clear-aligners.jpg", alt: "Clear Aligners", category: "service", order: 6 },
  { src: "/smile-perfect.jpg", alt: "Perfect Smile Result", category: "result", order: 7 },
  { src: "/braces.jpg", alt: "Orthodontic Braces", category: "service", order: 8 },
];

export const beforeAfter = [
  {
    title: "Complete Smile Makeover",
    beforeImage: "/before-after-01.jpg",
    afterImage: "/smile-perfect.jpg",
    description:
      "Full veneer reconstruction with gum contouring. Transformed in 3 visits over 6 weeks.",
    order: 1,
  },
];
