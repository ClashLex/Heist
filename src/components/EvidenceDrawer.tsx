import type { EvidenceItem } from '../App'

interface Props {
  items: EvidenceItem[]
  open: boolean
  onClose: () => void
}

export default function EvidenceDrawer({ items, open, onClose }: Props) {
  return (
    <>
      {/* Backdrop (subtle) */}
      {open && (
        <div
          onClick={onClose}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 49,
            background: 'rgba(20,12,4,0.12)',
            animation: 'fadeIn 0.25s ease',
          }}
        />
      )}

      {/* Drawer */}
      <div
        style={{
          position: 'fixed',
          right: 0,
          top: 0,
          bottom: 0,
          width: 308,
          background: '#1C3A2A',
          zIndex: 50,
          display: 'flex',
          flexDirection: 'column',
          transform: open ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.36s cubic-bezier(0.4,0,0.2,1)',
          boxShadow: '-12px 0 48px rgba(0,0,0,0.32)',
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '32px 28px 22px',
            borderBottom: '1px solid rgba(247,240,220,0.1)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div
                style={{
                  fontFamily: 'Lora, serif',
                  fontStyle: 'italic',
                  color: '#F0E8D0',
                  fontSize: 18,
                  marginBottom: 4,
                }}
              >
                Evidence
              </div>
              <div
                style={{
                  fontFamily: 'Outfit, sans-serif',
                  fontSize: 10,
                  letterSpacing: '0.1em',
                  color: 'rgba(240,232,208,0.38)',
                  textTransform: 'uppercase',
                }}
              >
                {items.length === 0
                  ? 'Nothing collected'
                  : `${items.length} item${items.length > 1 ? 's' : ''} noted`}
              </div>
            </div>
            <button
              onClick={onClose}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'rgba(240,232,208,0.4)',
                fontSize: 22,
                cursor: 'pointer',
                lineHeight: 1,
                padding: '0 2px',
                transition: 'color 0.15s',
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = 'rgba(240,232,208,0.8)')}
              onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = 'rgba(240,232,208,0.4)')}
            >
              ×
            </button>
          </div>
        </div>

        {/* Items */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '22px 28px 28px',
          }}
        >
          {items.length === 0 ? (
            <div
              style={{
                fontFamily: 'Lora, serif',
                fontStyle: 'italic',
                color: 'rgba(240,232,208,0.28)',
                fontSize: 14,
                lineHeight: 1.6,
                marginTop: 8,
              }}
            >
              Inspect objects in the dining room to collect evidence.
            </div>
          ) : (
            items.map((item, i) => (
              <div
                key={item.id}
                style={{
                  background: '#F7F0DC',
                  padding: '18px 20px',
                  marginBottom: i < items.length - 1 ? 12 : 0,
                  animation: 'slideUp 0.3s ease both',
                }}
              >
                {/* Index + timestamp */}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'baseline',
                    marginBottom: 6,
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'ui-monospace, "Courier New", monospace',
                      fontSize: 10,
                      letterSpacing: '0.14em',
                      color: 'rgba(28,58,42,0.5)',
                    }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span
                    style={{
                      fontFamily: 'ui-monospace, "Courier New", monospace',
                      fontSize: 10,
                      letterSpacing: '0.1em',
                      color: '#8B3A3A',
                    }}
                  >
                    {item.time}
                  </span>
                </div>
                {/* Title */}
                <div
                  style={{
                    fontFamily: 'Outfit, sans-serif',
                    fontSize: 12,
                    fontWeight: 500,
                    color: '#1E0E04',
                    letterSpacing: '0.02em',
                    marginBottom: 8,
                  }}
                >
                  {item.title}
                </div>
                {/* Observation */}
                <div
                  style={{
                    fontFamily: 'Lora, serif',
                    fontStyle: 'italic',
                    fontSize: 13,
                    color: '#5C4230',
                    lineHeight: 1.55,
                  }}
                >
                  {item.observation}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer note */}
        <div
          style={{
            padding: '16px 28px 24px',
            borderTop: '1px solid rgba(247,240,220,0.08)',
          }}
        >
          <div
            style={{
              fontFamily: 'Outfit, sans-serif',
              fontSize: 10,
              letterSpacing: '0.08em',
              color: 'rgba(240,232,208,0.22)',
              textTransform: 'uppercase',
            }}
          >
            Thiruvonam · Investigation in progress
          </div>
        </div>
      </div>
    </>
  )
}
