import Link from 'next/link';
import {wedding} from '@/lib/wedding';
export default function SiteFooter(){return <footer className="footer">
  <span className="footer-star" aria-hidden="true">✳</span>
  <p className="footer-script">Natalia & Emmanuel</p>
  <p>{wedding.dateLabel} · Chiautla, México</p>
  <Link href="/recuerdos">Un espacio para nuestros recuerdos</Link>
 </footer>}
