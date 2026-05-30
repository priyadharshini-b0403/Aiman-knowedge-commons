const getColor = (val) => {
  if (val >= 75) {
    return 'text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-900';
  }
  if (val >= 40) {
    return 'text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-900';
  }
  return 'text-rose-700 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/30 border-rose-200 dark:border-rose-900';
};

export default function ScoreIndicator({ score, label = 'Score' }) {
  return (
    <div className="flex items-center gap-2">
      <span className="score-label !mb-0 !normal-case">{label}:</span>
      <span
        className={`inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-bold ${getColor(score)}`}
      >
        {score !== null ? `${score}/100` : 'Pending'}
      </span>
    </div>
  );
}
