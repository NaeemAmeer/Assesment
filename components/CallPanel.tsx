import type { Call } from "../state/callTypes";
import { CallCard } from "./CallCard";

type CallPanelProps = {
  calls: Call[];
  error: string | null;
  onAnswer: (callId: string) => void;
  onHangup: (callId: string) => void;
  onHold: (callId: string) => void;
  onResume: (callId: string) => void;
  onMute: (callId: string) => void;
  onUnmute: (callId: string) => void;
};

export function CallPanel({
  calls,
  error,
  onAnswer,
  onHangup,
  onHold,
  onResume,
  onMute,
  onUnmute,
}: CallPanelProps) {
  const incomingCalls = calls.filter((call) => call.status === "incoming");
  const activeCalls = calls.filter((call) => call.status === "active");
  const heldCalls = calls.filter((call) => call.status === "held");
  const endedCalls = calls.filter((call) => call.status === "ended");

  const summaryCards = [
    { label: "Incoming", value: incomingCalls.length, tone: "cyan" },
    { label: "Active", value: activeCalls.length, tone: "emerald" },
    { label: "Held", value: heldCalls.length, tone: "amber" },
    { label: "Ended", value: endedCalls.length, tone: "slate" },
    { label: "Total", value: calls.length, tone: "violet" },
  ];

  const toneMap: Record<string, string> = {
    cyan: "border-cyan-500/30 bg-cyan-500/10 text-cyan-200",
    emerald: "border-emerald-500/30 bg-emerald-500/10 text-emerald-200",
    amber: "border-amber-500/30 bg-amber-500/10 text-amber-200",
    slate: "border-slate-500/30 bg-slate-500/10 text-slate-200",
    violet: "border-violet-500/30 bg-violet-500/10 text-violet-200",
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 px-1 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-[9px] font-semibold uppercase tracking-[0.26em] text-slate-400 sm:text-[10px]">
            Activity overview
          </p>
          <h2 className="mt-1 text-lg font-semibold text-white sm:text-xl">
            Call queue
          </h2>
        </div>
        <div className="inline-flex w-fit rounded-full border border-slate-700 bg-slate-950/60 px-2.5 py-1.5 text-[9px] font-semibold uppercase tracking-[0.2em] text-slate-300 sm:px-3 sm:text-[10px]">
          {calls.length} total
        </div>
      </div>

      <div className="grid gap-3 grid-cols-2 md:grid-cols-3 xl:grid-cols-5">
        {summaryCards.map((card) => (
          <div
            key={card.label}
            className={`rounded-2xl border p-3 shadow-[0_10px_25px_rgba(15,23,42,0.45)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(15,23,42,0.7)] ${toneMap[card.tone]}`}
          >
            <div className="text-[9px] font-semibold uppercase tracking-[0.22em] text-slate-300 sm:text-[10px]">
              {card.label}
            </div>
            <div className="mt-3 text-xl font-semibold text-white sm:text-2xl">
              {card.value}
            </div>
          </div>
        ))}
      </div>

      {error ? (
        <div
          role="alert"
          className="rounded-2xl border border-rose-500/50 bg-rose-500/10 px-4 py-3 text-sm text-rose-100 shadow-lg shadow-rose-950/20"
        >
          {error}
        </div>
      ) : null}

      {incomingCalls.length + activeCalls.length + heldCalls.length === 0 ? (
        <div className="rounded-[24px] border border-dashed border-slate-700 bg-slate-950/40 p-8 text-center shadow-inner shadow-slate-950/20">
          <p className="text-xl font-semibold text-white">No active calls</p>
          <p className="mt-2 text-sm text-slate-400">
            The panel is idle and ready for the next call.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {[...incomingCalls, ...activeCalls, ...heldCalls].map((call) => (
            <CallCard
              key={call.id}
              call={call}
              onAnswer={onAnswer}
              onHangup={onHangup}
              onHold={onHold}
              onResume={onResume}
              onMute={onMute}
              onUnmute={onUnmute}
            />
          ))}
        </div>
      )}

      {endedCalls.length > 0 ? (
        <div className="rounded-[22px] border border-slate-800 bg-slate-950/60 p-4 shadow-inner shadow-slate-950/20">
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.28em] text-slate-400">
            Recent ended calls
          </p>
          <div className="flex flex-wrap gap-2">
            {endedCalls.map((call) => (
              <span
                key={`${call.id}-ended`}
                className="rounded-full border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs font-medium text-slate-200"
              >
                {call.id} • ended
              </span>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
