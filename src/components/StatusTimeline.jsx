import { CheckCircle2, Clock, AlertCircle, XCircle } from 'lucide-react';
import { formatDate, getStatusLabel, normalizeStatus } from '../utils/helpers';
import { STATUSES } from '../utils/constants';

const StatusTimeline = ({ claim }) => {
  const statusInfo = {
    submitted: { icon: Clock, description: 'Claim received and queued' },
    'needs-review': { icon: AlertCircle, description: 'Waiting for reviewer validation' },
    'needs-more-evidence': { icon: AlertCircle, description: 'Additional evidence requested' },
    verified: { icon: CheckCircle2, description: 'Approved for AI-ready use' },
    rejected: { icon: XCircle, description: 'Did not meet verification standards' },
  };

  const current = normalizeStatus(claim.status);
  const isRejected = current === 'rejected';

  const historyEntries =
    claim.statusHistory?.length > 0
      ? claim.statusHistory
      : [{ status: 'submitted', at: claim.createdAt }];

  const seen = new Set();
  const timeline = [];
  for (const entry of historyEntries) {
    const key = normalizeStatus(entry.status);
    if (!seen.has(key)) {
      seen.add(key);
      timeline.push({
        status: key,
        label: entry.label || getStatusLabel(key),
        at: entry.at,
      });
    }
  }

  if (!seen.has(current)) {
    timeline.push({ status: current, label: getStatusLabel(current), at: claim.updatedAt || claim.createdAt });
  }

  const pipeline = STATUSES.filter((s) => s.value !== 'rejected').map((s) => s.value);
  const currentPipelineIndex = pipeline.indexOf(current);

  return (
    <div className="space-y-4">
      {!isRejected ? (
        pipeline.map((status, index) => {
          const info = statusInfo[status];
          const Icon = info.icon;
          const isDone = currentPipelineIndex > index;
          const isCurrent = current === status;
          const historyItem = timeline.find((t) => t.status === status);

          return (
            <div key={status} className="flex gap-3 items-start">
              <div
                className={`flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center ${
                  isDone
                    ? 'bg-emerald-500'
                    : isCurrent
                      ? 'bg-violet-500'
                      : 'bg-slate-700'
                }`}
              >
                <Icon size={16} className="text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className={`font-semibold text-sm ${isCurrent ? 'text-violet-300' : 'text-slate-300'}`}>
                  {getStatusLabel(status)}
                </p>
                <p className="text-xs text-slate-500 mt-0.5">{info.description}</p>
                {historyItem?.at && (isDone || isCurrent) && (
                  <p className="text-xs text-slate-600 mt-1">{formatDate(historyItem.at)}</p>
                )}
              </div>
            </div>
          );
        })
      ) : (
        <div className="flex gap-3 items-start">
          <div className="w-9 h-9 rounded-full bg-red-500 flex items-center justify-center">
            <XCircle size={16} className="text-white" />
          </div>
          <div>
            <p className="font-semibold text-sm text-red-300">Rejected</p>
            <p className="text-xs text-slate-500 mt-0.5">{statusInfo.rejected.description}</p>
          </div>
        </div>
      )}

      {timeline.length > 0 && (
        <div className="mt-4 pt-4 border-t border-slate-700/50">
          <p className="text-xs text-slate-500 uppercase mb-2">Activity log</p>
          <ul className="space-y-2">
            {timeline.map((item) => (
              <li key={`${item.status}-${item.at}`} className="text-xs text-slate-400">
                <span className="text-slate-300">{item.label}</span>
                {item.at && <span className="ml-2">· {formatDate(item.at)}</span>}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default StatusTimeline;
