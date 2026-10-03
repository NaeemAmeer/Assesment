import type { CallEvent } from "../lib/callEngine";

export type CallStatus = "incoming" | "active" | "held" | "ended";

export interface Call {
  id: string;
  status: CallStatus;
  muted: boolean;
  lastEventAt: number;
  from?: string;
  endedReason?: string;
}

export type CallsById = Record<string, Call>;

export interface CallState {
  calls: CallsById;
}

export type EngineEventAction = {
  type: "ENGINE_EVENT";
  event: CallEvent;
};

export type CallAction = EngineEventAction;
