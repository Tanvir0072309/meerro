import React, { useState } from 'react';
import './Upgrade.css';

/* ══ ICONS ══ */
const Icons = {
    CheckGreen: () => (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="11" fill="#22c55e" />
            <polyline points="7 12 10 15 17 9" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    ),
    CheckBlue: () => (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="11" fill="#3b82f6" />
            <polyline points="7 12 10 15 17 9" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    ),
    CheckGray: () => (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="11" fill="#e2e8f0" />
            <line x1="8" y1="12" x2="16" y2="12" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" />
        </svg>
    ),
    CheckTableGreen: () => (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="11" fill="none" stroke="#22c55e" strokeWidth="2" />
            <polyline points="7 12 10 15 17 9" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    ),
    XMark: () => (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="11" fill="none" stroke="#e2e8f0" strokeWidth="2" />
            <line x1="9" y1="9" x2="15" y2="15" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" />
            <line x1="15" y1="9" x2="9" y2="15" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" />
        </svg>
    ),
    Star: () => (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="#f59e0b" stroke="#f59e0b" strokeWidth="1">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
    ),
    Camera: () => (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
            <circle cx="12" cy="13" r="4" />
        </svg>
    ),
    BarChart: () => (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" />
            <line x1="6" y1="20" x2="6" y2="14" /><line x1="2" y1="20" x2="22" y2="20" />
        </svg>
    ),
    Folder: () => (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
        </svg>
    ),
    Headphones: () => (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
            <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3z" />
            <path d="M3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
        </svg>
    ),
    CheckCircleBlue: () => (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="11" fill="none" stroke="#3b82f6" strokeWidth="2" />
            <polyline points="7 12 10 15 17 9" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    ),
};

/* ══ DATA ══ */
const BASIC_FEATURES = [
    { text: 'Live Screen Monitoring', enabled: true },
    { text: 'Screenshots (3 per hour)', enabled: true },
    { text: 'Activity Tracking', enabled: true },
    { text: 'Work Time Tracking', enabled: true },
    { text: 'Basic Reports', enabled: true },
    { text: 'Advanced Analytics', enabled: false },
    { text: 'Project & Task Tracking', enabled: false },
    { text: 'API Access', enabled: false },
    { text: 'Priority Support', enabled: false },
];

const PRO_FEATURES = [
    'Everything in Basic',
    'Screenshots (Unlimited)',
    'Advanced Activity Tracking',
    'Productivity Analytics',
    'Reports & Export (PDF, Excel)',
    'Project & Task Management',
    'Integrations',
    'API Access',
    'Priority Support',
];

const ENT_FEATURES = [
    'Everything in Pro',
    'Custom Integrations',
    'Advanced Security',
    'SSO (Single Sign-On)',
    'Dedicated Account Manager',
    'Custom Reports',
    'On-premise Deployment',
    '24/7 Priority Support',
    'SLA Guarantee',
];

const COMPARE = [
    { label: 'Live Screen Monitoring', basic: 'check', pro: 'check', ent: 'check' },
    { label: 'Screenshots', basic: '3 per hour', pro: 'Unlimited', ent: 'Unlimited' },
    { label: 'Activity Tracking', basic: 'check', pro: 'check', ent: 'check' },
    { label: 'Reports & Analytics', basic: 'Basic Reports', pro: 'Advanced Reports', ent: 'Custom Reports' },
    { label: 'Project & Task Management', basic: 'x', pro: 'check', ent: 'check' },
];

const HIGHLIGHTS = [
    { Icon: Icons.Camera, bg: '#eff6ff', color: '#3b82f6', title: 'Unlimited Screenshots', desc: 'Capture unlimited screenshots and never miss important details.' },
    { Icon: Icons.BarChart, bg: '#f0fdf4', color: '#22c55e', title: 'Advanced Analytics', desc: 'Get deeper insights with productivity trends and custom reports.' },
    { Icon: Icons.Folder, bg: '#fff7ed', color: '#f97316', title: 'Project Management', desc: 'Track projects, tasks and deadlines in one integrated platform.' },
    { Icon: Icons.Headphones, bg: '#faf5ff', color: '#9c27b0', title: 'Priority Support', desc: 'Get faster response times with our priority customer support.' },
];

