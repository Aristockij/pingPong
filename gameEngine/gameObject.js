import { Graphics } from "pixi.js";

export class GameObject {
  constructor(x, y, vx, vy) {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;

    this.graphics = new Graphics();
    this.isColliding = false;
  }
}
