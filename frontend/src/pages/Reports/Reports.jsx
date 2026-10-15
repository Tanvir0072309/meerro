import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import "./Reports.css";

// ── SVG ICONS ──────────────────────────────────────────────────────────────
const Icons = {
    Home: () => <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>,
    ChevronRight: () => <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>,
    ChevronDown: () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>,
    ChevronLeft: () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>,
    ChevronRight2: () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>,
    Calendar: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>,
    Filter: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" /></svg>,
    Clock: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>,
    Search: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>,
    Eye: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>,
    Download: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>,
    MoreVertical: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="5" r="1" /><circle cx="12" cy="12" r="1" /><circle cx="12" cy="19" r="1" /></svg>,
    ArrowRight: () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>,
    TrendUp: () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" /></svg>,
    FileText: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /></svg>,
    Activity: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg>,
    Clock2: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>,
    BarChart: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" /></svg>,
    Briefcase: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg>,
    Users: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>,
    Settings: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3" /><path d="M19.07 4.93a10 10 0 0 1 1.41 1.41M4.93 4.93A10 10 0 0 0 3.52 6.34M19.07 19.07a10 10 0 0 1-1.41 1.41M4.93 19.07a10 10 0 0 0 1.41 1.41M22 12h-2M4 12H2M12 2V4M12 20v2" /></svg>,
    Check: () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>,
};

// ── DATA ───────────────────────────────────────────────────────────────────
const STAT_CARDS = [
    { label: "Total Reports", value: 28, sub: "+7 this week", subColor: "#16a34a", icon: "file", color: "#3b82f6", bg: "#eff6ff", sparkColor: "#3b82f6" },
    { label: "Generated Reports", value: 24, sub: "85.7% of total", subColor: "#6b7280", icon: "activity", color: "#8b5cf6", bg: "#f5f3ff", sparkColor: "#8b5cf6" },
    { label: "Downloaded Reports", value: 18, sub: "64.3% of total", subColor: "#6b7280", icon: "download", color: "#06b6d4", bg: "#ecfeff", sparkColor: "#06b6d4" },
    { label: "Scheduled Reports", value: 6, sub: "21.4% of total", subColor: "#6b7280", icon: "clock", color: "#f97316", bg: "#fff7ed", sparkColor: "#f97316" },
];

const CATEGORIES = [
    { label: "All Reports", count: 28, icon: "all", active: true },
    { label: "Activity Reports", count: 8, icon: "activity", active: false },
    { label: "Time Reports", count: 6, icon: "time", active: false },
    { label: "Productivity Reports", count: 5, icon: "productivity", active: false },
    { label: "Project Reports", count: 4, icon: "project", active: false },
    { label: "Attendance Reports", count: 3, icon: "attendance", active: false },
    { label: "System Reports", count: 2, icon: "system", active: false },
];

const CAT_ICON_MAP = {
    all: { Icon: Icons.FileText, color: "#3b82f6", bg: "#eff6ff" },
    activity: { Icon: Icons.Activity, color: "#8b5cf6", bg: "#f5f3ff" },
    time: { Icon: Icons.Clock2, color: "#06b6d4", bg: "#ecfeff" },
    productivity: { Icon: Icons.BarChart, color: "#10b981", bg: "#d1fae5" },
    project: { Icon: Icons.Briefcase, color: "#f59e0b", bg: "#fef3c7" },
    attendance: { Icon: Icons.Users, color: "#ef4444", bg: "#fee2e2" },
    system: { Icon: Icons.Settings, color: "#6b7280", bg: "#f3f4f6" },
};

const CAT_BADGE_COLOR = {
    Activity: { color: "#8b5cf6", bg: "#f5f3ff" },
    Time: { color: "#06b6d4", bg: "#ecfeff" },
    Productivity: { color: "#10b981", bg: "#d1fae5" },
    Project: { color: "#f59e0b", bg: "#fef3c7" },
    Attendance: { color: "#ef4444", bg: "#fee2e2" },
    System: { color: "#6b7280", bg: "#f3f4f6" },
};

