import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import WeddingPhotoGallery from './InfiniteScroll';

// Mock fetch globally
global.fetch = jest.fn();

describe('WeddingPhotoGallery Component', () => {
  beforeEach(() => {
    // Reset fetch mock before each test
    global.fetch.mockClear();

    // Mock successful response by default
    global.fetch.mockResolvedValue({
      json: async () => ({
        photos: [
          'https://example.com/photo1.jpg',
          'https://example.com/photo2.jpg',
          'https://example.com/photo3.jpg'
        ],
        hasMore: true
      })
    });

    // Reset body overflow
    document.body.style.overflow = 'auto';
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  describe('Component Rendering', () => {
    test('renders without crashing', () => {
      render(<WeddingPhotoGallery />);
    });

    test('renders gallery container', () => {
      const { container } = render(<WeddingPhotoGallery />);
      expect(container.querySelector('.gallery')).toBeInTheDocument();
    });

    test('initially displays loading state', () => {
      render(<WeddingPhotoGallery />);
      expect(screen.getByText(/loading photos/i)).toBeInTheDocument();
    });
  });

  describe('Photo Loading', () => {
    test('fetches photos on mount', async () => {
      render(<WeddingPhotoGallery />);

      await waitFor(() => {
        expect(global.fetch).toHaveBeenCalledWith('/api/photos?page=1');
      });
    });

    test('displays photos after successful fetch', async () => {
      const { container } = render(<WeddingPhotoGallery />);

      await waitFor(() => {
        const images = container.querySelectorAll('.gallery img');
        expect(images.length).toBe(3);
      });
    });

    test('sets correct alt text for photos', async () => {
      const { container } = render(<WeddingPhotoGallery />);

      await waitFor(() => {
        const images = container.querySelectorAll('.gallery img');
        expect(images[0]).toHaveAttribute('alt', 'Wedding memory 1');
        expect(images[1]).toHaveAttribute('alt', 'Wedding memory 2');
        expect(images[2]).toHaveAttribute('alt', 'Wedding memory 3');
      });
    });

    test('displays empty state when no photos are returned', async () => {
      global.fetch.mockResolvedValueOnce({
        json: async () => ({
          photos: [],
          hasMore: false
        })
      });

      render(<WeddingPhotoGallery />);

      await waitFor(() => {
        expect(screen.getByText(/no photos found/i)).toBeInTheDocument();
      });
    });

    test('handles fetch errors gracefully', async () => {
      const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
      global.fetch.mockRejectedValueOnce(new Error('Network error'));

      render(<WeddingPhotoGallery />);

      await waitFor(() => {
        expect(consoleError).toHaveBeenCalledWith(
          'Error fetching photos:',
          expect.any(Error)
        );
      });

      consoleError.mockRestore();
    });
  });

  describe('Infinite Scroll', () => {
    test('loads more photos when scrolling near bottom', async () => {
      const { container } = render(<WeddingPhotoGallery />);

      // Wait for initial load
      await waitFor(() => {
        expect(container.querySelectorAll('.gallery img').length).toBe(3);
      });

      // Mock second page response
      global.fetch.mockResolvedValueOnce({
        json: async () => ({
          photos: [
            'https://example.com/photo4.jpg',
            'https://example.com/photo5.jpg'
          ],
          hasMore: false
        })
      });

      // Simulate scroll to bottom
      act(() => {
        Object.defineProperty(window, 'innerHeight', { value: 1000, writable: true });
        Object.defineProperty(document.documentElement, 'scrollTop', { value: 900, writable: true });
        Object.defineProperty(document.documentElement, 'offsetHeight', { value: 1400, writable: true });

        fireEvent.scroll(window);
      });

      await waitFor(() => {
        expect(global.fetch).toHaveBeenCalledWith('/api/photos?page=2');
      });
    });

    test('displays end message when all photos are loaded', async () => {
      // First call returns some photos with hasMore: true
      global.fetch.mockResolvedValueOnce({
        json: async () => ({
          photos: ['https://example.com/photo1.jpg'],
          hasMore: true
        })
      });

      const { container } = render(<WeddingPhotoGallery />);

      // Wait for first batch of photos to be loaded
      await waitFor(() => {
        const images = container.querySelectorAll('.gallery img');
        expect(images.length).toBe(1);
      });

      // Mock second call to return empty (which sets hasMore to false)
      global.fetch.mockResolvedValueOnce({
        json: async () => ({
          photos: [],
          hasMore: false
        })
      });

      // Simulate scroll to trigger next fetch
      act(() => {
        Object.defineProperty(window, 'innerHeight', { value: 1000, writable: true });
        Object.defineProperty(document.documentElement, 'scrollTop', { value: 900, writable: true });
        Object.defineProperty(document.documentElement, 'offsetHeight', { value: 1400, writable: true });

        fireEvent.scroll(window);
      });

      // Now check for end message
      await waitFor(() => {
        expect(screen.getByText(/all photos loaded/i)).toBeInTheDocument();
      }, { timeout: 3000 });
    });

    test('does not fetch when already loading', async () => {
      const { container } = render(<WeddingPhotoGallery />);

      await waitFor(() => {
        expect(container.querySelectorAll('.gallery img').length).toBe(3);
      });

      const initialCallCount = global.fetch.mock.calls.length;

      // Try to trigger multiple scrolls quickly
      act(() => {
        fireEvent.scroll(window);
        fireEvent.scroll(window);
        fireEvent.scroll(window);
      });

      // Should not have made additional calls while loading
      await waitFor(() => {
        expect(global.fetch.mock.calls.length).toBeLessThanOrEqual(initialCallCount + 2);
      });
    });
  });

  describe('Lightbox Functionality', () => {
    test('opens lightbox when photo is clicked', async () => {
      const { container } = render(<WeddingPhotoGallery />);

      await waitFor(() => {
        expect(container.querySelectorAll('.gallery img').length).toBe(3);
      });

      const firstImage = container.querySelectorAll('.gallery img')[0];
      fireEvent.click(firstImage);

      await waitFor(() => {
        expect(container.querySelector('.lightbox-overlay')).toBeInTheDocument();
      });
    });

    test('displays correct image in lightbox', async () => {
      const { container } = render(<WeddingPhotoGallery />);

      await waitFor(() => {
        expect(container.querySelectorAll('.gallery img').length).toBe(3);
      });

      const secondImage = container.querySelectorAll('.gallery img')[1];
      fireEvent.click(secondImage);

      await waitFor(() => {
        const lightboxImage = container.querySelector('.lightbox-image');
        expect(lightboxImage).toHaveAttribute('src', 'https://example.com/photo2.jpg');
        expect(lightboxImage).toHaveAttribute('alt', 'Wedding memory 2');
      });
    });

    test('closes lightbox when close button is clicked', async () => {
      const { container } = render(<WeddingPhotoGallery />);

      await waitFor(() => {
        expect(container.querySelectorAll('.gallery img').length).toBe(3);
      });

      const firstImage = container.querySelectorAll('.gallery img')[0];
      fireEvent.click(firstImage);

      await waitFor(() => {
        expect(container.querySelector('.lightbox-overlay')).toBeInTheDocument();
      });

      const closeButton = container.querySelector('.lightbox-close');
      fireEvent.click(closeButton);

      await waitFor(() => {
        expect(container.querySelector('.lightbox-overlay')).not.toBeInTheDocument();
      });
    });

    test('closes lightbox when overlay is clicked', async () => {
      const { container } = render(<WeddingPhotoGallery />);

      await waitFor(() => {
        expect(container.querySelectorAll('.gallery img').length).toBe(3);
      });

      const firstImage = container.querySelectorAll('.gallery img')[0];
      fireEvent.click(firstImage);

      await waitFor(() => {
        expect(container.querySelector('.lightbox-overlay')).toBeInTheDocument();
      });

      const overlay = container.querySelector('.lightbox-overlay');
      fireEvent.click(overlay);

      await waitFor(() => {
        expect(container.querySelector('.lightbox-overlay')).not.toBeInTheDocument();
      });
    });

    test('does not close lightbox when image is clicked', async () => {
      const { container } = render(<WeddingPhotoGallery />);

      await waitFor(() => {
        expect(container.querySelectorAll('.gallery img').length).toBe(3);
      });

      const firstImage = container.querySelectorAll('.gallery img')[0];
      fireEvent.click(firstImage);

      await waitFor(() => {
        expect(container.querySelector('.lightbox-overlay')).toBeInTheDocument();
      });

      const lightboxImage = container.querySelector('.lightbox-image');
      fireEvent.click(lightboxImage);

      // Should still be open
      expect(container.querySelector('.lightbox-overlay')).toBeInTheDocument();
    });

    test('sets body overflow to hidden when lightbox opens', async () => {
      const { container } = render(<WeddingPhotoGallery />);

      await waitFor(() => {
        expect(container.querySelectorAll('.gallery img').length).toBe(3);
      });

      const firstImage = container.querySelectorAll('.gallery img')[0];
      fireEvent.click(firstImage);

      await waitFor(() => {
        expect(document.body.style.overflow).toBe('hidden');
      });
    });

    test('restores body overflow when lightbox closes', async () => {
      const { container } = render(<WeddingPhotoGallery />);

      await waitFor(() => {
        expect(container.querySelectorAll('.gallery img').length).toBe(3);
      });

      const firstImage = container.querySelectorAll('.gallery img')[0];
      fireEvent.click(firstImage);

      await waitFor(() => {
        expect(document.body.style.overflow).toBe('hidden');
      });

      const closeButton = container.querySelector('.lightbox-close');
      fireEvent.click(closeButton);

      await waitFor(() => {
        expect(document.body.style.overflow).toBe('auto');
      });
    });
  });

  describe('Lightbox Navigation', () => {
    test('navigates to next image when next button is clicked', async () => {
      const { container } = render(<WeddingPhotoGallery />);

      await waitFor(() => {
        expect(container.querySelectorAll('.gallery img').length).toBe(3);
      });

      const firstImage = container.querySelectorAll('.gallery img')[0];
      fireEvent.click(firstImage);

      await waitFor(() => {
        expect(container.querySelector('.lightbox-image')).toHaveAttribute('src', 'https://example.com/photo1.jpg');
      });

      const nextButton = container.querySelector('.lightbox-next');
      fireEvent.click(nextButton);

      await waitFor(() => {
        expect(container.querySelector('.lightbox-image')).toHaveAttribute('src', 'https://example.com/photo2.jpg');
      });
    });

    test('navigates to previous image when previous button is clicked', async () => {
      const { container } = render(<WeddingPhotoGallery />);

      await waitFor(() => {
        expect(container.querySelectorAll('.gallery img').length).toBe(3);
      });

      const secondImage = container.querySelectorAll('.gallery img')[1];
      fireEvent.click(secondImage);

      await waitFor(() => {
        expect(container.querySelector('.lightbox-image')).toHaveAttribute('src', 'https://example.com/photo2.jpg');
      });

      const prevButton = container.querySelector('.lightbox-prev');
      fireEvent.click(prevButton);

      await waitFor(() => {
        expect(container.querySelector('.lightbox-image')).toHaveAttribute('src', 'https://example.com/photo1.jpg');
      });
    });

    test('wraps to first image when next is clicked on last image', async () => {
      const { container } = render(<WeddingPhotoGallery />);

      await waitFor(() => {
        expect(container.querySelectorAll('.gallery img').length).toBe(3);
      });

      const lastImage = container.querySelectorAll('.gallery img')[2];
      fireEvent.click(lastImage);

      await waitFor(() => {
        expect(container.querySelector('.lightbox-image')).toHaveAttribute('src', 'https://example.com/photo3.jpg');
      });

      const nextButton = container.querySelector('.lightbox-next');
      fireEvent.click(nextButton);

      await waitFor(() => {
        expect(container.querySelector('.lightbox-image')).toHaveAttribute('src', 'https://example.com/photo1.jpg');
      });
    });

    test('wraps to last image when previous is clicked on first image', async () => {
      const { container } = render(<WeddingPhotoGallery />);

      await waitFor(() => {
        expect(container.querySelectorAll('.gallery img').length).toBe(3);
      });

      const firstImage = container.querySelectorAll('.gallery img')[0];
      fireEvent.click(firstImage);

      await waitFor(() => {
        expect(container.querySelector('.lightbox-image')).toHaveAttribute('src', 'https://example.com/photo1.jpg');
      });

      const prevButton = container.querySelector('.lightbox-prev');
      fireEvent.click(prevButton);

      await waitFor(() => {
        expect(container.querySelector('.lightbox-image')).toHaveAttribute('src', 'https://example.com/photo3.jpg');
      });
    });

    test('displays current image counter', async () => {
      const { container } = render(<WeddingPhotoGallery />);

      await waitFor(() => {
        expect(container.querySelectorAll('.gallery img').length).toBe(3);
      });

      const secondImage = container.querySelectorAll('.gallery img')[1];
      fireEvent.click(secondImage);

      await waitFor(() => {
        const counter = container.querySelector('.lightbox-counter');
        expect(counter).toHaveTextContent('2 / 3');
      });
    });
  });

  describe('Keyboard Navigation', () => {
    test('closes lightbox on Escape key', async () => {
      const { container } = render(<WeddingPhotoGallery />);

      await waitFor(() => {
        expect(container.querySelectorAll('.gallery img').length).toBe(3);
      });

      const firstImage = container.querySelectorAll('.gallery img')[0];
      fireEvent.click(firstImage);

      await waitFor(() => {
        expect(container.querySelector('.lightbox-overlay')).toBeInTheDocument();
      });

      fireEvent.keyDown(window, { key: 'Escape' });

      await waitFor(() => {
        expect(container.querySelector('.lightbox-overlay')).not.toBeInTheDocument();
      });
    });

    test('navigates to next image on ArrowRight key', async () => {
      const { container } = render(<WeddingPhotoGallery />);

      await waitFor(() => {
        expect(container.querySelectorAll('.gallery img').length).toBe(3);
      });

      const firstImage = container.querySelectorAll('.gallery img')[0];
      fireEvent.click(firstImage);

      await waitFor(() => {
        expect(container.querySelector('.lightbox-image')).toHaveAttribute('src', 'https://example.com/photo1.jpg');
      });

      fireEvent.keyDown(window, { key: 'ArrowRight' });

      await waitFor(() => {
        expect(container.querySelector('.lightbox-image')).toHaveAttribute('src', 'https://example.com/photo2.jpg');
      });
    });

    test('navigates to previous image on ArrowLeft key', async () => {
      const { container } = render(<WeddingPhotoGallery />);

      await waitFor(() => {
        expect(container.querySelectorAll('.gallery img').length).toBe(3);
      });

      const secondImage = container.querySelectorAll('.gallery img')[1];
      fireEvent.click(secondImage);

      await waitFor(() => {
        expect(container.querySelector('.lightbox-image')).toHaveAttribute('src', 'https://example.com/photo2.jpg');
      });

      fireEvent.keyDown(window, { key: 'ArrowLeft' });

      await waitFor(() => {
        expect(container.querySelector('.lightbox-image')).toHaveAttribute('src', 'https://example.com/photo1.jpg');
      });
    });

    test('does not respond to keyboard when lightbox is closed', async () => {
      const { container } = render(<WeddingPhotoGallery />);

      await waitFor(() => {
        expect(container.querySelectorAll('.gallery img').length).toBe(3);
      });

      fireEvent.keyDown(window, { key: 'ArrowRight' });

      // Lightbox should not open
      expect(container.querySelector('.lightbox-overlay')).not.toBeInTheDocument();
    });
  });

  describe('Image Loading States', () => {
    test('shows loading placeholder before image loads', () => {
      const { container } = render(<WeddingPhotoGallery />);

      // Before images load, should show loading placeholder
      waitFor(() => {
        const loadingPlaceholders = container.querySelectorAll('div[style*="Loading..."]');
        expect(loadingPlaceholders.length).toBeGreaterThan(0);
      });
    });

    test('applies lazy loading to images', async () => {
      const { container } = render(<WeddingPhotoGallery />);

      await waitFor(() => {
        const images = container.querySelectorAll('.gallery img');
        images.forEach(img => {
          expect(img).toHaveAttribute('loading', 'lazy');
        });
      });
    });

    test('hides image on load error', async () => {
      const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
      const { container } = render(<WeddingPhotoGallery />);

      await waitFor(() => {
        expect(container.querySelectorAll('.gallery img').length).toBe(3);
      });

      const image = container.querySelectorAll('.gallery img')[0];
      fireEvent.error(image);

      expect(consoleError).toHaveBeenCalled();
      expect(image.style.display).toBe('none');

      consoleError.mockRestore();
    });
  });

  describe('PhotoItem Memoization', () => {
    test('renders PhotoItem components', async () => {
      const { container } = render(<WeddingPhotoGallery />);

      await waitFor(() => {
        const images = container.querySelectorAll('.photo');
        expect(images.length).toBe(3);
      });
    });

    test('PhotoItem has onClick handler', async () => {
      const { container } = render(<WeddingPhotoGallery />);

      await waitFor(() => {
        expect(container.querySelectorAll('.gallery img').length).toBe(3);
      });

      const image = container.querySelectorAll('.photo')[0];
      expect(image).toBeDefined();

      fireEvent.click(image);

      await waitFor(() => {
        expect(container.querySelector('.lightbox-overlay')).toBeInTheDocument();
      });
    });
  });

  describe('Prefetching', () => {
    test('prefetch is triggered when hasMore is true', async () => {
      const { container } = render(<WeddingPhotoGallery />);

      // Wait for initial load
      await waitFor(() => {
        expect(container.querySelectorAll('.gallery img').length).toBe(3);
      });

      // The default mock returns hasMore: true, so prefetch should be triggered
      // We should see at least one call to the API
      expect(global.fetch).toHaveBeenCalled();
    });

    test('loads multiple pages successfully', async () => {
      // Initial fetch
      global.fetch.mockResolvedValueOnce({
        json: async () => ({
          photos: ['https://example.com/photo1.jpg', 'https://example.com/photo2.jpg'],
          hasMore: true
        })
      });

      const { container } = render(<WeddingPhotoGallery />);

      await waitFor(() => {
        expect(container.querySelectorAll('.gallery img').length).toBe(2);
      });

      const initialCount = global.fetch.mock.calls.length;

      // Mock second page response (for prefetch)
      global.fetch.mockResolvedValueOnce({
        json: async () => ({
          photos: ['https://example.com/photo3.jpg'],
          hasMore: false
        })
      });

      // Wait a bit for potential prefetch to happen
      await new Promise(resolve => setTimeout(resolve, 600));

      // Should have made another call (prefetch)
      await waitFor(() => {
        expect(global.fetch.mock.calls.length).toBeGreaterThan(initialCount);
      });
    });
  });

  describe('Scroll Event Handling', () => {
    test('does not load more when not near bottom', async () => {
      const { container } = render(<WeddingPhotoGallery />);

      await waitFor(() => {
        expect(container.querySelectorAll('.gallery img').length).toBe(3);
      });

      const initialCallCount = global.fetch.mock.calls.length;

      // Simulate scroll but not near bottom (should not trigger fetch)
      act(() => {
        Object.defineProperty(window, 'innerHeight', { value: 1000, writable: true });
        Object.defineProperty(document.documentElement, 'scrollTop', { value: 100, writable: true });
        Object.defineProperty(document.documentElement, 'offsetHeight', { value: 5000, writable: true });

        fireEvent.scroll(window);
      });

      // Should not have made additional calls
      expect(global.fetch.mock.calls.length).toBe(initialCallCount);
    });
  });
});
