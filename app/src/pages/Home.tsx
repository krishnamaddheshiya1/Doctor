import MainLayout from "@/layouts/MainLayout";
import Hero3D from "@/sections/Hero3D";
import CylinderGallery from "@/sections/CylinderGallery";
import Footer from "@/sections/Footer";
import SEO from "@/components/SEO";

export default function Home() {
  return (
    <MainLayout>
      <SEO title="Home" />
      <Hero3D />
      <CylinderGallery />
      <Footer />
    </MainLayout>
  );
}
