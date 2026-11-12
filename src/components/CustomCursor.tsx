import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring } from 'motion/react';

type CursorVariant = 'default' | 'interactive' | 'open' | 'orbit' | 'text';

const RING_SIZE: Record<CursorVariant, number> = {
  default: 30,
  interactive: 46,
  open: 60,
  orbit: 68,
  text: 18,
};

export const CustomCursor: React.FC = () => {
  const prefersReducedMotion = Boolean(useReducedMotion());
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [variant, setVariant] = useState<CursorVariant>('default');
  const [cursorLabel, setCursorLabel] = useState<string>('');
  const [pressed, setPressed] = useState(false);

  const mouseX = useMotionValue(-120);
  const mouseY = useMotionValue(-120);

  const ringX = useSpring(mouseX, { stiffness: 460, damping: 34, mass: 0.35 });
  const ringY = useSpring(mouseY, { stiffness: 460, damping: 34, mass: 0.35 });

  useEffect(() => {
    if (prefersReducedMotion || typeof window === 'undefined') {
      setEnabled(false);
      return;
    }

    const mediaQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
    const syncAvailability = () => {
      const fine = mediaQuery.matches;
      setEnabled(fine);
      if (fine) {
        document.body.classList.add('has-custom-cursor');
      } else {
        document.body.classList.remove('has-custom-cursor');
      }
    };

    syncAvailability();
    mediaQuery.addEventListener?.('change', syncAvailability);

    return () => {
      mediaQuery.removeEventListener?.('change', syncAvailability);
      document.body.classList.remove('has-custom-cursor');
    };
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (!enabled) return;

    const resolveTargetVariant = (target: EventTarget | null): { next: CursorVariant; label: string } => {
      if (!(target instanceof Element)) return { next: 'default', label: '' };

      const customEl = target.closest('[data-cursor]');
      if (customEl) {
        const mode = customEl.getAttribute('data-cursor') || '';
        const explicitLabel = customEl.getAttribute('data-cursor-label') || '';
        if (mode === 'orbit') {
          return { next: 'orbit', label: explicitLabel || 'ORBIT' };
        }
        if (mode === 'open') {
          return { next: 'open', label: explicitLabel || 'OPEN' };
        }
        if (mode === 'text') {
          return { next: 'text', label: '' };
        }
        if (mode === 'interactive') {
          return { next: 'interactive', label: explicitLabel };
        }
        if (mode === 'default') {
          return { next: 'default', label: '' };
        }
      }

      if (target.closest('canvas')) {
        return { next: 'orbit', label: 'ORBIT' };
      }

      if (target.closest('input:not([type="checkbox"]):not([type="radio"]):not([type="range"]), textarea, select')) {
        return { next: 'text', label: '' };
      }

      if (target.closest('a, button:not(:disabled), [role="button"], label[for], summary')) {
        return { next: 'interactive', label: '' };
      }

      return { next: 'default', label: '' };
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse' && e.pointerType !== 'pen') return;
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setVisible((prev) => (prev ? prev : true));

      const { next, label } = resolveTargetVariant(e.target);
      setVariant((prev) => (prev === next ? prev : next));
      setCursorLabel((prev) => (prev === label ? prev : label));
    };

    const handlePointerDown = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse' && e.pointerType !== 'pen') return;
      setPressed(true);
    };

    const handlePointerUp = () => {
      setPressed(false);
    };

    const handleMouseLeave = () => {
      setVisible(false);
      setPressed(false);
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerdown', handlePointerDown, { passive: true });
    window.addEventListener('pointerup', handlePointerUp, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointerup', handlePointerUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [enabled, mouseX, mouseY]);

  if (!enabled) return null;

  const targetSize = RING_SIZE[variant];
  const scaleFactor = pressed ? 0.82 : 1;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden"
    >
      {/* Trailing Luminous Round Halo Ring */}
      <motion.div
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: targetSize,
          height: targetSize,
          scale: scaleFactor,
          opacity: visible ? 1 : 0,
          borderColor:
            variant === 'orbit'
              ? 'rgba(96, 165, 250, 0.92)'
              : variant === 'open'
              ? 'rgba(244, 241, 234, 0.95)'
              : variant === 'interactive'
              ? 'rgba(59, 130, 246, 0.9)'
              : variant === 'text'
              ? 'rgba(244, 241, 234, 0.45)'
              : 'rgba(244, 241, 234, 0.65)',
          backgroundColor:
            variant === 'open'
              ? 'rgba(37, 99, 235, 0.88)'
              : variant === 'orbit'
              ? 'rgba(10, 42, 150, 0.28)'
              : variant === 'interactive'
              ? 'rgba(37, 99, 235, 0.16)'
              : 'rgba(6, 7, 10, 0)',
        }}
        transition={{
          type: 'spring',
          stiffness: 420,
          damping: 32,
          mass: 0.45,
        }}
        className="fixed top-0 left-0 flex items-center justify-center rounded-full border will-change-transform shadow-[0_0_24px_rgba(37,99,235,0.28)]"
      >
        {(variant === 'open' || variant === 'orbit') && cursorLabel && (
          <span className="font-mono-data text-[9px] font-semibold tracking-[0.16em] text-[#F4F1EA] select-none">
            {cursorLabel}
          </span>
        )}
      </motion.div>

      {/* Instant Center Precision Dot */}
      <motion.div
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          opacity: !visible || variant === 'open' ? 0 : 1,
          scale: pressed ? 1.35 : variant === 'interactive' ? 0.8 : 1,
          backgroundColor:
            variant === 'interactive' || variant === 'orbit' ? '#60A5FA' : '#F4F1EA',
        }}
        transition={{ duration: 0.12 }}
        className="fixed top-0 left-0 h-1.5 w-1.5 rounded-full shadow-[0_0_10px_rgba(96,165,250,0.85)] will-change-transform"
      />
    </div>
  );
};
