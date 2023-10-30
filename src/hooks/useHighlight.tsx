import { useState } from "react";

export const useHighlight = () => {
  const [isHighlight, setIsHighlight] = useState(false);

  const setOverlayOnElement = (elem: any, id: any) => {
    const rect = elem.getBoundingClientRect();
    const overlay = document.createElement("div");
    Object.assign(overlay.style, {
      width: `${rect.width}px`,
      height: `${rect.height}px`,
      top: `${rect.top}px`,
      left: `${rect.left}px`,
      position: "absolute",
      zIndex: 1,
    });
    overlay.setAttribute("id", id);
    document.body.appendChild(overlay);
  };

  const highlightElement = (targetID: any) => {
    const elem = document.getElementById(targetID);
    if (elem) {
      setOverlayOnElement(elem, "overlayID");
      setIsHighlight(true);
    }
  };

  const removeHighlightElement = (targetID: any) => {
    const overlay = document.getElementById("overlayID");
    overlay && overlay.remove();
    setIsHighlight(false);
  };

  return {
    highlightElement,
    removeHighlightElement,
    isHighlight,
  };
};
