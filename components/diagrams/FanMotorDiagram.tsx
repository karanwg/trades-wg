'use client';

interface DiagramProps {
  hoveredTerminal: string | null;
  selectedTerminals: string[];
  onTerminalClick: (terminalId: string) => void;
  onTerminalHover: (terminalId: string | null) => void;
}

export function FanMotorDiagram({
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
      <defs>
        <linearGradient id="motorBody" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#374151" />
          <stop offset="100%" stopColor="#1f2937" />
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
      <text x="150" y="25" textAnchor="middle" fill="#e2e8f0" fontSize="16" fontWeight="600">
        Fan Motor
      </text>
      <text x="150" y="43" textAnchor="middle" fill="#64748b" fontSize="11">
        PSC Motor with Capacitor
      </text>

      {/* Motor body - side view */}
      <ellipse cx="150" cy="140" rx="70" ry="70" fill="url(#motorBody)" stroke="#4b5563" strokeWidth="2" />
      <ellipse cx="150" cy="140" rx="60" ry="60" fill="#1f2937" stroke="#374151" strokeWidth="1" />
      
      {/* Shaft */}
      <rect x="215" y="135" width="40" height="10" fill="#6b7280" stroke="#4b5563" />
      
      {/* Fan blade indication */}
      <g transform="translate(255, 140)">
        <line x1="0" y1="0" x2="20" y2="-15" stroke="#9ca3af" strokeWidth="2" />
        <line x1="0" y1="0" x2="20" y2="15" stroke="#9ca3af" strokeWidth="2" />
        <line x1="0" y1="0" x2="15" y2="0" stroke="#9ca3af" strokeWidth="2" />
      </g>

      {/* Wiring box */}
      <rect x="80" y="200" width="140" height="70" rx="6" fill="#1e293b" stroke="#374151" strokeWidth="2" />
      <text x="150" y="218" textAnchor="middle" fill="#64748b" fontSize="10">TERMINAL BOX</text>

      {/* L Terminal */}
      <g 
        className="cursor-pointer"
        onClick={() => onTerminalClick('L')}
        onMouseEnter={() => onTerminalHover('L')}
        onMouseLeave={() => onTerminalHover(null)}
      >
        <circle cx="100" cy="245" r="20" fill="transparent" />
        <circle cx="100" cy="245" r="12" {...getTerminalStyle('L')} filter={selectedTerminals.includes('L') ? 'url(#glow)' : ''} />
        <text x="100" y="249" textAnchor="middle" fill={getLabelStyle('L')} fontSize="10" fontWeight="bold">L</text>
      </g>

      {/* N Terminal */}
      <g 
        className="cursor-pointer"
        onClick={() => onTerminalClick('N')}
        onMouseEnter={() => onTerminalHover('N')}
        onMouseLeave={() => onTerminalHover(null)}
      >
        <circle cx="140" cy="245" r="20" fill="transparent" />
        <circle cx="140" cy="245" r="12" {...getTerminalStyle('N')} filter={selectedTerminals.includes('N') ? 'url(#glow)' : ''} />
        <text x="140" y="249" textAnchor="middle" fill={getLabelStyle('N')} fontSize="10" fontWeight="bold">N</text>
      </g>

      {/* CAP Terminal */}
      <g 
        className="cursor-pointer"
        onClick={() => onTerminalClick('CAP')}
        onMouseEnter={() => onTerminalHover('CAP')}
        onMouseLeave={() => onTerminalHover(null)}
      >
        <circle cx="180" cy="245" r="20" fill="transparent" />
        <circle cx="180" cy="245" r="12" {...getTerminalStyle('CAP')} filter={selectedTerminals.includes('CAP') ? 'url(#glow)' : ''} />
        <text x="180" y="249" textAnchor="middle" fill={getLabelStyle('CAP')} fontSize="8" fontWeight="bold">CAP</text>
      </g>

      {/* Motor label */}
      <text x="150" y="140" textAnchor="middle" fill="#6b7280" fontSize="11" fontWeight="500">PSC</text>
      <text x="150" y="155" textAnchor="middle" fill="#4b5563" fontSize="9">MOTOR</text>

      {/* Wire labels */}
      <text x="100" y="275" textAnchor="middle" fill="#ef4444" fontSize="8">HOT</text>
      <text x="140" y="275" textAnchor="middle" fill="#64748b" fontSize="8">NEUT</text>
      <text x="180" y="275" textAnchor="middle" fill="#eab308" fontSize="8">CAP</text>

      {/* Info */}
      <text x="150" y="295" textAnchor="middle" fill="#64748b" fontSize="9">
        L-N: Power | CAP: to run capacitor FAN terminal
      </text>
    </svg>
  );
}
