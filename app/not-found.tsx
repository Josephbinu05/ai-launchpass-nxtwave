import Link from 'next/link';
export default function NotFound() { return <section className="empty-state"><span className="eyebrow">404 · A small detour</span><h1>This page hasn’t launched.</h1><p>Let’s get you back to finding your first AI project.</p><Link className="button button-primary" href="/">Back to LaunchPass</Link></section>; }
