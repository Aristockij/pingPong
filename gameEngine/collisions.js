import { state } from "./state";

function ballsIntersect(x1, y1, r1, x2, y2, w2, h2) {
  let testX = x1;
  let testY = y1;

  if (x1 < x2) testX = x2;
  else if (x1 > x2 + w2) testX = x2 + w2;

  if (y1 < y2) testY = y2;
  else if (y1 > y2 + h2) testY = y2 + h2;

  let distX = x1 - testX;
  let distY = y1 - testY;
  let distance = Math.sqrt(distX * distX + distY * distY);

  if (distance <= r1) {
    return true;
  }
  return false;
}

function playerOneIncrement() {
  state.scores.playerOne += 1;
  state.textOne.text = state.scores.playerOne;
}
function playerTwoIncrement() {
  state.scores.playerTwo += 1;
  state.textTwo.text = state.scores.playerTwo;
}

function restartLvl(ball, container) {
  ball.x = container.width / 2 - 20;
  ball.y = container.height / 2 - 20;
  ball.angel = 1;
}

export function detectStageCollision() {
  let ball = state.ball;
  let stage = state.graphicsBg;
  let container = state.container;

  if (ball.x + ball.arc > stage.width) {
    ball.bounceHorizontal();
  } else if (ball.x - ball.arc < 0) {
    ball.bounceHorizontal();
  }

  if (ball.y - ball.arc < 0) {
    playerTwoIncrement();
    restartLvl(ball, container);
  } else if (ball.y + ball.arc > stage.height) {
    playerOneIncrement();
    restartLvl(ball, container);
  }
}

export function detectPlayersCollision() {
  state.ball.isColliding = false;

  let ball = state.ball;
  let pOne = state.playerOne;
  let pSec = state.playerTwo;

  if (
    ballsIntersect(
      ball.x,
      ball.y,
      ball.arc,
      pOne.position.x,
      pOne.position.y,
      pOne.width,
      pOne.height
    )
  ) {
    ball.isColliding = true;
    ball.bounceVertical();
  }

  if (
    ballsIntersect(
      ball.x,
      ball.y,
      ball.arc,
      pSec.position.x,
      pSec.position.y,
      pSec.width,
      pSec.height
    )
  ) {
    ball.isColliding = true;
    ball.bounceVertical();
  }
}
