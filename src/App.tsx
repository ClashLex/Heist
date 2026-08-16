import { useState } from 'react'
import DiningScene, { type SceneFocus } from './components/DiningScene'
import InspectAnnotation from './components/InspectAnnotation'
import EvidenceDrawer from './components/EvidenceDrawer'
import Interrogation from './components/Interrogation'
import PhotoViewer from './components/PhotoViewer'
import FinalAct, { CORRECT_SUSPECT, CORRECT_MOTIVE } from './components/FinalAct'
import StartScreen from './components/StartScreen'
import {
  INVESTIGATION_OBJECTS,
  MEANINGFUL_CLUE_THRESHOLD,
  type EvidenceItem,
  type InvestigationObject,
} from './gameData'
import {
  SUSPECTS,
  SUSPECT_NOTE_THRESHOLD,
  type Suspect,
  type SuspectQuestion,
} from './suspects'

export type { EvidenceItem } from './gameData'

const OBJECT_BY_ID: Record<string, InvestigationObject> = Object.fromEntries(
  INVESTIGATION_OBJECTS.map((o) => [o.id, o]),
)
const SUSPECT_BY_ID: Record<string, Suspect> = Object.fromEntries(
  SUSPECTS.map((s) => [s.id, s]),
)

export default function App() {
  const [started, setStarted] = useState(false)
  const [inspectingId, setInspectingId] = useState<string | null>(null)
  const [inspectedIds, setInspectedIds] = useState<Set<string>>(new Set())
  const [evidence, setEvidence] = useState<EvidenceItem[]>([])
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [toast, setToast] = useState(false)
  const [note, setNote] = useState<'hidden' | 'shown' | 'dismissed'>('hidden')

  // ── Suspects & interrogation ──────────────────────────────
  const [activeSuspectId, setActiveSuspectId] = useState<string | null>(null)
  const [questionedSuspects, setQuestionedSuspects] = useState<Set<string>>(new Set())
  const [dialogueHistory, setDialogueHistory] = useState<Record<string, string[]>>({})
  const [photographsInspected, setPhotographsInspected] = useState<Set<string>>(new Set())
  const [photoViewerOpen, setPhotoViewerOpen] = useState(false)
  const [suspectNote, setSuspectNote] = useState<'hidden' | 'shown' | 'dismissed'>('hidden')
  const [discoveredContradictions, setDiscoveredContradictions] = useState<Set<string>>(new Set())

  // ── Final act: reconstruct → accuse → reveal ──────────────
  const [phase, setPhase] = useState<'scene' | 'reconstruct' | 'accuse' | 'commit' | 'reveal'>('scene')
  const [timeline, setTimeline] = useState<Record<string, string>>({})
  const [accusedSuspectId, setAccusedSuspectId] = useState<string | null>(null)
  const [accusedMotive, setAccusedMotive] = useState<string | null>(null)
  const [accusationResult, setAccusationResult] = useState<'fit' | 'partial' | 'miss' | null>(null)

  const inspecting = inspectingId ? OBJECT_BY_ID[inspectingId] : null
  const activeSuspect = activeSuspectId ? SUSPECT_BY_ID[activeSuspectId] : null
  const collectedIds = new Set(evidence.map((e) => e.id))

  // A single cinematic focus, whether an object or a person is in view.
  const focus: SceneFocus | null = inspecting
    ? { cx: inspecting.hit.cx, cy: inspecting.hit.cy, rx: inspecting.hit.rx, ry: inspecting.hit.ry, zoom: inspecting.zoom }
    : activeSuspect
      ? { cx: activeSuspect.hit.cx, cy: activeSuspect.hit.cy, rx: activeSuspect.hit.rx, ry: activeSuspect.hit.ry, zoom: activeSuspect.zoom }
      : null

  function handleInspect(id: string) {
    setActiveSuspectId(null)
    setInspectingId(id)
    setInspectedIds((prev) => new Set(prev).add(id))
  }

  function handleBack() {
    setInspectingId(null)
  }

  function handleAdd() {
    if (!inspecting?.evidence || collectedIds.has(inspecting.id)) return
    const item: EvidenceItem = { ...inspecting.evidence, kind: inspecting.kind }
    setEvidence((prev) => {
      const next = [...prev, item]
      if (
        note === 'hidden' &&
        next.filter((e) => e.kind === 'clue').length >= MEANINGFUL_CLUE_THRESHOLD
      ) {
        setTimeout(() => setNote('shown'), 900)
      }
      return next
    })
    setToast(true)
    setTimeout(() => setToast(false), 1800)
  }

  // ── Interrogation handlers ────────────────────────────────
  function handleApproach(id: string) {
    setInspectingId(null)
    setActiveSuspectId(id)
  }

  function handleStepAway() {
    setActiveSuspectId(null)
  }

  function handleAsk(question: SuspectQuestion) {
    if (!activeSuspectId) return
    const sid = activeSuspectId

    setDialogueHistory((prev) => {
      const asked = prev[sid] ?? []
      if (asked.includes(question.id)) return prev
      return { ...prev, [sid]: [...asked, question.id] }
    })

    setQuestionedSuspects((prev) => {
      if (prev.has(sid)) return prev
      const next = new Set(prev).add(sid)
      if (suspectNote === 'hidden' && next.size >= SUSPECT_NOTE_THRESHOLD) {
        setTimeout(() => setSuspectNote('shown'), 900)
      }
      return next
    })

    // A gated confrontation question surfaces a contradiction in someone's story.
    if (question.photoReq || question.evidenceReq) {
      setDiscoveredContradictions((prev) =>
        prev.has(question.id) ? prev : new Set(prev).add(question.id),
      )
    }

    if (question.opensPhotos) setPhotoViewerOpen(true)
  }

  // ── Final-act handlers ────────────────────────────────────
  function handlePlace(cardId: string, slot: string) {
    setTimeline((prev) => {
      const next = { ...prev }
      if (slot === '') delete next[cardId]
      else next[cardId] = slot
      return next
    })
  }

  function handleAccuse() {
    const fit = accusedSuspectId === CORRECT_SUSPECT && accusedMotive === CORRECT_MOTIVE
    const partial = accusedSuspectId === CORRECT_SUSPECT && !fit
    const result = fit ? 'fit' : partial ? 'partial' : 'miss'
    setAccusationResult(result)
    if (fit) setPhase('reveal')
  }

  function handleReplay() {
    setInspectingId(null)
    setInspectedIds(new Set())
    setEvidence([])
    setDrawerOpen(false)
    setToast(false)
    setNote('hidden')
    setActiveSuspectId(null)
    setQuestionedSuspects(new Set())
    setDialogueHistory({})
    setPhotographsInspected(new Set())
    setPhotoViewerOpen(false)
    setSuspectNote('hidden')
    setDiscoveredContradictions(new Set())
    setTimeline({})
    setAccusedSuspectId(null)
    setAccusedMotive(null)
    setAccusationResult(null)
    setPhase('scene')
  }

  const clueCount = evidence.filter((e) => e.kind === 'clue').length
  const canReconstruct =
    clueCount >= MEANINGFUL_CLUE_THRESHOLD &&
    questionedSuspects.size >= 3 &&
    photographsInspected.size >= 1 &&
    discoveredContradictions.size >= 1

  function handleInspectPhoto(photoId: string) {
    setPhotographsInspected((prev) => new Set(prev).add(photoId))
  }

  // Questions currently offered for the active suspect.
  const askedForActive = activeSuspectId ? dialogueHistory[activeSuspectId] ?? [] : []
  const available: SuspectQuestion[] = activeSuspect
    ? activeSuspect.questions.filter((q) => {
        if (askedForActive.includes(q.id)) return false
        if (q.photoReq && !photographsInspected.has(q.photoReq)) return false
        if (q.evidenceReq && !collectedIds.has(q.evidenceReq)) return false
        return true
      })
    : []

  const transcript = activeSuspect
    ? askedForActive
        .map((qid) => activeSuspect.questions.find((q) => q.id === qid))
        .filter((q): q is SuspectQuestion => Boolean(q))
        .map((q) => ({ q: q.q, a: q.a, opensPhotos: q.opensPhotos }))
    : []

  const ambientHint =
    evidence.length === 0 && !focus
      ? 'Something is missing from the Sadya.'
      : questionedSuspects.size === 0 && !focus && evidence.length > 0
        ? 'Others were in the house. They may remember the afternoon.'
        : null

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        position: 'relative',
        fontFamily: 'Outfit, sans-serif',
        background: '#160A02',
      }}
    >
      {/* Scene */}
      <DiningScene
        objects={INVESTIGATION_OBJECTS}
        suspects={SUSPECTS}
        inspectedIds={inspectedIds}
        metSuspectIds={questionedSuspects}
        focus={focus}
        onInspect={handleInspect}
        onApproach={handleApproach}
        ambientHint={ambientHint}
      />

      {/* Top bar */}
      {phase === 'scene' && (
      <header
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 40,
          padding: '22px 32px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          pointerEvents: 'none',
        }}
      >
        <div>
          <div
            style={{
              fontFamily: 'Lora, serif',
              fontStyle: 'italic',
              color: '#F0E4C8',
              fontSize: 15,
              letterSpacing: '0.1em',
              opacity: 0.82,
              textShadow: '0 1px 8px rgba(0,0,0,0.7)',
            }}
          >
            Onam Heist
          </div>
          <div
            style={{
              fontFamily: 'Outfit, sans-serif',
              fontSize: 10,
              letterSpacing: '0.14em',
              color: '#E8D8B0',
              opacity: 0.52,
              marginTop: 4,
              textTransform: 'uppercase',
              textShadow: '0 1px 6px rgba(0,0,0,0.7)',
            }}
          >
            Thiruvonam · 12:41 PM
          </div>
        </div>

        <button
          onClick={() => setDrawerOpen((v) => !v)}
          style={{
            pointerEvents: 'auto',
            fontFamily: 'Outfit, sans-serif',
            fontSize: 10,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: '#F0E4C8',
            background: 'rgba(28,58,42,0.62)',
            border: '1px solid rgba(232,216,144,0.28)',
            padding: '9px 18px',
            cursor: 'pointer',
            transition: 'background 0.18s ease',
            backdropFilter: 'blur(4px)',
          }}
          onMouseEnter={(e) =>
            ((e.currentTarget as HTMLButtonElement).style.background = 'rgba(28,58,42,0.85)')
          }
          onMouseLeave={(e) =>
            ((e.currentTarget as HTMLButtonElement).style.background = 'rgba(28,58,42,0.62)')
          }
        >
          Evidence
          <span style={{ opacity: 0.6, marginLeft: 8 }}>
            {String(evidence.length).padStart(2, '0')}
          </span>
        </button>
      </header>
      )}

      {/* Reconstruct entry — appears only once there's enough to reason with */}
      {phase === 'scene' && canReconstruct && !focus && (
        <button
          onClick={() => setPhase('reconstruct')}
          style={{
            position: 'absolute',
            bottom: 34,
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 45,
            fontFamily: 'Outfit, sans-serif',
            fontSize: 11,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: '#160C04',
            background: '#E8D890',
            border: '1px solid rgba(232,216,144,0.5)',
            padding: '13px 28px',
            cursor: 'pointer',
            boxShadow: '0 14px 40px rgba(0,0,0,0.5)',
            animation: 'hintAppear 1s ease both',
          }}
        >
          Reconstruct what happened
        </button>
      )}

      {/* In-scene inspection annotation */}
      {inspecting && (
        <InspectAnnotation
          key={inspecting.id}
          object={inspecting}
          alreadyCollected={collectedIds.has(inspecting.id)}
          onAdd={handleAdd}
          onBack={handleBack}
        />
      )}

      {/* Interrogation panel */}
      {activeSuspect && (
        <Interrogation
          key={activeSuspect.id}
          suspect={activeSuspect}
          transcript={transcript}
          available={available}
          onAsk={handleAsk}
          onBack={handleStepAway}
        />
      )}

      {/* Anu's photographs */}
      {photoViewerOpen && (
        <PhotoViewer
          inspected={photographsInspected}
          onInspect={handleInspectPhoto}
          onClose={() => setPhotoViewerOpen(false)}
        />
      )}

      {/* Evidence-added confirmation */}
      {toast && (
        <div
          style={{
            position: 'fixed',
            top: 78,
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 70,
            fontFamily: 'Outfit, sans-serif',
            fontSize: 10,
            letterSpacing: '0.28em',
            textTransform: 'uppercase',
            color: '#F0E4C8',
            background: 'rgba(28,58,42,0.9)',
            border: '1px solid rgba(232,216,144,0.35)',
            padding: '10px 22px',
            animation: 'toastPop 1.8s ease both',
            pointerEvents: 'none',
          }}
        >
          Evidence Added
        </div>
      )}

      {/* Investigation note — appears once, after three meaningful clues */}
      {note === 'shown' && (
        <NotePanel
          accent="rgba(139,64,73,0.6)"
          label="Investigation Note"
          body="Something was moved from the Sadya. The kitchen may not be the whole story."
          action="Keep Looking"
          onDismiss={() => setNote('dismissed')}
        />
      )}

      {/* Suspect note — appears once, after speaking to three people */}
      {suspectNote === 'shown' && (
        <NotePanel
          accent="rgba(181,146,58,0.6)"
          label="Suspect Note"
          body="Everyone remembers the afternoon differently. Someone's story doesn't quite fit."
          action="Keep Asking"
          onDismiss={() => setSuspectNote('dismissed')}
        />
      )}

      {/* Evidence drawer */}
      <EvidenceDrawer
        items={evidence}
        open={phase === 'scene' && drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />

      {/* Final act — reconstruct → accuse → reveal, over the frozen scene */}
      {phase !== 'scene' && (
        <FinalAct
          phase={phase}
          evidence={evidence}
          inspectedPhotoIds={photographsInspected}
          questionedSuspects={questionedSuspects}
          discoveredContradictions={discoveredContradictions}
          timeline={timeline}
          accusedSuspectId={accusedSuspectId}
          accusedMotive={accusedMotive}
          accusationResult={accusationResult}
          onPlace={handlePlace}
          onSelectSuspect={setAccusedSuspectId}
          onSelectMotive={setAccusedMotive}
          onGoAccuse={() => setPhase('accuse')}
          onReview={() => setPhase('commit')}
          onAccuse={handleAccuse}
          onReconsider={() => {
            setAccusationResult(null)
            setPhase('accuse')
          }}
          onExitToScene={() => {
            setAccusationResult(null)
            setPhase('scene')
          }}
          onReplay={handleReplay}
        />
      )}

      {/* Intro — shown over the scene until the player begins */}
      {!started && <StartScreen onBegin={() => setStarted(true)} />}
    </div>
  )
}

