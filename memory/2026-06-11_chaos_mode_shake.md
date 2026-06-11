# Chaos Mode & Shake Feature

## Date
2026-06-11

## Overview
Added the "shake" gesture to the Chaos draw mode and improved the centering and responsiveness of the layout to prevent cards from clipping outside the screen or overlapping with text.

## Changes
1. **Chaos Mode Centering**:
   - The bounds for random card generation have been adjusted from `(x: 5-70, y: 8-73)` to a more central `(x: 20-80, y: 25-75)` to provide a safer padding area.
   - Reduced the spread so cards stay nicely clustered in the center of the viewport, regardless of screen size.
   - Text label (`Chaos_desc`) has been moved slightly higher (`top-8`) with explicit padding to avoid overlap.

2. **Shake to Reshuffle (DeviceMotion)**:
   - Created a custom `useShake` hook that listens to the `devicemotion` event.
   - When the phone is shaken (accelerometer detects speed > threshold), the `generatePositions` function is triggered to instantly recalculate and animate the cards to new random positions.
   - Included fallback and request logic for iOS 13+ devices which require explicit permission to access `DeviceMotionEvent`. The permission request is bound to a click/tap event on the Chaos mode container to ensure it triggers under a user gesture.

## Status
- Verified and fully functional on mobile simulators and responsive dev environments.
- Animations utilize framer-motion's spring physics for an elegant shuffling effect.
