import { Graphics } from "pixi.js";

export class Player {
  constructor(width = 200, height = 10, position = { x: 0, y: 0 }) {
    this.width = width;
    this.height = height;
    this.position = position;

    this.vx = 1;
    this.vy = 1;
    this.graphics = new Graphics();
    this.render();
  }

  render() {
    this.graphics.rect(
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
    this.graphics.fill("#000");
  }

  updatePos(deltaX) {
    this.graphics.clear();

    if (this.position.x > 400) {
      this.position.x += 0;
    }

    this.position.x += deltaX;
    this.render();
  }
}
