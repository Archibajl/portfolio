import { render, screen } from '@testing-library/react';
import Projects from './Projects';

describe('Projects Component', () => {
  test('renders without crashing', () => {
    render(<Projects />);
  });

  test('displays main heading and description', () => {
    render(<Projects />);
    expect(screen.getByText(/^projects$/i)).toBeInTheDocument();
    expect(screen.getByText(/selected software, ml, systems, and open-source work/i)).toBeInTheDocument();
  });

  test('displays Featured Projects heading', () => {
    render(<Projects />);
    expect(screen.getByText(/featured projects & contributions/i)).toBeInTheDocument();
  });

  test('renders all 9 project cards', () => {
    render(<Projects />);

    // Check for specific project titles
    expect(screen.getByText(/ray tracer & rendering systems/i)).toBeInTheDocument();
    expect(screen.getByText(/active interview application/i)).toBeInTheDocument();
    expect(screen.getByText(/stock price prediction/i)).toBeInTheDocument();
    expect(screen.getByText(/tokio – asynchronous runtime for rust/i)).toBeInTheDocument();

    // "Open Assistant" appears twice (title and description), so use getAllByText
    const openAssistantElements = screen.getAllByText(/open assistant/i);
    expect(openAssistantElements.length).toBeGreaterThan(0);

    expect(screen.getByText(/personal portfolio & cv website/i)).toBeInTheDocument();
    expect(screen.getByText(/artificial neural network experiments/i)).toBeInTheDocument();
    expect(screen.getByText(/c# projects/i)).toBeInTheDocument();
    expect(screen.getByText(/miscellaneous projects/i)).toBeInTheDocument();
  });

  test('all project links open in new tab', () => {
    render(<Projects />);
    const links = screen.getAllByRole('link');

    links.forEach(link => {
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noreferrer');
    });
  });

  test('project links have correct href attributes', () => {
    render(<Projects />);

    const rayTracerLink = screen.getByText(/ray tracer & rendering systems/i);
    expect(rayTracerLink.closest('a')).toHaveAttribute('href', 'https://github.com/Archibajl/RayTracer');
  });

  test('displays project tags correctly formatted', () => {
    render(<Projects />);

    // Check that tags are separated by bullet points
    expect(screen.getByText(/computer graphics • ray tracing • c\+\+ • algorithms/i)).toBeInTheDocument();
    expect(screen.getByText(/python • tensorflow • keras • lstm • sentiment analysis/i)).toBeInTheDocument();
  });

  test('displays project descriptions', () => {
    render(<Projects />);

    // Check for a unique part of a project description
    expect(screen.getByText(/implemented ray tracing components/i)).toBeInTheDocument();
    expect(screen.getByText(/deep learning project using tensorflow\/keras/i)).toBeInTheDocument();
  });

  test('renders exactly 9 project sections', () => {
    const { container } = render(<Projects />);
    const projectCards = container.querySelectorAll('.project-card');
    expect(projectCards).toHaveLength(9);
  });
});
