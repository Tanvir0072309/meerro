import React, { useState } from 'react';
import './Livescreen.css';

/* ══════════════════════════════════════════
   SVG ICONS — professional, no emojis
══════════════════════════════════════════ */
const Icons = {
    home: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>,
    chevronRight: <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>,
    calendar: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>,
    bell: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></svg>,
    globe: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>,
    search: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>,
    filter: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" /></svg>,
    refresh: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 4 23 10 17 10" /><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" /></svg>,
    grid: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /></svg>,
    list: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" /><line x1="3" y1="6" x2="3.01" y2="6" /><line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" /></svg>,
    settings: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg>,
    users: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>,
    monitor: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" /></svg>,
    pauseCircle: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="10" y1="15" x2="10" y2="9" /><line x1="14" y1="15" x2="14" y2="9" /></svg>,
    wifiOff: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="1" y1="1" x2="23" y2="23" /><path d="M16.72 11.06A10.94 10.94 0 0 1 19 12.55" /><path d="M5 12.55a10.94 10.94 0 0 1 5.17-2.39" /><path d="M10.71 5.05A16 16 0 0 1 22.56 9" /><path d="M1.42 9a15.91 15.91 0 0 1 4.7-2.88" /><path d="M8.53 16.11a6 6 0 0 1 6.95 0" /><line x1="12" y1="20" x2="12.01" y2="20" /></svg>,
    monitorSm: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" /></svg>,
    arrowRight: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>,
    externalLink: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>,
    figma: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z" /><path d="M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2z" /><path d="M12 12.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 1 1-7 0z" /><path d="M5 19.5A3.5 3.5 0 0 1 8.5 16H12v3.5a3.5 3.5 0 1 1-7 0z" /><path d="M5 12.5A3.5 3.5 0 0 1 8.5 9H12v7H8.5A3.5 3.5 0 0 1 5 12.5z" /></svg>,
    code: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>,
    video: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="23 7 16 12 23 17 23 7" /><rect x="1" y="5" width="15" height="14" rx="2" ry="2" /></svg>,
    mail: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>,
    clock: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>,
    briefcase: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg>,
    activity: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg>,
};

/* ══════════════════════════════════════════
   DATA
══════════════════════════════════════════ */
const EMPLOYEES = [
    {
        name: 'John Smith', role: 'UI/UX Design', dept: 'Design Team',
        email: 'john.smith@meerrovision.com', id: '#EMP001',
        status: 'live', workTime: '8h 15m', idleTime: '45m', productivity: '85%',
        activities: [
            { time: '10:30 AM', icon: Icons.figma, text: 'Working on Dashboard Design', app: 'Figma' },
            { time: '10:15 AM', icon: Icons.globe, text: 'Browsed Documentation', app: 'Chrome' },
            { time: '10:05 AM', icon: Icons.code, text: 'Code Review', app: 'VS Code' },
            { time: '09:45 AM', icon: Icons.video, text: 'Team Meeting', app: 'Microsoft Teams' },
            { time: '09:30 AM', icon: Icons.mail, text: 'Email Communication', app: 'Outlook' },
        ],
    },
    { name: 'Sarah Johnson', role: 'Development', dept: 'Dev Team', email: 'sarah@meerrovision.com', id: '#EMP002', status: 'live', workTime: '7h 30m', idleTime: '1h 10m', productivity: '72%', activities: [] },
    { name: 'Michael Brown', role: 'Design', dept: 'Design Team', email: 'michael@meerrovision.com', id: '#EMP003', status: 'live', workTime: '6h 20m', idleTime: '55m', productivity: '80%', activities: [] },
    { name: 'Emily Davis', role: 'Content Writing', dept: 'Content Team', email: 'emily@meerrovision.com', id: '#EMP004', status: 'live', workTime: '7h 00m', idleTime: '40m', productivity: '88%', activities: [] },
    { name: 'David Wilson', role: 'Marketing', dept: 'Marketing', email: 'david@meerrovision.com', id: '#EMP005', status: 'idle', workTime: '4h 10m', idleTime: '2h 30m', productivity: '55%', activities: [] },
    { name: 'James Anderson', role: 'Support', dept: 'Support', email: 'james@meerrovision.com', id: '#EMP006', status: 'idle', workTime: '5h 00m', idleTime: '1h 15m', productivity: '62%', activities: [] },
    { name: 'Robert Taylor', role: 'Development', dept: 'Dev Team', email: 'robert@meerrovision.com', id: '#EMP007', status: 'live', workTime: '8h 00m', idleTime: '30m', productivity: '91%', activities: [] },
    { name: 'Jessica Martinez', role: 'HR', dept: 'Human Resources', email: 'jessica@meerrovision.com', id: '#EMP008', status: 'offline', workTime: '0h 00m', idleTime: '-', productivity: '0%', activities: [] },
    { name: 'Daniel Thomas', role: 'Finance', dept: 'Finance', email: 'daniel@meerrovision.com', id: '#EMP009', status: 'offline', workTime: '0h 00m', idleTime: '-', productivity: '0%', activities: [] },
];

