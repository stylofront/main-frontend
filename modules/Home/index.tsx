import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import HeroSection from "./sections/hero";
import PlatformSection from "./sections/platform";
import ContactSection from "./sections/contact";

export default function HomeContent() {
  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      <Header />
      <HeroSection />
      <PlatformSection />
      <ContactSection />
      <Footer />
    </main>
  );
}


