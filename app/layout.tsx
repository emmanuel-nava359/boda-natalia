import type {Metadata} from 'next';
import './globals.css';
import SiteHeader from '@/components/site-header';
import SiteFooter from '@/components/site-footer';
import {wedding} from '@/lib/wedding';
export const metadata:Metadata={
 title:{default:'Natalia & Emmanuel · Nuestra boda',template:'%s | Natalia & Emmanuel'},
 description:`Invitación para celebrar la boda de ${wedding.bride} y ${wedding.groom} el ${wedding.dateLabel} en Chiautla, México.`,
 robots:{index:false,follow:false},
};
export default function RootLayout({children}:{children:React.ReactNode}){
 return <html lang="es"><body><SiteHeader/><main id="contenido">{children}</main><SiteFooter/></body></html>;
}
