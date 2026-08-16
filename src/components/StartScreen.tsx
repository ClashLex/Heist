interface Props {
  onBegin: () => void
}

const STEPS: { n: string; label: string; text: string }[] = [
  { n: '01', label: 'Explore', text: 'Move through the Kerala home and notice what the Sadya is missing.' },
  { n: '02', label: 'Inspect', text: 'Examine what was left behind and add it to your evidence.' },
  { n: '03', label: 'Question', text: 'Speak with the six people present. Everyone remembers it differently.' },
  { n: '04', label: 'Reconstruct', text: 'Lay your evidence across the four minutes — then name who moved it, and why.' },
]

export default function StartScreen({ onBegin }: Props) {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 24px',
        overflowY: 'auto',
        fontFamily: 'Outfit, sans-serif',
        background:
          'radial-gradient(130% 100% at 22% 8%, rgba(58,38,18,0.55), rgba(12,7,2,0.92) 60%), #0C0702',
        animation: 'fadeIn 0.7s ease both',
      }}
    >
      {/* faint marigold motes for atmosphere */}
      <svg
        viewBox="0 0 1000 700"
        preserveAspectRatio="xMidYMid slice"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.5, pointerEvents: 'none' }}
      >
        {([
          [120, 140, 2], [220, 300, 1.4], [90, 460, 1.6], [300, 200, 1], [180, 560, 1.8],
          [820, 180, 1.6], [900, 380, 1.2], [760, 520, 2], [680, 120, 1.3], [880, 620, 1.5],
        ] as [number, number, number][]).map(([cx, cy, r], i) => (
          <circle key={i} cx={cx} cy={cy} r={r} fill="rgba(255,206,110,0.5)" />
        ))}
      </svg>

      <div style={{ position: 'relative', width: '100%', maxWidth: 620, textAlign: 'center' }}>
        <div
          style={{
            fontFamily: 'Outfit, sans-serif',
            fontSize: 11,
            letterSpacing: '0.32em',
            textTransform: 'uppercase',
            color: '#C6A430',
            marginBottom: 18,
          }}
        >
          An interactive Onam mystery
        </div>

        <div
          style={{
            fontFamily: 'Lora, serif',
            fontStyle: 'italic',
            fontSize: 'clamp(44px, 9vw, 76px)',
            lineHeight: 1,
            color: '#F4EAD0',
            textShadow: '0 4px 30px rgba(0,0,0,0.6)',
          }}
        >
          Onam Heist
        </div>

        <div
          style={{
            fontSize: 11,
            letterSpacing: '0.24em',
            textTransform: 'uppercase',
            color: '#E8D8B0',
            opacity: 0.6,
            marginTop: 16,
          }}
        >
          Thiruvonam · 12:41 PM
        </div>

        <p
          style={{
            fontFamily: 'Lora, serif',
            fontSize: 17,
            lineHeight: 1.7,
            color: 'rgba(240,228,180,0.86)',
            maxWidth: 500,
            margin: '26px auto 0',
          }}
        >
          The Sadya is laid out on the banana leaf, nearly complete. But between
          <span style={{ color: '#E8D890' }}> 12:38</span> and
          <span style={{ color: '#E8D890' }}> 12:42</span>, a dish of payasam vanished from
          its place. Six people were in the house. Find out who moved it — and why.
        </p>

        {/* how to play */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 1,
            margin: '38px 0 34px',
            background: 'rgba(232,216,144,0.14)',
            border: '1px solid rgba(232,216,144,0.14)',
          }}
        >
          {STEPS.map((s) => (
            <div
              key={s.n}
              style={{
                background: 'rgba(16,9,3,0.72)',
                padding: '20px 20px',
                textAlign: 'left',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
                <span
                  style={{
                    fontFamily: 'ui-monospace, "Courier New", monospace',
                    fontSize: 12,
                    color: '#C6A430',
                  }}
                >
                  {s.n}
                </span>
                <span
                  style={{
                    fontFamily: 'Outfit, sans-serif',
                    fontSize: 11,
                    letterSpacing: '0.16em',
                    textTransform: 'uppercase',
                    color: '#F0E4C8',
                  }}
                >
                  {s.label}
                </span>
              </div>
              <div
                style={{
                  fontFamily: 'Lora, serif',
                  fontStyle: 'italic',
                  fontSize: 13.5,
                  lineHeight: 1.5,
                  color: 'rgba(240,228,180,0.68)',
                  marginTop: 8,
                }}
              >
                {s.text}
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={onBegin}
          style={{
            fontFamily: 'Outfit, sans-serif',
            fontSize: 12,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: '#160C04',
            background: '#E8D890',
            border: '1px solid rgba(232,216,144,0.5)',
            padding: '15px 40px',
            cursor: 'pointer',
            boxShadow: '0 16px 44px rgba(0,0,0,0.5)',
            transition: 'transform 0.16s ease, background 0.16s ease',
          }}
          onMouseEnter={(e) => {
            const b = e.currentTarget as HTMLButtonElement
            b.style.transform = 'translateY(-2px)'
            b.style.background = '#F0E4A0'
          }}
          onMouseLeave={(e) => {
            const b = e.currentTarget as HTMLButtonElement
            b.style.transform = 'translateY(0)'
            b.style.background = '#E8D890'
          }}
        >
          Begin the investigation
        </button>
      </div>
    </div>
  )
}
