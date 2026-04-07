import { renderHook, act } from '@testing-library/react';
import { useMediaQuery } from './useMediaQuery';

/* ── Helper: create a controllable matchMedia mock ── */
function createMatchMediaMock(initialMatches) {
  let listener = null;
  const mql = {
    matches: initialMatches,
    media: '',
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn((_, cb) => { listener = cb; }),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  };

  function setMatches(matches) {
    mql.matches = matches;
    if (listener) listener({ matches });
  }

  window.matchMedia = jest.fn().mockReturnValue(mql);

  return { mql, setMatches };
}

afterEach(() => {
  jest.restoreAllMocks();
});

describe('useMediaQuery', () => {
  test('returns true when query matches initially', () => {
    createMatchMediaMock(true);
    const { result } = renderHook(() => useMediaQuery('(min-width: 1024px)'));
    expect(result.current).toBe(true);
  });

  test('returns false when query does not match initially', () => {
    createMatchMediaMock(false);
    const { result } = renderHook(() => useMediaQuery('(min-width: 1024px)'));
    expect(result.current).toBe(false);
  });

  test('updates when media query changes from false to true', () => {
    const { setMatches } = createMatchMediaMock(false);
    const { result } = renderHook(() => useMediaQuery('(min-width: 1024px)'));

    expect(result.current).toBe(false);
    act(() => setMatches(true));
    expect(result.current).toBe(true);
  });

  test('updates when media query changes from true to false', () => {
    const { setMatches } = createMatchMediaMock(true);
    const { result } = renderHook(() => useMediaQuery('(min-width: 1024px)'));

    expect(result.current).toBe(true);
    act(() => setMatches(false));
    expect(result.current).toBe(false);
  });

  test('registers and cleans up event listener', () => {
    createMatchMediaMock(false);
    const { unmount } = renderHook(() => useMediaQuery('(min-width: 1024px)'));

    const mql = window.matchMedia.mock.results[0].value;
    expect(mql.addEventListener).toHaveBeenCalledWith('change', expect.any(Function));

    unmount();
    expect(mql.removeEventListener).toHaveBeenCalledWith('change', expect.any(Function));
  });
});
