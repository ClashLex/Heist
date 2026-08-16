// Faceless, warm silhouette art — consistent with the diorama, no cartoon faces.

interface PresenceProps {
  id: string
  cx: number
  cy: number
  ry: number
}

// A suspect standing in the room, seen as a soft shadowed presence.
export function SuspectPresence({ id, cx, cy, ry }: PresenceProps) {
  const feet = cy + ry
  const top = cy - ry
  const headR = ry * 0.17
  const headY = top + headR + 3
  const shoulderY = headY + headR + 4
  const accent = '#C6A430'

  const bodyFill = '#3A2716'
  return (
    <g>
      {/* warm halo so the figure separates from the dark room */}
      <ellipse cx={cx} cy={cy - ry * 0.1} rx={ry * 0.72} ry={ry * 1.02}
        fill="rgba(255,206,120,0.16)" filter="url(#blurSoft)" />
      {/* soft standing marker at the feet */}
      <ellipse cx={cx} cy={feet} rx={ry * 0.34} ry={ry * 0.1} fill="rgba(232,216,144,0.22)" />
      {/* cast shadow */}
      <ellipse cx={cx + 4} cy={feet + 2} rx={ry * 0.5} ry={ry * 0.13} fill="#0A0400" opacity="0.45" />
      {/* body silhouette — warmer and lighter for visibility */}
      <path
        d={`M ${cx - ry * 0.34},${feet}
            C ${cx - ry * 0.4},${shoulderY + ry * 0.2} ${cx - ry * 0.38},${shoulderY} ${cx - ry * 0.26},${shoulderY - 2}
            C ${cx - ry * 0.14},${shoulderY - 6} ${cx + ry * 0.14},${shoulderY - 6} ${cx + ry * 0.26},${shoulderY - 2}
            C ${cx + ry * 0.38},${shoulderY} ${cx + ry * 0.4},${shoulderY + ry * 0.2} ${cx + ry * 0.34},${feet} Z`}
        fill={bodyFill} stroke="rgba(0,0,0,0.4)" strokeWidth="0.6"
      />
      {/* front highlight down the torso */}
      <path
        d={`M ${cx - ry * 0.06},${shoulderY} L ${cx - ry * 0.1},${feet - ry * 0.1}`}
        stroke="rgba(255,224,150,0.28)" strokeWidth="2.2" strokeLinecap="round" fill="none"
      />
      {/* warm rim light on the window side */}
      <path
        d={`M ${cx - ry * 0.34},${feet} C ${cx - ry * 0.4},${shoulderY + ry * 0.2} ${cx - ry * 0.38},${shoulderY} ${cx - ry * 0.26},${shoulderY - 2}`}
        stroke="rgba(255,214,130,0.6)" strokeWidth="1.8" fill="none"
      />
      {/* head */}
      <circle cx={cx} cy={headY} r={headR} fill={bodyFill} stroke="rgba(0,0,0,0.4)" strokeWidth="0.6" />
      <path
        d={`M ${cx - headR},${headY} A ${headR} ${headR} 0 0 1 ${cx},${headY - headR}`}
        stroke="rgba(255,214,130,0.62)" strokeWidth="1.6" fill="none"
      />

      {/* per-suspect tells */}
      {id === 'ammachi' && (
        <>
          {/* grey bun + gold-bordered shawl */}
          <circle cx={cx} cy={headY - headR - 1} r={headR * 0.5} fill="#8C8478" />
          <path d={`M ${cx - ry * 0.26},${shoulderY} C ${cx - ry * 0.1},${shoulderY + 8} ${cx + ry * 0.1},${shoulderY + 8} ${cx + ry * 0.26},${shoulderY}`}
            stroke={accent} strokeWidth="2" fill="none" opacity="0.85" />
        </>
      )}
      {id === 'appa' && (
        // phone raised to the ear
        <>
          <path d={`M ${cx + ry * 0.24},${shoulderY + 4} L ${cx + headR + 1},${headY + 2}`} stroke="#1B0F06" strokeWidth={ry * 0.12} strokeLinecap="round" />
          <rect x={cx + headR - 1} y={headY - 3} width={4} height={9} rx={1.4} fill="#12141C" transform={`rotate(18 ${cx + headR} ${headY})`} />
        </>
      )}
      {id === 'anu' && (
        // phone held up to frame a shot
        <>
          <path d={`M ${cx - ry * 0.22},${shoulderY + 4} L ${cx - 4},${headY + headR}`} stroke="#1B0F06" strokeWidth={ry * 0.11} strokeLinecap="round" />
          <rect x={cx - 8} y={headY + headR - 2} width={10} height={6} rx={1.4} fill="#12141C" />
          <rect x={cx - 7} y={headY + headR - 1} width={8} height={4} rx={1} fill="#2A3A5A" opacity="0.7" />
        </>
      )}
      {id === 'kunjumol' && (
        // hair tied back + a ladle in hand; warm kitchen backlight
        <>
          <ellipse cx={cx} cy={feet - ry * 0.2} rx={ry * 0.6} ry={ry * 0.5} fill="#FFA020" opacity="0.06" />
          <circle cx={cx + headR * 0.4} cy={headY - headR + 1} r={headR * 0.5} fill="#241608" />
          <path d={`M ${cx + ry * 0.26},${shoulderY + 6} L ${cx + ry * 0.5},${shoulderY - 8}`} stroke={accent} strokeWidth="1.6" strokeLinecap="round" />
          <ellipse cx={cx + ry * 0.5} cy={shoulderY - 9} rx="4" ry="2.6" fill={accent} transform={`rotate(-30 ${cx + ry * 0.5} ${shoulderY - 9})`} />
        </>
      )}
      {id === 'uncle' && (
        // shawl draped diagonally over one shoulder
        <path d={`M ${cx - ry * 0.24},${shoulderY - 1} L ${cx + ry * 0.2},${feet - ry * 0.3}`} stroke="#5A3A1E" strokeWidth={ry * 0.1} strokeLinecap="round" opacity="0.9" />
      )}
      {id === 'neighbour' && (
        // stands in the doorway shadow, a folded cloth over the arm
        <>
          <path d={`M ${cx + ry * 0.24},${shoulderY + 2} C ${cx + ry * 0.42},${shoulderY + 12} ${cx + ry * 0.42},${shoulderY + 20} ${cx + ry * 0.3},${shoulderY + 24}`}
            stroke="#EADCB2" strokeWidth="3.4" fill="none" opacity="0.7" strokeLinecap="round" />
        </>
      )}
    </g>
  )
}

