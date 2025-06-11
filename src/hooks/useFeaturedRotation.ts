import { useState, useEffect, useCallback, useRef } from 'react';
import { Product } from '../services/fakeStoreAPI';

interface UseFeaturedRotationOptions {
  products: Product[];
  rotationInterval?: number;
  featuredCount?: number;
}

interface UseFeaturedRotationReturn {
  featuredProducts: Product[];
  isPaused: boolean;
  pauseRotation: () => void;
  resumeRotation: () => void;
  isTransitioning: boolean;
}

/**
 * Custom hook to manage featured products rotation with smooth transitions
 */
const useFeaturedRotation = ({
  products,
  rotationInterval = 6000, // 6 seconds
  featuredCount = 4
}: UseFeaturedRotationOptions): UseFeaturedRotationReturn => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Function to get random products
  const getRandomProducts = useCallback(() => {
    if (products.length <= featuredCount) {
      return [...products];
    }

    const shuffled = [...products].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, featuredCount);
  }, [products, featuredCount]);

  // Initialize featured products
  useEffect(() => {
    if (products.length > 0 && featuredProducts.length === 0) {
      setFeaturedProducts(getRandomProducts());
    }
  }, [products, featuredProducts.length, getRandomProducts]);

  // Rotation effect
  useEffect(() => {
    const rotateProducts = () => {
      if (isPaused || products.length <= featuredCount) return;

      setIsTransitioning(true);
      
      // Clear previous timeout if it exists
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      
      // Set timeout for next rotation
      timeoutRef.current = setTimeout(() => {
        setFeaturedProducts(getRandomProducts());
        setIsTransitioning(false);
        
        // Schedule next rotation
        timeoutRef.current = setTimeout(rotateProducts, rotationInterval);
      }, 800); // Transition duration
    };

    // Only start rotation if we have products and not paused
    if (products.length > 0 && !isPaused) {
      timeoutRef.current = setTimeout(rotateProducts, rotationInterval);
    }

    // Cleanup function
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [products, featuredCount, rotationInterval, isPaused, getRandomProducts]);

  const pauseRotation = useCallback(() => {
    setIsPaused(true);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }, []);

  const resumeRotation = useCallback(() => {
    setIsPaused(false);
  }, []);

  return {
    featuredProducts,
    isPaused,
    pauseRotation,
    resumeRotation,
    isTransitioning
  };
};

export default useFeaturedRotation;
