import React, { useState, useRef, useEffect, useCallback } from 'react';
import "./Livechat.css";

/* ══════════════════════════════════════════ ICONS ══════════════════════════════════════════ */
const Icons = {
    Search: () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>,
    X: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>,
    Filter: () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" /></svg>,
    Download: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>,
    Info: () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" /></svg>,
    MoreVert: () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="5" r="1" /><circle cx="12" cy="12" r="1" /><circle cx="12" cy="19" r="1" /></svg>,
    Send: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></svg>,
    Attach: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" /></svg>,
    Emoji: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M8 14s1.5 2 4 2 4-2 4-2" /><line x1="9" y1="9" x2="9.01" y2="9" /><line x1="15" y1="9" x2="15.01" y2="9" /></svg>,
    DoubleCheck: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 6 9 17 4 12" /><polyline points="23 6 14 17 12 15" /></svg>,
    Figma: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z" /><path d="M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2z" /><path d="M12 12.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 1 1-7 0z" /><path d="M5 19.5A3.5 3.5 0 0 1 8.5 16H12v3.5a3.5 3.5 0 1 1-7 0z" /><path d="M5 12.5A3.5 3.5 0 0 1 8.5 9H12v7H8.5A3.5 3.5 0 0 1 5 12.5z" /></svg>,
    ArrowRight: () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>,
    ChevDown: () => <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>,
    LoadMore: () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>,
    Messages: () => <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>,
    ActiveChat: () => <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /><circle cx="12" cy="10" r="2" fill="currentColor" stroke="none" /></svg>,
    ClosedChat: () => <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>,
    Clock: () => <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>,
    Eye: () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>,
    Archive: () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="21 8 21 21 3 21 3 8" /><rect x="1" y="3" width="22" height="5" /><line x1="10" y1="12" x2="14" y2="12" /></svg>,
    Trash: () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" /></svg>,
    Bell: () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></svg>,
    Block: () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="4.93" y1="4.93" x2="19.07" y2="19.07" /></svg>,
    CheckCircle: () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>,
    Minimize: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3" /></svg>,
    Maximize: () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" /></svg>,
    Record: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="4" fill="currentColor" stroke="none" /></svg>,
    StopRecord: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="none"><rect x="4" y="4" width="16" height="16" rx="2" /></svg>,
    Screenshot: () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" /></svg>,
    Save: () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" /><polyline points="17 21 17 13 7 13 7 21" /><polyline points="7 3 7 8 15 8" /></svg>,
    User: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>,
    Activity: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg>,
    Briefcase: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg>,
    TrendUp: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" /></svg>,
    CheckTask: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 11 12 14 22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" /></svg>,
};

/* ══ DATA ══ */
const CONVOS = [
    { id: 1, name: 'John Smith', role: 'UI/UX Designer', dept: 'Design Team', time: '10:30 AM', preview: 'Can you share the latest desi...', unread: 2, online: true },
    { id: 2, name: 'Sarah Johnson', role: 'Developer', dept: 'Dev Team', time: '10:28 AM', preview: "Sure, I'll upload them now.", unread: 1, online: true },
    { id: 3, name: 'Michael Brown', role: 'Designer', dept: 'Design Team', time: '10:15 AM', preview: 'Team meeting at 3 PM today.', unread: 3, online: true },
    { id: 4, name: 'Emily Davis', role: 'Content Writer', dept: 'Content Team', time: '10:10 AM', preview: 'Please review the content.', unread: 1, online: false },
    { id: 5, name: 'David Wilson', role: 'Marketing', dept: 'Marketing', time: '09:45 AM', preview: 'Marketing report is ready.', unread: 0, online: true },
    { id: 6, name: 'James Anderson', role: 'Support', dept: 'Support', time: '09:30 AM', preview: 'Client feedback is positive.', unread: 0, online: false },
    { id: 7, name: 'Jessica Martinez', role: 'HR', dept: 'HR', time: '09:25 AM', preview: 'Design mockups are done.', unread: 0, online: true },
    { id: 8, name: 'Daniel Thomas', role: 'Finance', dept: 'Finance', time: '09:10 AM', preview: 'Database backup completed.', unread: 0, online: false },
];

const MESSAGES_INIT = {
    1: [
        { id: 1, from: 'them', text: 'Hi, can you share the latest design files for the dashboard?', time: '10:30 AM', read: true },
        { id: 2, from: 'me', text: "Sure, I'll upload them right away.", time: '10:31 AM', read: true },
        { id: 3, from: 'them', text: 'Also, are we using the new color palette or the previous one?', time: '10:32 AM', read: true },
        { id: 4, from: 'me', text: "We are using the new one. I'll share the style guide as well.", time: '10:33 AM', read: true, file: { name: 'Dashboard_Design_v2.fig', type: 'Figma File', size: '12.4 MB' } },
        { id: 5, from: 'them', text: 'Thanks! Looks great. Will review and get back to you.', time: '10:35 AM', read: true },
        { id: 6, from: 'me', text: 'Perfect! Let me know if you need any changes.', time: '10:36 AM', read: false },
    ],
    2: [{ id: 1, from: 'them', text: "Sure, I'll upload them now.", time: '10:28 AM', read: true }],
    3: [{ id: 1, from: 'them', text: 'Team meeting at 3 PM today.', time: '10:15 AM', read: true }],
    4: [{ id: 1, from: 'them', text: 'Please review the content.', time: '10:10 AM', read: true }],
    5: [{ id: 1, from: 'them', text: 'Marketing report is ready.', time: '09:45 AM', read: true }],
    6: [{ id: 1, from: 'them', text: 'Client feedback is positive.', time: '09:30 AM', read: true }],
    7: [{ id: 1, from: 'them', text: 'Design mockups are done.', time: '09:25 AM', read: true }],
    8: [{ id: 1, from: 'them', text: 'Database backup completed.', time: '09:10 AM', read: true }],
};

