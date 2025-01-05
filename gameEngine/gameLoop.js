import { detectPlayersCollision, detectStageCollision } from "./collisions";
import { state } from "./state";
import { endGame } from "./endGame";

let secondsPassed = 0;
let oldTimeStamp = 0;

export function gameLoop(timeStamp) {
  secondsPassed = (timeStamp - oldTimeStamp) / 1000;
  oldTimeStamp = timeStamp;

  if (!secondsPassed) {
    secondsPassed = 0;
  }

  if (!state.endGameState) {
    state.ball.updatePos();

    detectPlayersCollision();
    detectStageCollision();
    endGame();

    if (state.playerOne.direction !== 0) {
      const newPos = state.playerOne.position.x + state.playerOne.direction * 5;

      if (newPos >= -40 && newPos <= 440) {
        state.playerOne.updatePos();
      }
    }

    if (state.playerTwo.direction !== 0) {
      const newPos = state.playerTwo.position.x + state.playerTwo.direction * 5;

      if (newPos >= -40 && newPos <= 440) {
        state.playerTwo.updatePos();
      }
    }

    state.game = window.requestAnimationFrame(gameLoop);
  }
}
