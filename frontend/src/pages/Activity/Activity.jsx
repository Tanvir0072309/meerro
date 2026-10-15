import React, { useState } from 'react';
import './Activity.css';

/* ══════════════════════════════════════════
   SVG ICONS
══════════════════════════════════════════ */
const Icons = {
    Search: () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>,
    Filter: () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" /></svg>,
    Export: () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>,
    Calendar: () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>,
    ChevDown: () => <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>,
    ArrowRight: () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>,
    LoadMore: () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>,
    Activity: () => <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg>,
    CheckCirc: () => <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>,
    MinusCirc: () => <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="8" y1="12" x2="16" y2="12" /></svg>,
    XCirc: () => <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="15" y1="9" x2="9" y2="15" /><line x1="9" y1="9" x2="15" y2="15" /></svg>,
    Figma: () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z" /><path d="M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2z" /><path d="M12 12.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 1 1-7 0z" /><path d="M5 19.5A3.5 3.5 0 0 1 8.5 16H12v3.5a3.5 3.5 0 1 1-7 0z" /><path d="M5 12.5A3.5 3.5 0 0 1 8.5 9H12v7H8.5A3.5 3.5 0 0 1 5 12.5z" /></svg>,
    Github: () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" /></svg>,
    Chrome: () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="4" /><line x1="21.17" y1="8" x2="12" y2="8" /><line x1="3.95" y1="6.06" x2="8.54" y2="14" /><line x1="10.88" y1="21.94" x2="15.46" y2="14" /></svg>,
    Slack: () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M14.5 10c-.83 0-1.5-.67-1.5-1.5v-5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5z" /><path d="M20.5 10H19V8.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" /><path d="M9.5 14c.83 0 1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5S8 21.33 8 20.5v-5c0-.83.67-1.5 1.5-1.5z" /><path d="M3.5 14H5v1.5c0 .83-.67 1.5-1.5 1.5S2 16.33 2 15.5 2.67 14 3.5 14z" /><path d="M14 14.5c0-.83.67-1.5 1.5-1.5h5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-5c-.83 0-1.5-.67-1.5-1.5z" /><path d="M15.5 19H14v1.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5-.67-1.5-1.5-1.5z" /><path d="M10 9.5C10 8.67 9.33 8 8.5 8h-5C2.67 8 2 8.67 2 9.5S2.67 11 3.5 11h5c.83 0 1.5-.67 1.5-1.5z" /><path d="M8.5 5H10V3.5C10 2.67 9.33 2 8.5 2S7 2.67 7 3.5 7.67 5 8.5 5z" /></svg>,
    Word: () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /></svg>,
    VSCode: () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>,
    Globe: () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>,
    YouTube: () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><polygon points="23 7 16 12 23 17 23 7" /><rect x="1" y="5" width="15" height="14" rx="2" /></svg>,
    Mail: () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>,
    Medium: () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M7 8h10M7 12h6M7 16h8" /></svg>,
    Facebook: () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>,
    Dribbble: () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><circle cx="12" cy="12" r="10" /><path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85m19.5 1.9c-3.5-.93-6.63-.82-8.94 0-2.58.92-5.01 2.86-7.44 6.32" /></svg>,
};

/* ══════════════════════════════════════════
   MAPS
══════════════════════════════════════════ */
const APP_ICON_MAP = { 'Figma': Icons.Figma, 'GitHub': Icons.Github, 'dribbble.com': Icons.Dribbble, 'Google Docs': Icons.Word, 'facebook.com': Icons.Facebook, 'VS Code': Icons.VSCode, 'youtube.com': Icons.YouTube, 'medium.com': Icons.Medium, 'Gmail': Icons.Mail };
const APP_COLOR_MAP = { 'Figma': '#f24e1e', 'GitHub': '#24292e', 'dribbble.com': '#ea4c89', 'Google Docs': '#1a73e8', 'facebook.com': '#1877f2', 'VS Code': '#007acc', 'youtube.com': '#ff0000', 'medium.com': '#333', 'Gmail': '#ea4335' };
const TOP_ICON_MAP = { 'Figma': Icons.Figma, 'VS Code': Icons.VSCode, 'Google Chrome': Icons.Chrome, 'Slack': Icons.Slack, 'Microsoft Word': Icons.Word };
const TOP_COLOR_MAP = { 'Figma': '#f24e1e', 'VS Code': '#007acc', 'Google Chrome': '#4285f4', 'Slack': '#4a154b', 'Microsoft Word': '#2b579a' };

