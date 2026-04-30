import MainLayout from "@/layouts/MainLayout";
import Hero3D from "@/sections/Hero3D";
import Services3D from "@/sections/Services3D";
import CylinderGallery from "@/sections/CylinderGallery";
import BeforeAfterSection from "@/sections/BeforeAfterSection";
import DoctorSection from "@/sections/DoctorSection";
import TestimonialsSection from "@/sections/TestimonialsSection";
import AppointmentSection from "@/sections/AppointmentSection";
import Footer from "@/sections/Footer";

export default function Home() {
  return (
    <MainLayout>
      <Hero3D />
      <Services3D />
      <CylinderGallery />
      <BeforeAfterSection />
      <DoctorSection />
      <TestimonialsSection />
      <AppointmentSection />
      <Footer />
    </MainLayout>
  );
}
