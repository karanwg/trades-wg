'use client';

import { useEffect, useRef } from 'react';
import { LogEntry } from '@/lib/sequencing/types';

interface LogPanelProps {
  entries: LogEntry[];
}

function formatTime(date: Date): string {
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });
}

export function LogPanel({ entries }: LogPanelProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new entries are added
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [entries.length]);

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <h3 className="text-white/80 text-sm font-semibold uppercase tracking-wider">
          Log
        </h3>
        <div className="flex-1 h-px bg-white/10" />
        <span className="text-white/40 text-xs">{entries.length} entries</span>
      </div>

      {/* Log entries */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto space-y-2 pr-2"
      >
        {entries.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-white/30 text-sm">No actions yet</p>
          </div>
        ) : (
          entries.map((entry, index) => (
            <div
              key={entry.id}
              className={`
                flex items-start gap-3 p-3 rounded-lg
                ${entry.status === 'success' 
                  ? 'bg-[var(--wg-success)]/10 border border-[var(--wg-success)]/20' 
                  : entry.status === 'error' 
                    ? 'bg-[var(--wg-error)]/10 border border-[var(--wg-error)]/20'
                    : 'bg-white/5 border border-white/5'
                }
                ${index === entries.length - 1 ? 'wg-animate-fade-in' : ''}
              `}
            >
              {/* Status icon */}
              <div className={`
                w-6 h-6 rounded-full flex items-center justify-center shrink-0
                ${entry.status === 'success' 
                  ? 'bg-[var(--wg-success)]/20 text-[var(--wg-success)]' 
                  : entry.status === 'error' 
                    ? 'bg-[var(--wg-error)]/20 text-[var(--wg-error)]'
                    : 'bg-white/10 text-white/60'
                }
              `}>
                {entry.status === 'success' ? (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : entry.status === 'error' ? (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <span className="text-sm">{entry.icon || 'ℹ️'}</span>
                )}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <p className={`
                  text-sm font-medium truncate
                  ${entry.status === 'success' 
                    ? 'text-[var(--wg-success)]' 
                    : entry.status === 'error' 
                      ? 'text-[var(--wg-error)]'
                      : 'text-white/80'
                  }
                `}>
                  {entry.action}
                </p>
                <p className="text-xs text-white/40 mt-0.5">
                  {formatTime(entry.timestamp)}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
