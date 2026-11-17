import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Check, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { event, remainingTime } from '@/lib/event';

export function TicketButton({ large = false }: { large?: boolean }) {
  return <Button variant="ticket" size={large ? 'hero' : 'default'} asChild><a href={event.ticketUrl} target="_blank" rel="noopener noreferrer">Get Tickets <ArrowUpRight /></a></Button>;
}
export function Reveal({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  return <motion.div className={className} initial={reduce ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.65 }}>{children}</motion.div>;
}
export function Ribbon() {
  return <div className="ribbon-art" aria-hidden="true"><svg viewBox="0 0 1000 800" fill="none"><defs><linearGradient id="ribbon-face" x1="380" y1="0" x2="850" y2="800" gradientUnits="userSpaceOnUse"><stop stopColor="var(--ribbon-light)"/><stop offset=".35" stopColor="var(--primary)"/><stop offset=".72" stopColor="var(--ribbon-shadow)"/><stop offset="1" stopColor="var(--primary)"/></linearGradient><linearGradient id="ribbon-fold" x1="500" y1="170" x2="610" y2="420" gradientUnits="userSpaceOnUse"><stop stopColor="var(--ribbon-shadow)"/><stop offset="1" stopColor="var(--primary)"/></linearGradient></defs><path d="M570 -100 C490 40 340 160 466 280 C530 340 759 268 849 335 C1000 450 739 663 517 793 L594 876 C921 673 1141 431 930 268 C802 169 562 264 518 207 C470 142 619 40 667 -100 Z" fill="url(#ribbon-face)"/><path d="M466 280 C530 340 759 268 849 335 L930 268 C802 169 562 264 518 207 Z" fill="url(#ribbon-fold)"/><path d="M594 876 C457 775 283 705 238 752 C204 790 315 869 435 897 L383 961 C156 886 101 757 193 690 C282 624 464 711 594 876 Z" fill="url(#ribbon-face)"/></svg></div>;
}
export function FlipCalendar() {
  return <div className="calendar-object" aria-label="12 December 2026"><span className="calendar-binding binding-left"/><span className="calendar-binding binding-right"/><div className="calendar-top">SATURDAY</div><div className="calendar-number">12<span className="calendar-fold"/></div><div className="calendar-bottom">DECEMBER <span>2026</span></div><div className="calendar-foot"/></div>;
}
export function Countdown({ early = false }: { early?: boolean }) {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => { setNow(Date.now()); const id = setInterval(() => setNow(Date.now()), 1000); return () => clearInterval(id); }, []);
  const values = now === null ? [null, null, null, null] : remainingTime(now, early ? event.earlyBirdEnd : event.eventBoundary);
  return <div className={`countdown ${early ? 'countdown-small' : ''}`} aria-label={early ? 'Time until Early Bird closes' : 'Countdown to the event date'}>{values.map((value, i) => <div className="countdown-unit" key={i}><div className="countdown-digit"><span key={value}>{value === null ? '—' : String(value).padStart(2, '0')}</span></div><span className="countdown-label">{['Days', 'Hours', 'Minutes', 'Seconds'][i]}</span></div>)}</div>;
}
export function DemoSignup({ label = 'Stay in the loop.' }: { label?: string }) {
  const [submitted, setSubmitted] = useState(false);
  return <div className="signup-block"><div><span className="eyebrow">THE NEXT CHAPTER</span><h2>{label}</h2><p>Speaker reveals. Event updates. Ideas worth opening.</p></div><form onSubmit={e => { e.preventDefault(); setSubmitted(true); }}><label className="sr-only" htmlFor="signup-email">Email address</label><div className="signup-field"><Mail size={20}/><input id="signup-email" type="email" required placeholder="Your email address" aria-label="Your email address"/><Button variant="ticket" size="icon" aria-label="Sign up">{submitted ? <Check/> : <ArrowUpRight/>}</Button></div><p className="form-note" role="status">{submitted ? 'Demo preview — your email has not been saved.' : 'Demo sign-up · announcements are not connected yet.'}</p></form></div>;
}
export function SpeakerCards({ count = 8 }: { count?: number }) {
  return <div className="speaker-grid">{Array.from({ length: count }, (_, i) => <Reveal key={i}><div className="speaker-card"><span className="speaker-index">{String(i + 1).padStart(2, '0')}</span><div className="speaker-silhouette" aria-hidden="true"><div/><span/></div><div className="speaker-caption"><span className="small-label">A NEW PERSPECTIVE</span><h3>To be announced</h3><ArrowUpRight size={20}/></div></div></Reveal>)}</div>;
}