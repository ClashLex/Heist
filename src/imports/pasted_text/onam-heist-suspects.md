ONAM HEIST — SUSPECTS & INTERROGATION

Now implement the NEXT gameplay layer: the people who were present during the missing-pay­asam incident.

IMPORTANT:
Preserve the existing visual environment, investigation system, evidence drawer, discovered clues and game state.

Do NOT redesign the Sadya scene.

Do NOT add the final deduction board yet.

Do NOT reveal the culprit.

The purpose of this iteration is to introduce the suspects and create a believable web of conflicting statements that the player must investigate.

==================================================
CORE EXPERIENCE
==================================================

The player has established:

- the payasam was present
- the vessel was moved recently
- there is a payasam trace
- someone was near the dining area
- the kitchen was recently active

Now introduce the people who were present.

The player should naturally ask:

"Who could have moved it?"

The suspects should NOT be presented as generic profile cards.

They should exist inside the Kerala home/environment.

The player should discover them through the investigation.

==================================================
1. SIX SUSPECTS
==================================================

Create six characters:

AMMACHI
The person who organized the Sadya.

APPA
Was supposedly outside making a phone call.

ANU
A younger family member taking photographs throughout the morning.

KUNJUMOL
Helping in the kitchen.

UNCLE
Arrived shortly before the Sadya.

NEIGHBOUR
Stopped by during the preparations.

Give each character:

- name
- relationship
- approximate location
- what they claim they were doing
- one observable detail
- one potentially suspicious inconsistency

Do NOT make anyone obviously guilty.

==================================================
2. CHARACTER DESIGN
==================================================

Characters should feel like believable members of one Kerala family.

Avoid:

- generic AI character portraits
- exaggerated costumes
- stereotypical "Indian character" design
- cartoon faces
- floating profile avatars

Use the existing environmental art direction.

Characters should visually belong to the same world as the Sadya scene.

They can be represented through:

- stylized illustrated figures
- partial environmental portraits
- photographs
- silhouettes
- objects associated with them

Prioritize consistency with the existing visual style.

==================================================
3. DO NOT USE A SUSPECT DASHBOARD
==================================================

Do not create six large rectangular cards.

Instead, introduce the suspects naturally through the environment.

For example:

The player can discover:

KUNJUMOL near the kitchen.

APPA near the veranda.

ANU near a window with her phone/camera.

AMMACHI near the dining area.

UNCLE near the entrance.

NEIGHBOUR outside.

The player should feel like they are investigating a house full of people.

==================================================
4. FIRST CONVERSATION
==================================================

When the player interacts with a person, open a compact conversational interface.

Keep the environment visible behind it.

The character gives a short statement.

Example:

KUNJUMOL:

"I was in the kitchen the whole time."

Then allow the player to ask a small number of questions.

Do NOT create a chatbot.

Use carefully written investigation questions.

For example:

WHERE WERE YOU AT 12:40?

DID YOU SEE THE PAYASAM?

WHO WAS IN THE DINING ROOM?

WHEN DID YOU LEAVE THE KITCHEN?

Each answer should be concise.

==================================================
5. CONTRADICTIONS
==================================================

Every suspect should have a statement that can later be compared against evidence.

Examples:

KUNJUMOL:
"I never left the kitchen."

But the earlier family photograph may show her carrying something toward the dining area.

APPA:
"I was outside on a phone call."

But his phone call timestamp may not match his statement.

ANU:
"I was taking photographs."

One of her photographs may show something important in the background.

UNCLE:
"I arrived after everything was served."

But another person's statement suggests he arrived earlier.

NEIGHBOUR:
"I only came to return the vessel."

This creates a question:

Which vessel?

AMMACHI:
"I was serving everyone."

But she knows a strangely precise detail about when the payasam disappeared.

IMPORTANT:

These contradictions must not immediately identify the culprit.

They should create questions.

==================================================
6. USE EXISTING EVIDENCE
==================================================

The previously discovered evidence must matter.

For example:

EVIDENCE:
PAYASAM VESSEL
12:43 PM
"Still warm. Recently moved."

When questioning a suspect, the player should be able to mentally compare their statement with this evidence.

Do NOT automatically tell the player:

"THIS IS A CONTRADICTION."

Let the player notice it.

Later, the deduction board will help connect these facts.

==================================================
7. ANU'S PHOTOGRAPHS
==================================================

