import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

/* ── Helper: configure matchMedia for desktop or mobile ── */
function setDesktop() {
  window.matchMedia = jest.fn().mockImplementation((query) => ({
    matches: query === '(min-width: 1024px)',
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  }));
}

function setMobile() {
  window.matchMedia = jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  }));
}

afterEach(() => {
  setMobile(); // reset to default (mobile)
});

/* ── Rendering ── */

describe('App – rendering', () => {
  test('renders without crashing', () => {
    render(<App />);
  });

  test('renders the header with site name', () => {
    render(<App />);
    expect(screen.getByText('Mischa Nikov')).toBeInTheDocument();
  });

  test('renders the "Works" section title', () => {
    render(<App />);
    expect(screen.getByText('Works')).toBeInTheDocument();
  });

  test('renders all four work buttons', () => {
    render(<App />);
    expect(screen.getByText('I Remember House')).toBeInTheDocument();
    expect(screen.getByText('12X12 CLU8')).toBeInTheDocument();
    expect(screen.getByText('Noise is an Ocean')).toBeInTheDocument();
    expect(screen.getByText('Bubble Gum Tattoos Girl')).toBeInTheDocument();
  });

  test('renders the CV section', () => {
    render(<App />);
    expect(screen.getByText('Education')).toBeInTheDocument();
  });

  test('no media is visible on initial render', () => {
    render(<App />);
    expect(screen.queryByTitle('I Remember House')).not.toBeInTheDocument();
    expect(screen.queryByTitle('Noise is an Ocean by Mischa Nikov')).not.toBeInTheDocument();
    expect(screen.queryByAltText('Datscha at Freibad')).not.toBeInTheDocument();
    expect(screen.queryByTitle('Bubble Gum Tattoos Girl')).not.toBeInTheDocument();
  });
});

/* ── Toggle behaviour ── */

describe('App – toggle behaviour', () => {
  test('clicking a work button shows its media', () => {
    setMobile();
    render(<App />);
    fireEvent.click(screen.getByText('I Remember House'));
    expect(screen.getByTitle('I Remember House')).toBeInTheDocument();
  });

  test('clicking the same button again hides media', () => {
    setMobile();
    render(<App />);
    const btn = screen.getByText('I Remember House');
    fireEvent.click(btn);
    expect(screen.getByTitle('I Remember House')).toBeInTheDocument();
    fireEvent.click(btn);
    expect(screen.queryByTitle('I Remember House')).not.toBeInTheDocument();
  });

  test('clicking a different button hides the first media and shows the second', () => {
    setMobile();
    render(<App />);
    fireEvent.click(screen.getByText('I Remember House'));
    expect(screen.getByTitle('I Remember House')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Noise is an Ocean'));
    expect(screen.queryByTitle('I Remember House')).not.toBeInTheDocument();
    expect(screen.getByTitle('Noise is an Ocean by Mischa Nikov')).toBeInTheDocument();
  });

  test('only one media is visible at a time', () => {
    setMobile();
    render(<App />);

    fireEvent.click(screen.getByText('12X12 CLU8'));
    expect(screen.getByAltText('Datscha at Freibad')).toBeInTheDocument();
    expect(screen.queryByTitle('I Remember House')).not.toBeInTheDocument();

    fireEvent.click(screen.getByText('Bubble Gum Tattoos Girl'));
    expect(screen.getByTitle('Bubble Gum Tattoos Girl')).toBeInTheDocument();
    expect(screen.queryByAltText('Datscha at Freibad')).not.toBeInTheDocument();
  });
});

/* ── Layout structure ── */

describe('App – two-panel layout', () => {
  test('has layout__left wrapper', () => {
    render(<App />);
    expect(document.querySelector('.layout__left')).toBeInTheDocument();
  });

  test('desktop: media renders inside layout__right panel', () => {
    setDesktop();
    render(<App />);
    fireEvent.click(screen.getByText('I Remember House'));

    const rightPanel = document.querySelector('.layout__right');
    expect(rightPanel).toBeInTheDocument();
    expect(rightPanel.querySelector('iframe[title="I Remember House"]')).toBeInTheDocument();
  });

  test('desktop: media does NOT render inline below button', () => {
    setDesktop();
    render(<App />);
    fireEvent.click(screen.getByText('I Remember House'));

    const leftPanel = document.querySelector('.layout__left');
    expect(leftPanel.querySelector('iframe[title="I Remember House"]')).not.toBeInTheDocument();
  });

  test('mobile: media renders inline below button (inside layout__left)', () => {
    setMobile();
    render(<App />);
    fireEvent.click(screen.getByText('I Remember House'));

    const leftPanel = document.querySelector('.layout__left');
    expect(leftPanel.querySelector('iframe[title="I Remember House"]')).toBeInTheDocument();
    expect(document.querySelector('.layout__right')).not.toBeInTheDocument();
  });

  test('mobile: layout__right panel is not rendered', () => {
    setMobile();
    render(<App />);
    expect(document.querySelector('.layout__right')).not.toBeInTheDocument();
  });
});

/* ── Media types ── */

describe('App – media types', () => {
  test('video work renders iframe with YouTube src', () => {
    setMobile();
    render(<App />);
    fireEvent.click(screen.getByText('I Remember House'));
    const iframe = screen.getByTitle('I Remember House');
    expect(iframe.tagName).toBe('IFRAME');
    expect(iframe).toHaveAttribute('src', expect.stringContaining('youtube.com/embed'));
  });

  test('photo work renders an image', () => {
    setMobile();
    render(<App />);
    fireEvent.click(screen.getByText('12X12 CLU8'));
    const img = screen.getByAltText('Datscha at Freibad');
    expect(img.tagName).toBe('IMG');
  });

  test('audio work renders iframe with Bandcamp src', () => {
    setMobile();
    render(<App />);
    fireEvent.click(screen.getByText('Noise is an Ocean'));
    const iframe = screen.getByTitle('Noise is an Ocean by Mischa Nikov');
    expect(iframe.tagName).toBe('IFRAME');
    expect(iframe).toHaveAttribute('src', expect.stringContaining('bandcamp.com'));
  });

  test('bubble work renders iframe with YouTube src', () => {
    setMobile();
    render(<App />);
    fireEvent.click(screen.getByText('Bubble Gum Tattoos Girl'));
    const iframe = screen.getByTitle('Bubble Gum Tattoos Girl');
    expect(iframe.tagName).toBe('IFRAME');
    expect(iframe).toHaveAttribute('src', expect.stringContaining('youtube.com/embed'));
  });
});
