import { Ball } from "./ball";
import { Player } from "./player";
import { Container, Graphics, Text } from "pixi.js";
import { textStyle } from "./textStyle";

let ballSpeed = 5;

export let state = {
  game: 0,
  endGameState: false,
  container: new Container(),
  graphicsBg: new Graphics(),
  playerOne: new Player(200, 10, { x: 150, y: 750 }),
  playerTwo: new Player(200, 10, { x: 150, y: 50 }),
  winnerText: new Text({
    style: textStyle(40),
  }),
  ball: new Ball(300, 400, 1.3, ballSpeed),
  scores: {
    playerOne: 0,
    playerTwo: 0,
  },
  textOne: new Text({
    text: 0,
    style: textStyle(60),
  }),
  textTwo: new Text({
    text: 0,
    style: textStyle(60),
  }),
};
