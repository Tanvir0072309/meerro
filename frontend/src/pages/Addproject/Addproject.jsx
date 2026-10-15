import React, { useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useNavigate } from 'react-router-dom';
import './Addproject.css';

/* ══ ICONS ══════════════════════════════════════════════════════════════ */
const Icons = {
    ChevronDown: () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>,
    ChevronRight: () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>,
    Check: () => <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>,
    Upload: () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 16 12 12 8 16" /><line x1="12" y1="12" x2="12" y2="21" /><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" /></svg>,
    Calendar: () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>,
    ArrowRight: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>,
    ArrowLeft: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" /></svg>,
    X: () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>,
    Search: () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>,
    User: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>,
    Users: () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>,
    Trash: () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" /></svg>,
    Folder: () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" /></svg>,
    Monitor: () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" /></svg>,
    Clock: () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>,
    DollarSign: () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>,
    Bell: () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></svg>,
    Globe: () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>,
    Code: () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>,
    Smartphone: () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" /><line x1="12" y1="18" x2="12.01" y2="18" /></svg>,
    Megaphone: () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 11l19-9-9 19-2-8-8-2z" /></svg>,
    Settings: () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3" /><path d="M19.07 4.93a10 10 0 0 1 1.41 1.41M4.93 4.93A10 10 0 0 0 3.52 6.34M19.07 19.07a10 10 0 0 1-1.41 1.41M4.93 19.07a10 10 0 0 0 1.41 1.41M22 12h-2M4 12H2M12 2V4M12 20v2" /></svg>,
    Palette: () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="13.5" cy="6.5" r="1.5" /><circle cx="17.5" cy="10.5" r="1.5" /><circle cx="8.5" cy="7.5" r="1.5" /><circle cx="6.5" cy="12.5" r="1.5" /><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c1.85 0 3-.5 3-2v-1.5c0-.83.67-1.5 1.5-1.5H18c2.21 0 4-1.79 4-4C22 6.48 17.52 2 12 2z" /></svg>,
    Lightbulb: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="9" y1="18" x2="15" y2="18" /><line x1="10" y1="22" x2="14" y2="22" /><path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14" /></svg>,
    CheckCircle: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>,
    Plus: () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>,
    Edit: () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>,
    ShieldCheck: () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><polyline points="9 12 11 14 15 10" /></svg>,
};

/* ══ DATA ═══════════════════════════════════════════════════════════════ */
const STEPS = [
    { num: 1, label: 'Project Information', desc: 'Basic details' },
    { num: 2, label: 'Project Settings', desc: 'Configure settings' },
    { num: 3, label: 'Team & Members', desc: 'Add team members' },
    { num: 4, label: 'Review & Create', desc: 'Review and create project' },
];

const TEMPLATES = [
    { id: 'web', Icon: Icons.Globe, label: 'Web Development', desc: 'Website and web application projects' },
    { id: 'mobile', Icon: Icons.Smartphone, label: 'Mobile App Development', desc: 'Mobile applications for iOS and Android' },
    { id: 'marketing', Icon: Icons.Megaphone, label: 'Marketing Campaign', desc: 'Marketing and advertising campaigns' },
    { id: 'internal', Icon: Icons.Settings, label: 'Internal Project', desc: 'Internal tools and process projects' },
    { id: 'design', Icon: Icons.Palette, label: 'Design Project', desc: 'UI/UX and graphic design projects' },
];

const CLIENTS = ['TechNova Inc.', 'BrightFuture Ltd.', 'MarketPeak', 'SoftWave', 'NextGen Store', 'DataInsights', 'PeoplePro', 'Acme Corp'];
const CATEGORIES = ['Web Development', 'Mobile Development', 'UI/UX Design', 'Software Development', 'Marketing', 'Data Analytics', 'HR & Operations', 'Content Creation'];
const STATUSES = ['In Progress', 'Not Started', 'On Hold', 'Completed'];
const PRIORITIES = ['Critical', 'High', 'Medium', 'Low'];
const CURRENCIES = ['USD ($)', 'EUR (€)', 'GBP (£)', 'INR (₹)', 'JPY (¥)', 'AUD (A$)'];
const TIMEZONES = ['Asia/Kolkata (IST)', 'America/New_York (EST)', 'Europe/London (GMT)', 'America/Los_Angeles (PST)', 'Asia/Singapore (SGT)'];
const SS_FREQ = ['Every 5 minutes', 'Every 10 minutes', 'Every 15 minutes', 'Every 30 minutes', 'Every hour'];
const SS_QUALITY = ['Low', 'Medium (recommended)', 'High'];
const IDLE_TIME = ['3 minutes', '5 minutes', '10 minutes', '15 minutes', '30 minutes'];
const TRACK_MODE = ['Automatic (recommended)', 'Manual', 'Scheduled'];
const ALERT_PCT = ['50%', '60%', '70%', '75%', '80%', '90%'];
const ROLES = ['Developer', 'Designer', 'QA Engineer', 'Project Manager', 'Business Analyst', 'DevOps', 'Marketing', 'Content Writer'];
const AV_COLORS = ['#9c27b0', '#b5179e', '#43a047', '#e65100', '#1565c0', '#c62828', '#0288d1', '#558b2f', '#6d4c41', '#00838f'];
const MEMBERS_POOL = [
    { name: 'John Smith', role: 'Developer', dept: 'Engineering' },
    { name: 'Sarah Johnson', role: 'Designer', dept: 'Design' },
    { name: 'Michael Brown', role: 'QA Engineer', dept: 'QA' },
    { name: 'Emily Davis', role: 'Business Analyst', dept: 'Product' },
    { name: 'David Wilson', role: 'Developer', dept: 'Engineering' },
    { name: 'Jessica Martinez', role: 'Designer', dept: 'Design' },
    { name: 'James Anderson', role: 'DevOps', dept: 'Engineering' },
    { name: 'Daniel Thomas', role: 'Marketing', dept: 'Marketing' },
    { name: 'Priya Mehta', role: 'Developer', dept: 'Engineering' },
    { name: 'Rahul Verma', role: 'QA Engineer', dept: 'QA' },
];

