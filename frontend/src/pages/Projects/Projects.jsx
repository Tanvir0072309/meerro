import React, { useState, useRef, useEffect, useCallback } from 'react';
import ReactDOM from 'react-dom';
import { useNavigate } from 'react-router-dom';
import './Projects.css';

/* ══ ICONS ══════════════════════════════════════════════════════════════════ */
const Icons = {
    ChevronLeft: () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>,
    ChevronRight: () => <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>,
    ChevronDown: () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>,
    Calendar: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>,
    Filter: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" /></svg>,
    Plus: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>,
    Search: () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>,
    Table: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><line x1="3" y1="9" x2="21" y2="9" /><line x1="3" y1="15" x2="21" y2="15" /><line x1="9" y1="3" x2="9" y2="21" /><line x1="15" y1="3" x2="15" y2="21" /></svg>,
    Board: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /></svg>,
    MoreVertical: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="5" r="1" /><circle cx="12" cy="12" r="1" /><circle cx="12" cy="19" r="1" /></svg>,
    Folder: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" /></svg>,
    Play: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polygon points="10 8 16 12 10 16 10 8" /></svg>,
    CheckCircle: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>,
    PauseCircle: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="10" y1="15" x2="10" y2="9" /><line x1="14" y1="15" x2="14" y2="9" /></svg>,
    ArrowRight: () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>,
    AlertCircle: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>,
    Eye: () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>,
    Edit: () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>,
    Copy: () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg>,
    Archive: () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="21 8 21 21 3 21 3 8" /><rect x="1" y="3" width="22" height="5" /><line x1="10" y1="12" x2="14" y2="12" /></svg>,
    Trash: () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" /></svg>,
    Check: () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>,
    X: () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>,
};

/* ══ DATA ════════════════════════════════════════════════════════════════════ */
const INITIAL_PROJECTS = [
    { id: 1, name: 'Dashboard Redesign', type: 'Web Development', client: 'TechNova Inc.', manager: 'John Smith', members: 4, progress: 85, status: 'In Progress', start: 'May 01, 2024', deadline: 'May 30, 2024' },
    { id: 2, name: 'Mobile App Development', type: 'Mobile Development', client: 'BrightFuture Ltd.', manager: 'Sarah Johnson', members: 5, progress: 60, status: 'In Progress', start: 'Apr 15, 2024', deadline: 'Jun 15, 2024' },
    { id: 3, name: 'Marketing Website', type: 'Web Development', client: 'MarketPeak', manager: 'Michael Brown', members: 3, progress: 100, status: 'Completed', start: 'Mar 01, 2024', deadline: 'Apr 30, 2024' },
    { id: 4, name: 'CRM Integration', type: 'Software Development', client: 'SoftWave', manager: 'Emily Davis', members: 4, progress: 40, status: 'In Progress', start: 'May 10, 2024', deadline: 'Jun 20, 2024' },
    { id: 5, name: 'E-commerce Platform', type: 'Web Development', client: 'NextGen Store', manager: 'David Wilson', members: 6, progress: 25, status: 'On Hold', start: 'Apr 01, 2024', deadline: 'Jun 30, 2024' },
    { id: 6, name: 'Internal Tool Dashboard', type: 'UI/UX Design', client: 'WorkMonitor', manager: 'Jessica Martinez', members: 3, progress: 90, status: 'In Progress', start: 'Apr 20, 2024', deadline: 'May 25, 2024' },
    { id: 7, name: 'Data Analytics Platform', type: 'Software Development', client: 'DataInsights', manager: 'James Anderson', members: 5, progress: 70, status: 'In Progress', start: 'May 05, 2024', deadline: 'Jun 25, 2024' },
    { id: 8, name: 'HR Management System', type: 'Software Development', client: 'PeoplePro', manager: 'Daniel Thomas', members: 5, progress: 100, status: 'Completed', start: 'Feb 10, 2024', deadline: 'Mar 15, 2024' },
];

