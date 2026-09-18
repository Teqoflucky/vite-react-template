import { useEffect, useState } from 'react';
import { BookOpen, Check, Code2, ExternalLink, Ghost, Heart, ListChecks, Moon, Music2, Radio, ShieldCheck, Smartphone, Sparkles, Terminal, WandSparkles, X } from 'lucide-react';

type Note = { title: string; date: string; tag: string; slug?: string };
type Guide = {
  slug: string;
  eyebrow: string;
  title: string;
  summary: string;
  steps: { title: string; body: string }[];
  checklist: string[];
  troubleshooting: { title: string; body: string }[];
};

const guides: Record<string, Guide> = {
  nuvio: {
    slug: 'nuvio',
    eyebrow: 'STREAMING SETUP · 10 MINUTES',
    title: 'Nuvio on Windows + Android',
    summary: 'A careful, beginner-friendly walkthrough for adding Nuvio to Stremio on a Windows PC or Android phone/tablet.',
    steps: [
      { title: '1. Install Stremio from a trusted source', body: 'On a Windows PC, download the current desktop installer from stremio.com and finish the setup. On Android, install Stremio from Google Play when it is available for your device. Avoid random APK mirrors. Open Stremio once so it can finish creating its local folders.' },
      { title: '2. Sign in and check the right account', body: 'Create or sign in to your Stremio account before installing the add-on. Add-ons are tied to the account, so using the same login on Windows and Android keeps the setup synchronized. If you use a shared device, do not save your password in the browser.' },
      { title: '3. Open Nuvio’s current official listing', body: 'Use the Nuvio project’s current official page or documentation, and confirm the address uses HTTPS. Add-on pages can move over time; do not copy a manifest URL from an untrusted comment or an unofficial “download” button.' },
      { title: '4. Start the install', body: 'Select Install on the Nuvio listing. Windows should ask to open the link in Stremio; approve that handoff and confirm the add-on name. On Android, use the same browser-to-Stremio handoff. If Android stays in the browser, choose Open with Stremio or copy the official manifest into Stremio’s Add-ons search field.' },
      { title: '5. Confirm it inside Stremio', body: 'Open the Add-ons area, switch to My add-ons, and check that Nuvio is listed as active. If it is missing, sign out and back in with the account used during installation, then repeat the install from the official listing.' },
      { title: '6. Test a legitimate title', body: 'Search for a title you are allowed to watch and open its detail page. Nuvio should appear as a source only when it has a compatible result. Select a source, wait for it to buffer, and check that the audio, subtitles, and video quality match your expectations.' },
      { title: '7. Keep the setup maintainable', body: 'Leave automatic updates enabled in Stremio where possible. If the official Nuvio page changes its manifest, remove the old entry from My add-ons and reinstall from that current page instead of stacking duplicates.' },
    ],
    checklist: ['Stremio installed from stremio.com or Google Play', 'The same Stremio account is used on both devices', 'Nuvio appears under My add-ons', 'Playback is limited to content you are allowed to access'],
    troubleshooting: [
      { title: 'The Install button does nothing', body: 'Make sure Stremio is already installed, then try the button again. On Windows, allow the browser to open the stremio:// link. On Android, select Stremio from the app chooser or paste the official manifest into Add-ons.' },
      { title: 'Nuvio is installed but has no streams', body: 'Refresh the title, check your connection, and test another permitted title. Provider availability can change; do not “fix” this by installing unknown helper apps or APKs.' },
      { title: 'The two devices disagree', body: 'Confirm both devices are online and signed into the same account. Remove duplicate Nuvio entries, restart Stremio, and reinstall from the current official listing if the account still does not sync.' },
    ],
  },
  torrentio: {
    slug: 'torrentio',
    eyebrow: 'STREAMING SETUP · 12 MINUTES',
    title: 'Torrentio on Windows + Android',
    summary: 'A platform-by-platform Stremio setup guide, including configuration choices, account sync, and safer troubleshooting.',
    steps: [
      { title: '1. Set up Stremio first', body: 'On Windows, install Stremio from the official stremio.com download page. On Android, use Google Play where available. Launch it, create or sign in to an account, and confirm you can browse the catalog before adding anything else.' },
      { title: '2. Read the provider and privacy details', body: 'Torrentio is a third-party community add-on, not a Stremio feature. Review its current official documentation and configuration page before installing. Understand that torrent-based sources can expose your IP address to peers; use only content you have the legal right to access and follow the rules where you live.' },
      { title: '3. Choose conservative configuration options', body: 'On the official configuration page, choose only providers and quality limits you understand. Set language, subtitle, and sorting preferences deliberately. A debrid service is optional, paid, and separate from Torrentio; never enter a debrid password into an unrelated page.' },
      { title: '4. Install the configured add-on', body: 'Select Install at the bottom of the configuration page. On Windows, approve opening the stremio:// link and confirm the configuration in Stremio. On Android, open the link with Stremio; if the browser blocks it, use the official manifest link through Stremio’s Add-ons screen rather than downloading an APK.' },
      { title: '5. Verify the configuration', body: 'Go to Stremio → Add-ons → My add-ons and confirm the Torrentio entry is present. If you configured it more than once, remove old duplicates so the same title does not show repeated results.' },
      { title: '6. Test with rights-cleared content', body: 'Open a title that is public domain, creator-authorized, or otherwise licensed for you to access. Compare the source labels and choose a reliable result. Do not assume that a result appearing in an add-on is licensed or safe.' },
      { title: '7. Repeat the sync on Android', body: 'Sign into the same Stremio account on Android. Add-ons should sync automatically; if not, refresh My add-ons or reinstall the same saved configuration from the official page. Keep Android updated through Google Play and avoid modified Stremio packages.' },
    ],
    checklist: ['Official Stremio app is installed on each device', 'Torrentio was configured from its current official page', 'No duplicate or unknown add-ons are installed', 'Only licensed, public-domain, or otherwise authorized content is accessed'],
    troubleshooting: [
      { title: 'The configuration page is unavailable', body: 'Do not use a mirror just because it appears in a search result. Wait for the official project page to return or check its documented status channel. Community add-ons can be unavailable without anything being wrong with your Stremio install.' },
      { title: 'Sources are slow or fail', body: 'Try a different rights-cleared title, check your network, and review the quality/provider filters. Torrent availability is variable. Avoid installing “codec packs,” browser extensions, or unknown players advertised as a fix.' },
      { title: 'Android does not show the add-on', body: 'Force-refresh Stremio, verify the same account is active, and check My add-ons. If you used a browser, allow the stremio:// handoff; otherwise repeat the install from the official configuration page.' },
    ],
  },
};

