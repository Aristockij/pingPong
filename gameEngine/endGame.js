import { Graphics, Text } from "pixi.js";
import { state } from "./state";
import { gameLoop } from "./gameLoop";
import { textStyleSm } from "./textStyle";

let restartButton;
let endGameLayout;

function restartGame() {
  state.endGameState;

  state.endGameState = false;
  state.scores.playerOne = 0;
  state.scores.playerTwo = 0;
  state.textOne.text = 0;
  state.textTwo.text = 0;
  state.winnerText.text = "";

  state.ball.x = state.container.width / 2 - 20;
  state.ball.y = state.container.height / 2 - 20;

  state.container.removeChild(restartButton, endGameLayout);

  state.game = window.requestAnimationFrame(gameLoop);
}

function restartGameButton() {
  restartButton = new Graphics();
  restartButton.rect(250, 470, 100, 20);
  restartButton.stroke({ width: 2, color: 0xffbd01 });
  restartButton.fill(0x000000);

  restartButton.eventMode = "static";
  restartButton.cursor = "pointer";
  restartButton.on("pointerdown", restartGame);

  let textRestart = new Text({
    text: "restart game",
    style: textStyleSm(12),
    x: 265,
    y: 472,
  });

  restartButton.addChild(textRestart);

  state.container.addChild(restartButton);
}

function showEndGameMessage() {
  endGameLayout = new Graphics();

  endGameLayout.rect(0, 0, 600, 800);
  endGameLayout.fill(0x000000);
  endGameLayout.alpha = 0.5;

  state.container.addChild(endGameLayout, state.winnerText);
  restartGameButton();
}

export function endGame() {
  if (state.scores.playerOne > 6) {
    state.winnerText.text = "Победил второй игрок";
    state.endGameState = true;
  }
  if (state.scores.playerTwo > 6) {
    state.winnerText.text = "Победил первый игрок";
    state.endGameState = true;
  }

  if (state.endGameState) {
    state.ball.x = state.container.width / 2 - 20;
    state.ball.y = state.container.height / 2 - 20;
    state.ball.updatePos(0);
    showEndGameMessage();

    window.cancelAnimationFrame(state.game);
  }
}

export function stopGameWithExit() {
  window.cancelAnimationFrame(state.game);
}