const AV_COLORS = ['#9c27b0', '#b5179e', '#43a047', '#e65100', '#1565c0', '#c62828', '#0288d1', '#558b2f'];
const avColor = name => AV_COLORS[name.charCodeAt(0) % AV_COLORS.length];
const initials = name => name.split(' ').map(w => w[0]).join('');

/* ── Avatar ── */
function Avatar({ name, size = 30 }) {
    return (
        <div className="ls-avatar" style={{
            width: size, height: size,
            background: avColor(name),
            fontSize: size * 0.36,
        }}>
            {initials(name)}
        </div>
    );
}

/* ── Fake Monitor Screen ── */
function FakeMonitorUI({ status }) {
    if (status === 'offline') {
        return (
            <div className="ls-monitor-screen offline">
                <div className="ls-offline-placeholder">
                    <span style={{ opacity: 0.3, color: '#fff' }}>{Icons.monitor}</span>
                    <span>Screen is offline</span>
                </div>
            </div>
        );
    }
    return (
        <div className="ls-monitor-screen">
            <div className="ls-fake-ui">
                <div className="ls-fake-topbar" />
                <div className="ls-fake-body">
                    <div className="ls-fake-sidebar">
                        {[true, false, false, true, false].map((a, i) => (
                            <div key={i} className={`ls-fake-sb-item ${a ? 'active' : ''}`} />
                        ))}
                    </div>
                    <div className="ls-fake-main">
                        <div className="ls-fake-chart">
                            {[40, 60, 80, 55, 70, 90, 65].map((h, i) => (
                                <div key={i} className="ls-fake-bar" style={{ left: `${i * 14}%`, height: `${h}%` }} />
                            ))}
                        </div>
                        <div className="ls-fake-lines">
                            {[90, 70, 50].map((w, i) => (
                                <div key={i} className="ls-fake-line" style={{ width: `${w}%` }} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

/* ══════════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════════ */
export default function LiveScreen() {
    const [selected, setSelected] = useState(0);
    const [viewMode, setViewMode] = useState('grid');
    const emp = EMPLOYEES[selected];

    return (
        <div className="livescreen-page">

            

            {/* ── TOOLBAR ── */}
            <div className="ls-toolbar">
                <div className="ls-search-wrap">
                    <span className="ls-search-icon">{Icons.search}</span>
                    <input className="ls-search-input" placeholder="Search employee..." />
                </div>
                <select className="ls-select"><option>All Departments</option></select>
                <select className="ls-select"><option>All Status</option></select>
                <button className="ls-refresh-btn">{Icons.settings} View Settings</button>
                <div className="ls-toolbar-spacer" />
                <button
                    className={`ls-view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                    onClick={() => setViewMode('grid')}
                    title="Grid View"
                >{Icons.grid}</button>
                <button
                    className={`ls-view-btn ${viewMode === 'list' ? 'active' : ''}`}
                    onClick={() => setViewMode('list')}
                    title="List View"
                >{Icons.list}</button>
                <button className="ls-refresh-btn" onClick={() => window.location.reload()}>
                    {Icons.refresh} Refresh
                </button>
            </div>

            <div className="ls-content">
                <div className="ls-main">

                    {/* ── STAT CARDS ── */}
                    <div className="ls-stat-cards">
                        {[
                            { icon: Icons.users, cls: 'purple', label: 'Total Employees', value: '128', sub: 'Online 96', subCls: 'green' },
                            { icon: Icons.monitor, cls: 'green', label: 'Active Screens', value: '84', sub: '65.6% of total', subCls: 'green' },
                            { icon: Icons.pauseCircle, cls: 'orange', label: 'Idle Screens', value: '12', sub: '9.4% of total', subCls: 'orange' },
                            { icon: Icons.wifiOff, cls: 'red', label: 'Offline', value: '32', sub: '25.0% of total', subCls: 'red' },
                        ].map((c, i) => (
                            <div className="ls-stat-card" key={i}>
                                <div className={`ls-stat-icon ${c.cls}`}>{c.icon}</div>
                                <div>
                                    <div className="ls-stat-label">{c.label}</div>
                                    <div className="ls-stat-value">{c.value}</div>
                                    <div className={`ls-stat-sub ${c.subCls}`}>{c.sub}</div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="ls-count">Showing {EMPLOYEES.length} employees</div>

                    {/* ── GRID VIEW ── */}
                    {viewMode === 'grid' && (
                        <div className="ls-grid">
                            {EMPLOYEES.map((e, i) => (
                                <div
                                    className={`ls-card ${selected === i ? 'selected' : ''}`}
                                    key={i}
                                    onClick={() => setSelected(i)}
                                >
                                    <div style={{ position: 'relative' }}>
                                        <FakeMonitorUI status={e.status} />
                                        <span className={`ls-card-badge ${e.status}`}>
                                            {e.status === 'live' ? 'Live' : e.status === 'idle' ? 'Idle' : 'Offline'}
                                        </span>
                                    </div>
                                    <div className="ls-card-footer">
                                        <div className="ls-card-emp">
                                            <Avatar name={e.name} size={26} />
                                            <div>
                                                <div className="ls-card-name">{e.name}</div>
                                                <div className="ls-card-role">{e.role}</div>
                                            </div>
                                        </div>
                                        <div className="ls-card-actions">
                                            <button className="ls-action-btn" title="View Screen">{Icons.monitorSm}</button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* ── LIST VIEW ── */}
                    {viewMode === 'list' && (
                        <div className="ls-list">
                            <div className="ls-list-header">
                                <span>Employee</span>
                                <span>Department</span>
                                <span>Status</span>
                                <span>Work Time</span>
                                <span>Idle Time</span>
                                <span>Productivity</span>
                                <span>Action</span>
                            </div>
                            {EMPLOYEES.map((e, i) => (
                                <div
                                    className={`ls-list-row ${selected === i ? 'selected' : ''}`}
                                    key={i}
                                    onClick={() => setSelected(i)}
                                >
                                    <div className="ls-list-emp">
                                        <Avatar name={e.name} size={30} />
                                        <div>
                                            <div className="ls-card-name">{e.name}</div>
                                            <div className="ls-card-role">{e.role}</div>
                                        </div>
                                    </div>
                                    <span className="ls-list-cell">{e.dept}</span>
                                    <span className={`ls-card-badge ls-list-badge ${e.status}`}>
                                        {e.status === 'live' ? 'Live' : e.status === 'idle' ? 'Idle' : 'Offline'}
                                    </span>
                                    <span className="ls-list-cell">{e.workTime}</span>
                                    <span className="ls-list-cell">{e.idleTime}</span>
                                    <span className="ls-list-cell">{e.productivity}</span>
                                    <button className="ls-action-btn">{Icons.monitorSm}</button>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* ── PAGINATION ── */}
                    <div className="ls-pagination">
                        <div className="ls-page-btns">
                            <button className="ls-page-btn">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
                            </button>
                            {[1, 2, 3, 4, 5, '...', 18].map((p, i) => (
                                <button key={i} className={`ls-page-btn ${p === 1 ? 'active' : ''}`}>{p}</button>
                            ))}
                            <button className="ls-page-btn">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
                            </button>
                        </div>
                        <div className="ls-per-page">
                            Show
                            <select className="ls-per-page-select"><option>12 per page</option></select>
                        </div>
                    </div>
                </div>

                {/* ── RIGHT PANEL — sticky ── */}
                <div className="ls-right">
                    <div className="ls-right-title">Employee Details</div>

                    {/* Monitor Preview */}
                    <div className="ls-detail-preview">
                        <FakeMonitorUI status={emp.status} />
                    </div>

                    {/* Employee info */}
                    <div className="ls-detail-emp">
                        <Avatar name={emp.name} size={36} />
                        <div>
                            <div className="ls-detail-emp-name">{emp.name}</div>
                            <div className="ls-detail-emp-role">{emp.role} &bull; {emp.dept}</div>
                        </div>
                        <span className={`ls-detail-badge ${emp.status}`}>
                            {emp.status === 'live' ? 'Active' : emp.status === 'idle' ? 'Idle' : 'Offline'}
                        </span>
                    </div>

                    {/* Detail rows */}
                    <div>
                        {[
                            { icon: Icons.briefcase, label: 'Employee ID', val: emp.id },
                            { icon: Icons.mail, label: 'Email', val: emp.email },
                            { icon: Icons.clock, label: 'Work Time', val: emp.workTime },
                            { icon: Icons.activity, label: 'Idle Time', val: emp.idleTime },
                            { icon: Icons.monitorSm, label: 'Productivity', val: emp.productivity },
                        ].map((row, i) => (
                            <div className="ls-detail-row" key={i}>
                                <span className="ls-detail-row-icon">{row.icon}</span>
                                <span className="ls-detail-row-label">{row.label}</span>
                                <span className="ls-detail-row-val">{row.val}</span>
                            </div>
                        ))}
                    </div>

                    {/* Activity Timeline */}
                    {emp.activities.length > 0 && (
                        <div>
                            <div className="ls-activity-title">Live Activity</div>
                            <div className="ls-activity-list">
                                {emp.activities.map((act, i) => (
                                    <div className="ls-activity-item" key={i}>
                                        <span className="ls-act-time">{act.time}</span>
                                        <span className={`ls-act-dot ${i === 0 ? 'green' : 'gray'}`} />
                                        <span className="ls-act-icon">{act.icon}</span>
                                        <div>
                                            <div className="ls-act-text">{act.text}</div>
                                            <div className="ls-act-app">{act.app}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    <button className="ls-view-full-btn">
                        View Full Activity
                        <span>{Icons.arrowRight}</span>
                    </button>
                </div>
            </div>
        </div>
    );
}