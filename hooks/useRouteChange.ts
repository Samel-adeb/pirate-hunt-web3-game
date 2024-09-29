// hooks/useRouteChange.ts
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const useRouteChange = (path: string, onRouteChange: () => void) => {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      if (url === path) {
        onRouteChange();
      }
    };

    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [path, onRouteChange, router.events]);
};

export default useRouteChange;