/* ══ EMOJI LIST ══ */
const EMOJIS = [
    '😀', '😃', '😄', '😁', '😆', '😅', '😂', '🤣', '😊', '😇',
    '🙂', '🙃', '😉', '😌', '😍', '🥰', '😘', '😗', '😙', '😚',
    '😋', '😛', '😜', '🤪', '😝', '🤑', '🤗', '🤭', '🤫', '🤔',
    '🤐', '🤨', '😐', '😑', '😶', '😏', '😒', '🙄', '😬', '🤥',
    '😔', '😪', '🤤', '😴', '😷', '🤒', '🤕', '🤢', '🤧', '🥵',
    '👍', '👎', '👌', '✌️', '🤞', '👏', '🙌', '🤝', '💪', '🎉',
    '🔥', '❤️', '💯', '✅', '⭐', '🚀', '💡', '📌', '📎', '🗂️',
];

const AV_COLORS = ['#7c3aed', '#b5179e', '#059669', '#d97706', '#2563eb', '#dc2626', '#0284c7', '#65a30d'];
const avColor = n => AV_COLORS[n.charCodeAt(0) % AV_COLORS.length];
const initials = n => n.split(' ').map(w => w[0]).join('');

/* ══ HELPERS ══ */
function Avatar({ name, size = 34, online }) {
    return (
        <div style={{ position: 'relative', flexShrink: 0 }}>
            <div style={{ width: size, height: size, borderRadius: '50%', background: avColor(name), color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: size * 0.33, fontFamily: 'DM Sans' }}>
                {initials(name)}
            </div>
            {online !== undefined && (
                <span style={{ position: 'absolute', bottom: 1, right: 1, width: size * 0.26, height: size * 0.26, borderRadius: '50%', background: online ? '#22c55e' : '#9ca3af', border: '2px solid #fff' }} />
            )}
        </div>
    );
}

function Sparkline({ pts, color }) {
    const max = Math.max(...pts), min = Math.min(...pts);
    const w = 70, h = 28;
    const points = pts.map((v, i) => `${(i / (pts.length - 1)) * w},${h - ((v - min) / (max - min || 1)) * (h - 4) - 2}`).join(' ');
    return <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} style={{ flexShrink: 0 }}><polyline points={points} fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

function DonutChart({ segs, total }) {
    const cx = 60, cy = 60, r = 46, sw = 14, circ = 2 * Math.PI * r;
    const gapArc = (4 / 360) * circ;
    let cum = 0;
    return (
        <svg width="120" height="120" viewBox="0 0 120 120" style={{ flexShrink: 0 }}>
            <circle cx={cx} cy={cy} r={r} fill="none" stroke="#f0e6f0" strokeWidth={sw} />
            {segs.map((s, i) => {
                const segArc = (s.pct / 100) * circ;
                const dash = Math.max(segArc - gapArc, 0);
                const gap = circ - dash;
                const rot = -90 + (cum / 100) * 360 + 2;
                cum += s.pct;
                return <circle key={i} cx={cx} cy={cy} r={r} fill="none" stroke={s.color} strokeWidth={sw} strokeDasharray={`${dash} ${gap}`} transform={`rotate(${rot} ${cx} ${cy})`} strokeLinecap="round" />;
            })}
            <text x={cx} y={cy - 7} textAnchor="middle" fontSize="18" fontWeight="800" fill="#2d1a3e" fontFamily="DM Sans">{total}</text>
            <text x={cx} y={cy + 9} textAnchor="middle" fontSize="10" fill="#b388b3" fontFamily="DM Sans">Total</text>
        </svg>
    );
}

