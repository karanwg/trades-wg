'use client';

interface DiagramProps {
  hoveredTerminal: string | null;
  selectedTerminals: string[];
  onTerminalClick: (terminalId: string) => void;
  onTerminalHover: (terminalId: string | null) => void;
}

export function CompressorDiagram({
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
        <linearGradient id="compBody" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#374151" />
          <stop offset="50%" stopColor="#1f2937" />
          <stop offset="100%" stopColor="#111827" />
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
        Hermetic Compressor
      </text>
      <text x="150" y="43" textAnchor="middle" fill="#64748b" fontSize="11">
        Single Phase Motor Windings
      </text>

      {/* Compressor body - dome shape */}
      <ellipse cx="150" cy="200" rx="80" ry="30" fill="url(#compBody)" stroke="#4b5563" strokeWidth="2" />
      <path d="M 70 200 L 70 120 Q 70 70 150 70 Q 230 70 230 120 L 230 200" 
            fill="url(#compBody)" stroke="#4b5563" strokeWidth="2" />
      
      {/* Refrigerant lines */}
      <circle cx="100" cy="85" r="8" fill="#1e293b" stroke="#4b5563" strokeWidth="2" />
      <text x="100" y="65" textAnchor="middle" fill="#64748b" fontSize="8">SUCTION</text>
      
      <circle cx="200" cy="85" r="8" fill="#1e293b" stroke="#4b5563" strokeWidth="2" />
      <text x="200" y="65" textAnchor="middle" fill="#64748b" fontSize="8">DISCHARGE</text>

      {/* Terminal box */}
      <rect x="115" y="105" width="70" height="50" rx="4" fill="#1e293b" stroke="#4b5563" strokeWidth="2" />
      <text x="150" y="120" textAnchor="middle" fill="#6b7280" fontSize="8">TERMINALS</text>

      {/* Terminal C (Common) */}
      <g 
        className="cursor-pointer"
        onClick={() => onTerminalClick('C')}
        onMouseEnter={() => onTerminalHover('C')}
        onMouseLeave={() => onTerminalHover(null)}
      >
        <circle cx="130" cy="140" r="18" fill="transparent" />
        <circle cx="130" cy="140" r="10" {...getTerminalStyle('C')} filter={selectedTerminals.includes('C') ? 'url(#glow)' : ''} />
        <text x="130" y="144" textAnchor="middle" fill={getLabelStyle('C')} fontSize="9" fontWeight="bold">C</text>
      </g>

      {/* Terminal R (Run) */}
      <g 
        className="cursor-pointer"
        onClick={() => onTerminalClick('R')}
        onMouseEnter={() => onTerminalHover('R')}
        onMouseLeave={() => onTerminalHover(null)}
      >
        <circle cx="150" cy="140" r="18" fill="transparent" />
        <circle cx="150" cy="140" r="10" {...getTerminalStyle('R')} filter={selectedTerminals.includes('R') ? 'url(#glow)' : ''} />
        <text x="150" y="144" textAnchor="middle" fill={getLabelStyle('R')} fontSize="9" fontWeight="bold">R</text>
      </g>

      {/* Terminal S (Start) */}
      <g 
        className="cursor-pointer"
        onClick={() => onTerminalClick('S')}
        onMouseEnter={() => onTerminalHover('S')}
        onMouseLeave={() => onTerminalHover(null)}
      >
        <circle cx="170" cy="140" r="18" fill="transparent" />
        <circle cx="170" cy="140" r="10" {...getTerminalStyle('S')} filter={selectedTerminals.includes('S') ? 'url(#glow)' : ''} />
        <text x="170" y="144" textAnchor="middle" fill={getLabelStyle('S')} fontSize="9" fontWeight="bold">S</text>
      </g>

      {/* Winding diagram */}
      <g transform="translate(150, 230)">
        <text x="0" y="0" textAnchor="middle" fill="#64748b" fontSize="10">Winding Diagram</text>
        
        {/* Simplified winding schematic */}
        <path d="M -40 20 L -40 35 Q -40 45 -20 45 L 20 45 Q 40 45 40 35 L 40 20" 
              fill="none" stroke="#6b7280" strokeWidth="1.5" />
        <path d="M 0 20 L 0 45" fill="none" stroke="#6b7280" strokeWidth="1.5" />
        
        <text x="-40" y="18" textAnchor="middle" fill="#94a3b8" fontSize="8">C</text>
        <text x="0" y="18" textAnchor="middle" fill="#94a3b8" fontSize="8">R</text>
        <text x="40" y="18" textAnchor="middle" fill="#94a3b8" fontSize="8">S</text>
        
        <text x="-20" y="58" textAnchor="middle" fill="#475569" fontSize="7">RUN</text>
        <text x="20" y="58" textAnchor="middle" fill="#475569" fontSize="7">START</text>
      </g>
    </svg>
  );
}
