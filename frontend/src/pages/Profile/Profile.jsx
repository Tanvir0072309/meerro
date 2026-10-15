import React, { useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './Profile.css';

/* ══ ICONS ══════════════════════════════════════════════════════════════════ */
const Ic = {
    Home: () => <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>,
    ChevR: () => <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>,
    ChevD: () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>,
    Check: () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>,
    X: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>,
    Edit: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>,
    User: () => <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>,
    Mail: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>,
    Phone: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.56 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" /></svg>,
    Badge: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg>,
    Calendar: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>,
    Clock: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>,
    Activity: () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg>,
    BarChart: () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" /></svg>,
    CheckSq: () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 11 12 14 22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" /></svg>,
    Zap: () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>,
    Upload: () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 16 12 12 8 16" /><line x1="12" y1="12" x2="12" y2="21" /><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" /></svg>,
    Shield: () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>,
    Bell: () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></svg>,
    Settings: () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3" /><path d="M19.07 4.93a10 10 0 0 1 1.41 1.41M4.93 4.93A10 10 0 0 0 3.52 6.34M19.07 19.07a10 10 0 0 1-1.41 1.41M4.93 19.07a10 10 0 0 0 1.41 1.41M22 12h-2M4 12H2M12 2V4M12 20v2" /></svg>,
    Lock: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>,
    Monitor: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" /></svg>,
    Download: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>,
    MapPin: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>,
    Building: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M9 3v18" /><path d="M3 9h6" /><path d="M3 15h6" /><path d="M13 7h4" /><path d="M13 12h4" /><path d="M13 17h4" /></svg>,
    Figma: () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z" /><path d="M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2z" /><path d="M12 12.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 1 1-7 0z" /><path d="M5 19.5A3.5 3.5 0 0 1 8.5 16H12v3.5a3.5 3.5 0 1 1-7 0z" /><path d="M5 12.5A3.5 3.5 0 0 1 8.5 9H12v7H8.5A3.5 3.5 0 0 1 5 12.5z" /></svg>,
    Meet: () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="23 7 16 12 23 17 23 7" /><rect x="1" y="5" width="15" height="14" rx="2" /></svg>,
    LogIn: () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" /><polyline points="10 17 15 12 10 7" /><line x1="15" y1="12" x2="3" y2="12" /></svg>,
    LogOut: () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></svg>,
    Save: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" /><polyline points="17 21 17 13 7 13 7 21" /><polyline points="7 3 7 8 15 8" /></svg>,
    Eye: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>,
    EyeOff: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" /><line x1="1" y1="1" x2="23" y2="23" /></svg>,
    Plus: () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>,
    Trash: () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" /></svg>,
    Key: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" /></svg>,
    Smartphone: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" /><line x1="12" y1="18" x2="12.01" y2="18" /></svg>,
    Globe: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>,
    Link: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" /></svg>,
    CheckCircle: () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>,
    AlertCircle: () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>,
    ArrowL: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" /></svg>,
};

/* ══ DATA ══════════════════════════════════════════════════════════════════ */
const PROFILE_TABS = [
    { id: 'personal', label: 'Personal Information', Icon: Ic.User },
    { id: 'work', label: 'Work Information', Icon: Ic.Building },
    { id: 'performance', label: 'Performance', Icon: Ic.BarChart },
    { id: 'timeline', label: 'Activity Timeline', Icon: Ic.Clock },
    { id: 'security', label: 'Security', Icon: Ic.Shield },
    { id: 'preferences', label: 'Preferences', Icon: Ic.Settings },
];

const ACTIVITY = [
    { time: '10:30 AM', label: 'Logged in', app: '', color: '#10b981', dot: '#10b981', Icon: Ic.LogIn },
    { time: '10:15 AM', label: 'Worked on Dashboard Design', app: 'Figma', color: '#8b5cf6', dot: '#ef4444', Icon: Ic.Figma },
    { time: '09:45 AM', label: 'Attended team meeting', app: 'Google Meet', color: '#3b82f6', dot: '#f59e0b', Icon: Ic.Meet },
    { time: '09:30 AM', label: 'Updated project wireframes', app: 'Figma', color: '#8b5cf6', dot: '#8b5cf6', Icon: Ic.Figma },
    { time: '09:00 AM', label: 'Logged out', app: '', color: '#ef4444', dot: '#ef4444', Icon: Ic.LogOut },
];

const COUNTRIES = ['+1 US', '+ 44 UK', '+91 IN', '+49 DE', '+33 FR', '+81 JP', '+86 CN', '+61 AU'];
const GENDERS = ['Male', 'Female', 'Non-binary', 'Prefer not to say'];
const LOCATIONS = ['New York, USA', 'Mumbai, India', 'London, UK', 'Dubai, UAE', 'Singapore', 'Sydney, Australia'];
const DEPARTMENTS = ['Design Team', 'Engineering', 'Marketing', 'Sales', 'HR', 'Finance', 'Operations'];
const ROLES = ['UI/UX Designer', 'Frontend Developer', 'Backend Developer', 'Project Manager', 'HR Manager', 'Analyst'];
const TIMEZONES = ['(GMT+05:30) Asia/Kolkata', '(GMT+00:00) UTC', '(GMT-05:00) New York', '(GMT+01:00) London'];
const LANGUAGES = ['English (US)', 'Hindi', 'Spanish', 'French', 'German', 'Japanese'];
const THEMES = ['Light', 'Dark', 'System Default'];

/* ══ PORTAL DROPDOWN ═════════════════════════════════════════════════════ */
function Dropdown({ options, value, onChange }) {
    const [open, setOpen] = useState(false);
    const [pos, setPos] = useState(null);
    const btnRef = useRef(null);
    const dropRef = useRef(null);

    useEffect(() => {
        if (!open) return;
        const h = e => { if (!btnRef.current?.contains(e.target) && !dropRef.current?.contains(e.target)) setOpen(false); };
        document.addEventListener('mousedown', h);
        return () => document.removeEventListener('mousedown', h);
    }, [open]);

    useEffect(() => {
        if (!open || !btnRef.current) return;
        const calc = () => {
            const r = btnRef.current.getBoundingClientRect();
            const dropH = Math.min(options.length * 38 + 10, 240);
            const below = window.innerHeight - r.bottom;
            const up = below < dropH + 8 && r.top > dropH;
            setPos({ top: up ? r.top - dropH - 4 : r.bottom + 4, left: r.left, width: r.width, up });
        };
        calc();
        window.addEventListener('scroll', calc, true);
        window.addEventListener('resize', calc);
        return () => { window.removeEventListener('scroll', calc, true); window.removeEventListener('resize', calc); };
    }, [open, options.length]);

    return (
        <div className="pf-dd-wrap">
            <button ref={btnRef} type="button" className="pf-dd-btn" onClick={() => setOpen(o => !o)}>
                <span>{value}</span><Ic.ChevD />
            </button>
            {open && pos && ReactDOM.createPortal(
                <div ref={dropRef} className="pf-dd-menu" style={{ position: 'fixed', top: pos.top, left: pos.left, width: pos.width, zIndex: 99999 }}>
                    {options.map(opt => (
                        <div key={opt} className={`pf-dd-item ${opt === value ? 'active' : ''}`}
                            onMouseDown={e => { e.preventDefault(); onChange(opt); setOpen(false); }}>
                            {opt}{opt === value && <Ic.Check />}
                        </div>
                    ))}
                </div>, document.body
            )}
        </div>
    );
}

/* ══ FIELD ═══════════════════════════════════════════════════════════════ */
function Field({ label, children, required }) {
    return (
        <div className="pf-field">
            <label className="pf-label">{label}{required && <span className="pf-req">*</span>}</label>
            {children}
        </div>
    );
}

/* ══ STAT CARD ═══════════════════════════════════════════════════════════ */
function StatCard({ Icon, label, value, sub, subColor, color, bg }) {
    return (
        <div className="pf-stat-card">
            <div className="pf-stat-icon" style={{ background: bg, color }}><Icon /></div>
            <div className="pf-stat-body">
                <div className="pf-stat-label">{label}</div>
                <div className="pf-stat-value">{value}</div>
                {sub && <div className="pf-stat-sub" style={{ color: subColor }}>{sub}</div>}
            </div>
        </div>
    );
}

/* ══ MAIN COMPONENT ══════════════════════════════════════════════════════ */
export default function Profile() {
    const [page, setPage] = useState('view'); // 'view' | 'edit'
    const [activeTab, setActiveTab] = useState('personal');
    const [saved, setSaved] = useState(false);
    const photoRef = useRef(null);

    /* Profile fields */
    const [photo, setPhoto] = useState(null);
    const [name, setName] = useState('John Smith');
    const [email, setEmail] = useState('john.smith@workmonitor.com');
    const [phone, setPhone] = useState('+1 (555) 123-4567');
    const [country, setCountry] = useState('+1 US');
    const [dob, setDob] = useState('May 15, 1990');
    const [gender, setGender] = useState('Male');
    const [location, setLocation] = useState('New York, USA');
    const [bio, setBio] = useState('Passionate UI/UX Designer with 5+ years of experience in creating user-centered designs for web and mobile applications.\nI love turning complex problems into simple, beautiful and intuitive solutions.');
    const [dept, setDept] = useState('Design Team');
    const [role, setRole] = useState('UI/UX Designer');
    const [empId] = useState('EMP001');
    const [joinDate] = useState('Jan 15, 2024');
    const [tz, setTz] = useState('(GMT+05:30) Asia/Kolkata');
    const [lang, setLang] = useState('English (US)');
    const [theme, setTheme] = useState('Light');

    /* Security */
    const [oldPass, setOldPass] = useState('');
    const [newPass, setNewPass] = useState('');
    const [confPass, setConfPass] = useState('');
    const [showOld, setShowOld] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [showConf, setShowConf] = useState(false);
    const [twoFA, setTwoFA] = useState(true);
    const [sessions] = useState([
        { device: 'Chrome – Windows', ip: '192.168.1.100', time: 'Active now', current: true },
        { device: 'Safari – iPhone', ip: '192.168.1.105', time: '2 hours ago', current: false },
        { device: 'Firefox – Mac', ip: '10.0.0.22', time: 'Yesterday', current: false },
    ]);

    /* Preferences */
    const [emailNotif, setEmailNotif] = useState(true);
    const [pushNotif, setPushNotif] = useState(true);
    const [weeklyRep, setWeeklyRep] = useState(true);
    const [actAlerts, setActAlerts] = useState(false);

    const handlePhotoChange = e => {
        const f = e.target.files[0];
        if (f) setPhoto(URL.createObjectURL(f));
    };

    const handleSave = () => {
        setSaved(true);
        setTimeout(() => { setSaved(false); setPage('view'); }, 1400);
    };

    /* Breadcrumb */
    const breadcrumb = page === 'edit'
        ? ['Home', 'Profile', 'Edit Profile']
        : ['Home', 'Profile'];

    const title = page === 'edit' ? 'Edit Profile' : 'My Profile';

    /* ── RENDER ─────────────────────────────────────────────────────────── */
    return (
        <div className="pf-page">

           

            {/* ── BODY ── */}
            <div className="pf-body">

                {/* ══ LEFT MAIN ══ */}
                <div className="pf-main">

                    {/* ── PROFILE HERO ── */}
                    <div className="pf-hero-card">
                        <div className="pf-hero-left">
                            <div className="pf-avatar-wrap">
                                {photo
                                    ? <img src={photo} alt="avatar" className="pf-avatar-img" />
                                    : <div className="pf-avatar-placeholder"><Ic.User /></div>
                                }
                                <span className="pf-online-dot" />
                            </div>
                            <div className="pf-hero-info">
                                <div className="pf-hero-name">{name} <span className="pf-online-badge">Online</span></div>
                                <div className="pf-hero-role">{role} &nbsp;•&nbsp; {dept}</div>
                                <div className="pf-hero-meta">
                                    <span><Ic.Mail />{email}</span>
                                    <span><Ic.Phone />{phone}</span>
                                    <span><Ic.Badge />Employee ID: {empId}</span>
                                    <span><Ic.Calendar />Joined on {joinDate}</span>
                                </div>
                            </div>
                        </div>
                        {/* Stat cards */}
                        <div className="pf-stats-row">
                            <StatCard Icon={Ic.Clock} label="Work Time Today" value="8h 15m" sub="of 9h 00m" subColor="#9ca3af" color="#3b82f6" bg="#eff6ff" />
                            <StatCard Icon={Ic.BarChart} label="Productivity" value="85%" sub="+5% vs yesterday" subColor="#16a34a" color="#10b981" bg="#d1fae5" />
                            <StatCard Icon={Ic.CheckSq} label="Tasks Completed" value="12/15" sub="80% completion" subColor="#b5179e" color="#8b5cf6" bg="#f5f3ff" />
                            <StatCard Icon={Ic.Zap} label="Last Active" value="10:30 AM" sub="May 20, 2024" subColor="#9ca3af" color="#f97316" bg="#fff7ed" />
                        </div>
                    </div>

                    {/* ── TABS ── */}
                    <div className="pf-tabs-bar">
                        {PROFILE_TABS.map(t => (
                            <button key={t.id} className={`pf-tab ${activeTab === t.id ? 'active' : ''}`}
                                onClick={() => setActiveTab(t.id)}>
                                <t.Icon />{t.label}
                            </button>
                        ))}
                    </div>

                    {/* ══ PERSONAL ══ */}
                    {activeTab === 'personal' && (
                        <div className="pf-card">
                            <div className="pf-card-header">
                                <div className="pf-card-title">Personal Information</div>
                                {page === 'view' && <button className="pf-edit-sm-btn" onClick={() => setPage('edit')}><Ic.Edit /> Edit</button>}
                            </div>

                            {page === 'view' ? (
                                <div className="pf-view-grid">
                                    {[
                                        ['Full Name', name], ['Email Address', email],
                                        ['Phone Number', phone], ['Date of Birth', dob],
                                        ['Gender', gender], ['Location', location],
                                    ].map(([l, v]) => (
                                        <div key={l} className="pf-view-row">
                                            <span className="pf-view-label">{l}</span>
                                            <span className="pf-view-val">{v}</span>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <>
                                    <div className="pf-form-grid">
                                        {/* Left */}
                                        <div className="pf-form-col">
                                            <Field label="Full Name" required>
                                                <input className="pf-input" value={name} onChange={e => setName(e.target.value)} />
                                            </Field>
                                            <Field label="Email Address" required>
                                                <input className="pf-input" value={email} onChange={e => setEmail(e.target.value)} />
                                            </Field>
                                            <Field label="Phone Number">
                                                <div className="pf-phone-row">
                                                    <Dropdown options={COUNTRIES} value={country} onChange={setCountry} />
                                                    <input className="pf-input pf-phone-input" value={phone} onChange={e => setPhone(e.target.value)} />
                                                </div>
                                            </Field>
                                            <Field label="Date of Birth">
                                                <div className="pf-icon-input-wrap">
                                                    <Ic.Calendar />
                                                    <input className="pf-input pf-icon-input" value={dob} onChange={e => setDob(e.target.value)} />
                                                </div>
                                            </Field>
                                        </div>
                                        {/* Right */}
                                        <div className="pf-form-col">
                                            <Field label="Profile Photo">
                                                <div className="pf-photo-upload-row">
                                                    <div className="pf-photo-preview" onClick={() => photoRef.current?.click()}>
                                                        {photo ? <img src={photo} alt="preview" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} /> : <Ic.User />}
                                                    </div>
                                                    <div>
                                                        <input ref={photoRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handlePhotoChange} />
                                                        <button className="pf-change-photo-btn" onClick={() => photoRef.current?.click()}><Ic.Upload /> Change Photo</button>
                                                        <div className="pf-photo-hint">JPG, PNG up to 2MB</div>
                                                    </div>
                                                </div>
                                            </Field>
                                            <Field label="Gender">
                                                <Dropdown options={GENDERS} value={gender} onChange={setGender} />
                                            </Field>
                                            <Field label="Location">
                                                <Dropdown options={LOCATIONS} value={location} onChange={setLocation} />
                                            </Field>
                                        </div>
                                    </div>

                                    {/* About */}
                                    <div className="pf-field" style={{ marginTop: 8 }}>
                                        <label className="pf-label">About Me</label>
                                        <textarea className="pf-textarea" value={bio} onChange={e => setBio(e.target.value)} maxLength={500} rows={4} />
                                        <div className="pf-char-count">{bio.length}/500</div>
                                    </div>

                                    {/* Save */}
                                    <div className="pf-save-row">
                                        <button className="pf-cancel-btn" onClick={() => setPage('view')}>Cancel</button>
                                        <button className="pf-save-btn" onClick={handleSave}>
                                            {saved ? <><Ic.Check /> Saved!</> : <><Ic.Save /> Save Changes</>}
                                        </button>
                                    </div>
                                </>
                            )}

                            {/* About Me in view mode */}
                            {page === 'view' && (
                                <div className="pf-about-section">
                                    <div className="pf-about-title">About Me</div>
                                    <div className="pf-about-text">{bio}</div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* ══ WORK ══ */}
                    {activeTab === 'work' && (
                        <div className="pf-card">
                            <div className="pf-card-header">
                                <div className="pf-card-title">Work Information</div>
                                {page === 'view' && <button className="pf-edit-sm-btn" onClick={() => setPage('edit')}><Ic.Edit /> Edit</button>}
                            </div>
                            {page === 'view' ? (
                                <div className="pf-view-grid">
                                    {[['Employee ID', empId], ['Department', dept], ['Role', role], ['Join Date', joinDate], ['Work Location', location], ['Employee Type', 'Full-time']].map(([l, v]) => (
                                        <div key={l} className="pf-view-row"><span className="pf-view-label">{l}</span><span className="pf-view-val">{v}</span></div>
                                    ))}
                                </div>
                            ) : (
                                <>
                                    <div className="pf-form-grid">
                                        <div className="pf-form-col">
                                            <Field label="Employee ID"><input className="pf-input" value={empId} readOnly style={{ opacity: 0.6 }} /></Field>
                                            <Field label="Department"><Dropdown options={DEPARTMENTS} value={dept} onChange={setDept} /></Field>
                                            <Field label="Role / Job Title"><Dropdown options={ROLES} value={role} onChange={setRole} /></Field>
                                        </div>
                                        <div className="pf-form-col">
                                            <Field label="Work Location"><Dropdown options={LOCATIONS} value={location} onChange={setLocation} /></Field>
                                            <Field label="Join Date"><input className="pf-input" value={joinDate} readOnly style={{ opacity: 0.6 }} /></Field>
                                            <Field label="Employee Type"><input className="pf-input" value="Full-time" readOnly style={{ opacity: 0.6 }} /></Field>
                                        </div>
                                    </div>
                                    <div className="pf-save-row">
                                        <button className="pf-cancel-btn" onClick={() => setPage('view')}>Cancel</button>
                                        <button className="pf-save-btn" onClick={handleSave}>{saved ? <><Ic.Check /> Saved!</> : <><Ic.Save /> Save Changes</>}</button>
                                    </div>
                                </>
                            )}
                        </div>
                    )}

                    {/* ══ PERFORMANCE ══ */}
                    {activeTab === 'performance' && (
                        <div className="pf-card">
                            <div className="pf-card-header"><div className="pf-card-title">Performance Overview</div></div>
                            <div className="pf-perf-grid">
                                {[
                                    { label: 'Total Work Hours (Month)', value: '168h 30m', pct: 92, color: '#3b82f6' },
                                    { label: 'Average Productivity', value: '85%', pct: 85, color: '#10b981' },
                                    { label: 'Tasks Completion Rate', value: '80%', pct: 80, color: '#8b5cf6' },
                                    { label: 'Attendance Rate', value: '96%', pct: 96, color: '#f97316' },
                                ].map((p, i) => (
                                    <div key={i} className="pf-perf-item">
                                        <div className="pf-perf-top"><span className="pf-perf-label">{p.label}</span><span className="pf-perf-val">{p.value}</span></div>
                                        <div className="pf-perf-bar-wrap"><div className="pf-perf-bar" style={{ width: `${p.pct}%`, background: p.color }} /></div>
                                    </div>
                                ))}
                            </div>
                            <div className="pf-view-grid" style={{ marginTop: 18 }}>
                                {[['Working Days (Month)', '21 days'], ['Avg Daily Hours', '8h 02m'], ['Tasks Assigned', '15'], ['Tasks Completed', '12'], ['Idle Time (Avg)', '52 min/day'], ['Screenshots (Month)', '1,248']].map(([l, v]) => (
                                    <div key={l} className="pf-view-row"><span className="pf-view-label">{l}</span><span className="pf-view-val">{v}</span></div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* ══ TIMELINE ══ */}
                    {activeTab === 'timeline' && (
                        <div className="pf-card">
                            <div className="pf-card-header"><div className="pf-card-title">Activity Timeline</div><span style={{ fontSize: 11, color: '#b388b3' }}>Today, May 20, 2024</span></div>
                            <div className="pf-timeline">
                                {ACTIVITY.map((a, i) => (
                                    <div key={i} className="pf-tl-item">
                                        <div className="pf-tl-time">{a.time}</div>
                                        <div className="pf-tl-dot-col">
                                            <div className="pf-tl-dot" style={{ background: a.dot }} />
                                            {i < ACTIVITY.length - 1 && <div className="pf-tl-line" />}
                                        </div>
                                        <div className="pf-tl-content">
                                            <div className="pf-tl-label">{a.label}</div>
                                            {a.app && <div className="pf-tl-app"><a.Icon />{a.app}</div>}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* ══ SECURITY ══ */}
                    {activeTab === 'security' && (
                        <div className="pf-card">
                            <div className="pf-card-header"><div className="pf-card-title">Security Settings</div></div>
                            {/* Change Password */}
                            <div className="pf-sec-section">
                                <div className="pf-sec-title"><Ic.Lock />Change Password</div>
                                <div className="pf-form-col" style={{ maxWidth: 420 }}>
                                    <Field label="Current Password">
                                        <div className="pf-pass-wrap">
                                            <input className="pf-input pf-pass-input" type={showOld ? 'text' : 'password'} value={oldPass} onChange={e => setOldPass(e.target.value)} placeholder="Enter current password" />
                                            <button className="pf-eye-btn" onClick={() => setShowOld(v => !v)}>{showOld ? <Ic.EyeOff /> : <Ic.Eye />}</button>
                                        </div>
                                    </Field>
                                    <Field label="New Password">
                                        <div className="pf-pass-wrap">
                                            <input className="pf-input pf-pass-input" type={showNew ? 'text' : 'password'} value={newPass} onChange={e => setNewPass(e.target.value)} placeholder="Enter new password" />
                                            <button className="pf-eye-btn" onClick={() => setShowNew(v => !v)}>{showNew ? <Ic.EyeOff /> : <Ic.Eye />}</button>
                                        </div>
                                    </Field>
                                    <Field label="Confirm Password">
                                        <div className="pf-pass-wrap">
                                            <input className="pf-input pf-pass-input" type={showConf ? 'text' : 'password'} value={confPass} onChange={e => setConfPass(e.target.value)} placeholder="Confirm new password" />
                                            <button className="pf-eye-btn" onClick={() => setShowConf(v => !v)}>{showConf ? <Ic.EyeOff /> : <Ic.Eye />}</button>
                                        </div>
                                    </Field>
                                    <button className="pf-save-btn" style={{ marginTop: 4 }} onClick={() => { setOldPass(''); setNewPass(''); setConfPass(''); }}><Ic.Key /> Update Password</button>
                                </div>
                            </div>
                            {/* 2FA */}
                            <div className="pf-sec-section">
                                <div className="pf-sec-title"><Ic.Smartphone />Two-Factor Authentication</div>
                                <div className="pf-2fa-row">
                                    <div>
                                        <div className="pf-2fa-label">Authenticator App</div>
                                        <div className="pf-2fa-sub">Add an extra layer of security to your account</div>
                                    </div>
                                    <button className={`pf-toggle ${twoFA ? 'on' : ''}`} onClick={() => setTwoFA(v => !v)}><div className="pf-toggle-thumb" /></button>
                                </div>
                            </div>
                            {/* Sessions */}
                            <div className="pf-sec-section">
                                <div className="pf-sec-title"><Ic.Monitor />Active Sessions</div>
                                {sessions.map((s, i) => (
                                    <div key={i} className="pf-session-row">
                                        <div className="pf-session-icon"><Ic.Monitor /></div>
                                        <div className="pf-session-info">
                                            <div className="pf-session-device">{s.device}</div>
                                            <div className="pf-session-meta">{s.ip} · {s.time}</div>
                                        </div>
                                        {s.current
                                            ? <span className="pf-badge-green">Current</span>
                                            : <button className="pf-revoke-btn"><Ic.Trash />Revoke</button>
                                        }
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* ══ PREFERENCES ══ */}
                    {activeTab === 'preferences' && (
                        <div className="pf-card">
                            <div className="pf-card-header"><div className="pf-card-title">Preferences</div></div>
                            <div className="pf-form-grid">
                                <div className="pf-form-col">
                                    <Field label="Language"><Dropdown options={LANGUAGES} value={lang} onChange={setLang} /></Field>
                                    <Field label="Timezone"><Dropdown options={TIMEZONES} value={tz} onChange={setTz} /></Field>
                                    <Field label="Theme"><Dropdown options={THEMES} value={theme} onChange={setTheme} /></Field>
                                </div>
                                <div className="pf-form-col">
                                    {[
                                        { label: 'Email Notifications', sub: 'Receive email digests and alerts', val: emailNotif, set: setEmailNotif },
                                        { label: 'Push Notifications', sub: 'Browser and mobile push alerts', val: pushNotif, set: setPushNotif },
                                        { label: 'Weekly Reports', sub: 'Get weekly productivity summary', val: weeklyRep, set: setWeeklyRep },
                                        { label: 'Activity Alerts', sub: 'Real-time alerts on activity', val: actAlerts, set: setActAlerts },
                                    ].map((p, i) => (
                                        <div key={i} className="pf-pref-row">
                                            <div><div className="pf-pref-label">{p.label}</div><div className="pf-pref-sub">{p.sub}</div></div>
                                            <button className={`pf-toggle ${p.val ? 'on' : ''}`} onClick={() => p.set(v => !v)}><div className="pf-toggle-thumb" /></button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="pf-save-row">
                                <button className="pf-save-btn" onClick={handleSave}>{saved ? <><Ic.Check /> Saved!</> : <><Ic.Save /> Save Preferences</>}</button>
                            </div>
                        </div>
                    )}
                </div>

                {/* ══ RIGHT SIDEBAR ══ */}
                <div className="pf-sidebar">

                    {/* Account Summary */}
                    <div className="pf-sb-card">
                        <div className="pf-sb-title">Account Summary</div>
                        {[
                            { Icon: Ic.Building, label: 'Account Type', val: 'Enterprise' },
                            { Icon: Ic.Calendar, label: 'Member Since', val: 'Jan 15, 2024' },
                            { Icon: Ic.Clock, label: 'Last Login', val: 'May 20, 2024 10:30 AM' },
                            { Icon: Ic.Globe, label: 'Login IP', val: '192.168.1.100' },
                            { Icon: Ic.CheckCircle, label: 'Account Status', val: 'Active' },
                        ].map((r, i) => (
                            <div key={i} className="pf-sb-row">
                                <span className="pf-sb-icon"><r.Icon /></span>
                                <span className="pf-sb-label">{r.label}</span>
                                <span className={`pf-sb-val ${r.label === 'Account Status' ? 'pf-status-active' : ''}`}>{r.val}</span>
                            </div>
                        ))}
                    </div>

                    {/* Today's Activity */}
                    <div className="pf-sb-card">
                        <div className="pf-sb-header-row">
                            <div className="pf-sb-title">Today's Activity</div>
                            <button className="pf-view-all-btn">View All</button>
                        </div>
                        {ACTIVITY.map((a, i) => (
                            <div key={i} className="pf-act-row">
                                <span className="pf-act-time">{a.time}</span>
                                <div className="pf-act-dot" style={{ background: a.dot }} />
                                <div>
                                    <div className="pf-act-label">{a.label}</div>
                                    {a.app && <div className="pf-act-app">{a.app}</div>}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Quick Actions */}
                    <div className="pf-sb-card">
                        <div className="pf-sb-title">Quick Actions</div>
                        {[
                            { Icon: Ic.Lock, label: 'Change Password', tab: 'security' },
                            { Icon: Ic.Monitor, label: 'Manage Sessions', tab: 'security' },
                            { Icon: Ic.Bell, label: 'Notification Preferences', tab: 'preferences' },
                            { Icon: Ic.Download, label: 'Download My Data', tab: 'personal' },
                        ].map((a, i) => (
                            <button key={i} className="pf-quick-btn" onClick={() => setActiveTab(a.tab)}>
                                <span className="pf-quick-icon"><a.Icon /></span>
                                <span className="pf-quick-label">{a.label}</span>
                                <Ic.ChevR />
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}