/* ══ ROCKET SVG ══ */
function Rocket() {
    return (
        <div className="utp-rocket-wrap">
            <svg viewBox="0 0 140 200" width="140" height="200" xmlns="http://www.w3.org/2000/svg">
                {/* Stars */}
                <circle cx="18" cy="25" r="2" fill="#c4b5fd" opacity="0.7" />
                <circle cx="125" cy="15" r="1.5" fill="#a78bfa" opacity="0.6" />
                <circle cx="130" cy="55" r="1.5" fill="#93c5fd" opacity="0.5" />
                <circle cx="8" cy="75" r="1" fill="#c4b5fd" opacity="0.6" />
                <text x="108" y="38" fill="#a78bfa" fontSize="14" opacity="0.5" fontWeight="200">+</text>
                <text x="15" y="100" fill="#c4b5fd" fontSize="12" opacity="0.4" fontWeight="200">+</text>
                {/* Flame / exhaust */}
                <ellipse cx="70" cy="178" rx="8" ry="14" fill="#fcd34d" opacity="0.5" />
                <ellipse cx="70" cy="172" rx="10" ry="10" fill="#fb923c" opacity="0.7" />
                <ellipse cx="70" cy="166" rx="8" ry="6" fill="#f97316" opacity="0.9" />
                {/* Body */}
                <path d="M50 130 Q50 100 70 60 Q90 100 90 130 Z" fill="#3b82f6" />
                <path d="M50 130 Q50 100 70 60 Q90 100 90 130 Z" fill="url(#bodyGrad)" />
                {/* Nose */}
                <path d="M70 15 Q58 38 58 60 Q70 65 82 60 Q82 38 70 15Z" fill="#1d4ed8" />
                <path d="M70 15 Q63 36 63 58 Q70 63 77 58 Q77 36 70 15Z" fill="#2563eb" />
                {/* Window */}
                <circle cx="70" cy="92" r="12" fill="#bfdbfe" />
                <circle cx="70" cy="92" r="12" fill="url(#windowGrad)" />
                <circle cx="70" cy="92" r="9" fill="#dbeafe" opacity="0.9" />
                <circle cx="66" cy="88" r="3.5" fill="#fff" opacity="0.85" />
                {/* Left wing */}
                <path d="M52 115 L36 140 L52 133 Z" fill="#1e40af" />
                <path d="M52 115 L38 137 L52 130 Z" fill="#2563eb" />
                {/* Right wing */}
                <path d="M88 115 L104 140 L88 133 Z" fill="#1e40af" />
                <path d="M88 115 L102 137 L88 130 Z" fill="#2563eb" />
                {/* Bottom thruster */}
                <rect x="63" y="128" width="14" height="8" rx="3" fill="#1e40af" />
                <defs>
                    <linearGradient id="bodyGrad" x1="50" y1="60" x2="90" y2="130" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.6" />
                        <stop offset="100%" stopColor="#1d4ed8" stopOpacity="0.3" />
                    </linearGradient>
                    <radialGradient id="windowGrad" cx="38%" cy="35%" r="65%">
                        <stop offset="0%" stopColor="#eff6ff" />
                        <stop offset="100%" stopColor="#93c5fd" />
                    </radialGradient>
                </defs>
            </svg>
        </div>
    );
}

/* ══ TABLE CELL ══ */
function TCell({ val }) {
    if (val === 'check') return <div className="utp-tcell"><Icons.CheckTableGreen /></div>;
    if (val === 'x') return <div className="utp-tcell"><Icons.XMark /></div>;
    return <div className="utp-tcell-text">{val}</div>;
}

