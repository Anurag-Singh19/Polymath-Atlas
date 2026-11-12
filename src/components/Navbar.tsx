import React, { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { LogIn, LogOut, Menu, X } from 'lucide-react';
import type { User } from 'firebase/auth';
import { PWAInstallButton } from './PWAInstallButton';
import { StreakPopover } from './StreakPopover';
import type { StreakSummary } from '../lib/streak';

export type AppView = 'explore' | 'tree' | 'map' | 'planner' | 'vault' | 'skill';

interface NavbarProps {
  activeView: AppView;
  onNavigate: (view: AppView) => void;
  globalPercentage: number;
  isPolymath: boolean;
  user: User | null;
  authLoading: boolean;
  streakSummary: StreakSummary;
  onSignIn: () => void;
  onSignOut: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeView,
  onNavigate,
  globalPercentage,
  isPolymath,
  user,
  authLoading,
  streakSummary,
  onSignIn,
  onSignOut,
}) => {
  const prefersReducedMotion = Boolean(useReducedMotion());
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems: { id: AppView; label: string }[] = [
    { id: 'explore', label: 'Explore' },
    { id: 'tree', label: 'Skill Tree' },
    { id: 'map', label: 'Knowledge Map' },
    { id: 'planner', label: 'Study Planner' },
    { id: 'vault', label: 'Resume Vault' },
  ];

  const userLabel =
    user?.displayName?.split(' ')[0] ||
    user?.email?.split('@')[0] ||
    'Account';

  return (
    <header className="sticky top-0 z-40 border-b border-[rgba(244,241,234,0.1)] bg-[#06070A]/72 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-6 px-6 py-3.5">
        {/* Zone 1: Editorial Serif Gallery Wordmark */}
        <button
          type="button"
          onClick={() => {
            onNavigate('explore');
            setMobileOpen(false);
          }}
          className="font-display text-xl sm:text-[22px] font-semibold tracking-[0.04em] text-[#F4F1EA] transition-colors hover:text-[#60A5FA] whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#60A5FA]"
        >
          Polymath Atlas
        </button>

        {/* Zone 2: Minimalist Gallery Navigation Links with Cobalt Active Rule */}
        <nav className="hidden lg:flex items-center gap-6 text-[13px] font-medium">
          {navItems.map((item) => {
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onNavigate(item.id)}
                className={`relative py-1 transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#60A5FA] ${
                  isActive
                    ? 'text-[#F4F1EA]'
                    : 'text-slate-400 hover:text-[#F4F1EA]'
                }`}
              >
                {item.label}
                {isActive && (
                  <motion.span
                    layoutId="wm-nav-underline"
                    transition={{ type: 'spring', duration: 0.34, bounce: 0 }}
                    className="absolute inset-x-0 -bottom-[15px] h-[2px] bg-[#3B82F6] shadow-[0_0_12px_rgba(59,130,246,0.75)]"
                  />
                )}
              </button>
            );
          })}
          <a
            href="#polymath-meter"
            onClick={(e) => {
              if (activeView !== 'explore') {
                e.preventDefault();
                onNavigate('explore');
                setTimeout(() => {
                  document.getElementById('polymath-meter')?.scrollIntoView({
                    behavior: prefersReducedMotion ? 'auto' : 'smooth',
                  });
                }, 80);
              }
            }}
            className="text-slate-400 transition-colors hover:text-[#93C5FD] whitespace-nowrap shrink-0 font-mono-data text-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#60A5FA]"
          >
            {isPolymath ? 'Polymath Status' : `Mastery ${globalPercentage}%`}
          </a>
        </nav>

        {/* Zone 3: Streak + Install + Account + Primary Gallery CTA */}
        <div className="flex items-center gap-2.5 shrink-0">
          <StreakPopover
            summary={streakSummary}
            onOpenPlanner={() => {
              onNavigate('planner');
              setMobileOpen(false);
            }}
          />
          <div className="hidden sm:flex">
            <PWAInstallButton />
          </div>
          {!authLoading &&
            (user ? (
              <button
                type="button"
                onClick={onSignOut}
                title={`Signed in as ${user.email || userLabel}. Click to sign out.`}
                className="hidden sm:inline-flex items-center gap-2 rounded-lg border border-slate-500/60 bg-[#0E111B] px-3 py-2 text-xs font-medium text-[#F4F1EA] transition-colors hover:border-[#60A5FA] whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#60A5FA]"
              >
                <span className="max-w-[110px] truncate">{userLabel}</span>
                <LogOut className="h-3.5 w-3.5 text-slate-400" />
              </button>
            ) : (
              <button
                type="button"
                onClick={onSignIn}
                className="hidden sm:inline-flex items-center gap-1.5 rounded-lg border border-slate-500/60 bg-[#0E111B] px-3 py-2 text-xs font-medium text-[#F4F1EA] transition-colors hover:border-[#60A5FA] hover:text-[#93C5FD] whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#60A5FA]"
              >
                <LogIn className="h-3.5 w-3.5" />
                <span>Sign In</span>
              </button>
            ))}

          <motion.button
            type="button"
            whileTap={{ scale: 0.96 }}
            onClick={() => onNavigate(activeView === 'tree' ? 'explore' : 'tree')}
            className="hidden sm:inline-flex items-center justify-center rounded-lg bg-[#2563EB] px-4 py-2 text-xs font-semibold text-white transition-colors duration-150 hover:bg-[#3B82F6] shadow-[0_0_20px_rgba(37,99,235,0.35)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#60A5FA] whitespace-nowrap shrink-0 cursor-pointer"
          >
            {activeView === 'tree' ? 'Browse Grid' : 'Open Skill Tree'}
          </motion.button>

          <button
            type="button"
            aria-label="Toggle navigation menu"
            onClick={() => setMobileOpen((prev) => !prev)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-500/60 text-slate-300 hover:text-[#F4F1EA] hover:border-[#60A5FA] lg:hidden cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#60A5FA]"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.18 }}
            className="overflow-hidden overscroll-contain border-t border-[rgba(244,241,234,0.1)] bg-[#0B0D14] px-6 py-4 lg:hidden"
          >
            <div className="flex flex-col gap-3">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    onNavigate(item.id);
                    setMobileOpen(false);
                  }}
                  className={`text-left py-2 text-sm font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#60A5FA] ${
                    activeView === item.id ? 'text-[#60A5FA]' : 'text-slate-300'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              {!authLoading &&
                (user ? (
                  <button
                    type="button"
                    onClick={() => {
                      onSignOut();
                      setMobileOpen(false);
                    }}
                    className="inline-flex items-center justify-between rounded-lg border border-slate-500/60 bg-[#0E111B] px-3 py-2 text-xs font-medium text-[#F4F1EA]"
                  >
                    <span>Signed in as {userLabel}</span>
                    <LogOut className="h-3.5 w-3.5 text-slate-400" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      onSignIn();
                      setMobileOpen(false);
                    }}
                    className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-500/60 bg-[#0E111B] px-3 py-2 text-xs font-medium text-[#F4F1EA]"
                  >
                    <LogIn className="h-3.5 w-3.5" />
                    <span>Sign In with Google</span>
                  </button>
                ))}
              <div className="flex flex-col gap-2 pt-1">
                <PWAInstallButton />
                <button
                  type="button"
                  onClick={() => {
                    onNavigate('tree');
                    setMobileOpen(false);
                  }}
                  className="w-full rounded-lg bg-[#2563EB] px-4 py-2.5 text-center text-xs font-semibold text-white hover:bg-[#3B82F6]"
                >
                  Open Skill Tree
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
