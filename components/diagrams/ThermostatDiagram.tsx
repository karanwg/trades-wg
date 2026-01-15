'use client';

interface DiagramProps {
  hoveredTerminal: string | null;
  selectedTerminals: string[];
  onTerminalClick: (terminalId: string) => void;
  onTerminalHover: (terminalId: string | null) => void;
}

export function ThermostatDiagram({
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
        <linearGradient id="thermoBody" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1e293b" />
          <stop offset="100%" stopColor="#0f172a" />
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
        Thermostat
      </text>
      <text x="150" y="43" textAnchor="middle" fill="#64748b" fontSize="11">
        24V Control Circuit
      </text>

      {/* Thermostat body */}
      <rect x="75" y="55" width="150" height="100" rx="12" fill="url(#thermoBody)" stroke="#334155" strokeWidth="2" />
      
      {/* Display */}
      <rect x="95" y="70" width="110" height="50" rx="6" fill="#0f172a" stroke="#1e293b" />
      <text x="150" y="100" textAnchor="middle" fill="#22d3ee" fontSize="24" fontFamily="monospace">72°F</text>
      <text x="150" y="115" textAnchor="middle" fill="#64748b" fontSize="9">COOLING</text>

      {/* Mode buttons */}
      <circle cx="105" cy="140" r="6" fill="#22c55e" />
      <circle cx="125" cy="140" r="6" fill="#3b82f6" />
      <circle cx="145" cy="140" r="6" fill="#f97316" />

      {/* Sub-base / wiring terminals */}
      <rect x="75" y="170" width="150" height="90" rx="8" fill="#1e293b" stroke="#334155" strokeWidth="2" />
      <text x="150" y="188" textAnchor="middle" fill="#64748b" fontSize="10">WIRING SUB-BASE</text>

      {/* Terminal R */}
      <g 
        className="cursor-pointer"
        onClick={() => onTerminalClick('R')}
        onMouseEnter={() => onTerminalHover('R')}
        onMouseLeave={() => onTerminalHover(null)}
      >
        <circle cx="95" cy="215" r="20" fill="transparent" />
        <circle cx="95" cy="215" r="12" {...getTerminalStyle('R')} filter={selectedTerminals.includes('R') ? 'url(#glow)' : ''} />
        <text x="95" y="219" textAnchor="middle" fill={getLabelStyle('R')} fontSize="10" fontWeight="bold">R</text>
        <text x="95" y="235" textAnchor="middle" fill="#ef4444" fontSize="8">24V</text>
      </g>

      {/* Terminal Y */}
      <g 
        className="cursor-pointer"
        onClick={() => onTerminalClick('Y')}
        onMouseEnter={() => onTerminalHover('Y')}
        onMouseLeave={() => onTerminalHover(null)}
      >
        <circle cx="130" cy="215" r="20" fill="transparent" />
        <circle cx="130" cy="215" r="12" {...getTerminalStyle('Y')} filter={selectedTerminals.includes('Y') ? 'url(#glow)' : ''} />
        <text x="130" y="219" textAnchor="middle" fill={getLabelStyle('Y')} fontSize="10" fontWeight="bold">Y</text>
        <text x="130" y="235" textAnchor="middle" fill="#eab308" fontSize="8">COOL</text>
      </g>

      {/* Terminal G */}
      <g 
        className="cursor-pointer"
        onClick={() => onTerminalClick('G')}
        onMouseEnter={() => onTerminalHover('G')}
        onMouseLeave={() => onTerminalHover(null)}
      >
        <circle cx="165" cy="215" r="20" fill="transparent" />
        <circle cx="165" cy="215" r="12" {...getTerminalStyle('G')} filter={selectedTerminals.includes('G') ? 'url(#glow)' : ''} />
        <text x="165" y="219" textAnchor="middle" fill={getLabelStyle('G')} fontSize="10" fontWeight="bold">G</text>
        <text x="165" y="235" textAnchor="middle" fill="#22c55e" fontSize="8">FAN</text>
      </g>

      {/* Terminal C */}
      <g 
        className="cursor-pointer"
        onClick={() => onTerminalClick('C')}
        onMouseEnter={() => onTerminalHover('C')}
        onMouseLeave={() => onTerminalHover(null)}
      >
        <circle cx="200" cy="215" r="20" fill="transparent" />
        <circle cx="200" cy="215" r="12" {...getTerminalStyle('C')} filter={selectedTerminals.includes('C') ? 'url(#glow)' : ''} />
        <text x="200" y="219" textAnchor="middle" fill={getLabelStyle('C')} fontSize="10" fontWeight="bold">C</text>
        <text x="200" y="235" textAnchor="middle" fill="#64748b" fontSize="8">COM</text>
      </g>

      {/* Info */}
      <text x="150" y="275" textAnchor="middle" fill="#64748b" fontSize="9">
        R: 24V Power | Y: Cooling | G: Fan | C: Common
      </text>
      <text x="150" y="290" textAnchor="middle" fill="#475569" fontSize="8">
        Measure R-C for 24V supply, Y-C for cooling signal
      </text>
    </svg>
  );
}
