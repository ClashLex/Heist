import { useState, type ReactNode, type CSSProperties } from 'react'
import type { EvidenceItem } from '../gameData'
import { SUSPECTS, ANU_PHOTOS, type SuspectPhoto } from '../suspects'
import { SuspectBust, CHARACTER_PALETTES } from './SuspectArt'

// ── Canon (internally consistent, never randomised) ──────────
export const CORRECT_SUSPECT = 'kunjumol'
export const CORRECT_MOTIVE = 'someone'

const SLOTS = ['12:38', '12:39', '12:40', '12:41', '12:42']

const MOTIVES: { id: string; label: string }[] = [
  { id: 'self', label: 'I wanted it for myself.' },
  { id: 'hiding', label: 'I was hiding something.' },
  { id: 'outside', label: 'I took it outside.' },
  { id: 'someone', label: 'I was taking it to someone.' },
]

// What the player may learn about each person — shown only once discovered.
const SUSPECT_FILE: Record<
  string,
  { known: string; contraId?: string; contradiction?: string }
> = {
  ammachi: {
    known: 'Served the payasam herself at 12:38.',
    contraId: 'am-brother',
    contradiction: 'Insists her brother was already present, though he claims otherwise.',
  },
  appa: {
    known: 'Says he was on a phone call out on the veranda.',
    contraId: 'ap-photo',
    contradiction: 'A 12:42 photograph shows him at the table, not outside on a call.',
  },
  anu: {
    known: 'Photographed the house all morning.',
    contraId: 'an-kunjumol',
    contradiction: 'Her own photograph caught more than she admits noticing.',
  },
  kunjumol: {
    known: 'Says she stayed in the kitchen through the meal.',
    contraId: 'ku-vessel',
    contradiction: 'A photograph catches her carrying a vessel from the kitchen.',
  },
  uncle: {
    known: 'Says he arrived only after everything was served.',
    contraId: 'un-photo',
    contradiction: 'A 12:42 photograph shows him already seated at the leaf.',
  },
  neighbour: {
    known: 'Returned a large brass payasam vessel earlier that morning.',
  },
}

// The truth, told through time — revealed one beat at a time.
const REVEAL_STEPS: { t: string; line: string }[] = [
  { t: '12:38', line: 'The payasam sits on the leaf. Ammachi has only just served it.' },
  { t: '12:39', line: 'A phone lights up on the mat. “Did you bring it?” — her mother, at home.' },
  { t: '12:40', line: 'Kunjumol lifts the payasam from the leaf — and the serving ladle with it.' },
  { t: '12:41', line: 'She carries it out through the kitchen. Droplets trail behind her.' },
  { t: '12:42', line: 'The place on the leaf is empty. Still warm, still damp.' },
]

const RECONTEXT: string[] = [
  '“Did you bring it?” — her mother, asking after the payasam. Not a theft.',
  'The trail of droplets led out the kitchen door, not deeper into the house.',
  'The missing ladle went with the vessel — to serve it, elsewhere.',
  'She swore she never left the kitchen only so the surprise would keep.',
]

export interface FinalActProps {
  phase: 'reconstruct' | 'accuse' | 'commit' | 'reveal'
  evidence: EvidenceItem[]
  inspectedPhotoIds: Set<string>
  questionedSuspects: Set<string>
  discoveredContradictions: Set<string>
  timeline: Record<string, string>
  accusedSuspectId: string | null
  accusedMotive: string | null
  accusationResult: 'fit' | 'partial' | 'miss' | null
  onPlace: (cardId: string, slot: string) => void
  onSelectSuspect: (id: string) => void
  onSelectMotive: (id: string) => void
  onGoAccuse: () => void
  onReview: () => void
  onAccuse: () => void
  onReconsider: () => void
  onExitToScene: () => void
  onReplay: () => void
}