const defaultNotes: Note[] = [
  { title: 'Nuvio installation: Windows + Android', date: '09.18.26', tag: 'GUIDE', slug: 'nuvio' },
  { title: 'Torrentio installation: Windows + Android', date: '09.18.26', tag: 'GUIDE', slug: 'torrentio' },
  { title: 'Interfaces should have secret doors', date: '08.14.25', tag: 'ESSAY' },
  { title: 'A field guide to softer systems', date: '06.02.25', tag: 'NOTES' },
  { title: 'Things I learned from a very small bug', date: '03.19.25', tag: 'PROCESS' },
];

const emoji = ['🐈‍⬛', '🕷️', '🦇', '🪲', '🐞', '🦋', '🐛', '🦂', '🪳', '🦟', '🪰', '🐌', '🪱', '🦗', '🐸', '👻'];
const nav = [
  { id: 'notes', label: 'blog', icon: <BookOpen size={14} /> },
  { id: 'console', label: 'console', icon: <Terminal size={14} /> },
  { id: 'api', label: 'api', icon: <Code2 size={14} /> },
];

function App() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [disco, setDisco] = useState(false);
  const [horror, setHorror] = useState(true);
  const [selectedGuide, setSelectedGuide] = useState<string | null>(null);
  const [critters, setCritters] = useState<{ id: number; icon: string; x: number; y: number }[]>([]);

  useEffect(() => {
    fetch('/api/notes')
      .then((response) => {
        if (!response.ok) throw new Error(`Notes request failed: ${response.status}`);
        return response.json() as Promise<Note[]>;
      })
      .then((data) => setNotes(data.length > 0 ? data : defaultNotes))
      .catch(() => setNotes(defaultNotes));
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
          <p className="intro">designer, developer, bug collector.</p>
          <div className="mini-row"><span>currently: making weird things</span><span>♡ 100%</span></div>
        </div>
        <div className="welcome-note"><Sparkles size={14} /> welcome in <Sparkles size={14} /></div>
        <div className="nav-grid">
          {nav.map((item) => <button key={item.id} onClick={() => go(item.id)}><span>{item.icon}</span>{item.label}<small>↗</small></button>)}
        </div>
        <div className="scroll-hint"><span>↓</span> scroll, little moth</div>
      </section>

      <section className="about-strip">
        <div className="section-label">[ about ]</div>
        <p>I make websites that feel like <em>places</em>.</p>
        <div className="tiny-stamps"><span>curious by default</span><span>★ ★ ★ ★ ★</span></div>
      </section>

      <section className="panel-section" id="notes">
        <div className="section-head"><span className="section-label">[ blog ]</span><span>notes from lucky</span></div>
        <div className="note-stack">{notes.map((note) => <button className="note" key={note.title} onClick={() => note.slug && setSelectedGuide(note.slug)} aria-expanded={selectedGuide === note.slug}><span className="note-icon">✦</span><span><b>{note.title}</b><small>{note.tag} · {note.date}</small></span><span>{note.slug ? '↗' : '·'}</span></button>)}</div>
        {selectedGuide && guides[selectedGuide] && <GuideReader guide={guides[selectedGuide]} onClose={() => setSelectedGuide(null)} />}
      </section>

      <section className="console-section" id="console">
        <div className="section-head"><span className="section-label">[ console ]</span><span>peek inside</span></div>
        <div className="terminal"><div className="terminal-bar"><span>● ● ●</span><b>lucky@crypt ~ zsh</b><span>⌁</span></div><p><i>➜</i> whoami</p><p className="pink">lucky — maker of tiny digital worlds</p><p><i>➜</i> ls ./current_obsessions</p><p className="lime">cats/  CSS/  horror_movies/  snacks/</p><p><i>➜</i> echo $MOOD</p><p className="orange">soft chaos & excellent hover states</p><span className="cursor">█</span></div>
      </section>

      <section className="api-section" id="api"><div><span className="section-label">[ api ]</span><h2>A tiny<br /><em>portal</em></h2><p>Hono lives here.</p><a href="/api/profile" target="_blank" rel="noreferrer"><Radio size={14} /> GET /api/profile ↗</a></div><div className="api-badge"><WandSparkles size={23} /><b>200</b><span>lucky is online</span></div></section>

      <footer><span>© 2026 Lucky Patel</span><span><Heart size={12} /> built with React + Hono</span><button onClick={() => go('home')}>back to crypt ↑</button></footer>
    </main>
  );
}

