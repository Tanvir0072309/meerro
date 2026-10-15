import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Welcomepage.css';
import logo from '../../assets/logo.png';
import teamIllustration from '../../assets/Gemini_Generated_Image_r3dioir3dioir3di.png';

/* ══ ICONS ══════════════════════════════════════════════════════ */
const SVG = {
    Activity: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg>,
    BarChart: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" /></svg>,
    Users: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>,
    Shield: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>,
    Clock: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>,
    ArrowRight: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>,
    Play: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polygon points="10 8 16 12 10 16 10 8" /></svg>,
    TrendUp: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" /></svg>,
    CheckCircle: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>,
    Zap: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>,
};

/* ══ TIMING CONSTANTS ═══════════════════════════════════════════ */
const TYPE_SPEED = 60;   // ms per char while typing
const DELETE_SPEED = 35;   // ms per char while deleting
const PAUSE_AFTER_TYPE = 900;  // pause after "Life is full of Problems" fully typed
const PAUSE_BEFORE_DEL = 200;  // pause before deleting starts
const PROBLEM_TEXT = 'Life is full of Problems';

// After delete finishes → wait a beat → show solution
const SOLUTION_DELAY_AFTER_DELETE = 400;  // ms
// Solution stays for this long → then fade out
const SOLUTION_VISIBLE_DURATION = 2600; // ms
// After solution fades → show main page
const MAIN_START_DELAY = 600;  // ms after solution fade starts

/* ══ CINEMATIC INTRO ════════════════════════════════════════════ */
function CinematicIntro({ onDone }) {

    /* ── Phase: 'problem' → 'solution' → 'out' ── */
    const [phase, setPhase] = useState('problem');
    // typewriter
    const [displayText, setDisplayText] = useState('');
    const [typingDone, setTypingDone] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [textVisible, setTextVisible] = useState(true);
    // solution
    const [solVisible, setSolVisible] = useState(false);
    // light split (decorative hr animation)
    const [lightSplit, setLightSplit] = useState(false);

    useEffect(() => {
        const timers = [];
        const t = (fn, ms) => { const id = setTimeout(fn, ms); timers.push(id); return ms; };

        /* ─── STEP 1: Type "Life is full of Problems" ─── */
        let cursor = 0;
        let elapsed = 400; // initial pause

        // Type forward
        for (let i = 1; i <= PROBLEM_TEXT.length; i++) {
            const charIdx = i;
            timers.push(setTimeout(() => {
                setDisplayText(PROBLEM_TEXT.slice(0, charIdx));
                if (charIdx === PROBLEM_TEXT.length) setTypingDone(true);
            }, elapsed + (i - 1) * TYPE_SPEED));
        }
        elapsed += PROBLEM_TEXT.length * TYPE_SPEED + PAUSE_AFTER_TYPE;

        // Pause then start deleting
        timers.push(setTimeout(() => {
            setDeleting(true);
        }, elapsed));
        elapsed += PAUSE_BEFORE_DEL;

        // Delete backward
        for (let i = PROBLEM_TEXT.length - 1; i >= 0; i--) {
            const charIdx = i;
            const delOffset = (PROBLEM_TEXT.length - 1 - i) * DELETE_SPEED;
            timers.push(setTimeout(() => {
                setDisplayText(PROBLEM_TEXT.slice(0, charIdx));
                if (charIdx === 0) setTextVisible(false);
            }, elapsed + delOffset));
        }
        elapsed += PROBLEM_TEXT.length * DELETE_SPEED;

        /* ─── STEP 2: Show solution text ─── */
        elapsed += SOLUTION_DELAY_AFTER_DELETE;

        timers.push(setTimeout(() => {
            setLightSplit(true);
            setPhase('solution');
            setSolVisible(true);
        }, elapsed));

        /* ─── STEP 3: Fade out & hand off ─── */
        elapsed += SOLUTION_VISIBLE_DURATION;

        timers.push(setTimeout(() => {
            setPhase('out');
        }, elapsed));

        timers.push(setTimeout(() => {
            onDone();
        }, elapsed + MAIN_START_DELAY));

        return () => timers.forEach(clearTimeout);
    }, []);

    return (
        <div className={`cin-root${phase === 'out' ? ' cin-out' : ''}`}>
            <div className="cin-bg-light" />

            {/* ── Creative background ── */}
            <div className="cin-creative-bg">
                <div className="cin-dot-grid" />
                <div className="cin-orb cin-orb-1" />
                <div className="cin-orb cin-orb-2" />
                <div className="cin-orb cin-orb-3" />

                <svg className="cin-lines-svg" viewBox="0 0 1440 900" preserveAspectRatio="none">
                    <line x1="0" y1="900" x2="400" y2="0" stroke="rgba(181,23,158,0.06)" strokeWidth="1" />
                    <line x1="200" y1="900" x2="600" y2="0" stroke="rgba(114,9,183,0.05)" strokeWidth="1" />
                    <line x1="1440" y1="900" x2="1040" y2="0" stroke="rgba(181,23,158,0.06)" strokeWidth="1" />
                    <line x1="1240" y1="900" x2="840" y2="0" stroke="rgba(114,9,183,0.05)" strokeWidth="1" />
                    <line x1="720" y1="0" x2="720" y2="900" stroke="rgba(181,23,158,0.04)" strokeWidth="1" />
                    <circle cx="720" cy="450" r="200" stroke="rgba(181,23,158,0.07)" strokeWidth="1" fill="none" />
                    <circle cx="720" cy="450" r="330" stroke="rgba(114,9,183,0.05)" strokeWidth="1" fill="none" />
                    <circle cx="720" cy="450" r="440" stroke="rgba(181,23,158,0.04)" strokeWidth="1" fill="none" />
                </svg>

                {[
                    { text: 'productivity ↑', x: '8%', y: '22%', delay: '0s' },
                    { text: 'attendance ✓', x: '70%', y: '15%', delay: '0.4s' },
                    { text: 'team synced', x: '82%', y: '60%', delay: '0.8s' },
                    { text: 'live tracking', x: '5%', y: '60%', delay: '1.2s' },
                    { text: '99.9% uptime', x: '40%', y: '85%', delay: '0.6s' },
                    { text: 'smart insights', x: '60%', y: '88%', delay: '1.0s' },
                ].map((l, i) => (
                    <div key={i} className="cin-float-label"
                        style={{ left: l.x, top: l.y, animationDelay: l.delay }}>
                        {l.text}
                    </div>
                ))}

                {Array.from({ length: 22 }).map((_, i) => (
                    <div key={i} className="cin-particle"
                        style={{
                            left: `${10 + (i * 37) % 80}%`,
                            top: `${5 + (i * 53) % 90}%`,
                            animationDelay: `${(i * 0.3) % 4}s`,
                            animationDuration: `${3 + (i % 4)}s`,
                            width: `${2 + (i % 3)}px`,
                            height: `${2 + (i % 3)}px`,
                        }}
                    />
                ))}
            </div>

            {/* ── Center light / HR split ── */}
            <div className={`cin-center-light${lightSplit ? ' cin-light-split' : ''}`}>
                <div className="cin-hr cin-hr-top" />
                <div className="cin-hr cin-hr-bottom" />
            </div>

            {/* ── TEXT 1: "Life is full of Problems" typewriter ── */}
            {textVisible && (
                <div className={`cin-problem cin-problem-in`}>
                    <div className="cin-eyebrow">A story about modern work</div>
                    <h1 className="cin-h1">
                        <span className="cin-typed-line">
                            {displayText}
                            <span className={`cin-cursor${typingDone && !deleting ? ' cin-cursor-pause' : ''}`}>|</span>
                        </span>
                    </h1>
                    <div className="cin-underline"
                        style={{ opacity: typingDone ? 1 : 0, transition: 'opacity 0.4s' }} />
                </div>
            )}

            {/* ── TEXT 2: "But only one Solution : meerro" ── */}
            <div className={`cin-solution${solVisible ? ' cin-solution-in' : ''}${phase === 'out' ? ' cin-solution-out' : ''}`}>
                <div className="cin-sol-but">But only one Solution</div>
                <div className="cin-sol-brand">
                    <span className="cin-sol-colon">:</span>
                    <span className="cin-sol-name">meerro</span>
                </div>
                <div className="cin-sol-tag">Track Work • Boost Productivity • Stay Connected</div>
            </div>
        </div>
    );
}

