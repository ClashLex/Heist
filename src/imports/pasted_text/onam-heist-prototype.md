We are building an experimental interactive mystery game for a Friends of Figma Kochi Make-a-thon. The event theme is ONAM.

PROJECT:
ONAM HEIST

CORE IDEA:
A lighthearted family mystery set during Thiruvonam.

The player arrives at a Kerala family home just before Sadya. The Sadya is ready, but one important dish has mysteriously disappeared.

At first it appears to be a theft.

The player investigates the house, discovers physical clues, talks to family members, connects evidence, and eventually makes a deduction.

The eventual reveal should be warm and human rather than criminal: the missing food was secretly taken to someone who could not attend the Sadya. The "heist" was an act of care and sharing.

IMPORTANT:
This is NOT a conventional Onam website.
This is NOT an educational website.
This is NOT a generic detective dashboard.
This is NOT a children's game.
This should feel like an interactive short story / investigation that happens inside a Kerala home.

CORE EXPERIENCE:
The player should:

1. Enter the house.
2. Notice that something is missing.
3. Explore the environment.
4. Inspect physical objects.
5. Collect evidence.
6. Question suspects.
7. Connect clues.
8. Make an accusation.
9. Discover the real reason behind the "heist."

GAMEPLAY PRINCIPLE:
The environment itself should be the interface.

The player should investigate objects inside a scene rather than navigating through conventional web pages.

Examples of potentially interactive objects:

* empty serving vessel
* banana leaves
* brass vessels
* kitchen doorway
* spilled food
* family phone
* photograph
* sandals
* newspaper
* flower basket
* dining chair
* kitchen utensils

Not every object should be a clue. Some should simply provide atmosphere so the player has to observe carefully.

FIRST BUILD SCOPE:
Do NOT build the entire game yet.

For the first implementation, focus ONLY on:

THE DINING ROOM INVESTIGATION SCENE

and its first evidence interaction.

The first playable sequence should be:

THIRUVONAM AFTERNOON
→ player sees a prepared Sadya
→ something feels wrong
→ one important serving vessel is empty/missing
→ player can inspect the vessel
→ investigation clue is revealed
→ clue is added to an evidence drawer

The player should be able to understand the objective within approximately 5 seconds.

FIRST CLUE:
The missing vessel was recently used.

When inspected, reveal something similar in meaning to:

"12:43 PM
The vessel is still warm.
Someone moved it recently."

Do not reveal the culprit.

VISUAL DIRECTION:
Create a contemporary interpretation of a Kerala home during Onam.

Think:

* warm natural light
* Kerala architecture
* dark wood
* brass vessels
* banana leaves
* kasavu fabric
* traditional dining setting
* subtle flower/pookalam elements
* family photographs
* handwritten notes
* tactile physical objects

The visual language should feel like a premium interactive mystery / digital story, not a festival poster.

Use:

* deep Kerala green
* warm ivory
* natural brown
* muted red
* restrained gold/brass

Avoid:

* neon colours
* excessive gradients
* glassmorphism
* generic SaaS cards
* generic dashboard layouts
* cartoon illustrations
* excessive rounded cards
* stereotypical "Indian festival" decoration
* emoji
* excessive game HUD elements

INTERACTION:
Objects should feel physically present.

When the cursor approaches an interactive object:

* subtle visual response
* no giant glowing outlines
* no "CLICK ME" indicators

When an object is inspected:

* use a subtle zoom/focus transition
* reveal a concise observation
* allow the player to add it to evidence

EVIDENCE SYSTEM:
Create a small evidence drawer that can hold discovered clues.

It should feel like a detective notebook / evidence archive rather than a dashboard.

The evidence drawer should remain secondary to the scene.

TECHNICAL DIRECTION:
Build this as a functional browser-based prototype.

Use reusable React components and maintain clean separation between:

* scene objects
* evidence data
* game state
* UI
* transitions

Do not over-engineer the architecture.

The first version should prioritize:

1. atmosphere
2. scene composition
3. interaction quality
4. clear game state

Do not build suspects, deduction boards, scoring, timers, leaderboards, authentication, or additional scenes yet.

Before implementation, create a concise structured plan for:

* scene structure
* game state
* interactive objects
* evidence model
* component architecture
* visual direction
* first playable flow

Do not invent unnecessary features.
Do not turn this into a generic web application.

Use web search only if needed to verify authentic Onam/Kerala cultural details. Prefer culturally accurate details over invented stereotypes.

The goal of this first step is to establish a strong foundation for the investigation scene. We will build the rest of the game incrementally in later prompts.