// ── Small shared UI atoms ────────────────────────────────────
function Kicker({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        fontFamily: 'Outfit, sans-serif',
        fontSize: 10,
        letterSpacing: '0.22em',
        textTransform: 'uppercase',
        color: '#8B4049',
      }}
    >
      {children}
    </div>
  )
}

function Shell({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 85,
        background:
          'radial-gradient(120% 90% at 50% 0%, rgba(22,12,4,0.82), rgba(10,6,2,0.94))',
        backdropFilter: 'blur(3px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        animation: 'fadeIn 0.5s ease both',
        fontFamily: 'Outfit, sans-serif',
        overflowY: 'auto',
        padding: '32px 20px',
      }}
    >
      {children}
    </div>
  )
}

export default function FinalAct(props: FinalActProps) {
  const {
    phase,
    evidence,
    inspectedPhotoIds,
    questionedSuspects,
    discoveredContradictions,
    timeline,
    accusedSuspectId,
    accusedMotive,
    accusationResult,
    onPlace,
    onSelectSuspect,
    onSelectMotive,
    onGoAccuse,
    onReview,
    onAccuse,
    onReconsider,
    onExitToScene,
    onReplay,
  } = props

  // Cards the player may place — only what they actually discovered.
  const photoCards: SuspectPhoto[] = ANU_PHOTOS.filter((p) => inspectedPhotoIds.has(p.id))
  const cards = [
    ...evidence.map((e) => ({ id: e.id, title: e.title, time: e.time, isPhoto: false })),
    ...photoCards.map((p) => ({ id: p.id, title: p.caption, time: p.time, isPhoto: true })),
  ]

  const [selectedCard, setSelectedCard] = useState<string | null>(null)
  const [inspectedSuspect, setInspectedSuspect] = useState<string | null>(null)
  const [revealStep, setRevealStep] = useState(0)
  const [ending, setEnding] = useState(false)

  const placedCount = Object.keys(timeline).length
  const canAccuse = placedCount >= 3
  // A gentle recognition when the key moments sit on the board together.
  const overlap =
    placedCount >= 3 &&
    Object.keys(timeline).includes('payasam-area') &&
    Object.keys(timeline).some((id) => id.startsWith('photo-'))

  function placeSelected(slot: string) {
    if (!selectedCard) return
    onPlace(selectedCard, slot)
    setSelectedCard(null)
  }

  // ═══════════════════════════════════════════ RECONSTRUCT
  if (phase === 'reconstruct') {
    const tray = cards.filter((c) => !timeline[c.id])
    return (
      <Shell>
        <div style={{ width: '100%', maxWidth: 940 }}>
          <Kicker>Reconstruct · the four minutes</Kicker>
          <div
            style={{
              fontFamily: 'Lora, serif',
              fontStyle: 'italic',
              fontSize: 24,
              color: '#F0E4C8',
              margin: '10px 0 22px',
            }}
          >
            Lay what you found across the time it went missing.
          </div>

          {/* Timeline */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: `repeat(${SLOTS.length}, 1fr)`,
              gap: 10,
              background: 'rgba(247,240,220,0.06)',
              border: '1px solid rgba(232,216,144,0.16)',
              padding: 14,
            }}
          >
            {SLOTS.map((slot) => {
              const here = cards.filter((c) => timeline[c.id] === slot)
              return (
                <div
                  key={slot}
                  onClick={() => placeSelected(slot)}
                  style={{
                    minHeight: 150,
                    border: selectedCard
                      ? '1px dashed rgba(232,216,144,0.5)'
                      : '1px solid rgba(232,216,144,0.12)',
                    padding: 8,
                    cursor: selectedCard ? 'pointer' : 'default',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 6,
                    transition: 'border-color 0.18s ease',
                  }}
                >
                  <div
                    style={{
                      fontFamily: 'ui-monospace, "Courier New", monospace',
                      fontSize: 12,
                      color: '#E8D8B0',
                      opacity: 0.7,
                      letterSpacing: '0.06em',
                    }}
                  >
                    {slot}
                  </div>
                  {here.map((c) => (
                    <button
                      key={c.id}
                      onClick={(e) => {
                        e.stopPropagation()
                        onPlace(c.id, '') // lift back to tray
                      }}
                      style={{
                        textAlign: 'left',
                        background: c.isPhoto ? '#160C04' : 'rgba(247,240,220,0.95)',
                        color: c.isPhoto ? '#F0E4C8' : '#1E0E04',
                        border: '1px solid rgba(181,146,58,0.4)',
                        padding: '6px 8px',
                        cursor: 'pointer',
                        fontFamily: 'Lora, serif',
                        fontStyle: 'italic',
                        fontSize: 11.5,
                        lineHeight: 1.3,
                      }}
                    >
                      {c.title}
                    </button>
                  ))}
                </div>
              )
            })}
          </div>

          {/* subtle overlap recognition — never a grade */}
          <div style={{ height: 20, marginTop: 8 }}>
            {overlap && (
              <div
                style={{
                  fontFamily: 'Lora, serif',
                  fontStyle: 'italic',
                  fontSize: 13,
                  color: 'rgba(240,228,180,0.7)',
                  animation: 'fadeIn 0.6s ease both',
                }}
              >
                These events overlap.
              </div>
            )}
          </div>

          {/* Card tray */}
          <div style={{ marginTop: 10 }}>
            <Kicker>Evidence you gathered — tap one, then a time</Kicker>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 10 }}>
              {tray.length === 0 && (
                <div
                  style={{
                    fontFamily: 'Lora, serif',
                    fontStyle: 'italic',
                    fontSize: 13,
                    color: 'rgba(240,228,180,0.55)',
                  }}
                >
                  Everything is on the board.
                </div>
              )}
              {tray.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setSelectedCard((cur) => (cur === c.id ? null : c.id))}
                  style={{
                    textAlign: 'left',
                    maxWidth: 190,
                    background:
                      selectedCard === c.id
                        ? '#1C3A2A'
                        : c.isPhoto
                          ? '#160C04'
                          : 'rgba(247,240,220,0.95)',
                    color:
                      selectedCard === c.id || c.isPhoto ? '#F0E4C8' : '#1E0E04',
                    border:
                      selectedCard === c.id
                        ? '1px solid rgba(232,216,144,0.7)'
                        : '1px solid rgba(181,146,58,0.35)',
                    padding: '8px 10px',
                    cursor: 'pointer',
                    fontFamily: 'Lora, serif',
                    fontStyle: 'italic',
                    fontSize: 12,
                    lineHeight: 1.35,
                  }}
                >
                  {c.title}
                </button>
              ))}
            </div>
          </div>

          {/* Suspect files */}
          <div style={{ marginTop: 26 }}>
            <Kicker>Who was in the house</Kicker>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 10 }}>
              {SUSPECTS.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setInspectedSuspect((c) => (c === s.id ? null : s.id))}
                  style={{
                    fontFamily: 'Outfit, sans-serif',
                    fontSize: 11,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: inspectedSuspect === s.id ? '#160C04' : '#F0E4C8',
                    background:
                      inspectedSuspect === s.id ? '#E8D890' : 'rgba(247,240,220,0.08)',
                    border: '1px solid rgba(232,216,144,0.3)',
                    padding: '8px 14px',
                    cursor: 'pointer',
                  }}
                >
                  {s.name}
                </button>
              ))}
            </div>
            {inspectedSuspect && (
              <SuspectFileCard
                id={inspectedSuspect}
                questioned={questionedSuspects.has(inspectedSuspect)}
                discoveredContradictions={discoveredContradictions}
              />
            )}
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', gap: 14, marginTop: 30, alignItems: 'center' }}>
            <button
              onClick={onGoAccuse}
              disabled={!canAccuse}
              style={{
                fontFamily: 'Outfit, sans-serif',
                fontSize: 11,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: canAccuse ? '#160C04' : 'rgba(240,228,180,0.4)',
                background: canAccuse ? '#E8D890' : 'rgba(247,240,220,0.08)',
                border: '1px solid rgba(232,216,144,0.4)',
                padding: '12px 24px',
                cursor: canAccuse ? 'pointer' : 'not-allowed',
              }}
            >
              Name who moved it
            </button>
            <button onClick={onExitToScene} style={ghostBtn}>
              Back to the room
            </button>
          </div>
        </div>
      </Shell>
    )
  }

  // ═══════════════════════════════════════════ ACCUSE
  if (phase === 'accuse') {
    return (
      <Shell>
        <div style={{ width: '100%', maxWidth: 720 }}>
          <Kicker>The accusation</Kicker>
          <div
            style={{
              fontFamily: 'Lora, serif',
              fontStyle: 'italic',
              fontSize: 26,
              color: '#F0E4C8',
              margin: '10px 0 22px',
            }}
          >
            Who moved the payasam?
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 12,
            }}
          >
            {SUSPECTS.map((s) => {
              const on = accusedSuspectId === s.id
              const pal = CHARACTER_PALETTES[s.id]
              return (
                <button
                  key={s.id}
                  onClick={() => onSelectSuspect(s.id)}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 8,
                    padding: '16px 8px',
                    background: on ? 'rgba(232,216,144,0.14)' : 'rgba(247,240,220,0.05)',
                    border: on
                      ? `2px solid ${pal?.accent ?? 'rgba(232,216,144,0.7)'}`
                      : '1px solid rgba(232,216,144,0.16)',
                    borderTop: pal ? `3px solid ${pal.primary}` : undefined,
                    cursor: 'pointer',
                    transition: 'all 0.16s ease',
                  }}
                >
                  <SuspectBust id={s.id} size={54} />
                  <span
                    style={{
                      fontFamily: 'Outfit, sans-serif',
                      fontSize: 11,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: '#F0E4C8',
                    }}
                  >
                    {s.name}
                  </span>
                  {pal && (
                    <span
                      style={{
                        fontFamily: 'Outfit, sans-serif',
                        fontSize: 8,
                        letterSpacing: '0.04em',
                        color: 'rgba(240,228,180,0.55)',
                        textTransform: 'none',
                      }}
                    >
                      {pal.attire}
                    </span>
                  )}
                </button>
              )
            })}
          </div>

          {accusedSuspectId && (
            <div style={{ marginTop: 26, animation: 'fadeIn 0.4s ease both' }}>
              <div
                style={{
                  fontFamily: 'Lora, serif',
                  fontStyle: 'italic',
                  fontSize: 20,
                  color: '#F0E4C8',
                  marginBottom: 14,
                }}
              >
                Why?
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {MOTIVES.map((m) => {
                  const on = accusedMotive === m.id
                  return (
                    <button
                      key={m.id}
                      onClick={() => onSelectMotive(m.id)}
                      style={{
                        textAlign: 'left',
                        fontFamily: 'Lora, serif',
                        fontStyle: 'italic',
                        fontSize: 15,
                        color: on ? '#160C04' : '#F0E4C8',
                        background: on ? '#E8D890' : 'rgba(247,240,220,0.05)',
                        border: '1px solid rgba(232,216,144,0.22)',
                        padding: '12px 16px',
                        cursor: 'pointer',
                      }}
                    >
                      &ldquo;{m.label}&rdquo;
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          <div style={{ display: 'flex', gap: 14, marginTop: 28 }}>
            <button
              onClick={onReview}
              disabled={!accusedSuspectId || !accusedMotive}
              style={{
                fontFamily: 'Outfit, sans-serif',
                fontSize: 11,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: accusedSuspectId && accusedMotive ? '#160C04' : 'rgba(240,228,180,0.4)',
                background:
                  accusedSuspectId && accusedMotive ? '#E8D890' : 'rgba(247,240,220,0.08)',
                border: '1px solid rgba(232,216,144,0.4)',
                padding: '12px 24px',
                cursor: accusedSuspectId && accusedMotive ? 'pointer' : 'not-allowed',
              }}
            >
              Review your theory
            </button>
            <button onClick={onExitToScene} style={ghostBtn}>
              Keep looking
            </button>
          </div>
        </div>
      </Shell>
    )
  }

  // ═══════════════════════════════════════════ COMMIT / FEEDBACK
  if (phase === 'commit') {
    const suspect = SUSPECTS.find((s) => s.id === accusedSuspectId)
    const motive = MOTIVES.find((m) => m.id === accusedMotive)
    const basis = evidence
      .slice()
      .sort((a, b) => (a.kind === 'clue' ? -1 : 1) - (b.kind === 'clue' ? -1 : 1))
      .slice(0, 4)

    // Feedback after a theory that doesn't fully fit.
    if (accusationResult === 'partial' || accusationResult === 'miss') {
      return (
        <Shell>
          <div style={{ width: '100%', maxWidth: 560 }}>
            <Kicker>Your theory</Kicker>
            <div
              style={{
                fontFamily: 'Lora, serif',
                fontStyle: 'italic',
                fontSize: 24,
                color: '#F0E4C8',
                margin: '10px 0 20px',
              }}
            >
              {accusationResult === 'partial'
                ? 'The right person — but not quite the reason.'
                : "Your theory doesn't fully fit."}
            </div>
            <div
              style={{
                fontFamily: 'Lora, serif',
                fontSize: 15,
                lineHeight: 1.7,
                color: 'rgba(240,228,180,0.82)',
              }}
            >
              {accusationResult === 'partial' ? (
                <>
                  Whoever took it never tried to keep it. The vessel didn&rsquo;t vanish —
                  it <em>left</em>. Ask yourself where the droplets were leading, and why
                  someone would carry the ladle out too.
                </>
              ) : (
                <>
                  The trail doesn&rsquo;t sit still with them. The droplets run out the
                  kitchen door; the ladle went with the vessel; a photograph caught someone
                  carrying it away. Follow the way out, not the way in.
                </>
              )}
            </div>
            <div style={{ display: 'flex', gap: 14, marginTop: 28 }}>
              <button onClick={onReconsider} style={primaryBtn}>
                Reconsider
              </button>
              <button onClick={onExitToScene} style={ghostBtn}>
                Keep investigating
              </button>
            </div>
          </div>
        </Shell>
      )
    }

    // The commitment moment.
    return (
      <Shell>
        <div style={{ width: '100%', maxWidth: 560 }}>
          <Kicker>Your theory</Kicker>
          <div
            style={{
              fontFamily: 'Lora, serif',
              fontStyle: 'italic',
              fontSize: 23,
              lineHeight: 1.5,
              color: '#F0E4C8',
              margin: '12px 0 6px',
            }}
          >
            {suspect?.name} moved the payasam because{' '}
            <span style={{ color: '#E8D890' }}>
              &ldquo;{motive?.label}&rdquo;
            </span>
          </div>

          <div style={{ marginTop: 26 }}>
            <Kicker>Evidence you&rsquo;re basing this on</Kicker>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 7, marginTop: 12 }}>
              {basis.map((e) => (
                <div
                  key={e.id}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    gap: 12,
                    borderBottom: '1px solid rgba(232,216,144,0.14)',
                    paddingBottom: 7,
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'Lora, serif',
                      fontStyle: 'italic',
                      fontSize: 14,
                      color: '#F0E4C8',
                    }}
                  >
                    {e.title}
                  </span>
                  <span
                    style={{
                      fontFamily: 'ui-monospace, "Courier New", monospace',
                      fontSize: 12,
                      color: 'rgba(232,216,144,0.6)',
                    }}
                  >
                    {e.time}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', gap: 14, marginTop: 30 }}>
            <button onClick={onAccuse} style={primaryBtn}>
              Make your accusation
            </button>
            <button onClick={onReconsider} style={ghostBtn}>
              Not yet
            </button>
          </div>
        </div>
      </Shell>
    )
  }

  // ═══════════════════════════════════════════ REVEAL
  // Rendered over the (still-mounted) frozen Sadya scene.
  const lastStep = revealStep >= REVEAL_STEPS.length

  if (ending) {
    return (
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 85,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 18,
          background:
            'radial-gradient(120% 100% at 50% 50%, rgba(10,6,2,0.35), rgba(8,4,1,0.9))',
          animation: 'fadeIn 1.2s ease both',
          fontFamily: 'Outfit, sans-serif',
          textAlign: 'center',
          padding: 24,
        }}
      >
        <div
          style={{
            fontFamily: 'Lora, serif',
            fontStyle: 'italic',
            fontSize: 15,
            color: 'rgba(240,228,180,0.7)',
            maxWidth: 440,
            lineHeight: 1.6,
          }}
        >
          Sometimes a heist is just another way of taking something home.
        </div>
        <div style={{ height: 24 }} />
        <div
          style={{
            fontFamily: 'Lora, serif',
            fontStyle: 'italic',
            fontSize: 24,
            letterSpacing: '0.14em',
            color: '#F0E4C8',
          }}
        >
          Onam Heist
        </div>
        <div
          style={{
            fontSize: 10,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: '#E8D8B0',
            opacity: 0.6,
          }}
        >
          Thiruvonam · 12:42 PM
        </div>
        <div
          style={{
            fontSize: 11,
            letterSpacing: '0.34em',
            textTransform: 'uppercase',
            color: '#C6A430',
            marginTop: 8,
          }}
        >
          Case Closed
        </div>
        <button onClick={onReplay} style={{ ...ghostBtn, marginTop: 26 }}>
          Play Again
        </button>
      </div>
    )
  }

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 85,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background:
          'radial-gradient(120% 100% at 50% 40%, rgba(10,6,2,0.5), rgba(8,4,1,0.88))',
        animation: 'fadeIn 0.6s ease both',
        fontFamily: 'Outfit, sans-serif',
        padding: '32px 20px',
      }}
    >
      <div style={{ width: '100%', maxWidth: 600 }}>
        <Kicker>Your theory fits</Kicker>
        <div style={{ marginTop: 22, minHeight: 220 }}>
          {REVEAL_STEPS.slice(0, revealStep + 1).map((s, i) => (
            <div
              key={s.t}
              style={{
                display: 'flex',
                gap: 18,
                marginBottom: 16,
                opacity: i === revealStep ? 1 : 0.5,
                animation: i === revealStep ? 'annotationRise 0.6s ease both' : undefined,
              }}
            >
              <div
                style={{
                  fontFamily: 'ui-monospace, "Courier New", monospace',
                  fontSize: 13,
                  color: '#C6A430',
                  flex: '0 0 52px',
                  paddingTop: 2,
                }}
              >
                {s.t}
              </div>
              <div
                style={{
                  fontFamily: 'Lora, serif',
                  fontStyle: 'italic',
                  fontSize: 17,
                  lineHeight: 1.5,
                  color: '#F0E4C8',
                }}
              >
                {s.line}
              </div>
            </div>
          ))}

          {lastStep && (
            <div style={{ animation: 'fadeIn 0.8s ease both', marginTop: 12 }}>
              <div
                style={{
                  fontFamily: 'Lora, serif',
                  fontSize: 18,
                  lineHeight: 1.6,
                  color: '#F0E4C8',
                  borderTop: '1px solid rgba(232,216,144,0.2)',
                  paddingTop: 20,
                }}
              >
                Kunjumol carried it out to her mother — too unwell to come to the Sadya —
                so that Onam still reached her table.
              </div>
              <div style={{ marginTop: 20 }}>
                {RECONTEXT.map((line, i) => (
                  <div
                    key={i}
                    style={{
                      fontFamily: 'Lora, serif',
                      fontStyle: 'italic',
                      fontSize: 13.5,
                      lineHeight: 1.5,
                      color: 'rgba(240,228,180,0.72)',
                      marginTop: 8,
                    }}
                  >
                    {line}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div style={{ marginTop: 24 }}>
          {!lastStep ? (
            <button onClick={() => setRevealStep((s) => s + 1)} style={primaryBtn}>
              Continue
            </button>
          ) : (
            <button onClick={() => setEnding(true)} style={primaryBtn}>
              Return to the room
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

function SuspectFileCard({
  id,
  questioned,
  discoveredContradictions,
}: {
  id: string
  questioned: boolean
  discoveredContradictions: Set<string>
}) {
  const suspect = SUSPECTS.find((s) => s.id === id)
  const file = SUSPECT_FILE[id]
  if (!suspect || !file) return null
  const showContra = file.contraId ? discoveredContradictions.has(file.contraId) : false

  const pal = CHARACTER_PALETTES[id]
  const borderColor = pal ? pal.primary : 'rgba(181,146,58,0.6)'

  return (
    <div
      style={{
        marginTop: 14,
        background: 'rgba(247,240,220,0.96)',
        borderLeft: `4px solid ${borderColor}`,
        padding: '18px 22px',
        maxWidth: 460,
        animation: 'fadeIn 0.35s ease both',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
        <div
          style={{
            fontFamily: 'Outfit, sans-serif',
            fontSize: 12,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: '#1E0E04',
            flex: 1,
          }}
        >
          {suspect.name}
        </div>
        {pal && (
          <div
            style={{
              padding: '3px 8px',
              background: pal.primary,
              border: `1px solid ${pal.accent}`,
              fontFamily: 'Outfit, sans-serif',
              fontSize: 8,
              letterSpacing: '0.06em',
              color: '#1E0E04',
              whiteSpace: 'nowrap',
            }}
          >
            {pal.attire}
          </div>
        )}
      </div>
      {!questioned ? (
        <div
          style={{
            fontFamily: 'Lora, serif',
            fontStyle: 'italic',
            fontSize: 14,
            color: '#6A4E34',
          }}
        >
          You haven&rsquo;t spoken with them yet.
        </div>
      ) : (
        <>
          <FileRow label="Claim" value={`“${suspect.claim}”`} italic />
          <FileRow label="Known" value={file.known} />
          {showContra && file.contradiction && (
            <FileRow label="Contradiction" value={file.contradiction} accent />
          )}
        </>
      )}
    </div>
  )
}

function FileRow({
  label,
  value,
  italic,
  accent,
}: {
  label: string
  value: string
  italic?: boolean
  accent?: boolean
}) {
  return (
    <div style={{ marginTop: 10 }}>
      <div
        style={{
          fontFamily: 'Outfit, sans-serif',
          fontSize: 9,
          letterSpacing: '0.16em',
          textTransform: 'uppercase',
          color: accent ? '#8B4049' : '#5C4230',
          opacity: 0.75,
          marginBottom: 3,
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontFamily: 'Lora, serif',
          fontStyle: italic ? 'italic' : 'normal',
          fontSize: 14,
          lineHeight: 1.45,
          color: accent ? '#7A2E1A' : '#3A2414',
        }}
      >
        {value}
      </div>
    </div>
  )
}

const primaryBtn: CSSProperties = {
  fontFamily: 'Outfit, sans-serif',
  fontSize: 11,
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  color: '#160C04',
  background: '#E8D890',
  border: '1px solid rgba(232,216,144,0.5)',
  padding: '12px 26px',
  cursor: 'pointer',
}

const ghostBtn: CSSProperties = {
  fontFamily: 'Outfit, sans-serif',
  fontSize: 11,
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  color: 'rgba(240,228,180,0.7)',
  background: 'transparent',
  border: '1px solid rgba(232,216,144,0.28)',
  padding: '12px 22px',
  cursor: 'pointer',
}
