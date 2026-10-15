import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import "./Dailyanalysis.css";

// ── SVG ICONS ──────────────────────────────────────────────────────────────
const Icons = {
    Home: () => <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>,
    ChevronRight: () => <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>,
    ChevronLeft: () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>,
    ChevronRight2: () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>,
    ChevronDown: () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>,
    Calendar: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>,
    Filter: () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" /></svg>,
    Download: () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>,
    Clock: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>,
    TrendUp: () => <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" /></svg>,
    TrendDown: () => <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 18 13.5 8.5 8.5 13.5 1 6" /><polyline points="17 18 23 18 23 12" /></svg>,
    BarChart2: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" /></svg>,
    Target: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /></svg>,
    Users: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>,
    Coffee: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8h1a4 4 0 0 1 0 8h-1" /><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" /><line x1="6" y1="1" x2="6" y2="4" /><line x1="10" y1="1" x2="10" y2="4" /><line x1="14" y1="1" x2="14" y2="4" /></svg>,
    ArrowRight: () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>,
    Check: () => <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>,
    Keyboard: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="6" width="20" height="12" rx="2" /><line x1="6" y1="10" x2="6" y2="10" /><line x1="10" y1="10" x2="10" y2="10" /><line x1="14" y1="10" x2="14" y2="10" /><line x1="18" y1="10" x2="18" y2="10" /><line x1="6" y1="14" x2="18" y2="14" /></svg>,
    Mouse: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="7" /><line x1="12" y1="6" x2="12" y2="10" /></svg>,
    Monitor: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" /></svg>,
    ZapOff: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="12.41 6.75 13 2 10.57 4.92" /><polyline points="18.57 12.91 21 10 15.66 10" /><polyline points="8 8 3 14 12 14 11 22 16 16" /><line x1="1" y1="1" x2="23" y2="23" /></svg>,

    // ── DEPARTMENT ICONS ────────────────────────────────────────────────────
    Palette: () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="13.5" cy="6.5" r="1.5" /><circle cx="17.5" cy="10.5" r="1.5" /><circle cx="8.5" cy="7.5" r="1.5" /><circle cx="6.5" cy="12.5" r="1.5" /><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c1.85 0 3-.5 3-2v-1.5c0-.83.67-1.5 1.5-1.5H18c2.21 0 4-1.79 4-4C22 6.48 17.52 2 12 2z" /></svg>,
    Code: () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>,
    Megaphone: () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 11l19-9-9 19-2-8-8-2z" /></svg>,
    DollarSign: () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>,
    Headphones: () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 18v-6a9 9 0 0 1 18 0v6" /><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3z" /><path d="M3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" /></svg>,
    UserGroup: () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>,

    // ── APP ICONS ────────────────────────────────────────────────────────────
    Globe: () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>,
    FileCode: () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><polyline points="10 13 8 15 10 17" /><polyline points="14 13 16 15 14 17" /></svg>,
    PenTool: () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19l7-7 3 3-7 7-3-3z" /><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" /><path d="M2 2l7.586 7.586" /><circle cx="11" cy="11" r="2" /></svg>,
    FileText: () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /></svg>,
    MessageSquare: () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>,
};

// ── DEPT CONFIG ─────────────────────────────────────────────────────────────
const DEPT_CONFIG = {
    "UI/UX Design": { Icon: Icons.Palette, color: "#8b5cf6", bg: "#f5f3ff" },
    "Development": { Icon: Icons.Code, color: "#3b82f6", bg: "#eff6ff" },
    "Marketing": { Icon: Icons.Megaphone, color: "#b5179e", bg: "#fdf0fc" },
    "Sales": { Icon: Icons.DollarSign, color: "#10b981", bg: "#d1fae5" },
    "Support": { Icon: Icons.Headphones, color: "#f97316", bg: "#fff7ed" },
    "HR": { Icon: Icons.UserGroup, color: "#06b6d4", bg: "#ecfeff" },
};

