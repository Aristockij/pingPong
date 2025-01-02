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

    state.game = window.requestAnimationFrame(gameLoop);
  }
}
