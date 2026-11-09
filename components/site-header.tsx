'use client';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {useState} from 'react';
import {Menu, X} from 'lucide-react';
const links = [
 {href:'/',label:'Inicio'},
 {href:'/nuestra-historia',label:'Nuestra historia'},
 {href:'/el-evento',label:'El evento'},
 {href:'/confirmacion',label:'Confirmación'},
 {href:'/recuerdos',label:'Recuerdos'},
];
export default function SiteHeader(){
 const path=usePathname();const [open,setOpen]=useState(false);
 return <header className="header">
  <div className="header-inner">
   <Link href="/" className="brand" onClick={()=>setOpen(false)} aria-label="Ir a Inicio">N <span>&</span> E <small>13 · 02 · 27</small></Link>
   <button className="menu-toggle" type="button" aria-expanded={open} aria-label={open?'Cerrar menú':'Abrir menú'} onClick={()=>setOpen(!open)}>{open?<X size={23}/>:<Menu size={23}/>}</button>
   <nav className={`site-links ${open?'site-links-open':''}`} aria-label="Navegación principal">{links.map(link=><Link key={link.href} href={link.href} aria-current={path===link.href?'page':undefined} onClick={()=>setOpen(false)}>{link.label}</Link>)}</nav>
  </div>
 </header>;
}
