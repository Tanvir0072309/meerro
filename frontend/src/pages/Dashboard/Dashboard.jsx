import React, { useState } from 'react';
import './Dashboard.css';


// ─── SVG ICONS ────────────────────────────────────────────────
const Icons = {
  Users: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  MessageCircle: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  ),
  TrendingUp: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" />
    </svg>
  ),
  Clock: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
    </svg>
  ),
  Maximize2: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="15 3 21 3 21 9" /><polyline points="9 21 3 21 3 15" />
      <line x1="21" y1="3" x2="14" y2="10" /><line x1="3" y1="21" x2="10" y2="14" />
    </svg>
  ),
  Bell: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  ),
  Globe: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  ),
  Calendar: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  ),
  Home: () => (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  ),
  ChevronRight: () => (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  ),
  ChevronDown: () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  ),
  ArrowRight: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
    </svg>
  ),
  Menu: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  ),
  AlertTriangle: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#e53935" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  ),
  Camera: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fb8c00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" /><circle cx="12" cy="13" r="4" />
    </svg>
  ),
  Shield: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#f9a825" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
  LogIn: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1e88e5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" /><polyline points="10 17 15 12 10 7" /><line x1="15" y1="12" x2="3" y2="12" />
    </svg>
  ),
};

// ─── DATA ─────────────────────────────────────────────────────
const STAT_CARDS = [
  {
    Icon: Icons.Users, iconClass: 'purple',
    label: 'Total Employees', value: '128', sub: '+12 this month', subClass: 'blue',
    sparkColor: '#9c27b0', sparkData: [30, 45, 35, 55, 40, 60, 50, 70, 55, 80],
  },
  {
    Icon: Icons.MessageCircle, iconClass: 'green',
    label: 'Active Now', value: '96', sub: '75% of total', subClass: 'neutral',
    sparkColor: '#43a047', sparkData: [20, 40, 30, 50, 45, 60, 55, 65, 70, 75],
  },
  {
    Icon: Icons.TrendingUp, iconClass: 'orange',
    label: 'Productivity', value: '78%', sub: '+5% from yesterday', subClass: 'green',
    sparkColor: '#e65100', sparkData: [50, 55, 60, 52, 65, 70, 60, 72, 75, 78],
  },
  {
    Icon: Icons.Clock, iconClass: 'blue',
    label: 'Work Hours Today', value: '512h 45m', sub: 'Total tracked', subClass: 'neutral',
    sparkColor: '#1565c0', sparkData: [40, 55, 60, 65, 70, 72, 68, 74, 80, 85],
  },
];

const LIVE_MONITORS = [
  { name: 'John Smith', role: 'UI/UX Design', status: 'productive', live: true, bg: '#0f172a' },
  { name: 'Sarah Johnson', role: 'Development', status: 'neutral', live: true, bg: '#1e293b' },
  { name: 'Michael Brown', role: 'Design', status: 'productive', live: true, bg: '#111827' },
  { name: 'Emily Davis', role: 'Content Writing', status: 'neutral', live: true, bg: '#1d4ed8' },
  { name: 'David Wilson', role: 'Marketing', status: 'inactive', live: false, bg: '#374151' },
];

const DONUT_SEGMENTS = [
  { label: 'Productive', value: 65, time: '333h 20m', color: '#43a047' },
  { label: 'Neutral', value: 20, time: '102h 15m', color: '#fb8c00' },
  { label: 'Unproductive', value: 10, time: '51h 10m', color: '#e53935' },
  { label: 'Inactive', value: 5, time: '26h 00m', color: '#e0d0e8' },
];

const ACTIVITY_TIMES = ['12 AM', '04 AM', '08 AM', '12 PM', '04 PM', '08 PM'];
const ACTIVITY_DATA = {
  productive: [30, 22, 78, 92, 85, 65],
  neutral: [18, 12, 48, 58, 52, 38],
  unproductive: [10, 8, 22, 30, 26, 18],
  inactive: [5, 3, 8, 10, 8, 5],
};

const EMPLOYEES = [
  { name: 'John Smith', dept: 'UI/UX Design', status: 'online', workTime: '8h 15m', prod: 85, tasks: '12/15', lastActive: '10:30 AM' },
  { name: 'Sarah Johnson', dept: 'Development', status: 'online', workTime: '7h 45m', prod: 72, tasks: '10/14', lastActive: '10:29 AM' },
  { name: 'Michael Brown', dept: 'Design', status: 'online', workTime: '6h 30m', prod: 65, tasks: '8/12', lastActive: '10:27 AM' },
  { name: 'Emily Davis', dept: 'Content Writing', status: 'online', workTime: '7h 10m', prod: 80, tasks: '9/11', lastActive: '10:25 AM' },
  { name: 'David Wilson', dept: 'Marketing', status: 'offline', workTime: '0h 00m', prod: 0, tasks: '0/10', lastActive: 'Yesterday' },
];

