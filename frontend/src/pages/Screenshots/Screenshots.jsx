import React, { useState } from 'react';
import './Screenshots.css';

const SCREENSHOTS = [
    { emp: 'John Smith', role: 'UI/UX Designer', dept: 'Design Team', time: '10:30 AM', status: 'active', app: 'Google Chrome', windowTitle: 'Analytics Dashboard', resolution: '1920 x 1080' },
    { emp: 'Sarah Johnson', role: 'Developer', dept: 'Dev Team', time: '10:25 AM', status: 'active', app: 'VS Code', windowTitle: 'auth.js - Project', resolution: '2560 x 1440' },
    { emp: 'Michael Brown', role: 'Designer', dept: 'Design Team', time: '10:20 AM', status: 'idle', app: 'Figma', windowTitle: 'Mobile App Designs', resolution: '1920 x 1080' },
    { emp: 'Emily Davis', role: 'Content Writer', dept: 'Content Team', time: '10:15 AM', status: 'active', app: 'Google Docs', windowTitle: 'Blog Draft - Q2', resolution: '1440 x 900' },
    { emp: 'David Wilson', role: 'Marketing', dept: 'Marketing', time: '10:10 AM', status: 'idle', app: 'Excel', windowTitle: 'Marketing Strategy', resolution: '1920 x 1080' },
    { emp: 'James Anderson', role: 'Designer', dept: 'Design Team', time: '10:05 AM', status: 'active', app: 'Photoshop', windowTitle: 'Concept Design', resolution: '2560 x 1440' },
    { emp: 'Robert Taylor', role: 'Developer', dept: 'Dev Team', time: '10:00 AM', status: 'offline', app: '-', windowTitle: '-', resolution: '-' },
    { emp: 'Jessica Martinez', role: 'HR', dept: 'HR', time: '09:55 AM', status: 'active', app: 'Slack', windowTitle: 'General Channel', resolution: '1440 x 900' },
    { emp: 'Daniel Thomas', role: 'Finance', dept: 'Finance', time: '09:50 AM', status: 'idle', app: 'Chrome', windowTitle: 'Financial Reports', resolution: '1920 x 1080' },
];

// SVG Icons - professional, no emojis
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
    expand: <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 3 21 3 21 9" /><polyline points="9 21 3 21 3 15" /><line x1="21" y1="3" x2="14" y2="10" /><line x1="3" y1="21" x2="10" y2="14" /></svg>,
    eye: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>,
    download: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>,
    trash: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" /></svg>,
    monitor: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" /></svg>,
    camera: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" /><circle cx="12" cy="13" r="4" /></svg>,
    screenActive: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" /></svg>,
    pause: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="6" y="4" width="4" height="16" /><rect x="14" y="4" width="4" height="16" /></svg>,
    offline: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="1" y1="1" x2="23" y2="23" /><path d="M16.72 11.06A10.94 10.94 0 0 1 19 12.55" /><path d="M5 12.55a10.94 10.94 0 0 1 5.17-2.39" /><path d="M10.71 5.05A16 16 0 0 1 22.56 9" /><path d="M1.42 9a15.91 15.91 0 0 1 4.7-2.88" /><path d="M8.53 16.11a6 6 0 0 1 6.95 0" /><line x1="12" y1="20" x2="12.01" y2="20" /></svg>,
    calendarDetail: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>,
    app: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" /></svg>,
    window: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><line x1="3" y1="9" x2="21" y2="9" /><line x1="9" y1="21" x2="9" y2="9" /></svg>,
    status: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>,
    resolution: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2" /><path d="M16 3l-4 4-4-4" /></svg>,
    arrowRight: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>,
    chevronLeft: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>,
    chevronRightPage: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>,
};

function FakeThumb({ status }) {
    if (status === 'offline') {
        return (
            <div className="ss-card-thumb offline-thumb">
                <div className="ss-offline-placeholder">
                    <span style={{ opacity: 0.3, color: '#fff' }}>{Icons.monitor}</span>
                    <span>Screen not captured</span>
                </div>
            </div>
        );
    }
    return (
        <div className="ss-card-thumb">
            <div className="ss-fake-screen">
                <div className="ss-fake-row accent" />
                <div className="ss-fake-row half" />
                <div className="ss-fake-mini-grid">
                    <div className="ss-fake-mini-block" />
                    <div className="ss-fake-mini-block" />
                    <div className="ss-fake-mini-block" />
                    <div className="ss-fake-mini-block" />
                </div>
                <div className="ss-fake-row" style={{ width: '80%' }} />
                <div className="ss-fake-row" style={{ width: '60%' }} />
            </div>
        </div>
    );
}

