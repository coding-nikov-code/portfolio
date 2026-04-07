import { render, screen } from '@testing-library/react';
import Header from './Header';

describe('Header', () => {
  test('renders without crashing', () => {
    render(<Header />);
  });

  test('displays "Mischa Nikov" in the heading', () => {
    render(<Header />);
    expect(screen.getByRole('heading', { level: 1, name: 'Mischa Nikov' })).toBeInTheDocument();
  });

  test('renders inside a header element', () => {
    render(<Header />);
    const header = document.querySelector('header.header');
    expect(header).toBeInTheDocument();
  });

  test('name is in an h1 element', () => {
    render(<Header />);
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveTextContent('Mischa Nikov');
  });
});
