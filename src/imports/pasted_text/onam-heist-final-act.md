ONAM HEIST — FINAL ACT: RECONSTRUCT THE HEIST

The investigation and interrogation system is now working.

DO NOT rebuild or redesign the existing game.

DO NOT change:
- the diorama
- existing object interactions
- existing character interactions
- dialogue
- evidence notebook
- photo system
- evidence gating
- investigation notes
- suspect notes
- visual art direction

This iteration adds ONLY the final gameplay loop:

INVESTIGATE
→ CROSS-CHECK
→ RECONSTRUCT
→ ACCUSE
→ REVEAL

The player must now be able to actually solve and finish the mystery.

==================================================
THE CORE MYSTERY
==================================================

The payasam disappeared from the Sadya between:

12:38 PM
and
12:42 PM

The player has already gathered evidence and questioned people.

The final act should ask:

WHO MOVED THE PAYASAM?

and:

WHY?

The player must use evidence they personally discovered.

Do NOT simply tell them the answer.

==================================================
1. FINAL INVESTIGATION THRESHOLD
==================================================

The accusation should NOT be available immediately.

Require the player to have enough information to make a reasonable deduction.

Use the existing game state.

The player should need:

- at least 3 meaningful pieces of evidence
- at least 3 people questioned
- at least 1 photograph inspected
- at least 1 contradiction discovered

Do not require every optional clue.

If the requirements are not met, the accusation action remains unavailable.

Do NOT show a progress bar saying:

"3/4 clues collected"

Instead, keep the requirement invisible and let the investigation naturally guide the player.

==================================================
2. THE RECONSTRUCTION
==================================================

When the player has gathered enough information, introduce a new action:

RECONSTRUCT WHAT HAPPENED

This should feel like the natural conclusion of the investigation.

Transition from the current environment into a minimal forensic reconstruction interface.

DO NOT create a generic detective dashboard.

DO NOT create a red-string conspiracy board.

Instead, create a simple visual timeline of the critical four-minute window:

12:38
12:39
12:40
12:41
12:42

The player sees a physical/tabletop representation of the timeline.

Evidence they collected appears as small cards or photographs.

==================================================
3. PLAYER-DRIVEN TIMELINE
==================================================

Allow the player to place discovered evidence onto the timeline.

Examples:

12:38
Anu's photograph

12:39
Phone notification

12:40
Sadya preparation

12:42
Missing payasam

Only use evidence the player actually discovered.

Do not automatically solve the timeline.

The player should be able to drag evidence onto approximate positions.

On mobile, use tap-to-place.

==================================================
4. IMPORTANT CONNECTION
==================================================

When the player places related evidence near each other, subtly recognize the connection.

For example:

A photograph timestamp
+
a person's statement
+
the missing vessel

may create a subtle annotation:

"These events overlap."

Do not say:

"CORRECT!"

Do not reveal the answer.

The goal is to help the player reason, not to grade every move.

==================================================
5. SUSPECT RECONSTRUCTION
==================================================

Below or beside the timeline, show the six suspects as small physical notes:

AMMACHI
APPA
ANU
KUNJUMOL
UNCLE
NEIGHBOUR

The player can select a suspect.

When selected, show only the information the player has personally discovered about them.

Example:

KUNJUMOL

CLAIM:
"I stayed in the kitchen."

KNOWN:
Kitchen activity at 12:40.

CONTRADICTION:
Photograph suggests she was elsewhere.

Do NOT show hidden information.

==================================================
6. THE ACCUSATION
==================================================

Once the player has reconstructed enough of the timeline, reveal:

WHO MOVED THE PAYASAM?

Show the six suspects.

The player chooses one.

Then ask:

WHY?

Offer several plausible motivations.

For example:

"I wanted it for myself."

"I was hiding something."

"I took it outside."

"I was taking it to someone."

Do not make the correct answer visually different.

The player must commit.

==================================================
7. COMMITMENT MOMENT
==================================================

Before revealing the truth, show a quiet confirmation:

YOUR THEORY

[SELECTED SUSPECT]

moved the payasam because

[SELECTED REASON]

Then:

EVIDENCE YOU'RE BASING THIS ON

Show the 2–4 pieces of evidence the player used.

Then:

MAKE YOUR ACCUSATION

Once pressed, the player cannot change their answer.

This should feel consequential.

Do NOT use:

YOU WIN
GAME OVER
CORRECT ANSWER
WRONG ANSWER

==================================================
8. THE REVEAL
==================================================

After the accusation, return briefly to the original Sadya environment.

Freeze the scene.

Then reveal what actually happened.

The reveal should be emotionally warm and slightly surprising.

The actual truth:

The payasam WAS taken by one of the people present.

But it was not stolen for selfish reasons.

It was secretly taken outside the house to someone who could not attend the Sadya.

