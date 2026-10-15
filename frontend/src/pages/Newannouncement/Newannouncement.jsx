import { useState, useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import "./Newannouncement.css";

// ── SVG ICONS ──────────────────────────────────────────────────────────────
const Icons = {
    ChevronDown: () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>,
    Check: () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>,
    Megaphone: () => <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 11l19-9-9 19-2-8-8-2z" /></svg>,
    Users: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>,
    User: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>,
    Building: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M9 3v18" /><path d="M3 9h6" /><path d="M3 15h6" /><path d="M13 7h4" /><path d="M13 12h4" /><path d="M13 17h4" /></svg>,
    Settings: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3" /><path d="M19.07 4.93a10 10 0 0 1 1.41 1.41M4.93 4.93A10 10 0 0 0 3.52 6.34M19.07 19.07a10 10 0 0 1-1.41 1.41M4.93 19.07a10 10 0 0 0 1.41 1.41M22 12h-2M4 12H2M12 2V4M12 20v2" /></svg>,
    Calendar: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>,
    Upload: () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 16 12 12 8 16" /><line x1="12" y1="12" x2="12" y2="21" /><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" /></svg>,
    Paperclip: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" /></svg>,
    X: () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>,
    Send: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></svg>,
    ArrowLeft: () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" /></svg>,
    ArrowRight: () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>,
    Mail: () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>,
    Bell: () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></svg>,
    Smartphone: () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2" /><line x1="12" y1="18" x2="12.01" y2="18" /></svg>,
    Eye: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>,
    Zap: () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>,
    CheckCircle: () => <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>,
    Image: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" /></svg>,
    Link: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" /></svg>,
    TypeGeneral: () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>,
    TypePolicy: () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /></svg>,
    TypeSystem: () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" /></svg>,
    TypeHR: () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>,
    TypeEvent: () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>,
    TypeOther: () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="8" y1="12" x2="16" y2="12" /></svg>,
};

const ANN_TYPES = [
    { value: "general", label: "General", color: "#3b82f6", Icon: Icons.TypeGeneral, desc: "General updates and information" },
    { value: "policy", label: "Policy Update", color: "#8b5cf6", Icon: Icons.TypePolicy, desc: "Policy and procedure updates" },
    { value: "system", label: "System Update", color: "#f59e0b", Icon: Icons.TypeSystem, desc: "System maintenance and updates" },
    { value: "hr", label: "HR Update", color: "#ef4444", Icon: Icons.TypeHR, desc: "HR related announcements" },
    { value: "event", label: "Event", color: "#10b981", Icon: Icons.TypeEvent, desc: "Events and celebrations" },
    { value: "other", label: "Other", color: "#6b7280", Icon: Icons.TypeOther, desc: "Other important announcements" },
];

const DEPARTMENTS = ["Engineering", "Marketing", "Sales", "Human Resources", "Finance", "Operations", "Product", "Design", "Legal", "Customer Success"];
const TIMEZONES = ["Asia/Kolkata (IST, UTC+5:30)", "America/New_York (EST, UTC-5)", "America/Los_Angeles (PST, UTC-8)", "Europe/London (GMT, UTC+0)", "Europe/Paris (CET, UTC+1)", "Asia/Dubai (GST, UTC+4)", "Asia/Singapore (SGT, UTC+8)", "America/Chicago (CST, UTC-6)"];
const REPEAT_OPTIONS = ["Once (No Repeat)", "Daily", "Every Weekday (Mon-Fri)", "Weekly", "Bi-weekly", "Monthly", "Quarterly", "Yearly"];
const PRIORITIES = ["Low", "Normal", "Medium", "High", "Urgent"];
const EMPLOYEES = ["Arjun Sharma", "Priya Mehta", "Rahul Verma", "Sneha Joshi", "Karan Patel", "Divya Nair", "Amit Gupta", "Neha Reddy", "Rohan Singh", "Anjali Kapoor"];

const AUDIENCE_OPTIONS = [
    { id: "all", label: "All Employees", Icon: Icons.Users, desc: "Send to everyone" },
    { id: "department", label: "Department", Icon: Icons.Building, desc: "Specific departments" },
    { id: "custom", label: "Custom Group", Icon: Icons.Settings, desc: "Custom employee group" },
    { id: "individual", label: "Individual", Icon: Icons.User, desc: "Specific employees" },
];

const NOTIF_METHODS = [
    { id: "email", label: "Email", Icon: Icons.Mail },
    { id: "inapp", label: "In-App Notification", Icon: Icons.Bell },
    { id: "sms", label: "SMS", Icon: Icons.Smartphone },
    { id: "push", label: "Push Notification", Icon: Icons.Zap },
];

const STEPS = [
    { num: 1, label: "Announcement Details", desc: "Title, type & content" },
    { num: 2, label: "Audience & Priority", desc: "Who receives this" },
    { num: 3, label: "Schedule & Delivery", desc: "When & how to send" },
    { num: 4, label: "Review & Publish", desc: "Final confirmation" },
];

const PRIORITY_STYLE = {
    Low: { border: "#86efac", bg: "#dcfce7", color: "#15803d" },
    Normal: { border: "#93c5fd", bg: "#eff6ff", color: "#1d4ed8" },
    Medium: { border: "#fcd34d", bg: "#fffbeb", color: "#b45309" },
    High: { border: "#f97316", bg: "#fff7ed", color: "#c2410c" },
    Urgent: { border: "#f87171", bg: "#fef2f2", color: "#c62828" },
};

const INITIAL_FORM = {
    title: "", type: "", content: "",
    audience: "all", departments: [], individuals: [],
    priority: "Normal", attachment: null,
    publishDate: "", publishTime: "",
    timezone: "Asia/Kolkata (IST, UTC+5:30)",
    notifications: ["email", "inapp"],
    repeat: "Once (No Repeat)",
    expiryDate: "", sendAs: "immediate",
};

// ── CUSTOM DROPDOWN ────────────────────────────────────────────────────────
function CustomSelect({ options, value, onChange, placeholder, withIcons = false }) {
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
            setRect({ top: r.bottom + 4, left: r.left, width: r.width });
        };
        update();
        window.addEventListener("scroll", update, true);
        window.addEventListener("resize", update);
        return () => { window.removeEventListener("scroll", update, true); window.removeEventListener("resize", update); };
    }, [open]);

    const selected = options.find(o => o.value === value);
    return (
        <div className="cust-select-wrap">
            <button ref={btnRef} type="button" className="cust-select-btn" onClick={() => setOpen(o => !o)}>
                <span className="cust-select-label-wrap">
                    {withIcons && selected?.Icon && <span className="cust-type-icon" style={{ color: selected.color || "#9c27b0" }}><selected.Icon /></span>}
                    <span style={{ color: selected?.value ? "#2d1a3e" : "#c4a0c4" }}>{selected?.value ? selected.label : placeholder}</span>
                </span>
                <span className={`cust-select-arrow ${open ? "open" : ""}`}><Icons.ChevronDown /></span>
            </button>
            {open && rect && createPortal(
                <div ref={dropRef} className="cust-dropdown"
                    style={{ position: "fixed", top: rect.top, left: rect.left, width: rect.width, zIndex: 99999 }}>
                    {options.map(opt => (
                        <div key={opt.value}
                            className={`cust-dropdown-item ${opt.value === value ? "selected" : ""} ${!opt.value ? "placeholder-opt" : ""}`}
                            onMouseDown={e => { e.preventDefault(); if (opt.value) { onChange(opt.value); setOpen(false); } }}>
                            {withIcons && opt.value && opt.Icon && <span className="cust-type-icon" style={{ color: opt.color || "#9c27b0" }}><opt.Icon /></span>}
                            <span>{opt.label}</span>
                            {opt.value === value && <span className="cust-dropdown-check"><Icons.Check /></span>}
                        </div>
                    ))}
                </div>, document.body
            )}
        </div>
    );
}

