import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ButtonComponent from '../ButtonComponent';

describe('ButtonComponent', () => {
  it('renders with required props', () => {
    const mockOnClick = vi.fn();
    render(<ButtonComponent onClick={mockOnClick} label="Test Button" />);
    
    expect(screen.getByRole('button', { name: 'Test Button' })).toBeInTheDocument();
  });

  it('applies default variant class', () => {
    const mockOnClick = vi.fn();
    render(<ButtonComponent onClick={mockOnClick} label="Test Button" />);
    
    const button = screen.getByRole('button');
    expect(button).toHaveClass('btn', 'btn-primary');
  });

  it('applies custom variant class', () => {
    const mockOnClick = vi.fn();
    render(
      <ButtonComponent 
        onClick={mockOnClick} 
        label="Test Button" 
        variant="danger" 
      />
    );
    
    const button = screen.getByRole('button');
    expect(button).toHaveClass('btn', 'btn-danger');
  });

  it('handles click events', async () => {
    const mockOnClick = vi.fn();
    const user = userEvent.setup();
    
    render(<ButtonComponent onClick={mockOnClick} label="Test Button" />);
    
    const button = screen.getByRole('button');
    await user.click(button);
    
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it('can be disabled', () => {
    const mockOnClick = vi.fn();
    render(
      <ButtonComponent 
        onClick={mockOnClick} 
        label="Test Button" 
        disabled={true}
      />
    );
    
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });
});
