'use client';

import { LogEntry, LogLevel } from '@/lib/engine';
import { useEffect, useRef } from 'react';

interface LogPanelProps {
  logs: LogEntry[];
  compact?: boolean;
}

const levelStyles: Record<LogLevel, { bg: string; text: string; icon: string }> = {
  info: {
    bg: 'bg-slate-700/30',
    text: 'text-slate-300',
    icon: 'ℹ️',
  },
  warning: {
    bg: 'bg-amber-500/10',
    text: 'text-amber-300',
    icon: '⚠️',
  },
  danger: {
    bg: 'bg-rose-500/10',
    text: 'text-rose-300',
    icon: '🚨',
  },
  success: {
    bg: 'bg-emerald-500/10',
    text: 'text-emerald-300',
    icon: '✓',
  },
};

export function LogPanel({ logs, compact }: LogPanelProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom on new logs
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs.length]);

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });
  };

  if (compact) {
    return (
      <div className="h-full flex flex-col">
        <div className="p-2 border-b border-slate-800/50 shrink-0">
          <span className="text-xs text-slate-500 uppercase tracking-wider">
            Log ({logs.length})
          </span>
        </div>

        <div ref={scrollRef} className="flex-1 overflow-y-auto p-2 space-y-1">
          {logs.length === 0 ? (
            <p className="text-slate-600 text-xs text-center py-4">
              No actions yet
            </p>
          ) : (
            logs.slice(-20).map((log) => {
              const style = levelStyles[log.level];
              return (
                <div
                  key={log.id}
                  className={`${style.bg} rounded px-2 py-1 text-xs`}
                >
                  <div className="flex items-center gap-1">
                    <span className="shrink-0 text-[10px]">{style.icon}</span>
                    <span className={`${style.text} truncate flex-1`}>
                      {log.message}
                    </span>
                    <span className="text-slate-600 text-[10px] shrink-0">
                      {formatTime(log.timestamp)}
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-slate-800/50 shrink-0">
        <h2 className="text-sm font-medium text-slate-300 uppercase tracking-wider flex items-center gap-2">
          <span className="text-blue-400">📜</span>
          Action Log
          <span className="text-xs text-slate-500 font-normal ml-auto">
            {logs.length} entries
          </span>
        </h2>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-2">
        {logs.length === 0 ? (
          <p className="text-slate-500 text-sm text-center py-8">
            No actions recorded yet.
            <br />
            Start by selecting a tool.
          </p>
        ) : (
          logs.map((log) => {
            const style = levelStyles[log.level];
            return (
              <div
                key={log.id}
                className={`${style.bg} rounded-lg p-3 border border-slate-700/20`}
              >
                <div className="flex items-start gap-2">
                  <span className="shrink-0">{style.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className={`text-sm font-medium ${style.text}`}>
                        {log.message}
                      </span>
                      <span className="text-xs text-slate-500 shrink-0">
                        {formatTime(log.timestamp)}
                      </span>
                    </div>
                    {log.details && (
                      <p className="text-xs text-slate-400">{log.details}</p>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
