import { useEffect } from 'react';

export const useDebounceEffect = (effect, delay) => {

  useEffect(() => {
    const handler = setTimeout(() => {
      effect();
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [effect, delay]);
};