// Larger bust for the conversation panel.
export function SuspectBust({ id, size = 76 }: { id: string; size?: number }) {
  const accent = '#C6A430'
  return (
    <svg width={size} height={size * 1.14} viewBox="0 0 100 114" style={{ display: 'block' }}>
      <defs>
        <radialGradient id={`bustBg-${id}`} cx="42%" cy="34%" r="70%">
          <stop offset="0%" stopColor="#4A3220" />
          <stop offset="100%" stopColor="#241608" />
        </radialGradient>
        <linearGradient id={`bustRim-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgba(255,208,120,0.5)" />
          <stop offset="60%" stopColor="rgba(255,208,120,0)" />
        </linearGradient>
      </defs>
      <circle cx="50" cy="52" r="48" fill={`url(#bustBg-${id})`} />
      {/* shoulders */}
      <path d="M 14,114 C 16,86 30,74 50,74 C 70,74 84,86 86,114 Z" fill="#160C04" />
      {/* neck + head */}
      <rect x="43" y="58" width="14" height="16" rx="6" fill="#160C04" />
      <circle cx="50" cy="46" r="19" fill="#160C04" />
      {/* rim light */}
      <path d="M 50,27 A 19 19 0 0 0 31,46" stroke={`url(#bustRim-${id})`} strokeWidth="2.4" fill="none" />
      <path d="M 31,46 A 19 19 0 0 0 34,58" stroke="rgba(255,208,120,0.3)" strokeWidth="2" fill="none" />

      {id === 'ammachi' && (
        <>
          <circle cx="50" cy="30" r="9" fill="#8C8478" />
          <path d="M 33,66 C 42,72 58,72 67,66" stroke={accent} strokeWidth="3" fill="none" />
          <circle cx="40" cy="46" r="3" fill="none" stroke="#3A2A18" strokeWidth="1.2" />
          <circle cx="60" cy="46" r="3" fill="none" stroke="#3A2A18" strokeWidth="1.2" />
        </>
      )}
      {id === 'appa' && (
        <>
          <path d="M 68,60 L 78,44" stroke="#160C04" strokeWidth="9" strokeLinecap="round" />
          <rect x="72" y="38" width="8" height="16" rx="2" fill="#12141C" transform="rotate(20 76 46)" />
          <rect x="73" y="40" width="6" height="12" rx="1.4" fill="#2A3A5A" opacity="0.7" transform="rotate(20 76 46)" />
        </>
      )}
      {id === 'anu' && (
        <>
          <path d="M 32,60 L 44,50" stroke="#160C04" strokeWidth="8" strokeLinecap="round" />
          <rect x="38" y="42" width="18" height="12" rx="2" fill="#12141C" />
          <rect x="40" y="44" width="14" height="8" rx="1.4" fill="#2A3A5A" opacity="0.8" />
          <circle cx="53" cy="48" r="1.4" fill="#0E1420" />
          {/* loose hair to one side */}
          <path d="M 33,40 C 30,52 32,62 36,66" stroke="#241608" strokeWidth="5" fill="none" strokeLinecap="round" />
        </>
      )}
      {id === 'kunjumol' && (
        <>
          <circle cx="58" cy="34" r="6" fill="#241608" />
          <path d="M 70,70 L 84,50" stroke={accent} strokeWidth="2.4" strokeLinecap="round" />
          <ellipse cx="85" cy="48" rx="6" ry="4" fill={accent} transform="rotate(-28 85 48)" />
        </>
      )}
      {id === 'uncle' && (
        <>
          <path d="M 30,72 L 66,98" stroke="#5A3A1E" strokeWidth="8" strokeLinecap="round" />
          <path d="M 40,40 C 44,36 56,36 60,40" stroke="#2A1C10" strokeWidth="2.4" fill="none" />
        </>
      )}
      {id === 'neighbour' && (
        <>
          <circle cx="50" cy="52" r="48" fill="#000" opacity="0.22" />
          <path d="M 66,74 C 80,80 82,92 76,100" stroke="#EADCB2" strokeWidth="6" fill="none" strokeLinecap="round" opacity="0.85" />
        </>
      )}
    </svg>
  )
}

// Anu's photographs — captured moments, not UI thumbnails.
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
      <rect x="0" y="0" width="200" height="144" fill={`url(#ph-${id})`} />

      {id === 'photo-01' && (
        // 10:18 — family preparing the Sadya, wide and warm
        <>
          <rect x="0" y="104" width="200" height="40" fill="#3E2E1C" opacity="0.7" />
          <rect x="24" y="98" width="152" height="10" rx="3" fill="#5E7C3A" opacity="0.7" />
          {[46, 78, 110, 142].map((x, i) => (
            <g key={i} fill="#2E2012">
              <ellipse cx={x} cy={84} rx="8" ry="20" /><circle cx={x} cy={58} r="8" />
            </g>
          ))}
          <ellipse cx="60" cy="100" rx="7" ry="3" fill="#C49A30" />
          <ellipse cx="120" cy="101" rx="6" ry="3" fill="#C49A30" />
        </>
      )}
      {id === 'photo-02' && (
        // 11:52 — kitchen activity; a figure stepping out with a vessel (subtle)
        <>
          <rect x="0" y="0" width="70" height="144" fill="#241608" opacity="0.8" />
          <rect x="4" y="10" width="58" height="120" fill="#FFA020" opacity="0.12" />
          {/* figure in the doorway, carrying a vessel toward the room */}
          <g fill="#1E1208">
            <ellipse cx="86" cy="86" rx="9" ry="24" /><circle cx="86" cy="54" r="9" />
            {/* extended arm holding a brass vessel */}
            <path d="M 94,80 L 116,86" stroke="#1E1208" strokeWidth="7" strokeLinecap="round" />
          </g>
          <ellipse cx="122" cy="88" rx="11" ry="8" fill="#C49A30" />
          <ellipse cx="122" cy="84" rx="11" ry="3" fill="#E6C258" />
          <rect x="0" y="120" width="200" height="24" fill="#3E2E1C" opacity="0.7" />
        </>
      )}
      {id === 'photo-03' && (
        // 12:38 — dining area, payasam vessel present on the leaf
        <>
          <rect x="0" y="96" width="200" height="48" fill="#3E2E1C" opacity="0.7" />
          <ellipse cx="100" cy="92" rx="86" ry="30" fill="#2C6E44" />
          <ellipse cx="80" cy="90" rx="20" ry="12" fill="#EFE8D6" />
          {/* the payasam vessel — brass, still here */}
          <ellipse cx="138" cy="84" rx="16" ry="11" fill="#C49A30" />
          <ellipse cx="138" cy="79" rx="16" ry="4" fill="#E6C258" />
          <ellipse cx="134" cy="82" rx="9" ry="5" fill="#E8D8B8" />
        </>
      )}
      {id === 'photo-04' && (
        // 12:42 — a family photograph; someone already seated at the right (subtle)
        <>
          <rect x="0" y="0" width="200" height="144" fill="url(#ph-photo-04)" />
          <rect x="0" y="108" width="200" height="36" fill="#3E2E1C" opacity="0.7" />
          <ellipse cx="100" cy="104" rx="88" ry="22" fill="#2C6E44" opacity="0.85" />
          {/* seated family */}
          {[54, 90, 126].map((x, i) => (
            <g key={i} fill="#2E2012">
              <ellipse cx={x} cy={78} rx="8" ry="18" /><circle cx={x} cy={54} r="8" />
            </g>
          ))}
          {/* a figure already seated at the far right — dust on his shoes */}
          <g fill="#3A2818">
            <ellipse cx="168" cy="80" rx="8" ry="18" /><circle cx="168" cy="56" r="8" />
          </g>
          {/* an empty, damp spot on the leaf where the payasam was */}
          <ellipse cx="120" cy="100" rx="12" ry="6" fill="#1C4A2C" opacity="0.6" />
        </>
      )}

      <rect x="0" y="0" width="200" height="144" fill={`url(#phl-${id})`} />
      <rect x="0" y="0" width="200" height="144" fill="none" stroke="rgba(255,240,200,0.14)" strokeWidth="2" />
    </svg>
  )
}
