import { useEffect, useState } from 'react';
import { BookOpen, Code2, Ghost, Github, Heart, Moon, Music2, PackageOpen, Radio, Sparkles, Terminal, WandSparkles } from 'lucide-react';

type Note = { title: string; date: string; tag: string };
const emoji = ['🐈‍⬛', '🕷️', '🦇', '🪲', '🐞', '🦋', '🐛', '🦂', '🪳', '🦟', '🪰', '🐌', '🪱', '🦗', '🐸', '👻'];
const nav = [
  { id: 'notes', label: 'blog', icon: <BookOpen size={14} /> },
  { id: 'console', label: 'console', icon: <Terminal size={14} /> },
  { id: 'api', label: 'api', icon: <Code2 size={14} /> },
  { id: 'gallery', label: 'gallery', icon: <PackageOpen size={14} /> },
];

function App() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [disco, setDisco] = useState(false);
  const [horror, setHorror] = useState(true);
  const [critters, setCritters] = useState<{ id: number; icon: string; x: number; y: number }[]>([]);

  useEffect(() => {
    Promise.all([fetch('/api/notes').then((r) => r.json())]).then(([data]) => setNotes(data)).catch(() => undefined);
  }, []);

  useEffect(() => {
    let id = 0;
    const spawn = () => {
      const critter = { id: id++, icon: emoji[Math.floor(Math.random() * emoji.length)], x: 8 + Math.random() * 84, y: 14 + Math.random() * 72 };
      setCritters((old) => [...old.slice(-4), critter]);
      window.setTimeout(() => setCritters((old) => old.filter((item) => item.id !== critter.id)), 5000);
    };
    spawn();
    const timer = window.setInterval(spawn, 2500);
    return () => window.clearInterval(timer);
  }, []);

  const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <main className={`${disco ? 'is-disco' : ''} ${horror ? 'is-horror' : 'is-sweet'}`}>
      <div className="disco-lights" aria-hidden="true"><i /><i /><i /><i /><i /></div>
      <div className="critters" aria-hidden="true">{critters.map((item) => <span key={item.id} style={{ left: `${item.x}%`, top: `${item.y}%` }}>{item.icon}</span>)}</div>

      <header>
        <button className="brand" onClick={() => go('home')}><span>✦</span> lucky's<br /><b>web crypt</b></button>
        <div className="header-actions">
          <button onClick={() => setDisco(!disco)} className="control disco"><Music2 size={13} /> {disco ? 'quiet' : 'disco'}</button>
          <button onClick={() => setHorror(!horror)} className="control"><Moon size={13} /> {horror ? 'soft mode' : 'spooky'}</button>
        </div>
      </header>

      <section className="home" id="home">
        <div className="welcome-card">
          <div className="card-top"><span className="status"><i /> online-ish</span><span>v. 2.0.6</span></div>
          <div className="ghost"><Ghost size={60} strokeWidth={1.3} /><span>hi!</span></div>
          <p className="kicker">hello from the tiny internet</p>
          <h1>Lucky<br /><em>Patel</em></h1>
          <p className="intro">designer, developer & professional collector of cute bugs.</p>
          <div className="mini-row"><span>currently: making weird things</span><span>♡ 100%</span></div>
        </div>
        <div className="welcome-note"><Sparkles size={14} /> you found the secret homepage <Sparkles size={14} /></div>
        <div className="nav-grid">
          {nav.map((item) => <button key={item.id} onClick={() => go(item.id)}><span>{item.icon}</span>{item.label}<small>↗</small></button>)}
        </div>
        <div className="scroll-hint"><span>↓</span> scroll, little moth</div>
      </section>

      <section className="about-strip">
        <div className="section-label">[ a bit about me ]</div>
        <p>I make websites that feel like <em>places</em> — sometimes cozy, sometimes haunted, always mine.</p>
        <div className="tiny-stamps"><span>made with curiosity</span><span>no corporate energy</span><span>★ ★ ★ ★ ★</span></div>
      </section>

      <section className="panel-section" id="notes">
        <div className="section-head"><span className="section-label">[ blog / brain crumbs ]</span><span>things i wrote instead of sleeping</span></div>
        <div className="note-stack">{notes.map((note) => <button className="note" key={note.title}><span className="note-icon">✦</span><span><b>{note.title}</b><small>{note.tag} · {note.date}</small></span><span>↗</span></button>)}</div>
      </section>

      <section className="console-section" id="console">
        <div className="section-head"><span className="section-label">[ console ]</span><span>peek behind the curtain</span></div>
        <div className="terminal"><div className="terminal-bar"><span>● ● ●</span><b>lucky@crypt ~ zsh</b><span>⌁</span></div><p><i>➜</i> whoami</p><p className="pink">lucky — maker of tiny digital worlds</p><p><i>➜</i> ls ./current_obsessions</p><p className="lime">cats/  CSS/  horror_movies/  snacks/</p><p><i>➜</i> echo $MOOD</p><p className="orange">soft chaos & excellent hover states</p><span className="cursor">█</span></div>
      </section>

      <section className="gallery-section" id="gallery">
        <div className="section-head"><span className="section-label">[ gallery ]</span><span>tiny things i made / found</span></div>
        <div className="gallery-grid"><div className="art art-one"><span>☻</span><small>friendly entity #01</small></div><div className="art art-two"><span>✹</span><small>moon snack</small></div><div className="art art-three"><span>𓆩♡𓆪</span><small>web charm</small></div></div>
      </section>

      <section className="api-section" id="api"><div><span className="section-label">[ api ]</span><h2>A tiny<br /><em>portal</em></h2><p>There is a small Hono server living behind this page.</p><a href="/api/profile" target="_blank" rel="noreferrer"><Radio size={14} /> GET /api/profile ↗</a></div><div className="api-badge"><WandSparkles size={23} /><b>200</b><span>lucky is online</span></div></section>

      <footer><span>© 2026 Lucky Patel</span><span><Heart size={12} /> built with React + Hono</span><button onClick={() => go('home')}>back to crypt ↑</button></footer>
    </main>
  );
}

export default App;
