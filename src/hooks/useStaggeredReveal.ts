import { useRef } from 'react';
import { useInView } from 'motion/react';

export const EXPO_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function useStaggeredReveal(amount: number = 0.15, once: boolean = true) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { amount, once });

  const getStaggerVariants = (delayIndex: number = 0, baseDelay: number = 0.08, yOffset: number = 24) => ({
    initial: { opacity: 0, y: yOffset },
    animate: isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: yOffset },
    transition: {
      duration: 0.8,
      delay: baseDelay * delayIndex,
      ease: EXPO_OUT,
    },
  });

  return {
    ref,
    isInView,
    getStaggerVariants,
    transition: { duration: 0.8, ease: EXPO_OUT },
  };
}