const avColor = n => AV_COLORS[n.charCodeAt(0) % AV_COLORS.length];
const initials = n => n.split(' ').map(w => w[0]).join('').toUpperCase();

const PROJECT_COLORS = ['#3b82f6', '#10b981', '#8b5cf6', '#f59e0b', '#ef4444', '#06b6d4', '#ec4899', '#6b7280'];

/* ══ SHARED COMPONENTS ═══════════════════════════════════════════════════ */
function Toggle({ checked, onChange }) {
    return (
        <button type="button" className={`ap-toggle ${checked ? 'on' : ''}`} onClick={() => onChange(!checked)}>
            <div className="ap-toggle-thumb" />
        </button>
    );
}

function Select({ value, onChange, options, placeholder, full }) {
    const [open, setOpen] = useState(false);
    const [rect, setRect] = useState(null);
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
        const update = () => {
            const r = btnRef.current.getBoundingClientRect();
            const est = Math.min(options.length * 38 + 10, 240);
            const below = window.innerHeight - r.bottom - 6;
            const up = below < est && r.top > est;
            setRect({ left: r.left, width: r.width, up, top: up ? undefined : r.bottom + 4, bottom: up ? window.innerHeight - r.top + 4 : undefined });
        };
        update();
        window.addEventListener('scroll', update, true);
        window.addEventListener('resize', update);
        return () => { window.removeEventListener('scroll', update, true); window.removeEventListener('resize', update); };
    }, [open, options.length]);

    return (
        <div className={`ap-select-wrap ${full ? 'full' : ''}`}>
            <button ref={btnRef} type="button" className="ap-select-btn" onClick={() => setOpen(o => !o)}>
                <span style={{ color: value ? '#2d1a3e' : '#b388b3' }}>{value || placeholder}</span>
                <span className={`ap-select-arrow ${open ? 'open' : ''}`}><Icons.ChevronDown /></span>
            </button>
            {open && rect && ReactDOM.createPortal(
                <div ref={dropRef} className="ap-dropdown" style={{ position: 'fixed', left: rect.left, width: Math.max(rect.width, 160), zIndex: 99999, ...(rect.up ? { bottom: rect.bottom } : { top: rect.top }) }}>
                    {options.map(opt => (
                        <div key={opt} className={`ap-dropdown-item ${opt === value ? 'selected' : ''}`}
                            onMouseDown={e => { e.preventDefault(); onChange(opt); setOpen(false); }}>
                            <span>{opt}</span>
                            {opt === value && <span className="ap-dd-check"><Icons.Check /></span>}
                        </div>
                    ))}
                </div>, document.body
            )}
        </div>
    );
}

function MemberAvatar({ name, size = 28 }) {
    return (
        <div style={{ width: size, height: size, borderRadius: '50%', background: avColor(name), color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: size * 0.35, flexShrink: 0, fontFamily: 'DM Sans,sans-serif' }}>
            {initials(name)}
        </div>
    );
}

