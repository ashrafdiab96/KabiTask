import { useState, useLayoutEffect } from "react";

/**
 * @function useWindowSize
 * @description A custom hook that provides the current window width and height.
 * @returns {Object} An object containing the current window width and height.
 * @property {number} width - The current window width.
 * @property {number} height - The current window height.
 */
export default function useWindowSize() {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  useLayoutEffect(() => {
    function updateSize() {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return { width, height };
}
