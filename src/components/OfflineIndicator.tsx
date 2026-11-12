import React from 'react';
import { WifiOff, RefreshCw } from 'lucide-react';
import { useOnlineStatus } from '../hooks/useOnlineStatus';

interface OfflineIndicatorProps {
  pendingSync?: boolean;
}

export const OfflineIndicator: React.FC<OfflineIndicatorProps> = ({
  pendingSync = false,
}) => {
  const isOnline = useOnlineStatus();

  if (isOnline && !pendingSync) return null;

  if (!isOnline) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="fixed bottom-4 left-4 z-50 flex max-w-[calc(100vw-9.5rem)] sm:max-w-md items-center gap-2 rounded-xl border border-[#F59E0B]/45 bg-[#141009]/95 px-3 py-2 text-xs font-medium text-[#FDE68A] shadow-xl"
      >
        <WifiOff className="h-3.5 w-3.5 text-[#F59E0B] shrink-0" />
        <span className="truncate sm:hidden">Offline · Local mode</span>
        <span className="hidden sm:inline">Offline Mode — Local progress &amp; cached curriculum active</span>
      </div>
    );
  }

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-4 left-4 z-50 flex max-w-[calc(100vw-9.5rem)] sm:max-w-md items-center gap-2 rounded-xl border border-[#10B981]/45 bg-[#091A16]/95 px-3 py-2 text-xs font-medium text-[#A7F3D0] shadow-xl"
    >
      <RefreshCw className="h-3.5 w-3.5 animate-spin text-[#10B981] shrink-0" />
      <span className="truncate sm:hidden">Syncing progress…</span>
      <span className="hidden sm:inline">Back online — Syncing local progress…</span>
    </div>
  );
};
