"use client";

import { CallPanel } from "../components/CallPanel";
import { useCallEngine } from "../hooks/useCallEngine";

export default function Home() {
  const { calls, error, answer, hangup, hold, resume, mute, unmute } =
    useCallEngine();

  const activeCalls = calls.filter((call) => call.status === "active").length;
  const incomingCalls = calls.filter(
    (call) => call.status === "incoming",
  ).length;

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.16),_transparent_28%),linear-gradient(180deg,#020817_0%,#0f172a_100%)] px-3 py-5 text-slate-50 sm:px-5 sm:py-7 lg:px-8">
      <div className="softphone-shell mx-auto max-w-7xl rounded-[28px] border border-slate-700/80 bg-slate-900/80 p-3 shadow-[0_35px_90px_rgba(2,6,23,0.82)] backdrop-blur-xl sm:rounded-[32px] sm:p-4 lg:p-6">
        <header className="mb-5 overflow-hidden rounded-[22px] border border-slate-700/70 bg-[linear-gradient(135deg,rgba(15,23,42,0.96),rgba(15,23,42,0.82),rgba(15,118,110,0.18))] p-3 shadow-[0_18px_42px_rgba(15,23,42,0.7)] sm:rounded-[26px] sm:p-4 lg:p-5">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="softphone-glow flex h-10 w-10 items-center justify-center rounded-2xl border border-cyan-400/50 bg-cyan-500/10 text-lg shadow-[0_0_20px_rgba(34,211,238,0.28)] sm:h-12 sm:w-12 sm:text-xl">
                ☎
              </div>
              <div className="min-w-0">
                <p className="text-[9px] font-semibold uppercase tracking-[0.28em] text-cyan-300 sm:text-[10px]">
                  Contact Center
                </p>
                <h1 className="mt-1 text-xl font-semibold tracking-tight text-white sm:text-2xl lg:text-3xl">
                  Mini Softphone Panel
                </h1>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-2.5 py-1.5 text-[9px] font-semibold uppercase tracking-[0.2em] text-emerald-200 shadow-[0_0_18px_rgba(16,185,129,0.18)] sm:px-3 sm:py-2 sm:text-[10px]">
                <span className="status-dot h-2.5 w-2.5 rounded-full bg-emerald-400" />
                Available
              </div>
              <div className="rounded-full border border-slate-600/80 bg-slate-950/50 px-2.5 py-1.5 text-[9px] font-semibold uppercase tracking-[0.2em] text-slate-300 sm:px-3 sm:py-2 sm:text-[10px]">
                {activeCalls} active
              </div>
              <div className="rounded-full border border-slate-600/80 bg-slate-950/50 px-2.5 py-1.5 text-[9px] font-semibold uppercase tracking-[0.2em] text-slate-300 sm:px-3 sm:py-2 sm:text-[10px]">
                {incomingCalls} waiting
              </div>
            </div>
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-slate-700/70 bg-slate-950/45 p-3 shadow-[0_10px_25px_rgba(15,23,42,0.45)]">
              <div className="text-[9px] font-semibold uppercase tracking-[0.22em] text-slate-400 sm:text-[10px]">
                Line Status
              </div>
              <div className="mt-2 flex items-center gap-2 text-base font-semibold text-emerald-300">
                <span className="status-dot h-2.5 w-2.5 rounded-full bg-emerald-400" />
                Ready
              </div>
            </div>
            <div className="rounded-2xl border border-slate-700/70 bg-slate-950/45 p-3 shadow-[0_10px_25px_rgba(15,23,42,0.45)]">
              <div className="text-[9px] font-semibold uppercase tracking-[0.22em] text-slate-400 sm:text-[10px]">
                Queue
              </div>
              <div className="mt-2 text-xl font-semibold text-white sm:text-2xl">
                {incomingCalls}
              </div>
            </div>
            <div className="rounded-2xl border border-slate-700/70 bg-slate-950/45 p-3 shadow-[0_10px_25px_rgba(15,23,42,0.45)]">
              <div className="text-[9px] font-semibold uppercase tracking-[0.22em] text-slate-400 sm:text-[10px]">
                Active Calls
              </div>
              <div className="mt-2 text-xl font-semibold text-white sm:text-2xl">
                {activeCalls}
              </div>
            </div>
          </div>
        </header>

        <CallPanel
          calls={calls}
          error={error}
          onAnswer={answer}
          onHangup={hangup}
          onHold={hold}
          onResume={resume}
          onMute={mute}
          onUnmute={unmute}
        />
      </div>
    </main>
  );
}
