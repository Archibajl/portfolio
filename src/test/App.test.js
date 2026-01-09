import { render, screen } from '@testing-library/react';
import App from '../App';

describe('App Component', () => {
  test('renders without crashing', () => {
    render(<App />);
  });

  test('renders Landing page on root path', () => {
    render(<App />);
    expect(screen.getByText(/welcome to my portfolio page/i)).toBeInTheDocument();
  });

  test('renders Enter Here button on Landing page', () => {
    render(<App />);
    expect(screen.getByText(/enter here/i)).toBeInTheDocument();
  });
});
