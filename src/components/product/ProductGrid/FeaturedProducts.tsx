import { FC } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';
import { Product } from '../../../services/fakeStoreAPI';
import ProductCard from '../ProductCard/ProductCard';
import useFeaturedRotation from '../../../hooks/useFeaturedRotation';
import styles from './FeaturedProducts.module.css';

interface FeaturedProductsProps {
  products: Product[];
  onAddToCart: (productId: number, quantity: number) => void;
  isLoading?: boolean;
}

const FeaturedProducts: FC<FeaturedProductsProps> = ({ 
  products, 
  onAddToCart, 
  isLoading = false 
}) => {
  const { 
    featuredProducts, 
    pauseRotation, 
    resumeRotation, 
    isTransitioning 
  } = useFeaturedRotation({
    products,
    rotationInterval: 6000, // 6 seconds
    featuredCount: 4
  });

  const containerVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { staggerChildren: 0.1 } },
    exit: { opacity: 0 }
  };

  const itemVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  // Generate skeleton cards when loading
  const renderSkeletons = () => (
    Array(4).fill(0).map((_, index) => (
      <div key={`skeleton-${index}`} className={styles.productItem}>
        <ProductCard 
          product={{ 
            id: 0, 
            title: '', 
            price: 0, 
            description: '', 
            image: '', 
            category: '' 
          }} 
          onAddToCart={() => {}} 
          isLoading={true} 
        />
      </div>
    ))
  );

  return (
    <div 
      className={styles.featuredContainer}
      onMouseEnter={pauseRotation}
      onMouseLeave={resumeRotation}
    >
      <h2 className={styles.featuredTitle}>Featured Products</h2>
      <AnimatePresence mode="wait">
        <motion.div 
          key={isTransitioning ? 'transitioning' : 'stable'}
          variants={containerVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className={styles.productGrid}
        >
          {isLoading || products.length === 0 ? renderSkeletons() : (
            featuredProducts.map(product => (
              <motion.div 
                key={product.id} 
                className={styles.productItem}
                variants={itemVariants}
                layout
              >
                <ProductCard 
                  product={product} 
                  onAddToCart={onAddToCart} 
                />
              </motion.div>
            ))
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

FeaturedProducts.propTypes = {
  products: PropTypes.array.isRequired,
  onAddToCart: PropTypes.func.isRequired,
  isLoading: PropTypes.bool
};

export default FeaturedProducts;