/* ══ MAIN WELCOME PAGE ══════════════════════════════════════════ */
function WelcomeMain() {
    const navigate = useNavigate();
    const [step, setStep] = useState(0);

    useEffect(() => {
        const t = [
            setTimeout(() => setStep(1), 100),
            setTimeout(() => setStep(2), 500),
            setTimeout(() => setStep(3), 850),
            setTimeout(() => setStep(4), 1150),
            setTimeout(() => setStep(5), 1400),
        ];
        return () => t.forEach(clearTimeout);
    }, []);

    const features = [
        { Icon: SVG.Activity, label: 'Real-time Monitoring', color: '#b5179e' },
        { Icon: SVG.BarChart, label: 'Smart Analytics', color: '#7209b7' },
        { Icon: SVG.Users, label: 'Team Management', color: '#4361ee' },
        { Icon: SVG.Shield, label: 'Enterprise Security', color: '#0288d1' },
    ];

    const stats = [
        { val: '500+', label: 'Companies' },
        { val: '50K+', label: 'Employees' },
        { val: '99.9%', label: 'Uptime' },
        { val: '4.9★', label: 'Rating' },
    ];

    const highlights = [
        { Icon: SVG.Clock, text: 'Track attendance & work hours automatically' },
        { Icon: SVG.TrendUp, text: 'Boost team productivity with live insights' },
        { Icon: SVG.CheckCircle, text: 'Manage tasks, projects & daily analysis' },
    ];

    return (
        <div className="wlc-root wlc-visible">
            <div className="wlc-bg" />
            <div className="wlc-orb wlc-orb-a" />
            <div className="wlc-orb wlc-orb-b" />

            <div className="wlc-split">

                {/* ── LEFT ── */}
                <div className="wlc-left">
                    <div className="wlc-illus-wrap">
                        <div className="wlc-ring wlc-ring-1" />
                        <div className="wlc-ring wlc-ring-2" />
                        <div className="wlc-illus-glow" />

                        <div className="wlc-illus-rect">
                            <img src={teamIllustration} alt="meerro" className="wlc-illus-img" />
                        </div>

                        <div className="wlc-badge wlc-badge-tr">
                            <div className="wlc-badge-icon green"><SVG.Users /></div>
                            <div>
                                <div className="wlc-badge-val">96</div>
                                <div className="wlc-badge-lbl">Active Now</div>
                            </div>
                            <div className="wlc-live" />
                        </div>
                        <div className="wlc-badge wlc-badge-bl">
                            <div className="wlc-badge-icon pink"><SVG.TrendUp /></div>
                            <div>
                                <div className="wlc-badge-val">85%</div>
                                <div className="wlc-badge-lbl">Productivity</div>
                            </div>
                        </div>
                        <div className="wlc-badge wlc-badge-br">
                            <div className="wlc-badge-icon purple"><SVG.CheckCircle /></div>
                            <div>
                                <div className="wlc-badge-val">142</div>
                                <div className="wlc-badge-lbl">Tasks Done</div>
                            </div>
                        </div>
                    </div>

                    <div className="wlc-chart-bar">
                        <svg viewBox="0 0 200 50" fill="none" preserveAspectRatio="none" style={{ flex: 1, height: 36 }}>
                            <defs>
                                <linearGradient id="cg" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#b5179e" stopOpacity="0.28" />
                                    <stop offset="100%" stopColor="#b5179e" stopOpacity="0" />
                                </linearGradient>
                            </defs>
                            <path d="M0 45 L22 36 L44 40 L66 24 L88 28 L110 15 L132 20 L154 8 L176 13 L198 6 L200 6 L200 50 L0 50 Z" fill="url(#cg)" />
                            <path d="M0 45 L22 36 L44 40 L66 24 L88 28 L110 15 L132 20 L154 8 L176 13 L198 6" stroke="#b5179e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span>Live productivity trend ↑</span>
                    </div>
                </div>

                {/* ── RIGHT ── */}
                <div className="wlc-right">

                    <div className={`wlc-logo-row${step >= 1 ? ' wlc-in' : ''}`}>
                        <img src={logo} alt="meerro" className="wlc-logo-only-img" />
                    </div>

                    <div className={`wlc-pill${step >= 1 ? ' wlc-in' : ''}`}>
                        <span className="wlc-pill-dot" />
                        Trusted by 500+ companies worldwide
                    </div>

                    <div className={`wlc-headline${step >= 2 ? ' wlc-in' : ''}`}>
                        <span className="wlc-h-normal">Track Work •</span>
                        <span className="wlc-h-grad"> Boost Productivity</span>
                        <span className="wlc-h-normal"> • Stay Connected</span>
                    </div>

                    <div className={`wlc-highlights${step >= 3 ? ' wlc-in' : ''}`}>
                        {highlights.map((h, i) => (
                            <div key={i} className="wlc-hl-row">
                                <div className="wlc-hl-icon"><h.Icon /></div>
                                <span>{h.text}</span>
                            </div>
                        ))}
                    </div>

                    <div className={`wlc-feats${step >= 3 ? ' wlc-in' : ''}`}>
                        {features.map((f, i) => (
                            <div key={i} className="wlc-feat">
                                <div className="wlc-feat-icon" style={{ color: f.color }}><f.Icon /></div>
                                <span>{f.label}</span>
                            </div>
                        ))}
                    </div>

                    <div className={`wlc-cta${step >= 4 ? ' wlc-in' : ''}`}>
                        <button className="wlc-btn-primary" onClick={() => navigate('/dashboard')}>
                            Get Started
                            <div className="wlc-btn-icon"><SVG.ArrowRight /></div>
                        </button>
                        <button className="wlc-btn-ghost">
                            <div className="wlc-btn-icon"><SVG.Play /></div>
                            Watch Demo
                        </button>
                    </div>

                    <div className={`wlc-stats${step >= 5 ? ' wlc-in' : ''}`}>
                        {stats.map((s, i) => (
                            <div key={i} className="wlc-stat">
                                <div className="wlc-stat-val">{s.val}</div>
                                <div className="wlc-stat-lbl">{s.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

/* ══ ROOT ═══════════════════════════════════════════════════════ */
export default function WelcomePage() {
    const [done, setDone] = useState(false);
    return (
        <>
            {!done && <CinematicIntro onDone={() => setDone(true)} />}
            {done && <WelcomeMain />}
        </>
    );
}