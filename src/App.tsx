import { useEffect, useState } from 'react';
import { ArrowLeft, BookOpen, Check, Code2, ExternalLink, Ghost, Heart, ListChecks, Moon, Music2, Play, Radio, Search, ShieldCheck, Smartphone, Sparkles, Terminal, WandSparkles, X } from 'lucide-react';

type Note = { title: string; date: string; tag: string; slug?: string };
type Guide = {
  slug: string;
  eyebrow: string;
  title: string;
  summary: string;
  steps: { title: string; body: string }[];
  checklist: string[];
  troubleshooting: { title: string; body: string }[];
  links: { label: string; detail: string; href: string }[];
};
type StreamTitle = { id: string; title: string; year: number; type: 'Movie' | 'Series'; genre: string; description: string; poster: string; sources: { label: string; quality: string; url: string }[] };

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
    links: [
      { label: 'Nuvio official site', detail: 'Project home and current product information', href: 'https://nuvio.tv' },
      { label: 'Stremio downloads', detail: 'Windows, Android, and other official apps', href: 'https://www.stremio.com/downloads' },
      { label: 'Stremio add-ons', detail: 'Official add-on documentation and directory', href: 'https://www.stremio.com/add-ons' },
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
    links: [
      { label: 'Torrentio configure', detail: 'Current configuration page and provider settings', href: 'https://torrentio.strem.fun/configure' },
      { label: 'Torrentio project home', detail: 'Service information and configuration entry point', href: 'https://torrentio.strem.fun' },
      { label: 'Stremio downloads', detail: 'Windows, Android, and other official apps', href: 'https://www.stremio.com/downloads' },
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

const streamTitles: StreamTitle[] = [
  { id: 'flower', title: 'Flower', year: 2019, type: 'Movie', genre: 'Documentary', description: 'A short, calm nature film used here as a rights-cleared player demo.', poster: '🌸', sources: [{ label: 'Demo stream', quality: '1080p · MP4', url: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4' }] },
  { id: 'big-buck-bunny', title: 'Big Buck Bunny', year: 2008, type: 'Movie', genre: 'Animation', description: 'An open movie from the Blender Foundation and a useful test title for the player.', poster: '🐰', sources: [{ label: 'Open movie source', quality: '1080p · MP4', url: 'https://storage.googleapis.com/coverr-main/mp4/Mt_Baker.mp4' }] },
  { id: 'tears-of-steel', title: 'Tears of Steel', year: 2012, type: 'Movie', genre: 'Sci-fi', description: 'A public Blender Foundation production for testing title details and playback controls.', poster: '🤖', sources: [{ label: 'Open movie source', quality: '720p · MP4', url: 'https://storage.googleapis.com/coverr-main/mp4/Footboys.mp4' }] },
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

  if (window.location.pathname === '/stream' || window.location.pathname.startsWith('/stream/')) {
    return <StreamPage />;
  }

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

function StreamPage() {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<'All' | 'Movie' | 'Series'>('All');
  const [selected, setSelected] = useState<StreamTitle | null>(null);
  const [source, setSource] = useState<StreamTitle['sources'][number] | null>(null);
  const visibleTitles = streamTitles.filter((item) => (filter === 'All' || item.type === filter) && `${item.title} ${item.genre}`.toLowerCase().includes(query.toLowerCase()));

  return (
    <main className="stream-page">
      <header className="stream-header"><a className="brand" href="/"><span>✦</span> lucky's<br /><b>web crypt</b></a><span className="stream-label">[ stream lab ]</span><a className="stream-back" href="/"><ArrowLeft size={14} /> home</a></header>
      <section className="stream-shell">
        <div className="stream-intro"><div><span className="section-label">A SMALL CATALOG PROTOTYPE</span><h1>watch<br /><em>something.</em></h1><p>One calm place for your library, sources, and playback. This prototype uses sample titles while the Nuvio adapter is being connected.</p></div><div className="stream-status"><i /> adapter ready<br /><small>mock catalog · v0.1</small></div></div>
        <div className="stream-toolbar"><label className="stream-search"><Search size={15} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="search the catalog" aria-label="Search catalog" /></label><div className="stream-filters">{(['All', 'Movie', 'Series'] as const).map((item) => <button className={filter === item ? 'active' : ''} onClick={() => setFilter(item)} key={item}>{item}</button>)}</div></div>
        <div className="stream-grid">{visibleTitles.map((item) => <button className="stream-card" key={item.id} onClick={() => setSelected(item)}><div className="stream-poster"><span>{item.poster}</span><small>{item.type}</small></div><div className="stream-card-copy"><b>{item.title}</b><span>{item.year} · {item.genre}</span></div></button>)}</div>
        {visibleTitles.length === 0 && <div className="stream-empty">No titles match “{query}”.</div>}
        <div className="stream-footnote"><ShieldCheck size={14} /> Prototype sources are rights-cleared demos. Real Nuvio/plugin sources should be returned by the Oracle adapter before production playback is enabled.</div>
      </section>
      {selected && <div className="stream-modal-backdrop" role="presentation" onClick={() => setSelected(null)}><section className="stream-detail" role="dialog" aria-modal="true" aria-label={selected.title} onClick={(event) => event.stopPropagation()}><button className="guide-close" onClick={() => setSelected(null)} aria-label="Close title"><X size={16} /></button><div className="stream-detail-poster">{selected.poster}</div><span className="section-label">{selected.type} · {selected.year}</span><h2>{selected.title}</h2><p>{selected.description}</p><div className="stream-sources"><span className="guide-subhead"><Play size={14} /> available sources</span>{selected.sources.map((item) => <button className="stream-source" key={item.url} onClick={() => setSource(item)}><span><b>{item.label}</b><small>{item.quality}</small></span><Play size={14} /></button>)}</div>{source && <div className="stream-player"><video controls autoPlay src={source.url}>Your browser does not support video playback.</video><div><b>{selected.title}</b><span>{source.quality}</span></div></div>}</section></div>}
    </main>
  );
}

function GuideReader({ guide, onClose }: { guide: Guide; onClose: () => void }) {
  return (
    <article className="guide-reader">
      <div className="guide-heading">
        <div><span className="section-label">A PRACTICAL WALKTHROUGH</span><h2>{guide.title}</h2><p className="guide-dek">{guide.summary}</p><div className="guide-byline"><span>By Lucky Patel</span><span>·</span><span>{guide.eyebrow.replace('STREAMING SETUP · ', '')}</span></div></div>
        <button className="guide-close" onClick={onClose} aria-label="Close guide"><X size={16} /></button>
      </div>
      <div className="guide-summary">
        <div><b>You'll need</b><span>Stremio · a Windows PC or Android device · an internet connection</span></div>
        <div><b>In this guide</b><span>Install the app, add the service, sync your account, and test the setup</span></div>
      </div>
      <div className="guide-layout">
        <div className="guide-main">
          <p className="guide-lead">This guide walks through the complete setup from a clean Stremio install to your first successful playback. Follow the steps in order, and use the same account on every device so your add-ons and preferences stay in sync.</p>
          <div className="guide-subhead"><ListChecks size={15} /> installation steps</div>
          <div className="guide-steps">{guide.steps.map((step, index) => <section className="guide-step" key={step.title}><span className="guide-step-number">{String(index + 1).padStart(2, '0')}</span><div><h3>{step.title.replace(/^\d+\.\s*/, '')}</h3><p>{step.body}</p></div></section>)}</div>
          <div className="guide-note"><ShieldCheck size={15} /><span>Use official downloads and only access content you are authorized to watch. That is all you need to keep in mind while following the steps.</span></div>
        </div>
        <aside className="guide-aside">
          <div className="guide-card"><div className="guide-subhead"><ExternalLink size={15} /> official links</div><div className="guide-links">{guide.links.map((link) => <a className="guide-resource" key={link.href} href={link.href} target="_blank" rel="noreferrer"><span><b>{link.label}</b><small>{link.detail}</small></span><ExternalLink size={13} /></a>)}</div></div>
          <div className="guide-card"><div className="guide-subhead"><Check size={15} /> final checklist</div><ul>{guide.checklist.map((item) => <li key={item}>{item}</li>)}</ul></div>
          <div className="guide-card"><div className="guide-subhead"><Smartphone size={15} /> if something goes wrong</div>{guide.troubleshooting.map((item) => <details key={item.title}><summary>{item.title}</summary><p>{item.body}</p></details>)}</div>
          <a className="guide-link" href="https://www.stremio.com/" target="_blank" rel="noreferrer"><ExternalLink size={13} /> official Stremio site</a>
        </aside>
      </div>
    </article>
  );
}

export default App;
