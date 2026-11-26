import { useEffect, useRef } from 'react';

// Page-wide background canvas:
// 1. network: drifting nodes whose links grow as you scroll down; cursor links nearby nodes.
//    At the very bottom of the page the nodes collapse into the footer's <VK/> logo.
// 2. data streams: curves from each radar blip ([data-projects]) to the floppy disks
//    ([data-project]) of the projects that skill was used in.
const ScrollFX = () => {
  const ref = useRef(null);
  const topRef = useRef(null);

  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const c = ref.current, ctx = c.getContext('2d');
    const top = topRef.current, tctx = top.getContext('2d');
    let w, h, raf, P = [];
    const mouse = { x: -999, y: -999 };
    const resize = () => {
      const dpr = devicePixelRatio || 1;
      w = innerWidth; h = innerHeight;
      for (const [cv, cx] of [[c, ctx], [top, tctx]]) {
        cv.width = w * dpr; cv.height = h * dpr;
        cx.setTransform(dpr, 0, 0, dpr, 0, 0);
      }
      P = Array.from({ length: Math.round((w * h) / 12000) }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.4,
        ja: Math.random() * 6.3, // where around the logo this node lands
      }));
    };
    const onMove = e => { mouse.x = e.clientX; mouse.y = e.clientY; };
    resize();
    addEventListener('resize', resize);
    addEventListener('mousemove', onMove);

    const network = () => {
      const max = Math.max(1, document.body.scrollHeight - h);
      const frac = scrollY / max;
      // 0 until the last ~60% of a screen, 1 at the very bottom
      const c = Math.min(1, Math.max(0, 1 - (max - scrollY) / (h * 0.6)));
      const e = c * c * (3 - 2 * c);
      const R = (30 + frac * 140) * (1 - e) + 22 * e;
      const brand = document.querySelector('.footer-brand');
      let bx = w / 2, by = h, rx = 60, ry = 26;
      if (brand) {
        const b = brand.getBoundingClientRect();
        bx = b.left + b.width / 2; by = b.top + b.height / 2;
        rx = b.width * 0.85 + 12; ry = b.height * 1.1 + 6;
        brand.style.textShadow = e > 0 ? `0 0 ${Math.round(24 * e)}px rgba(192,132,252,${e.toFixed(2)})` : '';
      }
      for (const p of P) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
      }
      // drawn position: free drift blended toward the glyph
      const Q = P.map(p => {
        const tx = bx + Math.cos(p.ja) * rx, ty = by + Math.sin(p.ja) * ry; // a halo around the logo
        return { x: p.x + (tx - p.x) * e, y: p.y + (ty - p.y) * e };
      });
      ctx.lineWidth = 1;
      // ponytail: O(n²) pair scan, fine for ~150 nodes; grid buckets if N grows
      for (let i = 0; i < Q.length; i++) for (let j = i + 1; j < Q.length; j++) {
        const d = Math.hypot(Q[i].x - Q[j].x, Q[i].y - Q[j].y);
        if (d < R) {
          ctx.strokeStyle = `rgba(168,85,247,${(1 - d / R) * (0.5 + 0.4 * e)})`;
          ctx.beginPath(); ctx.moveTo(Q[i].x, Q[i].y); ctx.lineTo(Q[j].x, Q[j].y); ctx.stroke();
        }
      }
      for (const p of Q) {
        const d = Math.hypot(p.x - mouse.x, p.y - mouse.y);
        if (d < 150) {
          ctx.strokeStyle = `rgba(244,114,182,${(1 - d / 150) * 0.6})`;
          ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke();
        }
        ctx.fillStyle = 'rgba(192,132,252,0.8)';
        ctx.beginPath(); ctx.arc(p.x, p.y, 1.8, 0, 6.3); ctx.fill();
      }
    };

    const bez = (a, b, c1, c2, t) => {
      const u = 1 - t;
      return u * u * u * a + 3 * u * u * t * c1 + 3 * u * t * t * c2 + t * t * t * b;
    };

    const streams = t => {
      const disks = [...document.querySelectorAll('[data-project]')];
      if (!disks.length) return;
      for (const blip of document.querySelectorAll('[data-projects]:not(.dimmed)')) {
        const b = blip.getBoundingClientRect();
        const x1 = b.left + b.width / 2, y1 = b.top + b.height / 2;
        const color = blip.style.getPropertyValue('--blip-color') || '#a855f7';
        const hot = blip.classList.contains('hovered');
        for (const name of blip.dataset.projects.split('|')) {
          const disk = disks.find(el => el.dataset.project.startsWith(name));
          if (!disk) continue;
          const r = disk.getBoundingClientRect();
          const x2 = r.left + r.width / 2, y2 = r.top;
          // only while at least one end is on screen
          if ((y1 < -50 || y1 > h + 50) && (y2 < -50 || y2 > h + 50)) continue;
          const cy1 = y1 + (y2 - y1) * 0.5, cy2 = y2 - (y2 - y1) * 0.5;
          tctx.globalAlpha = hot ? 0.9 : 0.1;
          tctx.strokeStyle = color; tctx.lineWidth = hot ? 1.6 : 1;
          tctx.beginPath(); tctx.moveTo(x1, y1); tctx.bezierCurveTo(x1, cy1, x2, cy2, x2, y2); tctx.stroke();
          // packets travelling skill -> project
          tctx.fillStyle = color; tctx.globalAlpha = hot ? 1 : 0.4;
          for (let k = 0; k < 3; k++) {
            const s = ((t / 2500) + k / 3 + x1 * 0.001) % 1;
            tctx.beginPath(); tctx.arc(bez(x1, x2, x1, x2, s), bez(y1, y2, cy1, cy2, s), hot ? 2.6 : 1.8, 0, 6.3); tctx.fill();
          }
        }
      }
      tctx.globalAlpha = 1;
    };

    const loop = t => { ctx.clearRect(0, 0, w, h); tctx.clearRect(0, 0, w, h); network(); streams(t); raf = requestAnimationFrame(loop); };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      removeEventListener('resize', resize);
      removeEventListener('mousemove', onMove);
    };
  }, []);

  const layer = z => ({ position: 'fixed', inset: 0, width: '100%', height: '100%', zIndex: z, pointerEvents: 'none' });
  // network sits behind the sections; streams sit above them so they can reach the disks
  return (
    <>
      <canvas ref={ref} aria-hidden="true" style={layer(0)} />
      <canvas ref={topRef} aria-hidden="true" style={layer(50)} />
    </>
  );
};

export default ScrollFX;