// ── APP CONFIG ───────────────────────────────────────────────────────────────
const APP_CONFIG = [
    { Icon: Icons.Globe, color: "#ef4444", bg: "#fee2e2" },
    { Icon: Icons.FileCode, color: "#3b82f6", bg: "#eff6ff" },
    { Icon: Icons.PenTool, color: "#8b5cf6", bg: "#f5f3ff" },
    { Icon: Icons.FileText, color: "#1d4ed8", bg: "#dbeafe" },
    { Icon: Icons.MessageSquare, color: "#f97316", bg: "#fff7ed" },
];

// ── DATA ───────────────────────────────────────────────────────────────────
const STAT_CARDS = [
    { label: "Total Work Time", value: "512h 45m", sub: "+6.8% vs yesterday", up: true, icon: "clock", color: "#3b82f6", bg: "#eff6ff" },
    { label: "Avg Productivity", value: "78%", sub: "+5.6% vs yesterday", up: true, icon: "chart", color: "#10b981", bg: "#d1fae5" },
    { label: "Active Employees", value: "96", sub: "75% of total", up: null, icon: "target", color: "#f97316", bg: "#fff7ed" },
    { label: "Break Time", value: "42h 15m", sub: "-3.2% vs yesterday", up: false, icon: "coffee", color: "#8b5cf6", bg: "#f5f3ff" },
];

const DEPT_DATA = [
    { dept: "UI/UX Design", time: "78h 30m", prod: 85, active: "12 / 15", tasks: "18 / 22", trendUp: true },
    { dept: "Development", time: "142h 20m", prod: 76, active: "25 / 30", tasks: "34 / 42", trendUp: null },
    { dept: "Marketing", time: "64h 15m", prod: 74, active: "10 / 12", tasks: "12 / 18", trendUp: false },
    { dept: "Sales", time: "58h 40m", prod: 81, active: "8 / 10", tasks: "15 / 20", trendUp: true },
    { dept: "Support", time: "43h 10m", prod: 72, active: "6 / 8", tasks: "8 / 12", trendUp: false },
    { dept: "HR", time: "28h 50m", prod: 68, active: "4 / 5", tasks: "5 / 8", trendUp: null },
];

const EMP_DATA = [
    { name: "John Smith", avatar: "JS", av: { bg: "#e0f2fe", color: "#0369a1" }, time: "8h 45m", prod: 92, tasks: "12 / 14", active: "7h 50m", idle: "55m", trendUp: true },
    { name: "Emily Davis", avatar: "ED", av: { bg: "#fce7f3", color: "#be185d" }, time: "8h 10m", prod: 88, tasks: "10 / 12", active: "7h 20m", idle: "50m", trendUp: true },
    { name: "Michael Brown", avatar: "MB", av: { bg: "#d1fae5", color: "#065f46" }, time: "7h 30m", prod: 85, tasks: "9 / 11", active: "6h 40m", idle: "50m", trendUp: null },
    { name: "Sarah Johnson", avatar: "SJ", av: { bg: "#fef3c7", color: "#92400e" }, time: "7h 05m", prod: 80, tasks: "8 / 10", active: "6h 10m", idle: "55m", trendUp: false },
    { name: "David Wilson", avatar: "DW", av: { bg: "#ede9fe", color: "#5b21b6" }, time: "6h 50m", prod: 78, tasks: "7 / 9", active: "6h 00m", idle: "50m", trendUp: false },
];

const TOP_PRODUCTIVE = [
    { name: "John Smith", val: 92, av: { bg: "#e0f2fe", color: "#0369a1" }, avatar: "JS" },
    { name: "Emily Davis", val: 88, av: { bg: "#fce7f3", color: "#be185d" }, avatar: "ED" },
    { name: "Michael Brown", val: 85, av: { bg: "#d1fae5", color: "#065f46" }, avatar: "MB" },
    { name: "Sarah Johnson", val: 80, av: { bg: "#fef3c7", color: "#92400e" }, avatar: "SJ" },
    { name: "David Wilson", val: 78, av: { bg: "#ede9fe", color: "#5b21b6" }, avatar: "DW" },
];

