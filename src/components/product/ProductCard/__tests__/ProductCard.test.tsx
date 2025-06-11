import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProductCard from '../ProductCard';
import { Product } from '../../../../services/fakeStoreAPI';

const mockProduct: Product = {
  id: 1,
  title: 'Test Product',
  price: 99.99,
  description: 'This is a test product description',
  category: 'test',
  image: 'https://test.com/image.jpg',
};

describe('ProductCard Component', () => {
  const mockOnAddToCart = vi.fn();

  beforeEach(() => {
    mockOnAddToCart.mockClear();
  });

  it('renders product information correctly', () => {
    render(
      <ProductCard 
        product={mockProduct} 
        onAddToCart={mockOnAddToCart} 
      />
    );
    
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('$99.99')).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('src', 'https://test.com/image.jpg');
    expect(screen.getByRole('img')).toHaveAttribute('alt', 'Test Product');
  });

  it('handles quantity input changes', async () => {
    const user = userEvent.setup();
    render(
      <ProductCard 
        product={mockProduct} 
        onAddToCart={mockOnAddToCart} 
      />
    );
    
    const input = screen.getByLabelText('Quantity') as HTMLInputElement;
    await user.clear(input);
    await user.type(input, '5');
    
    expect(input.value).toBe('5');
  });

  it('increments quantity when + button is clicked', async () => {
    const user = userEvent.setup();
    render(
      <ProductCard 
        product={mockProduct} 
        onAddToCart={mockOnAddToCart} 
      />
    );
    
    const incrementButton = screen.getByRole('button', { name: '+' });
    const input = screen.getByLabelText('Quantity') as HTMLInputElement;
    
    expect(input.value).toBe('1');
    
    await user.click(incrementButton);
    expect(input.value).toBe('2');
    
    await user.click(incrementButton);
    expect(input.value).toBe('3');
  });

  it('decrements quantity when - button is clicked', async () => {
    const user = userEvent.setup();
    render(
      <ProductCard 
        product={mockProduct} 
        onAddToCart={mockOnAddToCart} 
      />
    );
    
    const incrementButton = screen.getByRole('button', { name: '+' });
    const decrementButton = screen.getByRole('button', { name: '-' });
    const input = screen.getByLabelText('Quantity') as HTMLInputElement;
    
    // First increment to 3
    await user.click(incrementButton);
    await user.click(incrementButton);
    expect(input.value).toBe('3');
    
    // Then decrement to 2
    await user.click(decrementButton);
    expect(input.value).toBe('2');
    
    // Decrement again to 1
    await user.click(decrementButton);
    expect(input.value).toBe('1');
  });

  it('does not decrement below 1', async () => {
    const user = userEvent.setup();
    render(
      <ProductCard 
        product={mockProduct} 
        onAddToCart={mockOnAddToCart} 
      />
    );
    
    const decrementButton = screen.getByRole('button', { name: '-' });
    const input = screen.getByLabelText('Quantity') as HTMLInputElement;
    
    expect(input.value).toBe('1');
    
    await user.click(decrementButton);
    expect(input.value).toBe('1'); // Should remain 1
  });

  it('calls onAddToCart with product id and quantity when Add to Cart is clicked', async () => {
    const user = userEvent.setup();
    render(
      <ProductCard 
        product={mockProduct} 
        onAddToCart={mockOnAddToCart} 
      />
    );
    
    const incrementButton = screen.getByRole('button', { name: '+' });
    const addToCartButton = screen.getByRole('button', { name: /add to cart/i });
    
    // Increment to 3
    await user.click(incrementButton);
    await user.click(incrementButton);
    
    await user.click(addToCartButton);
    
    expect(mockOnAddToCart).toHaveBeenCalledWith(1, 3);
  });

  it('shows loading state when isLoading is true', () => {
    render(
      <ProductCard 
        product={mockProduct} 
        onAddToCart={mockOnAddToCart} 
        isLoading={true}
      />
    );
    
    expect(screen.getByTestId('product-card-skeleton')).toBeInTheDocument();
  });
});
