import type { CallEvent } from "../lib/callEngine";
import type { Call, CallAction, CallState } from "./callTypes";

export const initialCallState: CallState = {
  calls: {},
};

function applyEventToCall(
  current: Call | undefined,
  event: CallEvent,
): Call | undefined {
  if (!current) {
    if (event.type === "INCOMING") {
      return {
        id: event.callId,
        status: "incoming",
        muted: false,
        lastEventAt: event.at,
        from: event.from,
      };
    }

    if (event.type === "RINGING") {
      return {
        id: event.callId,
        status: "incoming",
        muted: false,
        lastEventAt: event.at,
      };
    }

    return undefined;
  }

  if (event.at <= current.lastEventAt) {
    return current;
  }

  if (current.status === "ended" && event.type !== "ENDED") {
    return current;
  }

  switch (event.type) {
    case "INCOMING":
      return {
        ...current,
        status: "incoming",
        muted: false,
        lastEventAt: event.at,
        from: event.from ?? current.from,
      };
    case "RINGING":
      return {
        ...current,
        status: "incoming",
        lastEventAt: event.at,
      };
    case "ANSWERED":
      return {
        ...current,
        status: "active",
        lastEventAt: event.at,
      };
    case "HELD":
      return {
        ...current,
        status: "held",
        lastEventAt: event.at,
      };
    case "RESUMED":
      return {
        ...current,
        status: "active",
        lastEventAt: event.at,
      };
    case "MUTED":
      return {
        ...current,
        muted: true,
        lastEventAt: event.at,
      };
    case "UNMUTED":
      return {
        ...current,
        muted: false,
        lastEventAt: event.at,
      };
    case "ENDED":
      return {
        ...current,
        status: "ended",
        muted: false,
        endedReason: event.reason,
        lastEventAt: event.at,
      };
    default:
      return current;
  }
}

export function callReducer(state: CallState, action: CallAction): CallState {
  if (action.type !== "ENGINE_EVENT") {
    return state;
  }

  const event = action.event;
  const nextCalls = { ...state.calls };

  if (event.type === "ANSWERED") {
    Object.entries(nextCalls).forEach(([callId, call]) => {
      if (callId === event.callId || call.status === "ended") {
        return;
      }

      if (call.status === "active") {
        nextCalls[callId] = {
          ...call,
          status: "held",
          lastEventAt: Math.max(call.lastEventAt, event.at),
        };
      }
    });
  }

  const nextCall = applyEventToCall(nextCalls[event.callId], event);

  if (!nextCall) {
    return state;
  }

  return {
    ...state,
    calls: {
      ...nextCalls,
      [event.callId]: nextCall,
    },
  };
}