const REPORTS = [
    { name: "Employee Activity Summary", category: "Activity", desc: "Overview of employee activities and engagement", genOn: "May 20, 2024\n10:30 AM", range: "May 14 - May 20, 2024\n(7 Days)", by: "John Smith", role: "Admin", avatar: "JS" },
    { name: "Work Time Analysis", category: "Time", desc: "Detailed analysis of work hours and time usage", genOn: "May 20, 2024\n09:15 AM", range: "May 13 - May 19, 2024\n(7 Days)", by: "Sarah Johnson", role: "Manager", avatar: "SJ" },
    { name: "Productivity Report", category: "Productivity", desc: "Productivity metrics and performance insights", genOn: "May 19, 2024\n06:45 PM", range: "May 12 - May 18, 2024\n(7 Days)", by: "Michael Brown", role: "HR Manager", avatar: "MB" },
    { name: "Project Progress Report", category: "Project", desc: "Status and progress of all active projects", genOn: "May 19, 2024\n04:20 PM", range: "Apr 20 - May 19, 2024\n(30 Days)", by: "Emily Davis", role: "Project Manager", avatar: "ED" },
    { name: "Attendance Summary", category: "Attendance", desc: "Employee attendance and punctuality report", genOn: "May 19, 2024\n11:30 AM", range: "May 12 - May 18, 2024\n(7 Days)", by: "David Wilson", role: "Admin", avatar: "DW" },
    { name: "Application Usage Report", category: "Activity", desc: "Applications and websites usage summary", genOn: "May 18, 2024\n08:10 PM", range: "May 11 - May 17, 2024\n(7 Days)", by: "John Smith", role: "Admin", avatar: "JS" },
    { name: "Screenshots Report", category: "System", desc: "Screenshots captured summary", genOn: "May 18, 2024\n05:50 PM", range: "May 11 - May 17, 2024\n(7 Days)", by: "Sarah Johnson", role: "Manager", avatar: "SJ" },
    { name: "Login & Logout Report", category: "System", desc: "Login, logout and idle time report", genOn: "May 18, 2024\n03:25 PM", range: "May 11 - May 17, 2024\n(7 Days)", by: "Michael Brown", role: "HR Manager", avatar: "MB" },
];

const TOP_REPORTS = [
    { name: "Employee Activity Summary", val: 12, max: 12 },
    { name: "Work Time Analysis", val: 10, max: 12 },
    { name: "Productivity Report", val: 8, max: 12 },
    { name: "Project Progress Report", val: 6, max: 12 },
    { name: "Attendance Summary", val: 4, max: 12 },
];

const RECENT_DOWNLOADS = [
    { name: "Employee Activity Summary", date: "May 20, 2024 10:30 AM", icon: "activity", color: "#3b82f6", bg: "#eff6ff" },
    { name: "Work Time Analysis", date: "May 20, 2024 09:15 AM", icon: "time", color: "#10b981", bg: "#d1fae5" },
    { name: "Productivity Report", date: "May 19, 2024 06:45 PM", icon: "all", color: "#8b5cf6", bg: "#f5f3ff" },
    { name: "Project Progress Report", date: "May 19, 2024 04:20 PM", icon: "project", color: "#f97316", bg: "#fff7ed" },
];

const DONUT_DATA = [
    { label: "Activity", pct: 28.6, count: 8, color: "#10b981" },
    { label: "Time", pct: 21.4, count: 6, color: "#06b6d4" },
    { label: "Productivity", pct: 17.9, count: 5, color: "#8b5cf6" },
    { label: "Project", pct: 14.3, count: 4, color: "#f97316" },
    { label: "Attendance", pct: 10.7, count: 3, color: "#ef4444" },
    { label: "System", pct: 7.1, count: 2, color: "#f9a8d4" },
];

const AVATAR_COLORS = {
    JS: { bg: "#e0f2fe", color: "#0369a1" },
    SJ: { bg: "#fce7f3", color: "#be185d" },
    MB: { bg: "#d1fae5", color: "#065f46" },
    ED: { bg: "#fef3c7", color: "#92400e" },
    DW: { bg: "#ede9fe", color: "#5b21b6" },
};