The person who took it was trying to make sure that person still got a taste of Onam.

The "heist" was an act of care.

IMPORTANT:

Do not make this reveal overly sentimental.

Do not use a long paragraph explaining the moral.

Let the evidence establish the truth.

==================================================
9. REVEAL THROUGH EVIDENCE
==================================================

Do not simply display:

"THE CULPRIT WAS X."

Instead, reconstruct the sequence visually.

Example:

12:38
The payasam is still present.

12:39
A photograph captures the dining room.

12:40
The suspect leaves the kitchen.

12:41
The vessel is moved.

12:42
The vessel is gone.

Then reveal where it went.

The player should realize:

"Oh."

The earlier clues should suddenly make sense.

==================================================
10. MAKE THE REVEAL RECONTEXTUALIZE EARLIER CLUES
==================================================

This is extremely important.

Several clues that previously seemed suspicious should now have innocent explanations.

For example:

The suspicious phone message:

"Did you bring it?"

was actually referring to the payasam.

The wet footprints:

were from the person carrying it outside.

The missing serving ladle:

was taken with the vessel.

The strange statement:

was because the person didn't want to spoil the surprise.

The photograph:

contained the crucial movement.

The player should feel:

"I should have noticed that."

This is the satisfying part of a mystery.

==================================================
11. WRONG ACCUSATION
==================================================

If the player chooses incorrectly:

Do NOT punish them.

Do NOT show a generic:

"YOU LOST."

Instead:

"Your theory doesn't fully fit."

Then reveal:

- what their theory explained
- what evidence contradicted it
- what they missed

Then allow them to continue investigating OR retry the accusation.

However, make the correct solution discoverable from the existing evidence.

Do not introduce completely new information after a wrong accusation.

==================================================
12. CORRECT ACCUSATION
==================================================

If the player chooses correctly:

Do not use fireworks, confetti, XP or badges.

Instead:

"Your theory fits."

Then begin the reveal.

After the reveal:

show the original Sadya scene again.

The missing place is now empty only because the food has been shared elsewhere.

Then show:

"Sometimes a heist is just another way of taking something home."

Keep this final line optional and understated.

==================================================
13. FINAL VISUAL MOMENT
==================================================

Create a final cinematic moment.

Return to the Kerala home.

The family continues eating.

The camera slowly pulls back.

The environment becomes quieter.

Then:

ONAM HEIST

THIRUVONAM · 12:42 PM

CASE CLOSED

Do NOT add:

- leaderboard
- score
- XP
- badges
- social feed
- generic CTA
- newsletter
- unnecessary credits

The game should end like a short interactive film.

==================================================
14. REPLAYABILITY
==================================================

After the ending, provide only:

PLAY AGAIN

If replayed:

- reset evidence
- reset dialogue state
- reset discovered objects
- reset accusation
- reset timeline
- reset final state

Do not randomly change the culprit.

The mystery should remain internally consistent.

==================================================
15. IMPORTANT IMPLEMENTATION REQUIREMENTS
==================================================

Use the existing game state.

Do not duplicate evidence data.

Do not create a second independent evidence system.

Reuse:

- discoveredEvidence
- questionedSuspects
- inspectedPhotos
- dialogue state
- contradiction state

Add only the state needed for:

- timeline placement
- selected suspect
- selected motive
- accusation
- final reveal

Make sure state persists correctly when moving:

scene → reconstruction → accusation → reveal

and back.

==================================================
16. BUG PREVENTION
==================================================

Before finishing:

Test every path.

TEST 1:
Player investigates enough clues → reconstruction unlocks.

TEST 2:
Player has insufficient evidence → reconstruction remains unavailable.

TEST 3:
Player questions suspects in a different order → game still works.

TEST 4:
Player discovers optional clues → no broken state.

TEST 5:
Player makes wrong accusation → correct feedback.

TEST 6:
Player makes correct accusation → reveal.

TEST 7:
Player replays → completely clean reset.

TEST 8:
No decorative element intercepts clicks.

TEST 9:
No undefined state causes runtime errors.

TEST 10:
No evidence appears in the final reconstruction unless the player actually discovered it.

==================================================
17. FINAL QUALITY BAR
==================================================

The completed game should feel like:

A SHORT INTERACTIVE MYSTERY SET DURING ONAM.

Not:

a website with a mystery section.

Not:

a detective dashboard.

Not:

a generic AI game.

The complete experience should be:

1. Notice something is missing.
2. Explore.
3. Inspect.
4. Talk.
5. Cross-check.
6. Form a theory.
7. Accuse.
8. Discover what really happened.
9. Understand why.

The final emotional reaction should be:

"I thought I was investigating a theft, but I was actually uncovering an act of care."

Do not add any additional major feature beyond this final act.