import React, { useState, useRef, useEffect, useCallback } from 'react';
import ReactDOM from 'react-dom';
import './Attendance.css';

/* ══ ICONS ══ */
const Icons = {
    Home: () => <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>,
    ChevronRight: () => <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>,
    ChevronLeft: () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>,
    ChevronDown: () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>,
    Calendar: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>,
    Filter: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" /></svg>,
    Download: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>,
    Search: () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>,
    Table: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><line x1="3" y1="9" x2="21" y2="9" /><line x1="3" y1="15" x2="21" y2="15" /><line x1="9" y1="3" x2="9" y2="21" /><line x1="15" y1="3" x2="15" y2="21" /></svg>,
    CalendarView: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>,
    Eye: () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>,
    MoreVertical: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="5" r="1" /><circle cx="12" cy="12" r="1" /><circle cx="12" cy="19" r="1" /></svg>,
    Users: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>,
    CheckCircle: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>,
    UserX: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="8.5" cy="7" r="4" /><line x1="18" y1="8" x2="23" y2="13" /><line x1="23" y1="8" x2="18" y2="13" /></svg>,
    Briefcase: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg>,
    ArrowRight: () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>,
    Gift: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 12 20 22 4 22 4 12" /><rect x="2" y="7" width="20" height="5" /><line x1="12" y1="22" x2="12" y2="7" /><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" /><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" /></svg>,
    Edit: () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>,
    Clock: () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>,
    CheckSquare: () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 11 12 14 22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" /></svg>,
    Trash: () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" /></svg>,
    Check: () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>,
    X: () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>,
    Sun: () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" /></svg>,
};

/* ══ DATA ══ */
const ATTENDANCE = [
    { name: 'John Smith', role: 'UI/UX Designer', dept: 'UI/UX Design', status: 'Present', checkIn: '09:04 AM', checkOut: '06:15 PM', hours: '9h 11m', att: 'Present' },
    { name: 'Sarah Johnson', role: 'Developer', dept: 'Development', status: 'Present', checkIn: '09:10 AM', checkOut: '06:05 PM', hours: '8h 55m', att: 'Present' },
    { name: 'Michael Brown', role: 'Designer', dept: 'Design', status: 'Absent', checkIn: '-', checkOut: '-', hours: '0h 00m', att: 'Absent' },
    { name: 'Emily Davis', role: 'Content Writer', dept: 'Content Writing', status: 'Present', checkIn: '08:58 AM', checkOut: '05:48 PM', hours: '8h 50m', att: 'Present' },
    { name: 'David Wilson', role: 'Marketing', dept: 'Marketing', status: 'Present', checkIn: '09:15 AM', checkOut: '06:20 PM', hours: '9h 05m', att: 'Present' },
    { name: 'James Anderson', role: 'Support', dept: 'Support', status: 'On Leave', checkIn: '-', checkOut: '-', hours: '0h 00m', att: 'On Leave' },
    { name: 'Jessica Martinez', role: 'HR', dept: 'HR', status: 'Present', checkIn: '09:07 AM', checkOut: '06:00 PM', hours: '8h 53m', att: 'Present' },
    { name: 'Daniel Thomas', role: 'Finance', dept: 'Finance', status: 'Absent', checkIn: '-', checkOut: '-', hours: '0h 00m', att: 'Absent' },
    { name: 'Robert Taylor', role: 'Developer', dept: 'Development', status: 'Present', checkIn: '09:02 AM', checkOut: '06:10 PM', hours: '9h 08m', att: 'Present' },
    { name: 'Olivia Harris', role: 'UI/UX Designer', dept: 'UI/UX Design', status: 'On Leave', checkIn: '-', checkOut: '-', hours: '0h 00m', att: 'On Leave' },
];

const DEPT_ATT = [
    { dept: 'UI/UX Design', present: 22, total: 25 },
    { dept: 'Development', present: 28, total: 32 },
    { dept: 'Design', present: 15, total: 18 },
    { dept: 'Marketing', present: 10, total: 14 },
    { dept: 'Content Writing', present: 8, total: 10 },
    { dept: 'Support', present: 6, total: 8 },
    { dept: 'Finance', present: 5, total: 7 },
    { dept: 'HR', present: 4, total: 6 },
];

/* Sundays are always holiday. Additional holidays */
const HOLIDAYS = {
    /* May 2024 */
    '2024-4-1': 'Maharashtra Day',
    '2024-4-23': 'Buddha Purnima',
};

/* Half-days */
const HALFDAYS = {
    '2024-4-10': true,
    '2024-4-24': true,
};