/* ══ MAIN ══ */
export default function UpgradeToPro() {
    const [billing, setBilling] = useState('monthly');
    const yr = billing === 'yearly';

    return (
        <div className="utp-page">

            {/* ══ TOP: Hero left + Hero right card ══ */}
            <div className="utp-top-row">

                {/* Left — title + free trial badge */}
                <div className="utp-top-left">
                    <h1 className="utp-main-title">Unlock the Full Power of WorkMonitor</h1>
                    <p className="utp-main-sub">
                        Upgrade to Pro and supercharge your team productivity with advanced monitoring,
                        detailed analytics, and premium support.
                    </p>
                </div>

                {/* Free trial badge — center-ish */}
                <div className="utp-trial-badge-wrap">
                    <div className="utp-trial-badge">
                        <span>🎉</span>
                        <span className="utp-trial-text">14-Day Free Trial</span>
                        <span>✨</span>
                    </div>
                    <div className="utp-trial-note">No credit card required</div>
                </div>

                {/* Right — hero card with rocket */}
                <div className="utp-hero-card">
                    <div className="utp-hero-card-body">
                        <div className="utp-hero-card-title">Upgrade & Boost<br />Team Productivity</div>
                        <ul className="utp-hero-list">
                            {['Get more insights', 'Improve accountability', 'Make data-driven decisions', 'Save time & increase efficiency'].map((item, i) => (
                                <li key={i} className="utp-hero-list-item">
                                    <Icons.CheckCircleBlue />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <Rocket />
                </div>
            </div>

            {/* ══ BILLING TOGGLE ══ */}
            <div className="utp-billing-row">
                <div className="utp-billing-toggle">
                    <button
                        className={`utp-bill-btn ${!yr ? 'active' : ''}`}
                        onClick={() => setBilling('monthly')}
                    >
                        <span className="utp-bill-label">Monthly</span>
                        <span className="utp-bill-sub">Pay monthly</span>
                    </button>

                    {/* Toggle pill */}
                    <div className="utp-toggle-pill" onClick={() => setBilling(b => b === 'monthly' ? 'yearly' : 'monthly')}>
                        <div className={`utp-toggle-knob ${yr ? 'right' : ''}`} />
                    </div>

                    <button
                        className={`utp-bill-btn ${yr ? 'active' : ''}`}
                        onClick={() => setBilling('yearly')}
                    >
                        <span className="utp-bill-label">
                            Yearly&nbsp;
                            <span className="utp-save-chip">Save 20%</span>
                        </span>
                        <span className="utp-bill-sub">Pay yearly</span>
                    </button>
                </div>
            </div>

            {/* ══ PRICING CARDS + RIGHT PANEL ══ */}
            <div className="utp-content-row">

                {/* 3 plan cards */}
                <div className="utp-plans-wrap">
                    <div className="utp-plans">

                        {/* ── BASIC ── */}
                        <div className="utp-plan basic">
                            <div className="utp-plan-name">Basic</div>
                            <p className="utp-plan-desc">Perfect for small teams getting started with employee monitoring.</p>
                            <div className="utp-price-row">
                                <span className="utp-dollar">$</span>
                                <span className="utp-amount">{yr ? 7 : 9}</span>
                                <span className="utp-period">/user/month</span>
                            </div>
                            <div className="utp-billed">Billed monthly</div>
                            <button className="utp-btn utp-btn-outline">Get Started</button>
                            <ul className="utp-feats">
                                {BASIC_FEATURES.map((f, i) => (
                                    <li key={i} className={`utp-feat ${!f.enabled ? 'disabled' : ''}`}>
                                        {f.enabled ? <Icons.CheckGreen /> : <Icons.CheckGray />}
                                        <span>{f.text}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* ── PRO ── */}
                        <div className="utp-plan pro">
                            <div className="utp-popular-tag">
                                <span>🏆</span> Most Popular
                            </div>
                            <div className="utp-plan-name">Pro</div>
                            <p className="utp-plan-desc">Advanced features for growing teams and data-driven decisions.</p>
                            <div className="utp-price-row">
                                <span className="utp-dollar">$</span>
                                <span className="utp-amount">{yr ? 15 : 19}</span>
                                <span className="utp-period">/user/month</span>
                            </div>
                            <div className="utp-billed">Billed monthly</div>
                            <button className="utp-btn utp-btn-primary">Start Free Trial</button>
                            <div className="utp-trial-inline">14 days free, then ${yr ? 15 : 19}/user/month</div>
                            <ul className="utp-feats">
                                {PRO_FEATURES.map((f, i) => (
                                    <li key={i} className="utp-feat">
                                        <Icons.CheckBlue />
                                        <span>{f}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* ── ENTERPRISE ── */}
                        <div className="utp-plan enterprise">
                            <div className="utp-plan-name">Enterprise</div>
                            <p className="utp-plan-desc">For large organizations with custom requirements and dedicated support.</p>
                            <div className="utp-price-row">
                                <span className="utp-dollar">$</span>
                                <span className="utp-amount">{yr ? 31 : 39}</span>
                                <span className="utp-period">/user/month</span>
                            </div>
                            <div className="utp-billed">Billed monthly</div>
                            <button className="utp-btn utp-btn-outline-blue">Contact Sales</button>
                            <ul className="utp-feats">
                                {ENT_FEATURES.map((f, i) => (
                                    <li key={i} className="utp-feat">
                                        <Icons.CheckGreen />
                                        <span>{f}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                    </div>

                    {/* ── COMPARE TABLE ── */}
                    <div className="utp-compare">
                        <h2 className="utp-compare-title">Compare Plans</h2>
                        <table className="utp-table">
                            <thead>
                                <tr>
                                    <th className="utp-th-feat">Features</th>
                                    <th className="utp-th">Basic</th>
                                    <th className="utp-th pro-th">
                                        Pro
                                        <span className="utp-popular-chip">Most Popular</span>
                                    </th>
                                    <th className="utp-th">Enterprise</th>
                                </tr>
                            </thead>
                            <tbody>
                                {COMPARE.map((row, i) => (
                                    <tr key={i} className={i % 2 === 0 ? 'utp-tr-even' : ''}>
                                        <td className="utp-td-feat">{row.label}</td>
                                        <td className="utp-td"><TCell val={row.basic} /></td>
                                        <td className="utp-td"><TCell val={row.pro} /></td>
                                        <td className="utp-td"><TCell val={row.ent} /></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* ── RIGHT PANEL ── */}
                <div className="utp-right-panel">

                    {/* Pro Plan Highlights */}
                    <div className="utp-right-card">
                        <h3 className="utp-right-card-title">Pro Plan Highlights</h3>
                        <div className="utp-highlights">
                            {HIGHLIGHTS.map((h, i) => (
                                <div key={i} className="utp-highlight">
                                    <div className="utp-highlight-icon" style={{ background: h.bg, color: h.color }}>
                                        <h.Icon />
                                    </div>
                                    <div className="utp-highlight-body">
                                        <div className="utp-highlight-title">{h.title}</div>
                                        <div className="utp-highlight-desc">{h.desc}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Testimonial */}
                    <div className="utp-right-card">
                        <h3 className="utp-right-card-title">Trusted by 10,000+ teams</h3>
                        <blockquote className="utp-quote">
                            "WorkMonitor Pro has helped us increase team productivity by 35% and improved transparency across our organization."
                        </blockquote>
                        <div className="utp-author-row">
                            <div className="utp-author-avatar">JS</div>
                            <div>
                                <div className="utp-author-name">John Smith</div>
                                <div className="utp-author-role">CEO, TechNova Inc.</div>
                            </div>
                        </div>
                        <div className="utp-stars">
                            {[...Array(5)].map((_, i) => <Icons.Star key={i} />)}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
