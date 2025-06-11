import { FC } from 'react';
import PropTypes from 'prop-types';
import { Product } from '../../../services/fakeStoreAPI';
import ProductCard from '../ProductCard/ProductCard';
import styles from './ProductGrid.module.css';

interface ProductGridProps {
  products: Product[];
  onAddToCart: (productId: number, quantity: number) => void;
  isLoading?: boolean;
}

const ProductGrid: FC<ProductGridProps> = ({ products, onAddToCart, isLoading = false }) => {
  // Generate skeleton cards when loading
  const renderSkeletons = () => (
    Array(8).fill(0).map((_, index) => (
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
    <div className={styles.productGridContainer}>
      <h2 className={styles.productGridTitle}>All Products</h2>
      <div className={styles.productGrid}>
        {isLoading || products.length === 0 ? renderSkeletons() : (
          products.map(product => (
            <div key={product.id} className={styles.productItem}>
              <ProductCard 
                product={product} 
                onAddToCart={onAddToCart} 
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

ProductGrid.propTypes = {
  products: PropTypes.array.isRequired,
  onAddToCart: PropTypes.func.isRequired,
  isLoading: PropTypes.bool
};

export default ProductGrid;
