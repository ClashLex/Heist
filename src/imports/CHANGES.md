# 📝 Onam Heist — Summary of Changes & Enhancements

> **Project**: Onam Heist (ഓണം ഹെയ്‌സ്റ്റ്)  
> **Event**: Friends of Figma (FoF) Kochi Make-a-thon — Onam Edition  
> **Venue**: TinkerSpace Kochi, Kerala  
> **Date**: August 16, 2026  
> **Stack**: React 19 · TypeScript 5.7 · Tailwind CSS v4 · Vite 8 · Figma Make  

---

## 🌟 Executive Summary

Following a comprehensive analysis of the codebase, a complete overhaul was executed across visual assets, character identification systems, scene architecture, evidence consistency, and project configuration. All characters are now visually distinguishable in their signature festive attires across the dining room, conversation busts, and Anu's Polaroid photographs. The left-wall window architecture was built out with authentic Kerala woodwork, the mobile lock screen was fixed with a crisp `12:39 PM` timestamp, and the documentation was fully reconstructed without spoiling the mystery.

---

## 📊 Summary of Modified Files

```
.figma/make/site.json            |   4 +-
.gitignore                       |  27 +-
README.md                        | 154 +++++++++++
package.json                     |  23 +-
src/components/DiningScene.tsx   |  92 +++++--
src/components/FinalAct.tsx      |  45 +++-
src/components/Interrogation.tsx |  27 +-
src/components/SuspectArt.tsx    | 560 ++++++++++++++++++++++++++++++---------
src/suspects.ts                  |  35 ++-
9 files changed, 772 insertions(+), 195 deletions(-)
```

---

## 🎨 1. Distinctive Character Dress & Identification System

### File: [`src/components/SuspectArt.tsx`](file:///c:/Users/ansil/Downloads/figma%20makeathon/heistt/src/components/SuspectArt.tsx)

#### A. Character Palette Definition (`CHARACTER_PALETTES`)
Defined a dedicated, culturally authentic color dictionary for all 6 characters:

| Character | Role | Primary Color | Accent / Trim | Attire Description |
|---|---|---|---|---|
| **Ammachi** | Grandmother | `#FFFDF5` (Ivory Cream) | `#D4AF37` (Rich Gold) | *Ivory & Gold Kasavu Saree with silver hair bun* |
| **Appa** | Father | `#1E3A8A` (Royal Navy Blue) | `#93C5FD` (Sky Blue) | *Royal Navy Blue Silk Kurta* |
| **Anu** | Niece | `#EA580C` / `#F59E0B` (Marigold Yellow) | `#FDE047` (Bright Gold) | *Marigold Yellow Festive Kurti* |
| **Kunjumol** | Kitchen Helper | `#991B1B` (Deep Crimson Red) | `#DC2626` / `#F59E0B` | *Crimson Red Cotton Saree with rolled sleeves* |
| **Uncle** | Brother | `#166534` (Forest Emerald Green) | `#FEF08A` (Cream-Gold) | *Emerald Green Kurta & Angavastram Shawl* |
| **Neighbour** | Visitor | `#C2410C` (Terracotta Orange) | `#FFFBEB` (Kasavu) | *Terracotta Orange Shirt & folded cloth* |

#### B. Room Silhouette Presences (`SuspectPresence`)
* Replaced uniform brown silhouettes with each character's distinct colored clothing.
* Added custom accessories and physical tells: Ammachi's jasmine-wrapped silver hair bun and golden zari drape, Appa's phone held to ear with screen glow, Anu's camera/phone, Kunjumol's high hair knot, wet hands and ladle, Uncle's cream-gold shawl and mustache, and Neighbour's folded Kasavu cloth.

#### C. Conversation Portrait Busts (`SuspectBust`)
* Added detailed portrait busts for the interrogation and dossier views with matching garment necklines, earrings, accessories, and distinct color schemes.

#### D. Anu's Investigation Photographs (`PhotoArt`)
* **`photo-01` (10:18 AM — Sadya Preparation)**: Updated with family members wearing their distinct colors (Ivory/Gold, Crimson, Yellow, Navy Blue).
* **`photo-02` (12:40 PM — Kitchen Doorway)**: Updated to clearly show a figure in a **Crimson Red Saree** (Kunjumol) carrying the brass vessel from the kitchen, giving the player an unmistakable visual clue.
* **`photo-03` (12:38 PM — The Dining Leaf)**: Full leaf with the Payasam vessel present at 12:38 PM.
* **`photo-04` (12:42 PM — Family Photograph)**: Updated to show the figure in **Emerald Green** (Uncle) already seated at the table before 12:45 PM, alongside the damp empty spot on the leaf.

