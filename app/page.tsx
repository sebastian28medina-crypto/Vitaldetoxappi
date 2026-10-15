import { About, Benefits } from "@/components/About";
import { CartDrawer } from "@/components/CartDrawer";
import { CartProvider } from "@/components/CartProvider";
import { Hero } from "@/components/Hero";
import { Loader } from "@/components/Loader";
import { Navbar } from "@/components/Navbar";
import { ScrollStory } from "@/components/ScrollStory";
import { Faq, Footer, ShotPack, Subscriptions } from "@/components/Sections";
import { StationsBand } from "@/components/StationsBand";

export default function Home() {
  return (
    <CartProvider>
      <Loader />
      <Navbar />
      <main>
        <Hero />
        <About />
        <StationsBand />
        <div className="h-24 md:h-32" />
        <Benefits />
        <ScrollStory />
        <ShotPack />
        <Subscriptions />
        <Faq />
      </main>
      <Footer />
      <CartDrawer />
    </CartProvider>
  );
}
