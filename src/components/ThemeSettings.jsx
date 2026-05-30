import { useState, useRef, useEffect } from 'react';
import { Settings, Sun, Moon, Monitor } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const options = [
  { id: 'light', label: 'Light', icon: Sun },
  { id: 'dark', label: 'Dark', icon: Moon },
  { id: 'system', label: 'System', icon: Monitor },
];

const ThemeSettings = () => {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const panelRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (panelRef.current && !panelRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    if (open) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  return (
    <div className="relative" ref={panelRef}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="p-2 rounded-lg text-slate-400 hover:text-violet-300 hover:bg-violet-500/10 border border-transparent hover:border-violet-500/20 transition"
        aria-label="Theme settings"
        aria-expanded={open}
      >
        <Settings size={18} className={open ? 'rotate-90 transition-transform duration-300' : 'transition-transform duration-300'} />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-52 glass-light rounded-xl border border-violet-500/25 shadow-xl z-50 p-2 animate-fadeIn">
          <p className="px-3 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wide">
            Theme
          </p>
          {options.map((opt) => {
            const Icon = opt.icon;
            const active = theme === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => {
                  setTheme(opt.id);
                  setOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition ${
                  active
                    ? 'nav-active'
                    : 'text-slate-400 hover:text-violet-200 hover:bg-violet-500/10'
                }`}
              >
                <Icon size={16} />
                {opt.label}
                {active && (
                  <span className="ml-auto text-xs text-violet-400">✓</span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ThemeSettings;