---

## 🪟 2. Scene Architecture & Window Reconstruction

### File: [`src/components/DiningScene.tsx`](file:///c:/Users/ansil/Downloads/figma%20makeathon/heistt/src/components/DiningScene.tsx)

* **Traditional Kerala Wooden Window**:
  - Replaced the plain dark left strip with a full architectural Kerala teak window (`x: 18` to `x: 202`, `y: 68` to `y: 270`).
  - Added carved teak outer frames, a top lintel with gold trim, double open wooden shutters with brass latches, lower veranda balustrade railings, and a solid window sill.
* **Courtyard Garden View**:
  - Rendered a sunny outdoor Kerala garden backdrop (`url(#gardenSky)`) through the window opening with tropical banana and palm foliage.
* **Sunlight Rays**:
  - Enhanced natural morning light shafts pouring across the teak wooden floor into the dining hall.
* **Mobile Phone Lock Screen Fix**:
  - Replaced the blurry lock screen with a high-contrast display.
  - Crisp **`12:39`** and **`12:39 PM`** timestamps with `THIRUVONAM` date header.
  - Added a readable notification card from **Amma**: *“Did you bring it?”*.

---

## 👥 3. Suspect Hitboxes & Gated Dialogue

### File: [`src/suspects.ts`](file:///c:/Users/ansil/Downloads/figma%20makeathon/heistt/src/suspects.ts)

* **Hitbox & Placement Adjustments**:
  - **Neighbour**: Adjusted from `cx: 100, cy: 130` to `cx: 110, cy: 168` (`rx: 32, ry: 48, zoom: 2.1`). Perfectly framed within the open window threshold without being clipped by the top header bar.
  - **Anu**: Adjusted to `cx: 116, cy: 316` (`rx: 32, ry: 56, zoom: 2.0`), standing inside near the window light.
* **Attire Hints in Dossiers**:
  - Added clothing and physical tell descriptions to each suspect's `observableDetail` field.
* **Timestamp & Dialogue Alignment**:
  - Synchronized Kunjumol's phone confrontation question with the `12:39 PM` timestamp and red saree visual cues.

---

## 🏷️ 4. UI Attire Badges in Dialogue & Dossiers

### File: [`src/components/Interrogation.tsx`](file:///c:/Users/ansil/Downloads/figma%20makeathon/heistt/src/components/Interrogation.tsx)
* Imported `CHARACTER_PALETTES` and added a stylized attire badge in the suspect's portrait column (e.g. `Ivory & Gold Kasavu Saree`, `Crimson Red Saree`, `Royal Navy Blue Kurta`).

### File: [`src/components/FinalAct.tsx`](file:///c:/Users/ansil/Downloads/figma%20makeathon/heistt/src/components/FinalAct.tsx)
* Enhanced `SuspectFileCard` in the reconstruction and accusation phases with color-coded left borders and attire badges matching each suspect.

---

## 📄 5. Project Documentation & Configuration Files

### File: [`README.md`](file:///c:/Users/ansil/Downloads/figma%20makeathon/heistt/README.md) `[NEW]`
* Comprehensive, spoiler-free documentation.
* Highlights the **Friends of Figma (FoF) Kochi Make-a-thon — Onam Edition** at **TinkerSpace Kochi (Aug 16)**.
* Documents gameplay mechanics, visual attire system, character roles, tech stack, architecture tree, and local development/build instructions without spoiling the culprit or ending.

### File: [`package.json`](file:///c:/Users/ansil/Downloads/figma%20makeathon/heistt/package.json)
* Updated project name to `onam-heist`.
* Added event description, author/license tags, and relevant keywords (`fof-kochi`, `figma-make`, `onam-makeathon`, `tinkerspace`, etc.).

### File: [`.figma/make/site.json`](file:///c:/Users/ansil/Downloads/figma%20makeathon/heistt/.figma/make/site.json)
* Replaced generic template description with the official title and metadata for the FoF Kochi Make-a-thon Onam Edition.

### File: [`.gitignore`](file:///c:/Users/ansil/Downloads/figma%20makeathon/heistt/.gitignore)
* Reconstructed with full coverage for `node_modules`, `.pnpm-store`, Vite build outputs, temporary caches, environment files, and OS files (`.DS_Store`, `Thumbs.db`).

---

## 🚀 Verification & Status

- **Development Server**: Running on `http://localhost:8443`
- **Build / Lint**: Clean, no unclosed tags or syntax errors
- **Git Branch**: All changes staged and committed on branch `update`
