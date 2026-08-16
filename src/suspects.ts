// ─────────────────────────────────────────────────────────────
// Onam Heist — the six people present during the incident.
// Each carries one true detail, one misleading detail, and one
// inconsistency — but not all of them point at the payasam.
// Nothing here names the culprit.
// ─────────────────────────────────────────────────────────────

import type { HitArea } from './gameData'

export interface SuspectQuestion {
  id: string
  q: string
  a: string
  /** Only offered once this photo has been inspected. */
  photoReq?: string
  /** Only offered once this evidence has been collected. */
  evidenceReq?: string
  /** Opens Anu's photographs instead of giving a spoken answer. */
  opensPhotos?: boolean
}

export interface Suspect {
  id: string
  name: string
  relationship: string
  location: string
  /** Opening line, shown before any question. */
  claim: string
  /** A quiet, observable tell — atmosphere, not proof. */
  observableDetail: string
  questions: SuspectQuestion[]
  hit: HitArea
  zoom: number
}

export interface SuspectPhoto {
  id: string
  time: string
  caption: string // neutral — never names the hidden detail
}

// Chronological — the four-minute window sits between the 12:38 and 12:42 frames.
export const ANU_PHOTOS: SuspectPhoto[] = [
  { id: 'photo-01', time: '10:18 AM', caption: 'Family preparing the Sadya.' },
  { id: 'photo-03', time: '12:38 PM', caption: 'The dining leaf, before the meal.' },
  { id: 'photo-02', time: '12:40 PM', caption: 'The kitchen doorway.' },
  { id: 'photo-04', time: '12:42 PM', caption: 'A family photograph.' },
]

