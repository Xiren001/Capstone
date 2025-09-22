import Hero from "./body-component/HeroSection.tsx";
import { useEffect, useRef, useState } from "react";
import Spline from "@splinetool/react-spline";
import About from "./body-component/AboutSection.tsx";

function Body() {
  const splineRef = useRef<any>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const el = splineRef.current;
    if (!el) return;

    const handleLoad = () => {
      setLoaded(true);
    };

    el.addEventListener("load", handleLoad);
    return () => el.removeEventListener("load", handleLoad);
  }, []);

  return (
    <>
      <div className="fixed inset-0 z-1 w-full h-[100dvh] border-x bg-gradient-to-t from-[#0B0F14] via-transparent via-20% to-transparent mx-auto pointer-events-none"></div>
      <div className="absolute w-full z-1 h-[100dvh] overflow-hidden">
        <Spline
          ref={splineRef}
          className={`d-mobile ${
            loaded ? "animate-slideUp delay-[3000ms]" : ""
          } !scale-150 sm:!scale-150 md:!scale-125 lg:!scale-90 xl:!scale-90 2xl:!scale-90`}
          events-target="local"
          scene="https://prod.spline.design/81aMlP-8XiH6-fAW/scene.splinecode"
        ></Spline>
      </div>
      <Hero />
      <About />
    </>
  );
}

export default Body;
