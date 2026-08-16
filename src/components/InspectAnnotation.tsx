import type { InvestigationObject } from '../gameData'

interface Props {
  object: InvestigationObject
  alreadyCollected: boolean
  onAdd: () => void
  onBack: () => void
}

export default function InspectAnnotation({ object, alreadyCollected, onAdd, onBack }: Props) {
  const canCollect = Boolean(object.evidence)

  return (
    <div
      style={{
        position: 'fixed',
        left: '50%',
        bottom: 54,
        transform: 'translateX(-50%)',
        zIndex: 60,
        width: '100%',
        maxWidth: 404,
        padding: '0 20px',
        animation: 'annotationRise 0.5s cubic-bezier(0.22,1,0.36,1) both',
      }}
    >
      <div
        style={{
          position: 'relative',
          background: 'rgba(247,240,220,0.97)',
          borderTop: '2px solid rgba(181,146,58,0.55)',
          padding: '22px 26px 20px',
          boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
          backdropFilter: 'blur(2px)',
        }}
      >
        {/* Header row — name + time */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            marginBottom: 14,
          }}
        >
          <div
            style={{
              fontFamily: 'Outfit, sans-serif',
              fontSize: 10,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: '#8B4049',
            }}
          >
            {object.name}
          </div>
          {object.time && (
            <div
              style={{
                fontFamily: 'ui-monospace, "Courier New", monospace',
                fontSize: 11,
                letterSpacing: '0.06em',
                color: '#5C4230',
                opacity: 0.66,
              }}
            >
              {object.time}
            </div>
          )}
        </div>

        {/* Observation lines — revealed one after another */}
        <div style={{ marginBottom: 20 }}>
          {object.observations.map((line, i) => (
            <div
              key={i}
              style={{
                fontFamily: 'Lora, serif',
                fontStyle: 'italic',
                fontSize: i === 0 ? 17 : 14.5,
                lineHeight: 1.5,
                color: i === 0 ? '#1E0E04' : '#4A3320',
                marginTop: i === 0 ? 0 : 9,
                opacity: 0,
                animation: `lineReveal 0.6s ease forwards`,
                animationDelay: `${0.35 + i * 0.9}s`,
              }}
            >
              {line}
            </div>
          ))}
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: 18, alignItems: 'center' }}>
          {canCollect && !alreadyCollected && (
            <button
              onClick={onAdd}
              style={{
                fontFamily: 'Outfit, sans-serif',
                fontSize: 10.5,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: '#F7F0DC',
                background: '#1C3A2A',
                border: 'none',
                padding: '10px 22px',
                cursor: 'pointer',
                transition: 'background 0.18s ease',
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.background = '#2D5A42')}
              onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.background = '#1C3A2A')}
            >
              Add to Evidence
            </button>
          )}
          {canCollect && alreadyCollected && (
            <div
              style={{
                fontFamily: 'Outfit, sans-serif',
                fontSize: 10.5,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: '#5C4230',
                opacity: 0.6,
                display: 'flex',
                alignItems: 'center',
                gap: 7,
              }}
            >
              <span style={{ color: '#1C3A2A' }}>✓</span> Noted
            </div>
          )}
          <button
            onClick={onBack}
            style={{
              fontFamily: 'Outfit, sans-serif',
              fontSize: 10.5,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: '#5C4230',
              background: 'transparent',
              border: 'none',
              padding: '10px 4px',
              cursor: 'pointer',
              opacity: 0.6,
              marginLeft: canCollect ? 0 : 'auto',
              transition: 'opacity 0.15s',
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.opacity = '1')}
            onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.opacity = '0.6')}
          >
            Back
          </button>
        </div>
      </div>
    </div>
  )
}
