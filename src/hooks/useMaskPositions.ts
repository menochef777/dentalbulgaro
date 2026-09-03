import { useState, useEffect, RefObject } from 'react';

export interface MaskOffset {
  x: number;
  y: number;
  containerWidth: number;
  containerHeight: number;
}

export function useMaskPositions(
  containerRef: RefObject<HTMLElement | null>,
  cardRefs: RefObject<HTMLElement | null>[]
): MaskOffset[] {
  const [offsets, setOffsets] = useState<MaskOffset[]>([]);

  useEffect(() => {
    const updatePositions = () => {
      if (!containerRef.current) return;
      const containerRect = containerRef.current.getBoundingClientRect();

      const newOffsets = cardRefs.map((ref) => {
        if (!ref.current) {
          return {
            x: 0,
            y: 0,
            containerWidth: containerRect.width,
            containerHeight: containerRect.height,
          };
        }
        const cardRect = ref.current.getBoundingClientRect();
        return {
          x: cardRect.left - containerRect.left,
          y: cardRect.top - containerRect.top,
          containerWidth: containerRect.width,
          containerHeight: containerRect.height,
        };
      });

      setOffsets(newOffsets);
    };

    updatePositions();

    const resizeObserver = new ResizeObserver(() => {
      updatePositions();
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    cardRefs.forEach((ref) => {
      if (ref.current) {
        resizeObserver.observe(ref.current);
      }
    });

    window.addEventListener('resize', updatePositions);
    window.addEventListener('scroll', updatePositions, { passive: true });

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', updatePositions);
      window.removeEventListener('scroll', updatePositions);
    };
  }, [containerRef, cardRefs]);

  return offsets;
}
