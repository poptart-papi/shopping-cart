import { FC, ChangeEvent } from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import styles from './QuantityInput.module.css';

interface QuantityInputProps {
  quantity: number;
  onChange: (quantity: number) => void;
  min?: number;
  max?: number;
}

const QuantityInput: FC<QuantityInputProps> = ({
  quantity,
  onChange,
  min = 1,
  max = 99
}) => {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    
    if (isNaN(value)) {
      onChange(min);
    } else if (value < min) {
      onChange(min);
    } else if (value > max) {
      onChange(max);
    } else {
      onChange(value);
    }
  };

  const handleIncrement = () => {
    if (quantity < max) {
      onChange(quantity + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity > min) {
      onChange(quantity - 1);
    }
  };

  return (
    <div className={styles.quantityInput}>
      <label htmlFor="quantity" className={styles.srOnly}>Quantity</label>
      <div className={styles.inputGroup}>
        <motion.button
          type="button"
          className={styles.quantityButton}
          onClick={handleDecrement}
          whileTap={{ scale: 0.9 }}
          aria-label="-"
        >
          -
        </motion.button>
        <input
          id="quantity"
          type="number"
          min={min}
          max={max}
          value={quantity}
          onChange={handleInputChange}
          className={styles.quantityField}
        />
        <motion.button
          type="button"
          className={styles.quantityButton}
          onClick={handleIncrement}
          whileTap={{ scale: 0.9 }}
          aria-label="+"
        >
          +
        </motion.button>
      </div>
    </div>
  );
};

QuantityInput.propTypes = {
  quantity: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  min: PropTypes.number,
  max: PropTypes.number,
};

export default QuantityInput;
