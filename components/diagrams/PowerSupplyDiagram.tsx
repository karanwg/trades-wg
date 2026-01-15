'use client';

interface DiagramProps {
  hoveredTerminal: string | null;
  selectedTerminals: string[];
  onTerminalClick: (terminalId: string) => void;
  onTerminalHover: (terminalId: string | null) => void;
}

export function PowerSupplyDiagram({
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
        <linearGradient id="panelBody" x1="0%" y1="0%" x2="100%" y2="100%">
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
        Power Disconnect
      </text>
      <text x="150" y="43" textAnchor="middle" fill="#64748b" fontSize="11">
        240V Single Phase
      </text>

      {/* Disconnect box */}
      <rect x="70" y="60" width="160" height="200" rx="8" fill="url(#panelBody)" stroke="#4b5563" strokeWidth="2" />
      
      {/* Panel door line */}
      <line x1="75" y1="65" x2="75" y2="255" stroke="#4b5563" strokeWidth="1" />

      {/* Breaker handle */}
      <rect x="130" y="80" width="40" height="30" rx="4" fill="#1e293b" stroke="#dc2626" strokeWidth="2" />
      <text x="150" y="100" textAnchor="middle" fill="#dc2626" fontSize="10" fontWeight="bold">ON</text>

      {/* Warning label */}
      <rect x="100" y="120" width="100" height="20" rx="2" fill="#fbbf24" />
      <text x="150" y="134" textAnchor="middle" fill="#000" fontSize="9" fontWeight="bold">⚠ DANGER 240V</text>

      {/* Terminal block */}
      <rect x="90" y="150" width="120" height="80" rx="4" fill="#111827" stroke="#374151" strokeWidth="1" />
      <text x="150" y="165" textAnchor="middle" fill="#6b7280" fontSize="9">TERMINAL BLOCK</text>

      {/* L1 Terminal */}
      <g 
        className="cursor-pointer"
        onClick={() => onTerminalClick('L1')}
        onMouseEnter={() => onTerminalHover('L1')}
        onMouseLeave={() => onTerminalHover(null)}
      >
        <rect x="95" y="170" width="45" height="30" rx="3" fill="transparent" />
        <rect x="100" y="175" width="35" height="20" rx="3" {...getTerminalStyle('L1')} filter={selectedTerminals.includes('L1') ? 'url(#glow)' : ''} />
        <text x="117" y="189" textAnchor="middle" fill={getLabelStyle('L1')} fontSize="10" fontWeight="bold">L1</text>
        <text x="117" y="205" textAnchor="middle" fill="#ef4444" fontSize="8">HOT</text>
      </g>

      {/* L2 Terminal */}
      <g 
        className="cursor-pointer"
        onClick={() => onTerminalClick('L2')}
        onMouseEnter={() => onTerminalHover('L2')}
        onMouseLeave={() => onTerminalHover(null)}
      >
        <rect x="160" y="170" width="45" height="30" rx="3" fill="transparent" />
        <rect x="165" y="175" width="35" height="20" rx="3" {...getTerminalStyle('L2')} filter={selectedTerminals.includes('L2') ? 'url(#glow)' : ''} />
        <text x="182" y="189" textAnchor="middle" fill={getLabelStyle('L2')} fontSize="10" fontWeight="bold">L2</text>
        <text x="182" y="205" textAnchor="middle" fill="#ef4444" fontSize="8">HOT</text>
      </g>

      {/* N Terminal */}
      <g 
        className="cursor-pointer"
        onClick={() => onTerminalClick('N')}
        onMouseEnter={() => onTerminalHover('N')}
        onMouseLeave={() => onTerminalHover(null)}
      >
        <circle cx="120" cy="245" r="20" fill="transparent" />
        <circle cx="120" cy="245" r="12" {...getTerminalStyle('N')} filter={selectedTerminals.includes('N') ? 'url(#glow)' : ''} />
        <text x="120" y="249" textAnchor="middle" fill={getLabelStyle('N')} fontSize="10" fontWeight="bold">N</text>
      </g>

      {/* G Terminal */}
      <g 
        className="cursor-pointer"
        onClick={() => onTerminalClick('G')}
        onMouseEnter={() => onTerminalHover('G')}
        onMouseLeave={() => onTerminalHover(null)}
      >
        <circle cx="180" cy="245" r="20" fill="transparent" />
        <circle cx="180" cy="245" r="12" {...getTerminalStyle('G')} filter={selectedTerminals.includes('G') ? 'url(#glow)' : ''} />
        <text x="180" y="249" textAnchor="middle" fill={getLabelStyle('G')} fontSize="10" fontWeight="bold">G</text>
      </g>

      {/* Labels */}
      <text x="120" y="275" textAnchor="middle" fill="#64748b" fontSize="8">Neutral</text>
      <text x="180" y="275" textAnchor="middle" fill="#22c55e" fontSize="8">Ground</text>

      {/* Voltage indicator */}
      <text x="150" y="295" textAnchor="middle" fill="#64748b" fontSize="9">
        L1-L2: 240V | L1-N: 120V | L2-N: 120V
      </text>
    </svg>
  );
}