// ── UPLOAD ZONE ────────────────────────────────────────────────────────────
function UploadZone({ attachment, onFile, onRemove }) {
    const [drag, setDrag] = useState(false);
    const fileRef = useRef(null);
    const stop = e => { e.preventDefault(); e.stopPropagation(); };
    if (attachment) return (
        <div className="ann-file-chip">
            <Icons.Paperclip />
            <span>{attachment.name}</span>
            <span className="ann-file-size">({(attachment.size / 1024).toFixed(0)} KB)</span>
            <button type="button" className="ann-file-remove" onClick={onRemove}><Icons.X /></button>
        </div>
    );
    return (
        <div className={`ann-upload-zone ${drag ? "dragging" : ""}`}
            onDragOver={e => { stop(e); setDrag(true); }} onDragEnter={e => { stop(e); setDrag(true); }}
            onDragLeave={e => { stop(e); setDrag(false); }}
            onDrop={e => { stop(e); setDrag(false); const f = e.dataTransfer.files?.[0]; if (f) onFile(f); }}
            onClick={() => fileRef.current?.click()}>
            <input ref={fileRef} type="file" style={{ display: "none" }} accept=".jpg,.jpeg,.png,.pdf,.doc,.docx"
                onChange={e => { if (e.target.files?.[0]) onFile(e.target.files[0]); }} />
            <div className="ann-upload-icon"><Icons.Upload /></div>
            <div className="ann-upload-text">Drag and drop files here or</div>
            <div className="ann-upload-browse">Browse Files</div>
            <div className="ann-upload-sub">Supported formats: JPG, PNG, PDF, DOC, DOCX (Max 10MB)</div>
        </div>
    );
}

