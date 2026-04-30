import MainLayout from "@/layouts/MainLayout";
import Services3D from "@/sections/Services3D";
import BeforeAfterSection from "@/sections/BeforeAfterSection";
import Footer from "@/sections/Footer";
import SEO from "@/components/SEO";

export default function Services() {
  return (
    <MainLayout>
      <SEO 
        title="Our Services" 
        description="Explore our precision-crafted dental services ranging from simple checkups to advanced 3D cosmetic procedures." 
      />
      <div className="pt-24 md:pt-32">
        <Services3D />
        <BeforeAfterSection />
      </div>
      <Footer />
    </MainLayout>
  );
}
