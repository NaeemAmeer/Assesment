# Mini Softphone Panel

## Project Overview

This application is a small but production-minded softphone panel built with Next.js, React, TypeScript, and Tailwind CSS. It uses a mock telephony engine to receive real-time call events, keeps state in a reducer, and renders a usable call interface for inbound, active, held, muted, and ended conversations.

## Tech Stack

- Next.js
- React
- TypeScript
- Tailwind CSS

## State Model

Calls are stored by callId so multiple concurrent calls can be represented independently. Each record tracks the current lifecycle state, whether the microphone is muted, and the timestamp of the last event processed for that call.

This keeps the UI predictable even when the telephony engine emits duplicate or late events. Instead of forcing status updates from button clicks, the reducer applies engine events and updates the call record only when the newer event timestamp is valid.

## Event Ordering

Every engine event includes an `at` timestamp. The reducer compares each arriving event against the previously processed `lastEventAt` value for the same call:

```ts
if (event.at <= call.lastEventAt) {
  return call;
}
```

This prevents duplicate or stale events from reverting a call to an older state. A late `ANSWERED` event cannot restore an ended call, and a duplicate `HELD` event cannot move an active call backwards in time.

## Concurrent Calls

When a second inbound call arrives during an active conversation, it is added as a separate call record keyed by its `callId`. The panel renders all active calls together, allowing the user to interact with the waiting call while keeping the original call visible and stateful. If the user answers the new call, the current call is held and the newly answered call becomes active.

## Engine Integration

The project treats `lib/callEngine.ts` as an external mock engine and leaves it unmodified. The UI subscribes to engine events using `engine.on(...)`, dispatches them into a reducer, and allows user actions to invoke the engine methods (`answer`, `hangup`, `hold`, `resume`, `mute`, `unmute`) without overriding the engine as the source of truth.

## Assumptions

- A second incoming call is shown as a separate call card and can be answered or rejected while the current call remains active.
- Ended calls remain stored in state but are displayed in a short recent-ended list so the app can retain correct lifecycle memory without showing stale active controls.
- Invalid transitions such as a late `ANSWERED` event after `ENDED` are ignored to preserve a consistent state model.

## Running Locally

```bash
npm install
npm run dev
```

Open the local development URL shown by Next.js in the terminal to interact with the panel.
