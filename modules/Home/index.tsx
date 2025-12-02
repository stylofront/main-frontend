import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import ProblemSection from "./sections/problem";
import SolutionSection from "./sections/solution";
import ContactSection from "./sections/contact";
import HeroSection from "./sections/hero";

export default function HomeContent() {
  return (
    <main className="bg-white text-gray-900">
      <Header />
      <HeroSection />
      <ProblemSection />
      <SolutionSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
