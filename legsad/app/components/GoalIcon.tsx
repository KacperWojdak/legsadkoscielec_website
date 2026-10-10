import type { GoalType } from "../../lib/types";

export default function GoalIcon({
  type,
  className = "",
}: {
  type?: GoalType;
  className?: string;
}) {
  const box = `inline-flex h-5 w-5 shrink-0 items-center justify-center ${className}`;

  if (type === "ownGoal") {
    return (
      <span className={box} aria-hidden="true">
        <svg viewBox="0 0 24 24" className="h-5 w-5">
          <circle cx="12" cy="12" r="10.5" fill="#dc2626" />
          <polygon points="12,8.4 15.42,10.89 14.12,14.91 9.88,14.91 8.58,10.89" fill="#ffffff" />
          <g stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" fill="none">
            <path d="M12 8.4V5" />
            <path d="M15.42 10.89L18.85 9.78" />
            <path d="M14.12 14.91L16.23 17.82" />
            <path d="M9.88 14.91L7.77 17.82" />
            <path d="M8.58 10.89L5.15 9.78" />
          </g>
        </svg>
      </span>
    );
  }

  if (type === "penalty") {
    return (
      <span className={box} aria-hidden="true">
        <svg viewBox="0 0 24 24" className="h-5 w-5">
          <g fill="none" stroke="#ffffff" strokeLinecap="round">
            <rect x="2" y="5" width="20" height="14" strokeWidth="1.4" opacity="0.6" />
            <g strokeWidth="0.8" opacity="0.28">
              <path d="M7 5V19" />
              <path d="M12 5V19" />
              <path d="M17 5V19" />
              <path d="M2 9.7H22" />
              <path d="M2 14.3H22" />
            </g>
          </g>
          <circle cx="14.5" cy="14.5" r="6" fill="#f5f5f5" stroke="#111111" strokeWidth="0.8" />
          <polygon points="14.5,12.3 16.59,13.82 15.79,16.28 13.21,16.28 12.41,13.82" fill="#111111" />
          <g stroke="#111111" strokeWidth="0.9" strokeLinecap="round" fill="none">
            <path d="M14.5 12.3V9.9" />
            <path d="M16.59 13.82L18.87 13.08" />
            <path d="M15.79 16.28L17.2 18.22" />
            <path d="M13.21 16.28L11.8 18.22" />
            <path d="M12.41 13.82L10.13 13.08" />
          </g>
        </svg>
      </span>
    );
  }

  return (
    <span className={`${box} text-sm leading-none`} aria-hidden="true">
      ⚽
    </span>
  );
}