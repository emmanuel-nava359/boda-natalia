import Link from 'next/link';
import { ArrowRight, MapPin, Heart } from 'lucide-react';
import Countdown from '@/components/countdown';
import PhotoCarousel from '@/components/photo-carousel';
import Ornament from '@/components/ornament';
import { getCouplePhotos } from '@/lib/photographs';
import { wedding } from '@/lib/wedding';

export default function Home() {
  const photos = getCouplePhotos();
  return (
    <>
      <section className="home-hero">
        <div className="hero-copy">
          <p className="eyebrow">TENEMOS ALGO HERMOSO QUE CELEBRAR</p>
          <p className="hero-kicker">Con mucha ilusión anunciamos</p>
          <h1 className="hero-names"><span>{wedding.brideFirstName}</span><b>&</b><span>{wedding.groomFirstName}</span></h1>
          <Ornament />
          <p className="hero-subtitle">Nuestra boda</p>
          <p className="hero-date">13 <span>·</span> 02 <span>·</span> 2027</p>
          <p className="hero-place"><MapPin size={15} /> Chiautla, Estado de México</p>
          <Link className="button button-dark" href="/nuestra-historia">Abrir nuestra invitación <ArrowRight size={17} /></Link>
          <span className="hero-bottom-caption">HECHO CON AMOR, PARA TI</span>
        </div>
        <div className="hero-portrait">
          <div className="photo-edge"><PhotoCarousel photos={photos} /></div>
          <span className="hero-photo-caption">UN AMOR PARA SIEMPRE <Heart size={12} fill="currentColor" /></span>
        </div>
      </section>
      <section className="countdown-panel">
        <p className="eyebrow eyebrow-light">CONTANDO LOS DÍAS</p>
        <h2>La magia está por comenzar</h2>
        <Countdown />
      </section>
      <section className="home-invite page-container">
        <div className="home-invite-ornament" aria-hidden="true">❦</div>
        <p className="eyebrow">UN DÍA PARA RECORDAR</p>
        <h2>Lo mejor de celebrar el amor<br />es <em>compartirlo contigo</em></h2>
        <p>Con mucha alegría te invitamos a acompañarnos en el inicio de nuestra nueva historia. Tu presencia hará que este día sea aún más especial.</p>
        <div className="home-actions">
          <Link className="button button-dark" href="/el-evento">Detalles del evento <ArrowRight size={16} /></Link>
          <Link className="button button-outline" href="/confirmacion">Confirmar asistencia</Link>
        </div>
      </section>
    </>
  );
}
