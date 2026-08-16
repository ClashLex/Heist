// ─────────────────────────────────────────────────────────────
// Distinctive character art with signature dress colors & visual tells.
// Colors are culturally authentic and consistent across the room scene,
// conversation portraits, and Anu's investigation photographs.
// ─────────────────────────────────────────────────────────────

export interface CharacterPalette {
  primary: string      // Main dress / kurta / saree color
  secondary: string    // Border / shawl / accent color
  trim: string         // Gold / zari / rim highlight
  skin: string         // Warm skin tone
  hair: string         // Hair color / tone
  label: string        // Attire description
}

export const CHARACTER_PALETTES: Record<string, CharacterPalette> = {
  ammachi: {
    primary: '#FFFDF5',    // Traditional Ivory Kasavu Set-Mundu
    secondary: '#F5E6C4',
    trim: '#D4AF37',       // Rich Gold Zari border
    skin: '#8C6239',
    hair: '#8E8E93',       // Grey bun with jasmine
    label: 'Ivory & Gold Kasavu Saree',
  },
  appa: {
    primary: '#1E3A8A',    // Royal Navy Blue Silk Kurta
    secondary: '#2563EB',
    trim: '#93C5FD',       // Crisp trim
    skin: '#85582F',
    hair: '#1E140A',
    label: 'Royal Navy Blue Kurta',
  },
  anu: {
    primary: '#EA580C',    // Vibrant Marigold Yellow-Orange Festive Kurti
    secondary: '#F59E0B',
    trim: '#FDE047',
    skin: '#9C6D42',
    hair: '#1A0F05',
    label: 'Marigold Yellow Kurti',
  },
  kunjumol: {
    primary: '#991B1B',    // Deep Crimson Red Kitchen Saree
    secondary: '#DC2626',
    trim: '#F59E0B',
    skin: '#8C5A2B',
    hair: '#140A02',
    label: 'Crimson Red Saree',
  },
  uncle: {
    primary: '#166534',    // Forest Emerald Green Festive Kurta
    secondary: '#22C55E',
    trim: '#FEF08A',       // Cream & Gold Angavastram
    skin: '#805026',
    hair: '#2A1B0E',
    label: 'Emerald Green Kurta & Shawl',
  },
  neighbour: {
    primary: '#C2410C',    // Warm Terracotta / Rust Orange Shirt
    secondary: '#FB923C',
    trim: '#FEF3C7',       // Folded Kasavu cloth
    skin: '#88582C',
    hair: '#24160A',
    label: 'Terracotta Orange Shirt',
  },
}

interface PresenceProps {
  id: string
  cx: number
  cy: number
  ry: number
}

