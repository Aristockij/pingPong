import { detectPlayersCollision, detectStageCollision } from "./collisions";
import { state } from "./state";
import { endGame } from "./endGame";
import { keyboard } from "./keyboard";

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

    const left = keyboard("ArrowLeft");
    const right = keyboard("ArrowRight");

    left.press = () => {
      if (state.playerOne.position.x > 0) {
        state.playerOne.updatePos(-1);
      }
    };

    left.release = () => {
      if (!left.isDown) {
        state.playerOne.updatePos(0);
      }
    };

    right.press = () => {
      if (state.playerOne.position.x < 400) {
        state.playerOne.updatePos(1);
      }
    };

    right.release = () => {
      if (!right.isDown) {
        state.playerOne.updatePos(0);
      }
    };

    detectPlayersCollision();
    detectStageCollision();
    endGame();

    state.game = window.requestAnimationFrame(gameLoop);
  }
}
