import '@testing-library/jest-dom';

/* ── matchMedia mock ── */
function createMatchMedia(matches) {
  return (query) => ({
    matches,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  });
}

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: createMatchMedia(false), // default: mobile viewport
});

/* ── Canvas 2D context mock ── */
HTMLCanvasElement.prototype.getContext = jest.fn().mockReturnValue({
  createRadialGradient: jest.fn().mockReturnValue({
    addColorStop: jest.fn(),
  }),
  fillStyle: null,
  beginPath: jest.fn(),
  arc: jest.fn(),
  fill: jest.fn(),
  getImageData: jest.fn().mockReturnValue({}),
  putImageData: jest.fn(),
  globalCompositeOperation: null,
});
