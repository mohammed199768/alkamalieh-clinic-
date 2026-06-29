"use client";
import React from "react";

type State = "idle" | "correct" | "wrong" | "muted";

/**
 * Large, child-friendly answer button with gentle feedback states.
 * No harsh red — wrong answers use a soft amber tone.
 */
export default function GameOptionButton({
  children,
  state = "idle",
  onClick,
  disabled,
  ariaLabel,
  className = "",
}: {
  children: React.ReactNode;
  state?: State;
  onClick?: () => void;
  disabled?: boolean;
  ariaLabel?: string;
  className?: string;
}) {
  const styles: Record<State, string> = {
    idle:
      "border-white/15 bg-white/10 text-white hover:bg-white/20 hover:border-cyan-300/60",
    correct: "border-mint-300 bg-mint-400/25 text-white",
    wrong: "border-amber-300/70 bg-amber-300/20 text-white",
    muted: "border-white/10 bg-white/5 text-white/50",
  };
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className={`flex min-h-16 items-center justify-center gap-2 rounded-2xl border-2 px-4 py-4 text-lg font-bold backdrop-blur transition duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-navy-950 disabled:cursor-default ${styles[state]} ${className}`}
    >
      {children}
    </button>
  );
}
