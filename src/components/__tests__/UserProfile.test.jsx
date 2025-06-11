import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import UserProfile from '../UserProfile';

describe('UserProfile component', () => {
  const mockUser = {
    id: 1,
    name: 'Jane Smith',
    age: 25,
    email: 'jane@example.com'
  };

  const mockPermissions = ['read', 'write', 'admin'];

  it('renders user information correctly', () => {
    render(
      <UserProfile 
        user={mockUser}
        isActive={true}
        permissions={mockPermissions}
      />
    );

    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    expect(screen.getByText('25')).toBeInTheDocument();
    expect(screen.getByText('jane@example.com')).toBeInTheDocument();
    expect(screen.getByText('Active')).toBeInTheDocument();
  });

  it('displays permissions as list items', () => {
    render(
      <UserProfile 
        user={mockUser}
        isActive={true}
        permissions={mockPermissions}
      />
    );

    mockPermissions.forEach(permission => {
      expect(screen.getByText(permission)).toBeInTheDocument();
    });
  });

  it('shows inactive status when isActive is false', () => {
    render(
      <UserProfile 
        user={mockUser}
        isActive={false}
        permissions={mockPermissions}
      />
    );

    expect(screen.getByText('Inactive')).toBeInTheDocument();
  });

  it('renders update button when onUpdate callback provided', async () => {
    const mockOnUpdate = vi.fn();
    const user = userEvent.setup();

    render(
      <UserProfile 
        user={mockUser}
        isActive={true}
        permissions={mockPermissions}
        onUpdate={mockOnUpdate}
      />
    );

    const updateButton = screen.getByRole('button', { name: 'Update Profile' });
    expect(updateButton).toBeInTheDocument();

    await user.click(updateButton);
    expect(mockOnUpdate).toHaveBeenCalledWith(mockUser.id);
  });

  it('does not render update button when onUpdate not provided', () => {
    render(
      <UserProfile 
        user={mockUser}
        isActive={true}
        permissions={mockPermissions}
      />
    );

    expect(screen.queryByRole('button', { name: 'Update Profile' })).not.toBeInTheDocument();
  });
});