// A suspect standing in the room with distinct colored attire and character tells.
export function SuspectPresence({ id, cx, cy, ry }: PresenceProps) {
  const palette = CHARACTER_PALETTES[id] ?? {
    primary: '#3A2716',
    secondary: '#4A3220',
    trim: '#C6A430',
    skin: '#8C5A2B',
    hair: '#1A0F05',
    label: '',
  }

  const feet = cy + ry
  const top = cy - ry
  const headR = ry * 0.17
  const headY = top + headR + 3
  const shoulderY = headY + headR + 4

  return (
    <g id={`presence-${id}`}>
      {/* Warm atmospheric halo */}
      <ellipse
        cx={cx}
        cy={cy - ry * 0.1}
        rx={ry * 0.72}
        ry={ry * 1.02}
        fill="rgba(255,206,120,0.18)"
        filter="url(#blurSoft)"
      />

      {/* Ground marker & shadow at feet */}
      <ellipse cx={cx} cy={feet} rx={ry * 0.36} ry={ry * 0.1} fill="rgba(232,216,144,0.25)" />
      <ellipse cx={cx + 4} cy={feet + 2} rx={ry * 0.52} ry={ry * 0.14} fill="#0A0400" opacity="0.48" />

      {/* Main body / dress silhouette in distinctive character color */}
      <path
        d={`M ${cx - ry * 0.34},${feet}
            C ${cx - ry * 0.42},${shoulderY + ry * 0.22} ${cx - ry * 0.38},${shoulderY} ${cx - ry * 0.26},${shoulderY - 2}
            C ${cx - ry * 0.14},${shoulderY - 6} ${cx + ry * 0.14},${shoulderY - 6} ${cx + ry * 0.26},${shoulderY - 2}
            C ${cx + ry * 0.38},${shoulderY} ${cx + ry * 0.42},${shoulderY + ry * 0.22} ${cx + ry * 0.34},${feet} Z`}
        fill={palette.primary}
        stroke="rgba(0,0,0,0.45)"
        strokeWidth="0.8"
      />

      {/* Subtle drape / fold highlight */}
      <path
        d={`M ${cx - ry * 0.08},${shoulderY} L ${cx - ry * 0.12},${feet - ry * 0.08}`}
        stroke={palette.secondary}
        strokeWidth="3.2"
        strokeLinecap="round"
        opacity="0.8"
        fill="none"
      />

      {/* Window rim light on left side */}
      <path
        d={`M ${cx - ry * 0.34},${feet} C ${cx - ry * 0.42},${shoulderY + ry * 0.22} ${cx - ry * 0.38},${shoulderY} ${cx - ry * 0.26},${shoulderY - 2}`}
        stroke="rgba(255,224,140,0.75)"
        strokeWidth="2.2"
        fill="none"
      />

      {/* Neck & Head */}
      <rect x={cx - headR * 0.4} y={headY} width={headR * 0.8} height={shoulderY - headY} fill={palette.skin} />
      <circle cx={cx} cy={headY} r={headR} fill={palette.skin} stroke="rgba(0,0,0,0.3)" strokeWidth="0.6" />

      {/* Hair / Headgear */}
      <path
        d={`M ${cx - headR},${headY} A ${headR} ${headR} 0 0 1 ${cx + headR},${headY}`}
        fill={palette.hair}
      />

      {/* ── Per-suspect distinct clothing features & tells ── */}
      {id === 'ammachi' && (
        <>
          {/* Grey hair bun + fragrant white jasmine string */}
          <circle cx={cx} cy={headY - headR - 1} r={headR * 0.52} fill="#8E8E93" />
          <circle cx={cx} cy={headY - headR - 1} r={headR * 0.62} fill="none" stroke="#FFFFFA" strokeWidth="1.8" strokeDasharray="2,2" />
          {/* Golden Kasavu Zari Shawl draped diagonally */}
          <path
            d={`M ${cx - ry * 0.26},${shoulderY} C ${cx - ry * 0.1},${shoulderY + 12} ${cx + ry * 0.1},${shoulderY + 12} ${cx + ry * 0.26},${shoulderY}`}
            stroke={palette.trim}
            strokeWidth="3.5"
            fill="none"
            opacity="0.95"
          />
          <path
            d={`M ${cx - ry * 0.26},${shoulderY} L ${cx + ry * 0.16},${feet - ry * 0.2}`}
            stroke={palette.trim}
            strokeWidth="2.8"
            fill="none"
            opacity="0.85"
          />
        </>
      )}

      {id === 'appa' && (
        <>
          {/* Silk Kurta buttons & collar */}
          <line x1={cx} y1={shoulderY - 2} x2={cx} y2={shoulderY + ry * 0.3} stroke="#93C5FD" strokeWidth="1.4" />
          {/* Raised arm holding smartphone to ear with screen glow */}
          <path
            d={`M ${cx + ry * 0.22},${shoulderY + 4} L ${cx + headR + 3},${headY + 2}`}
            stroke={palette.primary}
            strokeWidth={ry * 0.14}
            strokeLinecap="round"
          />
          <rect
            x={cx + headR}
            y={headY - 4}
            width={5}
            height={11}
            rx={1.5}
            fill="#0F172A"
            transform={`rotate(16 ${cx + headR} ${headY})`}
          />
          <rect
            x={cx + headR + 0.8}
            y={headY - 2.5}
            width={3.4}
            height={8}
            rx={0.8}
            fill="#38BDF8"
            opacity="0.85"
            transform={`rotate(16 ${cx + headR} ${headY})`}
          />
        </>
      )}

      {id === 'anu' && (
        <>
          {/* Side-swept long hair */}
          <path d={`M ${cx + headR * 0.3},${headY} C ${cx + headR * 1.2},${headY + 12} ${cx + headR * 0.8},${shoulderY + 14} ${cx + headR * 0.4},${shoulderY + 20}`} stroke={palette.hair} strokeWidth="4" fill="none" strokeLinecap="round" />
          {/* Arms holding camera/phone forward framing shots */}
          <path
            d={`M ${cx - ry * 0.22},${shoulderY + 4} L ${cx - 5},${headY + headR + 2}`}
            stroke={palette.primary}
            strokeWidth={ry * 0.13}
            strokeLinecap="round"
          />
          <rect x={cx - 10} y={headY + headR - 3} width={13} height={8} rx={1.8} fill="#0F172A" />
          <circle cx={cx - 3.5} cy={headY + headR + 1} r={2.5} fill="#0284C7" />
          <circle cx={cx - 3.5} cy={headY + headR + 1} r={1} fill="#E0F2FE" />
        </>
      )}

      {id === 'kunjumol' && (
        <>
          {/* Kitchen hearth backlight warmth */}
          <ellipse cx={cx} cy={feet - ry * 0.2} rx={ry * 0.65} ry={ry * 0.5} fill="#FFA020" opacity="0.1" />
          {/* High hair bun tied back */}
          <circle cx={cx + headR * 0.3} cy={headY - headR + 1} r={headR * 0.55} fill={palette.hair} />
          {/* Crimson saree pallu tuck */}
          <path
            d={`M ${cx - ry * 0.2},${shoulderY + 2} Q ${cx},${shoulderY + 16} ${cx + ry * 0.24},${shoulderY + 6}`}
            stroke="#F59E0B"
            strokeWidth="2.2"
            fill="none"
          />
          {/* Right arm extended with serving ladle */}
          <path
            d={`M ${cx + ry * 0.24},${shoulderY + 6} L ${cx + ry * 0.52},${shoulderY - 6}`}
            stroke={palette.skin}
            strokeWidth="2.4"
            strokeLinecap="round"
          />
          <path
            d={`M ${cx + ry * 0.48},${shoulderY - 2} L ${cx + ry * 0.62},${shoulderY - 14}`}
            stroke="#D4AF37"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <ellipse cx={cx + ry * 0.62} cy={shoulderY - 15} rx="4.5" ry="3" fill="#D4AF37" transform={`rotate(-35 ${cx + ry * 0.62} ${shoulderY - 15})`} />
        </>
      )}

      {id === 'uncle' && (
        <>
          {/* Neat grey-flecked mustache */}
          <path d={`M ${cx - 4},${headY + 4} Q ${cx},${headY + 6} ${cx + 4},${headY + 4}`} stroke="#1A0F05" strokeWidth="1.6" fill="none" />
          {/* Cream & Gold Angavastram (shawl) draped over shoulder */}
          <path
            d={`M ${cx - ry * 0.28},${shoulderY - 2} L ${cx + ry * 0.22},${feet - ry * 0.26}`}
            stroke="#FEF08A"
            strokeWidth={ry * 0.12}
            strokeLinecap="round"
            opacity="0.95"
          />
          <path
            d={`M ${cx - ry * 0.28},${shoulderY - 2} L ${cx + ry * 0.22},${feet - ry * 0.26}`}
            stroke="#D4AF37"
            strokeWidth="1.8"
            strokeDasharray="4,2"
            fill="none"
          />
        </>
      )}

      {id === 'neighbour' && (
        <>
          {/* Folded Kasavu cloth draped over forearm */}
          <path
            d={`M ${cx + ry * 0.22},${shoulderY + 4} C ${cx + ry * 0.44},${shoulderY + 14} ${cx + ry * 0.44},${shoulderY + 24} ${cx + ry * 0.3},${shoulderY + 28}`}
            stroke="#FFFBEB"
            strokeWidth="4.5"
            fill="none"
            opacity="0.95"
            strokeLinecap="round"
          />
          <path
            d={`M ${cx + ry * 0.24},${shoulderY + 8} C ${cx + ry * 0.42},${shoulderY + 16} ${cx + ry * 0.42},${shoulderY + 24} ${cx + ry * 0.32},${shoulderY + 26}`}
            stroke="#D4AF37"
            strokeWidth="1.4"
            fill="none"
          />
        </>
      )}
    </g>
  )
}

