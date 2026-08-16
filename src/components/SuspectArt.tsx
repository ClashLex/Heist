// Character palette — culturally authentic dress for each suspect.
export const CHARACTER_PALETTES: Record<string, { primary: string; accent: string; attire: string }> = {
  ammachi:   { primary: '#FFFDF5', accent: '#D4AF37', attire: 'Ivory & Gold Kasavu Saree' },
  appa:      { primary: '#1E3A8A', accent: '#93C5FD', attire: 'Royal Navy Blue Silk Kurta' },
  anu:       { primary: '#EA580C', accent: '#FDE047', attire: 'Marigold Yellow Festive Kurti' },
  kunjumol:  { primary: '#991B1B', accent: '#F59E0B', attire: 'Crimson Red Cotton Saree' },
  uncle:     { primary: '#166534', accent: '#FEF08A', attire: 'Emerald Green Kurta & Angavastram' },
  neighbour: { primary: '#C2410C', accent: '#FFFBEB', attire: 'Terracotta Orange Shirt' },
}

interface PresenceProps {
  id: string
  cx: number
  cy: number
  ry: number
}

// A suspect standing in the room — rendered in their signature festive attire.
export function SuspectPresence({ id, cx, cy, ry }: PresenceProps) {
  const feet = cy + ry
  const top = cy - ry
  const headR = ry * 0.17
  const headY = top + headR + 3
  const shoulderY = headY + headR + 4

  const pal = CHARACTER_PALETTES[id] ?? { primary: '#3A2716', accent: '#C6A430' }
  const bodyFill = pal.primary
  const accentColor = pal.accent

  // Skin tone — all characters share warm south-Indian complexion.
  const skinFill = '#C68B5A'

  return (
    <g>
      {/* warm halo */}
      <ellipse cx={cx} cy={cy - ry * 0.1} rx={ry * 0.72} ry={ry * 1.02}
        fill="rgba(255,206,120,0.16)" filter="url(#blurSoft)" />
      {/* foot marker */}
      <ellipse cx={cx} cy={feet} rx={ry * 0.34} ry={ry * 0.1} fill="rgba(232,216,144,0.22)" />
      {/* cast shadow */}
      <ellipse cx={cx + 4} cy={feet + 2} rx={ry * 0.5} ry={ry * 0.13} fill="#0A0400" opacity="0.45" />
      {/* body silhouette in character color */}
      <path
        d={`M ${cx - ry * 0.34},${feet}
            C ${cx - ry * 0.4},${shoulderY + ry * 0.2} ${cx - ry * 0.38},${shoulderY} ${cx - ry * 0.26},${shoulderY - 2}
            C ${cx - ry * 0.14},${shoulderY - 6} ${cx + ry * 0.14},${shoulderY - 6} ${cx + ry * 0.26},${shoulderY - 2}
            C ${cx + ry * 0.38},${shoulderY} ${cx + ry * 0.4},${shoulderY + ry * 0.2} ${cx + ry * 0.34},${feet} Z`}
        fill={bodyFill} stroke="rgba(0,0,0,0.35)" strokeWidth="0.6"
      />
      {/* accent trim at shoulder */}
      <path
        d={`M ${cx - ry * 0.26},${shoulderY - 2} C ${cx - ry * 0.1},${shoulderY - 5} ${cx + ry * 0.1},${shoulderY - 5} ${cx + ry * 0.26},${shoulderY - 2}`}
        stroke={accentColor} strokeWidth="1.6" fill="none" opacity="0.85"
      />
      {/* torso highlight */}
      <path
        d={`M ${cx - ry * 0.06},${shoulderY} L ${cx - ry * 0.1},${feet - ry * 0.1}`}
        stroke="rgba(255,255,255,0.14)" strokeWidth="2" strokeLinecap="round" fill="none"
      />
      {/* rim light on window side */}
      <path
        d={`M ${cx - ry * 0.34},${feet} C ${cx - ry * 0.4},${shoulderY + ry * 0.2} ${cx - ry * 0.38},${shoulderY} ${cx - ry * 0.26},${shoulderY - 2}`}
        stroke="rgba(255,214,130,0.5)" strokeWidth="1.6" fill="none"
      />
      {/* head — warm skin */}
      <circle cx={cx} cy={headY} r={headR} fill={skinFill} stroke="rgba(0,0,0,0.3)" strokeWidth="0.5" />
      <path
        d={`M ${cx - headR},${headY} A ${headR} ${headR} 0 0 1 ${cx},${headY - headR}`}
        stroke="rgba(255,214,130,0.5)" strokeWidth="1.4" fill="none"
      />

      {/* per-suspect distinguishing details */}
      {id === 'ammachi' && (
        <>
          {/* silver bun with jasmine */}
          <circle cx={cx} cy={headY - headR - 1} r={headR * 0.55} fill="#B0ACA4" />
          <circle cx={cx + headR * 0.3} cy={headY - headR * 1.5} r={headR * 0.22} fill="#FFFDF0" opacity="0.9" />
          {/* gold kasavu zari band across shoulder */}
          <path d={`M ${cx - ry * 0.26},${shoulderY} C ${cx - ry * 0.1},${shoulderY + 10} ${cx + ry * 0.1},${shoulderY + 10} ${cx + ry * 0.26},${shoulderY}`}
            stroke={accentColor} strokeWidth="2.4" fill="none" opacity="0.9" />
        </>
      )}

      {id === 'appa' && (
        <>
          {/* phone raised to ear with screen glow */}
          <path d={`M ${cx + ry * 0.22},${shoulderY + 5} L ${cx + headR + 1},${headY + 2}`}
            stroke="#0E1420" strokeWidth={ry * 0.12} strokeLinecap="round" />
          <rect x={cx + headR - 1} y={headY - 4} width={5} height={10} rx={1.5}
            fill="#12141C" transform={`rotate(18 ${cx + headR} ${headY})`} />
          <rect x={cx + headR} y={headY - 3} width={3} height={7} rx={1}
            fill="#2A3A5A" opacity="0.8" transform={`rotate(18 ${cx + headR} ${headY})`} />
          {/* sky-blue collar flash */}
          <path d={`M ${cx - ry * 0.1},${shoulderY - 4} L ${cx},${shoulderY + 4} L ${cx + ry * 0.1},${shoulderY - 4}`}
            fill={accentColor} opacity="0.3" />
        </>
      )}

      {id === 'anu' && (
        <>
          {/* camera/phone held up */}
          <path d={`M ${cx - ry * 0.2},${shoulderY + 4} L ${cx - 5},${headY + headR + 1}`}
            stroke="#1B0F06" strokeWidth={ry * 0.11} strokeLinecap="round" />
          <rect x={cx - 9} y={headY + headR - 2} width={11} height={7} rx={1.5} fill="#12141C" />
          <rect x={cx - 8} y={headY + headR - 1} width={9} height={5} rx={1} fill="#2A3A5A" opacity="0.75" />
          {/* bright marigold hem line */}
          <path d={`M ${cx - ry * 0.26},${feet - ry * 0.12} L ${cx + ry * 0.26},${feet - ry * 0.12}`}
            stroke={accentColor} strokeWidth="2" opacity="0.7" />
        </>
      )}

      {id === 'kunjumol' && (
        <>
          {/* high hair knot */}
          <circle cx={cx} cy={headY - headR * 1.3} r={headR * 0.48} fill="#2C1A08" />
          {/* wet hands — ladle held out */}
          <path d={`M ${cx + ry * 0.24},${shoulderY + 8} L ${cx + ry * 0.52},${shoulderY - 6}`}
            stroke="#8A6010" strokeWidth="1.8" strokeLinecap="round" />
          <ellipse cx={cx + ry * 0.53} cy={shoulderY - 7} rx="4.5" ry="3" fill="#C49A30"
            transform={`rotate(-30 ${cx + ry * 0.53} ${shoulderY - 7})`} />
          {/* golden blouse border */}
          <path d={`M ${cx - ry * 0.26},${shoulderY - 1} C ${cx - ry * 0.1},${shoulderY + 5} ${cx + ry * 0.1},${shoulderY + 5} ${cx + ry * 0.26},${shoulderY - 1}`}
            stroke={accentColor} strokeWidth="1.4" fill="none" opacity="0.8" />
        </>
      )}

      {id === 'uncle' && (
        <>
          {/* cream-gold angavastram shawl diagonally across body */}
          <path d={`M ${cx - ry * 0.22},${shoulderY - 2} L ${cx + ry * 0.28},${feet - ry * 0.28}`}
            stroke={accentColor} strokeWidth={ry * 0.12} strokeLinecap="round" opacity="0.88" />
          {/* slight mustache mark */}
          <path d={`M ${cx - headR * 0.5},${headY + headR * 0.3} Q ${cx},${headY + headR * 0.5} ${cx + headR * 0.5},${headY + headR * 0.3}`}
            stroke="#3A2A18" strokeWidth="1.1" fill="none" opacity="0.7" />
        </>
      )}

      {id === 'neighbour' && (
        <>
          {/* folded Kasavu cloth over forearm */}
          <path d={`M ${cx + ry * 0.24},${shoulderY + 2} C ${cx + ry * 0.44},${shoulderY + 14} ${cx + ry * 0.44},${shoulderY + 22} ${cx + ry * 0.3},${shoulderY + 26}`}
            stroke="#EADCB2" strokeWidth="3.6" fill="none" opacity="0.75" strokeLinecap="round" />
          {/* kasavu border stripe */}
          <path d={`M ${cx + ry * 0.25},${shoulderY + 3} C ${cx + ry * 0.46},${shoulderY + 15} ${cx + ry * 0.46},${shoulderY + 23} ${cx + ry * 0.31},${shoulderY + 27}`}
            stroke="#C6A624" strokeWidth="1.2" fill="none" opacity="0.6" strokeLinecap="round" />
        </>
      )}
    </g>
  )
}

