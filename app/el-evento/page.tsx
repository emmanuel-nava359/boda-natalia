import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Clock3, Gift, MapPin, Shirt, Info, Church } from 'lucide-react';
import PageHeading from '@/components/page-heading';
import { wedding } from '@/lib/wedding';
export const metadata: Metadata = { title: 'El evento' };

export default function Event() {
  return <>
    <div className="inner-banner"><PageHeading eyebrow="GUARDA LA FECHA" title="El evento" subtitle="Un día especial se vuelve inolvidable cuando lo compartimos con quienes queremos." /></div>
    <section className="page-container event-overview">
      <div className="event-date-tile"><p>SÁBADO</p><strong>{wedding.day}</strong><span>{wedding.month}</span><b>{wedding.year}</b></div>
      <div className="event-main">
        <p className="eyebrow">CELEBREMOS JUNTOS</p>
        <h2>{wedding.venueName}</h2>
        <div className="event-detail-row"><MapPin /><p>{wedding.venueAddress}</p></div>
        <div className="event-detail-row"><Clock3 /><p><strong>Recepción: {wedding.receptionTime}</strong> <span className="tentative">Horario tentativo · sujeto a confirmación</span></p></div>
        <a className="button button-dark" href={wedding.mapsUrl} target="_blank" rel="noopener noreferrer">Ver ubicación <ArrowRight size={17} /></a>
        <p className="hint">Se abrirá el enlace de ubicación en Google Maps.</p>
      </div>
    </section>
    <section className="event-details-band"><div className="page-container">
      <p className="eyebrow">DETALLES QUE IMPORTAN</p><h2 className="section-title">Todo lo que debes saber</h2>
      <div className="practical-cards">
        <article><div className="card-icon"><Church /></div><h3>Ceremonia</h3><p>Lugar y horario pendientes de confirmación. Es posible que se celebre en el mismo recinto.</p></article>
        <article><div className="card-icon"><Shirt /></div><h3>Código de vestimenta</h3><p>{wedding.dressCode}</p></article>
        <article><div className="card-icon"><Gift /></div><h3>Mesa de regalos</h3><p>Compartiremos cualquier información adicional más adelante. Tu compañía es lo más importante.</p></article>
      </div>
      <div className="event-note"><Info size={19} /><span>La recepción está prevista para las 4:30 p. m.; el horario definitivo y la ceremonia se anunciarán aquí cuando se confirmen.</span></div>
    </div></section>
    <div className="page-next"><Link href="/confirmacion" className="button button-dark">Confirmar asistencia <ArrowRight size={17} /></Link></div>
  </>;
}
