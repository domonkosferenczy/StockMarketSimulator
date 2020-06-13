import { useState, useLayoutEffect } from "react";

// Return with the size of the GraphContainer in px
export const useContainerSize = (index) => {
  const [size, setSize] = useState({ width: 0, height: 0 });
  useLayoutEffect(() => {
    function updateSize() {
      const graphContainer = document.getElementById("GraphID" + index);
      setSize({
        width: graphContainer.offsetWidth * 2,
        height: graphContainer.offsetHeight * 2,
      });
    }
    window.addEventListener("animationend", updateSize);
    window.addEventListener("animationstart", updateSize);
    window.addEventListener("resize", updateSize);
    window.addEventListener("custom", updateSize);
    window.addEventListener("fullscreenchange", updateSize);
    updateSize();
    return () => {
      window.addEventListener("animationend", updateSize);
      window.addEventListener("animationstart", updateSize);
      window.removeEventListener("resize", updateSize);
      window.removeEventListener("custom", updateSize);
      window.removeEventListener("fullscreenchange", updateSize);
    };
  }, []);
  return size;
};

export const drawLine = (x1, y1, x2, y2, style, lineWidth, ctx) => {
  ctx.lineCap = "butt";
  ctx.strokeStyle = style;
  ctx.lineWidth = lineWidth;
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
};

export const minAndMax = (shownDataPoints) => {
  const edge = { min: Number.MAX_VALUE, max: Number.MIN_VALUE };
  const listOfNumbers = [];
  shownDataPoints.forEach((date) => {
    if (typeof date === "number") {
      listOfNumbers.push(date);
    } else if (typeof date === "object") {
      const numbers = Object.keys(date).map((key) => {
        return date[key];
      });
      listOfNumbers.push(...numbers);
    }
  });

  // Expand limit
  edge.min = Math.min(...listOfNumbers) * 0.8;
  edge.max = Math.max(...listOfNumbers) * 1.2;

  return edge;
};
