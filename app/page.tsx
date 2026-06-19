import CardSection from "./components/CardSection";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="w-full">
      {/* Section 1: Flat Pink Background */}
      <section className="w-full min-h-[calc(100vh-72px)] bg-pink-100">
      </section>

      {/* Section 2: Dark Midnight Blue Background with Card Image (Component) */}
      <CardSection />

      {/* Section 3: The Big Blue Section */}
      <section className="w-full min-h-[300vh] bg-[#181830]">
      </section>

      {/* Section 4: Medium Gray Background (60vh) */}
      <section className="w-full min-h-[60vh] bg-[#949494]">
      </section>

      {/* Section 5: Light Gray Background (40vh) */}
      <section className="w-full min-h-[40vh] bg-[#d9d9d9]">
      </section>

      {/* Footer: Animated Water Waves + Contact */}
      <Footer />
    </main>
  );
}