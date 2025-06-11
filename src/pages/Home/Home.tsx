import { FC } from 'react';
import { motion } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import useProducts from '../../hooks/useProducts';
import FeaturedProducts from '../../components/product/ProductGrid/FeaturedProducts';
import styles from './Home.module.css';

const Home: FC = () => {
  const { products, loading, error } = useProducts();
  const { dispatch } = useCart();

  const handleAddToCart = (productId: number, quantity: number) => {
    const product = products.find(p => p.id === productId);
    if (product) {
      dispatch({
        type: 'ADD_ITEM',
        payload: { product, quantity }
      });
    }
  };

  return (
    <div className={styles.homePage}>
      <motion.div 
        className={styles.hero}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            Discover Amazing Products
          </h1>
          <p className={styles.heroSubtitle}>
            Shop our curated collection of high-quality items at unbeatable prices.
          </p>
          <motion.a 
            href="#featured"
            className={styles.heroButton}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Browse Featured
          </motion.a>
        </div>
      </motion.div>

      {error && (
        <div className={styles.errorMessage}>
          <p>Error loading products. Please try again later.</p>
        </div>
      )}

      <div id="featured" className={styles.featuredSection}>
        <FeaturedProducts 
          products={products} 
          onAddToCart={handleAddToCart}
          isLoading={loading} 
        />
      </div>
    </div>
  );
};

export default Home;
