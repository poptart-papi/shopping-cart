import { FC } from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import styles from './CartSummary.module.css';

interface CartSummaryProps {
  totalItems: number;
  totalPrice: number;
  onCheckout: () => void;
}

const CartSummary: FC<CartSummaryProps> = ({ totalItems, totalPrice, onCheckout }) => {
  return (
    <motion.div 
      className={styles.cartSummary}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <h2 className={styles.summaryTitle}>Order Summary</h2>
      
      <div className={styles.summaryRow}>
        <span>Subtotal ({totalItems} items)</span>
        <span>${totalPrice.toFixed(2)}</span>
      </div>
      
      <div className={styles.summaryRow}>
        <span>Shipping</span>
        <span>Free</span>
      </div>
      
      <div className={styles.summaryRow}>
        <span>Tax</span>
        <span>${(totalPrice * 0.07).toFixed(2)}</span>
      </div>
      
      <div className={`${styles.summaryRow} ${styles.total}`}>
        <span>Total</span>
        <span>${(totalPrice + (totalPrice * 0.07)).toFixed(2)}</span>
      </div>
      
      <motion.button 
        className={styles.checkoutButton}
        onClick={onCheckout}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        disabled={totalItems === 0}
      >
        Proceed to Checkout
      </motion.button>
      
      <p className={styles.secureCheckout}>
        <span className={styles.lockIcon}>🔒</span> Secure Checkout
      </p>
    </motion.div>
  );
};

CartSummary.propTypes = {
  totalItems: PropTypes.number.isRequired,
  totalPrice: PropTypes.number.isRequired,
  onCheckout: PropTypes.func.isRequired,
};

export default CartSummary;
