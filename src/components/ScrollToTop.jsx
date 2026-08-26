import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // If there is no hash anchor, scroll directly to the very top of the page
    if (!hash) {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'instant',
      });
    }
  }, [pathname, hash]);

  return null;
};

export default ScrollToTop;