// Larger, detailed bust for the conversation panel and suspect file dossiers.
export function SuspectBust({ id, size = 76 }: { id: string; size?: number }) {
  const palette = CHARACTER_PALETTES[id] ?? {
    primary: '#3A2716',
    secondary: '#4A3220',
    trim: '#C6A430',
    skin: '#8C5A2B',
    hair: '#1A0F05',
    label: '',
  }

  return (
    <svg width={size} height={size * 1.14} viewBox="0 0 100 114" style={{ display: 'block' }}>
      <defs>
        <radialGradient id={`bustBg-${id}`} cx="46%" cy="36%" r="70%">
          <stop offset="0%" stopColor="#442D1C" />
          <stop offset="100%" stopColor="#1B0F05" />
        </radialGradient>
        <linearGradient id={`bustRim-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgba(255,214,140,0.65)" />
          <stop offset="60%" stopColor="rgba(255,214,140,0)" />
        </linearGradient>
      </defs>

      {/* Frame circle */}
      <circle cx="50" cy="52" r="48" fill={`url(#bustBg-${id})`} stroke={palette.trim} strokeWidth="1.5" strokeOpacity="0.4" />

      {/* Shoulders in character's primary clothing color */}
      <path d="M 14,114 C 16,84 30,72 50,72 C 70,72 84,84 86,114 Z" fill={palette.primary} stroke="rgba(0,0,0,0.4)" strokeWidth="1" />

      {/* Neck */}
      <rect x="42" y="56" width="16" height="18" rx="6" fill={palette.skin} />

      {/* Head */}
      <circle cx="50" cy="46" r="20" fill={palette.skin} />

      {/* Hair base */}
      <path d="M 30,46 A 20 20 0 0 1 70,46 Q 50,30 30,46 Z" fill={palette.hair} />

      {/* Rim light */}
      <path d="M 50,26 A 20 20 0 0 0 30,46" stroke={`url(#bustRim-${id})`} strokeWidth="2.6" fill="none" />

      {/* Character-specific attire details on the bust */}
      {id === 'ammachi' && (
        <>
          {/* Grey hair bun + jasmine */}
          <circle cx="50" cy="28" r="9.5" fill="#8E8E93" />
          <circle cx="50" cy="28" r="11" fill="none" stroke="#FFFFF5" strokeWidth="2.2" strokeDasharray="3,3" />
          {/* Gold border on ivory saree neckline */}
          <path d="M 32,74 C 42,82 58,82 68,74" stroke={palette.trim} strokeWidth="4" fill="none" />
          {/* Traditional earrings */}
          <circle cx="29" cy="50" r="2.2" fill={palette.trim} />
          <circle cx="71" cy="50" r="2.2" fill={palette.trim} />
        </>
      )}

      {id === 'appa' && (
        <>
          {/* Royal blue kurta collar */}
          <path d="M 40,72 L 50,84 L 60,72" stroke="#93C5FD" strokeWidth="2" fill="none" />
          {/* Phone raised to ear with glowing blue screen */}
          <path d="M 68,62 L 78,44" stroke={palette.skin} strokeWidth="9" strokeLinecap="round" />
          <rect x="74" y="36" width="9" height="18" rx="2" fill="#0F172A" transform="rotate(18 78 45)" />
          <rect x="75.5" y="39" width="6" height="12" rx="1.2" fill="#38BDF8" opacity="0.85" transform="rotate(18 78 45)" />
        </>
      )}

      {id === 'anu' && (
        <>
          {/* Yellow kurti festive trim */}
          <path d="M 36,72 Q 50,86 64,72" stroke="#FDE047" strokeWidth="2.5" fill="none" />
          {/* Camera held up */}
          <path d="M 30,62 L 44,50" stroke={palette.skin} strokeWidth="8" strokeLinecap="round" />
          <rect x="36" y="42" width="20" height="14" rx="2.5" fill="#0F172A" />
          <circle cx="46" cy="49" r="4.5" fill="#0284C7" />
          <circle cx="46" cy="49" r="1.8" fill="#E0F2FE" />
          {/* Hair flowing */}
          <path d="M 30,42 C 27,54 29,66 34,70" stroke={palette.hair} strokeWidth="5.5" fill="none" strokeLinecap="round" />
        </>
      )}

      {id === 'kunjumol' && (
        <>
          {/* High bun & red cloth wrap */}
          <circle cx="58" cy="32" r="7" fill={palette.hair} />
          <circle cx="58" cy="32" r="8" fill="none" stroke="#DC2626" strokeWidth="2" />
          {/* Crimson saree pleat & gold border */}
          <path d="M 32,74 L 68,74" stroke="#F59E0B" strokeWidth="2.5" />
          {/* Brass ladle held in hand */}
          <path d="M 70,72 L 86,50" stroke="#D4AF37" strokeWidth="2.8" strokeLinecap="round" />
          <ellipse cx="87" cy="48" rx="6.5" ry="4.5" fill="#D4AF37" transform="rotate(-28 87 48)" />
        </>
      )}

      {id === 'uncle' && (
        <>
          {/* Emerald Green Kurta & cream-gold Angavastram shawl */}
          <path d="M 28,72 L 68,102" stroke="#FEF08A" strokeWidth="10" strokeLinecap="round" />
          <path d="M 28,72 L 68,102" stroke="#D4AF37" strokeWidth="2" strokeDasharray="3,2" fill="none" />
          {/* Mustache */}
          <path d="M 42,48 Q 50,54 58,48" stroke="#140A02" strokeWidth="3" fill="none" strokeLinecap="round" />
        </>
      )}

      {id === 'neighbour' && (
        <>
          {/* Terracotta shirt with folded kasavu towel over shoulder */}
          <path d="M 64,74 C 78,82 82,94 74,104" stroke="#FFFBEB" strokeWidth="7" fill="none" strokeLinecap="round" opacity="0.95" />
          <path d="M 64,74 C 78,82 82,94 74,104" stroke="#D4AF37" strokeWidth="1.8" fill="none" />
        </>
      )}
    </svg>
  )
}

// ─────────────────────────────────────────────────────────────
// Anu's photographs with matching, unmistakable character dress colors!
// ─────────────────────────────────────────────────────────────
export function PhotoArt({ id, w = 200 }: { id: string; w?: number }) {
  const h = w * 0.72

  return (
    <svg width={w} height={h} viewBox="0 0 200 144" style={{ display: 'block' }}>
      <defs>
        <linearGradient id={`ph-${id}`} x1="0%" y1="0%" x2="70%" y2="100%">
          <stop offset="0%" stopColor="#9A7E5C" />
          <stop offset="100%" stopColor="#5A4530" />
        </linearGradient>
        <radialGradient id={`phl-${id}`} cx="24%" cy="16%" r="80%">
          <stop offset="0%" stopColor="#FFE0A0" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#FFE0A0" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Polaroid Background */}
      <rect x="0" y="0" width="200" height="144" fill={`url(#ph-${id})`} />

      {/* ── Photo 01: 10:18 AM — Family preparing the Sadya ── */}
      {id === 'photo-01' && (
        <>
          <rect x="0" y="100" width="200" height="44" fill="#3E2E1C" opacity="0.75" />
          {/* Laid out banana leaves on the mat */}
          <rect x="20" y="94" width="160" height="12" rx="3" fill="#3A7D44" opacity="0.8" />

          {/* Ammachi in Ivory/Gold Saree (#FFFDF5) */}
          <g>
            <ellipse cx="44" cy="80" rx="9" ry="20" fill="#FFFDF5" stroke="#D4AF37" strokeWidth="0.8" />
            <circle cx="44" cy="54" r="8" fill="#8C6239" />
            <circle cx="44" cy="46" r="4.5" fill="#8E8E93" />
          </g>

          {/* Kunjumol in Crimson Red Saree (#991B1B) */}
          <g>
            <ellipse cx="78" cy="80" rx="9" ry="20" fill="#991B1B" />
            <circle cx="78" cy="54" r="8" fill="#8C5A2B" />
            <circle cx="82" cy="48" r="4" fill="#140A02" />
          </g>

          {/* Anu in Marigold Yellow Kurti (#EA580C / #F59E0B) */}
          <g>
            <ellipse cx="112" cy="80" rx="8" ry="19" fill="#EA580C" />
            <circle cx="112" cy="55" r="7.5" fill="#9C6D42" />
          </g>

          {/* Appa in Royal Navy Blue Kurta (#1E3A8A) */}
          <g>
            <ellipse cx="146" cy="78" rx="9" ry="21" fill="#1E3A8A" />
            <circle cx="146" cy="53" r="8" fill="#85582F" />
          </g>

          {/* Golden brass vessels on table */}
          <ellipse cx="60" cy="98" rx="7" ry="3.5" fill="#E6C258" />
          <ellipse cx="128" cy="98" rx="6.5" ry="3.2" fill="#E6C258" />
        </>
      )}

      {/* ── Photo 02: 12:40 PM — The kitchen doorway ── */}
      {/* Visual Proof: A figure in Crimson Red (Kunjumol) carrying a vessel */}
      {id === 'photo-02' && (
        <>
          <rect x="0" y="0" width="76" height="144" fill="#1E0E04" opacity="0.9" />
          {/* Kitchen hearth glow */}
          <rect x="4" y="8" width="68" height="128" fill="#FFA020" opacity="0.18" />
          <ellipse cx="38" cy="72" rx="30" ry="50" fill="#FF8800" opacity="0.1" />

          {/* Kunjumol in her DISTINCTIVE CRIMSON RED SAREE (#991B1B / #DC2626) */}
          <g>
            <ellipse cx="88" cy="84" rx="10" ry="25" fill="#991B1B" stroke="#DC2626" strokeWidth="0.8" />
            <circle cx="88" cy="52" r="9" fill="#8C5A2B" />
            <circle cx="92" cy="46" r="4.5" fill="#140A02" />
            {/* Extended arm in red sleeve holding the brass payasam vessel */}
            <path d="M 96,78 L 120,84" stroke="#8C5A2B" strokeWidth="7" strokeLinecap="round" />
            <path d="M 94,76 L 108,80" stroke="#991B1B" strokeWidth="8" strokeLinecap="round" />
          </g>

          {/* The Brass Payasam Vessel */}
          <ellipse cx="126" cy="86" rx="13" ry="9" fill="#C49A30" />
          <ellipse cx="126" cy="82" rx="13" ry="3.5" fill="#F3D26A" />
          <ellipse cx="126" cy="82" rx="8" ry="2" fill="#FFF2D0" />

          <rect x="0" y="118" width="200" height="26" fill="#3E2E1C" opacity="0.7" />
        </>
      )}

      {/* ── Photo 03: 12:38 PM — The dining leaf, before the meal ── */}
      {id === 'photo-03' && (
        <>
          <rect x="0" y="94" width="200" height="50" fill="#3E2E1C" opacity="0.7" />
          {/* The grand Banana Leaf */}
          <ellipse cx="100" cy="90" rx="88" ry="30" fill="#2C6E44" />
          {/* Rice mount */}
          <ellipse cx="78" cy="88" rx="22" ry="13" fill="#EFE8D6" />

          {/* THE PAYASAM VESSEL — present on the top right of the leaf */}
          <ellipse cx="140" cy="82" rx="17" ry="12" fill="#C49A30" />
          <ellipse cx="140" cy="76" rx="17" ry="4.5" fill="#E6C258" />
          <ellipse cx="136" cy="79" rx="10" ry="5.5" fill="#FDF3DA" />
          <text x="140" y="70" textAnchor="middle" fontFamily="Outfit, sans-serif" fontSize="6.5" fill="#FEE58A" opacity="0.9">12:38</text>
        </>
      )}

      {/* ── Photo 04: 12:42 PM — Family Photograph ── */}
      {/* Visual Proof: Uncle in EMERALD GREEN is already seated; Damp empty payasam spot */}
      {id === 'photo-04' && (
        <>
          <rect x="0" y="104" width="200" height="40" fill="#3E2E1C" opacity="0.7" />
          <ellipse cx="100" cy="100" rx="90" ry="24" fill="#2C6E44" opacity="0.85" />

          {/* Ammachi in Ivory & Gold (#FFFDF5) */}
          <g>
            <ellipse cx="44" cy="76" rx="8" ry="18" fill="#FFFDF5" stroke="#D4AF37" strokeWidth="0.8" />
            <circle cx="44" cy="52" r="7.5" fill="#8C6239" />
          </g>

          {/* Appa in Royal Navy Blue Kurta (#1E3A8A) seated at table */}
          <g>
            <ellipse cx="78" cy="76" rx="8.5" ry="18" fill="#1E3A8A" />
            <circle cx="78" cy="52" r="7.5" fill="#85582F" />
          </g>

          {/* Anu in Marigold Yellow Kurti (#EA580C) */}
          <g>
            <ellipse cx="114" cy="76" rx="8" ry="18" fill="#EA580C" />
            <circle cx="114" cy="52" r="7.5" fill="#9C6D42" />
          </g>

          {/* UNCLE in his EMERALD GREEN KURTA & SHAWL (#166534 / #FEF08A) — ALREADY SEATED! */}
          <g>
            <ellipse cx="164" cy="77" rx="9" ry="19" fill="#166534" stroke="#22C55E" strokeWidth="0.6" />
            <path d="M 158,66 L 170,88" stroke="#FEF08A" strokeWidth="3" strokeLinecap="round" />
            <circle cx="164" cy="53" r="8" fill="#805026" />
          </g>

          {/* The Damp Empty Spot where payasam used to be */}
          <ellipse cx="130" cy="98" rx="14" ry="7" fill="#143D24" opacity="0.75" />
          <circle cx="136" cy="99" r="1.4" fill="#F4EAD2" opacity="0.7" />
        </>
      )}

      {/* Polaroid Gloss & Subtle Frame */}
      <rect x="0" y="0" width="200" height="144" fill={`url(#phl-${id})`} />
      <rect x="0" y="0" width="200" height="144" fill="none" stroke="rgba(255,240,200,0.18)" strokeWidth="2" />
    </svg>
  )
}
