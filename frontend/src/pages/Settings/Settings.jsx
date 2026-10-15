import React, { useState, useRef, useEffect, useCallback } from 'react';
import ReactDOM from 'react-dom';
import './Settings.css';

/* ══ ICONS ══════════════════════════════════════════════════════════════════ */
const Icons = {
    Home: () => <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>,
    ChevronRight: () => <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>,
    ChevronDown: () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>,
    Check: () => <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>,
    Settings: () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3" /><path d="M19.07 4.93a10 10 0 0 1 1.41 1.41M4.93 4.93A10 10 0 0 0 3.52 6.34M19.07 19.07a10 10 0 0 1-1.41 1.41M4.93 19.07a10 10 0 0 0 1.41 1.41M22 12h-2M4 12H2M12 2V4M12 20v2" /></svg>,
    Monitor: () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" /></svg>,
    Shield: () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>,
    Bell: () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></svg>,
    Link: () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" /></svg>,
    CreditCard: () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" /><line x1="1" y1="10" x2="23" y2="10" /></svg>,
    Cpu: () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="4" width="16" height="16" rx="2" /><rect x="9" y="9" width="6" height="6" /><line x1="9" y1="1" x2="9" y2="4" /><line x1="15" y1="1" x2="15" y2="4" /><line x1="9" y1="20" x2="9" y2="23" /><line x1="15" y1="20" x2="15" y2="23" /><line x1="20" y1="9" x2="23" y2="9" /><line x1="20" y1="14" x2="23" y2="14" /><line x1="1" y1="9" x2="4" y2="9" /><line x1="1" y1="14" x2="4" y2="14" /></svg>,
    Upload: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 16 12 12 8 16" /><line x1="12" y1="12" x2="12" y2="21" /><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" /></svg>,
    Clock: () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>,
    Database: () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" /><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" /></svg>,
    Server: () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="8" rx="2" /><rect x="2" y="14" width="20" height="8" rx="2" /><line x1="6" y1="6" x2="6.01" y2="6" /><line x1="6" y1="18" x2="6.01" y2="18" /></svg>,
    HardDrive: () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="12" x2="2" y2="12" /><path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" /><line x1="6" y1="16" x2="6.01" y2="16" /><line x1="10" y1="16" x2="10.01" y2="16" /></svg>,
    RefreshCw: () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 4 23 10 17 10" /><polyline points="1 20 1 14 7 14" /><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" /></svg>,
    Users: () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>,
    FileText: () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /></svg>,
    Trash2: () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" /></svg>,
    ArrowRight: () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>,
    User: () => <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>,
    CheckCircle: () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>,
    GearBig: () => <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" opacity="0.18"><circle cx="12" cy="12" r="3" /><path d="M19.07 4.93a10 10 0 0 1 1.41 1.41M4.93 4.93A10 10 0 0 0 3.52 6.34M19.07 19.07a10 10 0 0 1-1.41 1.41M4.93 19.07a10 10 0 0 0 1.41 1.41M22 12h-2M4 12H2M12 2V4M12 20v2" /></svg>,
    Key: () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" /></svg>,
    Download: () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>,
    X: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>,
    Copy: () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg>,
    Edit: () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>,
    Sun: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" /></svg>,
    Moon: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" /></svg>,
    Slack: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 10c-.83 0-1.5-.67-1.5-1.5v-5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5z" /><path d="M20.5 10H19V8.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" /><path d="M9.5 14c.83 0 1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5S8 21.33 8 20.5v-5c0-.83.67-1.5 1.5-1.5z" /><path d="M3.5 14H5v1.5c0 .83-.67 1.5-1.5 1.5S2 16.33 2 15.5 2.67 14 3.5 14z" /><path d="M14 14.5c0-.83.67-1.5 1.5-1.5h5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-5c-.83 0-1.5-.67-1.5-1.5z" /><path d="M15.5 19H14v1.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5-.67-1.5-1.5-1.5z" /><path d="M10 9.5C10 8.67 9.33 8 8.5 8h-5C2.67 8 2 8.67 2 9.5S2.67 11 3.5 11h5c.83 0 1.5-.67 1.5-1.5z" /><path d="M8.5 5H10V3.5C10 2.67 9.33 2 8.5 2S7 2.67 7 3.5 7.67 5 8.5 5z" /></svg>,
    Github: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" /></svg>,
    Jira: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11.53 2.03L6.17 7.39l2.54 2.54 2.82-2.82 5.36 5.36-2.82 2.82 2.54 2.54 5.36-5.36z" /><path d="M12.47 21.97l5.36-5.36-2.54-2.54-2.82 2.82-5.36-5.36 2.82-2.82-2.54-2.54L2.03 11.53z" /></svg>,
    Google: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M12 8v4l3 3" /></svg>,
    Webhook: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 16.98h-5.99c-1.1 0-1.95.68-2.23 1.62A3.001 3.001 0 1 1 6 16.98" /><path d="m13 17 4-8" /><path d="M10.12 5.25A4 4 0 1 1 18 9" /></svg>,
    Trello: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" /><rect x="7" y="7" width="3" height="9" /><rect x="14" y="7" width="3" height="5" /></svg>,
    Plus: () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>,
    WifiOff: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="1" y1="1" x2="23" y2="23" /><path d="M16.72 11.06A10.94 10.94 0 0 1 19 12.55" /><path d="M5 12.55a10.94 10.94 0 0 1 5.17-2.39" /><path d="M10.71 5.05A16 16 0 0 1 22.56 9" /><path d="M1.42 9a15.91 15.91 0 0 1 4.7-2.88" /><path d="M8.53 16.11a6 6 0 0 1 6.95 0" /><line x1="12" y1="20" x2="12.01" y2="20" /></svg>,
};

const TABS = [
    { id: 'general', label: 'General', Icon: Icons.Settings },
    { id: 'monitoring', label: 'Monitoring', Icon: Icons.Monitor },
    { id: 'security', label: 'Security', Icon: Icons.Shield },
    { id: 'notifications', label: 'Notifications', Icon: Icons.Bell },
    { id: 'integrations', label: 'Integrations', Icon: Icons.Link },
    { id: 'billing', label: 'Billing', Icon: Icons.CreditCard },
    { id: 'system', label: 'System', Icon: Icons.Cpu },
];

/* ══ SMART DROPDOWN — opens upward if near bottom ═══════════════════════════ */
function CustomSelect({ options, value, onChange }) {
    const [open, setOpen] = useState(false);
    const [rect, setRect] = useState(null);
    const btnRef = useRef(null);
    const dropRef = useRef(null);

    useEffect(() => {
        if (!open) return;
        const h = e => { if (!btnRef.current?.contains(e.target) && !dropRef.current?.contains(e.target)) setOpen(false); };
        document.addEventListener('mousedown', h);
        return () => document.removeEventListener('mousedown', h);
    }, [open]);

    useEffect(() => {
        if (!open || !btnRef.current) return;
        const update = () => {
            const r = btnRef.current.getBoundingClientRect();
            const est = Math.min(options.length * 38 + 12, 240); // estimated dropdown height
            const spaceBelow = window.innerHeight - r.bottom - 8;
            const openUp = spaceBelow < est && r.top > est;
            setRect({
                left: r.left,
                width: Math.max(r.width, 180),
                openUp,
                top: openUp ? undefined : r.bottom + 4,
                bottom: openUp ? (window.innerHeight - r.top + 4) : undefined,
            });
        };
        update();
        window.addEventListener('scroll', update, true);
        window.addEventListener('resize', update);
        return () => { window.removeEventListener('scroll', update, true); window.removeEventListener('resize', update); };
    }, [open, options.length]);

    return (
        <div className="cust-select-wrap">
            <button ref={btnRef} className="sg-select-btn" onClick={() => setOpen(o => !o)}>
                <span>{value}</span>
                <span className={`cust-select-arrow ${open ? 'open' : ''}`}><Icons.ChevronDown /></span>
            </button>
            {open && rect && ReactDOM.createPortal(
                <div ref={dropRef} className="cust-dropdown"
                    style={{
                        position: 'fixed',
                        ...(rect.openUp ? { bottom: rect.bottom, top: 'auto' } : { top: rect.top }),
                        left: rect.left,
                        width: rect.width,
                        zIndex: 99999,
                    }}>
                    {options.map(opt => (
                        <div key={opt} className={`cust-dropdown-item ${opt === value ? 'selected' : ''}`}
                            onMouseDown={e => { e.preventDefault(); onChange(opt); setOpen(false); }}>
                            <span>{opt}</span>
                            {opt === value && <span className="cust-dropdown-check"><Icons.Check /></span>}
                        </div>
                    ))}
                </div>,
                document.body
            )}
        </div>
    );
}