// ── RICH TEXT EDITOR ───────────────────────────────────────────────────────
function RichEditor({ value, onChange }) {
    const editorRef = useRef(null);
    const imgInputRef = useRef(null);
    const savedSel = useRef(null);
    const [charCount, setCharCount] = useState(0);
    const [fmt, setFmt] = useState({ bold: false, italic: false, underline: false, strike: false, ul: false, ol: false });
    const [blockFmt, setBlockFmt] = useState("p");

    // Reset editor when form is cleared
    useEffect(() => {
        if (value === "" && editorRef.current?.innerHTML !== "") {
            editorRef.current.innerHTML = "";
            setCharCount(0);
        }
    }, [value]);

    const refreshState = () => {
        try {
            setFmt({
                bold: document.queryCommandState("bold"),
                italic: document.queryCommandState("italic"),
                underline: document.queryCommandState("underline"),
                strike: document.queryCommandState("strikeThrough"),
                ul: document.queryCommandState("insertUnorderedList"),
                ol: document.queryCommandState("insertOrderedList"),
            });
            const blk = document.queryCommandValue("formatBlock").toLowerCase().replace(/[<>]/g, "");
            setBlockFmt(blk || "p");
        } catch (_) { }
    };

    const saveSel = () => {
        const sel = window.getSelection();
        if (sel?.rangeCount > 0) savedSel.current = sel.getRangeAt(0).cloneRange();
    };

    const restoreSel = () => {
        editorRef.current?.focus();
        if (savedSel.current) {
            const sel = window.getSelection();
            sel.removeAllRanges();
            sel.addRange(savedSel.current);
        }
    };

    const syncContent = () => {
        if (editorRef.current) {
            onChange(editorRef.current.innerHTML);
            setCharCount((editorRef.current.innerText || "").length);
        }
    };

    const exec = (cmd, val = null) => {
        editorRef.current?.focus();
        document.execCommand(cmd, false, val);
        refreshState();
        syncContent();
    };

    const handleBlockChange = (e) => {
        const tag = e.target.value;
        editorRef.current?.focus();
        document.execCommand("formatBlock", false, tag);
        setBlockFmt(tag);
        syncContent();
    };

    const handleLink = () => {
        saveSel();
        const url = window.prompt("Enter link URL:", "https://");
        if (url && url !== "https://") {
            restoreSel();
            exec("createLink", url);
        }
    };

    const handleQuote = () => {
        editorRef.current?.focus();
        exec("formatBlock", "blockquote");
    };

    const handleImageBtn = () => {
        saveSel();
        imgInputRef.current?.click();
    };

    const handleImageFile = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = ev => {
            restoreSel();
            editorRef.current?.focus();
            document.execCommand("insertHTML", false,
                `<img src="${ev.target.result}" class="ann-editor-img" alt="image" />`
            );
            syncContent();
        };
        reader.readAsDataURL(file);
        e.target.value = "";
    };

    return (
        <div className="ann-editor-wrap">
            <div className="ann-editor-toolbar">
                {/* Block format */}
                <select className="ann-toolbar-select" value={blockFmt}
                    onMouseDown={saveSel}
                    onChange={handleBlockChange}>
                    <option value="p">Normal</option>
                    <option value="h1">Heading 1</option>
                    <option value="h2">Heading 2</option>
                    <option value="h3">Heading 3</option>
                </select>

                <div className="ann-toolbar-sep" />

                <button type="button" className={`ann-tb-btn${fmt.bold ? " active" : ""}`}
                    title="Bold (Ctrl+B)" onMouseDown={e => { e.preventDefault(); exec("bold"); }}>
                    <b>B</b>
                </button>
                <button type="button" className={`ann-tb-btn ann-tb-italic${fmt.italic ? " active" : ""}`}
                    title="Italic (Ctrl+I)" onMouseDown={e => { e.preventDefault(); exec("italic"); }}>
                    <i>I</i>
                </button>
                <button type="button" className={`ann-tb-btn${fmt.underline ? " active" : ""}`}
                    title="Underline (Ctrl+U)" onMouseDown={e => { e.preventDefault(); exec("underline"); }}>
                    <u>U</u>
                </button>
                <button type="button" className={`ann-tb-btn ann-tb-strike${fmt.strike ? " active" : ""}`}
                    title="Strikethrough" onMouseDown={e => { e.preventDefault(); exec("strikeThrough"); }}>
                    <s>S</s>
                </button>

                <div className="ann-toolbar-sep" />

                <button type="button" className={`ann-tb-btn${fmt.ul ? " active" : ""}`}
                    title="Bullet List" onMouseDown={e => { e.preventDefault(); exec("insertUnorderedList"); }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="9" y1="6" x2="20" y2="6" /><line x1="9" y1="12" x2="20" y2="12" />
                        <line x1="9" y1="18" x2="20" y2="18" />
                        <circle cx="4" cy="6" r="1.5" fill="currentColor" />
                        <circle cx="4" cy="12" r="1.5" fill="currentColor" />
                        <circle cx="4" cy="18" r="1.5" fill="currentColor" />
                    </svg>
                </button>
                <button type="button" className={`ann-tb-btn${fmt.ol ? " active" : ""}`}
                    title="Numbered List" onMouseDown={e => { e.preventDefault(); exec("insertOrderedList"); }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="10" y1="6" x2="21" y2="6" /><line x1="10" y1="12" x2="21" y2="12" />
                        <line x1="10" y1="18" x2="21" y2="18" />
                        <path d="M4 6h1v4" strokeWidth="1.5" /><path d="M4 10h2" strokeWidth="1.5" />
                        <path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1" strokeWidth="1.5" />
                    </svg>
                </button>
                <button type="button" className="ann-tb-btn" title="Align Left"
                    onMouseDown={e => { e.preventDefault(); exec("justifyLeft"); }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" />
                        <line x1="3" y1="18" x2="15" y2="18" />
                    </svg>
                </button>

                <div className="ann-toolbar-sep" />

                <button type="button" className="ann-tb-btn" title="Insert Link"
                    onMouseDown={e => { e.preventDefault(); handleLink(); }}>
                    <Icons.Link />
                </button>
                <button type="button" className="ann-tb-btn" title="Insert Image"
                    onMouseDown={e => { e.preventDefault(); handleImageBtn(); }}>
                    <Icons.Image />
                </button>
                <button type="button" className="ann-tb-btn" title="Blockquote"
                    onMouseDown={e => { e.preventDefault(); handleQuote(); }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
                        <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
                    </svg>
                </button>
            </div>

            {/* ContentEditable area */}
            <div
                ref={editorRef}
                className="ann-editor-content"
                contentEditable={true}
                suppressContentEditableWarning={true}
                data-placeholder="Type your announcement content here..."
                onInput={syncContent}
                onKeyUp={refreshState}
                onMouseUp={refreshState}
                onFocus={refreshState}
            />
            <div className="ann-char-count" style={{ padding: "4px 12px 8px" }}>{charCount}/2000</div>

            {/* Hidden image picker */}
            <input ref={imgInputRef} type="file" accept="image/*" style={{ display: "none" }} onChange={handleImageFile} />
        </div>
    );
}

// ── STEP 1 ─────────────────────────────────────────────────────────────────
function Step1({ form, set }) {
    const typeObj = ANN_TYPES.find(t => t.value === form.type);
    return (
        <div className="ann-card-body">
            <div className="ann-row-2">
                <div className="ann-field">
                    <label className="ann-label">Announcement Title <span className="ann-req">*</span></label>
                    <input className="ann-input" placeholder="Enter announcement title"
                        value={form.title} maxLength={150} onChange={e => set("title", e.target.value)} />
                    <div className="ann-char-count">{form.title.length}/150</div>
                </div>
                <div className="ann-field">
                    <label className="ann-label">Announcement Type <span className="ann-req">*</span></label>
                    <CustomSelect value={form.type} onChange={v => set("type", v)}
                        placeholder="Select announcement type" withIcons={true}
                        options={[{ value: "", label: "Select announcement type" }, ...ANN_TYPES]} />
                    {typeObj && (
                        <div className="ann-type-badge" style={{ background: typeObj.color + "18", color: typeObj.color, borderColor: typeObj.color + "40" }}>
                            <span style={{ width: 7, height: 7, borderRadius: "50%", background: typeObj.color, display: "inline-block", flexShrink: 0 }} />
                            {typeObj.label}
                        </div>
                    )}
                </div>
            </div>

            <div className="ann-field">
                <label className="ann-label">Announcement Content <span className="ann-req">*</span></label>
                <RichEditor value={form.content} onChange={v => set("content", v)} />
            </div>

            <div className="ann-field">
                <label className="ann-label">Attachment <span className="ann-opt">(Optional)</span></label>
                <UploadZone attachment={form.attachment} onFile={f => set("attachment", f)} onRemove={() => set("attachment", null)} />
            </div>
        </div>
    );
}

// ── STEP 2 ─────────────────────────────────────────────────────────────────
function Step2({ form, set, toggleArr }) {
    return (
        <div className="ann-card-body">
            <div className="ann-field">
                <label className="ann-label">Target Audience <span className="ann-req">*</span></label>
                <div className="ann-audience-grid">
                    {AUDIENCE_OPTIONS.map(a => (
                        <div key={a.id} className={`ann-aud-card ${form.audience === a.id ? "selected" : ""}`}
                            onClick={() => set("audience", a.id)}>
                            <div className="ann-aud-icon"><a.Icon /></div>
                            <div className="ann-aud-name">{a.label}</div>
                            <div className="ann-aud-desc">{a.desc}</div>
                        </div>
                    ))}
                </div>
            </div>

            {form.audience === "department" && (
                <div className="ann-field">
                    <label className="ann-label">Select Departments</label>
                    <div className="ann-tag-grid">
                        {DEPARTMENTS.map(d => (
                            <div key={d} className={`ann-tag-pill ${form.departments.includes(d) ? "selected" : ""}`}
                                onClick={() => toggleArr("departments", d)}>
                                {form.departments.includes(d) && <Icons.Check />}{d}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {form.audience === "individual" && (
                <div className="ann-field">
                    <label className="ann-label">Select Employees</label>
                    <div className="ann-tag-grid">
                        {EMPLOYEES.map(e => (
                            <div key={e} className={`ann-tag-pill ${form.individuals.includes(e) ? "selected" : ""}`}
                                onClick={() => toggleArr("individuals", e)}>
                                {form.individuals.includes(e) && <Icons.Check />}{e}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div className="ann-field">
                <label className="ann-label">Priority Level <span className="ann-req">*</span></label>
                <div className="ann-priority-row">
                    {PRIORITIES.map(p => {
                        const s = PRIORITY_STYLE[p];
                        return (
                            <button key={p} type="button" className="ann-priority-pill"
                                style={form.priority === p ? { borderColor: s.border, background: s.bg, color: s.color } : {}}
                                onClick={() => set("priority", p)}>{p}</button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

// ── STEP 3 ─────────────────────────────────────────────────────────────────
function Step3({ form, set, toggleArr }) {
    const today = new Date().toISOString().split("T")[0];
    return (
        <div className="ann-card-body">
            <div className="ann-field">
                <label className="ann-label">Send Timing <span className="ann-req">*</span></label>
                <div className="ann-send-row">
                    {[
                        { id: "immediate", label: "Send Immediately", Icon: Icons.Send, desc: "Deliver right now" },
                        { id: "scheduled", label: "Schedule for Later", Icon: Icons.Calendar, desc: "Pick a date & time" },
                    ].map(opt => (
                        <div key={opt.id} className={`ann-send-card ${form.sendAs === opt.id ? "selected" : ""}`}
                            onClick={() => set("sendAs", opt.id)}>
                            <div className="ann-send-card-icon"><opt.Icon /></div>
                            <div>
                                <div className="ann-send-card-label">{opt.label}</div>
                                <div className="ann-send-card-desc">{opt.desc}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {form.sendAs === "scheduled" && (
                <div className="ann-row-3">
                    <div className="ann-field">
                        <label className="ann-label">Publish Date</label>
                        <input className="ann-input" type="date" min={today} value={form.publishDate} onChange={e => set("publishDate", e.target.value)} />
                    </div>
                    <div className="ann-field">
                        <label className="ann-label">Publish Time</label>
                        <input className="ann-input" type="time" value={form.publishTime} onChange={e => set("publishTime", e.target.value)} />
                    </div>
                    <div className="ann-field">
                        <label className="ann-label">Timezone</label>
                        <CustomSelect value={form.timezone} onChange={v => set("timezone", v)} placeholder="Select timezone"
                            options={TIMEZONES.map(tz => ({ value: tz, label: tz }))} />
                    </div>
                </div>
            )}

            <div className="ann-field">
                <label className="ann-label">Notification Channels <span className="ann-req">*</span></label>
                <div className="ann-notif-grid">
                    {NOTIF_METHODS.map(n => (
                        <div key={n.id} className={`ann-notif-card ${form.notifications.includes(n.id) ? "selected" : ""}`}
                            onClick={() => toggleArr("notifications", n.id)}>
                            <div className="ann-notif-icon"><n.Icon /></div>
                            <span>{n.label}</span>
                            {form.notifications.includes(n.id) && <div className="ann-notif-check"><Icons.Check /></div>}
                        </div>
                    ))}
                </div>
            </div>

            <div className="ann-row-2 ann-row-overflow">
                <div className="ann-field">
                    <label className="ann-label">Repeat Schedule</label>
                    <CustomSelect value={form.repeat} onChange={v => set("repeat", v)} placeholder="Select repeat"
                        options={REPEAT_OPTIONS.map(r => ({ value: r, label: r }))} />
                </div>
                <div className="ann-field">
                    <label className="ann-label">Expiry Date <span className="ann-opt">(Optional)</span></label>
                    <input className="ann-input" type="date" min={today} value={form.expiryDate} onChange={e => set("expiryDate", e.target.value)} />
                </div>
            </div>
        </div>
    );
}

// ── STEP 4 ─────────────────────────────────────────────────────────────────
function Step4({ form, setShowModal }) {
    const typeObj = ANN_TYPES.find(t => t.value === form.type);
    const textContent = form.content.replace(/<[^>]*>/g, "").trim();
    const checks = [
        { label: "Title added", ok: !!form.title },
        { label: "Type selected", ok: !!form.type },
        { label: "Content written", ok: textContent.length >= 10 },
        { label: "Audience configured", ok: !!form.audience },
        { label: "Priority set", ok: !!form.priority },
        { label: "Notification channels set", ok: form.notifications.length > 0 },
    ];
    const allOk = checks.every(c => c.ok);
    return (
        <div className="ann-card-body">
            <div className="ann-review-grid">
                <div className="ann-review-item"><div className="ann-review-key">Title</div><div className="ann-review-val">{form.title || <em style={{ color: "#b388b3" }}>Not set</em>}</div></div>
                <div className="ann-review-item">
                    <div className="ann-review-key">Type</div>
                    <div className="ann-review-val">
                        {typeObj ? <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                            <span style={{ width: 8, height: 8, borderRadius: "50%", background: typeObj.color, display: "inline-block" }} />{typeObj.label}
                        </span> : <em style={{ color: "#b388b3" }}>Not set</em>}
                    </div>
                </div>
                <div className="ann-review-item"><div className="ann-review-key">Audience</div><div className="ann-review-val">{AUDIENCE_OPTIONS.find(a => a.id === form.audience)?.label || "—"}</div></div>
                <div className="ann-review-item">
                    <div className="ann-review-key">Priority</div>
                    <div className="ann-review-val">
                        {form.priority && PRIORITY_STYLE[form.priority] && (
                            <span className="ann-priority-pill" style={{ padding: "3px 12px", fontSize: 11, cursor: "default", borderColor: PRIORITY_STYLE[form.priority].border, background: PRIORITY_STYLE[form.priority].bg, color: PRIORITY_STYLE[form.priority].color }}>{form.priority}</span>
                        )}
                    </div>
                </div>
                <div className="ann-review-item"><div className="ann-review-key">Delivery</div><div className="ann-review-val">{form.sendAs === "immediate" ? "Send Immediately" : `Scheduled: ${form.publishDate || "—"} ${form.publishTime || "—"}`}</div></div>
                <div className="ann-review-item"><div className="ann-review-key">Channels</div><div className="ann-review-val">{form.notifications.map(n => NOTIF_METHODS.find(m => m.id === n)?.label).join(", ") || "—"}</div></div>
            </div>

            {form.content && (
                <div className="ann-review-content">
                    <div className="ann-review-content-label"><Icons.Eye /> Preview</div>
                    <div className="ann-review-content-text ann-editor-preview"
                        dangerouslySetInnerHTML={{ __html: form.content }} />
                </div>
            )}

            <div className="ann-checklist">
                <div className="ann-checklist-title">Completion Checklist</div>
                <div className="ann-checklist-grid">
                    {checks.map((c, i) => (
                        <div key={i} className={`ann-checklist-item ${c.ok ? "ok" : ""}`}>
                            <div className={`ann-checklist-dot ${c.ok ? "ok" : ""}`}>{c.ok ? <Icons.Check /> : <span>·</span>}</div>
                            {c.label}
                        </div>
                    ))}
                </div>
            </div>

            <button type="button" className={`ann-publish-btn ${!allOk ? "disabled" : ""}`}
                disabled={!allOk} onClick={() => { if (allOk) setShowModal(true); }}>
                <Icons.Send /> Publish Announcement
            </button>
        </div>
    );
}

// ── SIDEBAR ────────────────────────────────────────────────────────────────
function Sidebar({ step }) {
    return (
        <div className="ann-sidebar">
            <div className="ann-sb-section">
                <div className="ann-sb-title">Progress</div>
                <div className="ann-sb-progress-track">
                    <div className="ann-sb-progress-fill" style={{ width: `${((step - 1) / (STEPS.length - 1)) * 100}%` }} />
                </div>
                <div className="ann-sb-progress-label">Step {step} of {STEPS.length}</div>
            </div>

            <div className="ann-sb-section">
                <div className="ann-sb-title">Announcement Types</div>
                {ANN_TYPES.map(t => (
                    <div key={t.value} className="ann-sb-type-row">
                        <div className="ann-sb-type-icon-wrap" style={{ background: t.color + "18", color: t.color }}><t.Icon /></div>
                        <div>
                            <div className="ann-sb-type-name">{t.label}</div>
                            <div className="ann-sb-type-desc">{t.desc}</div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="ann-sb-section">
                <div className="ann-sb-title">Tips for Effective Announcements</div>
                {["Use a clear, descriptive title", "Keep content concise & relevant", "Choose the right audience", "Add attachments if needed", "Schedule for the right time", "Review carefully before publishing"].map((tip, i) => (
                    <div key={i} className="ann-sb-tip">
                        <div className="ann-sb-tip-dot"><Icons.Check /></div>
                        <span>{tip}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

// ── MAIN ───────────────────────────────────────────────────────────────────
export default function NewAnnouncement() {
    const [step, setStep] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [isPublished, setIsPublished] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [form, setForm] = useState({ ...INITIAL_FORM });

    const set = useCallback((key, val) => setForm(f => ({ ...f, [key]: val })), []);
    const toggleArr = useCallback((key, val) =>
        setForm(f => ({ ...f, [key]: f[key].includes(val) ? f[key].filter(v => v !== val) : [...f[key], val] })), []);

    const handleDone = () => {
        setShowModal(false); setIsPublished(false);
        setForm({ ...INITIAL_FORM }); setStep(1);
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3500);
    };

    return (
        <div className="ann-page">
            <div className="ann-stepper-bar">
                {STEPS.map((s, idx) => (
                    <div key={s.num} className="ann-step-wrap">
                        <div className="ann-step-inner">
                            <div className={`ann-step-num ${step === s.num ? "active" : step > s.num ? "done" : ""}`}>
                                {step > s.num ? <Icons.Check /> : s.num}
                            </div>
                            <div className="ann-step-text">
                                <div className={`ann-step-label ${step === s.num ? "active" : step > s.num ? "done" : ""}`}>{s.label}</div>
                                <div className="ann-step-desc">{s.desc}</div>
                            </div>
                        </div>
                        {idx < STEPS.length - 1 && <div className={`ann-step-connector ${step > s.num ? "done" : ""}`} />}
                    </div>
                ))}
            </div>

            {showSuccess && (
                <div className="ann-success-banner">
                    <div className="ann-success-icon"><Icons.CheckCircle /></div>
                    <div>
                        <div className="ann-success-title">Announcement Published Successfully!</div>
                        <div className="ann-success-sub">Your announcement is now live. Form has been reset.</div>
                    </div>
                </div>
            )}

            <div className="ann-body">
                <div className="ann-main-col">
                    <div className="ann-card">
                        <div className="ann-card-header">
                            <div className="ann-card-header-left">
                                <div className="ann-card-header-icon"><Icons.Megaphone /></div>
                                <div>
                                    <div className="ann-card-title">{STEPS[step - 1].label}</div>
                                    <div className="ann-card-desc">{STEPS[step - 1].desc}</div>
                                </div>
                            </div>
                            <div className="ann-step-badge">Step {step}/{STEPS.length}</div>
                        </div>

                        {step === 1 && <Step1 form={form} set={set} />}
                        {step === 2 && <Step2 form={form} set={set} toggleArr={toggleArr} />}
                        {step === 3 && <Step3 form={form} set={set} toggleArr={toggleArr} />}
                        {step === 4 && <Step4 form={form} setShowModal={setShowModal} />}
                    </div>

                    <div className="ann-footer">
                        <div className="ann-footer-info">Step {step} of {STEPS.length} — {STEPS[step - 1].label}</div>
                        <div className="ann-footer-btns">
                            {step > 1 && (
                                <button type="button" className="ann-btn-ghost" onClick={() => setStep(s => s - 1)}>
                                    <Icons.ArrowLeft /> Back
                                </button>
                            )}
                            <button type="button" className="ann-btn-ghost" onClick={() => { setStep(1); setForm({ ...INITIAL_FORM }); }}>Cancel</button>
                            {step < 4 && (
                                <button type="button" className="ann-btn-primary" onClick={() => setStep(s => s + 1)}>
                                    Next <Icons.ArrowRight />
                                </button>
                            )}
                        </div>
                    </div>
                </div>
                <Sidebar step={step} />
            </div>

            {showModal && (
                <div className="ann-modal-overlay">
                    <div className="ann-modal">
                        <div className="ann-modal-top">
                            <div className="ann-modal-icon"><Icons.Megaphone /></div>
                            <div className="ann-modal-title">{isPublished ? "Announcement Published!" : "Ready to Publish?"}</div>
                            <div className="ann-modal-sub">
                                {isPublished ? "Your announcement is now live for all recipients." : "Toggle the switch below to publish your announcement."}
                            </div>
                        </div>
                        <div className="ann-modal-body">
                            <div className={`ann-modal-toggle-row ${isPublished ? "on" : ""}`}>
                                <div>
                                    <div className="ann-modal-toggle-label">Published Status</div>
                                    <div className="ann-modal-toggle-state">
                                        {isPublished ? "✅ Live — recipients can see this now" : "⏸️ Not published yet"}
                                    </div>
                                </div>
                                <button type="button" className={`ann-toggle ${isPublished ? "on" : ""}`} onClick={() => setIsPublished(v => !v)}>
                                    <div className="ann-toggle-thumb" />
                                </button>
                            </div>
                            {isPublished && (
                                <div className="ann-modal-stats">
                                    {[
                                        { val: form.audience === "all" ? "All" : form.audience === "individual" ? form.individuals.length : form.departments.length, label: "Recipients" },
                                        { val: form.notifications.length, label: "Channels" },
                                        { val: form.sendAs === "immediate" ? "Now" : form.publishTime || "—", label: "Sent At" },
                                    ].map((s, i) => (
                                        <div key={i} className="ann-modal-stat">
                                            <div className="ann-modal-stat-val">{s.val}</div>
                                            <div className="ann-modal-stat-label">{s.label}</div>
                                        </div>
                                    ))}
                                </div>
                            )}
                            <div className="ann-modal-btns">
                                {isPublished ? (
                                    <button type="button" className="ann-modal-publish-btn" onClick={handleDone}>Done — View Announcements</button>
                                ) : (
                                    <button type="button" className="ann-modal-close-btn" onClick={() => setShowModal(false)}>Cancel</button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}