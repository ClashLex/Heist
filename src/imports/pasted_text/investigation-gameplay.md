NOW MOVE TO THE NEXT GAMEPLAY LAYER: THE INVESTIGATION.

Preserve the current visual scene, art direction, Sadya, environment, lighting, typography and overall composition.

DO NOT redesign the scene.

DO NOT add suspects yet.

DO NOT add the deduction board yet.

DO NOT add scoring, timer, leaderboard or inventory systems.

The goal of this iteration is to make the environment itself investigatable.

==================================================
CORE EXPERIENCE
===============

The player should now be able to explore the dining scene and inspect objects to figure out what happened to the missing payasam.

The interaction loop should be:

OBSERVE
→ HOVER / TAP OBJECT
→ INSPECT
→ DISCOVER DETAIL
→ DECIDE WHETHER IT MATTERS
→ ADD IMPORTANT EVIDENCE
→ CONTINUE SEARCHING

Do not make every object a clue.

Some objects should simply establish atmosphere.

The player should have to actually observe the scene.

==================================================

1. INTERACTIVE OBJECTS
   ==================================================

Make these objects independently interactive:

PRIMARY INVESTIGATION OBJECTS:

1. Missing payasam position
2. Nearby serving ladle
3. Water tumbler
4. Banana leaf
5. Brass serving vessel
6. Nearby food spill / droplets
7. Folded kasavu cloth
8. Phone
9. Family photograph
10. Kitchen entrance

Not all of these should immediately reveal important evidence.

Some should provide contextual observations.

==================================================
2. HOVER / TAP BEHAVIOUR
========================

When the player moves over an interactive object:

Do NOT show a giant glowing outline.

Instead:

* very subtle brightness change
* tiny scale shift
* soft shadow change
* small cursor/interaction response
* optional understated label

The environment must remain visually clean.

The player should discover interactable objects naturally.

Do not put icons over every object.

Do not show "CLICK HERE".

==================================================
3. OBJECT INSPECTION
====================

When an object is clicked:

Create a subtle cinematic focus transition.

The camera should slightly zoom toward the selected object.

Dim the surrounding scene very slightly.

Keep the original environment visible.

Do NOT open a giant modal window.

The object should remain physically integrated with the scene.

Show a small investigation annotation beside or below the object.

Example:

OBJECT:
PAYASAM AREA

TIME:
12:43 PM

OBSERVATION:
"The brass vessel was here recently.
The leaf is still damp beneath it."

Then provide a small action:

[ ADD TO EVIDENCE ]

or

[ BACK ]

Keep the interaction elegant.

==================================================
4. FIRST REAL CLUE
==================

The missing payasam area is the first guaranteed meaningful clue.

When inspected:

12:43 PM

"The vessel is still warm.

Someone moved it recently."

Then reveal a second subtle observation:

"There is a small trail of droplets leading away from the leaf."

Do NOT tell the player where the trail leads yet.

Do NOT reveal the culprit.

The player should now have a reason to investigate the surrounding scene.

==================================================
5. SECOND CLUE — THE LADLE
==========================

Make the nearby serving ladle inspectable.

When inspected:

"The ladle isn't where the other serving utensils were left."

Then add a subtle visual detail:

"A thin smear of payasam remains along the handle."

Allow the player to add this to evidence.

This should establish:

MISSING VESSEL
+
RECENT MOVEMENT
+
PAYASAM TRACE

without explicitly explaining the conclusion.

==================================================
6. RED HERRINGS
===============

Introduce 2–3 atmospheric objects that look potentially suspicious but do not immediately contribute to the central mystery.

For example:

WATER TUMBLER:

"Still half full.
Someone was sitting here recently."

FOLDED KASAVU CLOTH:

"Freshly folded.
No obvious disturbance."

FAMILY PHONE:

"Screen locked.
Three unread messages."

These should create curiosity without giving away the mystery.

Do NOT create fake clues that are completely meaningless.

They should establish the environment and become potentially useful later.

==================================================
7. THE PHOTOGRAPH
=================

The family photograph should be an important environmental clue, but NOT solve the mystery.

When inspected:

Show a slightly closer view of the photograph.

It should depict the family preparing for Sadya earlier that day.

Include subtle visual information that may become relevant later:

* approximate number of people
* who was in the kitchen
* who was setting the table
* someone arriving late
* position of the serving vessels