export const SUSPECTS: Suspect[] = [
  {
    id: 'ammachi',
    name: 'Ammachi',
    relationship: 'Grandmother · organised the Sadya',
    location: 'By the dining area',
    claim: "I was serving everyone. It's my Sadya — I know where every dish belongs.",
    observableDetail: 'Ivory & gold kasavu saree, silver bun heavy with jasmine. Her eyes keep drifting toward the kitchen doorway.',
    questions: [
      {
        id: 'am-where',
        q: 'Where were you at 12:40?',
        a: "By the leaves, serving. I don't sit until everyone has eaten.",
      },
      {
        id: 'am-payasam',
        q: 'Did you see the payasam?',
        a: 'I served it myself, at 12:38. It was gone by 12:42. Not a minute later.',
      },
      {
        id: 'am-who',
        q: 'Who was in the dining room?',
        a: 'Everyone drifts through. Anu with her photos. My brother — late, as always.',
      },
      {
        id: 'am-brother',
        q: 'Your brother says he arrived after serving.',
        a: 'Does he? He was here when I set the payasam down. I remember his face.',
        photoReq: 'photo-04',
      },
    ],
    hit: { cx: 300, cy: 276, rx: 34, ry: 58 },
    zoom: 1.9,
  },
  {
    id: 'appa',
    name: 'Appa',
    relationship: 'Father',
    location: 'Out on the veranda',
    claim: 'I stepped out to the veranda for a phone call.',
    observableDetail: 'Royal navy blue silk kurta, phone pressed screen-down against his thigh.',
    questions: [
      {
        id: 'ap-where',
        q: 'Where were you at 12:40?',
        a: 'Outside. On the phone. You can check the log if you like.',
      },
      {
        id: 'ap-who',
        q: 'Who did you call?',
        a: "Work. It couldn't wait — even on Onam.",
      },
      {
        id: 'ap-see',
        q: 'Did you see anyone near the dining area?',
        a: 'From the veranda? No. Though Kunjumol was in and out of the kitchen.',
      },
      {
        id: 'ap-photo',
        q: 'A 12:42 photo shows you at the table, not outside.',
        a: "…The call ended at 12:36. I came back in after that. I wasn't doing anything.",
        photoReq: 'photo-04',
      },
    ],
    hit: { cx: 1360, cy: 470, rx: 32, ry: 62 },
    zoom: 1.9,
  },
  {
    id: 'anu',
    name: 'Anu',
    relationship: 'Niece · took photos all morning',
    location: 'By the window',
    claim: 'I was taking photos all morning. Onam only comes once a year.',
    observableDetail: 'Marigold yellow festive kurti, phone warm in her hand and nearly out of storage.',
    questions: [
      {
        id: 'an-where',
        q: 'Where were you at 12:40?',
        a: 'By the window — the best light. Then I moved around the house.',
      },
      {
        id: 'an-photos',
        q: 'May I see your photographs?',
        a: '',
        opensPhotos: true,
      },
      {
        id: 'an-payasam',
        q: 'Did you see the payasam?',
        a: "In my 12:38 shot it's right there on the leaf. After that I was photographing people, not food.",
      },
      {
        id: 'an-kunjumol',
        q: 'In one photo, Kunjumol carries a vessel from the kitchen.',
        a: "Does she? I just point and click. I don't always see what I catch.",
        photoReq: 'photo-02',
      },
    ],
    hit: { cx: 116, cy: 316, rx: 32, ry: 56 },
    zoom: 2.0,
  },
  {
    id: 'kunjumol',
    name: 'Kunjumol',
    relationship: 'Helping in the kitchen',
    location: 'In the kitchen doorway',
    claim: 'I was in the kitchen the whole time.',
    observableDetail: 'Crimson red cotton saree with sleeves rolled to the elbow. Her hands are still damp.',
    questions: [
      {
        id: 'ku-where',
        q: 'Where were you at 12:40?',
        a: 'Kitchen. Frying the last of the pappadam.',
      },
      {
        id: 'ku-leave',
        q: 'Did you leave the kitchen at all?',
        a: 'No. Someone had to keep the stove going.',
      },
      {
        id: 'ku-payasam',
        q: 'Did you see the payasam?',
        a: "Ammachi carried it out herself. I only make it — I don't serve it.",
      },
      {
        id: 'ku-vessel',
        q: 'A 12:40 photo shows you carrying a vessel from the kitchen.',
        a: 'That— that was the sambar. I was refilling the sambar. Not the payasam.',
        photoReq: 'photo-02',
      },
      {
        id: 'ku-phone',
        q: 'Your phone — 12:39 PM — a message: "Did you bring it?"',
        a: 'My mother. She asks after everything — the sambar, the payasam, all of it. She worries.',
        evidenceReq: 'phone',
      },
    ],
    hit: { cx: 1281, cy: 352, rx: 40, ry: 66 },
    zoom: 1.9,
  },
  {
    id: 'uncle',
    name: 'Uncle',
    relationship: "Ammachi's brother",
    location: 'Near the entrance',
    claim: 'I arrived just after everything was served. Traffic.',
    observableDetail: 'Emerald green silk kurta, cream-gold angavastram over one shoulder. Fresh road dust on his shoes.',
    questions: [
      {
        id: 'un-when',
        q: 'When did you arrive?',
        a: 'Around 12:45. Late, as usual.',
      },
      {
        id: 'un-payasam',
        q: 'Did you see the payasam?',
        a: "By the time I sat, half the leaf was eaten. I didn't notice.",
      },
      {
        id: 'un-wait',
        q: 'Where did you wait?',
        a: 'By the entrance, catching my breath.',
      },
      {
        id: 'un-photo',
        q: 'A 12:42 photo shows you already seated.',
        a: "…Perhaps I'm confusing the times. It was a long morning.",
        photoReq: 'photo-04',
      },
    ],
    hit: { cx: 1300, cy: 742, rx: 34, ry: 58 },
    zoom: 1.9,
  },
  {
    id: 'neighbour',
    name: 'Neighbour',
    relationship: 'Stopped by during preparations',
    location: 'At the threshold, outside',
    claim: 'I only came to return the vessel.',
    observableDetail: 'Terracotta orange shirt, a folded kasavu cloth over one arm — whatever it wrapped is gone.',
    questions: [
      {
        id: 'ne-vessel',
        q: 'Which vessel?',
        a: 'The big brass one Ammachi lent us for payasam last week. I brought it back this morning.',
      },
      {
        id: 'ne-when',
        q: 'What time did you come?',
        a: "Early — before eleven. I didn't stay for the meal.",
      },
      {
        id: 'ne-see',
        q: 'Did you see the payasam being made?',
        a: 'Kunjumol was stirring it when I left. It smelled wonderful.',
      },
    ],
    hit: { cx: 110, cy: 168, rx: 32, ry: 48 },
    zoom: 2.1,
  },
]

/** Photos whose inspection quietly unlocks a follow-up somewhere. */
export const SUSPECT_NOTE_THRESHOLD = 3
