import { keyboard } from "./keyboard";

export function setupKeyHandlers(player, leftKey, rightKey, speed) {
  const left = keyboard(leftKey);
  const right = keyboard(rightKey);

  left.press = () => {
    if (player.position.x > 0) {
      player.direction = -speed;
    }
  };

  left.release = () => {
    player.direction = 0;
  };

  right.press = () => {
    if (player.position.x < 400) {
      player.direction = speed;
    }
  };

  right.release = () => {
    player.direction = 0;
  };
}
