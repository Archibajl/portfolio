import { render, screen } from '@testing-library/react';
import Landing from './Landing';

describe('Landing Component', () => {
  test('renders without crashing', () => {
    render(<Landing />);
  });

  test('displays welcome message', () => {
    render(<Landing />);
    expect(screen.getByText(/welcome to my portfolio page/i)).toBeInTheDocument();
  });

  test('renders Enter Here button', () => {
    render(<Landing />);
    const button = screen.getByRole('button', { name: /enter here/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('href', '../pages/HomePage');
  });

  test('has correct button styling', () => {
    render(<Landing />);
    const button = screen.getByRole('button', { name: /enter here/i });
    expect(button).toHaveClass('btn');
  });
});
