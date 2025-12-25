import { render, screen } from '@testing-library/react';
import Resume from './Resume';

describe('Resume Component', () => {
  test('renders without crashing', () => {
    render(<Resume />);
  });

  test('displays main heading', () => {
    render(<Resume />);
    expect(screen.getByText(/^resume$/i)).toBeInTheDocument();
  });

  test('displays contact information', () => {
    render(<Resume />);
    expect(screen.getByText(/justin archibald/i)).toBeInTheDocument();
    expect(screen.getByText(/software engineer \| ai\/ml/i)).toBeInTheDocument();
    expect(screen.getByText(/archibajl@gmail.com/i)).toBeInTheDocument();
    expect(screen.getByText(/\(719\) 661-8380/i)).toBeInTheDocument();
  });

  test('displays GitHub link', () => {
    render(<Resume />);
    const githubLink = screen.getByRole('link', { name: /github/i });
    expect(githubLink).toHaveAttribute('href', 'https://github.com/Archibajl');
    expect(githubLink).toHaveAttribute('target', '_blank');
  });

  test('displays Summary section', () => {
    render(<Resume />);
    expect(screen.getByText(/summary/i)).toBeInTheDocument();
    expect(screen.getByText(/software engineer with experience in full-stack development/i)).toBeInTheDocument();
  });

  test('displays Technical Skills section', () => {
    render(<Resume />);
    expect(screen.getByText(/technical skills/i)).toBeInTheDocument();
  });

  test('displays all skill categories', () => {
    render(<Resume />);

    // Check for skill category headings
    expect(screen.getByText(/programming languages:/i)).toBeInTheDocument();
    expect(screen.getByText(/frameworks:/i)).toBeInTheDocument();
    expect(screen.getByText(/libraries:/i)).toBeInTheDocument();
    expect(screen.getByText(/ai \/ machine learning:/i)).toBeInTheDocument();
    expect(screen.getByText(/web & api technologies:/i)).toBeInTheDocument();
    expect(screen.getByText(/devops & systems:/i)).toBeInTheDocument();
    expect(screen.getByText(/databases:/i)).toBeInTheDocument();
    expect(screen.getByText(/software engineering practices:/i)).toBeInTheDocument();
    expect(screen.getByText(/networking & security:/i)).toBeInTheDocument();
  });

  test('displays specific programming languages', () => {
    render(<Resume />);

    // The skills are displayed as comma-separated lists
    // These terms appear multiple times in the document, so use getAllByText
    const pythonElements = screen.getAllByText(/python/i);
    expect(pythonElements.length).toBeGreaterThan(0);

    const javaElements = screen.getAllByText(/java/i);
    expect(javaElements.length).toBeGreaterThan(0);
  });

  test('displays Experience section with job roles', () => {
    render(<Resume />);
    expect(screen.getByText(/^experience$/i)).toBeInTheDocument();
    expect(screen.getByText(/full stack software engineer/i)).toBeInTheDocument();
    expect(screen.getByText(/lockheed martin/i)).toBeInTheDocument();
    expect(screen.getByText(/freelance/i)).toBeInTheDocument();
    expect(screen.getByText(/united states air force/i)).toBeInTheDocument();
  });

  test('displays Multi-Agent Systems section', () => {
    render(<Resume />);
    expect(screen.getByText(/multi-agent systems & agentic ai/i)).toBeInTheDocument();
    expect(screen.getByText(/designed and implemented multi-agent ai workflows/i)).toBeInTheDocument();
  });

  test('displays Projects section with links', () => {
    render(<Resume />);
    expect(screen.getByText(/^projects$/i)).toBeInTheDocument();

    // Check for project names
    expect(screen.getByText(/stock tracker ann/i)).toBeInTheDocument();
    expect(screen.getByText(/ann experiments/i)).toBeInTheDocument();

    // Check that project links exist and open in new tab
    const repoLinks = screen.getAllByRole('link', { name: /repo/i });
    expect(repoLinks.length).toBeGreaterThan(0);
    repoLinks.forEach(link => {
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noreferrer');
    });
  });

  test('displays Education section', () => {
    render(<Resume />);
    expect(screen.getByText(/^education$/i)).toBeInTheDocument();
    expect(screen.getByText(/b\.s\. computer science/i)).toBeInTheDocument();
    expect(screen.getByText(/university of colorado, colorado springs \(uccs\)/i)).toBeInTheDocument();
    expect(screen.getByText(/a\.s\. science/i)).toBeInTheDocument();
    expect(screen.getByText(/pikes peak community college \(ppcc\)/i)).toBeInTheDocument();
  });

  test('displays Certifications section', () => {
    render(<Resume />);
    expect(screen.getByText(/^certifications$/i)).toBeInTheDocument();

    // Check for certification text - using getAllByText since some terms appear multiple times
    const securityCerts = screen.getAllByText(/comptia security/i);
    expect(securityCerts.length).toBeGreaterThan(0);

    expect(screen.getByText(/ibm data science professional certificate/i)).toBeInTheDocument();
    expect(screen.getByText(/google cybersecurity professional certificate/i)).toBeInTheDocument();
  });

  test('renders dropdown components', () => {
    const { container } = render(<Resume />);
    const dropdowns = container.querySelectorAll('details.resume-dropdown');
    expect(dropdowns.length).toBeGreaterThan(0);
  });
});

describe('Section Component', () => {
  test('renders section with title and children', () => {
    const { container } = render(<Resume />);
    const sections = container.querySelectorAll('.resume-section');
    expect(sections.length).toBeGreaterThan(0);
  });
});

describe('Dropdown Component', () => {
  test('Interests dropdown exists', () => {
    render(<Resume />);
    expect(screen.getByText(/interests/i)).toBeInTheDocument();
  });

  test('Other prior roles dropdown exists', () => {
    render(<Resume />);
    expect(screen.getByText(/other prior roles/i)).toBeInTheDocument();
  });
});
