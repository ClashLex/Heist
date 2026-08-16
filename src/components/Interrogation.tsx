import type { Suspect, SuspectQuestion } from '../suspects'
import { SuspectBust, CHARACTER_PALETTES } from './SuspectArt'

interface Props {
  suspect: Suspect
  transcript: { q: string; a: string; opensPhotos?: boolean }[]
  available: SuspectQuestion[]
  onAsk: (question: SuspectQuestion) => void
  onBack: () => void
}

export default function Interrogation({ suspect, transcript, available, onAsk, onBack }: Props) {
  const palette = CHARACTER_PALETTES[suspect.id]
  return (
    <div
      style={{
        position: 'fixed',
        left: '50%',
        bottom: 40,
        transform: 'translateX(-50%)',
        zIndex: 60,
        width: '100%',
        maxWidth: 660,
        padding: '0 20px',
        animation: 'annotationRise 0.5s cubic-bezier(0.22,1,0.36,1) both',
      }}
    >
      <div
        style={{
          background: 'rgba(247,240,220,0.98)',
          borderTop: '2px solid rgba(181,146,58,0.55)',
          boxShadow: '0 22px 64px rgba(0,0,0,0.52)',
          backdropFilter: 'blur(2px)',
          display: 'flex',
          maxHeight: '52vh',
        }}
      >
        {/* Portrait column */}
        <div
          style={{
            flex: '0 0 128px',
            padding: '22px 18px',
            borderRight: '1px solid rgba(181,146,58,0.22)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
          <SuspectBust id={suspect.id} size={84} />
          <div
            style={{
              fontFamily: 'Lora, serif',
              fontSize: 17,
              color: '#1E0E04',
              marginTop: 12,
            }}
          >
            {suspect.name}
          </div>
          <div
            style={{
              fontFamily: 'Outfit, sans-serif',
              fontSize: 9,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: '#5C4230',
              opacity: 0.6,
              marginTop: 6,
              lineHeight: 1.5,
            }}
          >
            {suspect.location}
          </div>
          {palette && (
            <div
              style={{
                marginTop: 10,
                padding: '4px 8px',
                background: palette.primary,
                border: `1px solid ${palette.accent}`,
                fontFamily: 'Outfit, sans-serif',
                fontSize: 8,
                letterSpacing: '0.06em',
                color: '#1E0E04',
                textAlign: 'center',
                lineHeight: 1.5,
              }}
            >
              {palette.attire}
            </div>
          )}
        </div>

        {/* Conversation column */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
          <div
            style={{
              padding: '20px 24px 8px',
              overflowY: 'auto',
              flex: 1,
            }}
          >
            <div
              style={{
                fontFamily: 'Outfit, sans-serif',
                fontSize: 9,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: '#8B4049',
                marginBottom: 10,
              }}
            >
              {suspect.relationship}
            </div>

            {/* Opening claim */}
            <div
              style={{
                fontFamily: 'Lora, serif',
                fontStyle: 'italic',
                fontSize: 17,
                lineHeight: 1.5,
                color: '#1E0E04',
              }}
            >
              &ldquo;{suspect.claim}&rdquo;
            </div>

            {/* A quiet observable tell */}
            <div
              style={{
                fontFamily: 'Outfit, sans-serif',
                fontSize: 11.5,
                lineHeight: 1.5,
                color: '#6A4E34',
                opacity: 0.72,
                marginTop: 10,
                fontStyle: 'italic',
              }}
            >
              {suspect.observableDetail}
            </div>

            {/* Transcript */}
            {transcript.map((t, i) => (
              <div key={i} style={{ marginTop: 18 }}>
                <div
                  style={{
                    fontFamily: 'Outfit, sans-serif',
                    fontSize: 10.5,
                    letterSpacing: '0.06em',
                    color: '#8B4049',
                    marginBottom: 5,
                  }}
                >
                  {t.q}
                </div>
                <div
                  style={{
                    fontFamily: 'Lora, serif',
                    fontStyle: 'italic',
                    fontSize: 15,
                    lineHeight: 1.5,
                    color: '#3A2414',
                  }}
                >
                  {t.opensPhotos ? '— she scrolls back through the morning —' : `“${t.a}”`}
                </div>
              </div>
            ))}
          </div>

          {/* Question chips + leave */}
          <div
            style={{
              borderTop: '1px solid rgba(181,146,58,0.2)',
              padding: '14px 24px 18px',
              display: 'flex',
              flexWrap: 'wrap',
              gap: 8,
              alignItems: 'center',
            }}
          >
            {available.length === 0 && (
              <div
                style={{
                  fontFamily: 'Outfit, sans-serif',
                  fontSize: 10.5,
                  letterSpacing: '0.06em',
                  color: '#5C4230',
                  opacity: 0.55,
                }}
              >
                Nothing more to ask — for now.
              </div>
            )}
            {available.map((question) => (
              <button
                key={question.id}
                onClick={() => onAsk(question)}
                style={{
                  fontFamily: 'Outfit, sans-serif',
                  fontSize: 11,
                  letterSpacing: '0.02em',
                  color: '#1C3A2A',
                  background: 'transparent',
                  border: '1px solid rgba(28,58,42,0.4)',
                  padding: '7px 14px',
                  cursor: 'pointer',
                  transition: 'all 0.16s ease',
                }}
                onMouseEnter={(e) => {
                  const b = e.currentTarget as HTMLButtonElement
                  b.style.background = '#1C3A2A'
                  b.style.color = '#F7F0DC'
                }}
                onMouseLeave={(e) => {
                  const b = e.currentTarget as HTMLButtonElement
                  b.style.background = 'transparent'
                  b.style.color = '#1C3A2A'
                }}
              >
                {question.q}
              </button>
            ))}
            <button
              onClick={onBack}
              style={{
                marginLeft: 'auto',
                fontFamily: 'Outfit, sans-serif',
                fontSize: 10.5,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: '#5C4230',
                background: 'transparent',
                border: 'none',
                padding: '7px 4px',
                cursor: 'pointer',
                opacity: 0.6,
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.opacity = '1')}
              onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.opacity = '0.6')}
            >
              Step Away
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
