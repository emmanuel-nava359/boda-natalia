'use client';
import {useState,type FormEvent} from 'react';
import {Send,Info,CheckCircle2} from 'lucide-react';
export default function RSVPForm({connected}:{connected:boolean}){
 const [name,setName]=useState('');const [attending,setAttending]=useState('yes');const [guests,setGuests]=useState('0');const [message,setMessage]=useState('');const [busy,setBusy]=useState(false);const [feedback,setFeedback]=useState('');const [success,setSuccess]=useState(false);
 async function submit(e:FormEvent<HTMLFormElement>){e.preventDefault();setFeedback('');setBusy(true);const form=e.currentTarget;
  try{const res=await fetch('/api/rsvp',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({name,attendance:attending==='yes',guests:attending==='yes'?Number(guests):0,message,website:(form.elements.namedItem('website') as HTMLInputElement)?.value||''})});const data=await res.json();if(!res.ok)throw new Error(data.error||'No fue posible enviar tu respuesta.');setSuccess(true);setFeedback('Gracias, registramos tu respuesta.');setName('');setMessage('');setGuests('0');}catch(error){setFeedback(error instanceof Error?error.message:'Ocurrió un error.');}finally{setBusy(false);}
 }
 return <div className="rsvp-shell"><div className="rsvp-intro"><span className="small-snowflake">✳</span><h2>¿Nos acompañas?</h2><p>Completa este formulario para confirmar tu asistencia. También puedes dejarnos un mensaje bonito.</p></div>
 {!connected&&<div className="setup-notice" role="status"><Info size={19}/><span><strong>Vista previa:</strong> el formulario está preparado, pero aún no recibe respuestas. Lo activaremos cuando conectemos la nueva base de datos de Supabase.</span></div>}
 <form onSubmit={submit} className="wedding-form"><label>Nombre y apellido<input value={name} onChange={e=>setName(e.target.value)} maxLength={120} minLength={2} required disabled={!connected} placeholder="Tu nombre completo"/></label>
 <fieldset disabled={!connected}><legend>¿Podrás acompañarnos?</legend><label className="radio-label"><input type="radio" name="attending" value="yes" checked={attending==='yes'} onChange={()=>setAttending('yes')}/> Sí, ¡ahí estaré!</label><label className="radio-label"><input type="radio" name="attending" value="no" checked={attending==='no'} onChange={()=>setAttending('no')}/> Lo siento, no podré asistir</label></fieldset>
 {attending==='yes'&&<label>¿Cuántos acompañantes llevarás? <span className="field-hint">(sin contarte a ti)</span><select value={guests} onChange={e=>setGuests(e.target.value)} disabled={!connected}>{Array.from({length:11},(_,i)=><option key={i} value={i}>{i}</option>)}</select></label>}
 <label>Un mensaje para los novios <span className="field-hint">(opcional)</span><textarea rows={4} maxLength={600} value={message} onChange={e=>setMessage(e.target.value)} disabled={!connected} placeholder="Escribe tus buenos deseos..."/></label>
 <label className="honeypot" aria-hidden="true">Sitio web<input type="text" name="website" tabIndex={-1} autoComplete="off"/></label>
 <button className="button button-dark form-button" type="submit" disabled={!connected||busy}>{busy?'Enviando...':'Enviar confirmación'} <Send size={16}/></button>
 {feedback&&<p className={`form-feedback ${success?'form-success':''}`} role="status">{success&&<CheckCircle2 size={18}/>} {feedback}</p>}
 </form></div>;
}