/* ══ TOGGLE ════════════════════════════════════════════════════════════════ */
function Toggle({ checked, onChange }) {
    return (
        <button type="button" className={`sg-toggle ${checked ? 'on' : ''}`} onClick={() => onChange(!checked)}>
            <div className="sg-toggle-thumb" />
        </button>
    );
}

function ToggleRow({ label, sub, val, set }) {
    return (
        <div className="sg-toggle-row">
            <div className="sg-toggle-info">
                <div className="sg-toggle-label">{label}</div>
                <div className="sg-toggle-sub">{sub}</div>
            </div>
            <Toggle checked={val} onChange={set} />
        </div>
    );
}

/* ══ STATUS ROW ════════════════════════════════════════════════════════════ */
function StatusRow({ Icon, label, status, color }) {
    return (
        <div className="sg-status-row">
            <span className="sg-status-icon" style={{ color }}><Icon /></span>
            <span className="sg-status-label">{label}</span>
            <span className="sg-status-val" style={{ color }}>{status}</span>
        </div>
    );
}

/* ══ CLOCK TIME PICKER ═════════════════════════════════════════════════════ */
function parseTime(val) {
    const m = (val || '').match(/(\d+):(\d+)\s*(AM|PM)/i);
    if (m) return { h: parseInt(m[1]), m: parseInt(m[2]), period: m[3].toUpperCase() };
    return { h: 9, m: 0, period: 'AM' };
}
function formatTime(h, m, period) {
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')} ${period}`;
}

function ClockPicker({ value, onConfirm, onClose }) {
    const parsed = parseTime(value);
    const [hour, setHour] = useState(parsed.h === 0 ? 12 : parsed.h > 12 ? parsed.h - 12 : parsed.h);
    const [minute, setMinute] = useState(parsed.m);
    const [period, setPeriod] = useState(parsed.period);
    const [mode, setMode] = useState('hour');

    const cx = 100, cy = 100, R = 78, size = 200;
    const circ = (val, total, rad) => {
        const a = ((val / total) * 2 * Math.PI) - Math.PI / 2;
        return { x: cx + rad * Math.cos(a), y: cy + rad * Math.sin(a) };
    };
    const hourNums = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
    const minNums = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];
    const activeHP = circ(hour === 12 ? 0 : hour, 12, R);
    const activeMnP = circ(minute, 60, R);

    const handleConfirm = () => {
        let h = hour;
        if (period === 'AM' && h === 12) h = 0;
        if (period === 'PM' && h !== 12) h += 12;
        const display = h === 0 ? 12 : h > 12 ? h - 12 : h;
        const p = h < 12 ? 'AM' : 'PM';
        onConfirm(formatTime(display, minute, p));
    };

    return ReactDOM.createPortal(
        <div className="clock-overlay" onClick={onClose}>
            <div className="clock-modal" onClick={e => e.stopPropagation()}>
                <div className="clock-header">
                    <div className="clock-display">
                        <span className={`clock-hm ${mode === 'hour' ? 'active' : ''}`} onClick={() => setMode('hour')}>{String(hour).padStart(2, '0')}</span>
                        <span className="clock-colon">:</span>
                        <span className={`clock-hm ${mode === 'minute' ? 'active' : ''}`} onClick={() => setMode('minute')}>{String(minute).padStart(2, '0')}</span>
                    </div>
                    <div className="clock-period">
                        <button className={period === 'AM' ? 'active' : ''} onClick={() => setPeriod('AM')}>AM</button>
                        <button className={period === 'PM' ? 'active' : ''} onClick={() => setPeriod('PM')}>PM</button>
                    </div>
                </div>
                <div className="clock-face-wrap">
                    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
                        <circle cx={cx} cy={cy} r={size / 2 - 2} fill="#fdf8fd" />
                        <circle cx={cx} cy={cy} r={3} fill="#b5179e" />
                        {mode === 'hour' && <line x1={cx} y1={cy} x2={activeHP.x} y2={activeHP.y} stroke="#b5179e" strokeWidth="2" strokeLinecap="round" />}
                        {mode === 'minute' && <line x1={cx} y1={cy} x2={activeMnP.x} y2={activeMnP.y} stroke="#9c27b0" strokeWidth="2" strokeLinecap="round" />}
                        {mode === 'hour' && hourNums.map((n) => {
                            const p = circ(n === 12 ? 0 : n, 12, R);
                            const active = n === hour;
                            return (
                                <g key={n} onClick={() => { setHour(n); setMode('minute'); }} style={{ cursor: 'pointer' }}>
                                    <circle cx={p.x} cy={p.y} r={15} fill={active ? '#b5179e' : 'transparent'} />
                                    <text x={p.x} y={p.y + 4} textAnchor="middle" fontSize="12" fontWeight={active ? '700' : '500'} fill={active ? '#fff' : '#5c4a6e'} fontFamily="DM Sans,sans-serif">{n}</text>
                                </g>
                            );
                        })}
                        {mode === 'minute' && minNums.map(n => {
                            const p = circ(n, 60, R);
                            const active = n === minute;
                            return (
                                <g key={n} onClick={() => setMinute(n)} style={{ cursor: 'pointer' }}>
                                    <circle cx={p.x} cy={p.y} r={14} fill={active ? '#9c27b0' : 'transparent'} />
                                    <text x={p.x} y={p.y + 4} textAnchor="middle" fontSize="11" fontWeight={active ? '700' : '500'} fill={active ? '#fff' : '#5c4a6e'} fontFamily="DM Sans,sans-serif">{String(n).padStart(2, '0')}</text>
                                </g>
                            );
                        })}
                    </svg>
                </div>
                <div className="clock-actions">
                    <button className="clock-btn-cancel" onClick={onClose}>Cancel</button>
                    <button className="clock-btn-ok" onClick={handleConfirm}>Set Time</button>
                </div>
            </div>
        </div>,
        document.body
    );
}

function TimeInput({ value, onChange }) {
    const [show, setShow] = useState(false);
    return (
        <div className="sg-time-input-wrap">
            <input className="sg-input sg-time-input" value={value} readOnly onClick={() => setShow(true)} onChange={() => { }} />
            <button type="button" className="sg-clock-btn" onClick={() => setShow(true)}><Icons.Clock /></button>
            {show && <ClockPicker value={value} onConfirm={v => { onChange(v); setShow(false); }} onClose={() => setShow(false)} />}
        </div>
    );
}

/* ══ WORK HOURS BAR ════════════════════════════════════════════════════════ */
function WorkHoursBar({ startTime, endTime, breakStart, breakEnd, shiftType }) {
    const toM = t => {
        const m = (t || '').match(/(\d+):(\d+)\s*(AM|PM)/i);
        if (!m) return 0;
        let h = parseInt(m[1]), mn = parseInt(m[2]), p = m[3].toUpperCase();
        if (p === 'AM' && h === 12) h = 0;
        if (p === 'PM' && h !== 12) h += 12;
        return h * 60 + mn;
    };
    const total = 1440;
    const pct = m => `${(m / total) * 100}%`;
    const w = (a, b) => `${Math.max(0, ((b - a) / total) * 100)}%`;
    const sM = toM(startTime), eM = toM(endTime), bsM = toM(breakStart), beM = toM(breakEnd);
    const marks = [0, 3, 6, 9, 12, 15, 18, 21, 24];

    return (
        <div className="wh-bar-wrap">
            <div className="wh-bar-title">
                <span>{shiftType === 'night' ? '🌙 Night Shift' : '☀️ Day Shift'} — Schedule Overview</span>
                <span className="wh-bar-legend">
                    <span className="wh-leg-dot" style={{ background: '#b5179e' }} />Work&nbsp;
                    <span className="wh-leg-dot" style={{ background: '#f97316' }} />Break&nbsp;
                    <span className="wh-leg-dot" style={{ background: '#e8d5f0' }} />Off
                </span>
            </div>
            <div className="wh-bar-track">
                <div className="wh-seg wh-off" style={{ left: 0, width: pct(sM) }} />
                <div className="wh-seg wh-work" style={{ left: pct(sM), width: w(sM, bsM) }} />
                <div className="wh-seg wh-break" style={{ left: pct(bsM), width: w(bsM, beM) }} />
                <div className="wh-seg wh-work" style={{ left: pct(beM), width: w(beM, eM) }} />
                <div className="wh-seg wh-off" style={{ left: pct(eM), width: w(eM, total) }} />
                {marks.map(h => (
                    <div key={h} className="wh-tick" style={{ left: pct(h * 60) }}>
                        <div className="wh-tick-line" />
                        <div className="wh-tick-label">{h === 0 ? '12a' : h === 12 ? '12p' : h < 12 ? `${h}a` : `${h - 12}p`}</div>
                    </div>
                ))}
                <div className="wh-marker wh-marker-start" style={{ left: pct(sM) }}>
                    <div className="wh-marker-pin" style={{ background: '#b5179e' }} />
                    <div className="wh-marker-label">{startTime}</div>
                </div>
                <div className="wh-marker wh-marker-end" style={{ left: pct(eM) }}>
                    <div className="wh-marker-pin" style={{ background: '#7c3aed' }} />
                    <div className="wh-marker-label">{endTime}</div>
                </div>
            </div>
        </div>
    );
}

