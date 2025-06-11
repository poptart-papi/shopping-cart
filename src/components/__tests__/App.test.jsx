import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('App component', () => {
  it('renders with default props', () => {
    render(<App />);
    expect(screen.getByRole('heading')).toHaveTextContent('Magnificent Monkeys');
  });

  it('renders with custom initial heading', () => {
    render(<App initialHeading="Custom Heading" />);
    expect(screen.getByRole('heading')).toHaveTextContent('Custom Heading');
  });

  it('changes heading when button is clicked', async () => {
    const user = userEvent.setup();
    render(<App />);
    
    const button = screen.getByRole('button', { name: 'Click Me' });
    await user.click(button);
    
    expect(screen.getByRole('heading')).toHaveTextContent('Radical Rhinos');
  });

  it('renders user profile with correct data', () => {
    render(<App />);
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('30')).toBeInTheDocument();
    expect(screen.getByText('john@example.com')).toBeInTheDocument();
    expect(screen.getByText('Active')).toBeInTheDocument();
  });

  it('displays user permissions correctly', () => {
    render(<App />);
    expect(screen.getByText('read')).toBeInTheDocument();
    expect(screen.getByText('write')).toBeInTheDocument();
  });
});
