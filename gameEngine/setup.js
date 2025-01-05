import { Application } from "pixi.js";
import { gameLoop } from "./gameLoop";
import { state } from "./state";
import { setupKeyHandlers } from "./setupKeyHandlers";

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

  setupKeyHandlers(state.playerOne, "ArrowLeft", "ArrowRight", 10);
  setupKeyHandlers(state.playerTwo, "a", "d", 10);

  gameLoop();
}
