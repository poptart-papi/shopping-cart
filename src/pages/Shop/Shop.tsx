import { FC } from 'react';
import { useCart } from '../../context/CartContext';
import useProducts from '../../hooks/useProducts';
import ProductGrid from '../../components/product/ProductGrid/ProductGrid';
import styles from './Shop.module.css';

const Shop: FC = () => {
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
    <div className={styles.shopPage}>
      <div className={styles.shopHeader}>
        <h1 className={styles.shopTitle}>Shop All Products</h1>
      </div>

      {error && (
        <div className={styles.errorMessage}>
          <p>Error loading products. Please try again later.</p>
        </div>
      )}

      <div className={styles.productsContainer}>
        <ProductGrid 
          products={products} 
          onAddToCart={handleAddToCart} 
          isLoading={loading} 
        />
      </div>
    </div>
  );
};

export default Shop;
