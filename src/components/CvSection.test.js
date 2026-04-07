import { render, screen } from '@testing-library/react';
import CvSection from './CvSection';

describe('CvSection', () => {
  test('renders without crashing', () => {
    render(<CvSection />);
  });

  test('renders the Instagram link', () => {
    render(<CvSection />);
    const link = screen.getByRole('link', { name: 'Instagram' });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute(
      'href',
      'https://www.instagram.com/mischa_nikov/?hl=en'
    );
  });

  test('Instagram link opens in new tab', () => {
    render(<CvSection />);
    const link = screen.getByRole('link', { name: 'Instagram' });
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  test('renders "Education" section title', () => {
    render(<CvSection />);
    expect(screen.getByRole('heading', { name: 'Education' })).toBeInTheDocument();
  });

  test('renders "Exhibitions & Performances" section title', () => {
    render(<CvSection />);
    expect(screen.getByRole('heading', { name: 'Exhibitions & Performances' })).toBeInTheDocument();
  });

  test('renders "Scholarship" section title', () => {
    render(<CvSection />);
    expect(screen.getByRole('heading', { name: 'Scholarship' })).toBeInTheDocument();
  });

  test('renders CV items with year and text', () => {
    render(<CvSection />);
    const section = document.querySelector('.cv');
    expect(section.textContent).toContain('2024');
    expect(section.textContent).toContain('Duesseldorf Academy of fine Arts');
  });

  test('renders multiple exhibition items', () => {
    render(<CvSection />);
    const section = document.querySelector('.cv');
    expect(section.textContent).toContain('12x12 Club, Duesseldorf');
    expect(section.textContent).toContain('Filmwerkstatt Duesseldorf');
  });
});
