import { useState, useEffect } from 'react'
import type { InvestigationObject } from '../gameData'
import type { Suspect } from '../suspects'
import { SuspectPresence } from './SuspectArt'

export interface SceneFocus {
  cx: number
  cy: number
  rx: number
  ry: number
  zoom: number
}

interface Props {
  objects: InvestigationObject[]
  suspects: Suspect[]
  inspectedIds: Set<string>
  metSuspectIds: Set<string>
  focus: SceneFocus | null
  onInspect: (id: string) => void
  onApproach: (id: string) => void
  ambientHint: string | null
}

// Leaf geometry — tip to the left, broad to the right (Sadya convention)
const LEAF_CX = 646
const LEAF_MID_Y = 432
const LEAF_RX = 392
const LEAF_HALF = 150

function leafHalf(x: number) {
  const t = (x - LEAF_CX) / (LEAF_RX + 6)
  const clamped = Math.max(-0.999, Math.min(0.999, t))
  return LEAF_HALF * Math.pow(1 - clamped * clamped, 0.62)
}

const VEINS = Array.from({ length: 26 }, (_, i) => {
  const x = 320 + i * 27
  const h = leafHalf(x)
  const lean = h * 0.42
  return {
    topX: x - lean, topY: LEAF_MID_Y - h * 0.9,
    botX: x - lean, botY: LEAF_MID_Y + h * 0.9,
    midX: x,
  }
})