Make ANU's phone/camera particularly useful.

When investigated, allow the player to discover photographs from earlier in the day.

Do not make them simple UI thumbnails.

Make them feel like actual captured moments.

For example:

PHOTO 01
10:18 AM
Family preparing Sadya.

PHOTO 02
11:52 AM
Kitchen activity.

PHOTO 03
12:38 PM
Dining area before Sadya.

PHOTO 04
12:42 PM
A seemingly ordinary family photograph.

One of these should contain a subtle visual detail that becomes important later.

Do NOT immediately highlight it.

The player should inspect the photograph themselves.

==================================================
8. CHARACTER MEMORY
==================================================

Track which questions the player has already asked each suspect.

Do not allow the same dialogue to repeat unnecessarily.

If the player discovers new evidence, previously questioned characters may have additional dialogue.

For example:

FIRST:
"I was in the kitchen."

AFTER DISCOVERING THE PHOTO:
"You said you never left the kitchen."

Then the character reacts.

This makes the investigation feel dynamic.

==================================================
9. PLAYER INTERROGATION
==================================================

Do not make questioning linear.

The player can choose which suspect to approach first.

The game should work regardless of order.

The player should be able to:

- investigate all six people
- revisit people
- compare statements
- return to objects
- inspect evidence again

Do not force:

Suspect 1 → Suspect 2 → Suspect 3.

==================================================
10. SUSPICION WITHOUT A SUSPICION METER
==================================================

Do NOT add:

- suspicion percentages
- red/green bars
- "most suspicious"
- stars
- points
- morality meters

The player's suspicion should exist in their own reasoning.

Let the evidence create uncertainty.

==================================================
11. IMPORTANT GAME DESIGN RULE
==================================================

Every suspect must have:

ONE TRUE DETAIL
ONE MISLEADING DETAIL
ONE INCONSISTENCY

But these should have different meanings.

Do not make every suspicious detail directly related to the missing payasam.

Some inconsistencies should relate to ordinary family events.

This prevents the mystery from becoming obvious.

==================================================
12. THE REAL STORY SHOULD REMAIN HIDDEN
==================================================

Do NOT reveal yet that the payasam was taken to someone who could not attend.

Do NOT reveal the emotional twist.

Do NOT reveal the culprit.

Do NOT create the final accusation screen.

At this stage, the player should have several competing theories.

For example:

"Maybe Kunjumol took it."

"Maybe Uncle arrived earlier than he says."

"Maybe Anu's photo caught something."

"Maybe Ammachi knows more than she's saying."

There should not yet be an obvious answer.

==================================================
13. INVESTIGATION NOTE

Once the player has spoken to at least three suspects, add a subtle note:

INVESTIGATION NOTE

"Everyone remembers the afternoon differently."

Then:

"Someone's story doesn't quite fit."

Do not identify who.

==================================================
14. GAME STATE

Extend the existing game state with:

suspects

questionedSuspects

dialogueHistory

suspectStatements

discoveredContradictions

photographsInspected

suspectEvidenceConnections

Keep the architecture simple and reusable.

Do not rebuild the existing evidence system.

==================================================
15. VISUAL PRESENTATION

Keep the cinematic Kerala environment.

When interacting with a suspect:

- gently shift focus toward them
- keep the environment visible
- use subtle depth-of-field/focus treatment
- introduce dialogue in a restrained editorial style

Do NOT open a giant chatbot window.

Do NOT make the interaction look like a messaging app.

The player should feel like they are speaking to someone standing in the house.

==================================================
16. END STATE OF THIS ITERATION

After this implementation, the player should have:

- investigated the original scene
- collected several pieces of evidence
- met the six people present
- questioned at least some of them
- discovered conflicting statements
- inspected at least one photograph
- started forming their own theory

Then stop.

Do NOT continue automatically into the final mystery solution.

The next stage will be the deduction board where the player connects evidence, people and timelines.

==================================================
QUALITY BAR
==================================================

Before finishing, test the experience as a player.

Ask:

"Do I actually want to know which person is lying?"

If YES → good.

If the answer is immediately obvious → make the contradictions more subtle.

If every suspect feels interchangeable → strengthen their personalities and environmental details.

If the interaction feels like a chatbot → redesign it as environmental investigation.

If it feels like a dashboard → remove the cards and bring the player back into the physical Kerala home.

The final feeling should be:

"I've heard six stories. They can't all be true."