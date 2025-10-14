import { useEffect, useRef } from 'react';
import anime from 'animejs';

interface UseAnimeOptions {
  targets: string | HTMLElement | HTMLElement[];
  duration?: number;
  easing?: string;
  delay?: number;
  loop?: boolean | number;
  direction?: 'normal' | 'reverse' | 'alternate';
  autoplay?: boolean;
  onComplete?: () => void;
  onStart?: () => void;
}

export const useAnime = (options: UseAnimeOptions) => {
  const animationRef = useRef<anime.AnimeInstance | null>(null);

  useEffect(() => {
    if (options.autoplay !== false) {
      animationRef.current = anime(options);
    }

    return () => {
      if (animationRef.current) {
        animationRef.current.pause();
      }
    };
  }, []);

  const play = () => {
    if (animationRef.current) {
      animationRef.current.play();
    }
  };

  const pause = () => {
    if (animationRef.current) {
      animationRef.current.pause();
    }
  };

  const restart = () => {
    if (animationRef.current) {
      animationRef.current.restart();
    }
  };

  return { play, pause, restart, animation: animationRef.current };
};

// Hook for scroll-triggered animations
export const useScrollAnimation = (
  targetSelector: string,
  animationProps: any,
  threshold: number = 0.2
) => {
  const elementRef = useRef<HTMLElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            anime({
              targets: targetSelector,
              ...animationProps
            });
            hasAnimated.current = true;
          }
        });
      },
      { threshold }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return elementRef;
};

// Hook for hover animations
export const useHoverAnimation = (
  hoverProps: any,
  leaveProps: any
) => {
  const handleMouseEnter = (e: React.MouseEvent) => {
    anime({
      targets: e.currentTarget,
      ...hoverProps
    });
  };

  const handleMouseLeave = (e: React.MouseEvent) => {
    anime({
      targets: e.currentTarget,
      ...leaveProps
    });
  };

  return { handleMouseEnter, handleMouseLeave };
};

// Hook for stagger animations
export const useStaggerAnimation = (
  targetSelector: string,
  animationProps: any,
  staggerDelay: number = 100
) => {
  useEffect(() => {
    anime({
      targets: targetSelector,
      ...animationProps,
      delay: anime.stagger(staggerDelay)
    });
  }, []);

  return null;
};

// Hook for loading animations
export const useLoadingAnimation = (isLoading: boolean) => {
  const loaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isLoading && loaderRef.current) {
      // Rotating loader
      anime({
        targets: loaderRef.current.querySelector('.loader-rotate'),
        rotate: [0, 360],
        duration: 1000,
        easing: 'linear',
        loop: true
      });

      // Pulsing effect
      anime({
        targets: loaderRef.current.querySelector('.loader-pulse'),
        scale: [1, 1.2, 1],
        duration: 1500,
        easing: 'easeInOutSine',
        loop: true
      });
    }
  }, [isLoading]);

  return loaderRef;
};

export default useAnime;
