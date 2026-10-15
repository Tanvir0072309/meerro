import { useState } from "react";

/* ── inline SVG icons (no external lib) ── */
const Icon = {
    User: () => (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
        </svg>
    ),
    Mail: () => (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
    ),
    Phone: () => (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.15 12 19.79 19.79 0 0 1 1.07 3.4 2 2 0 0 1 3.04 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16z" />
        </svg>
    ),
    Calendar: () => (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
        </svg>
    ),
    Camera: () => (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" /><circle cx="12" cy="13" r="3" />
        </svg>
    ),
    Upload: () => (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" />
        </svg>
    ),
    ChevronDown: () => (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9" />
        </svg>
    ),
    Check: () => (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
        </svg>
    ),
    ArrowRight: () => (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
        </svg>
    ),
    Send: () => (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
        </svg>
    ),
    UserPlus: () => (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><line x1="19" y1="8" x2="19" y2="14" /><line x1="22" y1="11" x2="16" y2="11" />
        </svg>
    ),
    Shield: () => (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
    ),
    Download: () => (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
        </svg>
    ),
    CircleCheck: () => (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
        </svg>
    ),
    Info: () => (
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
    ),
    Briefcase: () => (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="7" width="20" height="14" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
        </svg>
    ),
};

/* ── Custom Select ── */
function CustomSelect({ placeholder, options, value, onChange }) {
    const [open, setOpen] = useState(false);
    return (
        <div className="cust-select-wrap">
            <button className="sg-select-btn" onClick={() => setOpen(o => !o)} type="button">
                <span style={{ color: value ? "#2d1a3e" : "#b388b3" }}>{value || placeholder}</span>
                <span className={`cust-select-arrow${open ? " open" : ""}`}><Icon.ChevronDown /></span>
            </button>
            {open && (
                <div className="cust-dropdown" style={{ position: "absolute", top: "calc(100% + 4px)", left: 0, right: 0, zIndex: 999 }}>
                    {options.map(opt => (
                        <div key={opt} className={`cust-dropdown-item${value === opt ? " selected" : ""}`}
                            onClick={() => { onChange(opt); setOpen(false); }}>
                            {opt}
                            {value === opt && <span className="cust-dropdown-check"><Icon.Check /></span>}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

/* ── Steps config ── */
const STEPS = [
    { num: 1, label: "Employee Information", sub: "Basic details" },
    { num: 2, label: "Role & Department", sub: "Set role and department" },
    { num: 3, label: "Access & Permissions", sub: "Configure access" },
    { num: 4, label: "Review & Invite", sub: "Review and send invite" },
];

/* ── Main Component ── */
export default function AddEmployee() {
    const [step, setStep] = useState(1);
    const [inviteMethod, setInviteMethod] = useState("email");
    const [photo, setPhoto] = useState(null);
    const [form, setForm] = useState({
        fullName: "", email: "", phone: "", dob: "",
        employeeId: "", gender: "", maritalStatus: "",
        department: "", dateOfJoining: "", designation: "",
        workLocation: "", reportingManager: "", employmentType: "",
        // Step 2
        role: "", access: "",
        // Step 3
        canManageEmployees: false, canViewReports: false, canApproveLeave: false,
    });

    const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

    const handlePhotoChange = (e) => {
        const file = e.target.files?.[0];
        if (file) setPhoto(URL.createObjectURL(file));
    };

    return (
        <>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700;9..40,800&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .ae-root {
          font-family: 'DM Sans', sans-serif;
          background: #faf5fb;
          display: flex;
          gap: 20px;
          padding: 24px 24px 32px;
          min-height: 100vh;
          color: #2d1a3e;
        }

        /* ── MAIN PANEL ── */
        .ae-main {
          flex: 1;
          min-width: 0;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        /* Page title */
        .ae-page-title { font-size: 22px; font-weight: 800; color: #2d1a3e; line-height: 1.2; }
        .ae-page-sub { font-size: 13px; color: #8a7a9b; margin-top: 3px; }

        /* ── STEPPER ── */
        .ae-stepper {
          display: flex;
          align-items: center;
          gap: 0;
          background: #fff;
          border-radius: 12px;
          border: 1px solid #f0e6f0;
          overflow: hidden;
          box-shadow: 0 1px 4px rgba(181,23,158,0.05);
        }
        .ae-step {
          flex: 1;
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 14px 16px;
          border-right: 1px solid #f0e6f0;
          cursor: pointer;
          transition: background 0.15s;
          position: relative;
        }
        .ae-step:last-child { border-right: none; }
        .ae-step:hover { background: #fdf8fd; }
        .ae-step.active { background: linear-gradient(135deg, #fdf0fc, #f8e8fb); }
        .ae-step-num {
          width: 28px; height: 28px;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 12px; font-weight: 800;
          flex-shrink: 0;
          border: 2px solid #e0d0e8;
          background: #fff;
          color: #b388b3;
          transition: all 0.2s;
        }
        .ae-step.active .ae-step-num {
          background: linear-gradient(135deg, #b5179e, #9c27b0);
          border-color: transparent;
          color: #fff;
          box-shadow: 0 2px 8px rgba(181,23,158,0.35);
        }
        .ae-step.done .ae-step-num {
          background: #e8f5e9;
          border-color: #a5d6a7;
          color: #2e7d32;
        }
        .ae-step-info { flex: 1; min-width: 0; }
        .ae-step-label {
          font-size: 12px; font-weight: 700;
          color: #8a7a9b;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }
        .ae-step.active .ae-step-label { color: #b5179e; }
        .ae-step.done .ae-step-label { color: #2e7d32; }
        .ae-step-sub { font-size: 10.5px; color: #c4a0c4; margin-top: 1px; }
        .ae-step.active .ae-step-sub { color: #d070c4; }

        /* ── SECTION CARD ── */
        .ae-card {
          background: #fff;
          border-radius: 12px;
          border: 1px solid #f0e6f0;
          box-shadow: 0 1px 4px rgba(181,23,158,0.04);
          overflow: visible;
        }
        .ae-card-header {
          padding: 16px 20px 14px;
          border-bottom: 1px solid #f0e6f0;
          display: flex; align-items: center; gap: 10px;
        }
        .ae-card-icon {
          width: 32px; height: 32px; border-radius: 8px;
          background: linear-gradient(135deg, #f5eaf5, #ede0f5);
          display: flex; align-items: center; justify-content: center;
          color: #9c27b0; flex-shrink: 0;
        }
        .ae-card-title { font-size: 13.5px; font-weight: 700; color: #2d1a3e; }
        .ae-card-sub { font-size: 11.5px; color: #8a7a9b; margin-top: 2px; }
        .ae-card-body { padding: 18px 20px; }

        /* ── FORM GRID ── */
        .ae-grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 16px 24px; }
        .ae-grid-1 { display: grid; grid-template-columns: 1fr; gap: 16px; }

        .ae-field { display: flex; flex-direction: column; gap: 6px; position: relative; }
        .ae-label {
          font-size: 11.5px; font-weight: 600; color: #5c4a6e;
          display: flex; align-items: center; gap: 4px;
        }
        .ae-required { color: #b5179e; }

        .ae-input {
          padding: 9px 12px;
          border-radius: 8px;
          border: 1px solid #f0e6f0;
          background: #faf5fb;
          font-size: 12.5px;
          font-family: 'DM Sans', sans-serif;
          color: #2d1a3e;
          outline: none;
          transition: border-color 0.15s, background 0.15s, box-shadow 0.15s;
          width: 100%;
        }
        .ae-input::placeholder { color: #c4a0c4; }
        .ae-input:focus {
          border-color: #b5179e;
          background: #fff;
          box-shadow: 0 0 0 3px rgba(181,23,158,0.08);
        }

        /* input with icon */
        .ae-input-wrap { position: relative; }
        .ae-input-icon {
          position: absolute; left: 11px; top: 50%; transform: translateY(-50%);
          color: #c4a0c4; display: flex; align-items: center; pointer-events: none;
        }
        .ae-input-wrap .ae-input { padding-left: 34px; }

        /* phone */
        .ae-phone-row { display: flex; gap: 8px; }
        .ae-flag-btn {
          display: flex; align-items: center; gap: 5px;
          padding: 9px 10px;
          border-radius: 8px;
          border: 1px solid #f0e6f0;
          background: #faf5fb;
          font-size: 13px;
          cursor: pointer;
          flex-shrink: 0;
          color: #5c4a6e;
          font-family: 'DM Sans', sans-serif;
          font-weight: 500;
          transition: background 0.15s;
        }
        .ae-flag-btn:hover { background: #f5eaf5; }

        /* ── PHOTO UPLOAD ── */
        .ae-photo-wrap {
          display: flex; align-items: center; gap: 16px;
        }
        .ae-photo-circle {
          width: 72px; height: 72px; border-radius: 50%;
          background: linear-gradient(135deg, #f3e5f5, #e8d5f5);
          border: 2px dashed #e0c8e0;
          display: flex; align-items: center; justify-content: center;
          color: #c4a0c4;
          flex-shrink: 0;
          overflow: hidden;
          cursor: pointer;
          transition: border-color 0.15s;
          position: relative;
        }
        .ae-photo-circle:hover { border-color: #b5179e; }
        .ae-photo-circle img { width: 100%; height: 100%; object-fit: cover; }
        .ae-photo-info { display: flex; flex-direction: column; gap: 6px; }
        .ae-upload-btn {
          display: flex; align-items: center; gap: 6px;
          padding: 7px 14px;
          border-radius: 8px;
          border: 1px solid #f0e6f0;
          background: #fff;
          font-size: 12px; font-family: 'DM Sans', sans-serif;
          color: #5c4a6e; font-weight: 600;
          cursor: pointer;
          transition: background 0.15s, border-color 0.15s;
          width: fit-content;
        }
        .ae-upload-btn:hover { background: #faf5fb; border-color: #e0d0e8; }
        .ae-photo-hint { font-size: 10.5px; color: #b388b3; }

        /* ── ROLE CARD ── */
        .ae-role-grid {
          display: grid; grid-template-columns: repeat(4, 1fr);
          gap: 10px;
        }
        .ae-role-card {
          border: 2px solid #f0e6f0;
          border-radius: 10px;
          padding: 14px 12px;
          text-align: center;
          cursor: pointer;
          transition: all 0.18s;
          background: #fdf8fd;
          display: flex; flex-direction: column; align-items: center; gap: 8px;
        }
        .ae-role-card:hover { border-color: #d0a0d0; background: #fdf0fc; }
        .ae-role-card.selected {
          border-color: #b5179e;
          background: linear-gradient(135deg, #fdf0fc, #f5eaf5);
          box-shadow: 0 2px 10px rgba(181,23,158,0.15);
        }
        .ae-role-icon {
          width: 36px; height: 36px; border-radius: 9px;
          display: flex; align-items: center; justify-content: center;
          font-size: 18px;
          background: #f5eaf5;
        }
        .ae-role-card.selected .ae-role-icon { background: rgba(181,23,158,0.12); }
        .ae-role-name { font-size: 12px; font-weight: 700; color: #2d1a3e; }
        .ae-role-desc { font-size: 10px; color: #8a7a9b; line-height: 1.4; }
        .ae-role-card.selected .ae-role-name { color: #b5179e; }

        /* ── PERMISSION TOGGLE ── */
        .ae-perm-grid {
          display: grid; grid-template-columns: 1fr 1fr; gap: 1px;
          background: #f0e6f0; border-radius: 10px; overflow: hidden;
          border: 1px solid #f0e6f0;
        }
        .ae-perm-row {
          display: flex; align-items: center; justify-content: space-between;
          gap: 12px; padding: 14px 16px; background: #fff;
          transition: background 0.12s;
        }
        .ae-perm-row:hover { background: #fdf8fd; }
        .ae-perm-label { font-size: 12.5px; font-weight: 600; color: #2d1a3e; }
        .ae-perm-sub { font-size: 11px; color: #8a7a9b; margin-top: 2px; }

        /* ── BOTTOM BAR ── */
        .ae-bottom-bar {
          background: #fff;
          border-radius: 12px;
          border: 1px solid #f0e6f0;
          padding: 14px 20px;
          display: flex; align-items: center; justify-content: space-between;
          box-shadow: 0 1px 4px rgba(181,23,158,0.04);
        }
        .ae-step-indicator { font-size: 12px; color: #b388b3; font-weight: 600; }
        .ae-bottom-btns { display: flex; align-items: center; gap: 10px; }
        .ae-cancel-btn {
          padding: 9px 18px;
          border-radius: 9px;
          border: 1px solid #f0e6f0;
          background: #fff;
          font-size: 13px; font-family: 'DM Sans', sans-serif;
          color: #8a7a9b; font-weight: 600;
          cursor: pointer;
          transition: background 0.15s;
        }
        .ae-cancel-btn:hover { background: #faf5fb; }
        .ae-next-btn {
          display: flex; align-items: center; gap: 8px;
          padding: 9px 22px;
          border-radius: 9px;
          border: none;
          background: linear-gradient(135deg, #b5179e, #9c27b0);
          color: #fff;
          font-size: 13px; font-family: 'DM Sans', sans-serif;
          font-weight: 700; cursor: pointer;
          box-shadow: 0 2px 10px rgba(181,23,158,0.32);
          transition: opacity 0.15s, box-shadow 0.15s;
        }
        .ae-next-btn:hover { opacity: 0.92; box-shadow: 0 4px 16px rgba(181,23,158,0.4); }

        /* ── RIGHT PANEL ── */
        .ae-right {
          width: 272px; min-width: 272px; flex-shrink: 0;
          display: flex; flex-direction: column; gap: 12px;
        }
        .ae-rcard {
          background: #fff;
          border-radius: 12px;
          border: 1px solid #f0e6f0;
          box-shadow: 0 1px 4px rgba(181,23,158,0.04);
          overflow: hidden;
        }
        .ae-rcard-header {
          padding: 12px 14px 10px;
          border-bottom: 1px solid #f0e6f0;
          font-size: 12px; font-weight: 700; color: #2d1a3e;
        }
        .ae-rcard-body { padding: 12px 14px; }

        /* invite method */
        .ae-invite-opt {
          display: flex; align-items: flex-start; gap: 10px;
          padding: 11px 12px;
          border-radius: 9px;
          border: 1px solid #f0e6f0;
          background: #fff;
          cursor: pointer; margin-bottom: 8px;
          transition: all 0.15s;
        }
        .ae-invite-opt:last-child { margin-bottom: 0; }
        .ae-invite-opt.selected {
          border-color: #b5179e;
          background: linear-gradient(135deg, #fdf0fc, #f9eafb);
        }
        .ae-invite-radio {
          width: 16px; height: 16px; border-radius: 50%;
          border: 2px solid #e0d0e8;
          flex-shrink: 0; margin-top: 1px;
          display: flex; align-items: center; justify-content: center;
          transition: border-color 0.15s;
        }
        .ae-invite-opt.selected .ae-invite-radio { border-color: #b5179e; }
        .ae-invite-radio-dot {
          width: 7px; height: 7px; border-radius: 50%;
          background: #b5179e;
          display: none;
        }
        .ae-invite-opt.selected .ae-invite-radio-dot { display: block; }
        .ae-invite-label { font-size: 12.5px; font-weight: 700; color: #2d1a3e; }
        .ae-invite-sub { font-size: 11px; color: #8a7a9b; margin-top: 2px; }

        /* role & permission info */
        .ae-perm-info-list { display: flex; flex-direction: column; gap: 0; }
        .ae-perm-info-row {
          display: flex; align-items: center; gap: 8px;
          padding: 8px 0; border-bottom: 1px solid #faf5fb;
          font-size: 12px; color: #2d1a3e; font-weight: 500;
        }
        .ae-perm-info-row:last-child { border-bottom: none; }
        .ae-perm-check { color: #16a34a; display: flex; align-items: center; }

        /* bulk import */
        .ae-bulk-inner {
          background: linear-gradient(135deg, #fdf0fc, #f5eaf5);
          border-radius: 10px; padding: 14px;
          display: flex; flex-direction: column; gap: 8px;
        }
        .ae-bulk-title { font-size: 12.5px; font-weight: 700; color: #2d1a3e; }
        .ae-bulk-sub { font-size: 11px; color: #8a7a9b; line-height: 1.5; }
        .ae-bulk-btn {
          display: flex; align-items: center; gap: 6px;
          padding: 7px 14px;
          border-radius: 8px;
          border: none;
          background: linear-gradient(135deg, #b5179e, #9c27b0);
          color: #fff;
          font-size: 11.5px; font-family: 'DM Sans', sans-serif; font-weight: 700;
          cursor: pointer;
          width: fit-content;
          box-shadow: 0 2px 8px rgba(181,23,158,0.28);
          transition: opacity 0.15s;
        }
        .ae-bulk-btn:hover { opacity: 0.9; }

        /* tips */
        .ae-tips-list { display: flex; flex-direction: column; gap: 7px; }
        .ae-tip-row {
          display: flex; align-items: flex-start; gap: 7px;
          font-size: 11.5px; color: #5c4a6e; font-weight: 500; line-height: 1.4;
        }
        .ae-tip-dot {
          width: 5px; height: 5px; border-radius: 50%;
          background: #b5179e; flex-shrink: 0; margin-top: 5px;
        }

        /* review step */
        .ae-review-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0 0; }
        .ae-review-row {
          display: flex; flex-direction: column; gap: 2px;
          padding: 10px 14px; border-bottom: 1px solid #faf5fb;
          border-right: 1px solid #faf5fb;
        }
        .ae-review-row:nth-child(even) { border-right: none; }
        .ae-review-label { font-size: 10.5px; color: #b388b3; font-weight: 500; text-transform: uppercase; letter-spacing: 0.3px; }
        .ae-review-val { font-size: 12.5px; font-weight: 600; color: #2d1a3e; }
        .ae-review-empty { color: #c4a0c4; font-weight: 400; }

        /* success banner */
        .ae-success {
          display: flex; flex-direction: column; align-items: center; gap: 12px;
          padding: 40px 20px; text-align: center;
        }
        .ae-success-icon {
          width: 64px; height: 64px; border-radius: 50%;
          background: linear-gradient(135deg, #e8f5e9, #c8e6c9);
          display: flex; align-items: center; justify-content: center;
          color: #2e7d32;
        }
        .ae-success-title { font-size: 20px; font-weight: 800; color: #2d1a3e; }
        .ae-success-sub { font-size: 13px; color: #8a7a9b; }

        /* toggle (reuse from CSS) */
        .sg-toggle {
          width: 40px; height: 22px; border-radius: 11px;
          background: #e0d0e8; border: none; cursor: pointer;
          position: relative; flex-shrink: 0;
          transition: background 0.2s; padding: 0;
        }
        .sg-toggle.on { background: linear-gradient(135deg, #b5179e, #9c27b0); }
        .sg-toggle-thumb {
          width: 16px; height: 16px; border-radius: 50%;
          background: #fff; position: absolute; top: 3px; left: 3px;
          transition: transform 0.2s;
          box-shadow: 0 1px 4px rgba(0,0,0,0.15);
        }
        .sg-toggle.on .sg-toggle-thumb { transform: translateX(18px); }

        .ae-divider { height: 1px; background: #f0e6f0; margin: 4px 0; }
      `}</style>

            <div className="ae-root">
                {/* ── LEFT / MAIN ── */}
                <div className="ae-main">
                    

                    {/* Stepper */}
                    <div className="ae-stepper">
                        {STEPS.map(s => (
                            <div
                                key={s.num}
                                className={`ae-step${step === s.num ? " active" : ""}${step > s.num ? " done" : ""}`}
                                onClick={() => step > s.num && setStep(s.num)}
                            >
                                <div className="ae-step-num">
                                    {step > s.num ? <Icon.Check /> : s.num}
                                </div>
                                <div className="ae-step-info">
                                    <div className="ae-step-label">{s.label}</div>
                                    <div className="ae-step-sub">{s.sub}</div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* ── STEP 1 ── */}
                    {step === 1 && <>
                        {/* Basic Information */}
                        <div className="ae-card">
                            <div className="ae-card-header">
                                <div className="ae-card-icon"><Icon.User /></div>
                                <div>
                                    <div className="ae-card-title">Basic Information</div>
                                    <div className="ae-card-sub">Enter the basic details of the employee.</div>
                                </div>
                            </div>
                            <div className="ae-card-body">
                                <div className="ae-grid-2">
                                    {/* left col */}
                                    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                                        <div className="ae-field">
                                            <label className="ae-label">Full Name <span className="ae-required">*</span></label>
                                            <div className="ae-input-wrap">
                                                <span className="ae-input-icon"><Icon.User /></span>
                                                <input className="ae-input" placeholder="Enter full name" value={form.fullName}
                                                    onChange={e => set("fullName", e.target.value)} />
                                            </div>
                                        </div>
                                        <div className="ae-field">
                                            <label className="ae-label">Email Address <span className="ae-required">*</span></label>
                                            <div className="ae-input-wrap">
                                                <span className="ae-input-icon"><Icon.Mail /></span>
                                                <input className="ae-input" placeholder="Enter email address" value={form.email}
                                                    onChange={e => set("email", e.target.value)} />
                                            </div>
                                        </div>
                                        <div className="ae-field">
                                            <label className="ae-label">Phone Number</label>
                                            <div className="ae-phone-row">
                                                <button className="ae-flag-btn" type="button">🇮🇳 <Icon.ChevronDown /></button>
                                                <input className="ae-input" placeholder="(555) 123-4567" style={{ flex: 1 }}
                                                    value={form.phone} onChange={e => set("phone", e.target.value)} />
                                            </div>
                                        </div>
                                        <div className="ae-field">
                                            <label className="ae-label">Date of Birth</label>
                                            <div className="ae-input-wrap">
                                                <span className="ae-input-icon"><Icon.Calendar /></span>
                                                <input className="ae-input" type="date" value={form.dob}
                                                    onChange={e => set("dob", e.target.value)} />
                                            </div>
                                        </div>
                                    </div>

                                    {/* right col */}
                                    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                                        <div className="ae-field">
                                            <label className="ae-label">Profile Photo</label>
                                            <div className="ae-photo-wrap">
                                                <label className="ae-photo-circle" htmlFor="photo-input">
                                                    {photo ? <img src={photo} alt="preview" /> : <Icon.Camera />}
                                                    <input id="photo-input" type="file" accept="image/*" style={{ display: "none" }}
                                                        onChange={handlePhotoChange} />
                                                </label>
                                                <div className="ae-photo-info">
                                                    <label htmlFor="photo-input" className="ae-upload-btn">
                                                        <Icon.Upload /> Upload Photo
                                                    </label>
                                                    <div className="ae-photo-hint">JPG, PNG up to 2MB</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="ae-field">
                                            <label className="ae-label">Employee ID <span style={{ color: "#b388b3", fontWeight: 400 }}>(Optional)</span></label>
                                            <input className="ae-input" placeholder="Enter employee ID" value={form.employeeId}
                                                onChange={e => set("employeeId", e.target.value)} />
                                        </div>
                                        <div className="ae-field">
                                            <label className="ae-label">Gender</label>
                                            <CustomSelect placeholder="Select gender" value={form.gender}
                                                options={["Male", "Female", "Non-binary", "Prefer not to say"]}
                                                onChange={v => set("gender", v)} />
                                        </div>
                                        <div className="ae-field">
                                            <label className="ae-label">Marital Status</label>
                                            <CustomSelect placeholder="Select marital status" value={form.maritalStatus}
                                                options={["Single", "Married", "Divorced", "Widowed"]}
                                                onChange={v => set("maritalStatus", v)} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Work Information */}
                        <div className="ae-card">
                            <div className="ae-card-header">
                                <div className="ae-card-icon"><Icon.Briefcase /></div>
                                <div>
                                    <div className="ae-card-title">Work Information</div>
                                    <div className="ae-card-sub">Add employee's work related details.</div>
                                </div>
                            </div>
                            <div className="ae-card-body">
                                <div className="ae-grid-2">
                                    <div className="ae-field">
                                        <label className="ae-label">Department <span className="ae-required">*</span></label>
                                        <CustomSelect placeholder="Select department" value={form.department}
                                            options={["Engineering", "Design", "Marketing", "Sales", "HR", "Finance", "Operations"]}
                                            onChange={v => set("department", v)} />
                                    </div>
                                    <div className="ae-field">
                                        <label className="ae-label">Date of Joining <span className="ae-required">*</span></label>
                                        <div className="ae-input-wrap">
                                            <span className="ae-input-icon"><Icon.Calendar /></span>
                                            <input className="ae-input" type="date" value={form.dateOfJoining}
                                                onChange={e => set("dateOfJoining", e.target.value)} />
                                        </div>
                                    </div>
                                    <div className="ae-field">
                                        <label className="ae-label">Designation <span className="ae-required">*</span></label>
                                        <CustomSelect placeholder="Select designation" value={form.designation}
                                            options={["Intern", "Junior", "Mid-level", "Senior", "Lead", "Manager", "Director", "VP", "C-Level"]}
                                            onChange={v => set("designation", v)} />
                                    </div>
                                    <div className="ae-field">
                                        <label className="ae-label">Work Location</label>
                                        <CustomSelect placeholder="Select work location" value={form.workLocation}
                                            options={["On-site", "Remote", "Hybrid"]}
                                            onChange={v => set("workLocation", v)} />
                                    </div>
                                    <div className="ae-field">
                                        <label className="ae-label">Reporting Manager</label>
                                        <CustomSelect placeholder="Select reporting manager" value={form.reportingManager}
                                            options={["Aarav Sharma", "Priya Patel", "Rohan Mehta", "Neha Joshi"]}
                                            onChange={v => set("reportingManager", v)} />
                                    </div>
                                    <div className="ae-field">
                                        <label className="ae-label">Employment Type</label>
                                        <CustomSelect placeholder="Select employment type" value={form.employmentType}
                                            options={["Full-time", "Part-time", "Contract", "Freelance", "Internship"]}
                                            onChange={v => set("employmentType", v)} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>}

                    {/* ── STEP 2 ── */}
                    {step === 2 && <>
                        <div className="ae-card">
                            <div className="ae-card-header">
                                <div className="ae-card-icon"><Icon.Shield /></div>
                                <div>
                                    <div className="ae-card-title">Role & Department</div>
                                    <div className="ae-card-sub">Assign a role to define the employee's access level.</div>
                                </div>
                            </div>
                            <div className="ae-card-body">
                                <div className="ae-role-grid">
                                    {[
                                        { key: "Admin", icon: "👑", desc: "Full system access" },
                                        { key: "Manager", icon: "📋", desc: "Team management" },
                                        { key: "Member", icon: "👤", desc: "Standard access" },
                                        { key: "Custom Role", icon: "⚙️", desc: "Define permissions" },
                                    ].map(r => (
                                        <div key={r.key} className={`ae-role-card${form.role === r.key ? " selected" : ""}`}
                                            onClick={() => set("role", r.key)}>
                                            <div className="ae-role-icon">{r.icon}</div>
                                            <div className="ae-role-name">{r.key}</div>
                                            <div className="ae-role-desc">{r.desc}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </>}

                    {/* ── STEP 3 ── */}
                    {step === 3 && <>
                        <div className="ae-card">
                            <div className="ae-card-header">
                                <div className="ae-card-icon"><Icon.Shield /></div>
                                <div>
                                    <div className="ae-card-title">Access & Permissions</div>
                                    <div className="ae-card-sub">Configure what this employee can access and do.</div>
                                </div>
                            </div>
                            <div className="ae-card-body">
                                <div className="ae-perm-grid">
                                    {[
                                        { key: "canManageEmployees", label: "Manage Employees", sub: "Add, edit, remove employees" },
                                        { key: "canViewReports", label: "View Reports", sub: "Access analytics & reports" },
                                        { key: "canApproveLeave", label: "Approve Leave", sub: "Approve/reject leave requests" },
                                        { key: "canManageProjects", label: "Manage Projects", sub: "Create and manage projects" },
                                        { key: "canViewSalary", label: "View Salary", sub: "Access payroll information" },
                                        { key: "canExportData", label: "Export Data", sub: "Export reports & data" },
                                    ].map(p => (
                                        <div key={p.key} className="ae-perm-row">
                                            <div>
                                                <div className="ae-perm-label">{p.label}</div>
                                                <div className="ae-perm-sub">{p.sub}</div>
                                            </div>
                                            <button
                                                className={`sg-toggle${form[p.key] ? " on" : ""}`}
                                                onClick={() => set(p.key, !form[p.key])} type="button">
                                                <div className="sg-toggle-thumb" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </>}

                    {/* ── STEP 4 ── */}
                    {step === 4 && <>
                        <div className="ae-card">
                            <div className="ae-card-header">
                                <div className="ae-card-icon"><Icon.CircleCheck /></div>
                                <div>
                                    <div className="ae-card-title">Review & Invite</div>
                                    <div className="ae-card-sub">Review the details before sending the invite.</div>
                                </div>
                            </div>
                            <div className="ae-card-body">
                                <div className="ae-review-grid">
                                    {[
                                        ["Full Name", form.fullName],
                                        ["Email", form.email],
                                        ["Phone", form.phone],
                                        ["Date of Birth", form.dob],
                                        ["Employee ID", form.employeeId],
                                        ["Gender", form.gender],
                                        ["Marital Status", form.maritalStatus],
                                        ["Department", form.department],
                                        ["Designation", form.designation],
                                        ["Date of Joining", form.dateOfJoining],
                                        ["Work Location", form.workLocation],
                                        ["Employment Type", form.employmentType],
                                        ["Reporting Manager", form.reportingManager],
                                        ["Role", form.role],
                                    ].map(([label, val]) => (
                                        <div key={label} className="ae-review-row">
                                            <div className="ae-review-label">{label}</div>
                                            <div className={`ae-review-val${!val ? " ae-review-empty" : ""}`}>{val || "Not provided"}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </>}

                    {/* Bottom bar */}
                    <div className="ae-bottom-bar">
                        <button className="ae-cancel-btn" onClick={() => step > 1 && setStep(s => s - 1)} type="button">
                            {step > 1 ? "← Back" : "Cancel"}
                        </button>
                        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                            <span className="ae-step-indicator">Step {step} of 4</span>
                            <button className="ae-next-btn" onClick={() => setStep(s => Math.min(4, s + 1))} type="button">
                                {step === 4 ? <><Icon.Send /> Send Invite</> : <>Next <Icon.ArrowRight /></>}
                            </button>
                        </div>
                    </div>
                </div>

                {/* ── RIGHT PANEL ── */}
                <div className="ae-right">
                    {/* Invite Method */}
                    <div className="ae-rcard">
                        <div className="ae-rcard-header">Invite Method</div>
                        <div className="ae-rcard-body">
                            <div className="ae-invite-opt selected" onClick={() => setInviteMethod("email")}
                                style={inviteMethod === "email" ? {} : { background: "#fff", borderColor: "#f0e6f0" }}>
                                <div className="ae-invite-radio">
                                    {inviteMethod === "email" && <div className="ae-invite-radio-dot" style={{ display: "block" }} />}
                                </div>
                                <div>
                                    <div className="ae-invite-label">Send Invite Email</div>
                                    <div className="ae-invite-sub">Employee will receive an email invitation</div>
                                </div>
                            </div>
                            <div className="ae-invite-opt" onClick={() => setInviteMethod("noinvite")}
                                style={inviteMethod === "noinvite" ? { borderColor: "#b5179e", background: "linear-gradient(135deg,#fdf0fc,#f9eafb)" } : {}}>
                                <div className="ae-invite-radio">
                                    {inviteMethod === "noinvite" && <div className="ae-invite-radio-dot" style={{ display: "block" }} />}
                                </div>
                                <div>
                                    <div className="ae-invite-label">Add Without Invite</div>
                                    <div className="ae-invite-sub">Add employee directly without sending invite</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Role & Permissions */}
                    <div className="ae-rcard">
                        <div className="ae-rcard-header">Role & Permission</div>
                        <div className="ae-rcard-body">
                            <div style={{ fontSize: 11.5, color: "#8a7a9b", marginBottom: 10 }}>
                                You can set role and permissions in the next step.
                            </div>
                            <div className="ae-perm-info-list">
                                {["Admin", "Manager", "Member", "Custom Role"].map(r => (
                                    <div key={r} className="ae-perm-info-row">
                                        <span className="ae-perm-check"><Icon.CircleCheck /></span>
                                        {r}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Bulk Import */}
                    <div className="ae-rcard">
                        <div className="ae-rcard-body">
                            <div className="ae-bulk-inner">
                                <div style={{ fontSize: 18 }}>📥</div>
                                <div className="ae-bulk-title">Need Bulk Import?</div>
                                <div className="ae-bulk-sub">Import multiple employees at once using CSV or Excel file.</div>
                                <button className="ae-bulk-btn" type="button">
                                    <Icon.Download /> Import Employees
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Tips */}
                    <div className="ae-rcard">
                        <div className="ae-rcard-header">💡 Tips</div>
                        <div className="ae-rcard-body">
                            <div className="ae-tips-list">
                                {[
                                    "All fields marked with * are required.",
                                    "You can edit employee details anytime.",
                                    "Employee will be able to login after accepting the invite.",
                                ].map(t => (
                                    <div key={t} className="ae-tip-row">
                                        <div className="ae-tip-dot" />
                                        {t}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}