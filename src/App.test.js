import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

describe('App Component', () => {
  test('renders without crashing', () => {
    render(<App />);
  });

  test('renders Landing page on root path', () => {
    window.history.pushState({}, 'Home page', '/');
    render(<App />);
    expect(screen.getByText(/welcome/i)).toBeInTheDocument();
  });

  test('renders Landing page on /components/Landing path', () => {
    window.history.pushState({}, 'Landing page', '/components/Landing');
    render(<App />);
    expect(screen.getByText(/welcome/i)).toBeInTheDocument();
  });
});

describe('Footer Component', () => {
  test('renders About link', () => {
    render(
      <BrowserRouter>
        <footer className="footer">
          <nav>
            <ul className="links">
              <a href="/pages/About" className="about">
                About this page
              </a>
            </ul>
          </nav>
        </footer>
      </BrowserRouter>
    );
    expect(screen.getByText(/about this page/i)).toBeInTheDocument();
  });
});