const CHATS = [
  { name: 'John Smith', msg: 'Can you share the latest design files?', time: '10:30 AM', unread: 2 },
  { name: 'Sarah Johnson', msg: "Sure, I'll upload them now.", time: '10:28 AM', unread: 1 },
  { name: 'Michael Brown', msg: 'Team meeting at 3 PM today.', time: '10:15 AM', unread: 3 },
  { name: 'Emily Davis', msg: 'Please review the content.', time: '10:10 AM', unread: 0 },
  { name: 'David Wilson', msg: 'Marketing report is ready.', time: '09:45 AM', unread: 0 },
];

const ALERTS = [
  { Icon: Icons.AlertTriangle, iconBg: '#fce4ec', title: 'Unusual activity detected for', sub: 'John Smith', time: '10:30 AM' },
  { Icon: Icons.Camera, iconBg: '#fff3e0', title: 'Screenshot capture failed for', sub: 'Emily Davis', time: '10:15 AM' },
  { Icon: Icons.Shield, iconBg: '#fffde7', title: 'Application blocked: Social Media', sub: 'by System', time: '09:45 AM' },
  { Icon: Icons.LogIn, iconBg: '#e3f2fd', title: 'New login detected from', sub: 'Unknown Device', time: '09:30 AM' },
];

// ─── HELPERS ──────────────────────────────────────────────────
const AV_COLORS = ['#9c27b0', '#b5179e', '#43a047', '#e65100', '#1565c0', '#c62828', '#0288d1', '#558b2f'];
const avColor = name => AV_COLORS[name.charCodeAt(0) % AV_COLORS.length];
const initials = name => name.split(' ').map(n => n[0]).join('');

function Avatar({ name, size = 30 }) {
  return (
    <div className="dash-avatar" style={{ width: size, height: size, background: avColor(name), fontSize: size * 0.36 }}>
      {initials(name)}
    </div>
  );
}

// ─── WORKING SPARKLINE ─────────────────────────────────────────
// Smooth SVG line + area fill, fully responsive
function Sparkline({ data, color }) {
  const W = 90, H = 38;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;

  // Map data points to SVG coordinates
  const points = data.map((v, i) => ({
    x: (i / (data.length - 1)) * W,
    y: H - 4 - ((v - min) / range) * (H - 10),
  }));

  // Build smooth polyline string
  const lineD = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ');
  // Area fill path (close to bottom)
  const areaD = lineD + ` L${W},${H} L0,${H} Z`;

  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ flexShrink: 0, overflow: 'visible' }}>
      <defs>
        <linearGradient id={`sg-${color.replace('#', '')}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.22" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* Area */}
      <path d={areaD} fill={`url(#sg-${color.replace('#', '')})`} />
      {/* Line */}
      {/* Line */}
      <path
        className="spark-line"
        d={lineD}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Last dot highlight */}
      <circle
        cx={points[points.length - 1].x}
        cy={points[points.length - 1].y}
        r="3" fill={color} stroke="#fff" strokeWidth="1.5"
      />
    </svg>
  );
}

// ─── DONUT CHART ──────────────────────────────────────────────
function DonutChart({ segments }) {
  const cx = 70, cy = 70, r = 52, sw = 18;
  const circ = 2 * Math.PI * r;
  const total = segments.reduce((s, sg) => s + sg.value, 0);
  let offset = 0;
  return (
    <svg width={cx * 2} height={cy * 2} style={{ flexShrink: 0 }}>
      {segments.map((sg, i) => {
        const dash = (sg.value / total) * circ;
        const el = (
          <circle key={i} cx={cx} cy={cy} r={r} fill="none"
            stroke={sg.color} strokeWidth={sw}
            strokeDasharray={`${dash} ${circ - dash}`}
            strokeDashoffset={circ * 0.25 - offset}
          />
        );
        offset += dash;
        return el;
      })}
      <text x={cx} y={cy - 7} textAnchor="middle" fontSize="15" fontWeight="800" fill="#2d1a3e">512h</text>
      <text x={cx} y={cy + 11} textAnchor="middle" fontSize="13" fontWeight="700" fill="#2d1a3e">45m</text>
      <text x={cx} y={cy + 26} textAnchor="middle" fontSize="9" fill="#b388b3">Total</text>
    </svg>
  );
}

