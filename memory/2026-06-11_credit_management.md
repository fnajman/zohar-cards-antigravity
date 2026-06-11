# Credit Management Update

## Date
2026-06-11

## Overview
We have modified the credit management flow to provide a smoother user experience and allow testing.

## Changes
1. **Credit Check Location**:
   - The credit check (`user.credits < 3`) has been moved from `QuestionScreen` to `InterpretationScreen`.
   - Users can now freely type their question without being blocked by insufficient credits.
   - The validation of credits occurs only *after* they submit their question (when entering the Interpretation stage).
   - If a user has less than 3 credits, they are presented with a friendly message on `InterpretationScreen` inviting them to buy more credits (redirect to Settings > Plans) or to return to the Home screen.

2. **UI Cleanup**:
   - The credit counter text has been completely removed from the header of `QuestionScreen` to avoid overlapping with the breadcrumb progress tracker.

3. **Secret Testing Function**:
   - A hidden developer testing function has been added to `HomeScreen`.
   - Clicking **once** on the remaining credits counter increments the credits by 1.
   - **Double clicking** on the counter decrements the credits by 1.
   - This allows quick testing of both the sufficient-credits path and the insufficient-credits path without altering backend state or requiring real purchases.

## Next Steps
- This is a mockup behavior ("a ce stade on va en rester là pour la maquette").
- The actual payment integration (Stripe, Apple Pay, etc.) will be implemented in a subsequent phase.
