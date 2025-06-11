import { FC, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import CartItem from '../../components/cart/CartItem/CartItem';
import CartSummary from '../../components/cart/CartSummary/CartSummary';
import styles from './Cart.module.css';

const Cart: FC = () => {
  const { state, dispatch } = useCart();
  const [checkoutComplete, setCheckoutComplete] = useState(false);

  const handleUpdateQuantity = (productId: number, quantity: number) => {
    dispatch({
      type: 'UPDATE_QUANTITY',
      payload: { productId, quantity }
    });
  };

  const handleRemoveItem = (productId: number) => {
    dispatch({
      type: 'REMOVE_ITEM',
      payload: { productId }
    });
  };

  const handleCheckout = () => {
    // Mock checkout process
    setCheckoutComplete(true);
    
    // Clear the cart after a successful checkout
    setTimeout(() => {
      dispatch({ type: 'CLEAR_CART' });
      setCheckoutComplete(false);
    }, 3000);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1 
      } 
    }
  };

  return (
    <div className={styles.cartPage}>
      <div className={styles.cartHeader}>
        <h1 className={styles.cartTitle}>Your Shopping Cart</h1>
      </div>

      {checkoutComplete ? (
        <motion.div 
          className={styles.checkoutSuccess}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2>Thank you for your order!</h2>
          <p>Your order has been placed successfully. We'll process it right away.</p>
        </motion.div>
      ) : state.items.length > 0 ? (
        <div className={styles.cartContent}>
          <div className={styles.cartItems}>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <AnimatePresence>
                {state.items.map(item => (
                  <CartItem
                    key={item.productId}
                    item={item}
                    onUpdateQuantity={handleUpdateQuantity}
                    onRemoveItem={handleRemoveItem}
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
          <div className={styles.cartSummary}>
            <CartSummary
              totalItems={state.totalItems}
              totalPrice={state.totalPrice}
              onCheckout={handleCheckout}
            />
          </div>
        </div>
      ) : (
        <motion.div 
          className={styles.emptyCart}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2>Your cart is empty</h2>
          <p>Looks like you haven't added any products to your cart yet.</p>
          <motion.a 
            href="/shop" 
            className={styles.continueShoppingButton}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Continue Shopping
          </motion.a>
        </motion.div>
      )}
    </div>
  );
};

export default Cart;
