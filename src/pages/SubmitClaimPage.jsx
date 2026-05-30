import { useState } from "react";
import { useClaimsContext } from "../context/ClaimsContext";
import { useNavigate } from "react-router-dom";
import { CATEGORIES } from "../utils/constants";
import { calculateKnowledgeScore, suggestAIUsage } from "../utils/helpers";
import { Upload, CheckCircle, AlertCircle, Zap } from 'lucide-react';
import KnowledgeScoreDisplay, { ScorePanel } from '../components/KnowledgeScoreDisplay';

const SubmitClaimPage = () => {
    const { addClaim } = useClaimsContext();
    const navigate = useNavigate();
    const [submitted, setSubmitted] = useState(false);

    const [form, setForm] = useState({
        title: "",
        category: "",
        description: "",
        whyUseful: "",
        evidenceLink: "",
        file: null,
        location: "",
        observationDate: "",
        contributorName: "",
        consent: false,
    });

    const [formErrors, setFormErrors] = useState({});

    const validate = () => {
        const errors = {};
        if (!form.title.trim()) errors.title = "Title is required";
        if (!form.category) errors.category = "Category is required";
        if (!form.description.trim() || form.description.length < 20) {
            errors.description = "Description must be at least 20 characters";
        }
        if (!form.contributorName.trim()) errors.contributorName = "Name is required";
        if (!form.consent) errors.consent = "You must consent to participation";
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const score = calculateKnowledgeScore(form);
    const aiSuggestions = suggestAIUsage(form.category, score);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
        if (formErrors[name]) {
            setFormErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setForm(prev => ({ ...prev, file: file.name }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validate()) return;

        // Combines both form state and backend-calculated properties safely
        const newClaim = addClaim({
            title: form.title,
            category: form.category,
            description: form.description,
            whyUseful: form.whyUseful,
            evidenceLink: form.evidenceLink,
            file: form.file,
            location: form.location,
            observationDate: form.observationDate,
            contributorName: form.contributorName,
            consent: form.consent,
        });

        setSubmitted(true);
        setTimeout(() => {
            // Safe fallback to dashboard layout if context doesn't return an object instance
            if (newClaim && newClaim.id) {
                navigate(`/claim/${newClaim.id}`);
            } else {
                navigate("/dashboard");
            }
        }, 2000);
    };

    if (submitted) {
        return (
            <div className="min-h-screen flex items-center justify-center p-4 md:p-8 bg-transparent text-white">
                <div className="text-center space-y-6 animate-slideUp">
                    <div className="w-20 h-20 bg-gradient-to-br from-emerald-500/30 to-violet-500/30 rounded-full flex items-center justify-center mx-auto">
                        <CheckCircle size={40} className="text-emerald-400" />
                    </div>
                    <h1 className="text-4xl font-bold">Thank You!</h1>
                    <p className="text-xl text-slate-400">Your knowledge claim has been saved to localStorage</p>
                    <p className="text-slate-500">Redirecting to your claim details…</p>
                    <div className="pt-4">
                        <div className="inline-block text-sm text-violet-300">Redirecting...</div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-transparent via-midnight-100/30 to-transparent p-4 md:p-8 text-white">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        Submit <span className="gradient-text">Knowledge Claim</span>
                    </h1>
                    <p className="text-xl text-slate-400">Help improve AI systems with verified human knowledge</p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {/* Form */}
                    <div className="md:col-span-2">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Title */}
                            <div>
                                <label className="block text-sm font-semibold mb-2">Knowledge Title *</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={form.title}
                                    onChange={handleChange}
                                    placeholder="Brief title of your knowledge claim"
                                    className="w-full bg-slate-900/50 border border-slate-700/50 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:border-violet-500/50 focus:outline-none focus:ring-2 focus:ring-violet-500/20 transition"
                                />
                                {formErrors.title && <p className="text-red-400 text-sm mt-1">{formErrors.title}</p>}
                            </div>

                            {/* Category */}
                            <div>
                                <label className="block text-sm font-semibold mb-2">Category *</label>
                                <select
                                    name="category"
                                    value={form.category}
                                    onChange={handleChange}
                                    className="w-full bg-slate-900/50 border border-slate-700/50 rounded-xl px-4 py-3 text-white focus:border-violet-500/50 focus:outline-none focus:ring-2 focus:ring-violet-500/20 transition"
                                >
                                    <option value="">Select a category</option>
                                    {CATEGORIES.map(cat => (
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                </select>
                                {formErrors.category && <p className="text-red-400 text-sm mt-1">{formErrors.category}</p>}
                            </div>

                            {/* Description */}
                            <div>
                                <label className="block text-sm font-semibold mb-2">Detailed Description *</label>
                                <textarea
                                    name="description"
                                    value={form.description}
                                    onChange={handleChange}
                                    placeholder="Provide detailed information about your knowledge claim"
                                    rows="5"
                                    className="w-full bg-slate-900/50 border border-slate-700/50 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:border-violet-500/50 focus:outline-none focus:ring-2 focus:ring-violet-500/20 transition resize-none"
                                />
                                <p className="text-xs text-slate-500 mt-1">{form.description.length} characters</p>
                                {formErrors.description && <p className="text-red-400 text-sm mt-1">{formErrors.description}</p>}
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                {/* Why Useful for AI */}
                                <div>
                                    <label className="block text-sm font-semibold mb-2">Why this knowledge is useful</label>
                                    <input
                                        type="text"
                                        name="whyUseful"
                                        value={form.whyUseful}
                                        onChange={handleChange}
                                        placeholder="How could this improve AI systems?"
                                        className="w-full bg-slate-900/50 border border-slate-700/50 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:border-violet-500/50 focus:outline-none focus:ring-2 focus:ring-violet-500/20 transition"
                                    />
                                </div>

                                {/* Evidence Link */}
                                <div>
                                    <label className="block text-sm font-semibold mb-2">Evidence Link</label>
                                    <input
                                        type="url"
                                        name="evidenceLink"
                                        value={form.evidenceLink}
                                        onChange={handleChange}
                                        placeholder="https://..."
                                        className="w-full bg-slate-900/50 border border-slate-700/50 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:border-violet-500/50 focus:outline-none focus:ring-2 focus:ring-violet-500/20 transition"
                                    />
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                {/* Location */}
                                <div>
                                    <label className="block text-sm font-semibold mb-2">Location (Optional)</label>
                                    <input
                                        type="text"
                                        name="location"
                                        value={form.location}
                                        onChange={handleChange}
                                        placeholder="e.g., Bengaluru, India"
                                        className="w-full bg-slate-900/50 border border-slate-700/50 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:border-violet-500/50 focus:outline-none focus:ring-2 focus:ring-violet-500/20 transition"
                                    />
                                </div>

                                {/* Observation Date */}
                                <div>
                                    <label className="block text-sm font-semibold mb-2">Observation Date</label>
                                    <input
                                        type="date"
                                        name="observationDate"
                                        value={form.observationDate}
                                        onChange={handleChange}
                                        className="w-full bg-slate-900/50 border border-slate-700/50 rounded-xl px-4 py-3 text-white focus:border-violet-500/50 focus:outline-none focus:ring-2 focus:ring-violet-500/20 transition [color-scheme:dark]"
                                    />
                                </div>
                            </div>

                            {/* File Upload */}
                            <div>
                                <label className="block text-sm font-semibold mb-2">Upload Evidence File</label>
                                <label className="flex items-center justify-center border-2 border-dashed border-slate-700/50 rounded-xl p-6 cursor-pointer hover:border-violet-500/50 transition">
                                    <input
                                        type="file"
                                        onChange={handleFileChange}
                                        className="hidden"
                                        accept=".pdf,.doc,.docx,.jpg,.png"
                                    />
                                    <div className="text-center">
                                        <Upload size={24} className="mx-auto mb-2 text-violet-400" />
                                        <p className="text-sm">{form.file ? form.file : 'Click to upload or drag and drop'}</p>
                                        <p className="text-xs text-slate-500 mt-1">PDF, DOC, JPG or PNG</p>
                                    </div>
                                </label>
                            </div>

                            {/* Contributor Name */}
                            <div>
                                <label className="block text-sm font-semibold mb-2">Your Name *</label>
                                <input
                                    type="text"
                                    name="contributorName"
                                    value={form.contributorName}
                                    onChange={handleChange}
                                    placeholder="Your name or organization"
                                    className="w-full bg-slate-900/50 border border-slate-700/50 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:border-violet-500/50 focus:outline-none focus:ring-2 focus:ring-violet-500/20 transition"
                                />
                                {formErrors.contributorName && <p className="text-red-400 text-sm mt-1">{formErrors.contributorName}</p>}
                            </div>

                            {/* Consent */}
                            <div className="flex gap-3 items-start p-4 bg-slate-900/50 border border-slate-700/50 rounded-xl">
                                <input
                                    type="checkbox"
                                    name="consent"
                                    checked={form.consent}
                                    onChange={handleChange}
                                    className="w-5 h-5 rounded border-slate-600 text-violet-500 focus:ring-violet-500/50 mt-1 cursor-pointer"
                                />
                                <div>
                                    <label className="font-semibold cursor-pointer">I consent to participation *</label>
                                    <p className="text-sm text-slate-400">Your knowledge claim will be reviewed and may be used for AI model improvement</p>
                                </div>
                            </div>
                            {formErrors.consent && <p className="text-red-400 text-sm">{formErrors.consent}</p>}

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="w-full py-4 bg-violet-600 rounded-xl font-semibold text-white hover:shadow-2xl hover:shadow-violet-500/50 transition-all hover:-translate-y-1"
                            >
                                Submit Knowledge Claim
                            </button>
                        </form>
                    </div>

                    {/* Preview Sidebar */}
                    <div className="md:col-span-1">
                        <ScorePanel>
                            <KnowledgeScoreDisplay
                                score={score}
                                size="md"
                                label="Knowledge Score"
                            />

                            {aiSuggestions && aiSuggestions.length > 0 && (
                                <div>
                                    <p className="score-label">Suggested AI usage</p>
                                    <div className="space-y-2">
                                        {aiSuggestions.map((suggestion, idx) => (
                                            <div key={idx} className="flex items-center gap-2 p-2 score-tip rounded-lg">
                                                <Zap size={16} className="text-violet-500 dark:text-violet-400 flex-shrink-0" />
                                                <span className="text-sm">{suggestion}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div>
                                <p className="score-label">Form Status</p>
                                <div className="space-y-2">
                                    {[
                                        { field: 'title', label: 'Title' },
                                        { field: 'category', label: 'Category' },
                                        { field: 'description', label: 'Description' },
                                        { field: 'contributorName', label: 'Name' },
                                        { field: 'consent', label: 'Consent' },
                                    ].map((item) => {
                                        const isValid = item.field === 'consent' ? form.consent : form[item.field];
                                        return (
                                            <div key={item.field} className="flex items-center gap-2">
                                                {isValid ? (
                                                    <CheckCircle size={16} className="text-emerald-400" />
                                                ) : (
                                                    <AlertCircle size={16} className="text-yellow-400" />
                                                )}
                                                <span className="text-sm text-slate-400">{item.label}</span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            <div className="p-3 score-tip rounded-lg">
                                <p className="text-xs">💡 Higher scores indicate better quality claims and are more likely to be verified for AI use.</p>
                            </div>
                        </ScorePanel>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SubmitClaimPage;