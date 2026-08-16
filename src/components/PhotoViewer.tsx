import { useState } from 'react'
import { ANU_PHOTOS } from '../suspects'
import { PhotoArt } from './SuspectArt'

interface Props {
  inspected: Set<string>
  onInspect: (photoId: string) => void
  onClose: () => void
}

export default function PhotoViewer({ inspected, onInspect, onClose }: Props) {
  const [selected, setSelected] = useState<string | null>(null)
  const active = ANU_PHOTOS.find((p) => p.id === selected) ?? null

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 90,
        background: 'rgba(12,7,2,0.82)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        animation: 'fadeIn 0.35s ease both',
        backdropFilter: 'blur(3px)',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{ width: '100%', maxWidth: 760, padding: '0 28px' }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            marginBottom: 20,
          }}
        >
          <div
            style={{
              fontFamily: 'Lora, serif',
              fontStyle: 'italic',
              fontSize: 19,
              color: '#F0E4C8',
            }}
          >
            Anu&rsquo;s photographs
          </div>
          <button
            onClick={onClose}
            style={{
              fontFamily: 'Outfit, sans-serif',
              fontSize: 10.5,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'rgba(240,228,180,0.7)',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Close
          </button>
        </div>

        {active ? (
          // Enlarged, examinable — no caption of the hidden detail.
          <div style={{ animation: 'fadeIn 0.3s ease both' }}>
            <div
              style={{
                background: '#160C04',
                padding: 14,
                boxShadow: '0 24px 60px rgba(0,0,0,0.6)',
              }}
            >
              <PhotoArt id={active.id} w={704} />
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: 14,
              }}
            >
              <div
                style={{
                  fontFamily: 'ui-monospace, "Courier New", monospace',
                  fontSize: 12,
                  letterSpacing: '0.08em',
                  color: '#E8D8B0',
                }}
              >
                {active.time}
                <span style={{ opacity: 0.55, marginLeft: 14, fontFamily: 'Lora, serif', fontStyle: 'italic' }}>
                  {active.caption}
                </span>
              </div>
              <button
                onClick={() => setSelected(null)}
                style={{
                  fontFamily: 'Outfit, sans-serif',
                  fontSize: 10.5,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'rgba(240,228,180,0.7)',
                  background: 'transparent',
                  border: '1px solid rgba(232,216,144,0.3)',
                  padding: '7px 16px',
                  cursor: 'pointer',
                }}
              >
                All Photos
              </button>
            </div>
          </div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: 18,
            }}
          >
            {ANU_PHOTOS.map((photo) => (
              <button
                key={photo.id}
                onClick={() => {
                  setSelected(photo.id)
                  onInspect(photo.id)
                }}
                style={{
                  background: '#160C04',
                  border: inspected.has(photo.id)
                    ? '1px solid rgba(232,216,144,0.35)'
                    : '1px solid transparent',
                  padding: 10,
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'transform 0.18s ease',
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-3px)')}
                onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)')}
              >
                <PhotoArt id={photo.id} w={330} />
                <div
                  style={{
                    fontFamily: 'ui-monospace, "Courier New", monospace',
                    fontSize: 11,
                    letterSpacing: '0.06em',
                    color: '#E8D8B0',
                    marginTop: 10,
                  }}
                >
                  {photo.time}
                </div>
                <div
                  style={{
                    fontFamily: 'Lora, serif',
                    fontStyle: 'italic',
                    fontSize: 13,
                    color: 'rgba(240,228,180,0.7)',
                    marginTop: 2,
                  }}
                >
                  {photo.caption}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
