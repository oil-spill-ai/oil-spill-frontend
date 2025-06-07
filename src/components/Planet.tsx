"use client";

import React, { useEffect, useRef } from "react";
import { useGlobe } from "@/app/globe-context";

const Planet: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const globeContext = useGlobe();

  useEffect(() => {
    if (!containerRef.current || !globeContext) return;

    const container = containerRef.current;
    globeContext.initGlobe(container);

    return () => {
      globeContext.cleanup();
      if (globeContext.renderer?.domElement && container.contains(globeContext.renderer.domElement)) {
        container.removeChild(globeContext.renderer.domElement);
      }
    };
  }, [globeContext]);

  return <div ref={containerRef} className="w-full h-[400px] sm:h-[500px] md:h-[600px]" />;
};

export default Planet;
