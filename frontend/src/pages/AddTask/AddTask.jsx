import React, { useState, useRef, useEffect } from 'react';
import './AddTask.css';

/* ══════════════════════════════════════════ ICONS ══════════════════════════════════════════ */
const Icons = {
    Home: () => <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>,
    Chevron: () => <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>,
    ChevDown: () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>,
    ChevLeft: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>,
    ChevRight2: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>,
    Calendar: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>,
    Clock: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>,
    Plus: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>,
    X: () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>,
    Check: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>,
    Trash: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" /></svg>,
    Upload: () => <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 16 12 12 8 16" /><line x1="12" y1="12" x2="12" y2="21" /><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" /></svg>,
    File: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></svg>,
    Arrow: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>,
    Radio: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#c4a0c4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /></svg>,
    RadioFill: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" stroke="#b5179e" fill="none" /><circle cx="12" cy="12" r="5" fill="#b5179e" stroke="none" /></svg>,
    Lightbulb: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="9" y1="18" x2="15" y2="18" /><line x1="10" y1="22" x2="14" y2="22" /><path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14" /></svg>,
    Users: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>,
    Bell: () => <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#b5179e" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></svg>,
    TaskDone: () => <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>,
    Tag: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" /><line x1="7" y1="7" x2="7.01" y2="7" /></svg>,
    Repeat: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="17 1 21 5 17 9" /><path d="M3 11V9a4 4 0 0 1 4-4h14" /><polyline points="7 23 3 19 7 15" /><path d="M21 13v2a4 4 0 0 1-4 4H3" /></svg>,
    Eye: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>,
    Edit2: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>,
};

/* ══ Dropdown ══ */
function Dropdown({ trigger, children, align = 'left' }) {
    const [open, setOpen] = useState(false);
    const ref = useRef(null);
    useEffect(() => {
        const h = e => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
        document.addEventListener('mousedown', h);
        return () => document.removeEventListener('mousedown', h);
    }, []);
    return (
        <div className="at-dropdown-wrap" ref={ref}>
            <div onClick={() => setOpen(o => !o)}>{trigger(open)}</div>
            {open && (
                <div className={`at-dropdown-menu ${align === 'right' ? 'right' : ''}`} onClick={() => setOpen(false)}>
                    {children}
                </div>
            )}
        </div>
    );
}

function DropdownItem({ onClick, children, active }) {
    return (
        <div className={`at-dropdown-item${active ? ' active' : ''}`} onClick={onClick}>
            {children}
            {active && <span className="at-dd-check"><Icons.Check /></span>}
        </div>
    );
}

