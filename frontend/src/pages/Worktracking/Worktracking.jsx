import React, { useState, useEffect } from 'react';
import "./Worktracking.css";

/* ══════════════════════════════════════════ SVG ICONS ══════════════════════════════════════════ */
const Icons = {
    Calendar: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>,
    ChevDown: () => <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>,
    ChevronLeft: () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>,
    ChevronRight: () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>,
    Filter: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" /></svg>,
    Download: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>,
    ArrowRight: () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>,
    Clock: () => <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>,
    Play: () => <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polygon points="10 8 16 12 10 16 10 8" /></svg>,
    Pause: () => <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="10" y1="15" x2="10" y2="9" /><line x1="14" y1="15" x2="14" y2="9" /></svg>,
    Coffee: () => <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8h1a4 4 0 0 1 0 8h-1" /><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" /><line x1="6" y1="1" x2="6" y2="4" /><line x1="10" y1="1" x2="10" y2="4" /><line x1="14" y1="1" x2="14" y2="4" /></svg>,
};

/* ══════════════════════════════════════════
   CUSTOM DROPDOWNS — same as Activity/Employees
══════════════════════════════════════════ */
function ToolbarSelect({ options }) {
    const [open, setOpen] = useState(false);
    const [idx, setIdx] = useState(0);
    return (
        <div className="wt-tb-select" tabIndex={0} onBlur={() => setOpen(false)}>
            <button className="wt-tb-select-btn" onClick={() => setOpen(o => !o)} type="button">
                <span>{options[idx]}</span>
                <span className={`wt-custom-chevron ${open ? 'open' : ''}`}><Icons.ChevDown /></span>
            </button>
            {open && (
                <ul className="wt-custom-dropdown">
                    {options.map((o, i) => (
                        <li key={o} className={`wt-custom-option ${i === idx ? 'selected' : ''}`}
                            onMouseDown={() => { setIdx(i); setOpen(false); }}>
                            {i === idx && <span className="wt-option-check">✓</span>}
                            {o}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

function CustomSelect({ options, defaultIdx = 0 }) {
    const [open, setOpen] = useState(false);
    const [idx, setIdx] = useState(defaultIdx);
    return (
        <div className="wt-custom-select" tabIndex={0} onBlur={() => setOpen(false)}>
            <button className="wt-custom-select-btn" onClick={() => setOpen(o => !o)} type="button">
                <span>{options[idx]}</span>
                <span className={`wt-custom-chevron ${open ? 'open' : ''}`}><Icons.ChevDown /></span>
            </button>
            {open && (
                <ul className="wt-custom-dropdown">
                    {options.map((o, i) => (
                        <li key={o} className={`wt-custom-option ${i === idx ? 'selected' : ''}`}
                            onMouseDown={() => { setIdx(i); setOpen(false); }}>
                            {i === idx && <span className="wt-option-check">✓</span>}
                            {o}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

/* ══════════════════════════════════════════ HELPERS ══════════════════════════════════════════ */
const APP_COLORS = {
    'Figma': { bg: '#1e1e1e', color: '#f24e1e' }, 'VS Code': { bg: '#007acc', color: '#fff' },
    'dribbble.com': { bg: '#ea4c89', color: '#fff' }, 'Google Docs': { bg: '#1a73e8', color: '#fff' },
    'Gmail': { bg: '#ea4335', color: '#fff' }, 'Google Meet': { bg: '#00897b', color: '#fff' },
    'GitHub': { bg: '#24292e', color: '#fff' }, 'Google Chrome': { bg: '#4285f4', color: '#fff' },
    'Microsoft Word': { bg: '#2b579a', color: '#fff' }, 'Slack': { bg: '#4a154b', color: '#fff' },
};
const AppIcon = ({ app, size = 24 }) => {
    const s = APP_COLORS[app] || { bg: '#6366f1', color: '#fff' };
    return (
        <div style={{ width: size, height: size, borderRadius: 6, background: s.bg, color: s.color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 10, fontWeight: 700, fontFamily: 'DM Sans' }}>
            {app.charAt(0)}
        </div>
    );
};

const AV_COLORS = ['#7c3aed', '#b5179e', '#059669', '#d97706', '#2563eb', '#dc2626'];
const avColor = n => AV_COLORS[n.charCodeAt(0) % AV_COLORS.length];
const initials = n => n.split(' ').map(w => w[0]).join('');

function Avatar({ name, size = 32 }) {
    return (
        <div style={{ width: size, height: size, borderRadius: '50%', background: avColor(name), color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: size * 0.34, flexShrink: 0, fontFamily: 'DM Sans' }}>
            {initials(name)}
        </div>
    );
}

/* Sparkline — same as Employees / Activity */
function SparkLine({ pts, color }) {
    const max = Math.max(...pts), min = Math.min(...pts);
    const w = 72, h = 28;
    const points = pts.map((v, i) =>
        `${(i / (pts.length - 1)) * w},${h - ((v - min) / (max - min || 1)) * h}`
    ).join(' ');
    return (
        <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} style={{ flexShrink: 0 }}>
            <polyline
                className="spark-line"
                points={points}
                fill="none"
                stroke={color}
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

/* Donut */
function DonutChart() {
    const cx = 75, cy = 75, r = 54, stroke = 20, circ = 2 * Math.PI * r;
    const segs = [{ pct: 75.9, color: '#22c55e' }, { pct: 15.9, color: '#f59e0b' }, { pct: 8.2, color: '#8b5cf6' }];
    let offset = 0;
    return (
        <svg width="150" height="150" viewBox="0 0 150 150" style={{ flexShrink: 0 }}>
            <circle cx={cx} cy={cy} r={r} fill="none" stroke="#f0e6f0" strokeWidth={stroke} />
            {segs.map((s, i) => {
                const dash = (s.pct / 100) * circ, gap = circ - dash, rot = -90 + (offset / 100) * 360;
                offset += s.pct;
                return <circle key={i} cx={cx} cy={cy} r={r} fill="none" stroke={s.color} strokeWidth={stroke} strokeDasharray={`${dash} ${gap}`} transform={`rotate(${rot} ${cx} ${cy})`} />;
            })}
            <text x={cx} y={cy - 8} textAnchor="middle" fill="#2d1a3e" fontSize="16" fontWeight="800" fontFamily="DM Sans">42h 35m</text>
            <text x={cx} y={cy + 10} textAnchor="middle" fill="#b388b3" fontSize="10" fontFamily="DM Sans">Total Work</text>
        </svg>
    );
}

/* Timeline */
function WorkTimeline() {
    const employees = ['John Smith', 'Sarah Johnson', 'Michael Brown', 'Emily Davis', 'David Wilson'];
    const hours = ['12 AM', '04 AM', '08 AM', '12 PM', '04 PM', '08 PM', '12 AM'];
    const segments = [
        [[42, 28, 'active'], [71, 6, 'idle'], [78, 10, 'break'], [89, 5, 'active']],
        [[40, 30, 'active'], [72, 5, 'idle'], [80, 8, 'active'], [90, 4, 'idle']],
        [[38, 32, 'active'], [74, 4, 'idle'], [82, 10, 'active']],
        [[43, 25, 'active'], [70, 7, 'idle'], [80, 9, 'active'], [91, 3, 'break']],
        [[35, 20, 'active'], [57, 8, 'idle'], [68, 15, 'active'], [85, 5, 'idle']],
    ];
    const segColor = t => t === 'active' ? '#22c55e' : t === 'idle' ? '#f59e0b' : '#8b5cf6';
    return (
        <div className="wt-timeline-wrap">
            <div className="wt-timeline-header-row">
                <div className="wt-tl-emp-col" />
                <div className="wt-tl-grid">{hours.map((h, i) => <span key={i} className="wt-tl-hour">{h}</span>)}</div>
            </div>
            {employees.map((emp, ei) => (
                <div className="wt-timeline-row" key={ei}>
                    <div className="wt-tl-emp-col"><span className="wt-tl-emp-name">{emp}</span></div>
                    <div className="wt-tl-bar-wrap">
                        {Array.from({ length: 48 }).map((_, i) => <div key={i} className="wt-tl-cell" />)}
                        {segments[ei].map((s, si) => (
                            <div key={si} className="wt-tl-segment" style={{ left: `${s[0]}%`, width: `${s[1]}%`, background: segColor(s[2]) }} />
                        ))}
                    </div>
                </div>
            ))}
            <div className="wt-tl-legend">
                {[['#22c55e', 'Active'], ['#f59e0b', 'Idle'], ['#8b5cf6', 'Break'], ['#e5e7eb', 'No Activity']].map(([c, l]) => (
                    <div key={l} className="wt-tl-legend-item">
                        <span style={{ width: 10, height: 10, borderRadius: 2, background: c, display: 'inline-block' }} />
                        <span>{l}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

/* ══════════════════════════════════════════ SKELETON ══════════════════════════════════════════ */
function SkeletonCard() {
    return (
        <div className="wt-stat-card wt-skeleton-card">
            <div className="wt-skel wt-skel-icon" />
            <div className="wt-stat-body">
                <div className="wt-skel wt-skel-label" />
                <div className="wt-skel wt-skel-value" />
                <div className="wt-skel wt-skel-sub" />
            </div>
            <div className="wt-skel wt-skel-spark" />
        </div>
    );
}

/* ══════════════════════════════════════════ DATA ══════════════════════════════════════════ */
const STAT_CARDS = [
    { Icon: Icons.Clock, cls: 'blue', ic: '#3b82f6', label: 'Total Work Time', value: '42h 35m', sub: '+8.6% vs yesterday', subCls: 'pos', pts: [28, 48, 36, 72, 58, 82, 74, 66, 80, 90], lc: '#3b82f6' },
    { Icon: Icons.Play, cls: 'green', ic: '#22c55e', label: 'Active Time', value: '32h 20m', sub: '75.9% of total', subCls: 'pos', pts: [22, 52, 38, 80, 62, 88, 78, 70, 84, 92], lc: '#22c55e' },
    { Icon: Icons.Pause, cls: 'orange', ic: '#f59e0b', label: 'Idle Time', value: '6h 45m', sub: '15.9% of total', subCls: 'neu', pts: [55, 40, 68, 30, 52, 38, 60, 44, 35, 50], lc: '#f59e0b' },
    { Icon: Icons.Coffee, cls: 'purple', ic: '#8b5cf6', label: 'Break Time', value: '3h 30m', sub: '8.2% of total', subCls: 'neu', pts: [45, 60, 38, 55, 42, 58, 50, 45, 55, 48], lc: '#8b5cf6' },
];

const TRACKING_DETAILS = [
    { timeFrom: '11:00 AM', timeTo: '11:45 AM', name: 'John Smith', role: 'UI/UX Designer', activity: 'Designing dashboard UI', app: 'Figma', project: 'Dashboard Redesign', status: 'active', duration: '45m' },
    { timeFrom: '10:15 AM', timeTo: '10:55 AM', name: 'Sarah Johnson', role: 'Developer', activity: 'Coding authentication flow', app: 'VS Code', project: 'Web App Development', status: 'active', duration: '40m' },
    { timeFrom: '09:30 AM', timeTo: '10:00 AM', name: 'Michael Brown', role: 'Designer', activity: 'Browsing design inspiration', app: 'dribbble.com', project: 'Mobile App Design', status: 'idle', duration: '30m' },
    { timeFrom: '09:00 AM', timeTo: '09:30 AM', name: 'Emily Davis', role: 'Content Writer', activity: 'Writing blog content', app: 'Google Docs', project: 'Blog Project', status: 'active', duration: '30m' },
    { timeFrom: '08:45 AM', timeTo: '09:00 AM', name: 'David Wilson', role: 'Marketing', activity: 'Checking email', app: 'Gmail', project: 'Email Campaign', status: 'idle', duration: '15m' },
    { timeFrom: '08:30 AM', timeTo: '08:45 AM', name: 'John Smith', role: 'UI/UX Designer', activity: 'Team stand-up meeting', app: 'Google Meet', project: 'General', status: 'break', duration: '15m' },
    { timeFrom: '08:00 AM', timeTo: '08:30 AM', name: 'Sarah Johnson', role: 'Developer', activity: 'Reviewing pull requests', app: 'GitHub', project: 'Web App Development', status: 'active', duration: '30m' },
];

const TOP_PRODUCTIVE = [
    { name: 'John Smith', time: '8h 45m', pct: 97 },
    { name: 'Sarah Johnson', time: '7h 30m', pct: 83 },
    { name: 'Michael Brown', time: '6h 20m', pct: 71 },
    { name: 'Emily Davis', time: '6h 10m', pct: 69 },
    { name: 'David Wilson', time: '5h 45m', pct: 64 },
];

const MOST_USED_APPS = [
    { name: 'Google Chrome', time: '6h 30m', pct: 88, color: '#4285f4' },
    { name: 'VS Code', time: '5h 20m', pct: 72, color: '#007acc' },
    { name: 'Figma', time: '4h 15m', pct: 58, color: '#f24e1e' },
    { name: 'Microsoft Word', time: '2h 40m', pct: 36, color: '#2b579a' },
    { name: 'Slack', time: '1h 50m', pct: 25, color: '#4a154b' },
];

const PERIOD_OPTS = ['Today', 'This Week', 'This Month'];

/* ══════════════════════════════════════════ MAIN ══════════════════════════════════════════ */
export default function WorkTracking() {
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);

    /* 1-second skeleton animation on mount */
    useEffect(() => {
        const t = setTimeout(() => setLoading(false), 1000);
        return () => clearTimeout(t);
    }, []);

    return (
        <div className="wt-page">

            {/* ── FILTER BAR ── */}
            <div className="wt-filter-bar">
                <button className="wt-filter-btn">
                    <Icons.Calendar /> May 20, 2024 — May 20, 2024 <Icons.ChevDown />
                </button>
                <div className="wt-selects">
                    <ToolbarSelect options={['All Employees', 'John Smith', 'Sarah Johnson', 'Michael Brown', 'Emily Davis', 'David Wilson']} />
                    <ToolbarSelect options={['All Departments', 'UI/UX Design', 'Development', 'Design', 'Content Writing', 'Marketing']} />
                    <ToolbarSelect options={['All Projects', 'Dashboard Redesign', 'Web App Development', 'Mobile App Design', 'Blog Project', 'Email Campaign']} />
                    <button className="wt-filter-icon-btn"><Icons.Filter /> Filters</button>
                </div>
                <div style={{ flex: 1 }} />
                <button className="wt-export-btn"><Icons.Download /> Export Report</button>
            </div>

            {/* ── STAT CARDS — horizontal [icon][label+value+sub][sparkline] ── */}
            <div className="wt-stat-cards">
                {loading
                    ? Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)
                    : STAT_CARDS.map((c, i) => (
                        <div className="wt-stat-card" key={i}>
                            <div className={`wt-stat-icon ${c.cls}`} style={{ color: c.ic }}><c.Icon /></div>
                            <div className="wt-stat-body">
                                <div className="wt-stat-label">{c.label}</div>
                                <div className="wt-stat-value">{c.value}</div>
                                <div className={`wt-stat-sub ${c.subCls}`}>{c.sub}</div>
                            </div>
                            <SparkLine pts={c.pts} color={c.lc} />
                        </div>
                    ))
                }
            </div>

            {/* ── Divider line — same as Employees ── */}
            <div className="wt-stat-divider-line" />

            {/* ── BODY ── */}
            <div className="wt-body">
                <div className="wt-main">

                    {/* Overview + Timeline */}
                    <div className="wt-top-row">
                        <div className="wt-overview-card">
                            <div className="wt-card-title">Work Time Overview</div>
                            <div className="wt-overview-body">
                                <DonutChart />
                                <div className="wt-overview-legend">
                                    {[
                                        { color: '#22c55e', label: 'Active', val: '32h 20m (75.9%)' },
                                        { color: '#f59e0b', label: 'Idle', val: '6h 45m (15.9%)' },
                                        { color: '#8b5cf6', label: 'Break', val: '3h 30m (8.2%)' },
                                    ].map((l, i) => (
                                        <div className="wt-legend-item" key={i}>
                                            <span className="wt-legend-dot" style={{ background: l.color }} />
                                            <div>
                                                <div className="wt-legend-label">{l.label}</div>
                                                <div className="wt-legend-val">{l.val}</div>
                                            </div>
                                        </div>
                                    ))}
                                    <div className="wt-goal-bar-wrap">
                                        <div className="wt-goal-label-row"><span>Daily Goal: 8h</span><span>85% Completed</span></div>
                                        <div className="wt-goal-bar-bg"><div className="wt-goal-bar-fill" style={{ width: '85%' }} /></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="wt-timeline-card">
                            <div className="wt-card-title">Work Tracking Timeline</div>
                            <WorkTimeline />
                        </div>
                    </div>

                    {/* Details Table */}
                    <div className="wt-details-card">
                        <div className="wt-card-title" style={{ marginBottom: 14 }}>Work Tracking Details</div>
                        <div className="wt-table-head">
                            <span>Time</span><span>Employee</span><span>Activity</span>
                            <span>Application / Website</span><span>Project</span>
                            <span>Status</span><span>Duration</span>
                        </div>
                        {TRACKING_DETAILS.map((row, i) => (
                            <div className="wt-table-row" key={i}>
                                <div className="wt-col-time">{row.timeFrom} — {row.timeTo}</div>
                                <div className="wt-col-emp">
                                    <Avatar name={row.name} size={30} />
                                    <div><div className="wt-emp-name">{row.name}</div><div className="wt-emp-role">{row.role}</div></div>
                                </div>
                                <div className="wt-col-text">{row.activity}</div>
                                <div className="wt-col-app"><AppIcon app={row.app} /><span>{row.app}</span></div>
                                <div className="wt-col-text">{row.project}</div>
                                <div className="wt-col-status">
                                    <span className={`wt-status-badge ${row.status}`}>{row.status.charAt(0).toUpperCase() + row.status.slice(1)}</span>
                                </div>
                                <div className="wt-col-dur">{row.duration}</div>
                            </div>
                        ))}
                        <div className="wt-pagination">
                            <span className="wt-page-info">Showing 1–7 of 125 activities</span>
                            <div className="wt-page-btns">
                                <button className="wt-page-btn" onClick={() => setPage(p => Math.max(1, p - 1))}><Icons.ChevronLeft /></button>
                                {[1, 2, 3, '...', 18].map((p, i) => (
                                    <button key={i} className={`wt-page-btn ${p === page ? 'active' : ''}`} onClick={() => typeof p === 'number' && setPage(p)}>{p}</button>
                                ))}
                                <button className="wt-page-btn" onClick={() => setPage(p => Math.min(18, p + 1))}><Icons.ChevronRight /></button>
                            </div>
                            <div className="wt-per-page-wrap">
                                <select className="wt-per-page-select">
                                    <option>Show 7 per page</option><option>Show 10 per page</option><option>Show 25 per page</option>
                                </select>
                                <Icons.ChevDown />
                            </div>
                        </div>
                    </div>
                </div>

                {/* RIGHT PANEL */}
                <div className="wt-right">

                    <div className="wt-right-card">
                        <div className="wt-right-card-header">
                            <span className="wt-right-card-title">Top Productive Employees</span>
                            <CustomSelect options={PERIOD_OPTS} />
                        </div>
                        {TOP_PRODUCTIVE.map((e, i) => (
                            <div className="wt-emp-row" key={i}>
                                <span className="wt-emp-rank">{i + 1}</span>
                                <Avatar name={e.name} size={28} />
                                <div className="wt-emp-info">
                                    <div className="wt-emp-row-name">{e.name}</div>
                                    <div className="wt-emp-bar-bg"><div className="wt-emp-bar-fill" style={{ width: `${e.pct}%` }} /></div>
                                </div>
                                <span className="wt-emp-time">{e.time}</span>
                            </div>
                        ))}
                        <button className="wt-view-all-btn">View Full Report <Icons.ArrowRight /></button>
                    </div>

                    <div className="wt-right-card">
                        <div className="wt-right-card-header">
                            <span className="wt-right-card-title">Work Tracking Summary</span>
                            <CustomSelect options={PERIOD_OPTS} />
                        </div>
                        {[
                            { color: '#22c55e', label: 'Active Time', val: '32h 20m', pct: '75.9%' },
                            { color: '#f59e0b', label: 'Idle Time', val: '6h 45m', pct: '15.9%' },
                            { color: '#8b5cf6', label: 'Break Time', val: '3h 30m', pct: '8.2%' },
                        ].map((s, i) => (
                            <div className="wt-summary-row" key={i}>
                                <span className="wt-summary-dot" style={{ background: s.color }} />
                                <span className="wt-summary-label">{s.label}</span>
                                <span className="wt-summary-val">{s.val}</span>
                                <span className="wt-summary-pct">{s.pct}</span>
                            </div>
                        ))}
                    </div>

                    <div className="wt-right-card">
                        <div className="wt-right-card-header">
                            <span className="wt-right-card-title">Most Used Applications</span>
                            <CustomSelect options={PERIOD_OPTS} />
                        </div>
                        {MOST_USED_APPS.map((app, i) => (
                            <div className="wt-app-row" key={i}>
                                <AppIcon app={app.name} size={26} />
                                <div className="wt-app-info">
                                    <div className="wt-app-name-row">
                                        <span className="wt-app-name">{app.name}</span>
                                        <span className="wt-app-time">{app.time}</span>
                                    </div>
                                    <div className="wt-app-bar-bg"><div className="wt-app-bar-fill" style={{ width: `${app.pct}%`, background: app.color }} /></div>
                                </div>
                            </div>
                        ))}
                        <button className="wt-view-all-btn">View Full Report <Icons.ArrowRight /></button>
                    </div>

                </div>
            </div>
        </div>
    );
}