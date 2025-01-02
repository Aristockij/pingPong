"use client";

import { useEffect, useRef } from "react";

import { setup } from "../gameEngine/setup";

const Canvas = () => {
  const canvasRef = useRef();

  useEffect(() => {
    if (canvasRef) {
      setup(canvasRef);
    }
  }, [canvasRef]);

  return <section ref={canvasRef} />;
};
export default Canvas;