/* ══ DatePicker ══ */
function DatePicker({ value, onChange }) {
    const [open, setOpen] = useState(false);
    const [viewDate, setViewDate] = useState(value ? new Date(value) : new Date());
    const ref = useRef(null);
    useEffect(() => {
        const h = e => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
        document.addEventListener('mousedown', h);
        return () => document.removeEventListener('mousedown', h);
    }, []);
    const year = viewDate.getFullYear(), month = viewDate.getMonth();
    const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const firstDay = new Date(year, month, 1).getDay(), daysInMonth = new Date(year, month + 1, 0).getDate();
    const cells = [];
    for (let i = 0; i < firstDay; i++) cells.push(null);
    for (let d = 1; d <= daysInMonth; d++) cells.push(d);
    const selectDay = d => { if (!d) return; onChange(new Date(year, month, d).toISOString().split('T')[0]); setOpen(false); };
    const isSelected = d => { if (!value || !d) return false; const v = new Date(value); return v.getFullYear() === year && v.getMonth() === month && v.getDate() === d; };
    const isToday = d => { if (!d) return false; const t = new Date(); return t.getFullYear() === year && t.getMonth() === month && t.getDate() === d; };
    const fmt = value ? new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '';
    return (
        <div className="at-datepicker-wrap" ref={ref}>
            <button className={`at-field-input at-date-trigger${open ? ' focused' : ''}`} onClick={() => setOpen(o => !o)} type="button">
                <span className="at-field-icon"><Icons.Calendar /></span>
                <span style={{ color: value ? '#2d1a3e' : '#b388b3' }}>{fmt || 'Select due date'}</span>
            </button>
            {open && (
                <div className="at-calendar-popup">
                    <div className="at-cal-header">
                        <button className="at-cal-nav" onClick={() => setViewDate(new Date(year, month - 1, 1))}><Icons.ChevLeft /></button>
                        <span className="at-cal-title">{MONTHS[month]} {year}</span>
                        <button className="at-cal-nav" onClick={() => setViewDate(new Date(year, month + 1, 1))}><Icons.ChevRight2 /></button>
                    </div>
                    <div className="at-cal-days-header">{['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => <span key={d}>{d}</span>)}</div>
                    <div className="at-cal-grid">
                        {cells.map((d, i) => (
                            <button key={i} className={`at-cal-cell${d ? '' : ' empty'}${isSelected(d) ? ' selected' : ''}${isToday(d) ? ' today' : ''}`}
                                onClick={() => selectDay(d)} disabled={!d}>{d}</button>
                        ))}
                    </div>
                    <div className="at-cal-footer">
                        <button onClick={() => { onChange(''); setOpen(false); }} className="at-cal-clear">Clear</button>
                        <button onClick={() => { onChange(new Date().toISOString().split('T')[0]); setOpen(false); }} className="at-cal-today-btn">Today</button>
                    </div>
                </div>
            )}
        </div>
    );
}

/* ══ StepBar ══ */
function StepBar({ step }) {
    const STEPS = [
        { n: 1, title: 'Task Details', sub: 'Basic information' },
        { n: 2, title: 'Assignment', sub: 'Assign to team member' },
        { n: 3, title: 'Additional Settings', sub: 'Set priority, due date & more' },
        { n: 4, title: 'Review & Create', sub: 'Review and create task' },
    ];
    return (
        <div className="at-stepbar">
            {STEPS.map((s, i) => (
                <React.Fragment key={s.n}>
                    <div className={`at-step${step === s.n ? ' active' : step > s.n ? ' done' : ''}`}>
                        <div className="at-step-circle">{step > s.n ? <Icons.Check /> : s.n}</div>
                        <div className="at-step-info">
                            <div className="at-step-title">{s.title}</div>
                            <div className="at-step-sub">{s.sub}</div>
                        </div>
                    </div>
                    {i < STEPS.length - 1 && <div className={`at-step-line${step > s.n ? ' done' : ''}`} />}
                </React.Fragment>
            ))}
        </div>
    );
}

/* ══ Label colors ══ */
const LABEL_COLORS = {
    Bug: { bg: '#fce4ec', color: '#c62828', border: '#f48fb1' },
    Feature: { bg: '#e3f2fd', color: '#1565c0', border: '#90caf9' },
    Improvement: { bg: '#e8f5e9', color: '#2e7d32', border: '#a5d6a7' },
    Documentation: { bg: '#f3e5f5', color: '#6a1b9a', border: '#ce93d8' },
    Design: { bg: '#fff3e0', color: '#e65100', border: '#ffcc80' },
    Testing: { bg: '#fce4ec', color: '#880e4f', border: '#f48fb1' },
};
const ALL_LABELS = Object.keys(LABEL_COLORS);
const AV_COLORS = ['#9c27b0', '#b5179e', '#43a047', '#e65100', '#1565c0', '#c62828', '#0288d1'];
const avColor = n => AV_COLORS[n.charCodeAt(0) % AV_COLORS.length];
const initials = n => n.split(' ').map(w => w[0]).join('');

function Avatar({ name, size = 30 }) {
    return <div style={{ width: size, height: size, borderRadius: '50%', background: avColor(name), color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: size * 0.36, flexShrink: 0, fontFamily: 'DM Sans' }}>{initials(name)}</div>;
}

/* ══ DATA ══ */
const MEMBERS = [{ name: 'John Smith', role: 'UI/UX Designer', dot: '#22c55e' }, { name: 'Sarah Johnson', role: 'Developer', dot: '#22c55e' }, { name: 'Michael Brown', role: 'Developer', dot: '#f59e0b' }, { name: 'Emily Davis', role: 'QA Engineer', dot: '#ef4444' }, { name: 'David Wilson', role: 'Marketing', dot: '#6b7280' }];
const PROJECTS = ['Dashboard Redesign', 'Mobile App Development', 'CRM Integration', 'E-commerce Platform', 'Internal Tool'];
const CATEGORIES = ['UI/UX Design', 'Development', 'QA Testing', 'Content Writing', 'Marketing', 'Research', 'Management'];
const PRIORITIES = [{ label: 'High', color: '#ef4444' }, { label: 'Medium', color: '#f59e0b' }, { label: 'Low', color: '#22c55e' }, { label: 'Urgent', color: '#7c3aed' }];
const STATUSES = [{ label: 'In Progress', color: '#3b82f6' }, { label: 'Todo', color: '#6b7280' }, { label: 'Review', color: '#f59e0b' }, { label: 'Completed', color: '#22c55e' }, { label: 'On Hold', color: '#ef4444' }];
const RECURRENCE = ['Does not repeat', 'Daily', 'Weekly', 'Bi-weekly', 'Monthly'];
const DEFAULT_CHECKLIST = ['Research and gather requirements', 'Create initial design', 'Review with team', 'Finalize and deliver'];

/* ══ Confirmation Popup ══ */
function ConfirmPopup({ taskTitle, assignedName, onClose }) {
    return (
        <div className="at-popup-overlay" onClick={onClose}>
            <div className="at-popup" onClick={e => e.stopPropagation()}>
                <div className="at-popup-icon-wrap">
                    <div className="at-popup-icon-ring">
                        <Icons.TaskDone />
                    </div>
                </div>
                <h2 className="at-popup-title">Task Assigned!</h2>
                <p className="at-popup-msg">
                    <strong>"{taskTitle || 'New Task'}"</strong> has been successfully created and assigned to <strong>{assignedName}</strong>.
                </p>
                <div className="at-popup-details">
                    <div className="at-popup-detail-row">
                        <span className="at-popup-detail-label">Task Status</span>
                        <span className="at-popup-detail-val" style={{ color: '#3b82f6' }}>● In Progress</span>
                    </div>
                    <div className="at-popup-detail-row">
                        <span className="at-popup-detail-label">Assigned To</span>
                        <span className="at-popup-detail-val">{assignedName}</span>
                    </div>
                    <div className="at-popup-detail-row">
                        <span className="at-popup-detail-label">Notification</span>
                        <span className="at-popup-detail-val" style={{ color: '#22c55e' }}>Sent ✓</span>
                    </div>
                </div>
                <div className="at-popup-actions">
                    <button className="at-popup-btn-secondary" onClick={onClose}>Back to Tasks</button>
                    <button className="at-popup-btn-primary" onClick={onClose}>View Task</button>
                </div>
            </div>
        </div>
    );
}

/* ══ Review Row ══ */
function ReviewRow({ label, value, icon }) {
    return (
        <div className="at-review-row">
            <span className="at-review-label">{icon && <span className="at-review-icon">{icon}</span>}{label}</span>
            <span className="at-review-val">{value || <span style={{ color: '#c4a0c4', fontStyle: 'italic' }}>Not set</span>}</span>
        </div>
    );
}

/* ══ MAIN ══ */
export default function AddTask({ onCancel }) {
    const [step, setStep] = useState(1);
    const [showPopup, setShowPopup] = useState(false);

    // Step 1 — Task Details
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [project, setProject] = useState('');
    const [category, setCategory] = useState('');
    const [status, setStatus] = useState('In Progress');
    const [labels, setLabels] = useState(['Bug', 'Feature', 'Improvement', 'Documentation']);
    const [newLabel, setNewLabel] = useState('');
    const [showNewLabel, setShowNewLabel] = useState(false);
    const [files, setFiles] = useState([]);
    const [drag, setDrag] = useState(false);
    const [checklist, setChecklist] = useState(DEFAULT_CHECKLIST.map((t, i) => ({ id: i + 1, text: t, done: false })));
    const [newCheck, setNewCheck] = useState('');
    const fileRef = useRef(null);

    // Step 2 — Assignment
    const [assignMode, setAssignMode] = useState('single');
    const [assignedTo, setAssignedTo] = useState('John Smith');
    const [multiAssign, setMultiAssign] = useState([]);
    const [watcher, setWatcher] = useState('');

    // Step 3 — Additional Settings
    const [priority, setPriority] = useState('High');
    const [dueDate, setDueDate] = useState('');
    const [estHours, setEstHours] = useState('');
    const [recurrence, setRecurrence] = useState('Does not repeat');
    const [notify, setNotify] = useState(true);
    const [visibility, setVisibility] = useState('team');
    const [notes, setNotes] = useState('');

    const toggleLabel = l => setLabels(p => p.includes(l) ? p.filter(x => x !== l) : [...p, l]);
    const addLabel = () => { const t = newLabel.trim(); if (t && !labels.includes(t)) setLabels(p => [...p, t]); setNewLabel(''); setShowNewLabel(false); };
    const handleFiles = newFiles => { const arr = Array.from(newFiles).filter(f => f.size <= 10 * 1024 * 1024); setFiles(p => [...p, ...arr]); };
    const onDrop = e => { e.preventDefault(); setDrag(false); handleFiles(e.dataTransfer.files); };
    const addCheckItem = () => { const t = newCheck.trim(); if (!t) return; setChecklist(p => [...p, { id: Date.now(), text: t, done: false }]); setNewCheck(''); };
    const toggleCheck = id => setChecklist(p => p.map(c => c.id === id ? { ...c, done: !c.done } : c));
    const removeCheck = id => setChecklist(p => p.filter(c => c.id !== id));
    const toggleMulti = name => setMultiAssign(p => p.includes(name) ? p.filter(x => x !== name) : [...p, name]);

    const curStatus = STATUSES.find(s => s.label === status) || STATUSES[0];
    const curPriority = PRIORITIES.find(p => p.label === priority) || PRIORITIES[0];
    const assignDisplay = assignMode === 'single' ? assignedTo : assignMode === 'multiple' ? (multiAssign.length > 0 ? multiAssign.join(', ') : 'None selected') : 'Unassigned';

    const handleCreate = () => setShowPopup(true);

    return (
        <div className="at-page">
            {showPopup && <ConfirmPopup taskTitle={title} assignedName={assignDisplay} onClose={() => { setShowPopup(false); onCancel?.(); }} />}

            <div className="at-body">
                {/* ══ MAIN ══ */}
                <div className="at-main">
                    <div className="at-page-title">
                        <h1>Add New Task</h1>
                        <p>Create a new task and assign it to the right person.</p>
                    </div>

                    <StepBar step={step} />

                    {/* ════════════════ STEP 1 — TASK DETAILS ════════════════ */}
                    {step === 1 && (
                        <>
                            {/* Task Info */}
                            <div className="at-section">
                                <div className="at-section-title">Task Information</div>
                                <div className="at-row-2">
                                    <div className="at-field">
                                        <label className="at-label">Task Title <span className="at-req">*</span></label>
                                        <input className="at-field-input" placeholder="Enter task title" value={title} onChange={e => setTitle(e.target.value)} />
                                    </div>
                                    <div className="at-field">
                                        <label className="at-label">Project <span className="at-req">*</span></label>
                                        <Dropdown trigger={open => (
                                            <button className={`at-field-input at-select-trigger${open ? ' focused' : ''}`}>
                                                <span style={{ color: project ? '#2d1a3e' : '#b388b3' }}>{project || 'Select project'}</span>
                                                <span className={`at-select-arrow${open ? ' open' : ''}`}><Icons.ChevDown /></span>
                                            </button>
                                        )}>
                                            {PROJECTS.map(p => <DropdownItem key={p} active={project === p} onClick={() => setProject(p)}>{p}</DropdownItem>)}
                                        </Dropdown>
                                    </div>
                                </div>
                                <div className="at-row-2">
                                    <div className="at-field">
                                        <label className="at-label">Task Description</label>
                                        <div style={{ position: 'relative' }}>
                                            <textarea className="at-textarea" placeholder="Enter task description" maxLength={1000} value={description} onChange={e => setDescription(e.target.value)} />
                                            <span className="at-char-count">{description.length}/1000</span>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                                        <div className="at-field">
                                            <label className="at-label">Task Category</label>
                                            <Dropdown trigger={open => (
                                                <button className={`at-field-input at-select-trigger${open ? ' focused' : ''}`}>
                                                    <span style={{ color: category ? '#2d1a3e' : '#b388b3' }}>{category || 'Select category'}</span>
                                                    <span className={`at-select-arrow${open ? ' open' : ''}`}><Icons.ChevDown /></span>
                                                </button>
                                            )}>
                                                {CATEGORIES.map(c => <DropdownItem key={c} active={category === c} onClick={() => setCategory(c)}>{c}</DropdownItem>)}
                                            </Dropdown>
                                        </div>
                                        <div className="at-field">
                                            <label className="at-label">Status</label>
                                            <Dropdown trigger={open => (
                                                <button className={`at-field-input at-select-trigger${open ? ' focused' : ''}`}>
                                                    <span className="at-status-dot" style={{ background: curStatus.color }} />
                                                    <span style={{ color: '#2d1a3e' }}>{status}</span>
                                                    <span className={`at-select-arrow${open ? ' open' : ''}`}><Icons.ChevDown /></span>
                                                </button>
                                            )}>
                                                {STATUSES.map(s => <DropdownItem key={s.label} active={status === s.label} onClick={() => setStatus(s.label)}>
                                                    <span className="at-status-dot" style={{ background: s.color }} />{s.label}
                                                </DropdownItem>)}
                                            </Dropdown>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Labels */}
                            <div className="at-section">
                                <label className="at-label">Task Labels <span className="at-opt">(Optional)</span></label>
                                <div className="at-labels-wrap">
                                    {labels.map(l => {
                                        const style = LABEL_COLORS[l] || { bg: '#f3e5f5', color: '#7b1fa2', border: '#ce93d8' };
                                        return <span key={l} className="at-label-chip" style={{ background: style.bg, color: style.color, border: `1px solid ${style.border}` }}>
                                            {l}<button className="at-label-remove" onClick={() => toggleLabel(l)}><Icons.X /></button>
                                        </span>;
                                    })}
                                    <Dropdown trigger={open => <button className={`at-add-label-btn${open ? ' open' : ''}`}><Icons.Plus /> Add Label</button>}>
                                        {ALL_LABELS.filter(l => !labels.includes(l)).map(l => (
                                            <DropdownItem key={l} onClick={() => toggleLabel(l)}>
                                                <span className="at-label-chip-sm" style={{ background: LABEL_COLORS[l].bg, color: LABEL_COLORS[l].color }}>{l}</span>
                                            </DropdownItem>
                                        ))}
                                        <div className="at-dd-divider" />
                                        {showNewLabel ? (
                                            <div className="at-new-label-input" onClick={e => e.stopPropagation()}>
                                                <input autoFocus placeholder="Label name..." value={newLabel} onChange={e => setNewLabel(e.target.value)} onKeyDown={e => e.key === 'Enter' && addLabel()} />
                                                <button onClick={addLabel}><Icons.Check /></button>
                                            </div>
                                        ) : (
                                            <DropdownItem onClick={() => setShowNewLabel(true)}><Icons.Plus /> Custom label</DropdownItem>
                                        )}
                                    </Dropdown>
                                </div>
                            </div>

                            {/* Attachments + Checklist */}
                            <div className="at-row-2-even">
                                <div className="at-section">
                                    <div className="at-section-title">Attachments <span className="at-opt">(Optional)</span></div>
                                    <div className={`at-dropzone${drag ? ' drag-over' : ''}`}
                                        onDragOver={e => { e.preventDefault(); setDrag(true); }} onDragLeave={() => setDrag(false)}
                                        onDrop={onDrop} onClick={() => fileRef.current.click()}>
                                        <input ref={fileRef} type="file" multiple hidden accept=".jpg,.jpeg,.png,.pdf,.doc,.docx" onChange={e => handleFiles(e.target.files)} />
                                        <span className="at-dz-icon"><Icons.Upload /></span>
                                        <p className="at-dz-text">Drag and drop files here or</p>
                                        <button className="at-browse-btn" type="button" onClick={e => { e.stopPropagation(); fileRef.current.click(); }}>Browse Files</button>
                                        <p className="at-dz-hint">Supported: JPG, PNG, PDF, DOC, DOCX (Max 10MB)</p>
                                    </div>
                                    {files.length > 0 && <div className="at-file-list">{files.map((f, i) => (
                                        <div key={i} className="at-file-item">
                                            <span className="at-file-icon"><Icons.File /></span>
                                            <span className="at-file-name">{f.name}</span>
                                            <span className="at-file-size">({(f.size / 1024).toFixed(0)}KB)</span>
                                            <button className="at-file-remove" onClick={() => setFiles(p => p.filter((_, j) => j !== i))}><Icons.X /></button>
                                        </div>
                                    ))}</div>}
                                </div>

                                <div className="at-section">
                                    <div className="at-section-title">Checklist <span className="at-opt">(Optional)</span></div>
                                    <div className="at-checklist-add">
                                        <input className="at-checklist-input" placeholder="Add checklist item" value={newCheck} onChange={e => setNewCheck(e.target.value)} onKeyDown={e => e.key === 'Enter' && addCheckItem()} />
                                        <button className="at-checklist-add-btn" onClick={addCheckItem}>Add</button>
                                    </div>
                                    <div className="at-checklist-list">
                                        {checklist.map(item => (
                                            <div key={item.id} className={`at-check-item${item.done ? ' done' : ''}`}>
                                                <button className={`at-checkbox${item.done ? ' checked' : ''}`} onClick={() => toggleCheck(item.id)}>{item.done && <Icons.Check />}</button>
                                                <span className="at-check-text">{item.text}</span>
                                                <button className="at-check-remove" onClick={() => removeCheck(item.id)}><Icons.Trash /></button>
                                            </div>
                                        ))}
                                    </div>
                                    {checklist.length > 0 && <div className="at-checklist-progress">
                                        <div className="at-cl-bar-bg"><div className="at-cl-bar-fill" style={{ width: `${(checklist.filter(c => c.done).length / checklist.length) * 100}%` }} /></div>
                                        <span className="at-cl-count">{checklist.filter(c => c.done).length}/{checklist.length}</span>
                                    </div>}
                                </div>
                            </div>
                        </>
                    )}

                    {/* ════════════════ STEP 2 — ASSIGNMENT ════════════════ */}
                    {step === 2 && (
                        <>
                            <div className="at-section">
                                <div className="at-section-title">Assign Task</div>
                                <p className="at-section-desc">Choose who will be responsible for this task.</p>

                                {/* Assignment mode */}
                                <div className="at-assign-options-grid">
                                    {[
                                        { id: 'single', label: 'Assign to team member', sub: 'Choose a specific team member', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg> },
                                        { id: 'multiple', label: 'Assign to multiple members', sub: 'Assign to multiple team members', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg> },
                                        { id: 'none', label: 'Unassigned', sub: 'Create task without assignment', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><line x1="8" y1="12" x2="16" y2="12" /></svg> },
                                    ].map(opt => (
                                        <div key={opt.id} className={`at-assign-mode-card${assignMode === opt.id ? ' selected' : ''}`} onClick={() => setAssignMode(opt.id)}>
                                            <div className="at-assign-mode-radio">
                                                {assignMode === opt.id ? <Icons.RadioFill /> : <Icons.Radio />}
                                            </div>
                                            <div className={`at-assign-mode-icon${assignMode === opt.id ? ' active' : ''}`}>{opt.icon}</div>
                                            <div className="at-assign-label">{opt.label}</div>
                                            <div className="at-assign-sub">{opt.sub}</div>
                                        </div>
                                    ))}
                                </div>

                                {/* Single assign picker */}
                                {assignMode === 'single' && (
                                    <div className="at-section-inner">
                                        <div className="at-label" style={{ marginBottom: 10 }}>Select Team Member</div>
                                        <div className="at-member-picker-list">
                                            {MEMBERS.map(m => (
                                                <div key={m.name} className={`at-member-pick-row${assignedTo === m.name ? ' selected' : ''}`} onClick={() => setAssignedTo(m.name)}>
                                                    <div style={{ position: 'relative' }}>
                                                        <Avatar name={m.name} size={36} />
                                                        <span className="at-member-dot" style={{ background: m.dot }} />
                                                    </div>
                                                    <div style={{ flex: 1 }}>
                                                        <div className="at-member-name">{m.name}</div>
                                                        <div className="at-member-role">{m.role}</div>
                                                    </div>
                                                    <div className={`at-pick-check${assignedTo === m.name ? ' visible' : ''}`}><Icons.Check /></div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Multiple assign */}
                                {assignMode === 'multiple' && (
                                    <div className="at-section-inner">
                                        <div className="at-label" style={{ marginBottom: 10 }}>Select Team Members <span style={{ color: '#b388b3', fontWeight: 400 }}>({multiAssign.length} selected)</span></div>
                                        <div className="at-member-picker-list">
                                            {MEMBERS.map(m => (
                                                <div key={m.name} className={`at-member-pick-row${multiAssign.includes(m.name) ? ' selected' : ''}`} onClick={() => toggleMulti(m.name)}>
                                                    <span className={`at-checkbox${multiAssign.includes(m.name) ? ' checked' : ''}`} style={{ width: 18, height: 18 }}>
                                                        {multiAssign.includes(m.name) && <Icons.Check />}
                                                    </span>
                                                    <div style={{ position: 'relative' }}>
                                                        <Avatar name={m.name} size={36} />
                                                        <span className="at-member-dot" style={{ background: m.dot }} />
                                                    </div>
                                                    <div style={{ flex: 1 }}>
                                                        <div className="at-member-name">{m.name}</div>
                                                        <div className="at-member-role">{m.role}</div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Watcher */}
                            <div className="at-section">
                                <div className="at-section-title">Task Watcher <span className="at-opt">(Optional)</span></div>
                                <p className="at-section-desc">Add a watcher who will receive updates but isn't responsible for the task.</p>
                                <div className="at-field" style={{ maxWidth: 380 }}>
                                    <label className="at-label">Select Watcher</label>
                                    <Dropdown trigger={open => (
                                        <button className={`at-field-input at-select-trigger${open ? ' focused' : ''}`}>
                                            {watcher ? <><Avatar name={watcher} size={20} /><span style={{ color: '#2d1a3e', marginLeft: 8 }}>{watcher}</span></> : <span style={{ color: '#b388b3' }}>Select a watcher (optional)</span>}
                                            <span className={`at-select-arrow${open ? ' open' : ''}`}><Icons.ChevDown /></span>
                                        </button>
                                    )}>
                                        <DropdownItem active={watcher === ''} onClick={() => setWatcher('')}>None</DropdownItem>
                                        {MEMBERS.map(m => <DropdownItem key={m.name} active={watcher === m.name} onClick={() => setWatcher(m.name)}>
                                            <Avatar name={m.name} size={22} /><span style={{ marginLeft: 8 }}>{m.name}</span>
                                            <span style={{ fontSize: 10, color: '#b388b3', marginLeft: 'auto' }}>{m.role}</span>
                                        </DropdownItem>)}
                                    </Dropdown>
                                </div>
                            </div>
                        </>
                    )}

                    {/* ════════════════ STEP 3 — ADDITIONAL SETTINGS ════════════════ */}
                    {step === 3 && (
                        <>
                            {/* Priority / Due Date / Hours */}
                            <div className="at-section">
                                <div className="at-section-title">Priority & Timeline</div>
                                <div className="at-row-3">
                                    <div className="at-field">
                                        <label className="at-label">Priority <span className="at-req">*</span></label>
                                        <div className="at-priority-grid">
                                            {PRIORITIES.map(p => (
                                                <button key={p.label} className={`at-priority-chip${priority === p.label ? ' selected' : ''}`}
                                                    style={priority === p.label ? { borderColor: p.color, background: p.color + '18', color: p.color } : {}}
                                                    onClick={() => setPriority(p.label)}>
                                                    <span className="at-status-dot" style={{ background: p.color }} />{p.label}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="at-field">
                                        <label className="at-label">Due Date <span className="at-req">*</span></label>
                                        <DatePicker value={dueDate} onChange={setDueDate} />
                                    </div>
                                    <div className="at-field">
                                        <label className="at-label">Estimated Hours</label>
                                        <div className="at-input-with-icon">
                                            <span className="at-field-icon"><Icons.Clock /></span>
                                            <input className="at-field-input with-icon" placeholder="e.g., 5h 30m" value={estHours} onChange={e => setEstHours(e.target.value)} />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Recurrence */}
                            <div className="at-section">
                                <div className="at-section-title">Recurrence</div>
                                <div className="at-field" style={{ maxWidth: 320 }}>
                                    <label className="at-label">Repeat this task</label>
                                    <Dropdown trigger={open => (
                                        <button className={`at-field-input at-select-trigger${open ? ' focused' : ''}`}>
                                            <span className="at-field-icon" style={{ position: 'static', transform: 'none' }}><Icons.Repeat /></span>
                                            <span style={{ color: '#2d1a3e' }}>{recurrence}</span>
                                            <span className={`at-select-arrow${open ? ' open' : ''}`}><Icons.ChevDown /></span>
                                        </button>
                                    )}>
                                        {RECURRENCE.map(r => <DropdownItem key={r} active={recurrence === r} onClick={() => setRecurrence(r)}>{r}</DropdownItem>)}
                                    </Dropdown>
                                </div>
                            </div>

                            {/* Notifications & Visibility */}
                            <div className="at-row-2-even">
                                <div className="at-section">
                                    <div className="at-section-title">Notifications</div>
                                    <div className="at-toggle-row" onClick={() => setNotify(p => !p)}>
                                        <div>
                                            <div className="at-toggle-label">Notify Assignee</div>
                                            <div className="at-toggle-sub">Send an email and in-app notification</div>
                                        </div>
                                        <div className={`at-toggle${notify ? ' on' : ''}`}>
                                            <div className="at-toggle-thumb" />
                                        </div>
                                    </div>
                                </div>
                                <div className="at-section">
                                    <div className="at-section-title">Visibility</div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                                        {[{ v: 'team', label: 'Team Only', sub: 'Only team members can view' }, { v: 'public', label: 'Public', sub: 'Anyone in the workspace' }].map(opt => (
                                            <div key={opt.v} className={`at-visibility-option${visibility === opt.v ? ' selected' : ''}`} onClick={() => setVisibility(opt.v)}>
                                                {visibility === opt.v ? <Icons.RadioFill /> : <Icons.Radio />}
                                                <div><div className="at-assign-label">{opt.label}</div><div className="at-assign-sub">{opt.sub}</div></div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Additional Notes */}
                            <div className="at-section">
                                <div className="at-section-title">Additional Notes <span className="at-opt">(Optional)</span></div>
                                <div className="at-field">
                                    <textarea className="at-textarea" placeholder="Add any additional notes or context for this task..." value={notes} onChange={e => setNotes(e.target.value)} style={{ minHeight: 90 }} />
                                </div>
                            </div>
                        </>
                    )}

                    {/* ════════════════ STEP 4 — REVIEW & CREATE ════════════════ */}
                    {step === 4 && (
                        <>
                            <div className="at-section">
                                <div className="at-section-title-row">
                                    <div className="at-section-title">Review Your Task</div>
                                    <button className="at-edit-step-btn" onClick={() => setStep(1)}><Icons.Edit2 /> Edit Details</button>
                                </div>
                                <p className="at-section-desc">Please review all details before creating the task.</p>

                                <div className="at-review-block">
                                    <div className="at-review-block-title">Task Details</div>
                                    <ReviewRow label="Task Title" value={title} />
                                    <ReviewRow label="Project" value={project} />
                                    <ReviewRow label="Category" value={category} />
                                    <ReviewRow label="Status" value={<span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><span className="at-status-dot" style={{ background: curStatus.color }} />{status}</span>} />
                                    <ReviewRow label="Description" value={description || null} />
                                </div>

                                <div className="at-review-block">
                                    <div className="at-review-block-title-row">
                                        <div className="at-review-block-title">Assignment</div>
                                        <button className="at-edit-step-btn" onClick={() => setStep(2)}><Icons.Edit2 /> Edit</button>
                                    </div>
                                    <ReviewRow label="Assign Mode" value={assignMode === 'single' ? 'Single Member' : assignMode === 'multiple' ? 'Multiple Members' : 'Unassigned'} />
                                    <ReviewRow label="Assigned To" value={assignDisplay} />
                                    {watcher && <ReviewRow label="Watcher" value={watcher} />}
                                </div>

                                <div className="at-review-block">
                                    <div className="at-review-block-title-row">
                                        <div className="at-review-block-title">Settings</div>
                                        <button className="at-edit-step-btn" onClick={() => setStep(3)}><Icons.Edit2 /> Edit</button>
                                    </div>
                                    <ReviewRow label="Priority" value={<span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><span className="at-status-dot" style={{ background: curPriority.color }} />{priority}</span>} />
                                    <ReviewRow label="Due Date" value={dueDate ? new Date(dueDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : null} />
                                    <ReviewRow label="Est. Hours" value={estHours || null} />
                                    <ReviewRow label="Recurrence" value={recurrence !== 'Does not repeat' ? recurrence : null} />
                                    <ReviewRow label="Notifications" value={notify ? 'Enabled' : 'Disabled'} />
                                    <ReviewRow label="Visibility" value={visibility === 'team' ? 'Team Only' : 'Public'} />
                                </div>

                                {labels.length > 0 && <div className="at-review-block">
                                    <div className="at-review-block-title">Labels</div>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 8 }}>
                                        {labels.map(l => {
                                            const s = LABEL_COLORS[l] || { bg: '#f3e5f5', color: '#7b1fa2', border: '#ce93d8' };
                                            return <span key={l} className="at-label-chip" style={{ background: s.bg, color: s.color, border: `1px solid ${s.border}` }}>{l}</span>;
                                        })}
                                    </div>
                                </div>}

                                {checklist.length > 0 && <div className="at-review-block">
                                    <div className="at-review-block-title">Checklist ({checklist.length} items)</div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: 5, marginTop: 8 }}>
                                        {checklist.map(c => <div key={c.id} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: '#5c4a6e' }}>
                                            <span style={{ width: 14, height: 14, borderRadius: 4, border: '2px solid #d4b8d4', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, background: c.done ? 'linear-gradient(135deg,#b5179e,#9c27b0)' : '#fff', color: '#fff', borderColor: c.done ? 'transparent' : '#d4b8d4' }}>
                                                {c.done && <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>}
                                            </span>
                                            <span style={{ textDecoration: c.done ? 'line-through' : 'none', color: c.done ? '#b388b3' : '#2d1a3e' }}>{c.text}</span>
                                        </div>)}
                                    </div>
                                </div>}

                                {notes && <div className="at-review-block">
                                    <div className="at-review-block-title">Additional Notes</div>
                                    <p style={{ fontSize: 12.5, color: '#5c4a6e', lineHeight: 1.5, marginTop: 8 }}>{notes}</p>
                                </div>}
                            </div>

                            {/* Confirmation banner */}
                            <div className="at-confirm-banner">
                                <div className="at-confirm-banner-icon"><Icons.Bell /></div>
                                <div>
                                    <div className="at-confirm-banner-title">Ready to create this task?</div>
                                    <div className="at-confirm-banner-sub">
                                        {notify ? `${assignDisplay} will be notified via email and in-app.` : 'No notification will be sent.'}
                                    </div>
                                </div>
                            </div>
                        </>
                    )}

                    {/* ════ FOOTER ════ */}
                    <div className="at-footer">
                        <button className="at-btn-cancel" onClick={onCancel}>Cancel</button>
                        <div className="at-footer-right">
                            <span className="at-step-label">Step {step} of 4</span>
                            {step > 1 && <button className="at-btn-prev" onClick={() => setStep(s => s - 1)}><Icons.ChevLeft /> Back</button>}
                            {step < 4
                                ? <button className="at-btn-next" onClick={() => setStep(s => s + 1)}>Next <Icons.Arrow /></button>
                                : <button className="at-btn-create" onClick={handleCreate}><Icons.Check /> Confirm & Create Task</button>
                            }
                        </div>
                    </div>
                </div>

                {/* ══ RIGHT PANEL ══ */}
                <div className="at-right">
                    {/* Quick Assign */}
                    <div className="at-right-card">
                        <div className="at-right-card-title">Quick Assign</div>
                        <p className="at-right-card-sub">Assign this task to</p>
                        {[
                            { id: 'single', label: 'Assign to team member', sub: 'Choose a specific team member' },
                            { id: 'multiple', label: 'Assign to multiple members', sub: 'Assign to multiple team members' },
                            { id: 'none', label: 'Unassigned', sub: 'Create task without assignment' },
                        ].map(opt => (
                            <div key={opt.id} className={`at-assign-option${assignMode === opt.id ? ' selected' : ''}`} onClick={() => setAssignMode(opt.id)}>
                                <span className="at-assign-radio">{assignMode === opt.id ? <Icons.RadioFill /> : <Icons.Radio />}</span>
                                <div><div className="at-assign-label">{opt.label}</div><div className="at-assign-sub">{opt.sub}</div></div>
                            </div>
                        ))}
                        {assignMode === 'single' && (
                            <div style={{ marginTop: 10 }}>
                                <Dropdown trigger={open => (
                                    <button className={`at-field-input at-select-trigger${open ? ' focused' : ''}`}>
                                        <Avatar name={assignedTo} size={20} />
                                        <span style={{ color: '#2d1a3e', marginLeft: 6 }}>{assignedTo}</span>
                                        <span className={`at-select-arrow${open ? ' open' : ''}`}><Icons.ChevDown /></span>
                                    </button>
                                )} align="left">
                                    {MEMBERS.map(m => <DropdownItem key={m.name} active={assignedTo === m.name} onClick={() => setAssignedTo(m.name)}>
                                        <Avatar name={m.name} size={22} /><span style={{ marginLeft: 8 }}>{m.name}</span>
                                        <span style={{ fontSize: 10, color: '#b388b3', marginLeft: 'auto' }}>{m.role}</span>
                                    </DropdownItem>)}
                                </Dropdown>
                            </div>
                        )}
                        {assignMode === 'multiple' && (
                            <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 4 }}>
                                {MEMBERS.map(m => (
                                    <div key={m.name} className={`at-multi-member${multiAssign.includes(m.name) ? ' selected' : ''}`} onClick={() => toggleMulti(m.name)}>
                                        <span className={`at-checkbox${multiAssign.includes(m.name) ? ' checked' : ''}`} style={{ width: 16, height: 16 }}>
                                            {multiAssign.includes(m.name) && <Icons.Check />}
                                        </span>
                                        <Avatar name={m.name} size={22} />
                                        <span style={{ fontSize: 12, fontWeight: 500, color: '#2d1a3e', marginLeft: 7 }}>{m.name}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Recently Assigned */}
                    <div className="at-right-card">
                        <div className="at-right-card-title">Recently Assigned</div>
                        <div className="at-member-list">
                            {MEMBERS.map(m => (
                                <div key={m.name} className="at-member-row">
                                    <div style={{ position: 'relative' }}>
                                        <Avatar name={m.name} size={34} />
                                        <span className="at-member-dot" style={{ background: m.dot }} />
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <div className="at-member-name">{m.name}</div>
                                        <div className="at-member-role">{m.role}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button className="at-view-all-btn">View All Employees <Icons.Arrow /></button>
                    </div>

                    {/* Tips */}
                    <div className="at-right-card at-tips-card">
                        <div className="at-tips-header"><Icons.Lightbulb /><span className="at-right-card-title">Tips</span></div>
                        <ul className="at-tips-list">
                            <li>Clear and specific task titles get better results.</li>
                            <li>Set realistic due dates to keep your team on track.</li>
                            <li>Add checklists to break down complex tasks.</li>
                            <li>Use labels to organize and filter tasks easily.</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}