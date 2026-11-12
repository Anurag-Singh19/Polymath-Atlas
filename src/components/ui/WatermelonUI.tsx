import React, { useEffect, useRef } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { Check, Copy } from 'lucide-react';

export interface SegmentedOption<T extends string> {
  id: T;
  label: string;
  count?: number;
  icon?: React.ReactNode;
  accentHex?: string;
}

interface MotionSegmentedControlProps<T extends string> {
  options: SegmentedOption<T>[];
  value: T;
  onChange: (value: T) => void;
  layoutId: string;
  variant?: 'pill' | 'mint';
  className?: string;
}

export function MotionSegmentedControl<T extends string>({
  options,
  value,
  onChange,
  layoutId,
  variant = 'pill',
  className = '',
}: MotionSegmentedControlProps<T>) {
  return (
    <div
      className={`inline-flex flex-wrap items-center gap-1 rounded-xl border border-slate-600/55 bg-[#0B0D14] p-1 shadow-[inset_0_1px_0_rgba(244,241,234,0.05)] ${className}`}
    >
      {options.map((opt) => {
        const active = value === opt.id;
        return (
          <button
            key={opt.id}
            type="button"
            onClick={() => onChange(opt.id)}
            className={`relative inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#60A5FA] ${
              active ? 'text-[#F4F1EA]' : 'text-slate-400 hover:text-[#F4F1EA]'
            }`}
          >
            {active && (
              <motion.span
                layoutId={layoutId}
                transition={{ type: 'spring', duration: 0.34, bounce: 0 }}
                className={`absolute inset-0 rounded-lg ${
                  variant === 'mint'
                    ? 'bg-[#10B981]/20 border border-[#10B981]/55'
                    : 'bg-[#172554]/85 border border-[#3B82F6]/65 shadow-[inset_0_1px_0_rgba(96,165,250,0.2)]'
                }`}
              />
            )}
            <span className="relative z-10 inline-flex items-center gap-1.5">
              {opt.accentHex && (
                <span
                  className="h-1.5 w-1.5 rounded-full shrink-0"
                  style={{ backgroundColor: opt.accentHex }}
                />
              )}
              {opt.icon}
              <span>
                {opt.label}
                {typeof opt.count === 'number' ? ` (${opt.count})` : ''}
              </span>
            </span>
          </button>
        );
      })}
    </div>
  );
}

interface MorphingCopyButtonProps {
  copied: boolean;
  onClick: () => void;
  idleLabel?: string;
  copiedLabel?: string;
  className?: string;
}

export const MorphingCopyButton: React.FC<MorphingCopyButtonProps> = ({
  copied,
  onClick,
  idleLabel = 'Copy',
  copiedLabel = 'Copied',
  className = '',
}) => {
  const prefersReduced = useReducedMotion();
  const iconInitial = prefersReduced
    ? { opacity: 0 }
    : { opacity: 0, scale: 0.25, filter: 'blur(4px)' };
  const iconAnimate = prefersReduced
    ? { opacity: 1 }
    : { opacity: 1, scale: 1, filter: 'blur(0px)' };
  const iconExit = prefersReduced
    ? { opacity: 0 }
    : { opacity: 0, scale: 0.25, filter: 'blur(4px)' };

  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileTap={{ scale: 0.96 }}
      className={`inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-xs font-medium transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#60A5FA] ${
        copied
          ? 'border-[#10B981]/60 bg-[#10B981]/15 text-[#34D399]'
          : 'border-slate-500/60 bg-[#06070A] text-slate-300 hover:border-[#3B82F6] hover:text-[#F4F1EA]'
      } ${className}`}
    >
      <AnimatePresence mode="wait" initial={false}>
        {copied ? (
          <motion.span
            key="copied"
            initial={iconInitial}
            animate={iconAnimate}
            exit={iconExit}
            transition={{ type: 'spring', duration: 0.3, bounce: 0 }}
            className="inline-flex items-center gap-1"
          >
            <Check className="h-3 w-3" />
            <span>{copiedLabel}</span>
          </motion.span>
        ) : (
          <motion.span
            key="idle"
            initial={iconInitial}
            animate={iconAnimate}
            exit={iconExit}
            transition={{ type: 'spring', duration: 0.3, bounce: 0 }}
            className="inline-flex items-center gap-1"
          >
            <Copy className="h-3 w-3" />
            <span>{idleLabel}</span>
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
};

interface MotionModalFrameProps {
  isOpen: boolean;
  onClose: () => void;
  labelledBy: string;
  maxWidthClass?: string;
  closeDisabled?: boolean;
  children: React.ReactNode;
}

export const MotionModalFrame: React.FC<MotionModalFrameProps> = ({
  isOpen,
  onClose,
  labelledBy,
  maxWidthClass = 'max-w-xl',
  closeDisabled = false,
  children,
}) => {
  const panelRef = useRef<HTMLDivElement | null>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    previousFocusRef.current = document.activeElement as HTMLElement | null;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !closeDisabled) {
        onClose();
        return;
      }
      if (e.key === 'Tab' && panelRef.current) {
        const focusable = panelRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKey);
    return () => {
      window.removeEventListener('keydown', handleKey);
      previousFocusRef.current?.focus?.();
    };
  }, [isOpen, closeDisabled, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#030408]/88 p-4 backdrop-blur-xs overflow-y-auto overscroll-contain"
          role="dialog"
          aria-modal="true"
          aria-labelledby={labelledBy}
          onClick={(e) => {
            if (e.target === e.currentTarget && !closeDisabled) onClose();
          }}
        >
          <motion.div
            ref={panelRef}
            key="modal-panel"
            initial={{ opacity: 0, scale: 0.96, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ type: 'spring', duration: 0.32, bounce: 0 }}
            className={`w-full ${maxWidthClass} rounded-2xl border border-slate-600/55 bg-[#0E111B] p-6 sm:p-7 shadow-[0_28px_90px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(96,165,250,0.12)] my-auto`}
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
