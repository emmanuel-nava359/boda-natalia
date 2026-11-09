import type {Metadata} from 'next';
import Link from 'next/link';
import {ArrowRight,Heart} from 'lucide-react';
import PageHeading from '@/components/page-heading';
import PhotoCarousel from '@/components/photo-carousel';
import {getCouplePhotos} from '@/lib/photographs';
import {wedding} from '@/lib/wedding';
export const metadata:Metadata={title:'Nuestra historia'};
export default function History(){const photos=getCouplePhotos();return <>
 <div className="inner-banner"><PageHeading eyebrow="DOS CAMINOS, UN DESTINO" title="Nuestra historia" subtitle="Hay encuentros que cambian para siempre nuestra manera de mirar el mundo."/></div>
 <section className="page-container story-layout"><div className="story-photo"><PhotoCarousel photos={photos} variant="compact"/></div><div className="story-text"><span className="small-snowflake">✳</span><p className="eyebrow">UN AMOR QUE SIGUE CRECIENDO</p><h2>Lo mejor de esta historia es <em>seguir escribiéndola juntos.</em></h2><p>{wedding.story}</p><p>Y ahora queremos compartir con ustedes uno de los capítulos más importantes de nuestras vidas.</p><div className="calligraphy-signature">Natalia & Emmanuel</div></div></section>
 <section className="parents-band"><div className="page-container"><p className="eyebrow">CON EL AMOR DE NUESTRAS FAMILIAS</p><h2>La bendición de nuestros padres</h2><div className="parents-cards"><div><span>PADRES DE LA NOVIA</span><p>{wedding.parentsBride[0]}</p><p>{wedding.parentsBride[1]}</p></div><div className="parents-divider" aria-hidden="true"><Heart size={27} strokeWidth={1}/></div><div><span>PADRES DEL NOVIO</span><p>{wedding.parentsGroom[0]}</p><p>{wedding.parentsGroom[1]}</p></div></div><Link href="/el-evento" className="text-action">Conoce el lugar de nuestra boda <ArrowRight size={17}/></Link></div></section>
 </>}
