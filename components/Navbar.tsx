import Link from 'next/link';

const links = [
  { href: '/', label: 'Home' },
  { href: '/taskboard', label: 'Taskboard' },
  { href: '/deploy', label: 'Deploy' },
  { href: '/dashboard', label: 'Dashboard' }
];

export default function Navbar() {
  return (
    <header className="topbar">
      <div className="topbar-inner">
        <strong>ARPAI OS</strong>
        <nav>
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="nav-link">
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
