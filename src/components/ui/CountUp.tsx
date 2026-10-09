import React, { useEffect, useRef, useState } from 'react';

interface CountUpProps {
  to: number;
  from?: number;
  duration?: number;
  delay?: number;
}

export const CountUp: React.FC<CountUpProps> = ({ to, from = 0, duration = 2, delay = 0.4 }) => {
  const [value, setValue] = useState(from);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setValue(to);
      return;
    }

    const stiffness = 100 / duration;
    const damping = 20 + 40 / duration;
    let x = from;
    let v = 0;
    let last = 0;
    let reqId: number;

    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      const n = Math.max(1, Math.ceil(dt / 0.004));
      const h = dt / n;
      for (let i = 0; i < n; i++) {
        v += (-stiffness * (x - to) - damping * v) * h;
        x += v * h;
      }
      if (Math.abs(to - x) < 0.01 && Math.abs(v) < 0.01) {
        setValue(to);
        return;
      }
      setValue(Math.round(x));
      reqId = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      setTimeout(() => {
        last = performance.now();
        reqId = requestAnimationFrame(tick);
      }, delay * 1000);
    });

    if (ref.current) {
      io.observe(ref.current);
    }

    return () => {
      io.disconnect();
      if (reqId) cancelAnimationFrame(reqId);
    };
  }, [to, from, duration, delay]);

  return <span ref={ref} className="num" aria-hidden="true">{value}</span>;
};
