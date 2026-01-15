'use client';

interface DiagramProps {
  hoveredTerminal: string | null;
  selectedTerminals: string[];
  onTerminalClick: (terminalId: string) => void;
  onTerminalHover: (terminalId: string | null) => void;
}

export function ContactorDiagram({
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
        <linearGradient id="contactorBody" x1="0%" y1="0%" x2="100%" y2="100%">
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
        Contactor
      </text>
      <text x="150" y="43" textAnchor="middle" fill="#64748b" fontSize="11">
        2-Pole 24V Coil
      </text>

      {/* Contactor body */}
      <rect x="60" y="60" width="180" height="180" rx="8" fill="url(#contactorBody)" stroke="#4b5563" strokeWidth="2" />

      {/* Line side label */}
      <text x="150" y="80" textAnchor="middle" fill="#6b7280" fontSize="10">LINE (Input)</text>

      {/* Input terminals */}
      <g 
        className="cursor-pointer"
        onClick={() => onTerminalClick('L1_IN')}
        onMouseEnter={() => onTerminalHover('L1_IN')}
        onMouseLeave={() => onTerminalHover(null)}
      >
        <rect x="80" y="85" width="50" height="35" rx="4" fill="transparent" />
        <rect x="85" y="90" width="40" height="25" rx="4" {...getTerminalStyle('L1_IN')} filter={selectedTerminals.includes('L1_IN') ? 'url(#glow)' : ''} />
        <text x="105" y="107" textAnchor="middle" fill={getLabelStyle('L1_IN')} fontSize="10" fontWeight="bold">L1</text>
      </g>

      <g 
        className="cursor-pointer"
        onClick={() => onTerminalClick('L2_IN')}
        onMouseEnter={() => onTerminalHover('L2_IN')}
        onMouseLeave={() => onTerminalHover(null)}
      >
        <rect x="170" y="85" width="50" height="35" rx="4" fill="transparent" />
        <rect x="175" y="90" width="40" height="25" rx="4" {...getTerminalStyle('L2_IN')} filter={selectedTerminals.includes('L2_IN') ? 'url(#glow)' : ''} />
        <text x="195" y="107" textAnchor="middle" fill={getLabelStyle('L2_IN')} fontSize="10" fontWeight="bold">L2</text>
      </g>

      {/* Contact symbols */}
      <line x1="105" y1="115" x2="105" y2="135" stroke="#6b7280" strokeWidth="2" />
      <line x1="100" y1="135" x2="110" y2="145" stroke="#6b7280" strokeWidth="2" />
      <line x1="105" y1="150" x2="105" y2="165" stroke="#6b7280" strokeWidth="2" />

      <line x1="195" y1="115" x2="195" y2="135" stroke="#6b7280" strokeWidth="2" />
      <line x1="190" y1="135" x2="200" y2="145" stroke="#6b7280" strokeWidth="2" />
      <line x1="195" y1="150" x2="195" y2="165" stroke="#6b7280" strokeWidth="2" />

      {/* Coil in center */}
      <ellipse cx="150" cy="150" rx="20" ry="30" fill="none" stroke="#8b5cf6" strokeWidth="2" />
      <text x="150" y="155" textAnchor="middle" fill="#8b5cf6" fontSize="10">COIL</text>

      {/* Output terminals */}
      <g 
        className="cursor-pointer"
        onClick={() => onTerminalClick('L1_OUT')}
        onMouseEnter={() => onTerminalHover('L1_OUT')}
        onMouseLeave={() => onTerminalHover(null)}
      >
        <rect x="80" y="170" width="50" height="35" rx="4" fill="transparent" />
        <rect x="85" y="175" width="40" height="25" rx="4" {...getTerminalStyle('L1_OUT')} filter={selectedTerminals.includes('L1_OUT') ? 'url(#glow)' : ''} />
        <text x="105" y="192" textAnchor="middle" fill={getLabelStyle('L1_OUT')} fontSize="10" fontWeight="bold">T1</text>
      </g>

      <g 
        className="cursor-pointer"
        onClick={() => onTerminalClick('L2_OUT')}
        onMouseEnter={() => onTerminalHover('L2_OUT')}
        onMouseLeave={() => onTerminalHover(null)}
      >
        <rect x="170" y="170" width="50" height="35" rx="4" fill="transparent" />
        <rect x="175" y="175" width="40" height="25" rx="4" {...getTerminalStyle('L2_OUT')} filter={selectedTerminals.includes('L2_OUT') ? 'url(#glow)' : ''} />
        <text x="195" y="192" textAnchor="middle" fill={getLabelStyle('L2_OUT')} fontSize="10" fontWeight="bold">T2</text>
      </g>

      {/* Load side label */}
      <text x="150" y="218" textAnchor="middle" fill="#6b7280" fontSize="10">LOAD (Output)</text>

      {/* Coil terminals */}
      <g 
        className="cursor-pointer"
        onClick={() => onTerminalClick('COIL_1')}
        onMouseEnter={() => onTerminalHover('COIL_1')}
        onMouseLeave={() => onTerminalHover(null)}
      >
        <circle cx="75" cy="150" r="18" fill="transparent" />
        <circle cx="75" cy="150" r="10" {...getTerminalStyle('COIL_1')} filter={selectedTerminals.includes('COIL_1') ? 'url(#glow)' : ''} />
        <text x="75" y="154" textAnchor="middle" fill={getLabelStyle('COIL_1')} fontSize="8" fontWeight="bold">A1</text>
      </g>

      <g 
        className="cursor-pointer"
        onClick={() => onTerminalClick('COIL_2')}
        onMouseEnter={() => onTerminalHover('COIL_2')}
        onMouseLeave={() => onTerminalHover(null)}
      >
        <circle cx="225" cy="150" r="18" fill="transparent" />
        <circle cx="225" cy="150" r="10" {...getTerminalStyle('COIL_2')} filter={selectedTerminals.includes('COIL_2') ? 'url(#glow)' : ''} />
        <text x="225" y="154" textAnchor="middle" fill={getLabelStyle('COIL_2')} fontSize="8" fontWeight="bold">A2</text>
      </g>

      {/* Coil connection lines */}
      <line x1="85" y1="150" x2="130" y2="150" stroke="#8b5cf6" strokeWidth="1" strokeDasharray="3 2" />
      <line x1="170" y1="150" x2="215" y2="150" stroke="#8b5cf6" strokeWidth="1" strokeDasharray="3 2" />

      {/* Labels */}
      <text x="75" y="175" textAnchor="middle" fill="#8b5cf6" fontSize="8">24V</text>
      <text x="225" y="175" textAnchor="middle" fill="#8b5cf6" fontSize="8">COM</text>

      <text x="150" y="265" textAnchor="middle" fill="#64748b" fontSize="9">
        A1/A2: Coil (24V control) | L1-T1, L2-T2: Contacts (240V power)
      </text>
    </svg>
  );
}
