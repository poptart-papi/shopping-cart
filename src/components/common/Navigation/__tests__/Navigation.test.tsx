import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Navigation from '../Navigation';

describe('Navigation Component', () => {
  it('renders navigation links correctly', () => {
    render(
      <MemoryRouter>
        <Navigation cartItemCount={0} currentPage="home" />
      </MemoryRouter>
    );
    
    expect(screen.getByText(/home/i)).toBeInTheDocument();
    expect(screen.getByText(/shop/i)).toBeInTheDocument();
  });

  it('displays cart count when items are in cart', () => {
    render(
      <MemoryRouter>
        <Navigation cartItemCount={5} currentPage="shop" />
      </MemoryRouter>
    );
    
    expect(screen.getByTestId('cart-count')).toHaveTextContent('5');
  });

  it('does not display cart count when cart is empty', () => {
    render(
      <MemoryRouter>
        <Navigation cartItemCount={0} currentPage="shop" />
      </MemoryRouter>
    );
    
    const cartCount = screen.queryByTestId('cart-count');
    expect(cartCount).toBeNull();
  });

  it('highlights the current page in the navigation', () => {
    render(
      <MemoryRouter>
        <Navigation cartItemCount={0} currentPage="shop" />
      </MemoryRouter>
    );
    
    const shopLink = screen.getByText(/shop/i).closest('a');
    expect(shopLink).toHaveClass('active');
    
    const homeLink = screen.getByText(/home/i).closest('a');
    expect(homeLink).not.toHaveClass('active');
  });
});
