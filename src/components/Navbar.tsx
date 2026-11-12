import React, { useState } from 'react';
import { LogIn, LogOut, Menu, X } from 'lucide-react';
import type { User } from 'firebase/auth';

export type AppView = 'explore' | 'tree' | 'map' | 'planner' | 'vault' | 'skill';

interface NavbarProps {
  activeView: AppView;
  onNavigate: (view: AppView) => void;
  globalPercentage: number;
  isPolymath: boolean;
  user: User | null;
  authLoading: boolean;
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
  onSignIn,
  onSignOut,
}) => {
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
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#090D0B]/95">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-6 px-6 py-3.5">
        {/* Zone 1: Single text element wordmark */}
        <button
          type="button"
          onClick={() => {
            onNavigate('explore');
            setMobileOpen(false);
          }}
          className="font-display text-lg font-bold tracking-tight text-[#F1F5F3] transition-colors hover:text-[#FF3366] whitespace-nowrap shrink-0 cursor-pointer"
        >
          Polymath Atlas
        </button>

        {/* Zone 2: Clean single-line text navigation links */}
        <nav className="hidden lg:flex items-center gap-5 text-sm font-medium">
          {navItems.map((item) => {
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onNavigate(item.id)}
                className={`relative py-1 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  isActive
                    ? 'text-[#F1F5F3]'
                    : 'text-[#A7B5AE] hover:text-[#F1F5F3]'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute inset-x-0 -bottom-[15px] h-[2px] bg-[#FF3366]" />
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
                  document.getElementById('polymath-meter')?.scrollIntoView({ behavior: 'smooth' });
                }, 80);
              }
            }}
            className="text-[#A7B5AE] transition-colors hover:text-[#10B981] whitespace-nowrap shrink-0"
          >
            {isPolymath ? 'Polymath Status' : `Mastery ${globalPercentage}%`}
          </a>
        </nav>

        {/* Zone 3: Auth action + primary CTA */}
        <div className="flex items-center gap-2.5 shrink-0">
          {!authLoading &&
            (user ? (
              <button
                type="button"
                onClick={onSignOut}
                title={`Signed in as ${user.email || userLabel}. Click to sign out.`}
                className="hidden sm:inline-flex items-center gap-2 rounded-lg border border-white/10 bg-[#141B17] px-3 py-2 text-xs font-medium text-[#F1F5F3] transition-colors hover:border-white/25 whitespace-nowrap shrink-0 cursor-pointer"
              >
                <span className="max-w-[110px] truncate">{userLabel}</span>
                <LogOut className="h-3.5 w-3.5 text-[#A7B5AE]" />
              </button>
            ) : (
              <button
                type="button"
                onClick={onSignIn}
                className="hidden sm:inline-flex items-center gap-1.5 rounded-lg border border-white/15 bg-[#141B17] px-3 py-2 text-xs font-medium text-[#F1F5F3] transition-colors hover:border-[#10B981]/60 hover:text-[#10B981] whitespace-nowrap shrink-0 cursor-pointer"
              >
                <LogIn className="h-3.5 w-3.5" />
                <span>Sign In</span>
              </button>
            ))}

          <button
            type="button"
            onClick={() => onNavigate(activeView === 'tree' ? 'explore' : 'tree')}
            className="hidden sm:inline-flex items-center justify-center rounded-lg bg-[#FF3366] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#E11D48] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF3366] whitespace-nowrap shrink-0 cursor-pointer"
          >
            {activeView === 'tree' ? 'Browse Grid' : 'Open Skill Tree'}
          </button>

          <button
            type="button"
            aria-label="Toggle navigation menu"
            onClick={() => setMobileOpen((prev) => !prev)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-[#A7B5AE] hover:text-white lg:hidden cursor-pointer"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <div className="border-t border-white/10 bg-[#0F1412] px-6 py-4 lg:hidden">
          <div className="flex flex-col gap-3">
            {navItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  onNavigate(item.id);
                  setMobileOpen(false);
                }}
                className={`text-left py-2 text-sm font-medium ${
                  activeView === item.id ? 'text-[#FF3366]' : 'text-[#A7B5AE]'
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
                  className="inline-flex items-center justify-between rounded-lg border border-white/10 bg-[#141B17] px-3 py-2 text-xs font-medium text-[#F1F5F3]"
                >
                  <span>Signed in as {userLabel}</span>
                  <LogOut className="h-3.5 w-3.5 text-[#A7B5AE]" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    onSignIn();
                    setMobileOpen(false);
                  }}
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/15 bg-[#141B17] px-3 py-2 text-xs font-medium text-[#F1F5F3]"
                >
                  <LogIn className="h-3.5 w-3.5" />
                  <span>Sign In with Google</span>
                </button>
              ))}
            <button
              type="button"
              onClick={() => {
                onNavigate('tree');
                setMobileOpen(false);
              }}
              className="mt-1 w-full rounded-lg bg-[#FF3366] px-4 py-2.5 text-center text-xs font-semibold text-white"
            >
              Open Skill Tree
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