// ─── ACTIVITY MULTI-LINE CHART ────────────────────────────────
function ActivityChart() {
  const W = 500, H = 150;
  const pL = 36, pR = 10, pT = 10, pB = 28;
  const cW = W - pL - pR, cH = H - pT - pB;
  const xs = ACTIVITY_TIMES.map((_, i) => pL + (i / (ACTIVITY_TIMES.length - 1)) * cW);
  const y = v => pT + cH - (v / 100) * cH;
  const lines = [
    { key: 'productive', color: '#43a047' },
    { key: 'neutral', color: '#fb8c00' },
    { key: 'unproductive', color: '#e53935' },
    { key: 'inactive', color: '#c4a0c4' },
  ];
  return (
    <svg width="100%" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid meet">
      {[0, 25, 50, 75, 100].map(v => (
        <g key={v}>
          <line x1={pL} y1={y(v)} x2={W - pR} y2={y(v)} stroke="#f0e6f0" strokeWidth="1" />
          <text x={pL - 5} y={y(v) + 4} textAnchor="end" fontSize="9" fill="#c4a0c4">{v}%</text>
        </g>
      ))}
      {ACTIVITY_TIMES.map((t, i) => (
        <text key={i} x={xs[i]} y={H - 8} textAnchor="middle" fontSize="9" fill="#c4a0c4">{t}</text>
      ))}
      {lines.map(l => {
        const pts = ACTIVITY_DATA[l.key].map((v, i) => `${xs[i]},${y(v)}`).join(' ');
        return (
          <g key={l.key}>
            <polyline
              className="activity-line"
              points={pts}
              fill="none"
              stroke={l.color}
              strokeWidth="2"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
            {ACTIVITY_DATA[l.key].map((v, i) => (
              <circle key={i} cx={xs[i]} cy={y(v)} r="3.5" fill={l.color} stroke="#fff" strokeWidth="1.5" />
            ))}
          </g>
        );
      })}
    </svg>
  );
}

// ─── PRODUCTIVITY BAR ─────────────────────────────────────────
function ProdBar({ value }) {
  const color = value === 0 ? '#e0d0e8' : value >= 75 ? '#43a047' : value >= 60 ? '#fb8c00' : '#e53935';
  return (
    <div className="dash-prod-wrap">
      <div className="dash-prod-bg">
        <div className="dash-prod-fill" style={{ width: `${value}%`, background: color }} />
      </div>
      <span className="dash-prod-pct">{value}%</span>
    </div>
  );
}

// ─── FAKE SCREEN THUMB ────────────────────────────────────────
function FakeScreenThumb({ bg, live }) {
  return (
    <div className="dash-screen-thumb" style={{ background: bg }}>
      <div className="dash-screen-inner">
        <div className="dash-screen-topbar" />
        <div className="dash-screen-body">
          <div className="dash-screen-sidebar">
            {[1, 0, 1, 0, 1].map((a, i) => <div key={i} className={`dash-sb-item${a ? ' active' : ''}`} />)}
          </div>
          <div className="dash-screen-content">
            {[100, 70, 85, 55, 75].map((w, i) => <div key={i} className="dash-scr-line" style={{ width: `${w}%` }} />)}
          </div>
        </div>
      </div>
      <span className={`dash-live-badge ${live ? 'live' : 'offline'}`}>{live ? 'Live' : 'Offline'}</span>
    </div>
  );
}

