import { useRef, useEffect } from 'react';
import './ProximityText.css';

const RADIUS = 80;
const STRENGTH = 0.65;

function ProximityText({ children }) {
  const containerRef = useRef(null);
  const charsRef = useRef([]);
  const maxTRef = useRef([]);
  const text = typeof children === 'string' ? children : String(children);

  useEffect(() => {
    const container = containerRef.current;
    const chars = charsRef.current;
    maxTRef.current = new Array(chars.length).fill(0);
    const maxT = maxTRef.current;
    let baseColors = null;

    function ensureBaseColors() {
      if (baseColors) return;
      baseColors = chars.map((el) => {
        if (!el) return [0, 0, 0];
        const m = getComputedStyle(el).color.match(/\d+/g);
        return m ? [+m[0], +m[1], +m[2]] : [0, 0, 0];
      });
    }

    function onMove(e) {
      ensureBaseColors();
      const mx = e.clientX;
      const my = e.clientY;

      if (container) {
        const b = container.getBoundingClientRect();
        if (
          mx < b.left - RADIUS ||
          mx > b.right + RADIUS ||
          my < b.top - RADIUS ||
          my > b.bottom + RADIUS
        ) {
          return;
        }
      }

      for (let i = 0; i < chars.length; i++) {
        const el = chars[i];
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        const d = Math.hypot(
          mx - (rect.left + rect.width / 2),
          my - (rect.top + rect.height / 2)
        );
        if (d < RADIUS) {
          const t = (1 - d / RADIUS) * STRENGTH;
          if (t > (maxT[i] || 0)) {
            maxT[i] = t;
            const [br, bg, bb] = baseColors[i];
            const r = Math.round(br + (255 - br) * t);
            const g = Math.round(bg + (255 - bg) * t);
            const bv = Math.round(bb + (255 - bb) * t);
            el.style.color = `rgb(${r},${g},${bv})`;
          }
        }
      }
    }

    window.addEventListener('mousemove', onMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', onMove);
    };
  }, [text]);

  charsRef.current.length = text.length;

  return (
    <span ref={containerRef}>
      {text.split('').map((char, i) => (
        <span
          key={i}
          ref={(el) => {
            charsRef.current[i] = el;
          }}
          className="prox-char"
        >
          {char}
        </span>
      ))}
    </span>
  );
}

export default ProximityText;
