type ProgressBarProps = {
  current: number;
  total: number;
};

export function ProgressBar({ current, total }: ProgressBarProps) {
  const percent = Math.round((current / total) * 100);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-xs text-slate-500">
        <span>
          質問 {current} / {total}
        </span>
        <span>{percent}%</span>
      </div>
      <div
        className="h-2 overflow-hidden rounded-full bg-slate-200"
        role="progressbar"
        aria-valuenow={current}
        aria-valuemin={1}
        aria-valuemax={total}
        aria-label={`全${total}問中${current}問目`}
      >
        <div
          className="h-full rounded-full bg-brand-600 transition-all duration-300 ease-out"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