// ─── MAIN DASHBOARD ───────────────────────────────────────────
export default function Dashboard() {
  const [period, setPeriod] = useState('Today');

  return (
    <div className="dashboard-page">

      

      <div className="dash-content">
        <div className="dash-center">

          {/* ══ STAT CARDS — icon | text | sparkline in ONE ROW ══ */}
          <div className="dash-stat-grid">
            {STAT_CARDS.map((card, i) => (
              <div className="dash-stat-card" key={i}>

                {/* LEFT: icon */}
                <div className={`dash-stat-icon-wrap ${card.iconClass}`}>
                  <card.Icon />
                </div>

                {/* MIDDLE: label + value + sub */}
                <div className="dash-stat-body">
                  <div className="dash-stat-label">{card.label}</div>
                  <div className={`dash-stat-value${card.value.length > 6 ? ' sm' : ''}`}>{card.value}</div>
                  <div className={`dash-stat-sub ${card.subClass}`}>{card.sub}</div>
                </div>

                {/* RIGHT: sparkline */}
                <Sparkline data={card.sparkData} color={card.sparkColor} />

              </div>
            ))}
          </div>

          {/* ══ LIVE MONITORING ══ */}
          <div className="dash-card">
            <div className="dash-card-header">
              <span className="dash-card-title">Live Monitoring</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <button className="dash-link-btn">View All</button>
                <button className="dash-icon-action"><Icons.Maximize2 /></button>
              </div>
            </div>
            <div className="dash-monitor-grid">
              {LIVE_MONITORS.map((emp, i) => (
                <div className="dash-monitor-card" key={i}>
                  <FakeScreenThumb bg={emp.bg} live={emp.live} />
                  <div className="dash-monitor-foot">
                    <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 5 }}>
                      <Avatar name={emp.name} size={24} />
                      <div>
                        <div className="dash-monitor-name">{emp.name}</div>
                        <div className="dash-monitor-role">{emp.role}</div>
                      </div>
                    </div>
                    <span className={`dash-status-pill ${emp.status}`}>
                      {emp.status.charAt(0).toUpperCase() + emp.status.slice(1)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ══ WORK SUMMARY + ACTIVITY ══ */}
          <div className="dash-mid-row">
            <div className="dash-card">
              <div className="dash-card-header">
                <span className="dash-card-title">Work Summary Today</span>
              </div>
              <div className="dash-donut-wrap">
                <DonutChart segments={DONUT_SEGMENTS} />
                <div className="dash-legend">
                  {DONUT_SEGMENTS.map((s, i) => (
                    <div className="dash-legend-item" key={i}>
                      <div className="dash-legend-dot" style={{ background: s.color }} />
                      <div>
                        <div className="dash-legend-label">{s.label}</div>
                        <div className="dash-legend-val">{s.value}% ({s.time})</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="dash-card">
              <div className="dash-card-header">
                <span className="dash-card-title">Activity Overview</span>
                <div className="dash-period-select">
                  <span>{period}</span><Icons.ChevronDown />
                </div>
              </div>
              <div className="dash-chart-legend">
                {[
                  { color: '#43a047', label: 'Productive' },
                  { color: '#fb8c00', label: 'Neutral' },
                  { color: '#e53935', label: 'Unproductive' },
                  { color: '#c4a0c4', label: 'Inactive' },
                ].map((l, i) => (
                  <div key={i} className="dash-chart-legend-item">
                    <div className="dash-chart-legend-dot" style={{ background: l.color }} />
                    <span>{l.label}</span>
                  </div>
                ))}
              </div>
              <ActivityChart />
            </div>
          </div>

          {/* ══ EMPLOYEE OVERVIEW ══ */}
          <div className="dash-card">
            <div className="dash-card-header">
              <span className="dash-card-title">Employee Overview</span>
              <button className="dash-view-all-btn">View All</button>
            </div>
            <table className="dash-table">
              <thead>
                <tr>
                  {['Employee', 'Department', 'Status', 'Work Time', 'Productivity', 'Tasks', 'Last Active'].map(h => (
                    <th key={h}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {EMPLOYEES.map((emp, i) => (
                  <tr key={i}>
                    <td>
                      <div className="dash-emp-cell">
                        <Avatar name={emp.name} size={28} />
                        <span className="dash-emp-name">{emp.name}</span>
                      </div>
                    </td>
                    <td className="dash-dept">{emp.dept}</td>
                    <td>
                      <span className={`dash-online-badge ${emp.status}`}>
                        {emp.status === 'online' ? 'Online' : 'Offline'}
                      </span>
                    </td>
                    <td className="dash-worktime">{emp.workTime}</td>
                    <td><ProdBar value={emp.prod} /></td>
                    <td className="dash-tasks">{emp.tasks}</td>
                    <td className="dash-last">{emp.lastActive}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>{/* /dash-center */}

        {/* ══ RIGHT PANEL ══ */}
        <div className="dash-right">

          {/* Live Chat */}
          <div className="dash-right-card">
            <div className="dash-card-header">
              <span className="dash-card-title">Live Chat</span>
              <button className="dash-link-btn">View All</button>
            </div>
            <div className="dash-chat-list">
              {CHATS.map((c, i) => (
                <div className="dash-chat-item" key={i}>
                  <Avatar name={c.name} size={34} />
                  <div className="dash-chat-body">
                    <div className="dash-chat-top">
                      <span className="dash-chat-name">{c.name}</span>
                      <span className="dash-chat-time">{c.time}</span>
                    </div>
                    <div className="dash-chat-msg">{c.msg}</div>
                  </div>
                  {c.unread > 0 && <span className="dash-unread">{c.unread}</span>}
                </div>
              ))}
            </div>
            <div className="dash-go-chat">
              <button>Go to Chat <Icons.ArrowRight /></button>
            </div>
          </div>

          {/* Alerts */}
          <div className="dash-right-card">
            <div className="dash-card-header">
              <span className="dash-card-title">Recent Alerts</span>
              <button className="dash-link-btn">View All</button>
            </div>
            <div className="dash-alert-list">
              {ALERTS.map((a, i) => (
                <div className="dash-alert-item" key={i}>
                  <div className="dash-alert-icon" style={{ background: a.iconBg }}>
                    <a.Icon />
                  </div>
                  <div className="dash-alert-body">
                    <div className="dash-alert-title">{a.title}</div>
                    <div className="dash-alert-sub">{a.sub}</div>
                  </div>
                  <span className="dash-alert-time">{a.time}</span>
                </div>
              ))}
            </div>
          </div>

        </div>{/* /dash-right */}
      </div>
    </div>
    
  );
}
