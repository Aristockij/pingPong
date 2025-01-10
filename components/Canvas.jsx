"use client";

import { useEffect, useRef } from "react";
import { setup, cleanup } from "../gameEngine/setup";

const Canvas = () => {
  const canvasRef = useRef();

  useEffect(() => {
    setup(canvasRef);

    return () => {
      cleanup(canvasRef);
    };
  }, []);

  return <section ref={canvasRef} />;
};
export default Canvas;
