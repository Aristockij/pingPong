"use client";

import { useEffect, useRef, useState } from "react";
import { Application, Container, Graphics, Text, TextStyle } from "pixi.js";
import { Player } from "@/classes/player";
import { Ball } from "@/classes/ball";

const Canvas = () => {
  const canvasRef = useRef();

  useEffect(() => {
    (async () => {
      const app = new Application();
      await app.init({ background: "#000", resizeTo: window });

      let countPlayerOne = 0;
      let countPlayerSecond = 0;

      const textStyle = new TextStyle({
        fontFamily: "Arial",
        dropShadow: {
          alpha: 0.8,
          blur: 4,
          color: "0x111111",
          distance: 10,
        },
        fill: "#ffffff",
        stroke: { color: "#004620", width: 12, join: "round" },
        fontSize: 60,
        fontWeight: "lighter",
      });

      const textOne = new Text({ text: countPlayerOne, style: textStyle });
      const textTwo = new Text({ text: countPlayerSecond, style: textStyle });

      textOne.x = 600;
      textOne.y = 300;

      textTwo.x = 600;
      textTwo.y = 400;

      canvasRef.current.appendChild(app.canvas);

      const container = new Container();
      app.stage.addChild(container);

      container.x = app.screen.width / 2 - 300;
      container.y = app.screen.height / 2 - 400;

      container.width = 600;
      container.height = 800;

      const graphicsBg = new Graphics();

      graphicsBg.rect(0, 0, 600, 800);
      graphicsBg.fill(0xde3249);

      const plyerOne = new Player(200, 10, { x: 150, y: 750 });

      const plyerTwo = new Player(200, 10, { x: 150, y: 50 });

      const ball = new Ball({ x: 100, y: 700 });
      ball.render();

      container.addChild(
        graphicsBg,
        plyerTwo.graphics,
        plyerOne.graphics,
        ball.graphics,
        textOne,
        textTwo
      );

      const keyDownHandler = (e) => {
        if (e.key == "ArrowRight") {
          if (plyerOne.position.x < 400) {
            plyerOne.updatePos(20);
          }
        } else if (e.key == "ArrowLeft") {
          if (plyerOne.position.x > 0) {
            plyerOne.updatePos(-20);
          }
        }
      };

      const keyDownHandlerSecondPlayer = (e) => {
        if (e.key == "d") {
          if (plyerTwo.position.x < 400) {
            plyerTwo.updatePos(20);
          }
        } else if (e.key == "a") {
          if (plyerTwo.position.x > 0) {
            plyerTwo.updatePos(-20);
          }
        }
      };

      app.ticker.add(() => {
        ball.updatePos(graphicsBg, plyerOne.position, plyerTwo.position);

        // if (ball.position.y + 40 === 800) {
        //   countPlayerOne += 1;
        //   textOne.text = countPlayerOne.toString();

        //   ball.position = { x: graphicsBg.width / 2, y: graphicsBg.height / 2 };
        //   ball.dx = -3;
        //   ball.dy = 3;
        // }

        // if (ball.position.y - 22 == 0) {
        //   countPlayerSecond += 1;
        //   textTwo.text = countPlayerSecond.toString();

        //   ball.position = { x: graphicsBg.width / 2, y: graphicsBg.height / 2 };
        //   ball.dx = -3;
        //   ball.dy = 3;
        // }
      });

      document.addEventListener("keydown", keyDownHandler);
      document.addEventListener("keydown", keyDownHandlerSecondPlayer);
      return () => {
        document.removeEventListener("keydown", keyDownHandler);
        document.removeEventListener("keydown", keyDownHandlerSecondPlayer);
      };
    })();
  }, []);

  return <section ref={canvasRef} />;
};
export default Canvas;
