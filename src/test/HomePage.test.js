import { render, screen } from '@testing-library/react';
import HomePage from '../pages/HomePage';

describe('HomePage Component', () => {
  test('renders without crashing', () => {
    render(<HomePage />);
  });

  test('displays main heading', () => {
    render(<HomePage />);
    expect(screen.getByText(/portfolio/i)).toBeInTheDocument();
  });

  test('displays name and tagline', () => {
    render(<HomePage />);
    expect(screen.getByText(/justin archibald/i)).toBeInTheDocument();
    expect(screen.getByText(/software engineer • ml\/data/i)).toBeInTheDocument();
  });

  test('displays About Me section', () => {
    render(<HomePage />);
    expect(screen.getByText(/about me/i)).toBeInTheDocument();
  });

  test('displays bottom image', () => {
    render(<HomePage />);
    const image = screen.getByAltText(/waterfall/i);
    expect(image).toBeInTheDocument();
    expect(image).toHaveClass('bottom-image');
  });

  test('mentions key technologies', () => {
    render(<HomePage />);
    expect(screen.getByText(/java, python, c#, and c\+\+/i)).toBeInTheDocument();
  });

  test('displays career interests', () => {
    render(<HomePage />);
    expect(screen.getByText(/software engineering/i)).toBeInTheDocument();
    expect(screen.getByText(/machine learning \/ data/i)).toBeInTheDocument();
  });
});