const AV_COLORS = ['#9c27b0', '#b5179e', '#43a047', '#e65100', '#1565c0', '#c62828', '#0288d1', '#558b2f'];
const avColor = n => AV_COLORS[n.charCodeAt(0) % AV_COLORS.length];
const initials = n => n.split(' ').map(w => w[0]).join('');
const statusMeta = s => s === 'In Progress'
    ? { bg: '#e8f5e9', color: '#2e7d32' }
    : s === 'Completed'
        ? { bg: '#e3f2fd', color: '#1565c0' }
        : s === 'On Hold'
            ? { bg: '#fff3e0', color: '#e65100' }
            : { bg: '#f3e5f5', color: '#7b1fa2' };

/* ══ HELPERS ═════════════════════════════════════════════════════════════════ */
function useClickOutside(ref, cb) {
    useEffect(() => {
        const h = e => { if (ref.current && !ref.current.contains(e.target)) cb(); };
        document.addEventListener('mousedown', h);
        return () => document.removeEventListener('mousedown', h);
    }, [cb]);
}

/* ══ CUSTOM SELECT ═══════════════════════════════════════════════════════════ */
function CustomSelect({ options, value, onChange, placeholder, compact }) {
    const [open, setOpen] = useState(false);
    const ref = useRef(null);
    const close = useCallback(() => setOpen(false), []);
    useClickOutside(ref, close);

    const selected = options.find(o => o.value === value);
    return (
        <div className={`cust-select-wrap${compact ? ' compact' : ''}`} ref={ref}>
            <button className="cust-select-btn" onClick={() => setOpen(o => !o)} type="button">
                <span className="cust-select-label">{selected ? selected.label : placeholder}</span>
                <span className={`cust-select-arrow${open ? ' open' : ''}`}><Icons.ChevronDown /></span>
            </button>
            {open && (
                <div className="cust-dropdown">
                    {options.map(opt => (
                        <div key={opt.value}
                            className={`cust-dropdown-item${opt.value === value ? ' selected' : ''}`}
                            onClick={() => { onChange(opt.value); setOpen(false); }}>
                            <span>{opt.label}</span>
                            {opt.value === value && <span className="cust-dropdown-check"><Icons.Check /></span>}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

/* ══ CONTEXT MENU ════════════════════════════════════════════════════════════ */
// ── PORTAL CONTEXT MENU — never clipped by table overflow or z-index ──────────
function ContextMenu({ items, onClose, btnRef }) {
    const menuRef = useRef(null);
    const [pos, setPos] = useState({ top: 0, left: 0 });

    // Calculate position from the trigger button using getBoundingClientRect
    useEffect(() => {
        if (!btnRef?.current) return;
        const r = btnRef.current.getBoundingClientRect();
        const menuH = items.filter(i => !i.divider).length * 38 + 16;
        const spaceBelow = window.innerHeight - r.bottom;
        // Open upward if not enough space below
        const top = spaceBelow < menuH + 8
            ? r.top - menuH - 4
            : r.bottom + 4;
        const left = r.right - 180; // align right edge with button right edge
        setPos({ top, left });
    }, [btnRef, items.length]);

    // Close on outside click
    useEffect(() => {
        const h = e => {
            if (
                menuRef.current && !menuRef.current.contains(e.target) &&
                btnRef?.current && !btnRef.current.contains(e.target)
            ) onClose();
        };
        // Tiny delay so the button click that opens doesn't immediately close
        const t = setTimeout(() => document.addEventListener('mousedown', h), 10);
        return () => { clearTimeout(t); document.removeEventListener('mousedown', h); };
    }, [onClose, btnRef]);

    // Close on scroll so menu doesn't drift
    useEffect(() => {
        const h = () => onClose();
        window.addEventListener('scroll', h, true);
        return () => window.removeEventListener('scroll', h, true);
    }, [onClose]);

    return ReactDOM.createPortal(
        <div
            className="ctx-menu"
            ref={menuRef}
            style={{ position: 'fixed', top: pos.top, left: pos.left, zIndex: 999999 }}
        >
            {items.map((item, i) =>
                item.divider
                    ? <div key={i} className="ctx-divider" />
                    : <button
                        key={i}
                        className={`ctx-item${item.danger ? ' danger' : ''}`}
                        onClick={() => { item.onClick?.(); onClose(); }}
                    >
                        <span className="ctx-icon">{item.icon}</span>
                        <span>{item.label}</span>
                    </button>
            )}
        </div>,
        document.body
    );
}

function MoreMenu({ project, onDelete }) {
    const [open, setOpen] = useState(false);
    const btnRef = useRef(null);
    const close = useCallback(() => setOpen(false), []);

    const items = [
        { icon: <Icons.Eye />, label: 'View Details', onClick: () => { } },
        { icon: <Icons.Edit />, label: 'Edit Project', onClick: () => { } },
        { icon: <Icons.Copy />, label: 'Duplicate', onClick: () => { } },
        { divider: true },
        { icon: <Icons.Archive />, label: 'Archive', onClick: () => { } },
        { icon: <Icons.Trash />, label: 'Delete Project', danger: true, onClick: () => onDelete(project.id) },
    ];

    return (
        <div className="more-menu-wrap" onClick={e => e.stopPropagation()}>
            <button
                ref={btnRef}
                className="proj-more-btn"
                onClick={() => setOpen(o => !o)}
            >
                <Icons.MoreVertical />
            </button>
            {open && <ContextMenu items={items} onClose={close} btnRef={btnRef} />}
        </div>
    );
}

/* ══ SUB-COMPONENTS ══════════════════════════════════════════════════════════ */
function Avatar({ name, size = 26 }) {
    return (
        <div style={{
            width: size, height: size, borderRadius: '50%',
            background: avColor(name), color: '#fff',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontWeight: 700, fontSize: size * 0.36, flexShrink: 0,
            fontFamily: 'DM Sans,sans-serif',
        }}>
            {initials(name)}
        </div>
    );
}

function MemberStack({ count, names }) {
    const shown = Math.min(3, names.length);
    return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            {Array.from({ length: shown }).map((_, i) => (
                <div key={i} style={{
                    marginLeft: i === 0 ? 0 : -6, zIndex: shown - i,
                    width: 22, height: 22, borderRadius: '50%',
                    background: AV_COLORS[i % AV_COLORS.length],
                    border: '2px solid #fff',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#fff', fontSize: 7, fontWeight: 700,
                }}>
                    {names[i]?.split(' ').map(w => w[0]).join('')}
                </div>
            ))}
            {count > shown && <span style={{ marginLeft: 4, fontSize: 10, color: '#8a7a9b', fontWeight: 600 }}>+{count - shown}</span>}
        </div>
    );
}

function ProgressBar({ value, status }) {
    const color = status === 'Completed' ? '#43a047' : status === 'On Hold' ? '#fb8c00' : '#9c27b0';
    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ flex: 1, height: 6, borderRadius: 3, background: '#f0e6f0', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${value}%`, borderRadius: 3, background: color }} />
            </div>
            <span style={{ fontSize: 11, color: '#5c4a6e', fontWeight: 600, minWidth: 28 }}>{value}%</span>
        </div>
    );
}

function DonutChart({ segments, total, label }) {
    const r = 54, cx = 65, cy = 65, stroke = 14, circ = 2 * Math.PI * r, gap = (4 / 360) * circ;
    let cum = 0;
    return (
        <svg width="130" height="130" viewBox="0 0 130 130">
            {segments.map((s, i) => {
                const arc = (s.pct / 100) * circ, dash = Math.max(arc - gap, 0), g = circ - dash;
                const rot = -90 + (cum / 100) * 360 + 2;
                cum += s.pct;
                return <circle key={i} cx={cx} cy={cy} r={r} fill="none" stroke={s.color}
                    strokeWidth={stroke} strokeDasharray={`${dash} ${g}`} strokeLinecap="round"
                    style={{ transform: `rotate(${rot}deg)`, transformOrigin: `${cx}px ${cy}px` }} />;
            })}
            <text x={cx} y={cy - 6} textAnchor="middle" fontSize="22" fontWeight="800" fill="#2d1a3e" fontFamily="DM Sans">{total}</text>
            <text x={cx} y={cy + 12} textAnchor="middle" fontSize="11" fill="#b388b3" fontFamily="DM Sans">{label}</text>
        </svg>
    );
}

function Sparkline({ points, color }) {
    const max = Math.max(...points), min = Math.min(...points), w = 70, h = 30;
    const xs = points.map((_, i) => (i / (points.length - 1)) * w);
    const ys = points.map(p => h - ((p - min) / (max - min || 1)) * (h - 4) - 2);
    const d = xs.map((x, i) => `${i === 0 ? 'M' : 'L'}${x},${ys[i]}`).join(' ');
    return <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}><path d={d} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

/* ══ BOARD VIEW ══════════════════════════════════════════════════════════════ */
function BoardView({ projects, onDelete }) {
    const cols = ['In Progress', 'Completed', 'On Hold', 'Not Started'];
    const colMeta = {
        'In Progress': { color: '#43a047', bg: '#e8f5e9' },
        'Completed': { color: '#1565c0', bg: '#e3f2fd' },
        'On Hold': { color: '#e65100', bg: '#fff3e0' },
        'Not Started': { color: '#7b1fa2', bg: '#f3e5f5' },
    };
    return (
        <div className="proj-board-cols">
            {cols.map(col => {
                const colProjects = projects.filter(p => p.status === col);
                const meta = colMeta[col];
                return (
                    <div key={col} className="proj-board-col">
                        {/* Sticky column header */}
                        <div className="proj-board-col-header">
                            <span className="proj-board-col-title">{col}</span>
                            <span className="proj-board-count" style={{ background: meta.bg, color: meta.color }}>{colProjects.length}</span>
                        </div>
                        {/* Scrollable cards area — only this scrolls, not the whole page */}
                        <div className="proj-board-col-cards">
                            {colProjects.length === 0 && (
                                <div className="proj-board-empty">No projects</div>
                            )}
                            {colProjects.map(p => {
                                const sm = statusMeta(p.status);
                                return (
                                    <div key={p.id} className="proj-board-card">
                                        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 8 }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                                <div style={{ width: 28, height: 28, borderRadius: 7, background: avColor(p.name), display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', flexShrink: 0 }}>
                                                    <Icons.Folder />
                                                </div>
                                                <div>
                                                    <div className="proj-board-card-name">{p.name}</div>
                                                    <div className="proj-board-card-type">{p.type}</div>
                                                </div>
                                            </div>
                                            <MoreMenu project={p} onDelete={onDelete} />
                                        </div>
                                        <div style={{ fontSize: 11, color: '#8a7a9b', marginBottom: 6 }}>
                                            <span style={{ fontWeight: 600, color: '#5c4a6e' }}>Client:</span> {p.client}
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
                                            <Avatar name={p.manager} size={18} />
                                            <span style={{ fontSize: 11, color: '#5c4a6e' }}>{p.manager}</span>
                                        </div>
                                        <ProgressBar value={p.progress} status={p.status} />
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, fontSize: 10, color: '#b388b3' }}>
                                            <span>Due: {p.deadline}</span>
                                            <MemberStack count={p.members} names={[p.manager]} />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

/* ══ MAIN COMPONENT ══════════════════════════════════════════════════════════ */
const PER_PAGE = 8;

export default function Projects() {
    const navigate = useNavigate();
    const [projects, setProjects] = useState(INITIAL_PROJECTS);
    const [viewMode, setViewMode] = useState('table');

    // Toolbar filters (pending — applied on button click)
    const [pendingDept, setPendingDept] = useState('all');
    const [pendingClient, setPendingClient] = useState('all');
    const [pendingStatus, setPendingStatus] = useState('all');

    // Applied filters
    const [filterDept, setFilterDept] = useState('all');
    const [filterClient, setFilterClient] = useState('all');
    const [filterStatus, setFilterStatus] = useState('all');
    const [activeFilters, setActiveFilters] = useState([]);

    // Search
    const [searchQuery, setSearchQuery] = useState('');

    // Pagination
    const [page, setPage] = useState(1);

    // Apply filter button
    const applyFilters = () => {
        setFilterDept(pendingDept);
        setFilterClient(pendingClient);
        setFilterStatus(pendingStatus);
        setPage(1);

        const applied = [];
        if (pendingDept !== 'all') applied.push({ key: 'dept', label: pendingDept });
        if (pendingClient !== 'all') applied.push({ key: 'client', label: pendingClient });
        if (pendingStatus !== 'all') applied.push({ key: 'status', label: pendingStatus });
        setActiveFilters(applied);
    };

    const removeFilter = (key) => {
        const next = activeFilters.filter(f => f.key !== key);
        setActiveFilters(next);
        if (key === 'dept') { setFilterDept('all'); setPendingDept('all'); }
        if (key === 'client') { setFilterClient('all'); setPendingClient('all'); }
        if (key === 'status') { setFilterStatus('all'); setPendingStatus('all'); }
        setPage(1);
    };

    const clearAllFilters = () => {
        setPendingDept('all'); setPendingClient('all'); setPendingStatus('all');
        setFilterDept('all'); setFilterClient('all'); setFilterStatus('all');
        setActiveFilters([]);
        setSearchQuery('');
        setPage(1);
    };

    // Filter + search logic
    const filtered = projects.filter(p => {
        if (filterStatus !== 'all') {
            const map = { inprogress: 'In Progress', completed: 'Completed', onhold: 'On Hold', notstarted: 'Not Started' };
            if (p.status !== (map[filterStatus] || filterStatus)) return false;
        }
        if (filterClient !== 'all') {
            const map = { technova: 'TechNova Inc.', brightfuture: 'BrightFuture Ltd.', marketpeak: 'MarketPeak', softwave: 'SoftWave', nextgen: 'NextGen Store', workmonitor: 'WorkMonitor', datainsights: 'DataInsights', peoplepro: 'PeoplePro' };
            if (p.client !== (map[filterClient] || filterClient)) return false;
        }
        if (filterDept !== 'all') {
            const map = { design: 'UI/UX Design', dev: 'Web Development', software: 'Software Development', mobile: 'Mobile Development', marketing: 'Marketing' };
            if (p.type !== (map[filterDept] || filterDept)) return false;
        }
        if (searchQuery.trim()) {
            const q = searchQuery.toLowerCase();
            return (
                p.name.toLowerCase().includes(q) ||
                p.client.toLowerCase().includes(q) ||
                p.manager.toLowerCase().includes(q) ||
                p.type.toLowerCase().includes(q) ||
                p.status.toLowerCase().includes(q)
            );
        }
        return true;
    });

    const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
    const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

    // Reset page when search/filter changes
    useEffect(() => { setPage(1); }, [searchQuery]);

    const handleDelete = (id) => setProjects(ps => ps.filter(p => p.id !== id));

    const deptOptions = [
        { value: 'all', label: 'All Departments' },
        { value: 'design', label: 'UI/UX Design' },
        { value: 'dev', label: 'Web Development' },
        { value: 'software', label: 'Software Development' },
        { value: 'mobile', label: 'Mobile Development' },
        { value: 'marketing', label: 'Marketing' },
    ];
    const clientOptions = [
        { value: 'all', label: 'All Clients' },
        { value: 'technova', label: 'TechNova Inc.' },
        { value: 'brightfuture', label: 'BrightFuture Ltd.' },
        { value: 'marketpeak', label: 'MarketPeak' },
        { value: 'softwave', label: 'SoftWave' },
        { value: 'nextgen', label: 'NextGen Store' },
    ];
    const statusOptions = [
        { value: 'all', label: 'All Status' },
        { value: 'inprogress', label: 'In Progress' },
        { value: 'completed', label: 'Completed' },
        { value: 'onhold', label: 'On Hold' },
        { value: 'notstarted', label: 'Not Started' },
    ];

    return (
        <div className="proj-page">
            {/* ── TOOLBAR ── */}
            <div className="proj-toolbar">
                <button className="proj-toolbar-date-btn">
                    <Icons.Calendar /><span>May 20, 2024 — May 20, 2024</span><Icons.ChevronDown />
                </button>

                <div className="proj-toolbar-filters">
                    <CustomSelect compact placeholder="All Departments" value={pendingDept} onChange={setPendingDept} options={deptOptions} />
                    <CustomSelect compact placeholder="All Clients" value={pendingClient} onChange={setPendingClient} options={clientOptions} />
                    <CustomSelect compact placeholder="All Status" value={pendingStatus} onChange={setPendingStatus} options={statusOptions} />
                    <button className="proj-filter-btn" onClick={applyFilters}>
                        <Icons.Filter /> Apply Filters
                    </button>
                </div>

                <button className="proj-new-btn" onClick={() => navigate('/add-project')}>
                    <Icons.Plus /> Add Project
                </button>
            </div>

            {/* Active filter chips */}
            {activeFilters.length > 0 && (
                <div className="proj-filter-chips">
                    <span className="proj-filter-chips-label">Active filters:</span>
                    {activeFilters.map(f => (
                        <span key={f.key} className="proj-filter-chip">
                            {f.label}
                            <button onClick={() => removeFilter(f.key)}><Icons.X /></button>
                        </span>
                    ))}
                    <button className="proj-filter-clear" onClick={clearAllFilters}>Clear all</button>
                </div>
            )}

            {/* ── STAT CARDS ── */}
            <div className="proj-stat-cards">
                {[
                    { Icon: Icons.Folder, cls: 'purple', label: 'Total Projects', value: projects.length.toString(), sub: '+3 this month', subCls: 'pos', pts: [3, 5, 4, 7, 5, 8, 6, 9, 7, 10], color: '#9c27b0' },
                    { Icon: Icons.Play, cls: 'green', label: 'Active Projects', value: projects.filter(p => p.status === 'In Progress').length.toString(), sub: `${Math.round(projects.filter(p => p.status === 'In Progress').length / projects.length * 100)}% of total`, subCls: 'pos', pts: [4, 6, 5, 7, 6, 8, 7, 9, 8, 10], color: '#43a047' },
                    { Icon: Icons.CheckCircle, cls: 'blue', label: 'Completed', value: projects.filter(p => p.status === 'Completed').length.toString(), sub: '25% of total', subCls: 'neu', pts: [2, 3, 2, 4, 3, 4, 3, 5, 4, 6], color: '#1565c0' },
                    { Icon: Icons.PauseCircle, cls: 'orange', label: 'On Hold', value: projects.filter(p => p.status === 'On Hold').length.toString(), sub: '8.3% of total', subCls: 'warn', pts: [1, 2, 1, 2, 2, 1, 2, 1, 2, 2], color: '#fb8c00' },
                ].map((c, i) => (
                    <div className="proj-stat-card" key={i}>
                        <div className={`proj-stat-icon ${c.cls}`}><c.Icon /></div>
                        <div className="proj-stat-body">
                            <div className="proj-stat-label">{c.label}</div>
                            <div className="proj-stat-value">{c.value}</div>
                            <div className={`proj-stat-sub ${c.subCls}`}>{c.sub}</div>
                        </div>
                        <Sparkline points={c.pts} color={c.color} />
                    </div>
                ))}
            </div>

            {/* ── CONTENT ── */}
            <div className="proj-content">
                <div className="proj-main">
                    {/* Table header */}
                    <div className="proj-table-header">
                        <div className="proj-table-title">
                            Projects Overview
                            {filtered.length !== projects.length && (
                                <span className="proj-filtered-count">{filtered.length} of {projects.length}</span>
                            )}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                            <div className="proj-search-wrap">
                                <span className="proj-search-icon"><Icons.Search /></span>
                                <input
                                    className="proj-search-input"
                                    placeholder="Search projects..."
                                    value={searchQuery}
                                    onChange={e => setSearchQuery(e.target.value)}
                                />
                                {searchQuery && (
                                    <button className="proj-search-clear" onClick={() => setSearchQuery('')}><Icons.X /></button>
                                )}
                            </div>
                            <div className="proj-view-group">
                                <button className={`proj-view-btn${viewMode === 'table' ? ' active' : ''}`} onClick={() => setViewMode('table')}><Icons.Table /> Table</button>
                                <button className={`proj-view-btn${viewMode === 'board' ? ' active' : ''}`} onClick={() => setViewMode('board')}><Icons.Board /> Board</button>
                            </div>
                        </div>
                    </div>

                    {/* No results */}
                    {filtered.length === 0 && (
                        <div className="proj-empty-state">
                            <div className="proj-empty-icon"><Icons.Search /></div>
                            <div className="proj-empty-title">No projects found</div>
                            <div className="proj-empty-sub">Try adjusting your search or filters</div>
                            <button className="proj-filter-clear" style={{ marginTop: 10 }} onClick={clearAllFilters}>Clear all filters</button>
                        </div>
                    )}

                    {/* TABLE VIEW */}
                    {viewMode === 'table' && filtered.length > 0 && (
                        <div className="proj-table-card">
                            <table className="proj-table">
                                <thead>
                                    <tr>
                                        <th>Project</th>
                                        <th>Client</th>
                                        <th>Manager</th>
                                        <th>Members</th>
                                        <th>Progress</th>
                                        <th>Status</th>
                                        <th>Start Date</th>
                                        <th>Deadline</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {paginated.map((p) => {
                                        const sc = statusMeta(p.status);
                                        return (
                                            <tr key={p.id}>
                                                <td>
                                                    <div className="proj-name-cell">
                                                        <div className="proj-name-icon" style={{ background: avColor(p.name) }}><Icons.Folder /></div>
                                                        <div>
                                                            <div className="proj-name-text">{p.name}</div>
                                                            <div className="proj-name-type">{p.type}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="proj-td-text">{p.client}</td>
                                                <td>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                                        <Avatar name={p.manager} size={24} />
                                                        <span className="proj-td-text">{p.manager}</span>
                                                    </div>
                                                </td>
                                                <td>
                                                    <MemberStack count={p.members} names={[p.manager, 'Sarah J', 'Mike B']} />
                                                </td>
                                                <td style={{ minWidth: 130 }}><ProgressBar value={p.progress} status={p.status} /></td>
                                                <td><span className="proj-status-badge" style={{ background: sc.bg, color: sc.color }}>{p.status}</span></td>
                                                <td className="proj-td-text">{p.start}</td>
                                                <td className="proj-td-text">{p.deadline}</td>
                                                <td><MoreMenu project={p} onDelete={handleDelete} /></td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>

                            {/* Pagination */}
                            <div className="proj-pagination">
                                <span className="proj-page-info">
                                    Showing {Math.min((page - 1) * PER_PAGE + 1, filtered.length)}–{Math.min(page * PER_PAGE, filtered.length)} of {filtered.length} projects
                                </span>
                                <div className="proj-page-btns">
                                    <button className="proj-page-btn" onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}>
                                        <Icons.ChevronLeft />
                                    </button>
                                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                                        <button key={p} className={`proj-page-btn${p === page ? ' active' : ''}`} onClick={() => setPage(p)}>{p}</button>
                                    ))}
                                    <button className="proj-page-btn" onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}>
                                        <Icons.ChevronRight />
                                    </button>
                                </div>
                                <select className="proj-per-page-select" defaultValue="8">
                                    <option value="8">Show 8 per page</option>
                                    <option value="16">Show 16 per page</option>
                                </select>
                            </div>
                        </div>
                    )}

                    {/* BOARD VIEW */}
                    {viewMode === 'board' && filtered.length > 0 && (
                        <BoardView projects={filtered} onDelete={handleDelete} />
                    )}
                </div>

                {/* ── RIGHT PANEL ── */}
                <div className="proj-right">
                    <div className="proj-right-section">
                        <div className="proj-right-section-header">
                            <span className="proj-right-title">Projects Summary</span>
                            <CustomSelect compact value="today" onChange={() => { }} options={[{ value: 'today', label: 'Today' }, { value: 'week', label: 'This Week' }, { value: 'month', label: 'This Month' }]} placeholder="Today" />
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 8 }}>
                            <DonutChart total={projects.length.toString()} label="Total" segments={[{ pct: 66.7, color: '#43a047' }, { pct: 25, color: '#1565c0' }, { pct: 8.3, color: '#fb8c00' }]} />
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                                {[
                                    { label: 'In Progress', sub: `${projects.filter(p => p.status === 'In Progress').length} projects`, color: '#43a047' },
                                    { label: 'Completed', sub: `${projects.filter(p => p.status === 'Completed').length} projects`, color: '#1565c0' },
                                    { label: 'On Hold', sub: `${projects.filter(p => p.status === 'On Hold').length} projects`, color: '#fb8c00' },
                                ].map((l, i) => (
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

                    <div className="proj-right-section">
                        <div className="proj-right-section-header">
                            <span className="proj-right-title">Project Progress</span>
                            <CustomSelect compact value="today" onChange={() => { }} options={[{ value: 'today', label: 'Today' }, { value: 'week', label: 'This Week' }]} placeholder="Today" />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 9, marginTop: 8 }}>
                            {projects.slice(0, 5).map((p, i) => (
                                <div key={i}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                                        <span style={{ fontSize: 11, color: '#2d1a3e', fontWeight: 500 }}>{p.name}</span>
                                        <span style={{ fontSize: 11, fontWeight: 700, color: avColor(p.name) }}>{p.progress}%</span>
                                    </div>
                                    <div style={{ height: 5, borderRadius: 3, background: '#f0e6f0', overflow: 'hidden' }}>
                                        <div style={{ height: '100%', width: `${p.progress}%`, background: avColor(p.name), borderRadius: 3 }} />
                                    </div>
                                </div>
                            ))}
                            <button className="proj-view-all-btn">View All Projects <Icons.ArrowRight /></button>
                        </div>
                    </div>

                    <div className="proj-right-section">
                        <div className="proj-right-section-header"><span className="proj-right-title">Overdue Projects</span></div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 8 }}>
                            {[{ name: 'E-commerce Platform', days: '5 days overdue', color: '#fb8c00' }, { name: 'CRM Integration', days: '2 days overdue', color: '#c62828' }].map((p, i) => (
                                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px', borderRadius: 9, background: '#fdf5fb', border: '1px solid #f0e6f0' }}>
                                    <div style={{ width: 30, height: 30, borderRadius: 8, background: '#fff3e0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: p.color }}><Icons.AlertCircle /></div>
                                    <div>
                                        <div style={{ fontSize: 12, fontWeight: 600, color: '#2d1a3e' }}>{p.name}</div>
                                        <div style={{ fontSize: 10, color: p.color, fontWeight: 500 }}>{p.days}</div>
                                    </div>
                                </div>
                            ))}
                            <button className="proj-view-all-btn">View All Overdue <Icons.ArrowRight /></button>
                        </div>
                    </div>

                    <div className="proj-right-section">
                        <div className="proj-right-section-header">
                            <span className="proj-right-title">Top Project Managers</span>
                            <CustomSelect compact value="month" onChange={() => { }} options={[{ value: 'month', label: 'This Month' }, { value: 'week', label: 'This Week' }]} placeholder="This Month" />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 9, marginTop: 8 }}>
                            {[{ name: 'John Smith', time: '18h 30m', pct: 90 }, { name: 'Sarah Johnson', time: '16h 45m', pct: 75 }, { name: 'Michael Brown', time: '14h 20m', pct: 60 }].map((m, i) => (
                                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <span style={{ fontSize: 11, fontWeight: 700, color: '#c4a0c4', minWidth: 14 }}>{i + 1}</span>
                                    <Avatar name={m.name} size={26} />
                                    <span style={{ fontSize: 11.5, fontWeight: 600, color: '#2d1a3e', flex: 1 }}>{m.name}</span>
                                    <div style={{ height: 5, borderRadius: 3, background: '#f0e6f0', overflow: 'hidden', width: 60 }}>
                                        <div style={{ height: '100%', width: `${m.pct}%`, background: 'linear-gradient(90deg,#b5179e,#9c27b0)', borderRadius: 3 }} />
                                    </div>
                                    <span style={{ fontSize: 10, color: '#b388b3', minWidth: 44, textAlign: 'right' }}>{m.time}</span>
                                </div>
                            ))}
                            <button className="proj-view-all-btn">View Full Report <Icons.ArrowRight /></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}