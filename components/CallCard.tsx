import type { Call } from "../state/callTypes";

type CallCardProps = {
  call: Call;
  onAnswer: (callId: string) => void;
  onHangup: (callId: string) => void;
  onHold: (callId: string) => void;
  onResume: (callId: string) => void;
  onMute: (callId: string) => void;
  onUnmute: (callId: string) => void;
};

const accentByStatus: Record<Call["status"], string> = {
  incoming: "border-cyan-500/70 bg-cyan-500/10 text-cyan-100",
  active: "border-emerald-500/70 bg-emerald-500/10 text-emerald-100",
  held: "border-amber-500/70 bg-amber-500/10 text-amber-100",
  ended: "border-slate-500/70 bg-slate-500/10 text-slate-200",
};

const labelByStatus: Record<Call["status"], string> = {
  incoming: "Incoming Call",
  active: "Active Call",
  held: "Call On Hold",
  ended: "Ended",
};

const statusDotByStatus: Record<Call["status"], string> = {
  incoming: "bg-cyan-400",
  active: "bg-emerald-400",
  held: "bg-amber-400",
  ended: "bg-slate-400",
};

export function CallCard({
  call,
  onAnswer,
  onHangup,
  onHold,
  onResume,
  onMute,
  onUnmute,
}: CallCardProps) {
  const mutedTag = call.muted ? "Microphone muted" : "Microphone live";

  return (
    <article
      className={`softphone-card relative overflow-hidden rounded-[24px] border p-5 shadow-[0_18px_45px_rgba(15,23,42,0.30)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_55px_rgba(15,23,42,0.45)] ${accentByStatus[call.status]}`}
      aria-live="polite"
    >
      <div className="mb-4 flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <span
            className={`status-dot h-2.5 w-2.5 rounded-full ${statusDotByStatus[call.status]}`}
          />
          <div className="min-w-0">
            <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-slate-300 sm:text-[10px]">
              {labelByStatus[call.status]}
            </p>
            <h3 className="mt-2 truncate text-lg font-semibold text-white sm:text-2xl">
              {call.id}
            </h3>
          </div>
        </div>

        <span className="rounded-full border border-white/15 bg-slate-950/40 px-2 py-1 text-[9px] font-semibold uppercase tracking-[0.18em] text-slate-100 sm:px-2.5 sm:text-[10px]">
          {call.status}
        </span>
      </div>

      <div className="grid gap-2 text-sm text-slate-200 sm:grid-cols-2">
        <div className="rounded-xl border border-white/10 bg-slate-950/25 px-3 py-2">
          <div className="text-[9px] uppercase tracking-[0.18em] text-slate-400 sm:text-[10px]">
            Caller
          </div>
          <div className="mt-1 truncate font-medium text-slate-50">
            {call.from ? call.from : "No caller details"}
          </div>
        </div>
        <div className="rounded-xl border border-white/10 bg-slate-950/25 px-3 py-2">
          <div className="text-[9px] uppercase tracking-[0.18em] text-slate-400 sm:text-[10px]">
            Mic
          </div>
          <div
            className={`mt-1 font-medium ${call.muted ? "text-amber-200" : "text-slate-50"}`}
          >
            {mutedTag}
          </div>
        </div>
      </div>

      {call.status === "ended" && call.endedReason ? (
        <div className="mt-3 rounded-xl border border-white/10 bg-slate-950/25 px-3 py-2 text-sm text-slate-200">
          Reason: {call.endedReason}
        </div>
      ) : null}

      <div className="mt-5 flex flex-wrap gap-2">
        {call.status === "incoming" ? (
          <button
            type="button"
            aria-label={`Answer call ${call.id}`}
            onClick={() => onAnswer(call.id)}
            className="w-full rounded-xl bg-emerald-500 px-3.5 py-2.5 text-sm font-medium text-slate-950 shadow-[0_8px_18px_rgba(16,185,129,0.35)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:ring-offset-2 focus:ring-offset-slate-900 sm:w-auto"
          >
            Answer
          </button>
        ) : null}

        {call.status === "active" ? (
          <button
            type="button"
            aria-label={`Hold call ${call.id}`}
            onClick={() => onHold(call.id)}
            className="w-full rounded-xl bg-amber-400 px-3.5 py-2.5 text-sm font-medium text-slate-950 shadow-[0_8px_18px_rgba(251,191,36,0.28)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-200 focus:ring-offset-2 focus:ring-offset-slate-900 sm:w-auto"
          >
            Hold
          </button>
        ) : null}

        {call.status === "held" ? (
          <button
            type="button"
            aria-label={`Resume call ${call.id}`}
            onClick={() => onResume(call.id)}
            className="w-full rounded-xl bg-sky-400 px-3.5 py-2.5 text-sm font-medium text-slate-950 shadow-[0_8px_18px_rgba(56,189,248,0.28)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-sky-300 focus:outline-none focus:ring-2 focus:ring-sky-200 focus:ring-offset-2 focus:ring-offset-slate-900 sm:w-auto"
          >
            Resume
          </button>
        ) : null}

        {call.status !== "ended" ? (
          <button
            type="button"
            aria-label={`Hang up call ${call.id}`}
            onClick={() => onHangup(call.id)}
            className="w-full rounded-xl bg-rose-500 px-3.5 py-2.5 text-sm font-medium text-white shadow-[0_8px_18px_rgba(244,63,94,0.30)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-rose-400 focus:outline-none focus:ring-2 focus:ring-rose-300 focus:ring-offset-2 focus:ring-offset-slate-900 sm:w-auto"
          >
            Hang Up
          </button>
        ) : null}

        {call.status === "active" || call.status === "held" ? (
          call.muted ? (
            <button
              type="button"
              aria-label={`Unmute call ${call.id}`}
              onClick={() => onUnmute(call.id)}
              className="w-full rounded-xl border border-white/15 bg-slate-900 px-3.5 py-2.5 text-sm font-medium text-slate-100 shadow-[0_8px_18px_rgba(15,23,42,0.25)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-300 focus:ring-offset-2 focus:ring-offset-slate-900 sm:w-auto"
            >
              Unmute
            </button>
          ) : (
            <button
              type="button"
              aria-label={`Mute call ${call.id}`}
              onClick={() => onMute(call.id)}
              className="w-full rounded-xl border border-white/15 bg-slate-900 px-3.5 py-2.5 text-sm font-medium text-slate-100 shadow-[0_8px_18px_rgba(15,23,42,0.25)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-300 focus:ring-offset-2 focus:ring-offset-slate-900 sm:w-auto"
            >
              Mute
            </button>
          )
        ) : null}
      </div>
    </article>
  );
}