/* ══════════════════════════════════════════
   DATA
══════════════════════════════════════════ */
const TODAY_ACTIVITIES = [
    { time: '10:30 AM', emp: 'John Smith', role: 'UI/UX Designer', avCls: '', activity: 'Worked on Dashboard Design', app: 'Figma', cat: 'productive', dur: '45m 20s', status: 'active' },
    { time: '10:28 AM', emp: 'Sarah Johnson', role: 'Developer', avCls: 'green-av', activity: 'Visited project repository', app: 'GitHub', cat: 'productive', dur: '12m 45s', status: 'active' },
    { time: '10:25 AM', emp: 'Michael Brown', role: 'Designer', avCls: 'orange-av', activity: 'Browsed design resources', app: 'dribbble.com', cat: 'neutral', dur: '8m 30s', status: 'active' },
    { time: '10:20 AM', emp: 'Emily Davis', role: 'Content Writer', avCls: '', activity: 'Working on Blog Content', app: 'Google Docs', cat: 'productive', dur: '25m 10s', status: 'active' },
    { time: '10:15 AM', emp: 'David Wilson', role: 'Marketing', avCls: 'green-av', activity: 'Visited social media', app: 'facebook.com', cat: 'unproductive', dur: '5m 15s', status: 'idle' },
];
const YESTERDAY_ACTIVITIES = [
    { time: '04:45 PM', emp: 'John Smith', role: 'UI/UX Designer', avCls: '', activity: 'Updated wireframes', app: 'Figma', cat: 'productive', dur: '30m 40s', status: 'active' },
    { time: '04:30 PM', emp: 'Sarah Johnson', role: 'Developer', avCls: 'green-av', activity: 'Code commit and push', app: 'VS Code', cat: 'productive', dur: '20m 15s', status: 'active' },
    { time: '04:10 PM', emp: 'Michael Brown', role: 'Designer', avCls: 'orange-av', activity: 'YouTube Tutorial', app: 'youtube.com', cat: 'unproductive', dur: '15m 30s', status: 'idle' },
    { time: '03:50 PM', emp: 'Emily Davis', role: 'Content Writer', avCls: '', activity: 'Research for blog', app: 'medium.com', cat: 'neutral', dur: '18m 45s', status: 'active' },
    { time: '03:30 PM', emp: 'David Wilson', role: 'Marketing', avCls: 'green-av', activity: 'Email Campaign Review', app: 'Gmail', cat: 'productive', dur: '22m 10s', status: 'active' },
];

const TOP_APPS = [
    { name: 'Figma', pct: 85, time: '3h 45m' },
    { name: 'VS Code', pct: 65, time: '2h 30m' },
    { name: 'Google Chrome', pct: 55, time: '2h 15m' },
    { name: 'Slack', pct: 35, time: '1h 25m' },
    { name: 'Microsoft Word', pct: 28, time: '1h 10m' },
];

const DONUT_SEGS = [
    { label: 'Productive', value: 68.6, color: '#43a047', sub: '856 (68.6%)' },
    { label: 'Neutral', value: 20.5, color: '#fb8c00', sub: '256 (20.5%)' },
    { label: 'Unproductive', value: 10.9, color: '#e53935', sub: '136 (10.9%)' },
];

