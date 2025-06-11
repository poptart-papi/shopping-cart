import { FC } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './Navigation.module.css';

interface NavigationProps {
  cartItemCount: number;
  currentPage: string;
}

const Navigation: FC<NavigationProps> = ({ cartItemCount, currentPage }) => {
  
  return (
    <nav className={styles.navigation}>
      <div className={styles.navLinks}>
        <Link to="/" className={currentPage === 'home' ? styles.active : ''}>
          Home
        </Link>
        <Link to="/shop" className={currentPage === 'shop' ? styles.active : ''}>
          Shop
        </Link>
      </div>
      <div className={styles.cartContainer}>
        <Link to="/cart" className={styles.cartLink}>
          Cart
          {cartItemCount > 0 && (
            <span className={styles.cartCount} data-testid="cart-count">
              {cartItemCount}
            </span>
          )}
        </Link>
      </div>
    </nav>
  );
};

Navigation.propTypes = {
  cartItemCount: PropTypes.number.isRequired,
  currentPage: PropTypes.string.isRequired,
};

export default Navigation;
