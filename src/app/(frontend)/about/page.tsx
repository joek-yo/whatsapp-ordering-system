import type { Metadata } from "next";
import { getBusinessData } from "@/lib/getBusinessData";
import AboutSection from "@/components/about/AboutSection";

const business = getBusinessData() as any;

export const metadata: Metadata = {
  title: "Our Story",
  description: `Learn more about ${business.name} — ${business.slogan}.`,
};

const AboutPage = () => {
  return (
    <main className="bg-background min-h-screen">
      <AboutSection />
    </main>
  );
};

export default AboutPage;
