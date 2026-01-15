'use client';

interface DiagramProps {
  hoveredTerminal: string | null;
  selectedTerminals: string[];
  onTerminalClick: (terminalId: string) => void;
  onTerminalHover: (terminalId: string | null) => void;
}

export function CapacitorDiagram({
  hoveredTerminal,
  selectedTerminals,
  onTerminalClick,
  onTerminalHover,
}: DiagramProps) {
  const getTerminalStyle = (id: string) => {
    const isSelected = selectedTerminals.includes(id);
    const isHovered = hoveredTerminal === id;
    
    if (isSelected) return { fill: '#06b6d4', stroke: '#22d3ee', strokeWidth: 3 };
    if (isHovered) return { fill: '#475569', stroke: '#94a3b8', strokeWidth: 2 };
    return { fill: '#334155', stroke: '#64748b', strokeWidth: 1 };
  };

  const getLabelStyle = (id: string) => {
    const isSelected = selectedTerminals.includes(id);
    const isHovered = hoveredTerminal === id;
    return isSelected || isHovered ? '#ffffff' : '#94a3b8';
  };

  return (
    <svg viewBox="0 0 300 300" className="w-full h-full">
      {/* Background */}
      <defs>
        <linearGradient id="capBody" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#475569" />
          <stop offset="50%" stopColor="#334155" />
          <stop offset="100%" stopColor="#1e293b" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      {/* Title */}
      <text x="150" y="30" textAnchor="middle" fill="#e2e8f0" fontSize="16" fontWeight="600">
        Dual Run Capacitor
      </text>
      <text x="150" y="48" textAnchor="middle" fill="#64748b" fontSize="11">
        45/5 µF 440VAC
      </text>

      {/* Capacitor body - cylinder */}
      <ellipse cx="150" cy="100" rx="70" ry="20" fill="url(#capBody)" stroke="#64748b" />
      <rect x="80" y="100" width="140" height="120" fill="url(#capBody)" stroke="#64748b" strokeWidth="1" />
      <ellipse cx="150" cy="220" rx="70" ry="20" fill="url(#capBody)" stroke="#64748b" />
      
      {/* Capacitor label on body */}
      <text x="150" y="155" textAnchor="middle" fill="#94a3b8" fontSize="12" fontWeight="500">
        MOTOR RUN
      </text>
      <text x="150" y="172" textAnchor="middle" fill="#64748b" fontSize="10">
        CAP
      </text>
      
      {/* Top plate with terminals */}
      <ellipse cx="150" cy="100" rx="70" ry="20" fill="#1e293b" stroke="#475569" strokeWidth="2" />

      {/* Terminal C (Common) - Center */}
      <g 
        className="cursor-pointer"
        onClick={() => onTerminalClick('C')}
        onMouseEnter={() => onTerminalHover('C')}
        onMouseLeave={() => onTerminalHover(null)}
      >
        {/* Larger invisible hit area */}
        <circle cx="150" cy="85" r="20" fill="transparent" />
        <circle cx="150" cy="85" r="12" {...getTerminalStyle('C')} filter={selectedTerminals.includes('C') ? 'url(#glow)' : ''} />
        <text x="150" y="89" textAnchor="middle" fill={getLabelStyle('C')} fontSize="10" fontWeight="bold">C</text>
        <text x="150" y="65" textAnchor="middle" fill="#94a3b8" fontSize="9">COMMON</text>
      </g>

      {/* Terminal HERM (Hermetic/Compressor) - Left */}
      <g 
        className="cursor-pointer"
        onClick={() => onTerminalClick('HERM')}
        onMouseEnter={() => onTerminalHover('HERM')}
        onMouseLeave={() => onTerminalHover(null)}
      >
        {/* Larger invisible hit area */}
        <circle cx="110" cy="100" r="20" fill="transparent" />
        <circle cx="110" cy="100" r="12" {...getTerminalStyle('HERM')} filter={selectedTerminals.includes('HERM') ? 'url(#glow)' : ''} />
        <text x="110" y="104" textAnchor="middle" fill={getLabelStyle('HERM')} fontSize="8" fontWeight="bold">H</text>
        <text x="75" y="85" textAnchor="middle" fill="#94a3b8" fontSize="9">HERM</text>
        <text x="75" y="97" textAnchor="middle" fill="#64748b" fontSize="8">45µF</text>
      </g>

      {/* Terminal FAN - Right */}
      <g 
        className="cursor-pointer"
        onClick={() => onTerminalClick('FAN')}
        onMouseEnter={() => onTerminalHover('FAN')}
        onMouseLeave={() => onTerminalHover(null)}
      >
        {/* Larger invisible hit area */}
        <circle cx="190" cy="100" r="20" fill="transparent" />
        <circle cx="190" cy="100" r="12" {...getTerminalStyle('FAN')} filter={selectedTerminals.includes('FAN') ? 'url(#glow)' : ''} />
        <text x="190" y="104" textAnchor="middle" fill={getLabelStyle('FAN')} fontSize="8" fontWeight="bold">F</text>
        <text x="225" y="85" textAnchor="middle" fill="#94a3b8" fontSize="9">FAN</text>
        <text x="225" y="97" textAnchor="middle" fill="#64748b" fontSize="8">5µF</text>
      </g>

      {/* Wiring diagram below */}
      <text x="150" y="255" textAnchor="middle" fill="#64748b" fontSize="10">
        Click terminals to select measurement points
      </text>

      {/* Connection hints */}
      <line x1="110" y1="112" x2="110" y2="130" stroke="#475569" strokeWidth="1" strokeDasharray="3 2" />
      <line x1="150" y1="97" x2="150" y2="130" stroke="#475569" strokeWidth="1" strokeDasharray="3 2" />
      <line x1="190" y1="112" x2="190" y2="130" stroke="#475569" strokeWidth="1" strokeDasharray="3 2" />
      
      <text x="110" y="142" textAnchor="middle" fill="#475569" fontSize="8">to Compressor</text>
      <text x="190" y="142" textAnchor="middle" fill="#475569" fontSize="8">to Fan Motor</text>
    </svg>
  );
}
