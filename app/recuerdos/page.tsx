import type {Metadata} from 'next';
import PageHeading from '@/components/page-heading';
import PhotoCarousel from '@/components/photo-carousel';
import GuestGallery from '@/components/guest-gallery';
import {getCouplePhotos} from '@/lib/photographs';
export const metadata:Metadata={title:'Recuerdos'};
export default function Memories(){const photos=getCouplePhotos();const connected=Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY && process.env.PHOTO_UPLOAD_ACCESS_CODE);return <>
 <div className="inner-banner"><PageHeading eyebrow="LOS MOMENTOS QUE ATESORAMOS" title="Nuestros recuerdos" subtitle="Porque los momentos más bonitos son los que vivimos juntos."/></div>
 <section className="page-container memories-intro"><div className="memories-head"><p className="eyebrow">NATALIA & EMMANUEL</p><h2>Un poquito de <em>nosotros</em></h2><p>Nuestras fotografías favoritas se mostrarán aquí, cambiando automáticamente con una transición suave.</p></div><div className="memories-showcase"><PhotoCarousel photos={photos} variant="compact"/></div></section>
 <GuestGallery connected={connected}/>
 </>}
