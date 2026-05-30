const sizeStyles = {
  sm: { bar: 'h-2', value: 'text-2xl', suffix: 'text-sm' },
  md: { bar: 'h-3', value: 'text-3xl', suffix: 'text-sm' },
  lg: { bar: 'h-3', value: 'text-4xl', suffix: 'text-sm' },
};

const KnowledgeScoreDisplay = ({
  score = 0,
  size = 'md',
  label = 'Knowledge Value Score',
  showLabel = true,
  showSuffix = true,
}) => {
  const s = sizeStyles[size] ?? sizeStyles.md;
  const safeScore = Math.min(100, Math.max(0, Number(score) || 0));

  return (
    <div className="score-block">
      {showLabel && <p className="score-label">{label}</p>}
      <div className={`score-track w-full rounded-full overflow-hidden ${s.bar}`}>
        <div
          className="score-fill h-full rounded-full transition-all duration-300"
          style={{ width: `${safeScore}%` }}
        />
      </div>
      <div className="flex items-baseline gap-1 mt-3">
        <p className={`score-value font-bold ${s.value}`}>{safeScore}</p>
        {showSuffix && <p className={`score-suffix ${s.suffix}`}>/ 100</p>}
      </div>
    </div>
  );
};

export const ScorePanel = ({ children, className = '' }) => (
  <div className={`score-panel rounded-2xl p-6 border sticky top-24 space-y-6 ${className}`}>
    {children}
  </div>
);

export default KnowledgeScoreDisplay;
