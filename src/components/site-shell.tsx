import { Link, useRouterState } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Menu, Moon, Sun, X, Instagram, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { event, navigation, ticketPrice } from '@/lib/event';
import { TicketButton } from './event-motion';

export function Wordmark() {
  return <span className="wordmark"><span>TED<sup>x</sup></span>FUTMinna</span>;
}
export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = useRouterState({ select: state => state.location.pathname });
  const [menu, setMenu] = useState(false);
  const [dark, setDark] = useState(false);
  const [reduce, setReduce] = useState(false);
  const [intro, setIntro] = useState(false);
  const [price, setPrice] = useState(event.earlyPrice);
  const systemReduce = useReducedMotion();
  useEffect(() => {
    setDark(localStorage.getItem('event-theme') === 'dark');
    setReduce(localStorage.getItem('event-reduce-motion') === 'true');
    if (!sessionStorage.getItem('event-intro') && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIntro(true); sessionStorage.setItem('event-intro', 'seen');
      const timeout = setTimeout(() => setIntro(false), 1300);
      return () => clearTimeout(timeout);
    }
  }, []);
  useEffect(() => { document.documentElement.classList.toggle('dark', dark); localStorage.setItem('event-theme', dark ? 'dark' : 'light'); }, [dark]);
  useEffect(() => { document.documentElement.classList.toggle('reduce-motion', reduce); localStorage.setItem('event-reduce-motion', String(reduce)); }, [reduce]);
  useEffect(() => { setMenu(false); }, [pathname]);
  useEffect(() => { setPrice(ticketPrice(Date.now())); const id = setInterval(() => setPrice(ticketPrice(Date.now())), 60000); return () => clearInterval(id); }, []);
  return <>
    <AnimatePresence>{intro && !reduce && !systemReduce && <motion.div className="intro-screen" exit={{ opacity: 0 }} transition={{ duration: .3 }}><motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}><Wordmark/></motion.div></motion.div>}</AnimatePresence>
    <header className="site-header"><div className="header-inner"><Link to="/" aria-label="TEDxFUTMinna 2026 home"><Wordmark/></Link><nav aria-label="Main navigation" className="desktop-nav">{navigation.map(item => <Link key={item.to} to={item.to} activeProps={{ className: 'nav-active' }} activeOptions={{ exact: true }}>{item.label}</Link>)}</nav><div className="header-actions"><Button variant="ghost" size="icon" aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'} title={dark ? 'Light mode' : 'Dark mode'} onClick={() => setDark(!dark)}>{dark ? <Sun/> : <Moon/>}</Button><TicketButton/><Button className="mobile-menu-toggle" variant="ghost" size="icon" aria-label={menu ? 'Close navigation' : 'Open navigation'} onClick={() => setMenu(!menu)}>{menu ? <X/> : <Menu/>}</Button></div></div>{menu && <nav className="mobile-nav" aria-label="Mobile navigation">{navigation.map(item => <Link key={item.to} to={item.to} activeProps={{ className: 'nav-active' }} activeOptions={{ exact: true }}>{item.label}<ArrowUpRight size={16}/></Link>)}</nav>}</header>
    <div className="early-strip"><span className="status-dot"/><span>{price === event.earlyPrice ? <>Early Bird <strong>₦5,000</strong><span className="strip-detail"> until 2 December</span></> : <>Regular <strong>₦7,500</strong></span><span className="strip-divider"/><span className="strip-detail">100 seats. Make one yours.</span><a href={event.ticketUrl} target="_blank" rel="noopener noreferrer">Book your seat <ArrowUpRight size={14}/></a></div>
    <AnimatePresence mode="wait" initial={false}><motion.main key={pathname} initial={reduce || systemReduce ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={reduce || systemReduce ? {} : { opacity: 0 }} transition={{ duration: .22 }}>{children}</motion.main></AnimatePresence>
    <footer className="site-footer"><div className="footer-top"><div><Link to="/" aria-label="TEDxFUTMinna 2026 home"><Wordmark/></Link><p>Local voices.<br/>Ideas with a world of possibility.</p></div><div className="footer-links">{navigation.filter(item => item.to !== '/').map(item => <Link key={item.to} to={item.to}>{item.label}</Link>)}</div><div className="footer-social"><span className="small-label">JOIN THE CONVERSATION</span><span>@TEDxFUTMinna</span><div><a href="https://www.instagram.com/tedxfutminna/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><Instagram size={20}/></a><a href="https://www.linkedin.com/company/tedxfutminna/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><Linkedin size={20}/></a><a href="https://x.com/TEDxFUTMinna" target="_blank" rel="noopener noreferrer" aria-label="X">𝕏</a></div></div></div><div className="footer-bottom"><p>This independent TEDx event is operated under license from TED.</p><div><a href="https://www.ted.com/tedx" target="_blank" rel="noopener noreferrer">About the TEDx program <ArrowUpRight size={12}/></a><Link to="/code-of-conduct">Code of conduct</Link><Button variant="ghost" size="sm" aria-pressed={reduce} onClick={() => setReduce(!reduce)}>{reduce ? 'Motion off' : 'Reduce motion'}</Button><span>© 2026 TEDxFUTMinna</span></div></div></footer>
  </>;
}