const CAL_DATA = {
    1: 'present', 2: 'present', 3: 'absent', 4: 'present', 5: 'present',
    6: 'leave', 7: 'present', 8: 'present', 9: 'present', 10: 'absent',
    11: 'present', 12: 'present', 13: 'present', 14: 'present', 15: 'present',
    16: 'absent', 17: 'present', 18: 'present', 19: 'present', 20: 'present',
    21: 'present', 22: 'present', 23: 'absent', 24: 'present', 25: 'leave',
    26: 'present', 27: 'present', 28: 'present', 29: 'present', 30: 'present',
};

const DAY_EMPLOYEES = {
    1: [
        { name: 'John Smith', role: 'UI/UX Designer', status: 'present' },
        { name: 'Sarah Johnson', role: 'Developer', status: 'present' },
        { name: 'Emily Davis', role: 'Content Writer', status: 'present' },
        { name: 'Michael Brown', role: 'Designer', status: 'absent' },
        { name: 'David Wilson', role: 'Marketing', status: 'present' },
    ],
    3: [
        { name: 'John Smith', role: 'UI/UX Designer', status: 'present' },
        { name: 'Michael Brown', role: 'Designer', status: 'absent' },
        { name: 'Daniel Thomas', role: 'Finance', status: 'absent' },
        { name: 'Emily Davis', role: 'Content Writer', status: 'present' },
    ],
};

const DEFAULT_DAY_EMP = [
    { name: 'John Smith', role: 'UI/UX Designer', status: 'present' },
    { name: 'Sarah Johnson', role: 'Developer', status: 'present' },
    { name: 'Emily Davis', role: 'Content Writer', status: 'present' },
    { name: 'David Wilson', role: 'Marketing', status: 'present' },
    { name: 'Jessica Martinez', role: 'HR', status: 'present' },
    { name: 'Robert Taylor', role: 'Developer', status: 'present' },
    { name: 'Michael Brown', role: 'Designer', status: 'absent' },
    { name: 'Daniel Thomas', role: 'Finance', status: 'absent' },
    { name: 'James Anderson', role: 'Support', status: 'leave' },
    { name: 'Olivia Harris', role: 'UI/UX Designer', status: 'leave' },
];

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const AV_COLORS = ['#9c27b0', '#b5179e', '#43a047', '#e65100', '#1565c0', '#c62828', '#0288d1', '#558b2f'];
const avColor = n => AV_COLORS[n.charCodeAt(0) % AV_COLORS.length];
const initials = n => n.split(' ').map(w => w[0]).join('');

/* ══ DATE RANGE PICKER ══ */
const DATE_RANGES = [
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'last7', label: 'Last 7 Days' },
    { value: 'last30', label: 'Last 30 Days' },
    { value: 'custom', label: 'Custom Range' },
];