const LEAST_PRODUCTIVE = [
    { name: "Daniel Thomas", val: 42, av: { bg: "#fee2e2", color: "#991b1b" }, avatar: "DT" },
    { name: "Jessica Martinez", val: 45, av: { bg: "#fef3c7", color: "#92400e" }, avatar: "JM" },
    { name: "James Anderson", val: 48, av: { bg: "#f0fdf4", color: "#166534" }, avatar: "JA" },
    { name: "Robert Taylor", val: 50, av: { bg: "#eff6ff", color: "#1e40af" }, avatar: "RT" },
    { name: "William Clark", val: 52, av: { bg: "#fdf4ff", color: "#7e22ce" }, avatar: "WC" },
];

const DAILY_SUMMARY = [
    { label: "Total Work Time", val: "512h 45m", change: "+6.8%", up: true, color: "#3b82f6" },
    { label: "Avg Productivity", val: "78%", change: "+5.6%", up: true, color: "#10b981" },
    { label: "Active Employees", val: "96", change: "75%", up: null, color: "#f97316" },
    { label: "Tasks Completed", val: "142", change: "+18", up: true, color: "#8b5cf6" },
    { label: "Screenshots", val: "1,248", change: "+142", up: true, color: "#06b6d4" },
    { label: "Applications Used", val: "86", change: "-3", up: false, color: "#ef4444" },
];

const ACTIVITY_BREAKDOWN = [
    { label: "Keyboard Activity", pct: 65, color: "#10b981" },
    { label: "Mouse Activity", pct: 20, color: "#3b82f6" },
    { label: "Application Usage", pct: 10, color: "#f97316" },
    { label: "Idle Time", pct: 5, color: "#8b5cf6" },
];

const MOST_USED_APPS = [
    { name: "Google Chrome", time: "6h 30m", color: "#ef4444", bg: "#fee2e2" },
    { name: "VS Code", time: "5h 20m", color: "#3b82f6", bg: "#eff6ff" },
    { name: "Figma", time: "4h 10m", color: "#8b5cf6", bg: "#f5f3ff" },
    { name: "Microsoft Word", time: "2h 40m", color: "#1d4ed8", bg: "#dbeafe" },
    { name: "Slack", time: "1h 30m", color: "#f97316", bg: "#fff7ed" },
];

const WORK_DIST = [
    { label: "Focused Work", time: "312h 20m", pct: 60.9, color: "#10b981" },
    { label: "Meetings", time: "98h 45m", pct: 19.3, color: "#3b82f6" },
    { label: "Other Work", time: "67h 30m", pct: 13.2, color: "#f97316" },
    { label: "Break Time", time: "34h 10m", pct: 6.6, color: "#8b5cf6" },
];

// ── SPARKLINE ────────────────────────────────────────────────────────────────
function Sparkline({ color, up }) {
    const pts = up === true
        ? "0,18 15,14 30,16 45,9 60,12 75,5 90,7"
        : up === false
            ? "0,7 15,11 30,7 45,13 60,9 75,15 90,12"
            : "0,11 15,9 30,13 45,8 60,14 75,10 90,12";
    return (
        <svg width="90" height="22" viewBox="0 0 90 22" fill="none">
            <polyline points={pts} stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.85" />
        </svg>
    );
}

