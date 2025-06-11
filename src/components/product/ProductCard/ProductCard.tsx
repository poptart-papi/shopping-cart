import { FC, useState } from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import { Product } from '../../../services/fakeStoreAPI';
import QuantityInput from '../QuantityInput/QuantityInput';
import styles from './ProductCard.module.css';

interface ProductCardProps {
  product: Product;
  onAddToCart: (productId: number, quantity: number) => void;
  isLoading?: boolean;
}

const ProductCard: FC<ProductCardProps> = ({ product, onAddToCart, isLoading = false }) => {
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (newQuantity: number) => {
    setQuantity(newQuantity);
  };

  const handleAddToCart = () => {
    onAddToCart(product.id, quantity);
  };

  if (isLoading) {
    return (
      <div className={styles.productCard} data-testid="product-card-skeleton">
        <div className={styles.imageSkeleton}></div>
        <div className={styles.contentSkeleton}>
          <div className={styles.titleSkeleton}></div>
          <div className={styles.priceSkeleton}></div>
          <div className={styles.inputSkeleton}></div>
          <div className={styles.buttonSkeleton}></div>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      className={styles.productCard}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <img 
        src={product.image} 
        alt={product.title} 
        className={styles.productImage}
      />
      <div className={styles.productContent}>
        <h3 className={styles.productTitle}>{product.title}</h3>
        <p className={styles.productPrice}>${product.price.toFixed(2)}</p>
        <div className={styles.productActions}>
          <QuantityInput 
            quantity={quantity} 
            onChange={handleQuantityChange} 
            min={1} 
            max={99}
          />
          <motion.button 
            className={styles.addToCartButton}
            onClick={handleAddToCart}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Add to Cart
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
  }).isRequired,
  onAddToCart: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
};

export default ProductCard;
