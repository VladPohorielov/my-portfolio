import { Nav } from "./components/layout/Nav";
import { StickyCta } from "./components/layout/StickyCta";
import { Footer } from "./components/layout/Footer";
import { Meta } from "./components/seo/Meta";
import { Hero } from "./components/sections/Hero";
import { About } from "./components/sections/About";
import { Tools } from "./components/sections/Tools";
import { Workflow } from "./components/sections/Workflow";
import { Gallery } from "./components/sections/Gallery";
import { VideoRail } from "./components/sections/VideoRail";
import { Portfolio } from "./components/sections/Portfolio";
import { Contact } from "./components/sections/Contact";

export default function App() {
  return (
    <>
      <Meta />
      <Nav />
      <StickyCta />

      <main>
        <Hero />
        <About />
        <Portfolio />
        <Tools />
        <Workflow />
        <VideoRail />
        <Gallery />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
