//@ts-nocheck
// useElementObserver.ts
import { useEffect, useState } from "react";

export const useElementObserver = (
  elementRef: React.RefObject<HTMLElement>
) => {
  const [bounds, setBounds] = useState<DOMRectReadOnly>();

  useEffect(() => {
    if (!elementRef.current) return;

    const updateBounds = () => {
      setBounds(elementRef.current.getBoundingClientRect());
    };

    const resizeObserver = new ResizeObserver(() => {
      updateBounds();
    });

    const mutationObserver = new MutationObserver(() => {
      updateBounds();
    });

    updateBounds(); // Initial bounds update

    // Start observing for size changes
    if (elementRef.current) {
      resizeObserver.observe(elementRef.current);
      mutationObserver.observe(elementRef.current, {
        attributes: true,
        childList: true,
        subtree: true, // Observe any child element changes
      });
    }

    return () => {
      resizeObserver.disconnect();
      mutationObserver.disconnect();
    };
  }, [elementRef]);

  return bounds;
};
