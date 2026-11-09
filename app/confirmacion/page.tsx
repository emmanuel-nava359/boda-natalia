import type {Metadata} from 'next';
import PageHeading from '@/components/page-heading';
import RSVPForm from '@/components/rsvp-form';
export const metadata:Metadata={title:'Confirmación'};
export default function Confirmation(){const connected=Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);return <>
 <div className="inner-banner"><PageHeading eyebrow="QUEREMOS COMPARTIRLO CONTIGO" title="Confirma tu asistencia" subtitle="Será una alegría saber si podemos contar contigo para este día."/></div>
 <section className="page-container form-wrapper"><RSVPForm connected={connected}/></section>
 </>}
