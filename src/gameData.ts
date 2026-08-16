// ─────────────────────────────────────────────────────────────
// Onam Heist — investigation data model
// Reusable structures so more clues (and later, suspects) can slot in.
// ─────────────────────────────────────────────────────────────

export type ObjectKind = 'clue' | 'context' | 'herring'

export interface EvidenceItem {
  id: string
  title: string
  time: string
  observation: string
  kind: ObjectKind
}

export interface HitArea {
  cx: number
  cy: number
  rx: number
  ry: number
}

export interface InvestigationObject {
  id: string
  name: string
  kind: ObjectKind
  time?: string
  /** Observation lines, revealed one after another for a cinematic beat. */
  observations: string[]
  /** If present, the player may add this note to their evidence. */
  evidence?: Omit<EvidenceItem, 'kind'>
  /** Screen-space region used for hover + click, in the 1400×900 viewBox. */
  hit: HitArea
  /** How far the scene pushes in when this object is inspected. */
  zoom: number
  /** Short label shown, understated, on hover. */
  label: string
}

// The three meaningful clues (payasam, ladle, kitchen) advance the case.
// The rest are context or red herrings the player must judge for themselves.
export const INVESTIGATION_OBJECTS: InvestigationObject[] = [
  {
    id: 'payasam-area',
    name: 'Payasam Vessel',
    kind: 'clue',
    time: '12:43 PM',
    observations: [
      'The vessel is still warm. Someone moved it recently.',
      'There is a small trail of droplets leading away from the leaf.',
    ],
    evidence: {
      id: 'payasam-area',
      title: 'Payasam Vessel',
      time: '12:43 PM',
      observation: 'Still warm. Recently moved. Droplets lead away from the leaf.',
    },
    hit: { cx: 924, cy: 366, rx: 86, ry: 60 },
    zoom: 1.85,
    label: 'The empty place',
  },
  {
    id: 'ladle',
    name: 'Serving Ladle',
    kind: 'clue',
    time: '12:44 PM',
    observations: [
      "The ladle isn't where the other serving utensils were left.",
      'A thin smear of payasam remains along the handle.',
    ],
    evidence: {
      id: 'ladle',
      title: 'Serving Ladle',
      time: '12:44 PM',
      observation: 'Out of place. Payasam residue remains on the handle.',
    },
    hit: { cx: 1082, cy: 448, rx: 30, ry: 72 },
    zoom: 1.9,
    label: 'A ladle',
  },
  {
    id: 'droplets',
    name: 'Trail of Droplets',
    kind: 'context',
    time: '12:44 PM',
    observations: [
      'A faint line of droplets across the floor.',
      'They lead away from the leaf — toward the far side of the room.',
    ],
    hit: { cx: 1120, cy: 300, rx: 52, ry: 34 },
    zoom: 2.0,
    label: 'Something on the floor',
  },
  {
    id: 'kitchen',
    name: 'Kitchen Entrance',
    kind: 'clue',
    time: '12:45 PM',
    observations: [
      'The kitchen is still warm. Someone has been cooking recently.',
      'The droplets thin out just past the doorway.',
    ],
    evidence: {
      id: 'kitchen',
      title: 'Kitchen Entrance',
      time: '12:45 PM',
      observation: 'Still warm. The trail of droplets leads toward the doorway.',
    },
    hit: { cx: 1281, cy: 240, rx: 46, ry: 150 },
    zoom: 1.7,
    label: 'The kitchen',
  },
  {
    id: 'water-tumbler',
    name: 'Water Tumbler',
    kind: 'herring',
    observations: ['Still half full.', 'Someone was sitting here recently.'],
    evidence: {
      id: 'water-tumbler',
      title: 'Water Tumbler',
      time: '12:41 PM',
      observation: 'Half full. Someone was sitting here recently.',
    },
    hit: { cx: 222, cy: 430, rx: 34, ry: 56 },
    zoom: 2.0,
    label: 'A tumbler',
  },
  {
    id: 'kasavu',
    name: 'Kasavu Cloth',
    kind: 'herring',
    observations: ['Freshly folded.', 'No obvious disturbance.'],
    evidence: {
      id: 'kasavu',
      title: 'Kasavu Cloth',
      time: '12:40 PM',
      observation: 'Freshly folded. Undisturbed.',
    },
    hit: { cx: 266, cy: 592, rx: 84, ry: 38 },
    zoom: 1.7,
    label: 'Folded cloth',
  },
  {
    id: 'phone',
    name: 'Phone',
    kind: 'herring',
    time: '12:39 PM',
    observations: [
      'Screen locked. 12:39 PM.',
      'Three unread messages.',
      'One of them reads: "Did you bring it?"',
    ],
    evidence: {
      id: 'phone',
      title: 'Phone',
      time: '12:39 PM',
      observation: 'Locked. Three unread messages. One reads: "Did you bring it?"',
    },
    hit: { cx: 430, cy: 652, rx: 44, ry: 62 },
    zoom: 2.3,
    label: 'A phone',
  },
  {
    id: 'photograph',
    name: 'Family Photograph',
    kind: 'context',
    observations: [
      'The family, earlier today, before the Sadya was served.',
      'Worth remembering who stood where.',
    ],
    evidence: {
      id: 'photograph',
      title: 'Family Photograph',
      time: 'Earlier',
      observation: 'The family before the Sadya. Positions worth remembering.',
    },
    hit: { cx: 1211, cy: 666, rx: 64, ry: 52 },
    zoom: 2.0,
    label: 'A photograph',
  },
  {
    id: 'banana-leaf',
    name: 'Banana Leaf',
    kind: 'context',
    observations: [
      'The Sadya is nearly complete — every dish in its place.',
      'Every dish but one.',
    ],
    hit: { cx: 648, cy: 556, rx: 128, ry: 28 },
    zoom: 1.5,
    label: 'The Sadya',
  },
  {
    id: 'brass-vessel',
    name: 'Brass Serving Vessel',
    kind: 'context',
    observations: ['Sambar, still steaming.', 'This one was never moved.'],
    hit: { cx: 1156, cy: 486, rx: 62, ry: 54 },
    zoom: 1.7,
    label: 'A brass vessel',
  },
]

export const MEANINGFUL_CLUE_THRESHOLD = 3
