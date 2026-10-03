"use client";

import { useEffect, useMemo, useReducer, useState } from "react";
import { engine } from "../lib/callEngine";
import { callReducer, initialCallState } from "../state/callReducer";

export function useCallEngine() {
  const [state, dispatch] = useReducer(callReducer, initialCallState);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    engine.start();

    const unsubscribe = engine.on((event) => {
      dispatch({ type: "ENGINE_EVENT", event });
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const runAction = async (action: () => unknown, label: string) => {
    try {
      await Promise.resolve(action());
      setError(null);
    } catch (err) {
      setError(`Unable to ${label} this call right now.`);
      console.error(`Call action failed (${label}):`, err);
    }
  };

  const answer = (callId: string) => {
    void runAction(() => engine.answer(callId), "answer");
  };

  const hangup = (callId: string) => {
    void runAction(() => engine.hangup(callId), "hang up");
  };

  const hold = (callId: string) => {
    void runAction(() => engine.hold(callId), "hold");
  };

  const resume = (callId: string) => {
    void runAction(() => engine.resume(callId), "resume");
  };

  const mute = (callId: string) => {
    void runAction(() => engine.mute(callId), "mute");
  };

  const unmute = (callId: string) => {
    void runAction(() => engine.unmute(callId), "unmute");
  };

  const calls = useMemo(
    () =>
      Object.values(state.calls).sort((a, b) => b.lastEventAt - a.lastEventAt),
    [state.calls],
  );

  return {
    calls,
    error,
    answer,
    hangup,
    hold,
    resume,
    mute,
    unmute,
  };
}