export default function Screenshots() {
    const [selected, setSelected] = useState(0);
    const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'
    const ss = SCREENSHOTS[selected];

    const handleRefresh = () => {
        // Simple refresh - just re-render by toggling state briefly
        window.location.reload();
    };

    return (
        <div className="screenshots-page">
            

            {/* Toolbar */}
            <div className="ss-toolbar">
                <div className="ss-search-wrap">
                    <span className="ss-search-icon">{Icons.search}</span>
                    <input className="ss-search-input" placeholder="Search employee..." />
                </div>
                <select className="ss-select"><option>May 20, 2024</option></select>
                <select className="ss-select"><option>All Employees</option></select>
                <select className="ss-select"><option>All Status</option></select>
                <button className="ss-refresh-btn">
                    {Icons.filter}
                    Filters
                </button>
                <div className="ss-toolbar-spacer" />
                <button
                    className={`ss-view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                    onClick={() => setViewMode('grid')}
                    title="Grid View"
                >
                    {Icons.grid}
                </button>
                <button
                    className={`ss-view-btn ${viewMode === 'list' ? 'active' : ''}`}
                    onClick={() => setViewMode('list')}
                    title="List View"
                >
                    {Icons.list}
                </button>
                <button className="ss-refresh-btn" onClick={handleRefresh}>
                    {Icons.refresh}
                    Refresh
                </button>
            </div>

            <div className="ss-content">
                <div className="ss-main">
                    {/* Stat Cards */}
                    <div className="ss-stat-cards">
                        {[
                            { icon: Icons.camera, cls: 'purple', label: 'Total Screenshots', value: '1,248', sub: '+142 today' },
                            { icon: Icons.screenActive, cls: 'green', label: 'Active Screenshots', value: '856', sub: '68.6%' },
                            { icon: Icons.pause, cls: 'orange', label: 'Idle Screenshots', value: '312', sub: '25.0%' },
                            { icon: Icons.offline, cls: 'red', label: 'Offline Screenshots', value: '80', sub: '6.4%' },
                        ].map((c, i) => (
                            <div className="ss-stat-card" key={i}>
                                <div className={`ss-stat-icon ${c.cls}`}>{c.icon}</div>
                                <div>
                                    <div className="ss-stat-label">{c.label}</div>
                                    <div className="ss-stat-value">{c.value}</div>
                                    <div className="ss-stat-sub">{c.sub}</div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="ss-count">Showing 1,248 screenshots</div>

                    {/* Grid View */}
                    {viewMode === 'grid' && (
                        <div className="ss-grid">
                            {SCREENSHOTS.map((ss, i) => (
                                <div
                                    className={`ss-card ${selected === i ? 'selected' : ''}`}
                                    key={i}
                                    onClick={() => setSelected(i)}
                                >
                                    <div style={{ position: 'relative' }}>
                                        <FakeThumb status={ss.status} />
                                        <span className={`ss-card-badge ${ss.status}`}>{ss.status.charAt(0).toUpperCase() + ss.status.slice(1)}</span>
                                        <button className="ss-card-expand">{Icons.expand}</button>
                                    </div>
                                    <div className="ss-card-footer">
                                        <div className="ss-card-emp">
                                            <div className="ss-card-avatar">{ss.emp.split(' ').map(n => n[0]).join('')}</div>
                                            <div>
                                                <div className="ss-card-name">{ss.emp}</div>
                                                <div className="ss-card-time">{ss.time}</div>
                                            </div>
                                        </div>
                                        <div className="ss-card-actions">
                                            <button className="ss-action-btn" title="View">{Icons.eye}</button>
                                            <button className="ss-action-btn" title="Download">{Icons.download}</button>
                                            <button className="ss-action-btn" title="Delete">{Icons.trash}</button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* List View */}
                    {viewMode === 'list' && (
                        <div className="ss-list">
                            <div className="ss-list-header">
                                <span>Employee</span>
                                <span>Status</span>
                                <span>Application</span>
                                <span>Window Title</span>
                                <span>Time</span>
                                <span>Actions</span>
                            </div>
                            {SCREENSHOTS.map((item, i) => (
                                <div
                                    className={`ss-list-row ${selected === i ? 'selected' : ''}`}
                                    key={i}
                                    onClick={() => setSelected(i)}
                                >
                                    <div className="ss-list-emp">
                                        <div className="ss-card-avatar">{item.emp.split(' ').map(n => n[0]).join('')}</div>
                                        <div>
                                            <div className="ss-card-name">{item.emp}</div>
                                            <div className="ss-card-time">{item.role}</div>
                                        </div>
                                    </div>
                                    <span className={`ss-card-badge ss-list-badge ${item.status}`}>
                                        {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                                    </span>
                                    <span className="ss-list-cell">{item.app}</span>
                                    <span className="ss-list-cell ss-list-window">{item.windowTitle}</span>
                                    <span className="ss-list-cell">{item.time}</span>
                                    <div className="ss-card-actions">
                                        <button className="ss-action-btn" title="View">{Icons.eye}</button>
                                        <button className="ss-action-btn" title="Download">{Icons.download}</button>
                                        <button className="ss-action-btn" title="Delete">{Icons.trash}</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Pagination */}
                    <div className="ss-pagination">
                        <div className="ss-page-btns">
                            <button className="ss-page-btn">{Icons.chevronLeft}</button>
                            {[1, 2, 3, 4, 5, '...', 42].map((p, i) => (
                                <button key={i} className={`ss-page-btn ${p === 1 ? 'active' : ''}`}>{p}</button>
                            ))}
                            <button className="ss-page-btn">{Icons.chevronRightPage}</button>
                        </div>
                        <div className="ss-per-page">
                            Show
                            <select className="ss-per-page-select"><option>12 per page</option></select>
                        </div>
                    </div>
                </div>

                {/* Right Panel - sticky */}
                <div className="ss-right">
                    <div className="ss-right-title">
                        Screenshot Details
                    </div>

                    <div className="ss-detail-preview">
                        <FakeThumb status={ss.status} />
                    </div>

                    <div className="ss-detail-emp">
                        <div className="ss-detail-avatar">{ss.emp.split(' ').map(n => n[0]).join('')}</div>
                        <div>
                            <div className="ss-detail-emp-name">{ss.emp}</div>
                            <div className="ss-detail-emp-role">{ss.role} &bull; {ss.dept}</div>
                        </div>
                        <span className="ss-detail-badge">Active</span>
                    </div>

                    <div>
                        {[
                            { icon: Icons.calendarDetail, label: 'Captured At', val: `May 20, 2024 ${ss.time}` },
                            { icon: Icons.app, label: 'Application', val: ss.app },
                            { icon: Icons.window, label: 'Window Title', val: ss.windowTitle },
                            { icon: Icons.status, label: 'Status', val: ss.status.charAt(0).toUpperCase() + ss.status.slice(1) },
                            { icon: Icons.resolution, label: 'Resolution', val: ss.resolution },
                        ].map((row, i) => (
                            <div className="ss-detail-row" key={i}>
                                <span className="ss-detail-row-icon">{row.icon}</span>
                                <span className="ss-detail-row-label">{row.label}</span>
                                <span className="ss-detail-row-val">{row.val}</span>
                            </div>
                        ))}
                    </div>

                    <div>
                        <div className="ss-activity-title">Activity Timeline</div>
                        <div className="ss-activity-list">
                            {[
                                { time: '10:30 AM', text: 'Screenshot captured', dot: 'green' },
                                { time: '10:28 AM', text: 'Visited analytics.google.com', dot: 'gray' },
                                { time: '10:25 AM', text: 'Worked on Dashboard Design', dot: 'gray' },
                            ].map((a, i) => (
                                <div className="ss-activity-item" key={i}>
                                    <span className="ss-act-time">{a.time}</span>
                                    <span className={`ss-act-dot ${a.dot}`} />
                                    <span className="ss-act-text">{a.text}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <button className="ss-view-full-btn">
                        View Full Activity
                        <span>{Icons.arrowRight}</span>
                    </button>
                </div>
            </div>
        </div>
    );
}