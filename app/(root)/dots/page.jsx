"use client";

import { SP } from "next/dist/shared/lib/utils";
import { Application, Graphics, Point, Sprite, Texture } from "pixi.js";
import { useEffect, useRef } from "react";

const Page = () => {
  const canvasRef = useRef();

  function circleIntersect(x1, y1, r1, x2, y2, r2) {
    let squareDistance = (x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2);

    return squareDistance <= (r1 + r2) * (r1 + r2);
  }

  useEffect(() => {
    (async () => {
      const app = new Application();
      await app.init({ background: "#000", resizeTo: window });

      canvasRef.current.appendChild(app.canvas);

      let circleStrokeColor = "transparent";
      const cursorCircle = new Graphics()
        .circle(0, 0, 50)
        .stroke({ color: circleStrokeColor, width: 2 });

      cursorCircle.position.set(
        app.screen.width / 2,
        app.screen.height / 2 - 100
      );

      const cursorCircle2 = new Graphics()
        .circle(0, 0, 50)
        .stroke({ color: circleStrokeColor, width: 2 });

      cursorCircle2.position.set(
        app.screen.width / 2 - 200,
        app.screen.height / 2 + 100
      );

      const cursorCircle3 = new Graphics()
        .circle(0, 0, 50)
        .stroke({ color: circleStrokeColor, width: 2 });

      cursorCircle3.position.set(
        app.screen.width / 2 + 200,
        app.screen.height / 2 + 100
      );

      let cursorX = cursorCircle.getBounds().minX + 51;
      let cursorY = cursorCircle.getBounds().minY + 51;

      let cursorX2 = cursorCircle2.getBounds().minX + 51;
      let cursorY2 = cursorCircle2.getBounds().minY + 51;

      let cursorX3 = cursorCircle3.getBounds().minX + 51;
      let cursorY3 = cursorCircle3.getBounds().minY + 51;

      let r = 1;

      for (let i = 5; i < window.innerWidth; i += 15) {
        for (let d = 5; d < window.innerHeight; d += 15) {
          const circleGraphics = new Graphics().circle(i, d, r).fill("white");

          let x = circleGraphics.getBounds().maxX + (r + 1);
          let y = circleGraphics.getBounds().maxY + (r + 1);

          if (
            circleIntersect(x, y, r, cursorX, cursorY, 51) ||
            circleIntersect(x, y, r, cursorX2, cursorY2, 51) ||
            circleIntersect(x, y, r, cursorX3, cursorY3, 51)
          ) {
            circleGraphics.clear();
            circleGraphics.circle(i, d, r).fill("red");
          } else {
            circleGraphics.clear();
            circleGraphics.circle(i, d, r).fill("white");
          }

          app.stage.addChild(circleGraphics);
        }
      }

      app.stage.addChild(cursorCircle, cursorCircle2, cursorCircle3);
    })();
  }, []);
  return <section ref={canvasRef}></section>;
};
export default Page;
