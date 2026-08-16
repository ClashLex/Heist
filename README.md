# Onam Heist (ഓണം ഹെയ്‌സ്റ്റ്)

An interactive mystery game set in a Kerala home during **Thiruvonam**. A dish of
payasam vanishes from the Sadya leaf sometime between **12:38 and 12:42 PM** — and
it falls to you to work out how, and who.

> Built for the **Friends of Figma (FoF) Kochi Make-a-thon — Onam Edition** at
> **TinkerSpace Kochi**, Kerala · August 16, 2026.

---

## The Game

You investigate a single afternoon in a believable, top-down illustrated Kerala
home. The design leans into a warm, archival aesthetic — deep green, ivory,
teak brown, brass gold and muted red — with **Lora** for narrative text and
**Outfit** for the interface.

### How you play

- **Inspect the scene.** Click interactive objects to examine them
  cinematically — a spotlight and a gentle zoom rather than a giant modal.
- **Question six suspects.** Ammachi, Appa, Anu, Kunjumol, Uncle and the
  Neighbour each appear in their own signature festive attire. New questions
  unlock as you uncover evidence and study Anu's photographs.
- **Collect clues.** Findings gather in an evidence notebook.
- **Reconstruct the timeline.** Piece the four-minute window together on the
  deduction board, then make your accusation.

### The cast

| Character | Role | Attire |
|---|---|---|
| **Ammachi** | Grandmother · organised the Sadya | Ivory & Gold Kasavu Saree |
| **Appa** | Father | Royal Navy Blue Silk Kurta |
| **Anu** | Niece · photographer | Marigold Yellow Festive Kurti |
| **Kunjumol** | Kitchen helper | Crimson Red Cotton Saree |
| **Uncle** | Ammachi's brother | Emerald Green Kurta & Angavastram |
| **Neighbour** | Visitor | Terracotta Orange Shirt |

*(No spoilers here — the ending is yours to find.)*

---

## Tech Stack

- **React 19** + **TypeScript 5.7**
- **Vite 8**
- **Tailwind CSS v4** (via `@tailwindcss/vite`)
- **Figma Make**

## Project Structure

```
src/
  main.tsx              React entrypoint (mounts App, imports index.css)
  App.tsx               Primary application component
  index.css            Global styles + Tailwind + font wiring
  suspects.ts           Suspect data, dialogue, hitboxes
  gameData.ts           Shared types and scene data
  components/
    DiningScene.tsx     Illustrated top-down Kerala home (SVG)
    SuspectArt.tsx      Character palettes, silhouettes, busts, photos
    Interrogation.tsx   Conversation panel
    FinalAct.tsx        Timeline reconstruction & accusation
```

## Local Development

A Vite dev server runs on `http://localhost:8443` inside Figma Make.

```bash
pnpm install     # install dependencies
pnpm dev         # start the dev server
pnpm build       # produce a production build
pnpm preview     # preview the production build
```

---

Made with care for **FoF Kochi · Onam Edition · TinkerSpace Kochi**.