/* ══ STEP 1 ═══════════════════════════════════════════════════════════════ */
function Step1({ form, setForm }) {
    const logoRef = useRef(null);
    const [logoImg, setLogoImg] = useState(null);

    const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

    const handleLogo = e => {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = ev => setLogoImg(ev.target.result);
        reader.readAsDataURL(file);
        e.target.value = '';
    };

    return (
        <div className="ap-step-body">
            <div className="ap-section">
                <div className="ap-section-title">Basic Information</div>
                <div className="ap-section-sub">Enter the basic details of the project.</div>

                <div className="ap-fields-2col">
                    {/* Left */}
                    <div className="ap-col">
                        <div className="ap-field">
                            <label className="ap-label">Project Name <span className="ap-req">*</span></label>
                            <input className="ap-input" placeholder="Enter project name" value={form.name} onChange={e => set('name', e.target.value)} />
                        </div>

                        <div className="ap-field">
                            <label className="ap-label">Client / Company <span className="ap-req">*</span></label>
                            <Select value={form.client} onChange={v => set('client', v)} options={CLIENTS} placeholder="Select client or company" full />
                        </div>

                        <div className="ap-field">
                            <label className="ap-label">Project Description</label>
                            <textarea className="ap-textarea" placeholder="Enter project description" maxLength={500}
                                value={form.description} onChange={e => set('description', e.target.value)} />
                            <div className="ap-char-count">{form.description.length}/500</div>
                        </div>

                        <div className="ap-field">
                            <label className="ap-label">Project Category</label>
                            <Select value={form.category} onChange={v => set('category', v)} options={CATEGORIES} placeholder="Select category" full />
                        </div>

                        <div className="ap-field">
                            <label className="ap-label">Start Date <span className="ap-req">*</span></label>
                            <div className="ap-date-wrap">
                                <span className="ap-date-icon"><Icons.Calendar /></span>
                                <input type="date" className="ap-input ap-date-input" value={form.startDate} onChange={e => set('startDate', e.target.value)} />
                            </div>
                        </div>
                    </div>

                    {/* Right */}
                    <div className="ap-col">
                        <div className="ap-field">
                            <label className="ap-label">Project Logo <span className="ap-opt">(Optional)</span></label>
                            <div className="ap-logo-upload" onClick={() => logoRef.current?.click()}>
                                {logoImg
                                    ? <img src={logoImg} alt="logo" className="ap-logo-preview-img" />
                                    : <>
                                        <Icons.Upload />
                                        <div className="ap-logo-upload-text">Upload Logo</div>
                                    </>
                                }
                                <input ref={logoRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleLogo} />
                            </div>
                            <div className="ap-logo-hint">JPG, PNG up to 2MB</div>
                        </div>

                        <div className="ap-field">
                            <label className="ap-label">Project Color</label>
                            <div className="ap-color-row">
                                {PROJECT_COLORS.map(c => (
                                    <button key={c} type="button" className={`ap-color-swatch ${form.color === c ? 'selected' : ''}`}
                                        style={{ background: c }} onClick={() => set('color', c)}>
                                        {form.color === c && <Icons.Check />}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="ap-field">
                            <label className="ap-label">Status</label>
                            <Select value={form.status} onChange={v => set('status', v)} options={STATUSES} placeholder="Select status" full />
                        </div>

                        <div className="ap-field">
                            <label className="ap-label">Deadline</label>
                            <div className="ap-date-wrap">
                                <span className="ap-date-icon"><Icons.Calendar /></span>
                                <input type="date" className="ap-input ap-date-input" value={form.deadline} onChange={e => set('deadline', e.target.value)} />
                            </div>
                        </div>

                        <div className="ap-field">
                            <label className="ap-label">Project Priority</label>
                            <div className="ap-priority-select-wrap">
                                <div className="ap-priority-dot" style={{ background: form.priority === 'Critical' ? '#ef4444' : form.priority === 'High' ? '#f97316' : form.priority === 'Medium' ? '#f59e0b' : '#10b981' }} />
                                <Select value={form.priority} onChange={v => set('priority', v)} options={PRIORITIES} placeholder="Select priority" full />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Project Settings Preview */}
            <div className="ap-section">
                <div className="ap-section-title">Project Settings <span className="ap-preview-tag">Preview</span></div>
                <div className="ap-section-sub">Configure key settings for the project.</div>

                <div className="ap-settings-grid">
                    <div className="ap-setting-row">
                        <div className="ap-setting-info">
                            <div className="ap-setting-label">Enable Time Tracking</div>
                            <div className="ap-setting-sub">Track time spent on this project</div>
                        </div>
                        <Toggle checked={form.timeTracking} onChange={v => set('timeTracking', v)} />
                    </div>
                    <div className="ap-setting-row">
                        <div className="ap-setting-info">
                            <div className="ap-setting-label">Enable Screenshots</div>
                            <div className="ap-setting-sub">Capture screenshots for this project</div>
                        </div>
                        <Toggle checked={form.screenshots} onChange={v => set('screenshots', v)} />
                    </div>
                    <div className="ap-setting-row">
                        <div className="ap-setting-info">
                            <div className="ap-setting-label">Enable Activity Monitoring</div>
                            <div className="ap-setting-sub">Monitor activity for this project</div>
                        </div>
                        <Toggle checked={form.activityMonitoring} onChange={v => set('activityMonitoring', v)} />
                    </div>
                    <div className="ap-setting-row">
                        <div className="ap-setting-info">
                            <div className="ap-setting-label">Billable Project</div>
                            <div className="ap-setting-sub">Mark this project as billable</div>
                        </div>
                        <Toggle checked={form.billable} onChange={v => set('billable', v)} />
                    </div>
                    <div className="ap-setting-row">
                        <div className="ap-setting-info">
                            <div className="ap-setting-label">Set Budget <span className="ap-opt">(Optional)</span></div>
                            <div className="ap-setting-sub">Define project budget</div>
                        </div>
                        <div className="ap-budget-input-wrap">
                            <span className="ap-budget-symbol">$</span>
                            <input type="number" className="ap-budget-input" value={form.budget} onChange={e => set('budget', e.target.value)} placeholder="0.00" />
                        </div>
                    </div>
                    <div className="ap-setting-row">
                        <div className="ap-setting-info">
                            <div className="ap-setting-label">Estimated Hours <span className="ap-opt">(Optional)</span></div>
                            <div className="ap-setting-sub">Expected total hours</div>
                        </div>
                        <div className="ap-hours-input-wrap">
                            <input type="number" className="ap-hours-input" value={form.estimatedHours} onChange={e => set('estimatedHours', e.target.value)} placeholder="0" />
                            <span className="ap-hours-label">hrs</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

/* ══ STEP 2 ═══════════════════════════════════════════════════════════════ */
function Step2({ form, setForm }) {
    const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
    return (
        <div className="ap-step-body">

            {/* Screenshot Settings */}
            <div className="ap-section">
                <div className="ap-section-header-row">
                    <div className="ap-section-icon-wrap" style={{ background: '#e0f2fe', color: '#0369a1' }}><Icons.Monitor /></div>
                    <div>
                        <div className="ap-section-title">Screenshot Monitoring</div>
                        <div className="ap-section-sub">Configure how screenshots are captured for this project.</div>
                    </div>
                </div>
                <div className="ap-settings-grid">
                    <div className="ap-setting-row">
                        <div className="ap-setting-info"><div className="ap-setting-label">Enable Screenshots</div><div className="ap-setting-sub">Capture screenshots at set intervals</div></div>
                        <Toggle checked={form.screenshots} onChange={v => set('screenshots', v)} />
                    </div>
                    <div className="ap-setting-row">
                        <div className="ap-setting-info"><div className="ap-setting-label">Blur Sensitive Data</div><div className="ap-setting-sub">Blur passwords and sensitive form fields</div></div>
                        <Toggle checked={form.blurSensitive} onChange={v => set('blurSensitive', v)} />
                    </div>
                    <div className="ap-setting-row">
                        <div className="ap-setting-info"><div className="ap-setting-label">Allow Employee Preview</div><div className="ap-setting-sub">Let members view their own screenshots</div></div>
                        <Toggle checked={form.empPreview} onChange={v => set('empPreview', v)} />
                    </div>
                    <div className="ap-setting-row">
                        <div className="ap-setting-info"><div className="ap-setting-label">Notify Before Capture</div><div className="ap-setting-sub">Show notification icon before screenshot</div></div>
                        <Toggle checked={form.notifyCapture} onChange={v => set('notifyCapture', v)} />
                    </div>
                </div>
                <div className="ap-fields-3col ap-fields-pad">
                    <div className="ap-field"><label className="ap-label">Screenshot Frequency</label><Select value={form.ssFreq} onChange={v => set('ssFreq', v)} options={SS_FREQ} placeholder="Select frequency" full /></div>
                    <div className="ap-field"><label className="ap-label">Screenshot Quality</label><Select value={form.ssQuality} onChange={v => set('ssQuality', v)} options={SS_QUALITY} placeholder="Select quality" full /></div>
                    <div className="ap-field"><label className="ap-label">Screenshot Retention</label><Select value={form.ssRetention} onChange={v => set('ssRetention', v)} options={['30 days', '60 days', '90 days', '180 days', '1 year']} placeholder="Select retention" full /></div>
                </div>
            </div>

            {/* Time & Activity */}
            <div className="ap-section">
                <div className="ap-section-header-row">
                    <div className="ap-section-icon-wrap" style={{ background: '#d1fae5', color: '#065f46' }}><Icons.Clock /></div>
                    <div>
                        <div className="ap-section-title">Time &amp; Activity Tracking</div>
                        <div className="ap-section-sub">Control how time and activity data is collected.</div>
                    </div>
                </div>
                <div className="ap-settings-grid">
                    <div className="ap-setting-row">
                        <div className="ap-setting-info"><div className="ap-setting-label">Enable Time Tracking</div><div className="ap-setting-sub">Track billable and non-billable hours</div></div>
                        <Toggle checked={form.timeTracking} onChange={v => set('timeTracking', v)} />
                    </div>
                    <div className="ap-setting-row">
                        <div className="ap-setting-info"><div className="ap-setting-label">Activity Monitoring</div><div className="ap-setting-sub">Monitor keyboard, mouse and app usage</div></div>
                        <Toggle checked={form.activityMonitoring} onChange={v => set('activityMonitoring', v)} />
                    </div>
                    <div className="ap-setting-row">
                        <div className="ap-setting-info"><div className="ap-setting-label">Track App &amp; URLs</div><div className="ap-setting-sub">Log applications and websites visited</div></div>
                        <Toggle checked={form.trackApps} onChange={v => set('trackApps', v)} />
                    </div>
                    <div className="ap-setting-row">
                        <div className="ap-setting-info"><div className="ap-setting-label">Overtime Tracking</div><div className="ap-setting-sub">Detect and flag overtime hours</div></div>
                        <Toggle checked={form.overtimeTracking} onChange={v => set('overtimeTracking', v)} />
                    </div>
                </div>
                <div className="ap-fields-3col ap-fields-pad">
                    <div className="ap-field"><label className="ap-label">Tracking Mode</label><Select value={form.trackMode} onChange={v => set('trackMode', v)} options={TRACK_MODE} placeholder="Select mode" full /></div>
                    <div className="ap-field"><label className="ap-label">Idle Time Threshold</label><Select value={form.idleTime} onChange={v => set('idleTime', v)} options={IDLE_TIME} placeholder="Select threshold" full /></div>
                    <div className="ap-field"><label className="ap-label">Project Timezone</label><Select value={form.timezone} onChange={v => set('timezone', v)} options={TIMEZONES} placeholder="Select timezone" full /></div>
                </div>
            </div>

            {/* Budget & Billing */}
            <div className="ap-section">
                <div className="ap-section-header-row">
                    <div className="ap-section-icon-wrap" style={{ background: '#fef3c7', color: '#92400e' }}><Icons.DollarSign /></div>
                    <div>
                        <div className="ap-section-title">Budget &amp; Billing</div>
                        <div className="ap-section-sub">Set financial parameters for this project.</div>
                    </div>
                </div>
                <div className="ap-settings-grid">
                    <div className="ap-setting-row">
                        <div className="ap-setting-info"><div className="ap-setting-label">Billable Project</div><div className="ap-setting-sub">Mark time tracked as billable to client</div></div>
                        <Toggle checked={form.billable} onChange={v => set('billable', v)} />
                    </div>
                    <div className="ap-setting-row">
                        <div className="ap-setting-info"><div className="ap-setting-label">Budget Alerts</div><div className="ap-setting-sub">Alert when budget threshold is reached</div></div>
                        <Toggle checked={form.budgetAlert} onChange={v => set('budgetAlert', v)} />
                    </div>
                </div>
                <div className="ap-fields-3col ap-fields-pad">
                    <div className="ap-field">
                        <label className="ap-label">Currency</label>
                        <Select value={form.currency} onChange={v => set('currency', v)} options={CURRENCIES} placeholder="Select currency" full />
                    </div>
                    <div className="ap-field">
                        <label className="ap-label">Total Budget</label>
                        <div className="ap-input-prefix-wrap">
                            <span className="ap-input-prefix">$</span>
                            <input className="ap-input ap-input-has-prefix" type="number" placeholder="0.00" value={form.budget} onChange={e => set('budget', e.target.value)} />
                        </div>
                    </div>
                    <div className="ap-field">
                        <label className="ap-label">Billing Rate <span className="ap-opt">(per hour)</span></label>
                        <div className="ap-input-prefix-wrap">
                            <span className="ap-input-prefix">$</span>
                            <input className="ap-input ap-input-has-prefix" type="number" placeholder="0.00" value={form.billingRate} onChange={e => set('billingRate', e.target.value)} />
                        </div>
                    </div>
                    <div className="ap-field">
                        <label className="ap-label">Estimated Hours</label>
                        <div className="ap-input-suffix-wrap">
                            <input className="ap-input ap-input-has-suffix" type="number" placeholder="0" value={form.estimatedHours} onChange={e => set('estimatedHours', e.target.value)} />
                            <span className="ap-input-suffix">hrs</span>
                        </div>
                    </div>
                    <div className="ap-field">
                        <label className="ap-label">Budget Alert Threshold</label>
                        <Select value={form.alertThreshold} onChange={v => set('alertThreshold', v)} options={ALERT_PCT} placeholder="Select %" full />
                    </div>
                </div>
            </div>

            {/* Notifications */}
            <div className="ap-section">
                <div className="ap-section-header-row">
                    <div className="ap-section-icon-wrap" style={{ background: '#ede9fe', color: '#5b21b6' }}><Icons.Bell /></div>
                    <div>
                        <div className="ap-section-title">Notifications</div>
                        <div className="ap-section-sub">Choose which events trigger alerts for this project.</div>
                    </div>
                </div>
                <div className="ap-settings-grid">
                    <div className="ap-setting-row">
                        <div className="ap-setting-info"><div className="ap-setting-label">Email Notifications</div><div className="ap-setting-sub">Send project updates via email</div></div>
                        <Toggle checked={form.emailNotif} onChange={v => set('emailNotif', v)} />
                    </div>
                    <div className="ap-setting-row">
                        <div className="ap-setting-info"><div className="ap-setting-label">Milestone Alerts</div><div className="ap-setting-sub">Alert when milestones are reached or missed</div></div>
                        <Toggle checked={form.milestoneAlert} onChange={v => set('milestoneAlert', v)} />
                    </div>
                    <div className="ap-setting-row">
                        <div className="ap-setting-info"><div className="ap-setting-label">Deadline Reminders</div><div className="ap-setting-sub">Notify team 3 days before deadline</div></div>
                        <Toggle checked={form.deadlineReminder} onChange={v => set('deadlineReminder', v)} />
                    </div>
                    <div className="ap-setting-row">
                        <div className="ap-setting-info"><div className="ap-setting-label">Low Productivity Alerts</div><div className="ap-setting-sub">Alert managers on low activity periods</div></div>
                        <Toggle checked={form.lowProdAlert} onChange={v => set('lowProdAlert', v)} />
                    </div>
                </div>
            </div>
        </div>
    );
}

/* ══ STEP 3 ═══════════════════════════════════════════════════════════════ */
function Step3({ form, setForm }) {
    const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
    const [search, setSearch] = useState('');
    const [roleMap, setRoleMap] = useState({});

    const filtered = MEMBERS_POOL.filter(m =>
        !form.members.includes(m.name) &&
        (m.name.toLowerCase().includes(search.toLowerCase()) || m.dept.toLowerCase().includes(search.toLowerCase()))
    );

    const addMember = name => {
        set('members', [...form.members, name]);
        setRoleMap(r => ({ ...r, [name]: MEMBERS_POOL.find(m => m.name === name)?.role || 'Developer' }));
    };

    const removeMember = name => {
        set('members', form.members.filter(m => m !== name));
        setRoleMap(r => { const n = { ...r }; delete n[name]; return n; });
    };

    return (
        <div className="ap-step-body">
            <div className="ap-section">
                <div className="ap-section-header-row">
                    <div className="ap-section-icon-wrap" style={{ background: '#f3e5f5', color: '#7b1fa2' }}><Icons.User /></div>
                    <div>
                        <div className="ap-section-title">Project Manager</div>
                        <div className="ap-section-sub">Assign the person responsible for this project.</div>
                    </div>
                </div>
                <div className="ap-field" style={{ maxWidth: 380 }}>
                    <label className="ap-label">Select Project Manager <span className="ap-req">*</span></label>
                    <Select value={form.manager} onChange={v => set('manager', v)}
                        options={MEMBERS_POOL.map(m => m.name)} placeholder="Select project manager" full />
                    {form.manager && (
                        <div className="ap-manager-chip">
                            <MemberAvatar name={form.manager} size={30} />
                            <div>
                                <div className="ap-manager-name">{form.manager}</div>
                                <div className="ap-manager-role">{MEMBERS_POOL.find(m => m.name === form.manager)?.role}</div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className="ap-section">
                <div className="ap-section-header-row">
                    <div className="ap-section-icon-wrap" style={{ background: '#e8f5e9', color: '#2e7d32' }}><Icons.Users /></div>
                    <div>
                        <div className="ap-section-title">Team Members</div>
                        <div className="ap-section-sub">Add members and assign roles for this project.</div>
                    </div>
                </div>

                <div className="ap-team-layout">
                    {/* Available pool */}
                    <div className="ap-team-pool">
                        <div className="ap-pool-header">
                            <span className="ap-pool-title">Available Members</span>
                            <span className="ap-pool-count">{MEMBERS_POOL.length - form.members.length} available</span>
                        </div>
                        <div className="ap-pool-search">
                            <Icons.Search />
                            <input placeholder="Search members..." value={search} onChange={e => setSearch(e.target.value)} />
                        </div>
                        <div className="ap-pool-list">
                            {filtered.length === 0
                                ? <div className="ap-pool-empty">All members added or no results.</div>
                                : filtered.map(m => (
                                    <div key={m.name} className="ap-pool-item">
                                        <MemberAvatar name={m.name} size={30} />
                                        <div className="ap-pool-item-info">
                                            <div className="ap-pool-item-name">{m.name}</div>
                                            <div className="ap-pool-item-role">{m.role} · {m.dept}</div>
                                        </div>
                                        <button className="ap-pool-add-btn" onClick={() => addMember(m.name)}><Icons.Plus /></button>
                                    </div>
                                ))
                            }
                        </div>
                    </div>

                    {/* Selected members */}
                    <div className="ap-team-selected">
                        <div className="ap-pool-header">
                            <span className="ap-pool-title">Added to Project</span>
                            <span className="ap-pool-count">{form.members.length} selected</span>
                        </div>
                        {form.members.length === 0
                            ? <div className="ap-selected-empty"><Icons.Users /><span>No members added yet.<br />Add members from the list.</span></div>
                            : (
                                <div className="ap-selected-table">
                                    <div className="ap-selected-table-head">
                                        <span>Member</span><span>Role</span><span></span>
                                    </div>
                                    {form.members.map(name => (
                                        <div key={name} className="ap-selected-row">
                                            <div className="ap-selected-member">
                                                <MemberAvatar name={name} size={28} />
                                                <span className="ap-selected-name">{name}</span>
                                            </div>
                                            <Select
                                                value={roleMap[name] || 'Developer'}
                                                onChange={v => setRoleMap(r => ({ ...r, [name]: v }))}
                                                options={ROLES}
                                                placeholder="Role"
                                            />
                                            <button className="ap-selected-remove" onClick={() => removeMember(name)}><Icons.Trash /></button>
                                        </div>
                                    ))}
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

/* ══ STEP 4 ═══════════════════════════════════════════════════════════════ */
function Step4({ form }) {
    const priorityColor = { Critical: '#ef4444', High: '#f97316', Medium: '#f59e0b', Low: '#10b981' };

    const ReviewRow = ({ label, value }) => (
        <div className="ap-review-row">
            <span className="ap-review-key">{label}</span>
            <span className="ap-review-val">{value || <em style={{ color: '#c4a0c4' }}>Not set</em>}</span>
        </div>
    );

    const SettingRow = ({ label, value }) => (
        <div className="ap-review-setting-row">
            <span className="ap-review-setting-dot" style={{ background: value ? '#10b981' : '#d1d5db' }} />
            <span className="ap-review-setting-label">{label}</span>
            <span className={`ap-review-setting-status ${value ? 'on' : 'off'}`}>{value ? 'Enabled' : 'Disabled'}</span>
        </div>
    );

    return (
        <div className="ap-step-body">
            <div className="ap-review-header">
                <div className="ap-review-header-icon" style={{ background: form.color || '#3b82f6' }}>
                    <Icons.Folder />
                </div>
                <div>
                    <div className="ap-review-project-name">{form.name || 'Unnamed Project'}</div>
                    <div className="ap-review-project-meta">
                        {form.client && <span>{form.client}</span>}
                        {form.category && <><span className="ap-dot">·</span><span>{form.category}</span></>}
                        {form.priority && <><span className="ap-dot">·</span><span style={{ color: priorityColor[form.priority] }}>{form.priority} Priority</span></>}
                    </div>
                </div>
            </div>

            <div className="ap-review-grid">
                {/* Project Details */}
                <div className="ap-review-card">
                    <div className="ap-review-card-title">Project Details</div>
                    <ReviewRow label="Project Name" value={form.name} />
                    <ReviewRow label="Client" value={form.client} />
                    <ReviewRow label="Category" value={form.category} />
                    <ReviewRow label="Status" value={form.status} />
                    <ReviewRow label="Start Date" value={form.startDate} />
                    <ReviewRow label="Deadline" value={form.deadline} />
                    <ReviewRow label="Priority" value={form.priority} />
                    {form.description && (
                        <div className="ap-review-row ap-review-desc-row">
                            <span className="ap-review-key">Description</span>
                            <span className="ap-review-val ap-review-desc">{form.description}</span>
                        </div>
                    )}
                </div>

                {/* Settings */}
                <div className="ap-review-card">
                    <div className="ap-review-card-title">Project Settings</div>
                    <SettingRow label="Time Tracking" value={form.timeTracking} />
                    <SettingRow label="Screenshots" value={form.screenshots} />
                    <SettingRow label="Activity Monitoring" value={form.activityMonitoring} />
                    <SettingRow label="Billable Project" value={form.billable} />
                    <SettingRow label="App & URL Tracking" value={form.trackApps} />
                    <SettingRow label="Overtime Tracking" value={form.overtimeTracking} />
                    {form.budget && <ReviewRow label="Budget" value={`$${form.budget}`} />}
                    {form.estimatedHours && <ReviewRow label="Est. Hours" value={`${form.estimatedHours} hrs`} />}
                    {form.currency && <ReviewRow label="Currency" value={form.currency} />}
                </div>

                {/* Team */}
                <div className="ap-review-card ap-review-team-card">
                    <div className="ap-review-card-title">Team</div>
                    {form.manager && (
                        <div className="ap-review-manager-row">
                            <span className="ap-review-key">Manager</span>
                            <div className="ap-review-member-chip">
                                <MemberAvatar name={form.manager} size={24} />
                                <span>{form.manager}</span>
                            </div>
                        </div>
                    )}
                    <div className="ap-review-key" style={{ marginBottom: 8, marginTop: 10 }}>Team Members ({form.members.length})</div>
                    {form.members.length === 0
                        ? <div style={{ fontSize: 12, color: '#b388b3', fontStyle: 'italic' }}>No members added.</div>
                        : <div className="ap-review-members">
                            {form.members.map((m, i) => (
                                <div key={i} className="ap-review-member-chip">
                                    <MemberAvatar name={m} size={24} />
                                    <span>{m}</span>
                                </div>
                            ))}
                        </div>
                    }
                </div>
            </div>
        </div>
    );
}

/* ══ RIGHT SIDEBAR ═══════════════════════════════════════════════════════ */
function RightSidebar({ step, template, setTemplate }) {
    return (
        <div className="ap-sidebar">
            {/* Project Templates */}
            <div className="ap-sb-card">
                <div className="ap-sb-card-title">Project Templates</div>
                <div className="ap-sb-card-sub">Choose a template to get started quickly.</div>
                <div className="ap-templates-list">
                    {TEMPLATES.map(t => (
                        <label key={t.id} className={`ap-template-row ${template === t.id ? 'selected' : ''}`}>
                            <div className="ap-template-icon" style={{ background: template === t.id ? '#f3e5f5' : '#faf5fb', color: '#9c27b0' }}>
                                <t.Icon />
                            </div>
                            <div className="ap-template-info">
                                <div className="ap-template-name">{t.label}</div>
                                <div className="ap-template-desc">{t.desc}</div>
                            </div>
                            <input type="radio" name="template" value={t.id} checked={template === t.id} onChange={() => setTemplate(t.id)} />
                        </label>
                    ))}
                </div>
                <button className="ap-use-template-btn">Use Template</button>
            </div>

            {/* What's Next */}
            <div className="ap-sb-card">
                <div className="ap-sb-card-title">What's Next?</div>
                <div className="ap-sb-card-sub">After creating your project, you can:</div>
                <div className="ap-whats-next-list">
                    {['Add team members', 'Create project tasks', 'Set project milestones', 'Track progress and reports'].map((item, i) => (
                        <div key={i} className="ap-whats-next-item">
                            <div className="ap-whats-next-check"><Icons.CheckCircle /></div>
                            <span>{item}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Tips */}
            <div className="ap-sb-card">
                <div className="ap-sb-card-title-row">
                    <div className="ap-tips-icon"><Icons.Lightbulb /></div>
                    <div className="ap-sb-card-title">Tips</div>
                </div>
                <ul className="ap-tips-list">
                    <li>Give your project a clear and descriptive name.</li>
                    <li>Set a realistic deadline and priority.</li>
                    <li>You can change these settings later.</li>
                    {step >= 2 && <li>Configure screenshot frequency based on project needs.</li>}
                    {step >= 3 && <li>Assign roles carefully — they affect access levels.</li>}
                </ul>
            </div>
        </div>
    );
}

/* ══ CONFIRMATION MODAL ══════════════════════════════════════════════════ */
function ConfirmModal({ form, onClose, onConfirm }) {
    return ReactDOM.createPortal(
        <div className="ap-modal-overlay" onClick={onClose}>
            <div className="ap-confirm-modal" onClick={e => e.stopPropagation()}>
                <div className="ap-confirm-top">
                    <div className="ap-confirm-icon"><Icons.ShieldCheck /></div>
                    <div className="ap-confirm-title">Create Project?</div>
                    <div className="ap-confirm-sub">You're about to create <strong>"{form.name || 'this project'}"</strong>. All settings will be saved and team members will be notified.</div>
                </div>
                <div className="ap-confirm-body">
                    <div className="ap-confirm-summary">
                        {[
                            { label: 'Project', value: form.name || '—' },
                            { label: 'Client', value: form.client || '—' },
                            { label: 'Priority', value: form.priority || '—' },
                            { label: 'Start', value: form.startDate || '—' },
                            { label: 'Deadline', value: form.deadline || '—' },
                            { label: 'Team', value: `${form.members.length + (form.manager ? 1 : 0)} member(s)` },
                        ].map((r, i) => (
                            <div key={i} className="ap-confirm-row">
                                <span className="ap-confirm-key">{r.label}</span>
                                <span className="ap-confirm-val">{r.value}</span>
                            </div>
                        ))}
                    </div>
                    <div className="ap-confirm-btns">
                        <button className="ap-confirm-cancel" onClick={onClose}>Cancel</button>
                        <button className="ap-confirm-create" onClick={onConfirm}>Create Project</button>
                    </div>
                </div>
            </div>
        </div>,
        document.body
    );
}

/* ══ SUCCESS MODAL ═══════════════════════════════════════════════════════ */
function SuccessModal({ form, onClose }) {
    const navigate = useNavigate();
    return ReactDOM.createPortal(
        <div className="ap-modal-overlay">
            <div className="ap-success-modal">
                <div className="ap-success-icon"><Icons.CheckCircle /></div>
                <div className="ap-success-title">Project Created!</div>
                <div className="ap-success-sub">
                    <strong>"{form.name}"</strong> has been created successfully. Your team has been notified.
                </div>
                <div className="ap-success-btns">
                    <button className="ap-confirm-cancel" onClick={() => navigate('/projects')}>Back to Projects</button>
                    <button className="ap-confirm-create" onClick={onClose}>View Project</button>
                </div>
            </div>
        </div>,
        document.body
    );
}

/* ══ MAIN ════════════════════════════════════════════════════════════════ */
const INIT_FORM = {
    // Step 1
    name: '', client: '', description: '', category: '', startDate: '', deadline: '',
    status: 'In Progress', priority: 'High', color: '#3b82f6',
    timeTracking: true, screenshots: true, activityMonitoring: true, billable: false,
    budget: '', estimatedHours: '',
    // Step 2
    blurSensitive: true, empPreview: false, notifyCapture: true,
    ssFreq: 'Every 10 minutes', ssQuality: 'Medium (recommended)', ssRetention: '90 days',
    trackMode: 'Automatic (recommended)', idleTime: '5 minutes', timezone: 'Asia/Kolkata (IST)',
    trackApps: true, overtimeTracking: false,
    billingRate: '', currency: 'USD ($)', budgetAlert: false, alertThreshold: '75%',
    emailNotif: true, milestoneAlert: true, deadlineReminder: true, lowProdAlert: false,
    // Step 3
    manager: '', members: [],
};

export default function AddProject() {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [form, setForm] = useState({ ...INIT_FORM });
    const [template, setTemplate] = useState('web');
    const [showConfirm, setShowConfirm] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const goNext = () => { if (step < 4) setStep(s => s + 1); else setShowConfirm(true); };
    const goBack = () => { if (step > 1) setStep(s => s - 1); };

    const handleConfirm = () => { setShowConfirm(false); setShowSuccess(true); };

    return (
        <div className="ap-page">
            

            {/* Stepper */}
            <div className="ap-stepper">
                {STEPS.map((s, i) => (
                    <div key={s.num} className="ap-step-wrap">
                        <div className="ap-step-inner" onClick={() => s.num < step && setStep(s.num)} style={{ cursor: s.num < step ? 'pointer' : 'default' }}>
                            <div className={`ap-step-circle ${step === s.num ? 'active' : step > s.num ? 'done' : ''}`}>
                                {step > s.num ? <Icons.Check /> : s.num}
                            </div>
                            <div className="ap-step-text">
                                <div className={`ap-step-label ${step === s.num ? 'active' : step > s.num ? 'done' : ''}`}>{s.label}</div>
                                <div className="ap-step-desc">{s.desc}</div>
                            </div>
                        </div>
                        {i < STEPS.length - 1 && <div className={`ap-step-connector ${step > s.num ? 'done' : ''}`} />}
                    </div>
                ))}
            </div>

            {/* Body */}
            <div className="ap-body">
                {/* Main content */}
                <div className="ap-main">
                    {step === 1 && <Step1 form={form} setForm={setForm} />}
                    {step === 2 && <Step2 form={form} setForm={setForm} />}
                    {step === 3 && <Step3 form={form} setForm={setForm} />}
                    {step === 4 && <Step4 form={form} />}

                    {/* Footer */}
                    <div className="ap-footer">
                        <button className="ap-footer-cancel" onClick={() => navigate('/projects')}>Cancel</button>
                        <div className="ap-footer-center">Step {step} of {STEPS.length}</div>
                        <div className="ap-footer-btns">
                            {step > 1 && (
                                <button className="ap-footer-back" onClick={goBack}>
                                    <Icons.ArrowLeft /> Back
                                </button>
                            )}
                            <button className="ap-footer-next" onClick={goNext}>
                                {step === 4 ? 'Create Project' : 'Next'} <Icons.ArrowRight />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Right sidebar */}
                <RightSidebar step={step} template={template} setTemplate={setTemplate} />
            </div>

            {showConfirm && <ConfirmModal form={form} onClose={() => setShowConfirm(false)} onConfirm={handleConfirm} />}
            {showSuccess && <SuccessModal form={form} onClose={() => setShowSuccess(false)} />}
        </div>
    );
}