import MainLayout from "@/layouts/MainLayout";
import DoctorSection from "@/sections/DoctorSection";
import TestimonialsSection from "@/sections/TestimonialsSection";
import Footer from "@/sections/Footer";
import SEO from "@/components/SEO";

export default function About() {
  return (
    <MainLayout>
      <SEO 
        title="About Us" 
        description="Meet Dr. Michael Anderson and read real stories from our satisfied patients at Aurora Dental." 
      />
      <div className="pt-24 md:pt-32">
        <DoctorSection />
        <TestimonialsSection />
      </div>
      <Footer />
    </MainLayout>
  );
}