function DateRangePicker({ value, onChange }) {
    const [open, setOpen] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const h = e => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
        document.addEventListener('mousedown', h);
        return () => document.removeEventListener('mousedown', h);
    }, []);

    const selected = DATE_RANGES.find(r => r.value === value) || DATE_RANGES[0];

    return (
        <div className="date-picker-wrap" ref={ref}>
            <button className="att-date-btn" onClick={() => setOpen(o => !o)}>
                <Icons.Calendar />
                <span>{selected.label}</span>
                <span className={`cust-select-arrow ${open ? 'open' : ''}`} style={{ marginLeft: 2 }}><Icons.ChevronDown /></span>
            </button>
            {open && (
                <div className="date-picker-dropdown">
                    {DATE_RANGES.map(r => (
                        <div key={r.value}
                            className={`date-picker-item ${r.value === value ? 'selected' : ''}`}
                            onClick={() => { onChange(r.value); setOpen(false); }}>
                            <span>{r.label}</span>
                            {r.value === value && <span className="cust-dropdown-check"><Icons.Check /></span>}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

/* ══ PORTAL-BASED CUSTOM DROPDOWN ══ */
function CustomSelect({ options, value, onChange, placeholder }) {
    const [open, setOpen] = useState(false);
    const [rect, setRect] = useState(null);
    const btnRef = useRef(null);
    const dropRef = useRef(null);

    useEffect(() => {
        if (!open) return;
        const handler = e => {
            if (!btnRef.current?.contains(e.target) && !dropRef.current?.contains(e.target)) setOpen(false);
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, [open]);

    useEffect(() => {
        if (!open || !btnRef.current) return;
        const update = () => {
            const r = btnRef.current.getBoundingClientRect();
            /* width = fit content — max of button width or longest label, capped at 200px */
            const longestLabel = Math.max(...options.map(o => o.label.length));
            const dropW = Math.min(Math.max(r.width, longestLabel * 7 + 40), 200);
            setRect({ top: r.bottom + 4, left: r.left, width: dropW });
        };
        update();
        window.addEventListener('scroll', update, true);
        window.addEventListener('resize', update);
        return () => { window.removeEventListener('scroll', update, true); window.removeEventListener('resize', update); };
    }, [open, options]);

    const selected = options.find(o => o.value === value);

    return (
        <div className="cust-select-wrap" ref={btnRef}>
            <button className="cust-select-btn" onClick={() => setOpen(o => !o)} type="button">
                <span className="cust-select-label">{selected ? selected.label : placeholder}</span>
                <span className={`cust-select-arrow ${open ? 'open' : ''}`}><Icons.ChevronDown /></span>
            </button>
            {open && rect && ReactDOM.createPortal(
                <div ref={dropRef} className="cust-dropdown"
                    style={{ position: 'fixed', top: rect.top, left: rect.left, width: rect.width, zIndex: 99999 }}>
                    {options.map(opt => (
                        <div key={opt.value}
                            className={`cust-dropdown-item ${opt.value === value ? 'selected' : ''}`}
                            onMouseDown={e => { e.preventDefault(); onChange(opt.value); setOpen(false); }}>
                            <span>{opt.label}</span>
                            {opt.value === value && <span className="cust-dropdown-check"><Icons.Check /></span>}
                        </div>
                    ))}
                </div>,
                document.body
            )}
        </div>
    );
}

/* ══ SMART CONTEXT MENU — opens up or down based on space ══ */
function ContextMenu({ items, anchorRect, onClose }) {
    const ref = useRef(null);
    const [pos, setPos] = useState(null);

    useEffect(() => {
        const h = e => { if (ref.current && !ref.current.contains(e.target)) onClose(); };
        document.addEventListener('mousedown', h);
        return () => document.removeEventListener('mousedown', h);
    }, [onClose]);

    useEffect(() => {
        if (!ref.current || !anchorRect) return;
        const menuH = ref.current.offsetHeight || 220;
        const menuW = 176;
        const spaceBelow = window.innerHeight - anchorRect.bottom - 6;
        const spaceAbove = anchorRect.top - 6;

        let top, left;
        /* enough space below → open down; otherwise open up */
        if (spaceBelow >= menuH || spaceBelow >= spaceAbove) {
            top = anchorRect.bottom + 4;
        } else {
            top = anchorRect.top - menuH - 4;
        }
        left = anchorRect.right - menuW;
        if (left < 6) left = anchorRect.left;

        setPos({ top, left, width: menuW });
    }, [anchorRect]);

    const menu = (
        <div ref={ref} className="ctx-menu"
            style={pos ? { position: 'fixed', top: pos.top, left: pos.left, width: pos.width, zIndex: 99999 } : { visibility: 'hidden', position: 'fixed', top: 0, left: 0, zIndex: 99999 }}>
            {items.map((item, i) =>
                item.divider
                    ? <div key={i} className="ctx-divider" />
                    : <button key={i} className={`ctx-item ${item.danger ? 'danger' : ''}`}
                        onClick={() => { item.onClick?.(); onClose(); }}>
                        <span className="ctx-icon">{item.icon}</span>
                        <span>{item.label}</span>
                    </button>
            )}
        </div>
    );

    return ReactDOM.createPortal(menu, document.body);
}

/* ══ THREE-DOT MENU ══ */
function AttMoreMenu({ emp }) {
    const [open, setOpen] = useState(false);
    const [btnRect, setBtnRect] = useState(null);
    const btnRef = useRef(null);

    const handleOpen = () => {
        if (!open && btnRef.current) {
            setBtnRect(btnRef.current.getBoundingClientRect());
        }
        setOpen(o => !o);
    };

    const items = [
        { icon: <Icons.Eye />, label: 'View Profile', onClick: () => { } },
        { icon: <Icons.Edit />, label: 'Edit Record', onClick: () => { } },
        { icon: <Icons.Clock />, label: 'Adjust Time', onClick: () => { } },
        { divider: true },
        { icon: <Icons.CheckSquare />, label: 'Mark Present', onClick: () => { } },
        { icon: <Icons.Trash />, label: 'Remove Record', danger: true, onClick: () => { } },
    ];

    return (
        <div className="more-menu-wrap" ref={btnRef}>
            <button className="att-action-btn" onClick={handleOpen}><Icons.MoreVertical /></button>
            {open && <ContextMenu items={items} anchorRect={btnRect} onClose={() => setOpen(false)} />}
        </div>
    );
}

/* ══ AVATAR ══ */
function Avatar({ name, size = 30 }) {
    return (
        <div style={{ width: size, height: size, borderRadius: '50%', background: avColor(name), color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: size * 0.36, flexShrink: 0, fontFamily: 'DM Sans, sans-serif' }}>
            {initials(name)}
        </div>
    );
}

/* ══ SPARKLINE ══ */
function Sparkline({ points, color }) {
    const max = Math.max(...points), min = Math.min(...points), w = 70, h = 30;
    const xs = points.map((_, i) => (i / (points.length - 1)) * w);
    const ys = points.map(p => h - ((p - min) / (max - min || 1)) * (h - 4) - 2);
    const d = xs.map((x, i) => `${i === 0 ? 'M' : 'L'}${x},${ys[i]}`).join(' ');
    return <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}><path d={d} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

/* ══ DONUT CHART ══ */
function DonutChart({ segments, total, label }) {
    const r = 54, cx = 65, cy = 65, stroke = 14, circ = 2 * Math.PI * r, gapArc = (4 / 360) * circ;
    let cumulative = 0;
    return (
        <svg width="130" height="130" viewBox="0 0 130 130">
            {segments.map((s, i) => {
                const arc = Math.max((s.pct / 100) * circ - gapArc, 0);
                const rotation = -90 + (cumulative / 100) * 360;
                cumulative += s.pct;
                return <circle key={i} cx={cx} cy={cy} r={r} fill="none" stroke={s.color} strokeWidth={stroke} strokeDasharray={`${arc} ${circ}`} strokeLinecap="round" style={{ transform: `rotate(${rotation}deg)`, transformOrigin: `${cx}px ${cy}px` }} />;
            })}
            <text x={cx} y={cy - 6} textAnchor="middle" fontSize="22" fontWeight="800" fill="#2d1a3e" fontFamily="DM Sans">{total}</text>
            <text x={cx} y={cy + 12} textAnchor="middle" fontSize="11" fill="#b388b3" fontFamily="DM Sans">{label}</text>
        </svg>
    );
}

const statusStyle = s =>
    s === 'Present' || s === 'present' ? { bg: '#e8f5e9', color: '#2e7d32' } :
        s === 'Absent' || s === 'absent' ? { bg: '#fce4ec', color: '#c62828' } :
            s === 'halfday' ? { bg: '#e3f2fd', color: '#1565c0' } :
                s === 'holiday' ? { bg: '#f3e5f5', color: '#7b1fa2' } :
                    { bg: '#fff3e0', color: '#e65100' };

/* ══ CALENDAR VIEW ══ */
function CalendarView({ statusFilter }) {
    const [selectedDay, setSelectedDay] = useState(20);
    const [calMonth, setCalMonth] = useState({ year: 2024, month: 4 });
    const [dayStatusFilter, setDayStatusFilter] = useState('all');

    const { year, month } = calMonth;
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const cells = [];
    for (let i = 0; i < firstDay; i++) cells.push(null);
    for (let d = 1; d <= daysInMonth; d++) cells.push(d);

    /* Determine day type */
    const getDayType = (d) => {
        if (!d) return null;
        const date = new Date(year, month, d);
        const isSunday = date.getDay() === 0;
        const holidayKey = `${year}-${month}-${d}`;
        const isHoliday = isSunday || !!HOLIDAYS[holidayKey];
        const isHalfday = !!HALFDAYS[holidayKey];
        return { isSunday, isHoliday, isHalfday, holidayName: HOLIDAYS[holidayKey] };
    };

    const dayEmps = DAY_EMPLOYEES[selectedDay] || DEFAULT_DAY_EMP;
    const filteredDayEmps = dayStatusFilter === 'all' ? dayEmps
        : dayEmps.filter(e => {
            if (dayStatusFilter === 'present') return e.status === 'present';
            if (dayStatusFilter === 'absent') return e.status === 'absent';
            if (dayStatusFilter === 'leave') return e.status === 'leave';
            return true;
        });

    const presentCount = dayEmps.filter(e => e.status === 'present').length;
    const absentCount = dayEmps.filter(e => e.status === 'absent').length;
    const leaveCount = dayEmps.filter(e => e.status === 'leave').length;

    const selectedDayType = getDayType(selectedDay);

    return (
        <div className="att-cal-split">
            {/* LEFT: calendar */}
            <div className="att-cal-left">
                <div className="att-cal-nav-row">
                    <button className="att-cal-nav-btn" onClick={() => setCalMonth(m => { const d = new Date(m.year, m.month - 1, 1); return { year: d.getFullYear(), month: d.getMonth() }; })}>
                        <Icons.ChevronLeft />
                    </button>
                    <span className="att-cal-month-label">{MONTHS[month]} {year}</span>
                    <button className="att-cal-nav-btn" onClick={() => setCalMonth(m => { const d = new Date(m.year, m.month + 1, 1); return { year: d.getFullYear(), month: d.getMonth() }; })}>
                        <Icons.ChevronRight />
                    </button>
                </div>

                <div className="att-cal-grid">
                    {DAY_NAMES.map(d => (
                        <div key={d} className={`att-cal-day-name ${d === 'Sun' ? 'sunday-header' : ''}`}>{d}</div>
                    ))}
                    {cells.map((d, i) => {
                        if (!d) return <div key={`e${i}`} className="att-cal-cell empty" />;
                        const dt = getDayType(d);
                        const isSelected = d === selectedDay;
                        const isToday = d === 20 && month === 4 && year === 2024;

                        let cellClass = 'att-cal-cell';
                        if (isSelected) {
                            cellClass += ' selected';
                        } else if (dt.isHoliday) {
                            cellClass += ' holiday';
                        } else if (dt.isHalfday) {
                            cellClass += ' halfday';
                        } else if (isToday) {
                            cellClass += ' today';
                        } else if (CAL_DATA[d]) {
                            cellClass += ` ${CAL_DATA[d]}`;
                        }

                        return (
                            <div key={d} className={cellClass} onClick={() => setSelectedDay(d)}>
                                <span>{d}</span>
                                {dt.isHalfday && !isSelected && <span className="cal-halfday-dot" />}
                                {dt.isHoliday && !isSelected && <span className="cal-holiday-dot" />}
                            </div>
                        );
                    })}
                </div>

                {/* Legend */}
                <div className="att-cal-legend">
                    {[
                        ['#e8f5e9', '#2e7d32', 'Present'],
                        ['#fce4ec', '#c62828', 'Absent'],
                        ['#fff3e0', '#e65100', 'On Leave'],
                        ['#f3e5f5', '#7b1fa2', 'Holiday'],
                        ['#e3f2fd', '#1565c0', 'Half Day'],
                    ].map(([bg, c, l]) => (
                        <div key={l} className="att-cal-legend-item">
                            <span style={{ width: 10, height: 10, borderRadius: 3, background: bg, border: `1px solid ${c}44`, display: 'inline-block' }} />
                            <span style={{ fontSize: 10.5, color: '#5c4a6e' }}>{l}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* RIGHT: employees for selected day */}
            <div className="att-cal-right">
                <div className="att-cal-right-header">
                    <div>
                        <div className="att-cal-right-title">
                            {MONTHS[month]} {selectedDay}, {year}
                            {selectedDayType?.isHoliday && (
                                <span className="cal-day-holiday-tag">
                                    <Icons.Sun /> {selectedDayType.isSunday ? 'Sunday Holiday' : selectedDayType.holidayName}
                                </span>
                            )}
                            {selectedDayType?.isHalfday && !selectedDayType?.isHoliday && (
                                <span className="cal-day-halfday-tag">Half Day</span>
                            )}
                        </div>
                        <div className="att-cal-right-sub">
                            <span style={{ color: '#2e7d32', fontWeight: 600 }}>{presentCount} Present</span>
                            {' · '}
                            <span style={{ color: '#c62828', fontWeight: 600 }}>{absentCount} Absent</span>
                            {' · '}
                            <span style={{ color: '#e65100', fontWeight: 600 }}>{leaveCount} On Leave</span>
                        </div>
                    </div>
                </div>

                <div className="att-cal-day-filters">
                    {[
                        { id: 'all', label: 'All' },
                        { id: 'present', label: 'Present' },
                        { id: 'absent', label: 'Absent' },
                        { id: 'leave', label: 'On Leave' },
                    ].map(f => (
                        <button key={f.id}
                            className={`att-status-filter-btn ${dayStatusFilter === f.id ? 'active' : ''} ${f.id !== 'all' ? f.id : ''}`}
                            onClick={() => setDayStatusFilter(f.id)}>
                            {f.label}
                        </button>
                    ))}
                </div>

                <div className="att-cal-emp-list">
                    {filteredDayEmps.length === 0 && (
                        <div className="att-cal-empty">No employees match this filter.</div>
                    )}
                    {filteredDayEmps.map((e, i) => {
                        const sc = statusStyle(e.status);
                        return (
                            <div key={i} className="att-cal-emp-row">
                                <Avatar name={e.name} size={32} />
                                <div className="att-cal-emp-info">
                                    <div className="att-cal-emp-name">{e.name}</div>
                                    <div className="att-cal-emp-role">{e.role}</div>
                                </div>
                                <span className="att-badge" style={{ background: sc.bg, color: sc.color }}>
                                    {e.status === 'present' ? 'Present' : e.status === 'absent' ? 'Absent' : 'On Leave'}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

/* ══ MAIN ══ */
export default function Attendance() {
    const [viewMode, setViewMode] = useState('table');
    const [empFilter, setEmpFilter] = useState('all');
    const [deptFilter, setDeptFilter] = useState('all');
    const [statusFilter, setStatusFilter] = useState('all');
    const [search, setSearch] = useState('');
    const [showFilters, setShowFilters] = useState(false);
    const [page, setPage] = useState(1);
    const [dateRange, setDateRange] = useState('today');

    const filteredRows = ATTENDANCE.filter(a => {
        const matchSearch = search === '' || a.name.toLowerCase().includes(search.toLowerCase()) || a.dept.toLowerCase().includes(search.toLowerCase());
        const matchEmp = empFilter === 'all' || a.name.toLowerCase().replace(' ', '') === empFilter;
        const matchDept = deptFilter === 'all' || a.dept.toLowerCase().replace(/[\/ ]/g, '') === deptFilter.toLowerCase().replace(/[\/ ]/g, '');
        const matchStatus = statusFilter === 'all'
            || (statusFilter === 'present' && a.status === 'Present')
            || (statusFilter === 'absent' && a.status === 'Absent')
            || (statusFilter === 'onleave' && a.status === 'On Leave')
            || (statusFilter === 'late' && a.status === 'Late');
        return matchSearch && matchEmp && matchDept && matchStatus;
    });

    const DEPT_OPTIONS = [
        { value: 'all', label: 'All Departments' },
        { value: 'ui/ux design', label: 'UI/UX Design' },
        { value: 'development', label: 'Development' },
        { value: 'marketing', label: 'Marketing' },
        { value: 'content writing', label: 'Content Writing' },
        { value: 'hr', label: 'HR' },
        { value: 'finance', label: 'Finance' },
        { value: 'support', label: 'Support' },
    ];

    const EMP_OPTIONS = [
        { value: 'all', label: 'All Employees' },
        ...ATTENDANCE.map(a => ({ value: a.name.toLowerCase().replace(' ', ''), label: a.name }))
    ];

    const STATUS_OPTIONS = [
        { value: 'all', label: 'All Status' },
        { value: 'present', label: 'Present' },
        { value: 'absent', label: 'Absent' },
        { value: 'onleave', label: 'On Leave' },
        { value: 'late', label: 'Late' },
    ];

    const clearFilters = () => { setEmpFilter('all'); setDeptFilter('all'); setStatusFilter('all'); setSearch(''); };
    const hasFilters = empFilter !== 'all' || deptFilter !== 'all' || statusFilter !== 'all' || search !== '';

    return (
        <div className="att-page">

            {/* ── TOOLBAR ── */}
            <div className="att-toolbar">
                <DateRangePicker value={dateRange} onChange={setDateRange} />

                <CustomSelect placeholder="All Employees" value={empFilter} onChange={setEmpFilter} options={EMP_OPTIONS} />
                <CustomSelect placeholder="All Departments" value={deptFilter} onChange={setDeptFilter} options={DEPT_OPTIONS} />
                <CustomSelect placeholder="All Status" value={statusFilter} onChange={setStatusFilter} options={STATUS_OPTIONS} />

                <button className={`att-filter-btn ${showFilters ? 'active' : ''}`} onClick={() => setShowFilters(v => !v)}>
                    <Icons.Filter /> Filters {hasFilters && <span className="att-filter-active-dot" />}
                </button>

                {hasFilters && (
                    <button className="att-clear-btn" onClick={clearFilters}>
                        <Icons.X /> Clear
                    </button>
                )}

                <button className="att-export-btn"><Icons.Download /> Export</button>
            </div>

            {/* ── FILTER PANEL ── */}
            {showFilters && (
                <div className="att-filter-panel">
                    <div className="att-filter-panel-inner">
                        <span className="att-filter-panel-label">Active Filters:</span>
                        {empFilter !== 'all' && <span className="att-filter-chip">Employee: {EMP_OPTIONS.find(o => o.value === empFilter)?.label}<button onClick={() => setEmpFilter('all')}><Icons.X /></button></span>}
                        {deptFilter !== 'all' && <span className="att-filter-chip">Dept: {DEPT_OPTIONS.find(o => o.value === deptFilter)?.label}<button onClick={() => setDeptFilter('all')}><Icons.X /></button></span>}
                        {statusFilter !== 'all' && <span className="att-filter-chip">Status: {STATUS_OPTIONS.find(o => o.value === statusFilter)?.label}<button onClick={() => setStatusFilter('all')}><Icons.X /></button></span>}
                        {search !== '' && <span className="att-filter-chip">Search: "{search}"<button onClick={() => setSearch('')}><Icons.X /></button></span>}
                        <button className="att-filter-clear-all" onClick={clearFilters}>Clear All</button>
                    </div>
                </div>
            )}

            {/* ── STAT CARDS ── */}
            <div className="att-stat-cards">
                {[
                    { Icon: Icons.Users, cls: 'purple', label: 'Total Employees', value: '128', sub: '+12 this month', subCls: 'pos', pts: [80, 90, 85, 100, 95, 110, 105, 115, 120, 128], color: '#9c27b0' },
                    { Icon: Icons.CheckCircle, cls: 'green', label: 'Present', value: '98', sub: '76.6% of total', subCls: 'pos', pts: [60, 70, 65, 75, 70, 80, 78, 85, 90, 98], color: '#43a047' },
                    { Icon: Icons.UserX, cls: 'red', label: 'Absent', value: '18', sub: '14.1% of total', subCls: 'neg', pts: [10, 15, 12, 18, 14, 16, 15, 17, 16, 18], color: '#c62828' },
                    { Icon: Icons.Briefcase, cls: 'orange', label: 'On Leave', value: '12', sub: '9.4% of total', subCls: 'warn', pts: [6, 8, 7, 9, 8, 10, 9, 11, 10, 12], color: '#fb8c00' },
                ].map((c, i) => (
                    <div className="att-stat-card" key={i}>
                        <div className={`att-stat-icon ${c.cls}`}><c.Icon /></div>
                        <div className="att-stat-body">
                            <div className="att-stat-label">{c.label}</div>
                            <div className="att-stat-value">{c.value}</div>
                            <div className={`att-stat-sub ${c.subCls}`}>{c.sub}</div>
                        </div>
                        <Sparkline points={c.pts} color={c.color} />
                    </div>
                ))}
            </div>

            {/* ── CONTENT ── */}
            <div className="att-content">
                <div className="att-main">

                    <div className="att-table-header">
                        <div className="att-table-title">
                            Attendance Overview
                            {hasFilters && <span className="att-result-count">{filteredRows.length} results</span>}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                            {viewMode === 'table' && (
                                <div className="att-search-wrap">
                                    <span className="att-search-icon"><Icons.Search /></span>
                                    <input className="att-search-input" placeholder="Search employee..." value={search} onChange={e => setSearch(e.target.value)} />
                                </div>
                            )}
                            <div className="att-status-filter-row">
                                {[
                                    { id: 'all', label: 'All' },
                                    { id: 'present', label: 'Present' },
                                    { id: 'absent', label: 'Absent' },
                                    { id: 'onleave', label: 'On Leave' },
                                ].map(f => (
                                    <button key={f.id}
                                        className={`att-status-filter-btn ${statusFilter === f.id ? 'active' : ''} ${f.id !== 'all' ? f.id : ''}`}
                                        onClick={() => setStatusFilter(f.id)}>
                                        {f.label}
                                    </button>
                                ))}
                            </div>
                            <div className="att-view-group">
                                <button className={`att-view-btn ${viewMode === 'table' ? 'active' : ''}`} onClick={() => setViewMode('table')}><Icons.Table /> Table View</button>
                                <button className={`att-view-btn ${viewMode === 'calendar' ? 'active' : ''}`} onClick={() => setViewMode('calendar')}><Icons.CalendarView /> Calendar View</button>
                            </div>
                        </div>
                    </div>

                    {/* ── TABLE VIEW ── */}
                    {viewMode === 'table' && (
                        <div className="att-table-card">
                            <table className="att-table">
                                <thead>
                                    <tr>
                                        <th>Employee</th><th>Department</th><th>Status</th>
                                        <th>Check In</th><th>Check Out</th><th>Work Hours</th><th>Attendance</th><th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredRows.length === 0 ? (
                                        <tr><td colSpan={8} style={{ textAlign: 'center', padding: '32px', color: '#b388b3', fontSize: 13 }}>No employees match the selected filters.</td></tr>
                                    ) : filteredRows.map((a, i) => {
                                        const sc = statusStyle(a.status);
                                        const asc = statusStyle(a.att);
                                        return (
                                            <tr key={i}>
                                                <td>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                                        <Avatar name={a.name} size={30} />
                                                        <div>
                                                            <div className="att-emp-name">{a.name}</div>
                                                            <div className="att-emp-role">{a.role}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="att-td-text">{a.dept}</td>
                                                <td><span className="att-badge" style={{ background: sc.bg, color: sc.color }}>{a.status}</span></td>
                                                <td className="att-td-text">{a.checkIn}</td>
                                                <td className="att-td-text">{a.checkOut}</td>
                                                <td className="att-td-text">{a.hours}</td>
                                                <td><span className="att-badge" style={{ background: asc.bg, color: asc.color }}>{a.att}</span></td>
                                                <td>
                                                    <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
                                                        <button className="att-action-btn"><Icons.Eye /></button>
                                                        <AttMoreMenu emp={a} />
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                            <div className="att-pagination">
                                <span className="att-page-info">Showing {filteredRows.length} of 128 employees</span>
                                <div className="att-page-btns">
                                    <button className="att-page-btn" onClick={() => setPage(p => Math.max(1, p - 1))}><Icons.ChevronLeft /></button>
                                    {[1, 2, 3, '...', 13].map((p, i) => (
                                        <button key={i} className={`att-page-btn ${p === page ? 'active' : ''}`}
                                            onClick={() => typeof p === 'number' && setPage(p)}>{p}</button>
                                    ))}
                                    <button className="att-page-btn" onClick={() => setPage(p => Math.min(13, p + 1))}><Icons.ChevronRight /></button>
                                </div>
                                <select className="att-per-page-select">
                                    <option>Show 10 per page</option>
                                    <option>Show 25 per page</option>
                                    <option>Show 50 per page</option>
                                </select>
                            </div>
                        </div>
                    )}

                    {/* ── CALENDAR VIEW ── */}
                    {viewMode === 'calendar' && (
                        <div className="att-table-card" style={{ overflow: 'hidden' }}>
                            <CalendarView statusFilter={statusFilter} />
                        </div>
                    )}
                </div>

                {/* ── RIGHT PANEL ── */}
                <div className="att-right">
                    <div className="att-right-section">
                        <div className="att-right-section-header">
                            <span className="att-right-title">Attendance Summary</span>
                            <CustomSelect value="today" onChange={() => { }} options={[{ value: 'today', label: 'Today' }, { value: 'week', label: 'This Week' }, { value: 'month', label: 'This Month' }]} placeholder="Today" />
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 8 }}>
                            <DonutChart total="128" label="Total" segments={[{ pct: 76.6, color: '#43a047' }, { pct: 14.1, color: '#c62828' }, { pct: 9.3, color: '#fb8c00' }]} />
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                                {[{ label: 'Present', sub: '98 (76.6%)', color: '#43a047' }, { label: 'Absent', sub: '18 (14.1%)', color: '#c62828' }, { label: 'On Leave', sub: '12 (9.4%)', color: '#fb8c00' }].map((l, i) => (
                                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                                        <div style={{ width: 9, height: 9, borderRadius: '50%', background: l.color, flexShrink: 0 }} />
                                        <div>
                                            <div style={{ fontSize: 11, fontWeight: 600, color: '#2d1a3e' }}>{l.label}</div>
                                            <div style={{ fontSize: 9.5, color: '#b388b3' }}>{l.sub}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="att-right-section">
                        <div className="att-right-section-header">
                            <span className="att-right-title">Department Attendance</span>
                            <CustomSelect value="today" onChange={() => { }} options={[{ value: 'today', label: 'Today' }, { value: 'week', label: 'This Week' }]} placeholder="Today" />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 8 }}>
                            {DEPT_ATT.map((d, i) => (
                                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <span style={{ fontSize: 11, color: '#2d1a3e', fontWeight: 500, minWidth: 100, flexShrink: 0 }}>{d.dept}</span>
                                    <div style={{ flex: 1, height: 5, borderRadius: 3, background: '#f0e6f0', overflow: 'hidden' }}>
                                        <div style={{ height: '100%', width: `${(d.present / d.total) * 100}%`, background: 'linear-gradient(90deg,#43a047,#2e7d32)', borderRadius: 3 }} />
                                    </div>
                                    <span style={{ fontSize: 10.5, color: '#5c4a6e', fontWeight: 600, minWidth: 32, textAlign: 'right' }}>{d.present}/{d.total}</span>
                                </div>
                            ))}
                            <button className="att-view-all-btn">View Full Report <Icons.ArrowRight /></button>
                        </div>
                    </div>

                    <div className="att-right-section">
                        <div className="att-right-section-header">
                            <span className="att-right-title">Today's Birthdays</span>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 8 }}>
                            {[{ name: 'Sarah Johnson', role: 'Developer' }, { name: 'David Wilson', role: 'Marketing' }, { name: 'Jessica Martinez', role: 'HR' }].map((b, i) => (
                                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px', borderRadius: 9, background: '#fdf5fb', border: '1px solid #f0e6f0' }}>
                                    <Avatar name={b.name} size={30} />
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontSize: 12, fontWeight: 600, color: '#2d1a3e' }}>{b.name}</div>
                                        <div style={{ fontSize: 10, color: '#b388b3' }}>{b.role}</div>
                                    </div>
                                    <div style={{ width: 28, height: 28, borderRadius: 7, background: '#f3e5f5', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9c27b0' }}>
                                        <Icons.Gift />
                                    </div>
                                </div>
                            ))}
                            <button className="att-view-all-btn">View All Birthdays <Icons.ArrowRight /></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}