function ActivityChart() {
    const data = [20, 45, 60, 38, 72, 55, 80, 48, 35, 65, 42, 28];
    const max = 80, h = 90, w = 240;
    const pts = data.map((v, i) => `${(i / (data.length - 1)) * w},${h - (v / max) * (h - 10) - 5}`).join(' ');
    const fill = `${pts} ${w},${h} 0,${h}`;
    return (
        <svg width="100%" viewBox={`0 0 ${w} ${h + 4}`} preserveAspectRatio="none" style={{ overflow: 'visible' }}>
            <defs>
                <linearGradient id="chatGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#b5179e" stopOpacity="0.18" />
                    <stop offset="100%" stopColor="#b5179e" stopOpacity="0" />
                </linearGradient>
            </defs>
            {[0, 25, 50, 75].map((v, i) => <line key={i} x1="0" y1={h - (v / max) * (h - 10) - 5} x2={w} y2={h - (v / max) * (h - 10) - 5} stroke="#f0e6f0" strokeWidth="0.8" />)}
            <polygon points={fill} fill="url(#chatGrad)" />
            <polyline points={pts} fill="none" stroke="#b5179e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

function CustomSelect({ options, defaultIdx = 0 }) {
    const [open, setOpen] = useState(false);
    const [idx, setIdx] = useState(defaultIdx);
    const ref = useRef(null);
    useEffect(() => {
        const h = e => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
        document.addEventListener('mousedown', h);
        return () => document.removeEventListener('mousedown', h);
    }, []);
    return (
        <div className="lc-cust-sel" ref={ref}>
            <button className="lc-cust-sel-btn" onClick={() => setOpen(o => !o)}>
                <span>{options[idx]}</span>
                <span className={`lc-sel-arrow ${open ? 'open' : ''}`}><Icons.ChevDown /></span>
            </button>
            {open && (
                <ul className="lc-cust-dropdown">
                    {options.map((o, i) => (
                        <li key={o} className={`lc-cust-option ${i === idx ? 'selected' : ''}`}
                            onMouseDown={() => { setIdx(i); setOpen(false); }}>
                            {i === idx && <span className="lc-opt-check">✓</span>}
                            {o}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

function CtxMenu({ items, onClose }) {
    const ref = useRef(null);
    useEffect(() => {
        const h = e => { if (ref.current && !ref.current.contains(e.target)) onClose(); };
        document.addEventListener('mousedown', h);
        return () => document.removeEventListener('mousedown', h);
    }, [onClose]);
    return (
        <div className="lc-ctx-menu" ref={ref}>
            {items.map((item, i) =>
                item.divider
                    ? <div key={i} className="lc-ctx-divider" />
                    : <button key={i} className={`lc-ctx-item ${item.danger ? 'danger' : ''}`}
                        onClick={() => { item.onClick?.(); onClose(); }}>
                        <span className="lc-ctx-icon">{item.icon}</span>
                        <span>{item.label}</span>
                    </button>
            )}
        </div>
    );
}

function useFileInput(onFile) {
    const ref = useRef(null);
    const trigger = () => ref.current?.click();
    const input = <input ref={ref} type="file" style={{ display: 'none' }} onChange={e => { if (e.target.files[0]) { onFile(e.target.files[0]); e.target.value = ''; } }} />;
    return { trigger, input };
}

/* ══ MAXIMIZED LIVE SCREEN OVERLAY ══ */
function MaximizedScreen({ name, convo, onClose }) {
    const [recording, setRecording] = useState(false);
    const [recordSeconds, setRecordSeconds] = useState(0);
    const [recordState, setRecordState] = useState(null); // null | 'stopped'
    const timerRef = useRef(null);

    const fmt = s => {
        const h = Math.floor(s / 3600);
        const m = Math.floor((s % 3600) / 60);
        const sec = s % 60;
        return [h, m, sec].map(x => String(x).padStart(2, '0')).join(':');
    };

    const startRecording = () => {
        setRecording(true);
        setRecordState(null);
        setRecordSeconds(0);
        timerRef.current = setInterval(() => setRecordSeconds(s => s + 1), 1000);
    };

    const stopRecording = () => {
        clearInterval(timerRef.current);
        setRecording(false);
        setRecordState('stopped');
    };

    const saveRecording = () => {
        setRecordState('saved');
        setTimeout(() => setRecordState(null), 2500);
    };

    const deleteRecording = () => {
        setRecordState('deleted');
        setTimeout(() => setRecordState(null), 2500);
    };

    const takeScreenshot = () => {
        const now = new Date();
        const ts = now.toISOString().replace(/[:T]/g, '-').slice(0, 19);
        const filename = `${name.replace(' ', '_')}_${ts}.png`;
        // Simulate screenshot save (just show a toast)
        const toast = document.createElement('div');
        toast.textContent = `Screenshot saved: ${filename}`;
        toast.style.cssText = 'position:fixed;bottom:24px;left:50%;transform:translateX(-50%);background:#2d1a3e;color:#fff;padding:10px 20px;border-radius:10px;font-size:12px;font-family:DM Sans,sans-serif;z-index:99999;box-shadow:0 4px 16px rgba(0,0,0,0.3)';
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 2800);
    };

    useEffect(() => () => clearInterval(timerRef.current), []);

    const statusColor = convo.online ? '#22c55e' : '#9ca3af';
    const statusText = convo.online ? 'Active' : 'Offline';

    // Today's tasks
    const tasks = [
        { text: 'Dashboard UI Design', done: true },
        { text: 'Component Library Update', done: true },
        { text: 'Mobile Responsive Layout', done: false },
        { text: 'Design Review Meeting', done: false },
    ];
    const doneCount = tasks.filter(t => t.done).length;

    return (
        <div className="lc-max-overlay" onClick={onClose}>
            <div className="lc-max-box" onClick={e => e.stopPropagation()}>

                {/* Header */}
                <div className="lc-max-header">
                    <div className="lc-max-header-left">
                        <Avatar name={name} size={36} online={convo.online} />
                        <div>
                            <div className="lc-max-name">{name}</div>
                            <div className="lc-max-role">{convo.role} &bull; {convo.dept}</div>
                        </div>
                        <span className="lc-max-status-pill" style={{ background: convo.online ? '#e8f5e9' : '#f3f4f6', color: statusColor }}>
                            <span style={{ width: 7, height: 7, borderRadius: '50%', background: statusColor, display: 'inline-block', marginRight: 5 }} />
                            {statusText}
                        </span>
                    </div>
                    <button className="lc-max-close" onClick={onClose}><Icons.X /></button>
                </div>

                {/* Screen */}
                <div className="lc-max-screen">
                    {/* Fake monitor */}
                    <div className="lc-max-display">
                        <div className="lc-ls-topbar" />
                        <div className="lc-ls-content" style={{ height: 300 }}>
                            <div className="lc-ls-sidebar">
                                {[true, false, false, true, false, false].map((a, i) => (
                                    <div key={i} className={`lc-ls-nav-item ${a ? 'active' : ''}`} />
                                ))}
                            </div>
                            <div className="lc-ls-main">
                                <div className="lc-ls-header-bar" />
                                <div className="lc-ls-chart-area">
                                    {[40, 65, 45, 80, 55, 70, 60, 75, 50, 85, 60, 72].map((h, i) => (
                                        <div key={i} className="lc-ls-bar" style={{ height: `${h}%` }} />
                                    ))}
                                </div>
                                <div className="lc-ls-text-lines">
                                    {[90, 70, 55, 80].map((w, i) => <div key={i} className="lc-ls-line" style={{ width: `${w}%` }} />)}
                                </div>
                            </div>
                        </div>
                        <div className="lc-ls-live-badge"><span className="lc-ls-live-dot" /> LIVE</div>
                        {recording && (
                            <div className="lc-max-rec-badge">
                                <span className="lc-rec-pulse" /> REC {fmt(recordSeconds)}
                            </div>
                        )}
                    </div>

                    {/* Action buttons below screen */}
                    <div className="lc-max-actions">
                        {/* Minimize */}
                        <button className="lc-max-action-btn" onClick={onClose}>
                            <Icons.Minimize />
                            <span>Minimize</span>
                        </button>

                        {/* Record / Stop */}
                        {!recording ? (
                            <button className={`lc-max-action-btn record${recordState === 'stopped' ? ' stopped' : ''}`} onClick={startRecording}>
                                <Icons.Record />
                                <span>Record</span>
                            </button>
                        ) : (
                            <button className="lc-max-action-btn record active" onClick={stopRecording}>
                                <Icons.StopRecord />
                                <span>Stop {fmt(recordSeconds)}</span>
                            </button>
                        )}

                        {/* Save / Delete after stop */}
                        {recordState === 'stopped' && (
                            <>
                                <button className="lc-max-action-btn save" onClick={saveRecording}>
                                    <Icons.Save />
                                    <span>Save</span>
                                </button>
                                <button className="lc-max-action-btn danger" onClick={deleteRecording}>
                                    <Icons.Trash />
                                    <span>Delete</span>
                                </button>
                            </>
                        )}

                        {/* Saved / Deleted feedback */}
                        {recordState === 'saved' && <span className="lc-rec-feedback saved">Saved ✓</span>}
                        {recordState === 'deleted' && <span className="lc-rec-feedback deleted">Deleted ✓</span>}

                        {/* Screenshot */}
                        <button className="lc-max-action-btn screenshot" onClick={takeScreenshot}>
                            <Icons.Screenshot />
                            <span>Screenshot</span>
                        </button>
                    </div>
                </div>

                {/* Info row — Today's Tasks */}
                <div className="lc-max-info">
                    <div className="lc-max-info-card">
                        <div className="lc-max-info-title">
                            <Icons.CheckTask />
                            Today's Tasks
                        </div>
                        <div className="lc-max-tasks">
                            {tasks.map((t, i) => (
                                <div key={i} className={`lc-max-task${t.done ? ' done' : ''}`}>
                                    <div className={`lc-max-task-check${t.done ? ' done' : ''}`}>
                                        {t.done && <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>}
                                    </div>
                                    <span>{t.text}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="lc-max-info-card">
                        <div className="lc-max-info-title">
                            <Icons.TrendUp />
                            Task Progress
                        </div>
                        <div className="lc-max-progress-wrap">
                            <div className="lc-max-prog-top">
                                <span>{doneCount}/{tasks.length} completed</span>
                                <span style={{ color: '#b5179e', fontWeight: 700 }}>{Math.round((doneCount / tasks.length) * 100)}%</span>
                            </div>
                            <div className="lc-max-prog-bg">
                                <div className="lc-max-prog-fill" style={{ width: `${(doneCount / tasks.length) * 100}%` }} />
                            </div>
                            <div className="lc-max-status-row">
                                <span className="lc-max-status-indicator" style={{ background: convo.online ? '#e8f5e9' : '#f3f4f6', color: statusColor }}>
                                    Status: {statusText}
                                </span>
                                <span style={{ fontSize: 10.5, color: '#b388b3' }}>Work Time: 6h 32m</span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

/* ══ LIVE SCREEN PREVIEW (in right panel) ══ */
function LiveScreenPreview({ name, convo, onMaximize }) {
    return (
        <div className="lc-live-screen">
            <div className="lc-live-screen-display">
                <div className="lc-ls-topbar" />
                <div className="lc-ls-content">
                    <div className="lc-ls-sidebar">
                        {[true, false, false, true, false, false].map((a, i) => (
                            <div key={i} className={`lc-ls-nav-item ${a ? 'active' : ''}`} />
                        ))}
                    </div>
                    <div className="lc-ls-main">
                        <div className="lc-ls-header-bar" />
                        <div className="lc-ls-chart-area">
                            {[40, 65, 45, 80, 55, 70, 60, 75, 50, 85].map((h, i) => (
                                <div key={i} className="lc-ls-bar" style={{ height: `${h}%` }} />
                            ))}
                        </div>
                        <div className="lc-ls-text-lines">
                            {[90, 70, 55].map((w, i) => <div key={i} className="lc-ls-line" style={{ width: `${w}%` }} />)}
                        </div>
                    </div>
                </div>
                <div className="lc-ls-live-badge"><span className="lc-ls-live-dot" /> LIVE</div>
            </div>
            <div className="lc-ls-actions">
                <button className="lc-ls-action-btn" title="Maximize" onClick={onMaximize}>
                    <Icons.Maximize />
                    <span>Maximize</span>
                </button>
                <button className="lc-ls-action-btn record" title="Record" onClick={onMaximize}>
                    <Icons.Record />
                    <span>Record</span>
                </button>
                <button className="lc-ls-action-btn" title="Screenshot" onClick={onMaximize}>
                    <Icons.Screenshot />
                    <span>Screenshot</span>
                </button>
            </div>
        </div>
    );
}

/* ══ DETAIL PANEL ══ */
function DetailPanel({ convo, onClose }) {
    const ACTIVITY_DATA = [
        { icon: <Icons.Figma />, app: 'Figma', action: 'Working on Dashboard Design', time: '10:30 AM', dur: '45m', cat: 'productive' },
        { icon: <Icons.Activity />, app: 'VS Code', action: 'Code Review', time: '09:45 AM', dur: '30m', cat: 'productive' },
        { icon: <Icons.Briefcase />, app: 'Google Meet', action: 'Team Stand-up', time: '09:15 AM', dur: '15m', cat: 'neutral' },
        { icon: <Icons.TrendUp />, app: 'Chrome', action: 'Research & Browsing', time: '08:55 AM', dur: '20m', cat: 'productive' },
    ];
    return (
        <div className="lc-detail-panel">
            <div className="lc-detail-header">
                <span className="lc-detail-title">Employee Details</span>
                <button className="lc-detail-close" onClick={onClose}><Icons.X /></button>
            </div>
            <div className="lc-detail-profile">
                <Avatar name={convo.name} size={52} online={convo.online} />
                <div className="lc-detail-profile-info">
                    <div className="lc-detail-name">{convo.name}</div>
                    <div className="lc-detail-role">{convo.role} &bull; {convo.dept}</div>
                    <span className={`lc-online-badge ${convo.online ? 'online' : 'offline'}`}>{convo.online ? 'Online' : 'Offline'}</span>
                </div>
            </div>
            <div className="lc-detail-stats">
                <div className="lc-detail-stat"><div className="lc-detail-stat-val">8h 15m</div><div className="lc-detail-stat-label">Work Time</div></div>
                <div className="lc-detail-stat-div" />
                <div className="lc-detail-stat"><div className="lc-detail-stat-val">85%</div><div className="lc-detail-stat-label">Productivity</div></div>
                <div className="lc-detail-stat-div" />
                <div className="lc-detail-stat"><div className="lc-detail-stat-val">12/15</div><div className="lc-detail-stat-label">Tasks Done</div></div>
            </div>
            <div className="lc-detail-section">
                <div className="lc-detail-section-title">Today's Progress</div>
                {[
                    { label: 'Active Time', val: 75, color: '#22c55e', text: '6h 12m' },
                    { label: 'Idle Time', val: 15, color: '#f59e0b', text: '1h 15m' },
                    { label: 'Break Time', val: 10, color: '#9c27b0', text: '48m' },
                ].map((p, i) => (
                    <div key={i} className="lc-detail-progress-row">
                        <div className="lc-detail-prog-top">
                            <span className="lc-detail-prog-label">{p.label}</span>
                            <span className="lc-detail-prog-val" style={{ color: p.color }}>{p.text}</span>
                        </div>
                        <div className="lc-detail-prog-bg">
                            <div className="lc-detail-prog-fill" style={{ width: `${p.val}%`, background: p.color }} />
                        </div>
                    </div>
                ))}
            </div>
            <div className="lc-detail-section">
                <div className="lc-detail-section-title">Recent Activity</div>
                <div className="lc-detail-activity-list">
                    {ACTIVITY_DATA.map((a, i) => (
                        <div key={i} className="lc-detail-activity-item">
                            <div className="lc-detail-act-icon">{a.icon}</div>
                            <div className="lc-detail-act-body">
                                <div className="lc-detail-act-action">{a.action}</div>
                                <div className="lc-detail-act-meta">{a.app} &bull; {a.time} &bull; {a.dur}</div>
                            </div>
                            <span className={`lc-detail-act-badge ${a.cat}`}>{a.cat}</span>
                        </div>
                    ))}
                </div>
            </div>
            <div className="lc-detail-section">
                <div className="lc-detail-section-title">Most Used Applications</div>
                {[
                    { name: 'Figma', pct: 78, time: '3h 25m', color: '#f24e1e' },
                    { name: 'VS Code', pct: 55, time: '2h 20m', color: '#007acc' },
                    { name: 'Chrome', pct: 40, time: '1h 40m', color: '#4285f4' },
                    { name: 'Slack', pct: 22, time: '55m', color: '#4a154b' },
                ].map((app, i) => (
                    <div key={i} className="lc-detail-app-row">
                        <div className="lc-detail-app-dot" style={{ background: app.color }} />
                        <span className="lc-detail-app-name">{app.name}</span>
                        <div className="lc-detail-app-bar-bg">
                            <div className="lc-detail-app-bar-fill" style={{ width: `${app.pct}%`, background: app.color }} />
                        </div>
                        <span className="lc-detail-app-time">{app.time}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

/* ══════════════════════════════════════════ MAIN ══════════════════════════════════════════ */
export default function LiveChat() {
    const [activeConvo, setActiveConvo] = useState(1);
    const [filter, setFilter] = useState('all');
    const [msgInput, setMsgInput] = useState('');
    const [messages, setMessages] = useState(MESSAGES_INIT);
    const [convos, setConvos] = useState(CONVOS);
    const [search, setSearch] = useState('');
    const [chatSearch, setChatSearch] = useState('');    // in-chat message search
    const [chatSearchOpen, setChatSearchOpen] = useState(false);
    const [chatMenuOpen, setChatMenuOpen] = useState(false);
    const [convoMenuId, setConvoMenuId] = useState(null);
    const [infoOpen, setInfoOpen] = useState(false);
    const [attachedFile, setAttachedFile] = useState(null);
    const [showEmoji, setShowEmoji] = useState(false);
    const [maximized, setMaximized] = useState(false);

    /* ── Message actions ── */
    const [selectMode, setSelectMode] = useState(false);
    const [selectedMsgs, setSelectedMsgs] = useState(new Set());
    const [replyTo, setReplyTo] = useState(null);   // msg object
    const [msgMenuId, setMsgMenuId] = useState(null);   // per-message 3-dot menu
    const [forwardModal, setForwardModal] = useState(null);   // msg to forward
    const [toast, setToast] = useState('');

    const chatBodyRef = useRef(null);
    const inputBarRef = useRef(null);

    /* Show toast helper */
    const showToast = (msg) => {
        setToast(msg);
        setTimeout(() => setToast(''), 2400);
    };

    /* Reset selection when switching convo */
    useEffect(() => {
        setSelectMode(false);
        setSelectedMsgs(new Set());
        setReplyTo(null);
        setMsgMenuId(null);
    }, [activeConvo]);

    const convo = convos.find(c => c.id === activeConvo);
    const allMsgs = messages[activeConvo] || [];

    // Filter messages by chat search
    const msgs = chatSearch.trim()
        ? allMsgs.filter(m => m.text.toLowerCase().includes(chatSearch.toLowerCase()))
        : allMsgs;

    const { trigger: triggerFile, input: fileInput } = useFileInput(file => setAttachedFile(file));

    // Auto-scroll to bottom on new messages
    useEffect(() => {
        if (chatBodyRef.current) chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }, [activeConvo, allMsgs.length]);

    /* Send message */
    const sendMsg = () => {
        const text = msgInput.trim();
        if (!text && !attachedFile) return;
        const newMsg = {
            id: Date.now(),
            from: 'me',
            text: text || '',
            time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
            read: false,
            ...(replyTo ? { replyTo: { id: replyTo.id, text: replyTo.text, from: replyTo.from } } : {}),
            ...(attachedFile ? { file: { name: attachedFile.name, type: attachedFile.type || 'File', size: `${(attachedFile.size / 1024).toFixed(1)} KB` } } : {}),
        };
        setMessages(prev => ({ ...prev, [activeConvo]: [...(prev[activeConvo] || []), newMsg] }));
        setConvos(prev => prev.map(c => c.id === activeConvo ? { ...c, preview: (text || attachedFile?.name || '').slice(0, 30) + '...', time: newMsg.time } : c));
        setMsgInput('');
        setAttachedFile(null);
        setShowEmoji(false);
        setReplyTo(null);
    };

    /* Toggle message selection */
    const toggleSelect = (id) => {
        setSelectedMsgs(prev => {
            const next = new Set(prev);
            next.has(id) ? next.delete(id) : next.add(id);
            return next;
        });
    };

    /* Delete selected messages */
    const deleteSelected = () => {
        setMessages(prev => ({
            ...prev,
            [activeConvo]: (prev[activeConvo] || []).filter(m => !selectedMsgs.has(m.id))
        }));
        showToast(`${selectedMsgs.size} message${selectedMsgs.size > 1 ? 's' : ''} deleted`);
        setSelectMode(false);
        setSelectedMsgs(new Set());
    };

    /* Delete single message */
    const deleteSingleMsg = (id) => {
        setMessages(prev => ({
            ...prev,
            [activeConvo]: (prev[activeConvo] || []).filter(m => m.id !== id)
        }));
        showToast('Message deleted');
    };

    /* Forward single message */
    const forwardMsg = (msg, toConvoId) => {
        const newMsg = {
            id: Date.now(),
            from: 'me',
            text: `↪ Forwarded: ${msg.text}`,
            time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
            read: false,
        };
        setMessages(prev => ({ ...prev, [toConvoId]: [...(prev[toConvoId] || []), newMsg] }));
        showToast(`Forwarded to ${convos.find(c => c.id === toConvoId)?.name}`);
        setForwardModal(null);
    };

    /* Insert emoji */
    const insertEmoji = emoji => {
        setMsgInput(p => p + emoji);
        setShowEmoji(false);
    };

    /* Filtered convo list */
    const filtered = convos.filter(c => {
        const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) || c.preview.toLowerCase().includes(search.toLowerCase());
        if (!matchSearch) return false;
        if (filter === 'active') return c.online;
        if (filter === 'closed') return !c.online;
        return true;
    });

    const chatMenuItems = [
        {
            icon: <Icons.CheckCircle />, label: 'Select Messages',
            onClick: () => { setSelectMode(true); setSelectedMsgs(new Set()); }
        },
        { divider: true },
        {
            icon: <Icons.Archive />, label: 'Archive Chat',
            onClick: () => showToast('Chat archived')
        },
        {
            icon: <Icons.Trash />, label: 'Delete Chat',
            danger: true,
            onClick: () => {
                setMessages(prev => ({ ...prev, [activeConvo]: [] }));
                showToast('Chat deleted');
            }
        },
    ];

    const convoMenuItems = id => [
        { icon: <Icons.Eye />, label: 'View Chat', onClick: () => setActiveConvo(id) },
        { icon: <Icons.CheckCircle />, label: 'Mark as Read', onClick: () => setConvos(p => p.map(c => c.id === id ? { ...c, unread: 0 } : c)) },
        { icon: <Icons.Archive />, label: 'Archive', onClick: () => { } },
        { divider: true },
        { icon: <Icons.Trash />, label: 'Delete', danger: true, onClick: () => { } },
    ];

    return (
        <div className="lc-page">
            {fileInput}

            {/* Maximized overlay */}
            {maximized && convo && (
                <MaximizedScreen name={convo.name} convo={convo} onClose={() => setMaximized(false)} />
            )}

            {/* ── Forward Modal ── */}
            {forwardModal && (
                <div className="lc-forward-overlay" onClick={() => setForwardModal(null)}>
                    <div className="lc-forward-modal" onClick={e => e.stopPropagation()}>
                        <div className="lc-forward-header">
                            <span className="lc-forward-title">Forward Message</span>
                            <button className="lc-forward-close" onClick={() => setForwardModal(null)}><Icons.X /></button>
                        </div>
                        <div className="lc-forward-preview">
                            <div className="lc-forward-preview-bar" />
                            <span className="lc-forward-preview-text">
                                {forwardModal.text.slice(0, 100)}{forwardModal.text.length > 100 ? '…' : ''}
                            </span>
                        </div>
                        <div className="lc-forward-label">Select conversation to forward to:</div>
                        <div className="lc-forward-list">
                            {convos.filter(c => c.id !== activeConvo).map(c => (
                                <div key={c.id} className="lc-forward-item" onClick={() => forwardMsg(forwardModal, c.id)}>
                                    <Avatar name={c.name} size={32} online={c.online} />
                                    <div className="lc-forward-item-info">
                                        <span className="lc-forward-item-name">{c.name}</span>
                                        <span className="lc-forward-item-role">{c.role}</span>
                                    </div>
                                    <div className="lc-forward-send-icon"><Icons.Send /></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* ── Toast ── */}
            {toast && (
                <div className="lc-toast">{toast}</div>
            )}



            {/* ── BODY ── */}
            <div className="lc-body">

                {/* ── LEFT: Conversation List ── */}
                <div className="lc-convo-panel">
                    <div className="lc-convo-header">
                        <span className="lc-convo-title">Conversations</span>
                    </div>

                    {/* ── Always-visible search bar (no toggle button) ── */}
                    <div className="lc-convo-search-row">
                        <div className="lc-search-wrap" style={{ flex: 1 }}>
                            <span className="lc-search-icon"><Icons.Search /></span>
                            <input
                                className="lc-search-input"
                                placeholder="Search conversations..."
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                            />
                            {search && (
                                <button className="lc-search-clear" onClick={() => setSearch('')}><Icons.X /></button>
                            )}
                        </div>
                        <button className="lc-filter-icon-btn"><Icons.Filter /></button>
                    </div>

                    {/* Filter tabs */}
                    <div className="lc-filter-tabs">
                        {['all', 'active', 'closed'].map(f => (
                            <button key={f} className={`lc-filter-tab ${filter === f ? 'active' : ''}`} onClick={() => setFilter(f)}>
                                {f === 'all' ? 'All' : f.charAt(0).toUpperCase() + f.slice(1)}
                                {f === 'active' && <span className="lc-tab-dot active" />}
                                {f === 'closed' && <span className="lc-tab-dot closed" />}
                            </button>
                        ))}
                    </div>

                    {/* Convo list */}
                    <div className="lc-convo-list">
                        {filtered.map(c => (
                            <div key={c.id}
                                className={`lc-convo-item ${activeConvo === c.id ? 'active' : ''}`}
                                onClick={() => { setActiveConvo(c.id); setConvos(p => p.map(x => x.id === c.id ? { ...x, unread: 0 } : x)); }}>
                                <Avatar name={c.name} size={38} online={c.online} />
                                <div className="lc-convo-info">
                                    <div className="lc-convo-name-row">
                                        <span className="lc-convo-name">{c.name}</span>
                                        <span className="lc-convo-time">{c.time}</span>
                                    </div>
                                    <div className="lc-convo-preview-row">
                                        <span className="lc-convo-preview">{c.preview}</span>
                                        {c.unread > 0 && <span className="lc-unread-badge">{c.unread}</span>}
                                    </div>
                                </div>
                                <div className="lc-convo-menu-wrap" onClick={e => { e.stopPropagation(); setConvoMenuId(convoMenuId === c.id ? null : c.id); }}>
                                    <button className="lc-convo-more-btn"><Icons.MoreVert /></button>
                                    {convoMenuId === c.id && (
                                        <CtxMenu items={convoMenuItems(c.id)} onClose={() => setConvoMenuId(null)} />
                                    )}
                                </div>
                            </div>
                        ))}
                        <button className="lc-load-more-btn"><Icons.LoadMore /> Load More Conversations</button>
                    </div>
                </div>

                {/* ── CENTER: Chat Window OR Detail Panel ── */}
                {infoOpen ? (
                    <DetailPanel convo={convo} onClose={() => setInfoOpen(false)} />
                ) : (
                    <div className="lc-chat-window">

                        {/* Chat header */}
                        <div className="lc-chat-header">
                            <div className="lc-chat-header-left">
                                <Avatar name={convo.name} size={40} online={convo.online} />
                                <div>
                                    <div className="lc-chat-header-name">
                                        {convo.name}
                                        <span className={`lc-online-badge ${convo.online ? 'online' : 'offline'}`}>
                                            {convo.online ? 'Online' : 'Offline'}
                                        </span>
                                    </div>
                                    <div className="lc-chat-header-sub">{convo.role} &bull; {convo.dept}</div>
                                </div>
                            </div>
                            <div className="lc-chat-header-actions">
                                {/* In-chat search toggle */}
                                <div style={{ position: 'relative' }}>
                                    <button
                                        className={`lc-hdr-btn${chatSearchOpen ? ' active' : ''}`}
                                        title="Search messages"
                                        onClick={() => { setChatSearchOpen(o => !o); if (chatSearchOpen) setChatSearch(''); }}
                                    ><Icons.Search /></button>
                                </div>
                                <button
                                    className={`lc-hdr-btn${infoOpen ? ' active' : ''}`}
                                    title="Employee Details"
                                    onClick={() => setInfoOpen(o => !o)}
                                ><Icons.Info /></button>
                                <div style={{ position: 'relative' }}>
                                    <button className="lc-hdr-btn" onClick={() => setChatMenuOpen(o => !o)}><Icons.MoreVert /></button>
                                    {chatMenuOpen && <CtxMenu items={chatMenuItems} onClose={() => setChatMenuOpen(false)} />}
                                </div>
                            </div>
                        </div>

                        {/* In-chat search bar */}
                        {chatSearchOpen && (
                            <div className="lc-chat-search-bar">
                                <span className="lc-search-icon"><Icons.Search /></span>
                                <input
                                    autoFocus
                                    className="lc-search-input"
                                    placeholder="Search in this conversation..."
                                    value={chatSearch}
                                    onChange={e => setChatSearch(e.target.value)}
                                />
                                {chatSearch && (
                                    <span style={{ fontSize: 11, color: '#b388b3', whiteSpace: 'nowrap', padding: '0 6px' }}>
                                        {msgs.length} found
                                    </span>
                                )}
                                <button className="lc-filter-icon-btn" onClick={() => { setChatSearchOpen(false); setChatSearch(''); }}><Icons.X /></button>
                            </div>
                        )}

                        {/* ── Selection mode toolbar ── */}
                        {selectMode && (
                            <div className="lc-select-toolbar">
                                <span className="lc-select-count">
                                    {selectedMsgs.size} selected
                                </span>
                                <div className="lc-select-actions">
                                    {selectedMsgs.size > 0 && (
                                        <button className="lc-sel-action-btn danger" onClick={deleteSelected}>
                                            <Icons.Trash /> Delete
                                        </button>
                                    )}
                                    <button className="lc-sel-action-btn" onClick={() => { setSelectMode(false); setSelectedMsgs(new Set()); }}>
                                        <Icons.X /> Cancel
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Messages body */}
                        <div className="lc-chat-body" ref={chatBodyRef}>
                            <div className="lc-date-divider"><span>Today, May 20</span></div>
                            {msgs.map(msg => {
                                const isMe = msg.from === 'me';
                                const isSelected = selectedMsgs.has(msg.id);
                                const menuOpen = msgMenuId === msg.id;

                                const msgMenuItems = [
                                    {
                                        icon: <Icons.CheckCircle />, label: 'Select',
                                        onClick: () => { setSelectMode(true); setSelectedMsgs(new Set([msg.id])); }
                                    },
                                    {
                                        icon: <Icons.ArrowRight />, label: 'Reply',
                                        onClick: () => setReplyTo(msg)
                                    },
                                    {
                                        icon: <Icons.Download />, label: 'Forward',
                                        onClick: () => setForwardModal(msg)
                                    },
                                    { divider: true },
                                    {
                                        icon: <Icons.Trash />, label: 'Delete',
                                        danger: true,
                                        onClick: () => deleteSingleMsg(msg.id)
                                    },
                                ];

                                return (
                                    <div
                                        key={msg.id}
                                        className={`lc-msg-row ${isMe ? 'me' : 'them'}${isSelected ? ' selected' : ''}`}
                                        onClick={() => selectMode && toggleSelect(msg.id)}
                                    >
                                        {/* Select checkbox */}
                                        {selectMode && (
                                            <div className={`lc-msg-checkbox${isSelected ? ' checked' : ''}`}
                                                onClick={e => { e.stopPropagation(); toggleSelect(msg.id); }}>
                                                {isSelected && <Icons.CheckCircle />}
                                            </div>
                                        )}

                                        {msg.from === 'them' && !selectMode && <Avatar name={convo.name} size={30} />}

                                        <div className="lc-msg-col" style={{ position: 'relative' }}>
                                            {/* Reply preview */}
                                            {msg.replyTo && (
                                                <div className={`lc-reply-preview${isMe ? ' me' : ' them'}`}>
                                                    <div className="lc-reply-bar" />
                                                    <div className="lc-reply-text">
                                                        <span className="lc-reply-who">{msg.replyTo.from === 'me' ? 'You' : convo.name}</span>
                                                        <span className="lc-reply-msg">{msg.replyTo.text.slice(0, 60)}{msg.replyTo.text.length > 60 ? '…' : ''}</span>
                                                    </div>
                                                </div>
                                            )}

                                            <div className="lc-msg-bubble-row">
                                                <div className={`lc-bubble ${isMe ? 'me' : 'them'}`}>
                                                    {msg.text}
                                                    {msg.file && (
                                                        <div className="lc-file-attach">
                                                            <div className="lc-file-icon"><Icons.Figma /></div>
                                                            <div>
                                                                <div className="lc-file-name">{msg.file.name}</div>
                                                                <div className="lc-file-meta">{msg.file.type} &bull; {msg.file.size}</div>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Per-message 3-dot menu — shows on hover */}
                                                {!selectMode && (
                                                    <div className={`lc-msg-menu-wrap${isMe ? ' me' : ' them'}`}>
                                                        <button
                                                            className="lc-msg-more-btn"
                                                            onClick={e => { e.stopPropagation(); setMsgMenuId(menuOpen ? null : msg.id); }}
                                                        >
                                                            <Icons.MoreVert />
                                                        </button>
                                                        {menuOpen && (
                                                            <CtxMenu
                                                                items={msgMenuItems}
                                                                onClose={() => setMsgMenuId(null)}
                                                            />
                                                        )}
                                                    </div>
                                                )}
                                            </div>

                                            <div className={`lc-msg-meta ${isMe ? 'me' : 'them'}`}>
                                                <span>{msg.time}</span>
                                                {isMe && (
                                                    <span className={`lc-read-tick ${msg.read ? 'read' : ''}`}><Icons.DoubleCheck /></span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Attached file preview */}
                        {attachedFile && (
                            <div className="lc-attach-preview">
                                <div className="lc-attach-preview-info">
                                    <Icons.Attach />
                                    <span className="lc-attach-name">{attachedFile.name}</span>
                                    <span className="lc-attach-size">{(attachedFile.size / 1024).toFixed(1)} KB</span>
                                </div>
                                <button className="lc-attach-remove" onClick={() => setAttachedFile(null)}><Icons.X /></button>
                            </div>
                        )}

                        {/* Reply bar */}
                        {replyTo && (
                            <div className="lc-reply-bar-input">
                                <div className="lc-reply-bar-accent" />
                                <div className="lc-reply-bar-content">
                                    <span className="lc-reply-bar-who">
                                        Replying to {replyTo.from === 'me' ? 'yourself' : convo.name}
                                    </span>
                                    <span className="lc-reply-bar-text">
                                        {replyTo.text.slice(0, 80)}{replyTo.text.length > 80 ? '…' : ''}
                                    </span>
                                </div>
                                <button className="lc-reply-bar-close" onClick={() => setReplyTo(null)}>
                                    <Icons.X />
                                </button>
                            </div>
                        )}

                        {/* Emoji picker */}
                        {showEmoji && (
                            <div className="lc-emoji-picker">
                                {EMOJIS.map((e, i) => (
                                    <button key={i} className="lc-emoji-btn" onClick={() => insertEmoji(e)}>{e}</button>
                                ))}
                            </div>
                        )}

                        {/* ── INPUT BAR — always visible at bottom ── */}
                        <div className="lc-msg-input-bar" ref={inputBarRef}>
                            <button className="lc-input-icon-btn" title="Attach file" onClick={triggerFile}>
                                <Icons.Attach />
                            </button>
                            <input
                                className="lc-msg-input"
                                placeholder="Type your message..."
                                value={msgInput}
                                onChange={e => setMsgInput(e.target.value)}
                                onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMsg(); } }}
                            />
                            <button
                                className={`lc-input-icon-btn emoji-btn${showEmoji ? ' active' : ''}`}
                                title="Emoji"
                                onClick={() => setShowEmoji(o => !o)}
                            >
                                <Icons.Emoji />
                            </button>
                            <button
                                className="lc-send-btn"
                                onClick={sendMsg}
                                disabled={!msgInput.trim() && !attachedFile}
                            >
                                <Icons.Send />
                            </button>
                        </div>
                    </div>
                )}

                {/* ── RIGHT: Summary Panel ── */}
                <div className="lc-right">
                    <div className="lc-right-section">
                        <div className="lc-right-section-hdr">
                            <span className="lc-right-title">Live Screen</span>
                            <span className="lc-ls-badge-pill">LIVE</span>
                        </div>
                        <LiveScreenPreview name={convo.name} convo={convo} onMaximize={() => setMaximized(true)} />
                    </div>

                    <div className="lc-right-section">
                        <div className="lc-right-section-hdr">
                            <span className="lc-right-title">Chat Summary</span>
                            <CustomSelect options={['This Week', 'Today', 'This Month']} />
                        </div>
                        <div className="lc-donut-row">
                            <DonutChart total="248" segs={[{ pct: 12.9, color: '#22c55e' }, { pct: 87.1, color: '#2563eb' }]} />
                            <div className="lc-donut-legend">
                                {[{ color: '#22c55e', label: 'Active', sub: '32 (12.9%)' }, { color: '#2563eb', label: 'Closed', sub: '216 (87.1%)' }].map((l, i) => (
                                    <div key={i} className="lc-legend-item">
                                        <span className="lc-legend-dot" style={{ background: l.color }} />
                                        <div>
                                            <div className="lc-legend-label">{l.label}</div>
                                            <div className="lc-legend-sub">{l.sub}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="lc-right-section">
                        <div className="lc-right-section-hdr">
                            <span className="lc-right-title">Top Chatters</span>
                            <CustomSelect options={['This Week', 'Today', 'This Month']} />
                        </div>
                        {[
                            { name: 'John Smith', msgs: 48, pct: 88 },
                            { name: 'Sarah Johnson', msgs: 36, pct: 70 },
                            { name: 'Michael Brown', msgs: 32, pct: 62 },
                            { name: 'Emily Davis', msgs: 28, pct: 54 },
                            { name: 'David Wilson', msgs: 24, pct: 46 },
                        ].map((u, i) => (
                            <div className="lc-chatter-row" key={i}>
                                <span className="lc-chatter-rank">{i + 1}</span>
                                <Avatar name={u.name} size={26} />
                                <div className="lc-chatter-info">
                                    <div className="lc-chatter-name-row">
                                        <span className="lc-chatter-name">{u.name}</span>
                                        <span className="lc-chatter-msgs">{u.msgs}</span>
                                    </div>
                                    <div className="lc-bar-bg"><div className="lc-bar-fill" style={{ width: `${u.pct}%` }} /></div>
                                </div>
                            </div>
                        ))}
                        <button className="lc-view-all-btn">View Full Report <Icons.ArrowRight /></button>
                    </div>
                </div>
            </div>
        </div>
    );
}