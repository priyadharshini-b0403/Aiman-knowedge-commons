import React, { useState } from 'react';
import { ShieldAlert, CheckCircle, AlertTriangle } from 'lucide-react';

const aiOptions = [
    "Useful for model training",
    "Useful for AI evaluation",
    "Useful for knowledge base",
    "Useful as correction feedback",
    "Not useful"
];

export default function ReviewerPanel({ claim, onSave }) {
    const [status, setStatus] = useState(claim?.status || 'Needs Review');
    const [reviewerComments, setReviewerComments] = useState(claim?.reviewerComments || '');
    const [reviewerScore, setReviewerScore] = useState(claim?.reviewerScore || 75);
    const [suggestedAiUsage, setSuggestedAiUsage] = useState(claim?.suggestedAiUsage || aiOptions[2]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({
            status,
            reviewerComments,
            reviewerScore: parseInt(reviewerScore, 10),
            suggestedAiUsage
        });
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white dark:bg-transparent border border-slate-200 dark:border-slate-800 p-5 rounded-xl shadow-sm space-y-4">
            <div className="flex items-center gap-1.5 text-indigo-600 dark:text-indigo-400 border-b border-slate-100 dark:border-slate-900 pb-2">
                <ShieldAlert className="h-4 w-4" />
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">Auditor Action Desk</h3>
            </div>

            {/* Decision Select */}
            <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">Verification Verdict</label>
                <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-md outline-none focus:border-indigo-500"
                >
                    <option value="Verified">Approve & Verify</option>
                    <option value="Needs Review">Hold (Needs Review)</option>
                    <option value="Needs More Evidence">Flag (Needs More Evidence)</option>
                    <option value="Rejected">Reject Claim</option>
                </select>
            </div>

            {/* Range Slider for Score */}
            <div className="flex flex-col gap-1">
                <div className="flex justify-between items-center text-xs font-semibold text-slate-600 dark:text-slate-400">
                    <span>AI Ingestion Weight</span>
                    <span className="text-indigo-600 font-bold">{reviewerScore}/100</span>
                </div>
                <input
                    type="range"
                    min="0"
                    max="100"
                    value={reviewerScore}
                    onChange={(e) => setReviewerScore(e.target.value)}
                    className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
            </div>

            {/* AI Alignment Dropdown */}
            <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">Suggested AI Use Paradigm</label>
                <select
                    value={suggestedAiUsage}
                    onChange={(e) => setSuggestedAiUsage(e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-md outline-none focus:border-indigo-500"
                >
                    {aiOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                </select>
            </div>

            {/* Review Comments Box */}
            <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">Review Notes / Explanatory Logs</label>
                <textarea
                    required
                    rows="3"
                    value={reviewerComments}
                    onChange={(e) => setReviewerComments(e.target.value)}
                    placeholder="State structural anomalies, audit checks or reasons for this rating categorization..."
                    className="w-full px-2.5 py-1.5 text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-md outline-none focus:border-indigo-500"
                />
            </div>

            <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold py-2 rounded-md shadow-sm transition-all"
            >
                <CheckCircle className="h-3.5 w-3.5" /> Commit Audit Updates
            </button>
        </form>
    );
}