// A quiet, shared note card for both investigation and suspect beats.
function NotePanel({
  accent,
  label,
  body,
  action,
  onDismiss,
}: {
  accent: string
  label: string
  body: string
  action: string
  onDismiss: () => void
}) {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 80,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(14,8,2,0.5)',
        animation: 'fadeIn 0.5s ease both',
      }}
      onClick={onDismiss}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: 380,
          margin: '0 24px',
          background: 'rgba(247,240,220,0.98)',
          borderTop: `2px solid ${accent}`,
          padding: '30px 34px 26px',
          boxShadow: '0 24px 70px rgba(0,0,0,0.55)',
          animation: 'annotationRise 0.55s cubic-bezier(0.22,1,0.36,1) both',
      }}
      >
        <div
          style={{
            fontFamily: 'Outfit, sans-serif',
            fontSize: 10,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: '#8B4049',
            marginBottom: 14,
          }}
        >
          {label}
        </div>
        <div
          style={{
            fontFamily: 'Lora, serif',
            fontStyle: 'italic',
            fontSize: 19,
            lineHeight: 1.5,
            color: '#1E0E04',
            marginBottom: 24,
          }}
        >
          {body}
        </div>
        <button
          onClick={onDismiss}
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
          }}
        >
          {action}
        </button>
      </div>
    </div>
  )
}
