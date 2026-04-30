import MainLayout from "@/layouts/MainLayout";
import AppointmentSection from "@/sections/AppointmentSection";
import Footer from "@/sections/Footer";
import SEO from "@/components/SEO";

export default function Contact() {
  return (
    <MainLayout>
      <SEO 
        title="Contact Us" 
        description="Book your appointment today at Aurora Dental and take the first step towards your perfect smile." 
      />
      <div className="pt-24 md:pt-32">
        <AppointmentSection />
      </div>
      <Footer />
    </MainLayout>
  );
}
