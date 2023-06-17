import Hero from "./Hero";
import Headerr from "../header/Header";
import Features from "./Features";
import Footer from "./Footer";
import Feature3 from "./Feature3";
import Feature2 from "./Feature2";
import Feature1 from "./Feature1";
import Aos from "aos";
import "aos/dist/aos.css";
export default function Home() {
  Aos.init({
    duration: 1800,
    offset: 100,
  });
  return (
    <div>
      <Headerr />
      <div className="border-b border-solid pt-5">
        <Hero />
      </div>
      <div className="border-b border-solid pt-5 my-10">
        <Feature1 />
      </div>
      <div className="border-b border-solid pt-5 my-10">
        <Feature2/>
      </div>
      <div className="border-b border-solid pt-5 my-10">
        <Feature3/>
      </div>
      <div className=" ">
        <Features />
      </div>

      <div className="h-[100px]"></div>
      <Footer />
    </div>
  );
}
