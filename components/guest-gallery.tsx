'use client';
import {useEffect,useState,type FormEvent} from 'react';
import {Camera,UploadCloud,Info,Heart} from 'lucide-react';
type PhotoItem={id:string;author:string;url:string;created_at:string};
export default function GuestGallery({connected}:{connected:boolean}){
 const [items,setItems]=useState<PhotoItem[]>([]);const [name,setName]=useState('');const [code,setCode]=useState('');const [file,setFile]=useState<File|null>(null);const [busy,setBusy]=useState(false);const [feedback,setFeedback]=useState('');
 useEffect(()=>{if(!connected)return;fetch('/api/photos').then(r=>r.ok?r.json():{items:[]}).then(r=>setItems(r.items??[])).catch(()=>setItems([]));},[connected]);
 async function submit(e:FormEvent<HTMLFormElement>){e.preventDefault();if(!file)return;setFeedback('');setBusy(true);const body=new FormData();body.set('author',name);body.set('code',code);body.set('photo',file);
  try{const res=await fetch('/api/photos',{method:'POST',body});const data=await res.json();if(!res.ok)throw new Error(data.error||'No se pudo subir la foto');setFeedback(data.message||'Fotografía recibida para revisión.');setFile(null);const el=document.getElementById('upload-photo') as HTMLInputElement|null;if(el)el.value='';}catch(error){setFeedback(error instanceof Error?error.message:'No se pudo subir la fotografía.');}finally{setBusy(false);}}
 return <section className="guest-gallery-band"><div className="page-container"><div className="guest-gallery-heading"><span className="small-snowflake">✳</span><p className="eyebrow">RECUERDOS COMPARTIDOS</p><h2>La boda a través de tus ojos</h2><p>Después de la celebración, podrás subir las fotografías que tomaste. ¡Nos encantará revivir esos momentos contigo!</p></div>
 <div className="guest-photo-grid">{items.length?items.map(item=><figure key={item.id}><img src={item.url} loading="lazy" alt={`Fotografía enviada por ${item.author}`}/><figcaption>Foto de {item.author}</figcaption></figure>):<div className="guest-photos-empty"><Camera size={32}/><p>Este álbum se llenará de recuerdos el día de la boda.</p><small>Las fotos enviadas se publicarán únicamente después de aprobarlas.</small></div>}</div>
 <div className="upload-panel"><div><h3>Comparte una fotografía <Heart size={19}/></h3><p>Podrás subir archivos JPG, PNG o WEBP de hasta 8 MB.</p></div>
 {!connected&&<div className="setup-notice"><Info size={19}/><span>Las subidas estarán disponibles cuando configuremos Supabase y el código privado para invitados.</span></div>}
 <form className="upload-grid" onSubmit={submit}><label>Tu nombre<input value={name} onChange={e=>setName(e.target.value)} disabled={!connected} required maxLength={100} minLength={2} placeholder="Tu nombre"/></label><label>Código de invitados<input value={code} onChange={e=>setCode(e.target.value)} disabled={!connected} required placeholder="Código compartido por los novios"/></label><label className="file-label">Fotografía<input id="upload-photo" type="file" accept="image/jpeg,image/png,image/webp" disabled={!connected} required onChange={e=>setFile(e.target.files?.[0]??null)}/></label><button className="button button-dark form-button" disabled={!connected||busy||!file} type="submit"><UploadCloud size={18}/>{busy?'Subiendo...':'Subir fotografía'}</button></form>
 {feedback&&<p role="status" className="form-feedback">{feedback}</p>}
 </div></div></section>;
}
