import Link from 'next/link';
import { ArrowRight, ArrowUpRight, Check, Clock3, Code2, FileCheck2, GraduationCap, Layers3, Leaf, MousePointer2, ScanLine, Sparkles, Terminal, Trophy, Users, WandSparkles, Zap } from 'lucide-react';

export function Landing() {
  return <div className="landing">
    <section className="hero page-width">
      <div className="hero-copy"><div className="hero-eyebrow"><span className="live-dot"/> YOUR FIRST BUILD STARTS HERE <span className="tiny-pill">100% FREE</span></div>
        <h1>One hour.<br/>Your first <span className="text-teal">AI project.</span><span className="title-spark">✳</span></h1>
        <p className="hero-description">What could <strong>you</strong> build in 60 minutes? Find a project that fits your branch, skills, and curiosity. Then bring it to life in NxtWave’s free workshop.</p>
        <Link href="/match" className="button button-primary button-lg">Find My AI Project <ArrowRight size={19}/></Link>
        <div className="cta-note"><Check size={14}/> 3 questions <span>·</span> 30 seconds <span>·</span> No AI experience needed</div>
        <div className="hero-mini-stats"><span><GraduationCap size={19}/><span>Built for <strong>final-year engineers</strong></span></span><span><Clock3 size={19}/><span>A small commitment.<strong>A real starting point.</strong></span></span></div>
      </div>
      <div className="hero-art" aria-label="Illustration of a personalized AI project card">
        <div className="orbit orbit-one"/><div className="orbit orbit-two"/>
        <div className="floating-label top"><Sparkles size={15}/> Big ideas. Small first steps.</div>
        <div className="project-preview">
          <div className="preview-top"><span><span className="live-dot"/> YOUR NEXT GREAT IDEA</span><Layers3 size={17}/></div>
          <div className="preview-art"><div className="code-window"><div className="window-dots"><i/><i/><i/></div><code><span className="code-muted"># something you can build</span><br/><span className="code-purple">def</span> <span className="code-yellow">your_first_project</span>():<br/>&nbsp; idea = <span className="code-green">&quot;make it real&quot;</span><br/>&nbsp; <span className="code-purple">return</span> <span className="code-green">a_little_possibility</span></code></div><span className="art-star"><Sparkles size={25}/></span><div className="build-success"><Check size={12}/> First build, unlocked</div></div>
          <div className="preview-content"><div className="preview-tags"><span>PERSONALIZED FOR YOU</span><span>EXAMPLE MATCH</span></div><h2>AI Resume Screener</h2><p>Turn a resume into useful insights.<br/>Build your own placement sidekick.</p><div className="project-meta"><span><Clock3 size={14}/> 55 min</span><span><Code2 size={14}/> Beginner</span><span>Python</span></div><div className="preview-bottom"><span>Your idea. Your first build.</span><span className="round-arrow"><ArrowUpRight size={19}/></span></div></div>
        </div>
        <div className="floating-label bottom"><span className="mint-icon"><Zap size={17}/></span><span>A portfolio starts<br/><strong>with one project.</strong></span><MousePointer2 className="floating-pointer" size={23}/></div>
      </div>
    </section>
    <div className="trust-strip"><div className="page-width"><span><Clock3/>60-minute online workshop</span><span><Code2/>Beginner-friendly by design</span><span><Users/>Learn with your campus</span><span><Zap/>₹0. Just bring your curiosity.</span></div></div>
    <section className="page-width how-section" id="workshop"><div className="section-heading"><div><span className="eyebrow">LESS WATCHING. MORE MAKING.</span><h2>From “where do I start?” to “I built this.”</h2></div><p>Build Your First AI Project in 60 Minutes.<br/>A workshop concept with a clear outcome.</p></div><div className="benefit-grid">{[
      { icon: WandSparkles, number:'01', title:'Find your kind of project', text:'Your branch, experience, and interests turn into a practical, personalized starting point.' },
      { icon: Terminal, number:'02', title:'Build, don’t just watch', text:'Follow a guided starter project. Learn the concepts by making something you can explain.' },
      { icon: FileCheck2, number:'03', title:'Leave with a next step', text:'Take a working prototype further. Make it your own, add it to your portfolio, and keep learning.' },
    ].map(item=><article className="benefit-card" key={item.number}><div><span className="icon-tile"><item.icon size={22}/></span><span className="step-number">{item.number}</span></div><h3>{item.title}</h3><p>{item.text}</p></article>)}</div></section>
    <section className="page-width project-teaser"><div><span className="eyebrow">A LITTLE CURIOSITY GOES A LONG WAY</span><h2>AI isn’t just for one branch.</h2><p>From greener campuses to smarter study sessions,<br className="desktop-only"/> there’s a first project with your name on it.</p><Link href="/match" className="text-link">Discover your match <ArrowRight size={16}/></Link></div><div className="teaser-grid"><span><FileCheck2/> Resume Screener <i>CAREER</i></span><span><Leaf/> Plant Disease Detector <i>SUSTAINABILITY</i></span><span><ScanLine/> Image Classifier <i>COMPUTER VISION</i></span><span><Layers3/> Study Planner <i>PRODUCTIVITY</i></span></div></section>
    <section className="page-width campus-cta"><div className="campus-cta-icon"><Trophy size={35}/></div><div><span className="eyebrow">BETTER WITH YOUR CAMPUS</span><h2>Your next project could start a movement.</h2><p>Invite your friends. Unlock prototype resources. Help your campus climb.</p></div><Link href="/leaderboard" className="button button-secondary">See Campus Leaderboard <ArrowUpRight size={17}/></Link></section>
  </div>;
}
