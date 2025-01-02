import { Application } from "pixi.js";
import { gameLoop } from "./gameLoop";
import { state } from "./state";

export async function setup(canvasRef) {
  const app = new Application();
  await app.init({ background: "#000", resizeTo: window });

  canvasRef.current.appendChild(app.canvas);

  state.graphicsBg.rect(0, 0, 600, 800);
  state.graphicsBg.fill(0xde3249);

  state.textOne.x = 600;
  state.textOne.y = 300;

  state.textTwo.x = 600;
  state.textTwo.y = 400;

  state.winnerText.x = 80;
  state.winnerText.y = state.graphicsBg.height / 2;

  app.stage.addChild(state.container);

  state.container.addChild(
    state.graphicsBg,
    state.ball.graphics,
    state.playerTwo.graphics,
    state.playerOne.graphics,
    state.textOne,
    state.textTwo
  );

  state.container.x = app.screen.width / 2 - 300;
  state.container.y = app.screen.height / 2 - 400;

  state.container.width = 600;
  state.container.height = 800;

  state.ball.render();

  const keyDownHandler = (e) => {
    if (e.key == "ArrowRight") {
      if (state.playerOne.position.x < 400) {
        state.playerOne.updatePos(20);
      }
    } else if (e.key == "ArrowLeft") {
      if (state.playerOne.position.x > 0) {
        state.playerOne.updatePos(-20);
      }
    }
  };

  const keyDownHandlerSecondPlayer = (e) => {
    if (e.key == "d") {
      if (state.playerTwo.position.x < 400) {
        state.playerTwo.updatePos(20);
      }
    } else if (e.key == "a") {
      if (state.playerTwo.position.x > 0) {
        state.playerTwo.updatePos(-20);
      }
    }
  };

  gameLoop();

  document.addEventListener("keydown", keyDownHandler);
  document.addEventListener("keydown", keyDownHandlerSecondPlayer);
  return () => {
    document.removeEventListener("keydown", keyDownHandler);
    document.removeEventListener("keydown", keyDownHandlerSecondPlayer);
  };
}
