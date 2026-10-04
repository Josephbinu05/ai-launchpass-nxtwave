"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowUpRight, FlaskConical, GraduationCap, LayoutDashboard, Zap } from 'lucide-react';
import { useCampaign } from './store';

export function Shell({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  const growth = path.startsWith('/growth');
  const { currentStudent, storageWarning } = useCampaign();
  return <>
    <a className="skip-link" href="#main-content">Skip to content</a>
    <header className="site-header">
      <Link href="/" className="brand" aria-label="AI LaunchPass home"><span className="brand-icon"><Zap size={21} fill="currentColor" /></span><span>AI Launch<span className="brand-light">Pass</span><small>A NXTWAVE GROWTH CONCEPT</small></span></Link>
      <nav className="main-nav" aria-label="Main navigation">
        <Link href="/match" className={path === '/match/' || path === '/match' ? 'active' : ''}>Discover a project</Link>
        <Link href="/leaderboard" className={path.startsWith('/leaderboard') ? 'active' : ''}>Campus leaderboard</Link>
        {currentStudent ? <Link href="/pass" className={path.startsWith('/pass') ? 'active' : ''}>My LaunchPass</Link> : <Link href="/#workshop">The workshop <ArrowUpRight size={13}/></Link>}
      </nav>
      <nav className="mode-toggle" aria-label="Switch view"><Link href={currentStudent ? '/pass' : '/'} aria-current={!growth ? 'page' : undefined} className={!growth ? 'selected' : ''}><GraduationCap size={15}/> <span>Student View</span></Link><Link href="/growth" aria-current={growth ? 'page' : undefined} className={growth ? 'selected' : ''}><LayoutDashboard size={14}/><span>Growth Team View</span></Link></nav>
    </header>
    <div className="demo-strip"><FlaskConical size={13}/><strong>Demo Campaign</strong><span>Simulated data · Independent challenge prototype · No real seats or rewards</span></div>
    {storageWarning && <div className="storage-warning" role="status">{storageWarning}</div>}
    <main id="main-content" tabIndex={-1}>{children}</main>
    <footer className="site-footer"><span className="footer-brand"><Zap size={16}/> AI LaunchPass</span><span>Built around one goal. 500 students. 7 days. ₹2,000.</span><span>A simulated NxtWave growth challenge</span></footer>
  </>;
}