/* ── Stat cards — same horizontal layout as Employees ── */
const STAT_CARDS = [
    { Icon: Icons.Activity, cls: 'purple', ic: '#9c27b0', label: 'Total Activities', value: '1,248', sub: '+18.6% vs yesterday', subCls: 'pos', pts: [30, 50, 40, 65, 55, 70, 60, 80, 70, 90], lc: '#b5179e' },
    { Icon: Icons.CheckCirc, cls: 'green', ic: '#43a047', label: 'Productive Activities', value: '856', sub: '68.6% of total', subCls: 'neu', pts: [25, 40, 35, 55, 45, 65, 50, 72, 65, 85], lc: '#43a047' },
    { Icon: Icons.MinusCirc, cls: 'orange', ic: '#fb8c00', label: 'Neutral Activities', value: '256', sub: '20.5% of total', subCls: 'neu', pts: [20, 25, 22, 28, 24, 26, 22, 28, 24, 25], lc: '#fb8c00' },
    { Icon: Icons.XCirc, cls: 'red', ic: '#e53935', label: 'Unproductive Activities', value: '136', sub: '10.9% of total', subCls: 'neg', pts: [15, 18, 16, 20, 14, 18, 16, 15, 14, 13], lc: '#e53935' },
];

const AV_COLORS = ['#9c27b0', '#b5179e', '#43a047', '#e65100', '#1565c0', '#c62828', '#0288d1', '#558b2f'];
const avColor = n => AV_COLORS[n.charCodeAt(0) % AV_COLORS.length];

/* ══════════════════════════════════════════
   SMALL COMPONENTS
══════════════════════════════════════════ */

/* Sparkline — trend line */
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

/* Proper arc donut */
function SmallDonut({ segs }) {
    const r = 34, cx = 46, cy = 46, sw = 12;
    let cumAngle = -90;
    const total = segs.reduce((s, x) => s + x.value, 0);
    const slices = segs.map(seg => {
        const angle = (seg.value / total) * 360;
        const startRad = (cumAngle * Math.PI) / 180;
        const endRad = ((cumAngle + angle) * Math.PI) / 180;
        const x1 = cx + r * Math.cos(startRad), y1 = cy + r * Math.sin(startRad);
        const x2 = cx + r * Math.cos(endRad), y2 = cy + r * Math.sin(endRad);
        const large = angle > 180 ? 1 : 0;
        cumAngle += angle;
        return { ...seg, x1, y1, x2, y2, large };
    });
    return (
        <svg width="92" height="92" viewBox="0 0 92 92" style={{ flexShrink: 0 }}>
            <circle cx={cx} cy={cy} r={r} fill="none" stroke="#f0e6f0" strokeWidth={sw} />
            {slices.map((s, i) => (
                <path key={i}
                    d={`M ${s.x1} ${s.y1} A ${r} ${r} 0 ${s.large} 1 ${s.x2} ${s.y2}`}
                    fill="none" stroke={s.color} strokeWidth={sw} strokeLinecap="butt"
                />
            ))}
            <text x={cx} y={cy - 5} textAnchor="middle" fontSize="12" fontWeight="700" fill="#2d1a3e" fontFamily="DM Sans,sans-serif">1,248</text>
            <text x={cx} y={cy + 8} textAnchor="middle" fontSize="9" fill="#b388b3" fontFamily="DM Sans,sans-serif">Total</text>
        </svg>
    );
}

/* App icon badge in table */
function AppIconBadge({ app }) {
    const I = APP_ICON_MAP[app] || Icons.Globe;
    const c = APP_COLOR_MAP[app] || '#6366f1';
    return <div className="act-app-icon-badge" style={{ background: c + '1a', color: c }}><I /></div>;
}

