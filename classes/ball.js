import { Graphics } from "pixi.js";

export class Ball {
  constructor(position = { x: 0, y: 0 }) {
    this.position = position;

    this.graphics = new Graphics();

    this.dx = 2;
    this.dy = -2;
    this.speed = 2;
  }

  render() {
    this.graphics.circle(this.position.x, this.position.y, 20);
    this.graphics.fill("#fff");
  }

  collision(playerPos, modY) {
    if (
      playerPos.x <= this.position.x &&
      playerPos.x + 200 >= this.position.x + this.dx &&
      playerPos.y - modY == this.position.y
    ) {
      const relativeIntersectX = this.position.x - (playerPos.x + 100);
      const normalizedRelativeIntersectionX = relativeIntersectX / 100;
      return normalizedRelativeIntersectionX;
    } else {
      return null;
    }
  }

  updatePos(graphicsBg, firstPlayerPos, secondPlayerPos) {
    this.graphics.clear();

    if (
      this.position.x + this.dx > graphicsBg.width - 20 ||
      this.position.x + this.dx < 20
    ) {
      this.dx = -this.dx;
    }

    if (
      this.position.y + this.dy > graphicsBg.height - 20 ||
      this.position.y + this.dy < 20
    ) {
      this.dy = -this.dy;
    }

    const collisionFactor1 = this.collision(firstPlayerPos, 20);
    const collisionFactor2 = this.collision(secondPlayerPos, -20);
    let collisionFactor = null;

    if (collisionFactor1 != null) {
      collisionFactor = collisionFactor1;
    }
    if (collisionFactor2 != null) {
      collisionFactor = collisionFactor2;
    }

    if (collisionFactor != null) {
      this.dy = -this.dy;
      this.dx = collisionFactor * this.speed * 2;

      const magnitude = Math.sqrt(this.dx ** 2 + this.dy ** 2);
      this.dx = (this.dx / magnitude) * this.speed;
      this.dy = (this.dy / magnitude) * this.speed;
    }

    this.position.x += this.dx;
    this.position.y += this.dy;

    this.render();
  }
}