function GuideReader({ guide, onClose }: { guide: Guide; onClose: () => void }) {
  return (
    <article className="guide-reader">
      <div className="guide-heading">
        <div><span className="section-label">{guide.eyebrow}</span><h2>{guide.title}</h2><p>{guide.summary}</p></div>
        <button className="guide-close" onClick={onClose} aria-label="Close guide"><X size={16} /></button>
      </div>
      <div className="guide-notice"><ShieldCheck size={18} /><span><b>Stay safe + legal.</b> Third-party add-ons may list sources that are not authorized everywhere. Use official apps, protect your account, and only access content you are licensed or otherwise permitted to watch.</span></div>
      <div className="guide-layout">
        <div className="guide-steps"><div className="guide-subhead"><ListChecks size={15} /> step by step</div>{guide.steps.map((step) => <section className="guide-step" key={step.title}><h3>{step.title}</h3><p>{step.body}</p></section>)}</div>
        <aside className="guide-aside">
          <div className="guide-card"><div className="guide-subhead"><Check size={15} /> before you finish</div><ul>{guide.checklist.map((item) => <li key={item}>{item}</li>)}</ul></div>
          <div className="guide-card"><div className="guide-subhead"><Smartphone size={15} /> quick fixes</div>{guide.troubleshooting.map((item) => <details key={item.title}><summary>{item.title}</summary><p>{item.body}</p></details>)}</div>
          <a className="guide-link" href="https://www.stremio.com/" target="_blank" rel="noreferrer"><ExternalLink size={13} /> official Stremio site</a>
        </aside>
      </div>
    </article>
  );
}

export default App;