// Larger bust for the conversation panel — garment necklines and accessories visible.
export function SuspectBust({ id, size = 76 }: { id: string; size?: number }) {
  const pal = CHARACTER_PALETTES[id] ?? { primary: '#3A2716', accent: '#C6A430' }
  const skinFill = '#C68B5A'

  return (
    <svg width={size} height={size * 1.14} viewBox="0 0 100 114" style={{ display: 'block' }}>
      <defs>
        <radialGradient id={`bustBg-${id}`} cx="42%" cy="34%" r="70%">
          <stop offset="0%"  stopColor="#4A3220" />
          <stop offset="100%" stopColor="#241608" />
        </radialGradient>
        <linearGradient id={`bustRim-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgba(255,208,120,0.45)" />
          <stop offset="60%" stopColor="rgba(255,208,120,0)" />
        </linearGradient>
      </defs>

      {/* Background circle */}
      <circle cx="50" cy="52" r="48" fill={`url(#bustBg-${id})`} />

      {/* Garment — shoulder area in character's primary color */}
      <path d={`M 14,114 C 16,86 30,74 50,74 C 70,74 84,86 86,114 Z`} fill={pal.primary} />
      {/* Accent trim at neckline */}
      <path d={`M 34,76 C 42,70 58,70 66,76`} stroke={pal.accent} strokeWidth="2.4" fill="none" opacity="0.9" />

      {/* neck */}
      <rect x="43" y="58" width="14" height="16" rx="6" fill={skinFill} />
      {/* head */}
      <circle cx="50" cy="46" r="19" fill={skinFill} />
      {/* rim light */}
      <path d="M 50,27 A 19 19 0 0 0 31,46" stroke={`url(#bustRim-${id})`} strokeWidth="2.2" fill="none" />

      {id === 'ammachi' && (
        <>
          {/* silver bun with jasmine */}
          <circle cx="50" cy="28" r="9" fill="#B0ACA4" />
          <circle cx="57" cy="22" r="3" fill="#FFFDF0" opacity="0.9" />
          <circle cx="43" cy="23" r="2.5" fill="#FFFDF0" opacity="0.8" />
          {/* gold zari kasavu border on saree */}
          <path d="M 14,90 L 86,90" stroke={pal.accent} strokeWidth="3.5" opacity="0.7" />
          {/* small stud earrings */}
          <circle cx="31" cy="48" r="2.4" fill={pal.accent} />
          <circle cx="69" cy="48" r="2.4" fill={pal.accent} />
        </>
      )}

      {id === 'appa' && (
        <>
          {/* phone to ear */}
          <path d="M 68,60 L 78,44" stroke={skinFill} strokeWidth="8" strokeLinecap="round" />
          <rect x="72" y="38" width="9" height="17" rx="2.5" fill="#12141C" transform="rotate(20 76 46)" />
          <rect x="73" y="40" width="7" height="13" rx="1.5" fill="#2A3A5A" opacity="0.75" transform="rotate(20 76 46)" />
          {/* sky-blue kurta collar detail */}
          <path d="M 42,68 L 50,78 L 58,68" stroke={pal.accent} strokeWidth="2" fill="none" opacity="0.6" />
        </>
      )}

      {id === 'anu' && (
        <>
          {/* camera at mid-chest */}
          <path d="M 32,62 L 44,52" stroke={skinFill} strokeWidth="7" strokeLinecap="round" />
          <rect x="38" y="44" width="18" height="12" rx="2.5" fill="#12141C" />
          <rect x="40" y="46" width="14" height="8" rx="1.5" fill="#2A3A5A" opacity="0.82" />
          <circle cx="53" cy="50" r="1.5" fill="#0E1420" />
          {/* loose hair one side */}
          <path d="M 33,40 C 29,52 31,64 36,68" stroke="#2C1A0A" strokeWidth="5" fill="none" strokeLinecap="round" />
          {/* bright marigold kurti neckline */}
          <path d="M 38,70 L 50,80 L 62,70" stroke={pal.accent} strokeWidth="2.5" fill="none" opacity="0.75" />
        </>
      )}

      {id === 'kunjumol' && (
        <>
          {/* high hair knot */}
          <circle cx="50" cy="28" r="7.5" fill="#2C1A08" />
          <ellipse cx="50" cy="22" rx="5" ry="3" fill="#241408" />
          {/* ladle visible over shoulder */}
          <path d="M 70,70 L 86,50" stroke="#A67C14" strokeWidth="2.6" strokeLinecap="round" />
          <ellipse cx="87" cy="48" rx="7" ry="4.5" fill="#C49A30" transform="rotate(-28 87 48)" />
          {/* golden blouse border */}
          <path d="M 34,76 C 42,70 58,70 66,76" stroke={pal.accent} strokeWidth="2.4" fill="none" />
        </>
      )}

      {id === 'uncle' && (
        <>
          {/* cream-gold angavastram diagonal across shoulder */}
          <path d="M 28,72 L 70,100" stroke={pal.accent} strokeWidth="9" strokeLinecap="round" opacity="0.85" />
          {/* mustache */}
          <path d="M 40,50 C 44,46 56,46 60,50" stroke="#3A2010" strokeWidth="2.5" fill="none" />
          {/* green kurta emerald garment */}
          <path d="M 14,114 C 16,86 30,74 50,74 C 70,74 84,86 86,114 Z" fill={pal.primary} opacity="0.9" />
        </>
      )}

      {id === 'neighbour' && (
        <>
          {/* slight doorway shadow to suggest exterior */}
          <circle cx="50" cy="52" r="48" fill="#000" opacity="0.18" />
          {/* folded Kasavu cloth over forearm */}
          <path d="M 66,74 C 82,80 84,92 78,102" stroke="#EADCB2" strokeWidth="6.5" fill="none" strokeLinecap="round" opacity="0.88" />
          <path d="M 67,75 C 83,81 85,93 79,103" stroke="#C6A624" strokeWidth="1.4" fill="none" strokeLinecap="round" opacity="0.6" />
        </>
      )}
    </svg>
  )
}

// Anu's photographs — captured moments with character-coded colors.
export function PhotoArt({ id, w = 200 }: { id: string; w?: number }) {
  const h = w * 0.72
  return (
    <svg width={w} height={h} viewBox="0 0 200 144" style={{ display: 'block' }}>
      <defs>
        <linearGradient id={`ph-${id}`} x1="0%" y1="0%" x2="70%" y2="100%">
          <stop offset="0%"   stopColor="#9A7E5C" />
          <stop offset="100%" stopColor="#5A4530" />
        </linearGradient>
        <radialGradient id={`phl-${id}`} cx="24%" cy="16%" r="80%">
          <stop offset="0%"  stopColor="#FFE0A0" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#FFE0A0" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`gardenSky-${id}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%"   stopColor="#7BBDE0" />
          <stop offset="100%" stopColor="#C4E0A0" />
        </linearGradient>
      </defs>

      <rect x="0" y="0" width="200" height="144" fill={`url(#ph-${id})`} />

      {id === 'photo-01' && (
        // 10:18 AM — Sadya preparation, family in their attire colors
        <>
          <rect x="0" y="104" width="200" height="40" fill="#3E2E1C" opacity="0.7" />
          <rect x="24" y="98" width="152" height="10" rx="3" fill="#5E7C3A" opacity="0.7" />
          {/* Ammachi — ivory */}
          <g>
            <ellipse cx="46" cy="84" rx="8" ry="20" fill="#FFFDF5" opacity="0.92" />
            <circle cx="46" cy="58" r="8" fill="#C68B5A" />
            <circle cx="46" cy="50" r="4.5" fill="#B0ACA4" />
          </g>
          {/* Kunjumol — crimson red */}
          <g>
            <ellipse cx="80" cy="82" rx="8" ry="20" fill="#991B1B" opacity="0.9" />
            <circle cx="80" cy="56" r="8" fill="#C68B5A" />
            <circle cx="80" cy="48" r="4" fill="#2C1A08" />
          </g>
          {/* Anu — marigold */}
          <g>
            <ellipse cx="114" cy="84" rx="8" ry="20" fill="#EA580C" opacity="0.88" />
            <circle cx="114" cy="58" r="8" fill="#C68B5A" />
          </g>
          {/* Appa — navy blue */}
          <g>
            <ellipse cx="148" cy="82" rx="8" ry="20" fill="#1E3A8A" opacity="0.9" />
            <circle cx="148" cy="56" r="8" fill="#C68B5A" />
          </g>
          <ellipse cx="60" cy="100" rx="7" ry="3" fill="#C49A30" />
          <ellipse cx="120" cy="101" rx="6" ry="3" fill="#C49A30" />
        </>
      )}

      {id === 'photo-02' && (
        // 12:40 PM — Kunjumol (crimson red) stepping through kitchen doorway with brass vessel
        <>
          {/* dim kitchen interior left */}
          <rect x="0" y="0" width="68" height="144" fill="#241608" opacity="0.85" />
          <rect x="4" y="10" width="56" height="120" fill="#FFA020" opacity="0.10" />
          {/* doorframe */}
          <rect x="64" y="0" width="6" height="144" fill="#1A0E04" opacity="0.9" />
          {/* figure in crimson red saree — unmistakable */}
          <ellipse cx="88" cy="88" rx="10" ry="26" fill="#991B1B" opacity="0.95" />
          <circle  cx="88" cy="56" r="9.5" fill="#C68B5A" />
          {/* high hair knot */}
          <circle  cx="88" cy="46" r="5.5" fill="#2C1A08" />
          {/* extended arm carrying brass vessel */}
          <path d="M 97,80 L 120,88" stroke="#C68B5A" strokeWidth="7" strokeLinecap="round" />
          {/* brass payasam vessel */}
          <ellipse cx="128" cy="91" rx="13" ry="9" fill="#C49A30" />
          <ellipse cx="128" cy="86" rx="13" ry="3.5" fill="#E6C258" />
          <ellipse cx="124" cy="89" rx="8" ry="4.5" fill="#F2E4C4" opacity="0.7" />
          <rect x="0" y="122" width="200" height="22" fill="#3E2E1C" opacity="0.65" />
          {/* golden saree border visible at hem */}
          <path d="M 80,110 C 86,108 94,108 100,110" stroke="#F59E0B" strokeWidth="2" fill="none" opacity="0.8" />
        </>
      )}

      {id === 'photo-03' && (
        // 12:38 PM — dining leaf, payasam vessel still present
        <>
          <rect x="0" y="96" width="200" height="48" fill="#3E2E1C" opacity="0.7" />
          <ellipse cx="100" cy="90" rx="88" ry="30" fill="#2C6E44" />
          <ellipse cx="80" cy="88" rx="22" ry="13" fill="#EFE8D6" />
          {/* rice */}
          <ellipse cx="60" cy="90" rx="16" ry="10" fill="#F5F0E4" opacity="0.9" />
          {/* payasam vessel — brass, still here at 12:38 */}
          <ellipse cx="140" cy="83" rx="18" ry="12" fill="#C49A30" />
          <ellipse cx="140" cy="77" rx="18" ry="4.5" fill="#E6C258" />
          <ellipse cx="136" cy="81" rx="10" ry="6" fill="#F2E4C4" opacity="0.8" />
          {/* serving ladle resting in vessel */}
          <path d="M 148,74 L 158,65" stroke="#C49A30" strokeWidth="2.5" strokeLinecap="round" />
        </>
      )}

      {id === 'photo-04' && (
        // 12:42 PM — family photo; Uncle (emerald green) already seated; damp empty spot
        <>
          <rect x="0" y="108" width="200" height="36" fill="#3E2E1C" opacity="0.7" />
          <ellipse cx="100" cy="104" rx="88" ry="22" fill="#2C6E44" opacity="0.85" />
          {/* seated family — 3 figures */}
          <g>
            <ellipse cx="54" cy="76" rx="8" ry="18" fill="#FFFDF5" opacity="0.88" />
            <circle cx="54" cy="53" r="8" fill="#C68B5A" />
          </g>
          <g>
            <ellipse cx="90" cy="76" rx="8" ry="18" fill="#EA580C" opacity="0.85" />
            <circle cx="90" cy="53" r="8" fill="#C68B5A" />
          </g>
          <g>
            <ellipse cx="126" cy="76" rx="8" ry="18" fill="#1E3A8A" opacity="0.88" />
            <circle cx="126" cy="53" r="8" fill="#C68B5A" />
          </g>
          {/* Uncle — emerald green, already seated at far right before 12:45 */}
          <g>
            <ellipse cx="166" cy="76" rx="8" ry="18" fill="#166534" opacity="0.92" />
            <circle cx="166" cy="53" r="8" fill="#C68B5A" />
            {/* cream angavastram diagonal */}
            <path d="M 159,68 L 172,82" stroke="#FEF08A" strokeWidth="4" strokeLinecap="round" opacity="0.8" />
          </g>
          {/* damp empty spot where the payasam was */}
          <ellipse cx="122" cy="100" rx="13" ry="6.5" fill="#1C4A2C" opacity="0.65" />
          <ellipse cx="122" cy="100" rx="8" ry="4" fill="#1C4A2C" opacity="0.4" />
        </>
      )}

      <rect x="0" y="0" width="200" height="144" fill={`url(#phl-${id})`} />
      <rect x="0" y="0" width="200" height="144" fill="none" stroke="rgba(255,240,200,0.14)" strokeWidth="2" />
    </svg>
  )
}
