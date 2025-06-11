import { FC } from 'react';
import { motion } from 'framer-motion';
import { CartItem as CartItemType } from '../../../context/CartContext';
import styles from './CartItem.module.css';

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (productId: number, quantity: number) => void;
  onRemoveItem: (productId: number) => void;
}

const CartItem: FC<CartItemProps> = ({ item, onUpdateQuantity, onRemoveItem }) => {
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = parseInt(e.target.value, 10);
    if (!isNaN(newQuantity) && newQuantity > 0) {
      onUpdateQuantity(item.productId, newQuantity);
    }
  };

  const handleIncrement = () => {
    onUpdateQuantity(item.productId, item.quantity + 1);
  };

  const handleDecrement = () => {
    if (item.quantity > 1) {
      onUpdateQuantity(item.productId, item.quantity - 1);
    }
  };

  const handleRemove = () => {
    onRemoveItem(item.productId);
  };

  return (
    <motion.div 
      className={styles.cartItem}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.3 }}
    >
      <div className={styles.productImage}>
        <img src={item.product.image} alt={item.product.title} />
      </div>
      <div className={styles.productInfo}>
        <h3 className={styles.productTitle}>{item.product.title}</h3>
        <p className={styles.productPrice}>${item.product.price.toFixed(2)}</p>
      </div>
      <div className={styles.quantityControls}>
        <button 
          className={styles.quantityButton} 
          onClick={handleDecrement}
          disabled={item.quantity <= 1}
          aria-label="Decrease quantity"
        >
          -
        </button>
        <input
          type="number"
          min="1"
          value={item.quantity}
          onChange={handleQuantityChange}
          className={styles.quantityInput}
          aria-label="Quantity"
        />
        <button 
          className={styles.quantityButton} 
          onClick={handleIncrement}
          aria-label="Increase quantity"
        >
          +
        </button>
      </div>
      <div className={styles.totalPrice}>
        ${(item.product.price * item.quantity).toFixed(2)}
      </div>
      <button 
        className={styles.removeButton} 
        onClick={handleRemove}
        aria-label="Remove item"
      >
        ×
      </button>
    </motion.div>
  );
};

// Remove PropTypes validation to fix TypeScript error
// PropTypes and TypeScript interfaces don't perfectly align in this case
// and we're already getting type safety from TypeScript

export default CartItem;
