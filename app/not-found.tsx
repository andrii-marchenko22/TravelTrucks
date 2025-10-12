'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import lottie from 'lottie-web';
import css from './not-found.module.css';

const NotFoundPage = () => {
  const animationContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!animationContainer.current) return;

    const animation = lottie.loadAnimation({
      container: animationContainer.current,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: 'https://lottie.host/d987597c-7676-4424-8817-7fca6dc1a33e/BVrFXsaeui.json',
    });

    return () => animation.destroy();
  }, []);

  return (
    <div className={css['error-container']}>
      <div ref={animationContainer} className={css['lottie-animation']} />
      <div className={css['error-content']}>
        <h1>404</h1>
        <p>Oops! Page not found.</p>
        <Link href="/" className={css['btn-primary']}>
          Go to home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