// ── SPARKLINE ───────────────────────────────────────────────────────────────
function Sparkline({ color, up }) {
    const points = up
        ? "0,18 10,14 20,16 30,10 40,12 50,6 60,8 70,4 80,6 90,2"
        : "0,8 10,12 20,6 30,14 40,10 50,16 60,12 70,18 80,14 90,10";
    return (
        <svg width="90" height="22" viewBox="0 0 90 22" fill="none">
            <polyline points={points} stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.85" />
        </svg>
    );
}

// ── DONUT CHART ─────────────────────────────────────────────────────────────
function DonutChart() {
    const R = 52, cx = 68, cy = 68, stroke = 18;
    const circ = 2 * Math.PI * R;
    let offset = 0;
    const segments = DONUT_DATA.map(d => {
        const dash = (d.pct / 100) * circ;
        const gap = circ - dash;
        const seg = { ...d, dashArray: `${dash - 2} ${gap + 2}`, dashOffset: -offset };
        offset += dash;
        return seg;
    });
    return (
        <div className="rp-donut-wrap">
            <svg width="136" height="136" viewBox="0 0 136 136">
                <circle cx={cx} cy={cy} r={R} fill="none" stroke="#f3f4f6" strokeWidth={stroke} />
                {segments.map((s, i) => (
                    <circle key={i} cx={cx} cy={cy} r={R} fill="none"
                        stroke={s.color} strokeWidth={stroke}
                        strokeDasharray={s.dashArray}
                        strokeDashoffset={s.dashOffset}
                        strokeLinecap="butt"
                        style={{ transition: "stroke-dasharray 0.5s ease" }}
                        transform={`rotate(-90 ${cx} ${cy})`}
                    />
                ))}
                <text x={cx} y={cy - 6} textAnchor="middle" fontSize="22" fontWeight="800" fill="#2d1a3e" fontFamily="DM Sans, sans-serif">28</text>
                <text x={cx} y={cy + 12} textAnchor="middle" fontSize="10" fill="#9ca3af" fontFamily="DM Sans, sans-serif">Total</text>
            </svg>
        </div>
    );
}