export default function DiningScene({
  objects,
  suspects,
  inspectedIds,
  metSuspectIds,
  focus,
  onInspect,
  onApproach,
  ambientHint,
}: Props) {
  const [showHint, setShowHint] = useState(false)
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const active = focus === null

  useEffect(() => {
    const t = setTimeout(() => setShowHint(true), 1600)
    return () => clearTimeout(t)
  }, [])

  // Cinematic push-in toward the focused object or person.
  const focusTransform = focus ? `scale(${focus.zoom})` : 'scale(1)'
  const focusOrigin = focus
    ? `${(focus.cx / 1400) * 100}% ${(focus.cy / 900) * 100}%`
    : '50% 50%'

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          transform: focusTransform,
          transformOrigin: focusOrigin,
          transition: 'transform 0.7s cubic-bezier(0.22,1,0.36,1)',
        }}
      >
        <svg
          viewBox="0 0 1400 900"
          preserveAspectRatio="xMidYMid slice"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block' }}
        >
          <defs>
            <pattern id="teakFloor" width="118" height="900" patternUnits="userSpaceOnUse">
              <rect width="118" height="900" fill="#231306" />
              <line x1="8"   y1="0" x2="6"   y2="900" stroke="#2E1A08" strokeWidth="1.2" opacity="0.5" />
              <line x1="26"  y1="0" x2="24"  y2="900" stroke="#291508" strokeWidth="0.7" opacity="0.4" />
              <line x1="46"  y1="0" x2="44"  y2="900" stroke="#341C0A" strokeWidth="1.4" opacity="0.45" />
              <line x1="66"  y1="0" x2="64"  y2="900" stroke="#2E1808" strokeWidth="0.9" opacity="0.35" />
              <line x1="84"  y1="0" x2="82"  y2="900" stroke="#291506" strokeWidth="0.6" opacity="0.32" />
              <line x1="102" y1="0" x2="100" y2="900" stroke="#341C0A" strokeWidth="1.1" opacity="0.38" />
              <ellipse cx="34" cy="360" rx="8" ry="4" fill="#180A02" opacity="0.24" transform="rotate(2 34 360)" />
              <ellipse cx="92" cy="640" rx="6" ry="3" fill="#180A02" opacity="0.20" />
            </pattern>

            <pattern id="matWeave" width="20" height="20" patternUnits="userSpaceOnUse">
              <rect width="20" height="20" fill="#B49062" />
              <rect x="0" y="0" width="10" height="10" fill="#C4A072" opacity="0.5" />
              <rect x="10" y="10" width="10" height="10" fill="#C4A072" opacity="0.5" />
              <rect x="0" y="0" width="2.4" height="20" fill="#9A6E3C" opacity="0.2" />
              <rect x="10" y="0" width="2.4" height="20" fill="#9A6E3C" opacity="0.16" />
              <rect x="0" y="0" width="20" height="2.4" fill="#9A6E3C" opacity="0.2" />
              <rect x="0" y="10" width="20" height="2.4" fill="#9A6E3C" opacity="0.16" />
            </pattern>

            <pattern id="leafTexture" width="46" height="34" patternUnits="userSpaceOnUse" patternTransform="rotate(-24)">
              <rect width="46" height="34" fill="none" />
              <ellipse cx="12" cy="10" rx="10" ry="2.4" fill="#ffffff" opacity="0.03" />
              <ellipse cx="30" cy="24" rx="12" ry="2.2" fill="#000000" opacity="0.035" />
            </pattern>

            <radialGradient id="windowLight" cx="12%" cy="7%" r="60%">
              <stop offset="0%"   stopColor="#FFE488" stopOpacity="0.40" />
              <stop offset="30%"  stopColor="#FFC040" stopOpacity="0.18" />
              <stop offset="66%"  stopColor="#FF8E22" stopOpacity="0.06" />
              <stop offset="100%" stopColor="#FF6010" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="lightShaft" x1="0%" y1="0%" x2="80%" y2="100%">
              <stop offset="0%"   stopColor="#FFE080" stopOpacity="0.06" />
              <stop offset="100%" stopColor="#FFE080" stopOpacity="0" />
            </linearGradient>
            <radialGradient id="sadyaFocus" cx="46%" cy="50%" r="42%">
              <stop offset="0%"   stopColor="#FFE9A8" stopOpacity="0.10" />
              <stop offset="100%" stopColor="#FFE9A8" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="vignette" cx="48%" cy="50%" r="72%" gradientUnits="objectBoundingBox">
              <stop offset="22%"  stopColor="#080300" stopOpacity="0" />
              <stop offset="100%" stopColor="#080300" stopOpacity="0.62" />
            </radialGradient>

            <linearGradient id="leafGrad" x1="6%" y1="10%" x2="92%" y2="90%">
              <stop offset="0%"   stopColor="#4C9464" />
              <stop offset="30%"  stopColor="#398A55" />
              <stop offset="70%"  stopColor="#2C6E44" />
              <stop offset="100%" stopColor="#204E30" />
            </linearGradient>
            <linearGradient id="leafSheen" x1="10%" y1="0%" x2="60%" y2="100%">
              <stop offset="0%"   stopColor="rgba(255,255,255,0.13)" />
              <stop offset="40%"  stopColor="rgba(255,255,255,0.04)" />
              <stop offset="100%" stopColor="rgba(0,0,0,0.06)" />
            </linearGradient>

            <radialGradient id="riceGrad" cx="38%" cy="26%" r="70%">
              <stop offset="0%"   stopColor="#FBF8F0" />
              <stop offset="55%"  stopColor="#EFE8D6" />
              <stop offset="100%" stopColor="#DCD0B4" />
            </radialGradient>
            <radialGradient id="sambarGrad" cx="34%" cy="26%" r="72%">
              <stop offset="0%"   stopColor="#D86428" />
              <stop offset="60%"  stopColor="#A83C16" />
              <stop offset="100%" stopColor="#88290A" />
            </radialGradient>
            <radialGradient id="moruGrad" cx="38%" cy="28%" r="70%">
              <stop offset="0%"   stopColor="#FBFBEC" />
              <stop offset="100%" stopColor="#E8DEC6" />
            </radialGradient>
            <radialGradient id="erisseryGrad" cx="40%" cy="30%" r="68%">
              <stop offset="0%"   stopColor="#E0972A" />
              <stop offset="100%" stopColor="#B26410" />
            </radialGradient>
            <radialGradient id="olanGrad" cx="42%" cy="32%" r="66%">
              <stop offset="0%"   stopColor="#EDEEDC" />
              <stop offset="100%" stopColor="#CFD4B4" />
            </radialGradient>
            <radialGradient id="pachadiGrad" cx="40%" cy="30%" r="68%">
              <stop offset="0%"   stopColor="#F4E6E0" />
              <stop offset="100%" stopColor="#E0B8B0" />
            </radialGradient>
            <linearGradient id="brassGrad" x1="14%" y1="0%" x2="86%" y2="100%">
              <stop offset="0%"   stopColor="#E6C258" />
              <stop offset="40%"  stopColor="#C49A30" />
              <stop offset="74%"  stopColor="#A67C16" />
              <stop offset="100%" stopColor="#845E10" />
            </linearGradient>
            <linearGradient id="steelGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%"   stopColor="#A0A0A0" />
              <stop offset="34%"  stopColor="#EBEBEB" />
              <stop offset="64%"  stopColor="#C6C6C6" />
              <stop offset="100%" stopColor="#888888" />
            </linearGradient>

            <radialGradient id="payasamDrop" cx="40%" cy="34%" r="66%">
              <stop offset="0%"   stopColor="#F2E4C4" />
              <stop offset="100%" stopColor="#D4B382" />
            </radialGradient>
            <radialGradient id="dampLeaf" cx="50%" cy="48%" r="52%">
              <stop offset="0%"   stopColor="#1C4A2C" stopOpacity="0.34" />
              <stop offset="60%"  stopColor="#224E30" stopOpacity="0.16" />
              <stop offset="100%" stopColor="#2C6E44" stopOpacity="0" />
            </radialGradient>

            <filter id="leafShadow" x="-8%" y="-10%" width="120%" height="140%">
              <feDropShadow dx="6" dy="20" stdDeviation="17" floodColor="#0C0400" floodOpacity="0.55" />
            </filter>
            <filter id="softShadow" x="-16%" y="-18%" width="145%" height="155%">
              <feDropShadow dx="2" dy="6" stdDeviation="8" floodColor="#0C0400" floodOpacity="0.36" />
            </filter>
            <filter id="faintShadow" x="-24%" y="-24%" width="158%" height="165%">
              <feDropShadow dx="1" dy="3" stdDeviation="4.5" floodColor="#0C0400" floodOpacity="0.28" />
            </filter>
            <filter id="foodShadow" x="-30%" y="-24%" width="165%" height="165%">
              <feDropShadow dx="1" dy="4" stdDeviation="3.5" floodColor="#0C0400" floodOpacity="0.32" />
            </filter>
            <filter id="blurSoft" x="-30%" y="-30%" width="165%" height="165%">
              <feGaussianBlur stdDeviation="5" />
            </filter>
            <filter id="blurDrop" x="-25%" y="-25%" width="155%" height="155%">
              <feGaussianBlur stdDeviation="2.6" />
            </filter>
            <filter id="phoneGlow" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="3" />
            </filter>

            {/* Spotlight dim, centred on the focused subject */}
            {focus && (
              <radialGradient
                id="spot"
                cx={focus.cx}
                cy={focus.cy}
                r={Math.max(focus.rx, focus.ry) * 2.6 + 150}
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0%"  stopColor="#0A0400" stopOpacity="0" />
                <stop offset="52%" stopColor="#0A0400" stopOpacity="0" />
                <stop offset="100%" stopColor="#0A0400" stopOpacity="0.74" />
              </radialGradient>
            )}
          </defs>

          {/* ═══ FLOOR ═══ */}
          <rect x="0" y="0" width="1400" height="900" fill="url(#teakFloor)" />
          <rect x="0" y="0" width="1400" height="900" fill="#3C1E08" opacity="0.2" />

          {/* ═══ ROOM ═══ */}
          <rect x="0" y="0" width="1400" height="72" fill="#191008" opacity="0.94" />
          <rect x="0" y="68" width="1400" height="5" fill="#080400" opacity="0.6" />
          <line x1="0" y1="22" x2="1400" y2="22" stroke="#2A1508" strokeWidth="1" opacity="0.4" />
          <line x1="0" y1="48" x2="1400" y2="48" stroke="#2A1508" strokeWidth="0.7" opacity="0.28" />

          {/* Kitchen doorway with warm interior glow */}
          <rect x="1238" y="72" width="86" height="330" fill="#160A02" opacity="0.8" />
          <rect x="1240" y="74" width="82" height="326" fill="#FFA020" opacity="0.05" />
          {/* faint figure moving in the warm kitchen */}
          <ellipse cx="1276" cy="196" rx="20" ry="40" fill="#0E0600" opacity="0.5" filter="url(#blurSoft)" />
          <ellipse cx="1276" cy="150" rx="12" ry="14" fill="#0E0600" opacity="0.42" filter="url(#blurDrop)" />
          <rect x="1232" y="72" width="6" height="336" fill="#251408" opacity="0.8" />
          <rect x="1232" y="72" width="98" height="6" fill="#080400" opacity="0.5" />
          <rect x="1324" y="72" width="76" height="828" fill="#211208" opacity="0.5" />
          <rect x="1318" y="72" width="8" height="828" fill="#080400" opacity="0.42" />
          <rect x="0" y="72" width="66" height="828" fill="#140800" opacity="0.4" />

          {/* ═══ WINDOW LIGHT ═══ */}
          <rect x="0" y="0" width="1400" height="900" fill="url(#windowLight)" />
          <polygon points="0,72 300,72 470,900 0,900" fill="url(#lightShaft)" />
          <ellipse cx="250" cy="480" rx="280" ry="250" fill="#FFD860" opacity="0.028" />

          {/* ═══ MAT ═══ */}
          <rect x="196" y="222" width="1012" height="472" rx="8"
            fill="url(#matWeave)" opacity="0.8" filter="url(#softShadow)" />
          <rect x="196" y="222" width="1012" height="472" rx="8" fill="#8A5E28" opacity="0.15" />
          <rect x="196" y="222" width="1012" height="472" rx="8"
            fill="none" stroke="#9C7038" strokeWidth="4" opacity="0.34" />
          <rect x="196" y="222" width="1012" height="472" rx="8" fill="#160A02" opacity="0.2"
            style={{ mixBlendMode: 'multiply' }} />

          <rect x="0" y="0" width="1400" height="900" fill="url(#sadyaFocus)" />

          {/* ═══ DROPLET TRAIL — from the leaf toward the kitchen ═══ */}
          {([
            [1024, 356, 3.4], [1052, 344, 3.1], [1082, 336, 2.8], [1112, 326, 2.5],
            [1146, 318, 2.2], [1180, 312, 1.9], [1214, 306, 1.7], [1244, 302, 1.5],
          ] as [number, number, number][]).map(([x, y, r], i) => (
            <g key={i}>
              <ellipse cx={x} cy={y} rx={r} ry={r * 0.66} fill="rgba(206,176,128,0.5)" filter="url(#blurDrop)" />
              <ellipse cx={x - r * 0.3} cy={y - r * 0.3} rx={r * 0.4} ry={r * 0.28} fill="rgba(248,238,214,0.5)" />
            </g>
          ))}

          {/* ═══ BANANA LEAF ═══ */}
          <ellipse cx="648" cy="458" rx="392" ry="150" fill="#0C0400" opacity="0.32" filter="url(#blurSoft)" />
          <path
            d="M 258,436 C 262,392 286,340 356,314 C 430,287 540,276 654,278 C 772,281 878,296 962,326 C 1010,344 1036,388 1038,432 C 1040,476 1014,520 964,540 C 878,570 772,584 654,586 C 540,588 430,577 356,550 C 286,524 262,480 258,436 Z"
            fill="url(#leafGrad)" filter="url(#leafShadow)" />
          <path
            d="M 258,436 C 262,392 286,340 356,314 C 430,287 540,276 654,278 C 772,281 878,296 962,326 C 1010,344 1036,388 1038,432 C 1040,476 1014,520 964,540 C 878,570 772,584 654,586 C 540,588 430,577 356,550 C 286,524 262,480 258,436 Z"
            fill="url(#leafTexture)" />
          <path
            d="M 258,436 C 262,392 286,340 356,314 C 430,287 540,276 654,278 C 772,281 878,296 962,326 C 1010,344 1036,388 1038,432 C 1040,476 1014,520 964,540 C 878,570 772,584 654,586 C 540,588 430,577 356,550 C 286,524 262,480 258,436 Z"
            fill="url(#leafSheen)" />

          <g opacity="0.9">
            {VEINS.map((v, i) => (
              <g key={i}>
                <line x1={v.midX} y1={LEAF_MID_Y - 2} x2={v.topX} y2={v.topY} stroke="rgba(255,255,255,0.06)" strokeWidth="0.9" />
                <line x1={v.midX} y1={LEAF_MID_Y + 2} x2={v.botX} y2={v.botY} stroke="rgba(0,0,0,0.05)" strokeWidth="0.9" />
              </g>
            ))}
          </g>
          <path d="M 262,434 C 470,428 660,426 1034,432" stroke="#6ABE84" strokeWidth="3" fill="none" opacity="0.22" />
          <path d="M 262,436 C 470,431 660,429 1034,435" stroke="#123020" strokeWidth="2" fill="none" opacity="0.24" />

          {/* ═══ THE SADYA ═══ */}
          {([
            [316,392,14,5.5,18],[330,408,12,4.6,-24],[312,424,13,5,10],
            [332,438,11,4.4,36],[318,450,12,4.8,-8],[344,420,11,4.4,52],
          ] as [number,number,number,number,number][]).map(([cx,cy,rx,ry,rot],i)=>(
            <g key={i} filter="url(#faintShadow)">
              <path d={`M ${-rx},0 Q 0,${-ry*1.7} ${rx},0 Q 0,${ry*0.7} ${-rx},0 Z`}
                transform={`translate(${cx} ${cy}) rotate(${rot})`} fill="#D2A018" opacity="0.9" />
              <path d={`M ${-rx*0.7},${-ry*0.3} Q 0,${-ry*1.3} ${rx*0.7},${-ry*0.3}`}
                transform={`translate(${cx} ${cy}) rotate(${rot})`} stroke="rgba(248,224,140,0.6)" strokeWidth="1.1" fill="none" />
            </g>
          ))}
          {([[356,344,11,5,20],[372,336,10,4.4,-16],[362,356,9,4,42]] as [number,number,number,number,number][]).map(([cx,cy,rx,ry,rot],i)=>(
            <g key={i} filter="url(#faintShadow)">
              <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill="#5A3212" transform={`rotate(${rot} ${cx} ${cy})`} />
              <ellipse cx={cx-rx*0.3} cy={cy-ry*0.3} rx={rx*0.5} ry={ry*0.4} fill="rgba(160,96,32,0.5)" transform={`rotate(${rot} ${cx} ${cy})`} />
            </g>
          ))}
          <path d="M 424,332 C 424,306 452,290 486,292 C 522,294 546,312 544,336 C 542,358 520,374 488,372 C 454,370 430,354 426,340 C 424,336 424,334 424,332 Z" fill="#DCC060" opacity="0.9" filter="url(#foodShadow)" />
          <path d="M 424,332 C 424,306 452,290 486,292 C 470,300 452,312 448,336 C 446,350 452,362 468,370 C 448,368 430,354 426,340 C 424,336 424,334 424,332 Z" fill="#C8A840" opacity="0.5" />
          {([[452,318],[478,308],[506,320],[464,340],[492,344],[520,332],[476,356]] as [number,number][]).map(([x,y],i)=>(
            <ellipse key={i} cx={x} cy={y} rx={2.6} ry={1.8} fill="#9C7A22" opacity="0.4" transform={`rotate(${i*40} ${x} ${y})`} />
          ))}
          <path d="M 430,330 C 434,308 458,294 486,295" stroke="rgba(252,238,150,0.42)" strokeWidth="1.4" fill="none" />

          {([[582,308,13,7,-18],[600,320,12,6.6,14],[576,326,11,6,32]] as [number,number,number,number,number][]).map(([cx,cy,rx,ry,rot],i)=>(
            <g key={i} transform={`rotate(${rot} ${cx} ${cy})`} filter="url(#faintShadow)">
              <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill="#E8CE58" />
              <ellipse cx={cx} cy={cy} rx={rx*0.86} ry={ry*0.82} fill="#F0DC7C" />
              <circle cx={cx-2} cy={cy} r={0.9} fill="#8A6A1A" opacity="0.6" />
              <circle cx={cx+2} cy={cy-1} r={0.9} fill="#8A6A1A" opacity="0.6" />
              <circle cx={cx} cy={cy+2} r={0.9} fill="#8A6A1A" opacity="0.6" />
            </g>
          ))}

          <path d="M 642,318 C 648,308 662,306 670,312 C 678,318 677,330 668,336 C 659,341 645,338 641,328 C 639,323 639,321 642,318 Z" fill="#6E240E" opacity="0.94" filter="url(#faintShadow)" />
          <ellipse cx="653" cy="322" rx="4.5" ry="3" fill="#A0361A" opacity="0.6" transform="rotate(20 653 322)" />
          <ellipse cx="662" cy="329" rx="3" ry="2" fill="#C2542C" opacity="0.5" transform="rotate(-14 662 329)" />
          <ellipse cx="649" cy="330" rx="2.4" ry="1.6" fill="#8A2E12" opacity="0.7" />
          <ellipse cx="656" cy="326" rx="17" ry="9" fill="#7C2810" opacity="0.16" transform="rotate(-8 656 326)" />

          <path d="M 700,320 C 704,313 714,312 719,317 C 724,322 722,331 715,334 C 708,337 699,333 697,326 C 696,323 697,321 700,320 Z" fill="#3E2410" opacity="0.92" filter="url(#faintShadow)" />
          <ellipse cx="708" cy="322" rx="3.4" ry="2" fill="#6A3C18" opacity="0.55" transform="rotate(16 708 322)" />

          <path d="M 742,320 C 746,314 752,314 756,318 L 749,328 C 744,326 741,323 742,320 Z" fill="#B9D24A" opacity="0.9" filter="url(#faintShadow)" />
          <path d="M 744,320 L 752,317" stroke="rgba(255,255,255,0.5)" strokeWidth="1" />
          <ellipse cx="736" cy="326" rx="6" ry="3" fill="#F4F0E4" opacity="0.5" />

          <path d="M 762,332 C 770,320 790,316 806,321 C 820,326 824,338 818,349 C 812,360 794,363 778,358 C 762,353 756,343 758,336 C 758,334 760,333 762,332 Z" fill="url(#pachadiGrad)" opacity="0.92" filter="url(#foodShadow)" />
          {([[774,332],[790,328],[804,334],[782,344],[800,346]] as [number,number][]).map(([x,y],i)=>(
            <circle key={i} cx={x} cy={y} r={1.6} fill={["#C87868","#E0A090","#B85848"][i%3]} opacity="0.7" />
          ))}
          <ellipse cx="778" cy="330" rx="9" ry="4" fill="rgba(255,255,255,0.4)" transform="rotate(-10 778 330)" />

          <path d="M 830,340 C 838,328 858,324 874,329 C 888,334 892,346 886,357 C 880,368 862,371 846,366 C 830,361 824,351 826,344 C 826,342 828,341 830,340 Z" fill="#EEEAD8" opacity="0.92" filter="url(#foodShadow)" />
          {([[842,340],[858,336],[872,342],[850,352],[868,354],[836,348]] as [number,number][]).map(([x,y],i)=>(
            <ellipse key={i} cx={x} cy={y} rx={3} ry={1.6} fill={["#9AB07C","#C8CAB0","#6E8A4E"][i%3]} opacity="0.6" transform={`rotate(${i*30} ${x} ${y})`} />
          ))}
          <ellipse cx="846" cy="338" rx="10" ry="4" fill="rgba(255,255,255,0.42)" transform="rotate(-8 846 338)" />

          {/* rice */}
          <ellipse cx="616" cy="454" rx="90" ry="58" fill="#100500" opacity="0.16" filter="url(#blurDrop)" />
          <path d="M 536,442 C 540,408 566,384 606,378 C 646,372 682,384 700,404 C 718,424 715,454 697,472 C 679,490 646,496 610,491 C 574,486 538,468 536,442 Z" fill="url(#riceGrad)" filter="url(#foodShadow)" />
          <path d="M 566,398 C 584,384 618,381 642,391 C 620,382 586,383 566,398 Z" fill="rgba(255,253,246,0.66)" />
          {(() => {
            const grains: [number, number][] = []
            const rows = [
              { y: 402, x0: 578, n: 7 }, { y: 416, x0: 566, n: 9 }, { y: 431, x0: 560, n: 10 },
              { y: 446, x0: 566, n: 10 }, { y: 461, x0: 574, n: 9 }, { y: 475, x0: 586, n: 7 }, { y: 486, x0: 600, n: 5 },
            ]
            rows.forEach((r) => { for (let i = 0; i < r.n; i++) grains.push([r.x0 + i * 15 + (i % 2) * 4, r.y + (i % 3)]) })
            return grains.map(([x, y], i) => (
              <ellipse key={i} cx={x} cy={y} rx="3" ry="1.4" fill={i % 5 === 0 ? 'rgba(255,255,250,0.8)' : 'rgba(198,188,162,0.6)'} transform={`rotate(${(i * 53) % 180} ${x} ${y})`} />
            ))
          })()}

          {/* avial */}
          <path d="M 452,500 C 462,482 488,476 514,479 C 538,482 552,496 549,512 C 546,528 528,536 502,533 C 476,530 454,517 452,504 C 451,502 451,501 452,500 Z" fill="#CFE0BC" opacity="0.92" filter="url(#foodShadow)" />
          {([[468,492,8,3,-24],[488,486,7,2.6,18],[508,488,8,2.6,-10],[522,496,6.5,3,28],[472,506,7,2.8,-18],[492,504,8,3,12],[510,508,6,2.6,-4],[478,520,6.5,2.8,22],[498,522,7,3,-14]] as [number,number,number,number,number][]).map(([cx,cy,rx,ry,rot],i)=>(
            <ellipse key={i} cx={cx} cy={cy} rx={rx} ry={ry} fill={["#5E9448","#7CB060","#C8A860","#93A96C"][i%4]} opacity="0.72" transform={`rotate(${rot} ${cx} ${cy})`} />
          ))}
          {([[470,498],[492,510],[512,498],[482,522]] as [number,number][]).map(([x,y],i)=>(
            <line key={i} x1={x} y1={y} x2={x+8} y2={y+2} stroke="rgba(255,255,255,0.66)" strokeWidth="1.5" transform={`rotate(${i*30} ${x} ${y})`} />
          ))}
          <path d="M 528,500 C 534,494 542,494 546,500" stroke="#2E5A24" strokeWidth="1.4" fill="none" />
          <ellipse cx="533" cy="497" rx="3" ry="1.6" fill="#2E5A24" transform="rotate(-30 533 497)" />
          <ellipse cx="543" cy="497" rx="3" ry="1.6" fill="#2E5A24" transform="rotate(30 543 497)" />

          {/* thoran */}
          <path d="M 560,510 C 570,495 594,490 616,493 C 638,496 651,508 648,523 C 645,538 626,544 604,541 C 580,538 560,527 560,515 C 559,513 559,511 560,510 Z" fill="#5E7C36" opacity="0.9" filter="url(#foodShadow)" />
          {(() => {
            const pts: [number, number][] = []
            for (let r = 0; r < 4; r++) for (let c = 0; c < 8; c++) pts.push([572 + c * 10 + (r % 2) * 4, 502 + r * 9])
            return pts.map(([x, y], i) => (
              <line key={i} x1={x} y1={y} x2={x + 5} y2={y + 1} stroke={['#DED08C', '#3E6420', '#94AC54', '#CC9E2C', '#F0EAD0'][i % 5]} strokeWidth="1.5" opacity="0.78" transform={`rotate(${(i * 41) % 90} ${x} ${y})`} />
            ))
          })()}

          {/* olan */}
          <path d="M 662,506 C 672,492 694,488 714,492 C 732,496 743,508 740,522 C 737,536 720,542 700,539 C 678,536 662,525 662,513 C 661,511 661,508 662,506 Z" fill="url(#olanGrad)" opacity="0.9" filter="url(#foodShadow)" />
          {([[676,504,7,3,-16],[696,500,6,2.6,14],[714,504,6.5,3,-8],[684,518,5.5,2.4,20],[704,520,6,2.8,-6]] as [number,number,number,number,number][]).map(([cx,cy,rx,ry,rot],i)=>(
            <ellipse key={i} cx={cx} cy={cy} rx={rx} ry={ry} fill="#DCE0C0" opacity="0.8" transform={`rotate(${rot} ${cx} ${cy})`} />
          ))}
          <ellipse cx="696" cy="510" rx="10" ry="4" fill="rgba(255,255,255,0.34)" transform="rotate(-8 696 510)" />

          {/* erissery */}
          <path d="M 756,494 C 766,480 788,476 808,480 C 826,484 837,496 834,510 C 831,524 814,530 794,527 C 772,524 756,513 756,501 C 755,499 755,496 756,494 Z" fill="url(#erisseryGrad)" opacity="0.92" filter="url(#foodShadow)" />
          {([[770,492],[788,488],[806,492],[778,504],[798,506],[816,500],[788,516]] as [number,number][]).map(([x,y],i)=>(
            <ellipse key={i} cx={x} cy={y} rx={2.6} ry={1.8} fill={["#7A3E10","#F0C060","#5A2E0C"][i%3]} opacity="0.68" transform={`rotate(${i*36} ${x} ${y})`} />
          ))}
          <ellipse cx="774" cy="490" rx="9" ry="3.6" fill="rgba(255,238,180,0.4)" transform="rotate(-10 774 490)" />

          {/* sambar bowl */}
          <ellipse cx="726" cy="556" rx="42" ry="12" fill="#100500" opacity="0.22" filter="url(#blurDrop)" />
          <ellipse cx="724" cy="546" rx="40" ry="14" fill="#7A7A7A" />
          <ellipse cx="724" cy="540" rx="40" ry="13" fill="url(#steelGrad)" />
          <ellipse cx="724" cy="537" rx="34" ry="10" fill="#5A3016" />
          <ellipse cx="724" cy="535" rx="31" ry="9" fill="url(#sambarGrad)" />
          <ellipse cx="714" cy="531" rx="12" ry="4.4" fill="rgba(220,132,64,0.4)" transform="rotate(-8 714 531)" />
          <rect x="716" y="533" width="16" height="3.4" rx="1.7" fill="#4C6A2C" opacity="0.7" transform="rotate(-12 724 535)" />

          {/* rasam */}
          <path d="M 604,556 C 614,548 632,545 648,548 C 662,551 671,560 666,570 C 661,580 645,583 628,580 C 611,577 600,567 599,558 C 598,555 600,554 604,556 Z" fill="#BC3422" opacity="0.55" />
          <ellipse cx="628" cy="562" rx="12" ry="5" fill="rgba(200,78,38,0.24)" transform="rotate(-10 628 562)" />
          <circle cx="620" cy="560" r="1.4" fill="#3E1408" opacity="0.5" />
          <circle cx="640" cy="566" r="1.2" fill="#3E1408" opacity="0.45" />

          {/* moru bowl */}
          <ellipse cx="546" cy="560" rx="38" ry="11" fill="#100500" opacity="0.2" filter="url(#blurDrop)" />
          <ellipse cx="544" cy="550" rx="36" ry="13" fill="#7A7A7A" />
          <ellipse cx="544" cy="545" rx="36" ry="12" fill="url(#steelGrad)" />
          <ellipse cx="544" cy="542" rx="30" ry="9" fill="url(#moruGrad)" />
          <ellipse cx="534" cy="538" rx="11" ry="4.2" fill="rgba(255,255,255,0.46)" transform="rotate(-8 534 538)" />
          <circle cx="548" cy="542" r="1.1" fill="#3E6420" opacity="0.55" />
          <circle cx="540" cy="545" r="1" fill="#7A3010" opacity="0.5" />

          {/* ═══ MISSING PAYASAM — physical absence ═══ */}
          <g>
            <ellipse cx="912" cy="362" rx="46" ry="34" fill="url(#dampLeaf)" filter="url(#blurSoft)" />
            <path d="M 878,352 C 872,372 884,392 912,396 C 936,399 956,388 960,372" stroke="rgba(150,196,150,0.28)" strokeWidth="2.4" fill="none" strokeLinecap="round" filter="url(#blurDrop)" />
            <path d="M 884,348 C 900,340 924,340 940,348" stroke="rgba(120,170,120,0.18)" strokeWidth="1.6" fill="none" strokeLinecap="round" filter="url(#blurDrop)" />
            <path d="M 940,368 C 962,362 984,360 1004,364" stroke="rgba(210,180,130,0.3)" strokeWidth="4" fill="none" strokeLinecap="round" filter="url(#blurDrop)" />
            <ellipse cx="948" cy="388" rx="4.4" ry="3" fill="url(#payasamDrop)" opacity="0.9" filter="url(#faintShadow)" />
            <ellipse cx="932" cy="398" rx="3" ry="2.1" fill="url(#payasamDrop)" opacity="0.82" />
            <ellipse cx="960" cy="396" rx="2.2" ry="1.5" fill="url(#payasamDrop)" opacity="0.78" />
            <ellipse cx="894" cy="392" rx="2" ry="1.4" fill="url(#payasamDrop)" opacity="0.7" />
            <circle cx="922" cy="384" r="2.4" fill="#F4EAD2" opacity="0.9" />
            <circle cx="921" cy="383" r="0.9" fill="rgba(255,255,255,0.8)" />
            <circle cx="906" cy="392" r="1.6" fill="#EADCC0" opacity="0.82" />
            <path d="M 946,326 C 968,318 990,322 1008,332" stroke="rgba(40,74,50,0.4)" strokeWidth="2.2" fill="none" filter="url(#blurDrop)" />
            <path d="M 950,330 C 968,326 986,328 1000,336" stroke="rgba(120,180,130,0.22)" strokeWidth="1.2" fill="none" />
          </g>

          {/* ═══ SCENE OBJECTS ═══ */}
          {/* brass payasam ladle on the mat */}
          <g filter="url(#faintShadow)" transform="rotate(24 1088 452)">
            <rect x="1082" y="360" width="6" height="92" rx="3" fill="url(#brassGrad)" />
            <ellipse cx="1085" cy="464" rx="24" ry="16" fill="#8A6410" />
            <ellipse cx="1085" cy="461" rx="22" ry="14" fill="url(#brassGrad)" />
            <ellipse cx="1085" cy="461" rx="15" ry="9" fill="url(#payasamDrop)" opacity="0.85" />
            <ellipse cx="1080" cy="458" rx="6" ry="3" fill="rgba(255,248,230,0.6)" />
          </g>

          {/* brass serving pot (sambar) */}
          <ellipse cx="1156" cy="512" rx="56" ry="18" fill="#100500" opacity="0.36" filter="url(#blurSoft)" />
          <path d="M 1104,470 C 1104,458 1132,450 1156,450 C 1180,450 1208,458 1208,470 L 1204,504 C 1204,518 1180,526 1156,526 C 1132,526 1108,518 1108,504 Z" fill="url(#brassGrad)" filter="url(#faintShadow)" />
          <ellipse cx="1156" cy="470" rx="52" ry="15" fill="#9C7614" />
          <ellipse cx="1156" cy="468" rx="49" ry="13" fill="#8A2E12" />
          <ellipse cx="1146" cy="463" rx="18" ry="6" fill="rgba(156,68,28,0.4)" transform="rotate(-8 1146 463)" />
          <path d="M 1108,468 C 1128,458 1184,458 1204,468" stroke="rgba(255,232,150,0.5)" strokeWidth="2" fill="none" />
          <path d="M 1118,486 C 1120,498 1130,508 1146,512" stroke="rgba(255,238,170,0.32)" strokeWidth="3" fill="none" strokeLinecap="round" />

          {/* steel water tumbler */}
          <ellipse cx="222" cy="458" rx="26" ry="8" fill="#100500" opacity="0.3" filter="url(#blurDrop)" />
          <path d="M 200,414 L 244,414 L 240,452 C 240,458 204,458 204,452 Z" fill="url(#steelGrad)" filter="url(#faintShadow)" />
          <ellipse cx="222" cy="414" rx="22" ry="6.5" fill="#BEBEBE" />
          <ellipse cx="222" cy="413" rx="20" ry="5.5" fill="#8EB6C4" opacity="0.5" />
          {/* water line — still half full */}
          <ellipse cx="222" cy="432" rx="18" ry="4.5" fill="#A8CEDC" opacity="0.4" />
          <path d="M 208,420 L 206,448" stroke="rgba(255,255,255,0.5)" strokeWidth="2.4" strokeLinecap="round" />
          <path d="M 236,420 L 238,448" stroke="rgba(120,120,120,0.4)" strokeWidth="2" strokeLinecap="round" />

          {/* folded kasavu cloth */}
          <ellipse cx="266" cy="612" rx="86" ry="20" fill="#100500" opacity="0.2" filter="url(#blurDrop)" />
          <path d="M 190,584 C 194,604 336,610 340,588 C 340,610 194,624 190,602 Z" fill="#EADCB2" />
          <path d="M 198,576 C 202,596 332,602 336,580 C 336,602 202,616 198,594 Z" fill="#F0E6C0" />
          <path d="M 206,568 C 210,588 328,594 332,572 C 332,594 210,608 206,586 Z" fill="#ECE2BC" />
          <path d="M 190,584 C 194,604 336,610 340,588" stroke="#C6A624" strokeWidth="9" fill="none" opacity="0.85" />
          <path d="M 190,584 C 194,604 336,610 340,588" stroke="#F0CE4C" strokeWidth="4" fill="none" opacity="0.5" />
          <path d="M 220,568 C 244,562 296,562 324,572" stroke="rgba(185,162,96,0.34)" strokeWidth="1" fill="none" />
          <path d="M 214,580 C 242,574 300,574 330,584" stroke="rgba(185,162,96,0.24)" strokeWidth="0.8" fill="none" />

          {/* ═══ PHONE — resting on the mat, faint lock screen ═══ */}
          <g transform="rotate(-9 430 652)">
            <ellipse cx="432" cy="704" rx="30" ry="9" fill="#100500" opacity="0.34" filter="url(#blurDrop)" />
            <rect x="406" y="606" width="48" height="94" rx="10" fill="#0B0B10" filter="url(#faintShadow)" />
            <rect x="410" y="610" width="40" height="86" rx="7" fill="#12141C" />
            {/* screen glow */}
            <rect x="410" y="610" width="40" height="86" rx="7" fill="#2A3A5A" opacity="0.5" filter="url(#phoneGlow)" />
            <rect x="411" y="611" width="38" height="84" rx="6" fill="#0E1420" />
            {/* time + date */}
            <text x="430" y="636" textAnchor="middle" fontFamily="Outfit, sans-serif" fontSize="13" fontWeight="600" fill="#DCE4F0">12:39</text>
            <text x="430" y="646" textAnchor="middle" fontFamily="Outfit, sans-serif" fontSize="4.4" letterSpacing="0.6" fill="rgba(220,228,240,0.6)">THIRUVONAM</text>
            {/* notifications */}
            <rect x="415" y="656" width="30" height="11" rx="2.5" fill="rgba(255,255,255,0.09)" />
            <circle cx="420" cy="661.5" r="2.4" fill="#5A8A6A" />
            <rect x="425" y="659" width="17" height="2" rx="1" fill="rgba(255,255,255,0.3)" />
            <rect x="425" y="663" width="12" height="1.6" rx="0.8" fill="rgba(255,255,255,0.18)" />
            <rect x="415" y="670" width="30" height="13" rx="2.5" fill="rgba(255,255,255,0.11)" />
            <circle cx="420" cy="676.5" r="2.4" fill="#8B6A9A" />
            <text x="425" y="675" fontFamily="Outfit, sans-serif" fontSize="3.6" fill="rgba(255,255,255,0.72)">Amma</text>
            <text x="425" y="680.5" fontFamily="Outfit, sans-serif" fontSize="4.2" fontWeight="500" fill="rgba(255,255,255,0.9)">Did you bring it?</text>
            <rect x="415" y="686" width="30" height="6" rx="2" fill="rgba(255,255,255,0.06)" />
          </g>

          {/* marigold + jasmine petals */}
          {([
            [188,392,24,"#D4840A",8,3.4],[172,410,-20,"#C27208",7,3],[210,436,40,"#D69614",8,3.4],
            [196,422,-9,"#E09618",7,3],[180,406,18,"#D4840A",6,2.8],
            [372,596,-16,"#D4840A",7,3],[392,584,34,"#E09618",8,3.4],[408,602,-4,"#C27208",6,2.8],[358,600,20,"#D69614",7,3],
            [876,596,22,"#FEFCF4",5,2.2],[894,584,-26,"#FEFFF6",4.5,2],[910,600,8,"#FEFCF4",5,2.2],[862,592,-14,"#FEFFF6",4,1.8],
          ] as [number,number,number,string,number,number][]).map(([cx,cy,angle,color,rx,ry],i)=>(
            <ellipse key={i} cx={cx} cy={cy} rx={rx} ry={ry} fill={color} opacity="0.82" transform={`rotate(${angle} ${cx} ${cy})`} filter="url(#faintShadow)" />
          ))}

          {/* low wooden seating */}
          <rect x="86" y="690" width="150" height="110" rx="5" fill="#3A1E0E" filter="url(#softShadow)" opacity="0.96" />
          <rect x="86" y="690" width="150" height="110" rx="5" fill="#4E2A16" opacity="0.55" />
          <line x1="86" y1="720" x2="236" y2="717" stroke="#2C1408" strokeWidth="1.6" opacity="0.36" />
          <line x1="86" y1="742" x2="236" y2="739" stroke="#2C1408" strokeWidth="1" opacity="0.26" />
          <line x1="86" y1="762" x2="236" y2="759" stroke="#2C1408" strokeWidth="0.8" opacity="0.2" />
          <rect x="86" y="690" width="150" height="7" rx="3" fill="rgba(108,64,26,0.46)" />

          {/* ═══ FAMILY PHOTOGRAPH — earlier that day ═══ */}
          <rect x="1150" y="620" width="122" height="94" rx="3" fill="#2C180A" filter="url(#softShadow)" />
          <rect x="1154" y="624" width="114" height="86" rx="2" fill="#1A0E04" />
          {/* warm sepia interior */}
          <rect x="1160" y="630" width="102" height="74" fill="#7A6248" opacity="0.9" />
          <rect x="1160" y="630" width="102" height="74" fill="url(#windowLight)" opacity="0.5" />
          {/* kitchen doorway inside the photo (left) + a figure in it */}
          <rect x="1160" y="636" width="16" height="52" fill="#2A1C10" opacity="0.8" />
          <ellipse cx="1168" cy="666" rx="5" ry="13" fill="#3A2818" />
          <circle cx="1168" cy="650" r="4" fill="#3A2818" />
          {/* laid banana leaves / table strip */}
          <rect x="1178" y="686" width="80" height="8" rx="2" fill="#5A6A3A" opacity="0.7" />
          {/* three figures setting the table */}
          <g fill="#402C1A">
            <ellipse cx="1192" cy="662" rx="6" ry="15" /><circle cx="1192" cy="644" r="4.5" />
            <ellipse cx="1210" cy="660" rx="6" ry="16" /><circle cx="1210" cy="641" r="4.5" />
            <ellipse cx="1228" cy="663" rx="6" ry="15" /><circle cx="1228" cy="645" r="4.5" />
          </g>
          {/* a figure arriving late at the right edge, partly out of frame */}
          <ellipse cx="1258" cy="660" rx="5" ry="16" fill="#503826" opacity="0.85" />
          <circle cx="1258" cy="641" r="4" fill="#503826" opacity="0.85" />
          {/* brass vessels on the table */}
          <ellipse cx="1200" cy="684" rx="5" ry="2.4" fill="#C49A30" />
          <ellipse cx="1236" cy="685" rx="4.5" ry="2.2" fill="#C49A30" />
          {/* frame highlights */}
          <rect x="1150" y="620" width="122" height="5" rx="2" fill="rgba(255,232,160,0.28)" />

          {/* ═══ PEOPLE — quiet presences around the house ═══ */}
          {suspects.map((s) => (
            <SuspectPresence key={s.id} id={s.id} cx={s.hit.cx} cy={s.hit.cy} ry={s.hit.ry} />
          ))}

          {/* ═══ INTERACTION LAYER ═══ */}
          {objects.map((o) => {
            const isHover = hoveredId === o.id && active
            return (
              <g key={o.id}>
                {/* hover highlight — a soft catch of light, no hard outline */}
                {isHover && (
                  <ellipse cx={o.hit.cx} cy={o.hit.cy} rx={o.hit.rx} ry={o.hit.ry}
                    fill="rgba(255,236,170,0.05)" filter="url(#blurSoft)" />
                )}
                {/* faint dot to mark an already-seen object, unobtrusive */}
                {inspectedIds.has(o.id) && !isHover && (
                  <circle cx={o.hit.cx} cy={o.hit.cy - o.hit.ry - 6} r="1.6" fill="rgba(232,216,144,0.4)" />
                )}
                <ellipse
                  cx={o.hit.cx} cy={o.hit.cy} rx={o.hit.rx} ry={o.hit.ry}
                  fill="transparent"
                  style={{ cursor: active ? 'zoom-in' : 'default' }}
                  onClick={active ? () => onInspect(o.id) : undefined}
                  onMouseEnter={() => setHoveredId(o.id)}
                  onMouseLeave={() => setHoveredId((c) => (c === o.id ? null : c))}
                />
                {isHover && (
                  <text
                    x={o.hit.cx} y={o.hit.cy + o.hit.ry + 18}
                    textAnchor="middle" fontFamily="Outfit, sans-serif" fontSize="10.5"
                    fontStyle="italic" letterSpacing="0.5"
                    fill="rgba(240,228,180,0.82)" style={{ pointerEvents: 'none' }}
                  >
                    {o.label}
                  </text>
                )}
              </g>
            )
          })}

          {/* People sit above objects so a person is never eclipsed by a nearby hotspot. */}
          {suspects.map((s) => {
            const isHover = hoveredId === s.id && active
            return (
              <g key={s.id}>
                {isHover && (
                  <ellipse cx={s.hit.cx} cy={s.hit.cy} rx={s.hit.rx * 1.1} ry={s.hit.ry * 1.05}
                    fill="rgba(255,236,170,0.06)" filter="url(#blurSoft)" />
                )}
                {metSuspectIds.has(s.id) && !isHover && (
                  <circle cx={s.hit.cx} cy={s.hit.cy - s.hit.ry - 8} r="1.6" fill="rgba(232,216,144,0.4)" />
                )}
                <ellipse
                  cx={s.hit.cx} cy={s.hit.cy} rx={s.hit.rx} ry={s.hit.ry}
                  fill="transparent"
                  style={{ cursor: active ? 'pointer' : 'default' }}
                  onClick={active ? () => onApproach(s.id) : undefined}
                  onMouseEnter={() => setHoveredId(s.id)}
                  onMouseLeave={() => setHoveredId((c) => (c === s.id ? null : c))}
                />
                {isHover && (
                  <text
                    x={s.hit.cx} y={s.hit.cy + s.hit.ry + 20}
                    textAnchor="middle" fontFamily="Outfit, sans-serif" fontSize="11"
                    letterSpacing="1.5"
                    fill="rgba(240,228,180,0.88)" style={{ pointerEvents: 'none' }}
                  >
                    {s.name}
                  </text>
                )}
              </g>
            )
          })}

          {/* ═══ ATMOSPHERE ═══ */}
          <g style={{ pointerEvents: 'none' }}>
            {([
              [98,158,1.5],[146,228,1.1],[75,292,1.0],[186,178,0.9],[128,344,1.2],
              [58,242,0.8],[204,262,1.2],[162,402,1.0],[112,210,0.7],[228,320,0.9],
            ] as [number,number,number][]).map(([cx,cy,r],i)=>(
              <circle key={i} cx={cx} cy={cy} r={r} fill="rgba(255,212,96,0.55)" />
            ))}
          </g>

          {/* ═══ VIGNETTE ═══ */}
          <rect x="0" y="0" width="1400" height="900" fill="url(#vignette)" style={{ pointerEvents: 'none' }} />

          {/* ═══ CINEMATIC SPOTLIGHT DIM (only while a subject is in focus) ═══ */}
          <g style={{ opacity: focus ? 1 : 0, transition: 'opacity 0.5s ease' }}>
            {focus && (
              <rect x="0" y="0" width="1400" height="900" fill="url(#spot)" style={{ pointerEvents: 'none' }} />
            )}
          </g>
        </svg>
      </div>

      {/* Ambient hint — understated, only at the very start */}
      {showHint && ambientHint && (
        <div
          key={ambientHint}
          style={{
            position: 'absolute',
            bottom: 48,
            left: '50%',
            transform: 'translateX(-50%)',
            fontFamily: 'Lora, serif',
            fontStyle: 'italic',
            color: '#EEE0C0',
            fontSize: 14,
            opacity: 0.5,
            letterSpacing: '0.04em',
            whiteSpace: 'nowrap',
            pointerEvents: 'none',
            zIndex: 10,
            animation: 'hintAppear 1.3s ease both',
            textShadow: '0 1px 10px rgba(0,0,0,0.9)',
          }}
        >
          {ambientHint}
        </div>
      )}
    </div>
  )
}
