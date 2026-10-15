import { useLocation, useNavigate } from 'react-router-dom';
import './Topbar.css';

const Icons = {
    Home: () => <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>,
    ChevronRight: () => <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>,
    Calendar: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>,
    Bell: () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></svg>,
    Globe: () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>,
};

const PAGE_META = {
    '/dashboard': { title: 'Dashboard', crumb: [{ label: 'Dashboard' }] },
    '/live-screen': { title: 'Live Screen Monitoring', crumb: [{ label: 'Live Screen Monitoring' }] },
    '/screenshots': { title: 'Screenshots', crumb: [{ label: 'Screenshots' }] },
    '/activity': { title: 'Activity Log', crumb: [{ label: 'Activity Log' }] },
    '/reports': { title: 'Reports', crumb: [{ label: 'Reports' }] },
    '/employees': { title: 'Employees', crumb: [{ label: 'Employees' }] },
    '/add-employee': { title: 'Employees', crumb: [{ label: 'Employees', href: '/employees' }, { label: 'Add Employee' }] },
    '/settings': { title: 'Settings', crumb: [{ label: 'Settings' }] },
    '/attendance': { title: 'Attendance', crumb: [{ label: 'Attendance' }] },
    '/projects': { title: 'Projects', crumb: [{ label: 'Projects' }] },
    '/add-project': { title: 'Add Project', crumb: [{ label: 'Projects', href: '/projects' }, { label: 'Add Project' }] },
    '/tasks': { title: 'Tasks', crumb: [{ label: 'Tasks' }] },
    '/live-chat': { title: 'Live Chat', crumb: [{ label: 'Live Chat' }] },
    '/announcements': { title: 'Announcements', crumb: [{ label: 'Announcements' }] },
    '/daily-analysis': { title: 'Daily Analysis', crumb: [{ label: 'Daily Analysis' }] },
    '/work-tracking': { title: 'Work Tracking', crumb: [{ label: 'Work Tracking' }] },
};

export default function Topbar() {
    const { pathname } = useLocation();
    const navigate = useNavigate();

    const raw = PAGE_META[pathname];
    const meta = raw ?? {
        title: pathname.replace('/', '').replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
        crumb: [{ label: pathname.replace('/', '').replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) }],
    };
    const crumbItems = Array.isArray(meta.crumb) ? meta.crumb : [{ label: meta.crumb }];

    return (
        <div className="topbar">
            <div className="topbar-left">
                <div>
                    <h1 className="topbar-title">{meta.title}</h1>
                    <div className="topbar-breadcrumb">
                        <span className="topbar-bc-icon"><Icons.Home /></span>
                        <span>Home</span>
                        {crumbItems.map((item, i) => (
                            <span key={i} style={{ display: 'contents' }}>
                                <span className="topbar-bc-sep"><Icons.ChevronRight /></span>
                                {item.href
                                    ? <span className="topbar-bc-link" onClick={() => navigate(item.href)}>{item.label}</span>
                                    : <span className="topbar-bc-current">{item.label}</span>
                                }
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            <div className="topbar-right">
                <div className="topbar-date-chip">
                    <Icons.Calendar />
                    <span>May 20, 2024</span>
                </div>
                <button className="topbar-icon-btn">
                    <Icons.Bell />
                    <span className="topbar-badge">12</span>
                </button>
                <button className="topbar-icon-btn"><Icons.Globe /></button>
                <div className="topbar-avatar" onClick={() => navigate('/profile')}>JS</div>
            </div>
        </div>
    );
}