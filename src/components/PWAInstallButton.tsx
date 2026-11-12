import React, { useState } from 'react';
import { Download, Share, X } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { MotionModalFrame } from './ui/WatermelonUI';

export const PWAInstallButton: React.FC = () => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  if (isInstalled) {
    return null;
  }

  if (isInstallable) {
    return (
      <button
        type="button"
        onClick={install}
        className="inline-flex items-center gap-1.5 rounded-lg border border-[#10B981]/50 bg-[#10B981]/15 px-3 py-2 text-xs font-semibold text-[#34D399] transition-colors hover:bg-[#10B981]/25 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#34D399]"
      >
        <Download className="h-3.5 w-3.5" />
        <span>Install App</span>
      </button>
    );
  }

  if (isIOS) {
    return (
      <>
        <button
          type="button"
          onClick={() => setShowIOSGuide(true)}
          className="inline-flex items-center gap-1.5 rounded-lg border border-slate-500/70 bg-[#0E111B] px-3 py-2 text-xs font-medium text-[#F4F1EA] hover:border-[#60A5FA] whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#60A5FA]"
        >
          <Share className="h-3.5 w-3.5" />
          <span>Install</span>
        </button>

        <MotionModalFrame
          isOpen={showIOSGuide}
          onClose={() => setShowIOSGuide(false)}
          labelledBy="ios-install-title"
          maxWidthClass="max-w-sm"
        >
          <div className="space-y-4">
            <div className="flex items-start justify-between gap-3">
              <h3
                id="ios-install-title"
                className="font-display text-xl font-semibold text-[#F4F1EA]"
              >
                Install Polymath Atlas
              </h3>
              <button
                type="button"
                onClick={() => setShowIOSGuide(false)}
                aria-label="Close instructions"
                className="rounded-lg border border-slate-500/70 bg-[#0B0D14] p-1.5 text-slate-300 hover:text-[#F4F1EA] cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#60A5FA]"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <p className="text-sm leading-relaxed text-slate-300">
              1. Tap the <strong className="text-[#F4F1EA]">Share</strong> button in Safari&apos;s toolbar.
              <br />
              2. Scroll down and tap <strong className="text-[#F4F1EA]">Add to Home Screen</strong> for full offline access.
            </p>
            <button
              type="button"
              onClick={() => setShowIOSGuide(false)}
              className="w-full rounded-xl bg-[#2563EB] py-2.5 text-xs font-semibold text-white hover:bg-[#3B82F6] cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#60A5FA]"
            >
              Got it
            </button>
          </div>
        </MotionModalFrame>
      </>
    );
  }

  return null;
};