// ── CUSTOM DROPDOWN ──────────────────────────────────────────────────────────
function RpDropdown({ options, value, onChange }) {
    const [open, setOpen] = useState(false);
    const [rect, setRect] = useState(null);
    const btnRef = useRef(null);
    const dropRef = useRef(null);

    useEffect(() => {
        if (!open) return;
        const handler = e => {
            if (!btnRef.current?.contains(e.target) && !dropRef.current?.contains(e.target)) setOpen(false);
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, [open]);

    useEffect(() => {
        if (!open || !btnRef.current) return;
        const update = () => {
            const r = btnRef.current.getBoundingClientRect();
            setRect({ top: r.bottom + 4, left: r.left, width: Math.max(r.width, 130) });
        };
        update();
        window.addEventListener("scroll", update, true);
        window.addEventListener("resize", update);
        return () => { window.removeEventListener("scroll", update, true); window.removeEventListener("resize", update); };
    }, [open]);

    return (
        <div className="rp-dd-wrap">
            <button ref={btnRef} type="button" className="rp-dd-btn" onClick={() => setOpen(o => !o)}>
                <span>{value}</span><Icons.ChevronDown />
            </button>
            {open && rect && createPortal(
                <div ref={dropRef} className="rp-dd-menu" style={{ position: "fixed", top: rect.top, left: rect.left, width: rect.width, zIndex: 99999 }}>
                    {options.map(o => (
                        <div key={o} className={`rp-dd-item ${o === value ? "active" : ""}`}
                            onMouseDown={e => { e.preventDefault(); onChange(o); setOpen(false); }}>
                            {o === value && <Icons.Check />} {o}
                        </div>
                    ))}
                </div>,
                document.body
            )}
        </div>
    );
}

// ── FILTER DROPDOWN ──────────────────────────────────────────────────────────
function FilterSelect({ label, options }) {
    const [val, setVal] = useState(options[0]);
    const [open, setOpen] = useState(false);
    const [rect, setRect] = useState(null);
    const btnRef = useRef(null);
    const dropRef = useRef(null);

    useEffect(() => {
        if (!open) return;
        const handler = e => {
            if (!btnRef.current?.contains(e.target) && !dropRef.current?.contains(e.target)) setOpen(false);
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, [open]);

    useEffect(() => {
        if (!open || !btnRef.current) return;
        const update = () => {
            const r = btnRef.current.getBoundingClientRect();
            setRect({ top: r.bottom + 4, left: r.left, width: Math.max(r.width, 160) });
        };
        update();
        window.addEventListener("scroll", update, true);
        window.addEventListener("resize", update);
        return () => { window.removeEventListener("scroll", update, true); window.removeEventListener("resize", update); };
    }, [open]);

    return (
        <div className="rp-filter-dd-wrap">
            <button ref={btnRef} type="button" className="rp-filter-btn" onClick={() => setOpen(o => !o)}>
                <span>{val}</span><Icons.ChevronDown />
            </button>
            {open && rect && createPortal(
                <div ref={dropRef} className="rp-dd-menu" style={{ position: "fixed", top: rect.top, left: rect.left, width: rect.width, zIndex: 99999 }}>
                    {options.map(o => (
                        <div key={o} className={`rp-dd-item ${o === val ? "active" : ""}`}
                            onMouseDown={e => { e.preventDefault(); setVal(o); setOpen(false); }}>
                            {o === val && <Icons.Check />} {o}
                        </div>
                    ))}
                </div>,
                document.body
            )}
        </div>
    );
}

// ── CAT ICON ─────────────────────────────────────────────────────────────────
function CatIcon({ type }) {
    const { Icon, color, bg } = CAT_ICON_MAP[type] || CAT_ICON_MAP.all;
    return (
        <div className="rp-cat-icon" style={{ background: bg, color }}>
            <Icon />
        </div>
    );
}

// ── REPORT ROW ICON ──────────────────────────────────────────────────────────
function RowIcon({ category }) {
    const key = category.toLowerCase();
    const mapped = {
        activity: "activity", time: "time", productivity: "productivity",
        project: "project", attendance: "attendance", system: "system",
    };
    const { Icon, color, bg } = CAT_ICON_MAP[mapped[key]] || CAT_ICON_MAP.all;
    return (
        <div className="rp-row-icon" style={{ background: bg, color }}><Icon /></div>
    );
}

// ── MAIN COMPONENT ────────────────────────────────────────────────────────────
export default function Reports() {
    const [activeCategory, setActiveCategory] = useState(0);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [perPage] = useState(8);
    const [summaryPeriod, setSummaryPeriod] = useState("This Week");
    const [topPeriod, setTopPeriod] = useState("This Week");

    const filtered = REPORTS.filter(r =>
        (activeCategory === 0 || r.category === CATEGORIES[activeCategory].label.replace(" Reports", ""))
        && (r.name.toLowerCase().includes(search.toLowerCase()) || r.desc.toLowerCase().includes(search.toLowerCase()))
    );
    const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
    const displayed = filtered.slice((page - 1) * perPage, page * perPage);

    return (
        <div className="rp-page">
           

            {/* Filter Bar */}
            <div className="rp-filterbar">
                <div className="rp-date-range">
                    <Icons.Calendar />
                    <span>May 20, 2024 - May 20, 2024</span>
                </div>
                <div className="rp-filters-row">
                    <FilterSelect label="Department" options={["All Departments", "Engineering", "Marketing", "Sales", "HR", "Finance"]} />
                    <FilterSelect label="Employee" options={["All Employees", "John Smith", "Sarah Johnson", "Michael Brown", "Emily Davis"]} />
                    <FilterSelect label="Report" options={["All Reports", "Activity", "Time", "Productivity", "Project", "Attendance", "System"]} />
                    <button className="rp-filter-icon-btn"><Icons.Filter /> Filters</button>
                </div>
            </div>

            {/* Body: Main + Sidebar */}
            <div className="rp-body">
                {/* LEFT MAIN */}
                <div className="rp-main">

                    {/* Stat Cards */}
                    <div className="rp-stats-row">
                        {STAT_CARDS.map((s, i) => (
                            <div className="rp-stat-card" key={i}>
                                <div className="rp-stat-top">
                                    <div>
                                        <div className="rp-stat-label">{s.label}</div>
                                        <div className="rp-stat-value">{s.value}</div>
                                        <div className="rp-stat-sub" style={{ color: s.subColor }}>
                                            {i === 0 && <Icons.TrendUp />} {s.sub}
                                        </div>
                                    </div>
                                    <div className="rp-stat-icon" style={{ background: s.bg, color: s.color }}>
                                        {i === 0 && <Icons.FileText />}
                                        {i === 1 && <Icons.Activity />}
                                        {i === 2 && <Icons.Download />}
                                        {i === 3 && <Icons.Clock />}
                                    </div>
                                </div>
                                <div className="rp-stat-spark">
                                    <Sparkline color={s.sparkColor} up={i === 0} />
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Report Categories */}
                    <div className="rp-section-title">Report Categories</div>
                    <div className="rp-categories">
                        {CATEGORIES.map((c, i) => (
                            <div key={i} className={`rp-cat-card ${activeCategory === i ? "active" : ""}`}
                                onClick={() => { setActiveCategory(i); setPage(1); }}>
                                <CatIcon type={c.icon} />
                                <div className="rp-cat-label">{c.label}</div>
                                <div className="rp-cat-count">{c.count} Reports</div>
                            </div>
                        ))}
                    </div>

                    {/* Reports List */}
                    <div className="rp-list-header">
                        <div className="rp-list-title">Reports List</div>
                        <div className="rp-search-wrap">
                            <Icons.Search />
                            <input className="rp-search" placeholder="Search reports..." value={search}
                                onChange={e => { setSearch(e.target.value); setPage(1); }} />
                        </div>
                    </div>

                    <div className="rp-table-wrap">
                        <table className="rp-table">
                            <thead>
                                <tr>
                                    <th>Report Name</th>
                                    <th>Category</th>
                                    <th>Description</th>
                                    <th>Generated On</th>
                                    <th>Date Range</th>
                                    <th>Generated By</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {displayed.map((r, i) => {
                                    const badge = CAT_BADGE_COLOR[r.category] || { color: "#6b7280", bg: "#f3f4f6" };
                                    const av = AVATAR_COLORS[r.avatar] || { bg: "#e5e7eb", color: "#374151" };
                                    return (
                                        <tr key={i}>
                                            <td>
                                                <div className="rp-row-name-cell">
                                                    <RowIcon category={r.category} />
                                                    <span className="rp-row-name">{r.name}</span>
                                                </div>
                                            </td>
                                            <td>
                                                <span className="rp-badge" style={{ color: badge.color, background: badge.bg }}>
                                                    {r.category}
                                                </span>
                                            </td>
                                            <td><span className="rp-desc">{r.desc}</span></td>
                                            <td>
                                                <div className="rp-date-cell">{r.genOn.split("\n").map((l, j) => <div key={j}>{l}</div>)}</div>
                                            </td>
                                            <td>
                                                <div className="rp-date-cell">{r.range.split("\n").map((l, j) => <div key={j} className={j === 1 ? "rp-range-sub" : ""}>{l}</div>)}</div>
                                            </td>
                                            <td>
                                                <div className="rp-by-cell">
                                                    <div className="rp-avatar" style={{ background: av.bg, color: av.color }}>{r.avatar}</div>
                                                    <div>
                                                        <div className="rp-by-name">{r.by}</div>
                                                        <div className="rp-by-role">{r.role}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="rp-actions">
                                                    <button className="rp-action-btn" title="View"><Icons.Eye /></button>
                                                    <button className="rp-action-btn" title="Download"><Icons.Download /></button>
                                                    <button className="rp-action-btn" title="More"><Icons.MoreVertical /></button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="rp-pagination">
                        <div className="rp-pagination-info">
                            Showing {Math.min((page - 1) * perPage + 1, filtered.length)} to {Math.min(page * perPage, filtered.length)} of {filtered.length} reports
                        </div>
                        <div className="rp-pagination-pages">
                            <button className="rp-page-btn" disabled={page === 1} onClick={() => setPage(p => p - 1)}><Icons.ChevronLeft /></button>
                            {[...Array(Math.min(totalPages, 4))].map((_, i) => (
                                <button key={i + 1} className={`rp-page-btn ${page === i + 1 ? "active" : ""}`} onClick={() => setPage(i + 1)}>{i + 1}</button>
                            ))}
                            {totalPages > 5 && <span className="rp-page-dots">...</span>}
                            {totalPages > 4 && (
                                <button className={`rp-page-btn ${page === totalPages ? "active" : ""}`} onClick={() => setPage(totalPages)}>{totalPages}</button>
                            )}
                            <button className="rp-page-btn" disabled={page === totalPages} onClick={() => setPage(p => p + 1)}><Icons.ChevronRight2 /></button>
                        </div>
                        <div className="rp-per-page">
                            Show 8 per page <Icons.ChevronDown />
                        </div>
                    </div>
                </div>

                {/* RIGHT SIDEBAR */}
                <div className="rp-sidebar">
                    {/* Reports Summary */}
                    <div className="rp-sb-card">
                        <div className="rp-sb-card-header">
                            <span className="rp-sb-card-title">Reports Summary</span>
                            <RpDropdown options={["This Week", "Last Week", "This Month"]} value={summaryPeriod} onChange={setSummaryPeriod} />
                        </div>
                        <div className="rp-donut-section">
                            <DonutChart />
                            <div className="rp-donut-legend">
                                {DONUT_DATA.map((d, i) => (
                                    <div key={i} className="rp-legend-row">
                                        <span className="rp-legend-dot" style={{ background: d.color }} />
                                        <span className="rp-legend-label">{d.label}</span>
                                        <span className="rp-legend-count">{d.count} ({d.pct}%)</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Top Reports */}
                    <div className="rp-sb-card">
                        <div className="rp-sb-card-header">
                            <span className="rp-sb-card-title">Top Reports</span>
                            <RpDropdown options={["This Week", "Last Week", "This Month"]} value={topPeriod} onChange={setTopPeriod} />
                        </div>
                        <div className="rp-top-reports">
                            {TOP_REPORTS.map((r, i) => (
                                <div key={i} className="rp-top-row">
                                    <span className="rp-top-num">{i + 1}</span>
                                    <div className="rp-top-info">
                                        <span className="rp-top-name">{r.name}</span>
                                        <div className="rp-top-bar-wrap">
                                            <div className="rp-top-bar" style={{ width: `${(r.val / r.max) * 100}%` }} />
                                        </div>
                                    </div>
                                    <span className="rp-top-val">{r.val}</span>
                                </div>
                            ))}
                        </div>
                        <button className="rp-view-all-btn">View All Reports <Icons.ArrowRight /></button>
                    </div>

                    {/* Recent Downloads */}
                    <div className="rp-sb-card">
                        <div className="rp-sb-card-header">
                            <span className="rp-sb-card-title">Recent Downloads</span>
                            <button className="rp-view-all-link">View All</button>
                        </div>
                        <div className="rp-downloads">
                            {RECENT_DOWNLOADS.map((d, i) => {
                                const { Icon, color, bg } = CAT_ICON_MAP[d.icon] || CAT_ICON_MAP.all;
                                return (
                                    <div key={i} className="rp-dl-row">
                                        <div className="rp-dl-icon" style={{ background: bg, color }}><Icon /></div>
                                        <div className="rp-dl-info">
                                            <div className="rp-dl-name">{d.name}</div>
                                            <div className="rp-dl-date">{d.date}</div>
                                        </div>
                                        <button className="rp-dl-btn"><Icons.Download /></button>
                                    </div>
                                );
                            })}
                        </div>
                        <button className="rp-view-all-btn">View All Downloads <Icons.ArrowRight /></button>
                    </div>
                </div>
            </div>
        </div>
    );
}