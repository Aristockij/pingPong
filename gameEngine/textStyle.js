import { TextStyle } from "pixi.js";

export const textStyle = (size) =>
  new TextStyle({
    fontFamily: "Arial",
    dropShadow: {
      alpha: 0.8,
      blur: 4,
      color: "0x111111",
      distance: 10,
    },
    fill: "#ffffff",
    stroke: { color: "#004620", width: 12, join: "round" },
    fontSize: size,
    fontWeight: "lighter",
  });

export const textStyleSm = (size) =>
  new TextStyle({
    fontFamily: "Arial",
    dropShadow: {
      alpha: 0.8,
      blur: 4,
      color: "0x111111",
      distance: 10,
    },
    fill: "#ffffff",
    fontSize: size,
    fontWeight: "lighter",
  });