/* ══ GENERATE KEY MODAL ════════════════════════════════════════════════════ */
function GenerateKeyModal({ onAdd, onClose }) {
    const [keyName, setKeyName] = useState('');
    const [keyType, setKeyType] = useState('Production');
    const [genKey, setGenKey] = useState(null);
    const [copied, setCopied] = useState(false);
    const [nameErr, setNameErr] = useState(false);

    const KEY_TYPES = ['Production', 'Development', 'Webhook', 'Read-only'];
    const PREFIX_MAP = { Production: 'wm_prod', Development: 'wm_dev', Webhook: 'wm_wh', 'Read-only': 'wm_ro' };

    const makeRandom = () => {
        const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
        return Array.from({ length: 20 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
    };

    const handleGenerate = () => {
        if (!keyName.trim()) { setNameErr(true); return; }
        setNameErr(false);
        setGenKey(`${PREFIX_MAP[keyType]}_${makeRandom()}`);
    };

    const handleCopy = () => {
        navigator.clipboard?.writeText(genKey).catch(() => { });
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleAdd = () => {
        if (genKey && keyName.trim()) {
            onAdd({ name: keyName.trim(), key: genKey.slice(0, 14) + '••••••', type: keyType, full: genKey });
            onClose();
        }
    };

    return ReactDOM.createPortal(
        <div className="sg-genkey-overlay" onClick={onClose}>
            <div className="sg-genkey-modal" onClick={e => e.stopPropagation()}>
                <div className="sg-genkey-header">
                    <span className="sg-genkey-title">Generate New API Key</span>
                    <button className="att-action-btn" onClick={onClose}><Icons.X /></button>
                </div>
                <div className="sg-genkey-body">
                    <div className="sg-field">
                        <label className="sg-label">Key Name <span style={{ color: '#ef4444' }}>*</span></label>
                        <input className={`sg-input ${nameErr ? 'sg-input-err' : ''}`}
                            placeholder="e.g. My Production Key"
                            value={keyName} onChange={e => { setKeyName(e.target.value); setNameErr(false); }} />
                        {nameErr && <span className="sg-err-text">Key name is required</span>}
                    </div>
                    <div className="sg-field">
                        <label className="sg-label">Key Type</label>
                        <CustomSelect value={keyType} onChange={setKeyType} options={KEY_TYPES} />
                    </div>

                    {!genKey ? (
                        <button className="att-export-btn sg-genkey-gen-btn" onClick={handleGenerate}>
                            <Icons.Key /> Generate Key
                        </button>
                    ) : (
                        <>
                            <div className="sg-field">
                                <label className="sg-label">Generated Key — copy now, it won't be shown again</label>
                                <div className="sg-genkey-result">
                                    <span className="sg-genkey-result-key">{genKey}</span>
                                    <button className="att-action-btn" onClick={handleCopy} title={copied ? 'Copied!' : 'Copy'}>
                                        {copied ? <Icons.Check /> : <Icons.Copy />}
                                    </button>
                                </div>
                            </div>
                            <div className="sg-genkey-footer">
                                <button className="sg-modal-btn sg-modal-btn-disconnect" onClick={onClose}>Cancel</button>
                                <button className="att-export-btn" onClick={handleAdd}><Icons.Plus /> Add Key</button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>,
        document.body
    );
}

/* ══ INTEGRATION MANAGE MODAL ══════════════════════════════════════════════ */
const INTG_DATA = {
    Slack: {
        tabs: ['Overview', 'Configuration', 'Notifications', 'Logs'],
        fields: [
            { key: 'workspace', label: 'Workspace', val: 'WorkMonitor HQ', editable: false },
            { key: 'webhook', label: 'Webhook URL', val: 'https://hooks.slack.com/services/T0X...A8K', editable: true },
            { key: 'channel', label: 'Default Channel', val: '#workmonitor-alerts', editable: true },
            { key: 'connected', label: 'Connected Since', val: 'Jan 15, 2024', editable: false },
        ],
        logs: [
            { msg: 'Daily report sent to #workmonitor-alerts', time: 'Today 09:00 AM', ok: true },
            { msg: 'Productivity alert: 3 employees below threshold', time: 'Today 11:30 AM', ok: true },
            { msg: 'Webhook timeout — retrying...', time: 'Yesterday 03:44 PM', ok: false },
        ],
    },
    GitHub: {
        tabs: ['Overview', 'Repositories', 'Activity', 'Logs'],
        fields: [
            { key: 'org', label: 'Organization', val: 'workmonitor-inc', editable: false },
            { key: 'token', label: 'Access Token', val: 'ghp_••••••••••••••••••••', editable: true },
            { key: 'repos', label: 'Tracked Repos', val: '4 repositories', editable: false },
            { key: 'since', label: 'Connected Since', val: 'Feb 02, 2024', editable: false },
        ],
        logs: [
            { msg: '12 commits synced from workmonitor/frontend', time: 'Today 10:15 AM', ok: true },
            { msg: 'PR #42 merged — tracked to John Smith', time: 'Today 09:30 AM', ok: true },
        ],
    },
    'Google Workspace': {
        tabs: ['Overview', 'SSO', 'Calendar', 'Logs'],
        fields: [
            { key: 'domain', label: 'Domain', val: 'workmonitor.com', editable: false },
            { key: 'admin', label: 'Admin Email', val: 'admin@workmonitor.com', editable: true },
            { key: 'sso', label: 'SSO Status', val: 'Active', editable: false },
            { key: 'since', label: 'Connected Since', val: 'Jan 15, 2024', editable: false },
        ],
        logs: [
            { msg: 'SSO login: john.smith@workmonitor.com', time: 'Today 09:05 AM', ok: true },
            { msg: 'Calendar sync complete — 96 employees', time: 'Today 08:00 AM', ok: true },
        ],
    },
};

function IntegrationModal({ intg, connected, onDisconnect, onClose }) {
    const cfg = INTG_DATA[intg.name] || { tabs: ['Overview'], fields: [], logs: [] };
    const [activeTab, setActiveTab] = useState('Overview');
    const [fieldVals, setFieldVals] = useState(
        Object.fromEntries((cfg.fields || []).map(f => [f.key, f.val]))
    );
    const [editField, setEditField] = useState(null);
    const [savedMsg, setSavedMsg] = useState(false);
    const [discMsg, setDiscMsg] = useState(false);

    const handleSave = () => {
        setSavedMsg(true);
        setTimeout(() => setSavedMsg(false), 2200);
    };

    const handleDisconnect = () => {
        setDiscMsg(true);
        setTimeout(() => { onDisconnect(intg.name); onClose(); }, 1200);
    };

    return ReactDOM.createPortal(
        <div className="sg-modal-overlay" onClick={onClose}>
            <div className="sg-modal" onClick={e => e.stopPropagation()}>
                {/* Header */}
                <div className="sg-modal-header" style={{ borderTop: `3px solid ${intg.color}` }}>
                    <div className="sg-modal-header-left">
                        <div className="sg-intg-icon-lg" style={{ color: intg.color }}>
                            <intg.Icon />
                        </div>
                        <div>
                            <div className="sg-modal-title">{intg.name}</div>
                            <div className="sg-modal-sub">
                                {connected
                                    ? <span className="att-badge sg-badge-green">● Connected</span>
                                    : <span className="att-badge sg-badge-gray">○ Not Connected</span>
                                }
                            </div>
                        </div>
                    </div>
                    <button className="sg-modal-close" onClick={onClose}><Icons.X /></button>
                </div>

                {/* Tabs */}
                <div className="sg-modal-tabs">
                    {cfg.tabs.map(t => (
                        <button key={t} className={`sg-modal-tab ${activeTab === t ? 'active' : ''}`} onClick={() => setActiveTab(t)}>{t}</button>
                    ))}
                </div>

                {/* Body */}
                <div className="sg-modal-body">

                    {activeTab === 'Overview' && (
                        <div className="sg-modal-section">
                            {/* Fields */}
                            <div className="sg-modal-overview-grid">
                                {(cfg.fields.length > 0 ? cfg.fields : [
                                    { key: 'status', label: 'Status', val: connected ? 'Connected' : 'Not Connected', editable: false },
                                    { key: 'desc', label: 'Description', val: intg.desc, editable: false },
                                ]).map(f => (
                                    <div key={f.key} className="sg-modal-field-row">
                                        <span className="sg-modal-field-label">{f.label}</span>
                                        <div className="sg-modal-field-val-wrap">
                                            {editField === f.key && f.editable ? (
                                                <input
                                                    className="sg-modal-field-input"
                                                    value={fieldVals[f.key] || ''}
                                                    onChange={e => setFieldVals(v => ({ ...v, [f.key]: e.target.value }))}
                                                    onBlur={() => setEditField(null)}
                                                    autoFocus
                                                />
                                            ) : (
                                                <>
                                                    <span className="sg-modal-field-val">{fieldVals[f.key] || f.val}</span>
                                                    {f.editable && (
                                                        <button className="sg-modal-edit-btn" onClick={() => setEditField(f.key)} title="Edit">
                                                            <Icons.Edit />
                                                        </button>
                                                    )}
                                                </>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Save + Disconnect */}
                            {connected && (
                                <div className="sg-modal-save-disconnect">
                                    <button className="sg-modal-save-btn" onClick={handleSave}>
                                        {savedMsg ? <><Icons.Check /> Saved!</> : 'Save Changes'}
                                    </button>
                                    <button className="sg-disconnect-btn" onClick={handleDisconnect}>
                                        {discMsg ? <><Icons.WifiOff /> Disconnecting…</> : <><Icons.WifiOff /> Disconnect</>}
                                    </button>
                                </div>
                            )}

                            {!connected && (
                                <div className="sg-modal-actions-row">
                                    <button className="sg-modal-btn sg-modal-btn-connect">Connect {intg.name}</button>
                                </div>
                            )}
                        </div>
                    )}

                    {activeTab === 'Logs' && cfg.logs.length > 0 && (
                        <div className="sg-modal-section">
                            <div className="sg-log-list">
                                {cfg.logs.map((l, i) => (
                                    <div key={i} className="sg-log-row">
                                        <span className="sg-log-badge" style={{ background: l.ok ? '#dcfce7' : '#fee2e2', color: l.ok ? '#16a34a' : '#dc2626' }}>
                                            {l.ok ? 'OK' : 'ERR'}
                                        </span>
                                        <span className="sg-log-msg">{l.msg}</span>
                                        <span className="sg-log-time">{l.time}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab !== 'Overview' && activeTab !== 'Logs' && (
                        <div className="sg-modal-section sg-modal-comingsoon">
                            <div className="sg-modal-cs-icon" style={{ color: intg.color }}><intg.Icon /></div>
                            <div className="sg-modal-cs-title">{activeTab} Settings</div>
                            <div className="sg-modal-cs-sub">Configure {intg.name} {activeTab.toLowerCase()} here.</div>
                        </div>
                    )}
                </div>
            </div>
        </div>,
        document.body
    );
}

/* ══ MAIN ═══════════════════════════════════════════════════════════════════ */
export default function Settings() {
    const [activeTab, setActiveTab] = useState('general');
    const logoInputRef = useRef(null);
    const [logoImg, setLogoImg] = useState(null);
    const [logoShape, setLogoShape] = useState('circle');
    const [saved, setSaved] = useState(false);

    /* General */
    const [orgName, setOrgName] = useState('WorkMonitor Inc.');
    const [orgEmail, setOrgEmail] = useState('contact@workmonitor.com');
    const [timezone, setTimezone] = useState('(GMT+05:30) Asia/Kolkata');
    const [dateFormat, setDateFormat] = useState('May 20, 2024 (MM DD, YYYY)');

    /* Prefs */
    const [timeTracking, setTimeTracking] = useState(true);
    const [screenshots, setScreenshots] = useState(true);
    const [idleDetection, setIdleDetection] = useState(true);
    const [appTracking, setAppTracking] = useState(true);
    const [breakTracking, setBreakTracking] = useState(true);
    const [offlineTracking, setOfflineTracking] = useState(false);

    /* Working hours */
    const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const WEEKLY_OFFS = ['Saturday, Sunday', 'Sunday only', 'Saturday only', 'None', 'Custom'];
    const OFF_MAP = { 'Saturday, Sunday': ['Sat', 'Sun'], 'Sunday only': ['Sun'], 'Saturday only': ['Sat'], 'None': [], 'Custom': [] };

    const [activeDays, setActiveDays] = useState(['Mon', 'Tue', 'Wed', 'Thu', 'Fri']);
    const [weeklyOff, setWeeklyOff] = useState('Saturday, Sunday');
    const [startTime, setStartTime] = useState('09:00 AM');
    const [endTime, setEndTime] = useState('06:00 PM');
    const [breakStart, setBreakStart] = useState('01:00 PM');
    const [breakEnd, setBreakEnd] = useState('02:00 PM');
    const [shiftType, setShiftType] = useState('day');

    const handleWeeklyOff = val => {
        setWeeklyOff(val);
        if (val !== 'Custom') setActiveDays(DAYS.filter(d => !(OFF_MAP[val] || []).includes(d)));
    };
    const toggleDay = d => {
        const next = activeDays.includes(d) ? activeDays.filter(x => x !== d) : [...activeDays, d];
        setActiveDays(next);
        const match = Object.entries(OFF_MAP).find(([k, off]) =>
            k !== 'Custom' && DAYS.filter(x => !off.includes(x)).sort().join() === [...next].sort().join()
        );
        setWeeklyOff(match ? match[0] : 'Custom');
    };

    /* Logo */
    const handleLogoFile = e => {
        const file = e.target.files?.[0]; if (!file) return;
        const reader = new FileReader();
        reader.onload = ev => {
            const img = new Image();
            img.onload = () => {
                const r = img.width / img.height;
                setLogoShape(r > 1.4 ? 'rect' : r < 0.75 ? 'square' : 'circle');
                setLogoImg(ev.target.result);
            };
            img.src = ev.target.result;
        };
        reader.readAsDataURL(file);
        e.target.value = '';
    };

    /* Monitoring */
    const [monSS, setMonSS] = useState(true);
    const [monBlur, setMonBlur] = useState(true);
    const [monPreview, setMonPreview] = useState(false);
    const [monNotify, setMonNotify] = useState(true);
    const [monFreq, setMonFreq] = useState('Every 10 minutes');
    const [monQuality, setMonQuality] = useState('Medium (recommended)');
    const [monMode, setMonMode] = useState('Active screen only');
    const [monRet, setMonRet] = useState('90 days');
    const [monKbd, setMonKbd] = useState(true);
    const [monMouse, setMonMouse] = useState(true);
    const [monApps, setMonApps] = useState(true);
    const [monUrls, setMonUrls] = useState(true);
    const [monIdle, setMonIdle] = useState(true);
    const [monOff, setMonOff] = useState(false);
    const [monIdleTh, setMonIdleTh] = useState('5 minutes');
    const [monHours, setMonHours] = useState('Working hours only');

    /* Security */
    const [sec2fa, setSec2fa] = useState(true);
    const [secSso, setSecSso] = useState(true);
    const [secForce, setSecForce] = useState(false);
    const [secLockout, setSecLockout] = useState(true);
    const [secIp, setSecIp] = useState(false);
    const [secAudit, setSecAudit] = useState(true);
    const [secSession, setSecSession] = useState('1 hour');
    const [secPass, setSecPass] = useState('8 characters');
    const [secLogin, setSecLogin] = useState('Email, Password & SSO');
    const [secEnc, setSecEnc] = useState('AES-256 (recommended)');

    /* API Keys */
    const [apiKeys, setApiKeys] = useState([
        { name: 'Production API Key', key: 'wm_prod_••••••3f8a', type: 'Production', status: 'active' },
        { name: 'Development API Key', key: 'wm_dev_•••••••7b2c', type: 'Development', status: 'active' },
        { name: 'Webhook Secret', key: 'wm_wh_••••••••1d9e', type: 'Webhook', status: 'active' },
    ]);
    const [showGenKey, setShowGenKey] = useState(false);

    /* Notifications */
    const [nfDaily, setNfDaily] = useState(true);
    const [nfWeekly, setNfWeekly] = useState(true);
    const [nfLogin, setNfLogin] = useState(false);
    const [nfLow, setNfLow] = useState(true);
    const [nfIdle, setNfIdle] = useState(true);
    const [nfLate, setNfLate] = useState(true);
    const [nfInapp, setNfInapp] = useState(true);
    const [nfPush, setNfPush] = useState(true);
    const [nfBrowser, setNfBrowser] = useState(false);
    const [nfSms, setNfSms] = useState(false);
    const [nfThresh, setNfThresh] = useState('Below 70%');
    const [nfDigest, setNfDigest] = useState('Daily digest');
    const [nfRecip, setNfRecip] = useState('Admins & Managers');
    const [nfQuiet, setNfQuiet] = useState('10 PM – 7 AM');

    /* Integrations */
    const [intgUrl, setIntgUrl] = useState('https://hooks.yourserver.com/workmonitor');
    const [intgEvents, setIntgEvents] = useState('All events');
    const [intgPayload, setIntgPayload] = useState('JSON');
    const [manageIntg, setManageIntg] = useState(null);
    const [intgConnected, setIntgConnected] = useState({
        Slack: true, GitHub: true, Jira: false, 'Google Workspace': true, Trello: false, 'Custom Webhook': false
    });
    const INTEGRATIONS = [
        { Icon: Icons.Slack, name: 'Slack', desc: 'Send reports and alerts to Slack channels', color: '#4a154b' },
        { Icon: Icons.Github, name: 'GitHub', desc: 'Track commits, PRs and developer activity', color: '#24292e' },
        { Icon: Icons.Jira, name: 'Jira', desc: 'Sync tasks, sprints and time logs', color: '#0052cc' },
        { Icon: Icons.Google, name: 'Google Workspace', desc: 'SSO login, Calendar sync and Drive files', color: '#4285f4' },
        { Icon: Icons.Trello, name: 'Trello', desc: 'Sync Trello boards and card activity', color: '#0079bf' },
        { Icon: Icons.Webhook, name: 'Custom Webhook', desc: 'Send real-time events to any endpoint', color: '#8b5cf6' },
    ];

    /* System */
    const [sysSsRet, setSysSsRet] = useState('90 days');
    const [sysLogRet, setSysLogRet] = useState('1 year');
    const [sysBackup, setSysBackup] = useState('Daily');
    const [sysLoc, setSysLoc] = useState('WorkMonitor Cloud');
    const [sysDel, setSysDel] = useState(true);
    const [sysCmp, setSysCmp] = useState(true);
    const [sysExp, setSysExp] = useState(true);
    const [sysGdpr, setSysGdpr] = useState(false);

    const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };
    const SaveBtn = () => (
        <button className="att-export-btn" onClick={handleSave}>
            {saved ? <><Icons.Check /> Saved!</> : 'Save Changes'}
        </button>
    );

    return (
        <div className="att-page">
            {/* ── STICKY TABS BAR ── */}
            <div className="sg-tabs-bar">
                <div className="sg-tabs">
                    {TABS.map(t => (
                        <button key={t.id} className={`sg-tab ${activeTab === t.id ? 'active' : ''}`} onClick={() => setActiveTab(t.id)}>
                            <t.Icon />{t.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* ── CONTENT — both sides scroll independently ── */}
            <div className="att-content">

                {/* LEFT MAIN */}
                <div className="att-main">

                    {/* ════ GENERAL ════ */}
                    {activeTab === 'general' && <>
                        <div className="sg-section-card">
                            <div className="sg-section-header">
                                <div><div className="sg-section-title">General Settings</div><div className="sg-section-sub">Manage your organization and system preferences.</div></div>
                                <SaveBtn />
                            </div>
                            <div className="sg-fields-grid">
                                <div className="sg-fields-col">
                                    <div className="sg-field"><label className="sg-label">Organization Name</label><input className="sg-input" value={orgName} onChange={e => setOrgName(e.target.value)} /></div>
                                    <div className="sg-field"><label className="sg-label">Organization Email</label><input className="sg-input" value={orgEmail} onChange={e => setOrgEmail(e.target.value)} /></div>
                                    <div className="sg-field"><label className="sg-label">Timezone</label><CustomSelect value={timezone} onChange={setTimezone} options={['(GMT+05:30) Asia/Kolkata', '(GMT+00:00) UTC', '(GMT-05:00) America/New_York', '(GMT+01:00) Europe/London', '(GMT+08:00) Asia/Singapore']} /></div>
                                </div>
                                <div className="sg-fields-col">
                                    <div className="sg-field">
                                        <label className="sg-label">Organization Logo</label>
                                        <div className="sg-logo-row">
                                            <div className={`sg-logo-preview sg-logo-shape-${logoShape}`} onClick={() => logoInputRef.current?.click()} style={{ cursor: 'pointer' }}>
                                                {logoImg
                                                    ? <img src={logoImg} alt="Logo" className={`sg-logo-img ${logoShape === 'rect' ? 'sg-logo-img-rect' : ''}`} />
                                                    : <svg width="32" height="32" viewBox="0 0 24 24" fill="none"><path d="M12 2L3 7v5c0 5.25 3.75 10.15 9 11.35C17.25 22.15 21 17.25 21 12V7L12 2z" fill="#1d4ed8" opacity="0.9" /><path d="M12 6l-5 2.8v3.2c0 3.1 2.15 6 5 6.6 2.85-.6 5-3.5 5-6.6V8.8L12 6z" fill="#fff" opacity="0.3" /></svg>
                                                }
                                            </div>
                                            <div className="sg-logo-info">
                                                <button className="sg-change-logo-btn" onClick={() => logoInputRef.current?.click()}><Icons.Upload /> Change Logo</button>
                                                <div className="sg-logo-hint">JPG, PNG up to 2MB</div>
                                                <input ref={logoInputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleLogoFile} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="sg-field"><label className="sg-label">Date Format</label><CustomSelect value={dateFormat} onChange={setDateFormat} options={['May 20, 2024 (MM DD, YYYY)', '20/05/2024 (DD/MM/YYYY)', '2024-05-20 (YYYY-MM-DD)', '05-20-2024 (MM-DD-YYYY)']} /></div>
                                </div>
                            </div>
                        </div>

                        <div className="sg-section-card">
                            <div className="sg-section-header"><div><div className="sg-section-title">System Preferences</div><div className="sg-section-sub">Configure system-wide preferences and default settings.</div></div></div>
                            <div className="sg-toggles-grid">
                                <ToggleRow label="Enable Time Tracking" sub="Track and monitor employee work hours" val={timeTracking} set={setTimeTracking} />
                                <ToggleRow label="Enable App & Website Tracking" sub="Monitor applications and websites usage" val={appTracking} set={setAppTracking} />
                                <ToggleRow label="Enable Screenshots" sub="Capture screenshots at regular intervals" val={screenshots} set={setScreenshots} />
                                <ToggleRow label="Enable Break Tracking" sub="Track employee breaks and time away" val={breakTracking} set={setBreakTracking} />
                                <ToggleRow label="Enable Idle Detection" sub="Detect and track idle time automatically" val={idleDetection} set={setIdleDetection} />
                                <ToggleRow label="Enable Offline Tracking" sub="Track time even when employees are offline" val={offlineTracking} set={setOfflineTracking} />
                            </div>
                        </div>

                        <div className="sg-section-card">
                            <div className="sg-section-header">
                                <div><div className="sg-section-title">Working Hours</div><div className="sg-section-sub">Set shifts, working hours, and break times.</div></div>
                                <SaveBtn />
                            </div>
                            <div className="sg-wh-inner">
                                {/* Shift type */}
                                <div className="sg-field">
                                    <label className="sg-label">Shift Type</label>
                                    <div className="sg-shift-row">
                                        <button className={`sg-shift-btn ${shiftType === 'day' ? 'active' : ''}`} onClick={() => { setShiftType('day'); setStartTime('09:00 AM'); setEndTime('06:00 PM'); }}>
                                            <Icons.Sun /> Day Shift
                                        </button>
                                        <button className={`sg-shift-btn ${shiftType === 'night' ? 'active' : ''}`} onClick={() => { setShiftType('night'); setStartTime('09:00 PM'); setEndTime('06:00 AM'); }}>
                                            <Icons.Moon /> Night Shift
                                        </button>
                                    </div>
                                </div>

                                <div className="sg-wh-grid">
                                    <div className="sg-field">
                                        <label className="sg-label">Working Days</label>
                                        <div className="sg-days-row">
                                            {DAYS.map(d => (
                                                <button key={d} className={`sg-day-btn ${activeDays.includes(d) ? 'active' : ''}`} onClick={() => toggleDay(d)}>{d}</button>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="sg-field">
                                        <label className="sg-label">Weekly Off</label>
                                        <CustomSelect value={weeklyOff} onChange={handleWeeklyOff} options={WEEKLY_OFFS} />
                                    </div>
                                </div>

                                <div className="sg-wh-grid">
                                    <div className="sg-field">
                                        <label className="sg-label">Work Start — End</label>
                                        <div className="sg-time-range">
                                            <TimeInput value={startTime} onChange={setStartTime} />
                                            <span className="sg-to">to</span>
                                            <TimeInput value={endTime} onChange={setEndTime} />
                                        </div>
                                    </div>
                                    <div className="sg-field">
                                        <label className="sg-label">Break Start — End</label>
                                        <div className="sg-time-range">
                                            <TimeInput value={breakStart} onChange={setBreakStart} />
                                            <span className="sg-to">to</span>
                                            <TimeInput value={breakEnd} onChange={setBreakEnd} />
                                        </div>
                                    </div>
                                </div>

                                <WorkHoursBar startTime={startTime} endTime={endTime} breakStart={breakStart} breakEnd={breakEnd} shiftType={shiftType} />
                            </div>
                        </div>
                    </>}

                    {/* ════ MONITORING ════ */}
                    {activeTab === 'monitoring' && <>
                        <div className="sg-section-card">
                            <div className="sg-section-header"><div><div className="sg-section-title">Screenshot Monitoring</div><div className="sg-section-sub">Configure how and when screenshots are captured.</div></div><SaveBtn /></div>
                            <div className="sg-toggles-grid">
                                <ToggleRow label="Enable Screenshots" sub="Automatically capture employee screen activity" val={monSS} set={setMonSS} />
                                <ToggleRow label="Blur Sensitive Data" sub="Blur passwords and sensitive form fields" val={monBlur} set={setMonBlur} />
                                <ToggleRow label="Allow Employee Preview" sub="Let employees view their own screenshots" val={monPreview} set={setMonPreview} />
                                <ToggleRow label="Notify Before Capture" sub="Show a notification icon when screenshot is taken" val={monNotify} set={setMonNotify} />
                            </div>
                            <div className="sg-fields-grid sg-fields-pad">
                                <div className="sg-field"><label className="sg-label">Screenshot Frequency</label><CustomSelect value={monFreq} onChange={setMonFreq} options={['Every 5 minutes', 'Every 10 minutes', 'Every 15 minutes', 'Every 30 minutes', 'Every 1 hour']} /></div>
                                <div className="sg-field"><label className="sg-label">Screenshot Quality</label>  <CustomSelect value={monQuality} onChange={setMonQuality} options={['Low (faster upload)', 'Medium (recommended)', 'High (best clarity)']} /></div>
                                <div className="sg-field"><label className="sg-label">Capture Mode</label>         <CustomSelect value={monMode} onChange={setMonMode} options={['Active screen only', 'All monitors', 'Random interval']} /></div>
                                <div className="sg-field"><label className="sg-label">Retention Period</label>     <CustomSelect value={monRet} onChange={setMonRet} options={['30 days', '60 days', '90 days', '180 days', '1 year']} /></div>
                            </div>
                        </div>
                        <div className="sg-section-card">
                            <div className="sg-section-header"><div><div className="sg-section-title">Activity Tracking</div><div className="sg-section-sub">Control what employee activity data is collected.</div></div></div>
                            <div className="sg-toggles-grid">
                                <ToggleRow label="Keyboard Activity Tracking" sub="Track keystrokes count (not actual keys)" val={monKbd} set={setMonKbd} />
                                <ToggleRow label="Mouse Activity Tracking" sub="Track mouse movement and click frequency" val={monMouse} set={setMonMouse} />
                                <ToggleRow label="Application Usage Tracking" sub="Record which apps and websites are used" val={monApps} set={setMonApps} />
                                <ToggleRow label="URL & Website Tracking" sub="Log visited websites during work hours" val={monUrls} set={setMonUrls} />
                                <ToggleRow label="Idle Time Detection" sub="Detect and record periods of inactivity" val={monIdle} set={setMonIdle} />
                                <ToggleRow label="Offline Time Tracking" sub="Track time worked without internet" val={monOff} set={setMonOff} />
                            </div>
                            <div className="sg-fields-grid sg-fields-pad">
                                <div className="sg-field"><label className="sg-label">Idle Threshold</label>   <CustomSelect value={monIdleTh} onChange={setMonIdleTh} options={['3 minutes', '5 minutes', '10 minutes', '15 minutes', '30 minutes']} /></div>
                                <div className="sg-field"><label className="sg-label">Tracking Hours</label>   <CustomSelect value={monHours} onChange={setMonHours} options={['Working hours only', '24 hours', 'Custom schedule']} /></div>
                            </div>
                        </div>
                    </>}

                    {/* ════ SECURITY ════ */}
                    {activeTab === 'security' && <>
                        <div className="sg-section-card">
                            <div className="sg-section-header"><div><div className="sg-section-title">Authentication & Access</div><div className="sg-section-sub">Manage login security and access control policies.</div></div><SaveBtn /></div>
                            <div className="sg-toggles-grid">
                                <ToggleRow label="Two-Factor Authentication (2FA)" sub="Require 2FA for all admin and manager accounts" val={sec2fa} set={setSec2fa} />
                                <ToggleRow label="Single Sign-On (SSO)" sub="Allow login via Google Workspace or Microsoft AD" val={secSso} set={setSecSso} />
                                <ToggleRow label="Force Password Reset" sub="Require password change every 90 days" val={secForce} set={setSecForce} />
                                <ToggleRow label="Login Attempt Lockout" sub="Lock account after 5 failed login attempts" val={secLockout} set={setSecLockout} />
                                <ToggleRow label="IP Whitelist" sub="Restrict access to specific IP addresses only" val={secIp} set={setSecIp} />
                                <ToggleRow label="Audit Log" sub="Log all admin actions and security events" val={secAudit} set={setSecAudit} />
                            </div>
                            <div className="sg-fields-grid sg-fields-pad">
                                <div className="sg-field"><label className="sg-label">Session Timeout</label>          <CustomSelect value={secSession} onChange={setSecSession} options={['15 minutes', '30 minutes', '1 hour', '4 hours', '8 hours', 'Never']} /></div>
                                <div className="sg-field"><label className="sg-label">Password Minimum Length</label>  <CustomSelect value={secPass} onChange={setSecPass} options={['6 characters', '8 characters', '10 characters', '12 characters', '16 characters']} /></div>
                                <div className="sg-field"><label className="sg-label">Allowed Login Methods</label>    <CustomSelect value={secLogin} onChange={setSecLogin} options={['Email & Password only', 'Email, Password & SSO', 'SSO only']} /></div>
                                <div className="sg-field"><label className="sg-label">Data Encryption</label>          <CustomSelect value={secEnc} onChange={setSecEnc} options={['AES-128', 'AES-256 (recommended)', 'AES-256 + TLS 1.3']} /></div>
                            </div>
                        </div>

                        <div className="sg-section-card">
                            <div className="sg-section-header">
                                <div><div className="sg-section-title">API Keys &amp; Tokens</div><div className="sg-section-sub">Manage API access keys for integrations and developers.</div></div>
                                <button className="sg-add-btn" onClick={() => setShowGenKey(true)}><Icons.Key /> Generate New Key</button>
                            </div>
                            <div className="sg-api-list">
                                {apiKeys.map((k, i) => (
                                    <div key={i} className="sg-api-row">
                                        <div className="sg-api-icon"><Icons.Key /></div>
                                        <div className="sg-api-info">
                                            <div className="sg-api-name">{k.name}</div>
                                            <code className="sg-api-key">{k.key}</code>
                                            <div className="sg-api-meta">Type: {k.type} &nbsp;·&nbsp; Status: {k.status}</div>
                                        </div>
                                        <span className="att-badge sg-badge-green">{k.status}</span>
                                        <button className="att-action-btn" title="Copy" onClick={() => { navigator.clipboard?.writeText(k.full || k.key).catch(() => { }) }}><Icons.Copy /></button>
                                        <button className="att-action-btn" title="Revoke" onClick={() => setApiKeys(prev => prev.filter((_, j) => j !== i))}><Icons.Trash2 /></button>
                                    </div>
                                ))}
                                {apiKeys.length === 0 && (
                                    <div style={{ padding: '20px', textAlign: 'center', color: '#b388b3', fontSize: 13 }}>No API keys yet. Click "Generate New Key" to add one.</div>
                                )}
                            </div>
                        </div>
                    </>}

                    {/* ════ NOTIFICATIONS ════ */}
                    {activeTab === 'notifications' && <>
                        <div className="sg-section-card">
                            <div className="sg-section-header"><div><div className="sg-section-title">Email Notifications</div><div className="sg-section-sub">Choose which events trigger email alerts.</div></div><SaveBtn /></div>
                            <div className="sg-toggles-grid">
                                <ToggleRow label="Daily Activity Summary" sub="Send a daily summary email every morning" val={nfDaily} set={setNfDaily} />
                                <ToggleRow label="Weekly Productivity Report" sub="Send weekly performance reports every Monday" val={nfWeekly} set={setNfWeekly} />
                                <ToggleRow label="Employee Login/Logout" sub="Notify when employees check in or out" val={nfLogin} set={setNfLogin} />
                                <ToggleRow label="Low Productivity Alerts" sub="Alert when productivity drops below threshold" val={nfLow} set={setNfLow} />
                                <ToggleRow label="Excessive Idle Time" sub="Alert when idle time exceeds the defined limit" val={nfIdle} set={setNfIdle} />
                                <ToggleRow label="Late Arrival / Early Departure" sub="Notify managers about attendance violations" val={nfLate} set={setNfLate} />
                            </div>
                        </div>
                        <div className="sg-section-card">
                            <div className="sg-section-header"><div><div className="sg-section-title">In-App &amp; Push Notifications</div><div className="sg-section-sub">Manage real-time in-app alerts and push notifications.</div></div></div>
                            <div className="sg-toggles-grid">
                                <ToggleRow label="In-App Notifications" sub="Show real-time alerts inside the dashboard" val={nfInapp} set={setNfInapp} />
                                <ToggleRow label="Mobile Push Notifications" sub="Send push notifications to the mobile app" val={nfPush} set={setNfPush} />
                                <ToggleRow label="Browser Notifications" sub="Show browser desktop notifications" val={nfBrowser} set={setNfBrowser} />
                                <ToggleRow label="SMS Alerts (Critical Only)" sub="Send SMS for critical security alerts" val={nfSms} set={setNfSms} />
                            </div>
                            <div className="sg-fields-grid sg-fields-pad">
                                <div className="sg-field"><label className="sg-label">Productivity Alert Threshold</label><CustomSelect value={nfThresh} onChange={setNfThresh} options={['Below 50%', 'Below 60%', 'Below 70%', 'Below 80%']} /></div>
                                <div className="sg-field"><label className="sg-label">Alert Digest Frequency</label>       <CustomSelect value={nfDigest} onChange={setNfDigest} options={['Instant', 'Hourly digest', 'Daily digest', 'Weekly digest']} /></div>
                                <div className="sg-field"><label className="sg-label">Notification Recipients</label>      <CustomSelect value={nfRecip} onChange={setNfRecip} options={['Admins only', 'Admins & Managers', 'All users']} /></div>
                                <div className="sg-field"><label className="sg-label">Quiet Hours</label>                  <CustomSelect value={nfQuiet} onChange={setNfQuiet} options={['Disabled', '8 PM – 8 AM', '10 PM – 7 AM', 'Weekends only']} /></div>
                            </div>
                        </div>
                    </>}

                    {/* ════ INTEGRATIONS ════ */}
                    {activeTab === 'integrations' && <>
                        <div className="sg-section-card">
                            <div className="sg-section-header"><div><div className="sg-section-title">Connected Integrations</div><div className="sg-section-sub">Manage third-party tools and services.</div></div></div>
                            <div className="sg-integrations-grid">
                                {INTEGRATIONS.map((intg, i) => {
                                    const connected = intgConnected[intg.name];
                                    return (
                                        <div key={i} className="sg-intg-card">
                                            <div className="sg-intg-top">
                                                <div className="sg-intg-icon" style={{ color: intg.color }}><intg.Icon /></div>
                                                <span className={`att-badge ${connected ? 'sg-badge-green' : 'sg-badge-gray'}`}>{connected ? 'Connected' : 'Not Connected'}</span>
                                            </div>
                                            <div className="sg-intg-name">{intg.name}</div>
                                            <div className="sg-intg-desc">{intg.desc}</div>
                                            <button
                                                className={`sg-intg-btn ${connected ? 'connected' : ''}`}
                                                style={connected ? { background: intg.color } : {}}
                                                onClick={() => setManageIntg(intg)}>
                                                {connected ? 'Manage' : 'Connect'}
                                            </button>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                        <div className="sg-section-card">
                            <div className="sg-section-header"><div><div className="sg-section-title">Webhook Configuration</div><div className="sg-section-sub">Configure custom webhooks to receive real-time event data.</div></div><SaveBtn /></div>
                            <div className="sg-fields-grid sg-fields-pad">
                                <div className="sg-field" style={{ gridColumn: '1/-1' }}>
                                    <label className="sg-label">Webhook Endpoint URL</label>
                                    <input className="sg-input" value={intgUrl} onChange={e => setIntgUrl(e.target.value)} placeholder="https://your-server.com/webhook" />
                                </div>
                                <div className="sg-field"><label className="sg-label">Trigger Events</label><CustomSelect value={intgEvents} onChange={setIntgEvents} options={['All events', 'Attendance events only', 'Productivity alerts only', 'Security events only']} /></div>
                                <div className="sg-field"><label className="sg-label">Payload Format</label><CustomSelect value={intgPayload} onChange={setIntgPayload} options={['JSON', 'XML', 'Form-encoded']} /></div>
                            </div>
                        </div>
                    </>}

                    {/* ════ BILLING ════ */}
                    {activeTab === 'billing' && <>
                        <div className="sg-section-card">
                            <div className="sg-section-header"><div><div className="sg-section-title">Current Plan</div><div className="sg-section-sub">Your subscription details and usage for this billing cycle.</div></div><button className="att-export-btn">Upgrade Plan</button></div>
                            <div className="sg-plan-card">
                                <div className="sg-plan-left">
                                    <div className="sg-plan-badge">Enterprise</div>
                                    <div className="sg-plan-price">$12 <span>/user/month</span></div>
                                    <div className="sg-plan-desc">Full access to all features including screenshots, reporting, integrations and priority support.</div>
                                    <div className="sg-plan-features">
                                        {['Unlimited screenshots', 'Advanced reporting', 'All integrations', 'Priority support', 'Custom data retention', 'SSO & 2FA'].map((f, i) => (
                                            <div key={i} className="sg-plan-feature"><Icons.Check /> {f}</div>
                                        ))}
                                    </div>
                                </div>
                                <div className="sg-plan-right">
                                    <div className="sg-usage-block">
                                        <div className="sg-usage-label">Active Employees</div>
                                        <div className="sg-usage-val">96 / 150 seats</div>
                                        <div className="sg-usage-bar-wrap"><div className="sg-usage-bar" style={{ width: '64%', background: '#b5179e' }} /></div>
                                        <div className="sg-usage-sub">54 seats remaining</div>
                                    </div>
                                    <div className="sg-usage-block">
                                        <div className="sg-usage-label">Storage Used</div>
                                        <div className="sg-usage-val">78 GB / 200 GB</div>
                                        <div className="sg-usage-bar-wrap"><div className="sg-usage-bar" style={{ width: '39%', background: '#f97316' }} /></div>
                                        <div className="sg-usage-sub">122 GB remaining</div>
                                    </div>
                                    <div className="sg-usage-block">
                                        <div className="sg-usage-label">Next Billing Date</div>
                                        <div className="sg-usage-val">June 15, 2024</div>
                                        <div className="sg-usage-sub">Auto-renewal enabled</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="sg-section-card">
                            <div className="sg-section-header"><div><div className="sg-section-title">Payment Method</div><div className="sg-section-sub">Manage your payment details and billing address.</div></div><button className="sg-add-btn"><Icons.CreditCard /> Add Payment Method</button></div>
                            <div className="sg-payment-list">
                                {[{ type: 'Visa', last4: '4242', expiry: '09/26', primary: true }, { type: 'Mastercard', last4: '8910', expiry: '03/25', primary: false }].map((card, i) => (
                                    <div key={i} className="sg-payment-row">
                                        <div className="sg-payment-icon"><Icons.CreditCard /></div>
                                        <div className="sg-payment-info"><div className="sg-payment-name">{card.type} ending in {card.last4}</div><div className="sg-payment-expiry">Expires {card.expiry}</div></div>
                                        {card.primary && <span className="att-badge" style={{ background: '#eff6ff', color: '#1d4ed8' }}>Primary</span>}
                                        <button className="att-action-btn"><Icons.Trash2 /></button>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="sg-section-card">
                            <div className="sg-section-header"><div><div className="sg-section-title">Billing History</div><div className="sg-section-sub">View and download past invoices.</div></div></div>
                            <div className="sg-table-wrap">
                                <table className="att-table">
                                    <thead><tr><th>Invoice</th><th>Date</th><th>Amount</th><th>Employees</th><th>Status</th><th>Action</th></tr></thead>
                                    <tbody>
                                        {[{ id: 'INV-2024-05', date: 'May 1, 2024', amount: '$1,152', emp: 96 }, { id: 'INV-2024-04', date: 'Apr 1, 2024', amount: '$1,080', emp: 90 }, { id: 'INV-2024-03', date: 'Mar 1, 2024', amount: '$1,020', emp: 85 }, { id: 'INV-2024-02', date: 'Feb 1, 2024', amount: '$960', emp: 80 }].map((inv, i) => (
                                            <tr key={i}>
                                                <td className="att-emp-name">{inv.id}</td>
                                                <td className="att-td-text">{inv.date}</td>
                                                <td className="att-emp-name">{inv.amount}</td>
                                                <td className="att-td-text">{inv.emp} employees</td>
                                                <td><span className="att-badge sg-badge-green">Paid</span></td>
                                                <td><button className="att-action-btn" title="Download"><Icons.Download /></button></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </>}

                    {/* ════ SYSTEM ════ */}
                    {activeTab === 'system' && <>
                        <div className="sg-section-card">
                            <div className="sg-section-header"><div><div className="sg-section-title">Data &amp; Storage Management</div><div className="sg-section-sub">Configure data retention, backups and storage settings.</div></div><SaveBtn /></div>
                            <div className="sg-fields-grid sg-fields-pad">
                                <div className="sg-field"><label className="sg-label">Screenshot Retention</label>       <CustomSelect value={sysSsRet} onChange={setSysSsRet} options={['30 days', '60 days', '90 days', '180 days', '1 year', 'Indefinite']} /></div>
                                <div className="sg-field"><label className="sg-label">Activity Log Retention</label>    <CustomSelect value={sysLogRet} onChange={setSysLogRet} options={['90 days', '180 days', '1 year', '2 years', 'Indefinite']} /></div>
                                <div className="sg-field"><label className="sg-label">Automatic Backup Frequency</label><CustomSelect value={sysBackup} onChange={setSysBackup} options={['Daily', 'Every 12 hours', 'Every 6 hours', 'Real-time']} /></div>
                                <div className="sg-field"><label className="sg-label">Backup Storage Location</label>   <CustomSelect value={sysLoc} onChange={setSysLoc} options={['WorkMonitor Cloud', 'AWS S3', 'Google Cloud Storage', 'Azure Blob']} /></div>
                            </div>
                            <div className="sg-toggles-grid sg-toggles-pad">
                                <ToggleRow label="Auto-delete Old Data" sub="Automatically delete data older than retention period" val={sysDel} set={setSysDel} />
                                <ToggleRow label="Compress Screenshot Storage" sub="Compress stored screenshots to save space" val={sysCmp} set={setSysCmp} />
                                <ToggleRow label="Enable Data Export" sub="Allow admins to export all data as CSV or ZIP" val={sysExp} set={setSysExp} />
                                <ToggleRow label="GDPR Compliance Mode" sub="Enable anonymisation and right-to-erasure features" val={sysGdpr} set={setSysGdpr} />
                            </div>
                        </div>
                        <div className="sg-section-card">
                            <div className="sg-section-header"><div><div className="sg-section-title">System Information</div><div className="sg-section-sub">Current platform version and environment details.</div></div><button className="sg-add-btn"><Icons.RefreshCw /> Check for Updates</button></div>
                            <div className="sg-sysinfo-grid">
                                {[{ label: 'Platform Version', val: 'WorkMonitor v3.2.1' }, { label: 'Last Updated', val: 'May 18, 2024' }, { label: 'Server Region', val: 'Asia South (Mumbai)' }, { label: 'Database Version', val: 'PostgreSQL 15.3' }, { label: 'Agent Version', val: 'WM Agent v2.8.4' }, { label: 'Uptime', val: '99.98% (last 30 days)' }, { label: 'API Version', val: 'v2 (stable)' }, { label: 'License Type', val: 'Enterprise – 150 seats' }].map((r, i) => (
                                    <div key={i} className="sg-sysinfo-row"><span className="sg-sysinfo-label">{r.label}</span><span className="sg-sysinfo-val">{r.val}</span></div>
                                ))}
                            </div>
                        </div>
                        <div className="sg-section-card">
                            <div className="sg-section-header"><div><div className="sg-section-title">System Logs</div><div className="sg-section-sub">Recent system events and error logs.</div></div><button className="sg-add-btn"><Icons.Download /> Export Logs</button></div>
                            <div className="sg-log-list">
                                {[
                                    { level: 'INFO', msg: 'Backup completed successfully — 12.4 GB archived', time: 'Today 06:00 AM', color: '#16a34a' },
                                    { level: 'INFO', msg: '96 employees tracked — daily activity report generated', time: 'Today 08:01 AM', color: '#16a34a' },
                                    { level: 'WARN', msg: 'Storage usage exceeded 75% threshold', time: 'Today 09:15 AM', color: '#f97316' },
                                    { level: 'INFO', msg: 'Agent update deployed to 96 devices', time: 'Yesterday 11:30 PM', color: '#16a34a' },
                                    { level: 'ERROR', msg: 'Webhook delivery failed for endpoint /api/slack — timeout', time: 'Yesterday 03:44 PM', color: '#ef4444' },
                                    { level: 'INFO', msg: '2FA enabled for 12 new admin accounts', time: 'May 18, 2024', color: '#16a34a' },
                                ].map((log, i) => (
                                    <div key={i} className="sg-log-row">
                                        <span className="sg-log-badge" style={{ background: log.color + '18', color: log.color }}>{log.level}</span>
                                        <span className="sg-log-msg">{log.msg}</span>
                                        <span className="sg-log-time">{log.time}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </>}

                </div>{/* end att-main */}

                {/* ── RIGHT PANEL — independent scroll ── */}
                <div className="att-right">
                    <div className="att-right-section">
                        <div className="sg-overview-banner">
                            <div className="sg-overview-text">
                                <div className="att-right-title">Settings Overview</div>
                                <div className="sg-overview-sub">Manage all system settings and preferences in one place.</div>
                            </div>
                            <div className="sg-overview-icon"><Icons.GearBig /><div className="sg-overview-gear-fg"><Icons.Settings /></div></div>
                        </div>
                    </div>
                    <div className="att-right-section">
                        <div className="att-right-section-header"><span className="att-right-title">System Status</span></div>
                        <div className="sg-status-list">
                            <StatusRow Icon={Icons.CheckCircle} label="System Status" status="Operational" color="#16a34a" />
                            <StatusRow Icon={Icons.Database} label="Database" status="Connected" color="#16a34a" />
                            <StatusRow Icon={Icons.Server} label="Server" status="Running" color="#16a34a" />
                            <StatusRow Icon={Icons.HardDrive} label="Storage" status="78% Used" color="#f97316" />
                            <StatusRow Icon={Icons.RefreshCw} label="Backup" status="Up to date" color="#16a34a" />
                        </div>
                    </div>
                    <div className="att-right-section">
                        <div className="att-right-section-header"><span className="att-right-title">Account Information</span></div>
                        <div className="sg-account-card">
                            <div className="sg-account-avatar"><Icons.User /></div>
                            <div className="sg-account-info">
                                <div className="sg-account-name">John Smith <span className="sg-account-badge">Admin</span></div>
                                <div className="sg-account-email">john.smith@workmonitor.com</div>
                                <div className="sg-account-role">Super Administrator</div>
                            </div>
                        </div>
                        <div className="sg-account-meta">
                            {[{ Icon: Icons.Settings, label: 'Account Type', val: 'Enterprise' }, { Icon: Icons.Clock, label: 'Member Since', val: 'Jan 15, 2024' }, { Icon: Icons.Clock, label: 'Last Login', val: 'May 20, 2024 10:30 AM' }].map((r, i) => (
                                <div key={i} className="sg-meta-row">
                                    <span className="sg-meta-icon"><r.Icon /></span>
                                    <span className="sg-meta-label">{r.label}</span>
                                    <span className="sg-meta-val">{r.val}</span>
                                </div>
                            ))}
                        </div>
                        <button className="att-view-all-btn">Update Profile <Icons.ArrowRight /></button>
                    </div>
                    <div className="att-right-section">
                        <div className="att-right-section-header"><span className="att-right-title">Quick Actions</span></div>
                        <div className="sg-quick-actions">
                            {[{ Icon: Icons.Users, label: 'Manage Users' }, { Icon: Icons.FileText, label: 'View Audit Logs' }, { Icon: Icons.Trash2, label: 'Clear Cache' }].map((a, i) => (
                                <button key={i} className="sg-quick-btn">
                                    <span className="sg-quick-icon"><a.Icon /></span>
                                    <span className="sg-quick-label">{a.label}</span>
                                    <span className="sg-quick-arrow"><Icons.ChevronRight /></span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

            </div>{/* end att-content */}

            {/* ── PORTALS ── */}
            {showGenKey && (
                <GenerateKeyModal
                    onAdd={k => setApiKeys(prev => [...prev, { ...k, status: 'active' }])}
                    onClose={() => setShowGenKey(false)}
                />
            )}
            {manageIntg && (
                <IntegrationModal
                    intg={manageIntg}
                    connected={intgConnected[manageIntg.name]}
                    onDisconnect={name => setIntgConnected(p => ({ ...p, [name]: false }))}
                    onClose={() => setManageIntg(null)}
                />
            )}
        </div>
    );
}