/* Custom select dropdown — styled with chevron */
function CustomSelect({ options, defaultIdx = 0 }) {
    const [open, setOpen] = useState(false);
    const [idx, setIdx] = useState(defaultIdx);
    return (
        <div className="act-custom-select" tabIndex={0} onBlur={() => setOpen(false)}>
            <button
                className="act-custom-select-btn"
                onClick={() => setOpen(o => !o)}
                type="button"
            >
                <span>{options[idx]}</span>
                <span className={`act-custom-chevron ${open ? 'open' : ''}`}><Icons.ChevDown /></span>
            </button>
            {open && (
                <ul className="act-custom-dropdown">
                    {options.map((o, i) => (
                        <li key={o}
                            className={`act-custom-option ${i === idx ? 'selected' : ''}`}
                            onMouseDown={() => { setIdx(i); setOpen(false); }}
                        >
                            {i === idx && <span className="act-option-check">✓</span>}
                            {o}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

/* Toolbar select — wider, with border */
function ToolbarSelect({ options }) {
    const [open, setOpen] = useState(false);
    const [idx, setIdx] = useState(0);
    return (
        <div className="act-tb-select" tabIndex={0} onBlur={() => setOpen(false)}>
            <button className="act-tb-select-btn" onClick={() => setOpen(o => !o)} type="button">
                <span>{options[idx]}</span>
                <span className={`act-custom-chevron ${open ? 'open' : ''}`}><Icons.ChevDown /></span>
            </button>
            {open && (
                <ul className="act-custom-dropdown">
                    {options.map((o, i) => (
                        <li key={o}
                            className={`act-custom-option ${i === idx ? 'selected' : ''}`}
                            onMouseDown={() => { setIdx(i); setOpen(false); }}
                        >
                            {i === idx && <span className="act-option-check">✓</span>}
                            {o}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

/* Table row */
function ActivityRow({ act }) {
    return (
        <tr>
            <td className="td-time">{act.time}</td>
            <td>
                <div className="act-emp-cell">
                    <div className={`act-emp-avatar ${act.avCls}`} style={{ background: avColor(act.emp) }}>
                        {act.emp.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                        <div className="act-emp-name">{act.emp}</div>
                        <div className="act-emp-role">{act.role}</div>
                    </div>
                </div>
            </td>
            <td className="td-activity">{act.activity}</td>
            <td>
                <div className="act-app-cell">
                    <AppIconBadge app={act.app} />
                    <span>{act.app}</span>
                </div>
            </td>
            <td>
                <span className={`act-cat-badge ${act.cat}`}>
                    {act.cat.charAt(0).toUpperCase() + act.cat.slice(1)}
                </span>
            </td>
            <td className="td-dur">{act.dur}</td>
            <td>
                <div className="act-status-dot">
                    <span className={`status-circle ${act.status}`} />
                    <span className={`status-label ${act.status}`}>
                        {act.status === 'active' ? 'Active' : 'Idle'}
                    </span>
                </div>
            </td>
        </tr>
    );
}

/* ══════════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════════ */
export default function Activity() {
    return (
        <div className="activity-page">

            {/* ── Toolbar — sticky, matches Employees toolbar ── */}
            <div className="act-toolbar">
                {/* Date range */}
                <button className="act-toolbar-date-btn">
                    <Icons.Calendar />
                    <span>May 20, 2024 – May 20, 2024</span>
                    <Icons.ChevDown />
                </button>

                {/* Selects group */}
                <ToolbarSelect options={['All Employees', 'John Smith', 'Sarah Johnson', 'Michael Brown', 'Emily Davis', 'David Wilson']} />
                <ToolbarSelect options={['All Departments', 'Design Team', 'Dev Team', 'Content Team', 'Marketing']} />
                <ToolbarSelect options={['All Activities', 'Productive', 'Neutral', 'Unproductive']} />

                <button className="act-filter-btn"><Icons.Filter /> Filters</button>

                {/* Push export right */}
                <div className="emp-toolbar-spacer" />
                <button className="act-export-btn"><Icons.Export /> Export</button>
            </div>

            {/* ── Stat Cards — horizontal icon + body + sparkline (Employees style) ── */}
            <div className="act-stat-cards">
                {STAT_CARDS.map((c, i) => (
                    <div className="act-stat-card" key={i}>
                        <div className={`act-stat-icon ${c.cls}`} style={{ color: c.ic }}>
                            <c.Icon />
                        </div>
                        <div className="act-stat-body">
                            <div className="act-stat-label">{c.label}</div>
                            <div className="act-stat-value">{c.value}</div>
                            <div className={`act-stat-sub ${c.subCls}`}>{c.sub}</div>
                        </div>
                        <SparkLine pts={c.pts} color={c.lc} />
                    </div>
                ))}
            </div>

            {/* ── Content ── */}
            <div className="act-content">

                {/* ══ Main ══ */}
                <div className="act-main">

                    {/* Timeline header + search */}
                    <div className="act-timeline-header">
                        <span className="act-timeline-title">Activity Timeline</span>
                    </div>

                    <div className="act-search-wrap">
                        <span className="act-search-icon"><Icons.Search /></span>
                        <input className="act-search-input" placeholder="Search activities..." />
                    </div>

                    {/* Table */}
                    <div className="act-table-card">
                        <div className="act-day-header">Today — May 20, 2024</div>
                        <table className="act-table">
                            <thead>
                                <tr>
                                    <th>Time</th><th>Employee</th><th>Activity</th>
                                    <th>Application / Website</th><th>Category</th>
                                    <th>Duration</th><th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {TODAY_ACTIVITIES.map((act, i) => <ActivityRow key={i} act={act} />)}
                            </tbody>
                        </table>

                        <div className="act-day-header">Yesterday — May 19, 2024</div>
                        <table className="act-table">
                            <thead>
                                <tr>
                                    <th>Time</th><th>Employee</th><th>Activity</th>
                                    <th>Application / Website</th><th>Category</th>
                                    <th>Duration</th><th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {YESTERDAY_ACTIVITIES.map((act, i) => <ActivityRow key={i} act={act} />)}
                            </tbody>
                        </table>
                    </div>

                    <button className="act-load-more">Load More Activities <Icons.LoadMore /></button>
                </div>

                {/* ══ Right Panel ══ */}
                <div className="act-right">

                    {/* Activity Summary */}
                    <div className="act-right-section">
                        <div className="act-right-title">
                            <span>Activity Summary</span>
                            <CustomSelect options={['Today', 'Yesterday', 'Last 7 days', 'Last 30 days']} />
                        </div>
                        <div className="act-donut-wrap">
                            <SmallDonut segs={DONUT_SEGS} />
                            <div className="act-donut-legend">
                                {DONUT_SEGS.map((s, i) => (
                                    <div className="act-legend-item" key={i}>
                                        <div className="act-legend-dot" style={{ background: s.color }} />
                                        <div className="act-legend-text">
                                            <strong>{s.label}</strong>
                                            <span>{s.sub}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Top Applications */}
                    <div className="act-right-section">
                        <div className="act-right-sub">
                            <span>Top Applications</span>
                            <CustomSelect options={['Today', 'Yesterday', 'Last 7 days']} />
                        </div>
                        <div className="act-top-apps">
                            {TOP_APPS.map((app, i) => {
                                const I = TOP_ICON_MAP[app.name] || Icons.Globe;
                                const c = TOP_COLOR_MAP[app.name] || '#6366f1';
                                return (
                                    <div className="act-app-row" key={i}>
                                        <div className="act-app-row-icon-wrap" style={{ background: c + '1a', color: c }}><I /></div>
                                        <div className="act-app-row-info">
                                            <div className="act-app-row-top">
                                                <span className="act-app-row-name">{app.name}</span>
                                                <span className="act-app-time">{app.time}</span>
                                            </div>
                                            <div className="act-app-bar-bg">
                                                <div className="act-app-bar-fill" style={{ width: `${app.pct}%` }} />
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        <button className="act-view-all-link">View All Applications <Icons.ArrowRight /></button>
                    </div>

                    {/* Activity Distribution */}
                    <div className="act-right-section">
                        <div className="act-right-sub">
                            <span>Activity Distribution</span>
                            <CustomSelect options={['Today', 'Yesterday', 'Last 7 days']} />
                        </div>
                        <div className="act-dist-legend">
                            {[{ c: '#43a047', l: 'Productive' }, { c: '#fb8c00', l: 'Neutral' }, { c: '#e53935', l: 'Unproductive' }].map(x => (
                                <div key={x.l} className="act-dist-legend-item">
                                    <span className="act-dist-dot" style={{ background: x.c }} />
                                    <span>{x.l}</span>
                                </div>
                            ))}
                        </div>
                        <div className="act-dist-chart-wrap">
                            <div className="act-dist-y">
                                <span>100%</span><span>75%</span><span>50%</span><span>25%</span><span>0</span>
                            </div>
                            <svg viewBox="0 0 220 88" width="100%" height="88" style={{ overflow: 'visible' }}>
                                {[0, 22, 44, 66, 88].map((y, i) => (
                                    <line key={i} x1="0" y1={y} x2="220" y2={y} stroke="#f0e6f0" strokeWidth="1" />
                                ))}
                                {[
                                    { data: [55, 70, 80, 72, 85, 78, 75, 80, 76, 82, 70, 60], color: '#43a047' },
                                    { data: [20, 25, 18, 22, 15, 20, 25, 18, 22, 15, 28, 30], color: '#fb8c00' },
                                    { data: [10, 8, 12, 10, 8, 12, 10, 8, 10, 12, 8, 10], color: '#e53935' },
                                ].map((line, li) => {
                                    const pts = line.data
                                        .map((v, i) => `${(i / (line.data.length - 1)) * 220},${86 - (v / 100) * 84}`)
                                        .join(' ');
                                    return (
                                        <g key={li}>
                                            <polyline points={pts} fill="none" stroke={line.color} strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round" />
                                            {line.data.map((v, i) => (
                                                <circle key={i}
                                                    cx={(i / (line.data.length - 1)) * 220}
                                                    cy={86 - (v / 100) * 84}
                                                    r="2.2" fill={line.color}
                                                />
                                            ))}
                                        </g>
                                    );
                                })}
                            </svg>
                        </div>
                        <div className="act-mini-chart-labels">
                            {['12 AM', '04 AM', '08 AM', '12 PM', '04 PM', '08 PM'].map(l => <span key={l}>{l}</span>)}
                        </div>
                    </div>

                    {/* Most Active Employees */}
                    <div className="act-right-section">
                        <div className="act-right-sub">
                            <span>Most Active Employees</span>
                            <CustomSelect options={['Today', 'Yesterday', 'Last 7 days']} />
                        </div>
                        <div className="act-active-list">
                            {[
                                { name: 'John Smith', time: '8h 45m', pct: 90 },
                                { name: 'Sarah Johnson', time: '7h 30m', pct: 72 },
                                { name: 'Emily Davis', time: '6h 20m', pct: 65 },
                            ].map((emp, i) => (
                                <div className="act-active-item" key={i}>
                                    <span className="act-active-num">{i + 1}</span>
                                    <div className="act-active-avatar" style={{ background: avColor(emp.name) }}>
                                        {emp.name.split(' ').map(n => n[0]).join('')}
                                    </div>
                                    <div className="act-active-info">
                                        <div className="act-active-name-row">
                                            <span className="act-active-name">{emp.name}</span>
                                            <span className="act-active-time">{emp.time}</span>
                                        </div>
                                        <div className="act-active-bar-bg">
                                            <div className="act-active-bar-fill" style={{ width: `${emp.pct}%` }} />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button className="act-view-full-link">View Full Report <Icons.ArrowRight /></button>
                    </div>

                </div>
            </div>
        </div>
    );
}