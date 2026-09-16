type NavLink = { label: string; href: string };

const links: NavLink[] = [
  { label: 'Portfolio', href: '#' },
  { label: 'GitHub', href: '#' },
  { label: 'LinkedIn', href: '#' },
  { label: 'Resume', href: '#' },
];

export default function NavButtons() {
  return (
    <nav className="nav-buttons" aria-label="Primary">
      {links.map((link) => (
        <a key={link.label} href={link.href} className="nav-button">
          {link.label}
        </a>
      ))}
    </nav>
  );
}