Do not put explanatory text over the photograph.

Let the player notice the details.

The photograph should become useful when we introduce suspects later.

==================================================
8. THE PHONE
============

The phone should be inspectable.

Do not create a generic smartphone UI.

Show a believable lock screen / notification state.

For now:

12:39 PM
3 unread messages

One notification can say something ambiguous such as:

"Did you bring it?"

Do NOT explain what "it" means.

Do NOT make this obviously the solution.

This should become a clue the player remembers later.

==================================================
9. KITCHEN ENTRANCE
===================

The kitchen entrance should be interactable.

When inspected:

"The kitchen is still warm.

Someone has been cooking recently."

Allow the player to notice a subtle trail of droplets or a disturbed floor area leading toward this direction.

Do not create an obvious glowing path.

Do not tell the player to follow it.

The player should discover the connection themselves.

==================================================
10. EVIDENCE DRAWER
===================

Now make the existing EVIDENCE control functional.

Clicking EVIDENCE opens a compact detective notebook/evidence drawer.

It should contain only evidence the player has actually discovered.

Example:

EVIDENCE · 02

01
PAYASAM VESSEL

"Still warm.
Recently moved."

02
LADLE

"Payasam residue remains on the handle."

Do not show undiscovered clues.

Do not show a complete solution.

Do not use a conventional dashboard.

The evidence drawer should feel like a physical investigation notebook.

Use:

* warm paper
* subtle texture
* small handwritten/editorial typography
* tiny timestamps
* restrained brass accents

Keep it compact enough that the player still feels connected to the scene.

==================================================
11. EVIDENCE COLLECTION
=======================

When the player discovers important evidence:

Use a subtle confirmation animation.

For example:

the observation card slides into the evidence drawer.

Then briefly show:

EVIDENCE ADDED

Do not use:

+100 XP
CLUE UNLOCKED!
ACHIEVEMENT!
LEVEL UP!

This is a mystery, not an arcade game.

==================================================
12. PLAYER AGENCY
=================

Do NOT force the player through a predetermined sequence.

The player should be able to inspect objects in any order.

For example:

They can inspect the phone first.

Or the photograph.

Or the missing vessel.

Or the kitchen.

The game state should track discovered evidence independently of interaction order.

==================================================
13. NO HAND-HOLDING
===================

Do NOT put glowing arrows around clues.

Do NOT continuously tell the player what to inspect.

Do NOT make every interactive object pulse.

Do NOT create a "NEXT CLUE" button.

The player should feel like they are investigating.

If the player becomes stuck, use a very subtle hint system later.

Do not implement that yet.

==================================================
14. GAME STATE
==============

Implement clean state tracking for:

discoveredObjects

collectedEvidence

inspectedObjects

currentInspection

evidenceCount

Use reusable data structures so additional clues and suspects can be added later.

Example conceptual structure:

object:
{
id,
name,
type,
observation,
evidence,
inspected
}

Do not over-engineer this.

The important thing is that the investigation state persists correctly.

==================================================
15. INVESTIGATION COMPLETION
============================

Do NOT create a final conclusion yet.

Instead, once the player has discovered the first 3 meaningful pieces of evidence:

show a subtle change in the interface:

INVESTIGATION NOTE

"Something was moved from the Sadya.
The kitchen may not be the whole story."

Then allow the player to continue exploring.

This should naturally lead into the next stage where we introduce the people who were present.

==================================================
16. QUALITY BAR
===============

Before finishing, test the experience as a player.

The player should:

1. Enter the scene.
2. Notice something is wrong.
3. Discover the missing payasam.
4. Inspect it.
5. Find the first clue.
6. Explore another object.
7. Discover a second clue.
8. Open the evidence drawer.
9. See only what they actually discovered.
10. Begin forming their own theory.

The experience should feel like:

"Let me investigate this."

NOT:

"Tell me what to click next."

==================================================
IMPORTANT
=========

Preserve the current visual design.

Do not rebuild the environment.

Do not add suspects.

Do not add the deduction board.

Do not add the final twist.

Do not add scoring.

Do not add a timer.

Do not add unnecessary UI.

This iteration is ONLY about transforming the beautiful Sadya scene into a genuinely investigatable environment.

The player should finish this iteration thinking:

"I found something. There is more going on here."
