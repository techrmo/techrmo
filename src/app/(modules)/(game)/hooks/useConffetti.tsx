import confetti from 'canvas-confetti';
import { useEffect } from 'react';

export const useConfetti = (trigger: string | null) => {
  useEffect(() => {
    if (!trigger) {
      return;
    }

    const triggerConfetti = () => {
      confetti({
        particleCount: 250,
        spread: 450,
        origin: { x: 1, y: 0 },
        colors: ['#FFE927', '#2B2B2B', '#fffb00', '#61590F', ' #E0CD22'],
      });
      confetti({
        particleCount: 250,
        spread: 450,
        origin: { x: 0, y: 0 },
        colors: ['#FFE927', '#2B2B2B', '#fffb00', '#61590F', ' #E0CD22'],
      });
    };

    triggerConfetti();
  }, [trigger]);
};
