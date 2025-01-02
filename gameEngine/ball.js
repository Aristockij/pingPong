import { GameObject } from "./gameObject";

export class Ball extends GameObject {
  constructor(x, y, angle, speed) {
    super(x, y);

    this.arc = 20;
    this.angle = angle;
    this.speed = speed;
  }

  render() {
    this.graphics.circle(this.x, this.y, this.arc);
    this.graphics.fill(this.isColliding ? "red" : "#fff");
  }

  updatePos() {
    this.graphics.clear();

    this.x += Math.cos(this.angle) * this.speed;
    this.y += Math.sin(this.angle) * this.speed;

    this.render();
  }

  bounceHorizontal() {
    // Инвертируем угол по горизонтали
    this.angle = Math.PI - this.angle;
  }

  bounceVertical() {
    // Инвертируем угол по вертикали
    this.angle = -this.angle;
  }
}