// ── MINI SPARKLINE ────────────────────────────────────────────────────────────
function MiniSparkline({ up }) {
    const pts = up === true ? "0,10 8,7 16,8 24,3 32,5"
        : up === false ? "0,3 8,6 16,4 24,8 32,7"
            : "0,5 8,8 16,5 24,9 32,6";
    const color = up === true ? "#10b981" : up === false ? "#f97316" : "#06b6d4";
    return (
        <svg width="32" height="12" viewBox="0 0 32 12" fill="none">
            <polyline points={pts} stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

// ── DONUT CHART ───────────────────────────────────────────────────────────────
function DonutChart() {
    const R = 68, cx = 90, cy = 90, sw = 22;
    const circ = 2 * Math.PI * R;
    let offset = 0;
    const segs = WORK_DIST.map(d => {
        const dash = (d.pct / 100) * circ;
        const seg = { ...d, dashArray: `${dash - 2} ${circ - dash + 2}`, dashOffset: -offset };
        offset += dash;
        return seg;
    });
    return (
        <svg width="180" height="180" viewBox="0 0 180 180">
            <circle cx={cx} cy={cy} r={R} fill="none" stroke="#f3f4f6" strokeWidth={sw} />
            {segs.map((s, i) => (
                <circle key={i} cx={cx} cy={cy} r={R} fill="none"
                    stroke={s.color} strokeWidth={sw}
                    strokeDasharray={s.dashArray} strokeDashoffset={s.dashOffset}
                    strokeLinecap="butt" transform={`rotate(-90 ${cx} ${cy})`}
                    style={{ transition: "all 0.5s ease" }}
                />
            ))}
            <text x={cx} y={cy - 8} textAnchor="middle" fontSize="13" fontWeight="800" fill="#2d1a3e" fontFamily="DM Sans,sans-serif">512h 45m</text>
            <text x={cx} y={cy + 10} textAnchor="middle" fontSize="10" fill="#9ca3af" fontFamily="DM Sans,sans-serif">Total</text>
        </svg>
    );
}

// ── LINE CHART ────────────────────────────────────────────────────────────────
function ProductivityChart() {
    const W = 420, H = 160, pad = { t: 10, r: 10, b: 28, l: 36 };
    const iW = W - pad.l - pad.r, iH = H - pad.t - pad.b;
    const times = ["12 AM", "04 AM", "08 AM", "12 PM", "04 PM", "08 PM", "12 AM"];
    const lines = [
        { label: "Productive", color: "#10b981", pts: [72, 75, 80, 82, 78, 76, 74] },
        { label: "Neutral", color: "#f59e0b", pts: [48, 50, 48, 52, 50, 48, 50] },
        { label: "Unproductive", color: "#ef4444", pts: [25, 28, 22, 26, 28, 24, 26] },
        { label: "Inactive", color: "#9ca3af", pts: [10, 8, 12, 8, 10, 12, 10] },
    ];
    const yVals = [0, 25, 50, 75, 100];
    const xScale = i => pad.l + (i / (lines[0].pts.length - 1)) * iW;
    const yScale = v => pad.t + iH - (v / 100) * iH;
    return (
        <svg width="95%" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" style={{ display: "block" }}>
            {yVals.map(v => (
                <g key={v}>
                    <line x1={pad.l} y1={yScale(v)} x2={W - pad.r} y2={yScale(v)} stroke="#f0e6f0" strokeWidth="1" strokeDasharray="4 3" />
                    <text x={pad.l - 6} y={yScale(v) + 4} textAnchor="end" fontSize="9" fill="#9ca3af" fontFamily="DM Sans,sans-serif">{v}%</text>
                </g>
            ))}
            {lines.map((ln, li) => {
                const d = ln.pts.map((v, i) => `${i === 0 ? "M" : "L"}${xScale(i)},${yScale(v)}`).join(" ");
                return (
                    <g key={li}>
                        <path d={d} stroke={ln.color} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                        {ln.pts.map((v, i) => <circle key={i} cx={xScale(i)} cy={yScale(v)} r="3" fill={ln.color} stroke="#fff" strokeWidth="1.5" />)}
                    </g>
                );
            })}
            {times.map((t, i) => (
                <text key={i} x={xScale(i)} y={H - 6} textAnchor="middle" fontSize="9" fill="#9ca3af" fontFamily="DM Sans,sans-serif">{t}</text>
            ))}
        </svg>
    );
}

// ── DROPDOWN ──────────────────────────────────────────────────────────────────
function SmallDropdown({ options, value, onChange }) {
    const [open, setOpen] = useState(false);
    const [rect, setRect] = useState(null);
    const btnRef = useRef(null);
    const dropRef = useRef(null);
    useEffect(() => {
        if (!open) return;
        const h = e => { if (!btnRef.current?.contains(e.target) && !dropRef.current?.contains(e.target)) setOpen(false); };
        document.addEventListener("mousedown", h);
        return () => document.removeEventListener("mousedown", h);
    }, [open]);
    useEffect(() => {
        if (!open || !btnRef.current) return;
        const update = () => { const r = btnRef.current.getBoundingClientRect(); setRect({ top: r.bottom + 4, left: r.left, width: Math.max(r.width, 120) }); };
        update();
        window.addEventListener("scroll", update, true); window.addEventListener("resize", update);
        return () => { window.removeEventListener("scroll", update, true); window.removeEventListener("resize", update); };
    }, [open]);
    return (
        <div className="da-dd-wrap">
            <button ref={btnRef} type="button" className="da-dd-btn" onClick={() => setOpen(o => !o)}>
                <span>{value}</span><Icons.ChevronDown />
            </button>
            {open && rect && createPortal(
                <div ref={dropRef} className="da-dd-menu" style={{ position: "fixed", top: rect.top, left: rect.left, width: rect.width, zIndex: 99999 }}>
                    {options.map(o => (
                        <div key={o} className={`da-dd-item ${o === value ? "active" : ""}`}
                            onMouseDown={e => { e.preventDefault(); onChange(o); setOpen(false); }}>
                            {o === value && <Icons.Check />} {o}
                        </div>
                    ))}
                </div>, document.body
            )}
        </div>
    );
}

// ── FILTER SELECT ─────────────────────────────────────────────────────────────
function FilterSelect({ options }) {
    const [val, setVal] = useState(options[0]);
    const [open, setOpen] = useState(false);
    const [rect, setRect] = useState(null);
    const btnRef = useRef(null);
    const dropRef = useRef(null);
    useEffect(() => {
        if (!open) return;
        const h = e => { if (!btnRef.current?.contains(e.target) && !dropRef.current?.contains(e.target)) setOpen(false); };
        document.addEventListener("mousedown", h);
        return () => document.removeEventListener("mousedown", h);
    }, [open]);
    useEffect(() => {
        if (!open || !btnRef.current) return;
        const update = () => { const r = btnRef.current.getBoundingClientRect(); setRect({ top: r.bottom + 4, left: r.left, width: Math.max(r.width, 160) }); };
        update();
        window.addEventListener("scroll", update, true); window.addEventListener("resize", update);
        return () => { window.removeEventListener("scroll", update, true); window.removeEventListener("resize", update); };
    }, [open]);
    return (
        <div className="da-filter-wrap">
            <button ref={btnRef} type="button" className="da-filter-btn" onClick={() => setOpen(o => !o)}>
                <span>{val}</span><Icons.ChevronDown />
            </button>
            {open && rect && createPortal(
                <div ref={dropRef} className="da-dd-menu" style={{ position: "fixed", top: rect.top, left: rect.left, width: rect.width, zIndex: 99999 }}>
                    {options.map(o => (
                        <div key={o} className={`da-dd-item ${o === val ? "active" : ""}`}
                            onMouseDown={e => { e.preventDefault(); setVal(o); setOpen(false); }}>
                            {o === val && <Icons.Check />} {o}
                        </div>
                    ))}
                </div>, document.body
            )}
        </div>
    );
}

// ── PROD BAR ──────────────────────────────────────────────────────────────────
function ProdBar({ val }) {
    const color = val >= 80 ? "#10b981" : val >= 65 ? "#f59e0b" : "#ef4444";
    return (
        <div className="da-prod-bar-wrap">
            <div className="da-prod-bar" style={{ width: `${val}%`, background: color }} />
        </div>
    );
}

// ── MAIN ─────────────────────────────────────────────────────────────────────
export default function DailyAnalysis() {
    const [summaryPeriod, setSummaryPeriod] = useState("Today");
    const [prodPeriod, setProdPeriod] = useState("Today");
    const [distPeriod, setDistPeriod] = useState("Today");
    const [actPeriod, setActPeriod] = useState("Today");
    const [appPeriod, setAppPeriod] = useState("Today");
    const [topPeriod, setTopPeriod] = useState("Today");
    const [leastPeriod, setLeastPeriod] = useState("Today");
    const [empPage, setEmpPage] = useState(1);
    const PER = 5, total = 96, totalPages = 20;
    const PERIODS = ["Today", "Yesterday", "This Week", "This Month"];

    return (
        <div className="da-page">

            {/* FILTER BAR — export button moved here, topbar removed */}
            <div className="da-filterbar">
                <div className="da-date-btn"><Icons.Calendar /><span>May 20, 2024</span></div>
                <FilterSelect options={["All Departments", "Engineering", "Marketing", "Sales", "HR", "Finance"]} />
                <FilterSelect options={["All Employees", "John Smith", "Emily Davis", "Michael Brown", "Sarah Johnson"]} />
                <button className="da-filter-icon-btn"><Icons.Filter /> Filters</button>
                <div style={{ flex: 1 }} />
                <button className="da-export-btn"><Icons.Download /> Export Report</button>
            </div>

            {/* BODY */}
            <div className="da-body">

                {/* ══ MAIN ══ */}
                <div className="da-main">

                    {/* Stat Cards */}
                    <div className="da-stats-grid">
                        {STAT_CARDS.map((s, i) => (
                            <div className="da-stat-card" key={i}>
                                <div className="da-stat-top">
                                    <div>
                                        <div className="da-stat-label">{s.label}</div>
                                        <div className="da-stat-value">{s.value}</div>
                                        <div className={`da-stat-sub ${s.up === true ? "up" : s.up === false ? "down" : "neutral"}`}>
                                            {s.up === true && <Icons.TrendUp />}
                                            {s.up === false && <Icons.TrendDown />}
                                            {s.sub}
                                        </div>
                                    </div>
                                    <div className="da-stat-icon" style={{ background: s.bg, color: s.color }}>
                                        {i === 0 && <Icons.Clock />}
                                        {i === 1 && <Icons.BarChart2 />}
                                        {i === 2 && <Icons.Target />}
                                        {i === 3 && <Icons.Coffee />}
                                    </div>
                                </div>
                                <div className="da-stat-spark"><Sparkline color={s.color} up={s.up} /></div>
                            </div>
                        ))}
                    </div>

                    {/* Charts Row */}
                    <div className="da-charts-row">
                        <div className="da-card da-chart-card">
                            <div className="da-card-header">
                                <span className="da-card-title">Productivity Over Time</span>
                                <SmallDropdown options={PERIODS} value={prodPeriod} onChange={setProdPeriod} />
                            </div>
                            <div className="da-prod-legend">
                                {[{ l: "Productive", c: "#10b981" }, { l: "Neutral", c: "#f59e0b" }, { l: "Unproductive", c: "#ef4444" }, { l: "Inactive", c: "#9ca3af" }].map((x, i) => (
                                    <div key={i} className="da-legend-item">
                                        <span className="da-legend-dot" style={{ background: x.c }} />{x.l}
                                    </div>
                                ))}
                            </div>
                            <div className="da-chart-area"><ProductivityChart /></div>
                        </div>

                        <div className="da-card da-donut-card">
                            <div className="da-card-header">
                                <span className="da-card-title">Work Time Distribution</span>
                                <SmallDropdown options={PERIODS} value={distPeriod} onChange={setDistPeriod} />
                            </div>
                            <div className="da-donut-wrap">
                                <DonutChart />
                                <div className="da-donut-legend">
                                    {WORK_DIST.map((d, i) => (
                                        <div key={i} className="da-dist-item">
                                            <span className="da-dist-dot" style={{ background: d.color }} />
                                            <div>
                                                <div className="da-dist-label">{d.label}</div>
                                                <div className="da-dist-time">{d.time} ({d.pct}%)</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Department Analysis */}
                    <div className="da-card">
                        <div className="da-card-header">
                            <span className="da-card-title">Department Analysis</span>
                        </div>
                        <div className="da-table-wrap">
                            <table className="da-table">
                                <thead>
                                    <tr>
                                        <th>Department</th>
                                        <th>Total Work Time</th>
                                        <th>Avg Productivity</th>
                                        <th>Active Employees</th>
                                        <th>Tasks Completed</th>
                                        <th>Trend</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {DEPT_DATA.map((d, i) => {
                                        const cfg = DEPT_CONFIG[d.dept] || { Icon: Icons.Users, color: "#6b7280", bg: "#f3f4f6" };
                                        return (
                                            <tr key={i}>
                                                <td>
                                                    <div className="da-dept-cell">
                                                        <div className="da-dept-icon-wrap" style={{ background: cfg.bg, color: cfg.color }}>
                                                            <cfg.Icon />
                                                        </div>
                                                        <span>{d.dept}</span>
                                                    </div>
                                                </td>
                                                <td><span className="da-fw500">{d.time}</span></td>
                                                <td><div className="da-prod-cell"><ProdBar val={d.prod} /><span className="da-prod-pct">{d.prod}%</span></div></td>
                                                <td>{d.active}</td>
                                                <td>{d.tasks}</td>
                                                <td><MiniSparkline up={d.trendUp} /></td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Activity Breakdown + Most Used Apps */}
                    <div className="da-split-row">
                        <div className="da-card">
                            <div className="da-card-header">
                                <span className="da-card-title">Activity Breakdown</span>
                                <SmallDropdown options={PERIODS} value={actPeriod} onChange={setActPeriod} />
                            </div>
                            <div className="da-activity-list">
                                {ACTIVITY_BREAKDOWN.map((a, i) => (
                                    <div key={i} className="da-act-row">
                                        <div className="da-act-icon" style={{ background: a.color + "18", color: a.color }}>
                                            {i === 0 && <Icons.Keyboard />}
                                            {i === 1 && <Icons.Mouse />}
                                            {i === 2 && <Icons.Monitor />}
                                            {i === 3 && <Icons.ZapOff />}
                                        </div>
                                        <div className="da-act-info">
                                            <span className="da-act-label">{a.label}</span>
                                            <div className="da-act-bar-wrap">
                                                <div className="da-act-bar" style={{ width: `${a.pct}%`, background: a.color }} />
                                            </div>
                                        </div>
                                        <span className="da-act-pct">{a.pct}%</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="da-card">
                            <div className="da-card-header">
                                <span className="da-card-title">Most Used Applications</span>
                                <SmallDropdown options={PERIODS} value={appPeriod} onChange={setAppPeriod} />
                            </div>
                            <div className="da-apps-list">
                                {MOST_USED_APPS.map((a, i) => {
                                    const { Icon, color: ic, bg: ib } = APP_CONFIG[i] || APP_CONFIG[0];
                                    const barW = Math.round((parseFloat(a.time) / 6.5) * 100);
                                    return (
                                        <div key={i} className="da-app-row">
                                            <div className="da-app-icon-wrap" style={{ background: ib, color: ic }}>
                                                <Icon />
                                            </div>
                                            <span className="da-app-name">{a.name}</span>
                                            <div className="da-app-bar-wrap">
                                                <div className="da-app-bar" style={{ width: `${barW}%`, background: a.color }} />
                                            </div>
                                            <span className="da-app-time">{a.time}</span>
                                        </div>
                                    );
                                })}
                            </div>
                            <button className="da-view-report-btn">View Full Report <Icons.ArrowRight /></button>
                        </div>
                    </div>

                    {/* Employee Performance Overview */}
                    <div className="da-card">
                        <div className="da-card-header">
                            <span className="da-card-title">Employee Performance Overview</span>
                        </div>
                        <div className="da-table-wrap">
                            <table className="da-table">
                                <thead>
                                    <tr>
                                        <th>Employee</th>
                                        <th>Work Time</th>
                                        <th>Productivity</th>
                                        <th>Tasks Completed</th>
                                        <th>Active Time</th>
                                        <th>Idle Time</th>
                                        <th>Trend</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {EMP_DATA.map((e, i) => (
                                        <tr key={i}>
                                            <td>
                                                <div className="da-emp-cell">
                                                    <div className="da-emp-avatar" style={{ background: e.av.bg, color: e.av.color }}>{e.avatar}</div>
                                                    <span className="da-fw500">{e.name}</span>
                                                </div>
                                            </td>
                                            <td>{e.time}</td>
                                            <td><div className="da-prod-cell"><ProdBar val={e.prod} /><span className="da-prod-pct">{e.prod}%</span></div></td>
                                            <td>{e.tasks}</td>
                                            <td>{e.active}</td>
                                            <td>{e.idle}</td>
                                            <td><MiniSparkline up={e.trendUp} /></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="da-pagination">
                            <span className="da-page-info">Showing 1 to {PER} of {total} employees</span>
                            <div className="da-page-btns">
                                <button className="da-page-btn" disabled={empPage === 1} onClick={() => setEmpPage(p => p - 1)}><Icons.ChevronLeft /></button>
                                {[1, 2, 3].map(n => (
                                    <button key={n} className={`da-page-btn ${empPage === n ? "active" : ""}`} onClick={() => setEmpPage(n)}>{n}</button>
                                ))}
                                <span className="da-page-dots">...</span>
                                <button className={`da-page-btn ${empPage === totalPages ? "active" : ""}`} onClick={() => setEmpPage(totalPages)}>{totalPages}</button>
                                <button className="da-page-btn" disabled={empPage === totalPages} onClick={() => setEmpPage(p => p + 1)}><Icons.ChevronRight2 /></button>
                            </div>
                            <div className="da-per-page">Show 5 per page <Icons.ChevronDown /></div>
                        </div>
                    </div>
                </div>

                {/* ══ SIDEBAR ══ */}
                <div className="da-sidebar">

                    {/* Daily Summary */}
                    <div className="da-sb-card">
                        <div className="da-sb-header">
                            <span className="da-sb-title">Daily Summary</span>
                            <SmallDropdown options={PERIODS} value={summaryPeriod} onChange={setSummaryPeriod} />
                        </div>
                        <div className="da-summary-list">
                            {DAILY_SUMMARY.map((s, i) => (
                                <div key={i} className="da-summary-row">
                                    <div className="da-summary-dot" style={{ background: s.color }} />
                                    <span className="da-summary-label">{s.label}</span>
                                    <span className="da-summary-val">{s.val}</span>
                                    <span className={`da-summary-change ${s.up === true ? "up" : s.up === false ? "down" : "neutral"}`}>{s.change}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Top Productive */}
                    <div className="da-sb-card">
                        <div className="da-sb-header">
                            <span className="da-sb-title">Top Productive Employees</span>
                            <SmallDropdown options={PERIODS} value={topPeriod} onChange={setTopPeriod} />
                        </div>
                        <div className="da-emp-rank-list">
                            {TOP_PRODUCTIVE.map((e, i) => (
                                <div key={i} className="da-rank-row">
                                    <span className="da-rank-num">{i + 1}</span>
                                    <div className="da-rank-avatar" style={{ background: e.av.bg, color: e.av.color }}>{e.avatar}</div>
                                    <span className="da-rank-name">{e.name}</span>
                                    <div className="da-rank-bar-wrap">
                                        <div className="da-rank-bar da-rank-bar-green" style={{ width: `${e.val}%` }} />
                                    </div>
                                    <span className="da-rank-val">{e.val}%</span>
                                </div>
                            ))}
                        </div>
                        <button className="da-view-report-btn">View Full Report <Icons.ArrowRight /></button>
                    </div>

                    {/* Least Productive */}
                    <div className="da-sb-card">
                        <div className="da-sb-header">
                            <span className="da-sb-title">Least Productive Employees</span>
                            <SmallDropdown options={PERIODS} value={leastPeriod} onChange={setLeastPeriod} />
                        </div>
                        <div className="da-emp-rank-list">
                            {LEAST_PRODUCTIVE.map((e, i) => (
                                <div key={i} className="da-rank-row">
                                    <span className="da-rank-num">{i + 1}</span>
                                    <div className="da-rank-avatar" style={{ background: e.av.bg, color: e.av.color }}>{e.avatar}</div>
                                    <span className="da-rank-name">{e.name}</span>
                                    <div className="da-rank-bar-wrap">
                                        <div className="da-rank-bar da-rank-bar-red" style={{ width: `${e.val}%` }} />
                                    </div>
                                    <span className="da-rank-val">{e.val}%</span>
                                </div>
                            ))}
                        </div>
                        <button className="da-view-report-btn">View Full Report <Icons.ArrowRight /></button>
                    </div>

                </div>
            </div>
        </div>
    );
}