import { NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase-admin';

const json = (data:object, status=200) => NextResponse.json(data, {status});
export async function POST(request:Request) {
 const db = getSupabaseAdmin();
 if (!db) return json({error:'Las confirmaciones estarán disponibles cuando configuremos la base de datos.'},503);
 let body: Record<string, unknown>;
 try { body = await request.json(); } catch { return json({error:'Datos inválidos.'},400); }
 const name=String(body.name??'').trim().slice(0,120);
 const attendance=body.attendance;
 const guests=Number(body.guests);
 const message=String(body.message??'').trim().slice(0,600);
 const honeypot=String(body.website??'');
 if (honeypot) return json({ok:true});
 if (name.length<2 || ![true,false].includes(attendance as boolean) || !Number.isInteger(guests) || guests<0 || guests>10) return json({error:'Revisa tu nombre y el número de acompañantes.'},400);
 const {error}=await db.from('wedding_rsvps').insert({guest_name:name,attending:attendance,companions:attendance?guests:0,message});
 if (error) return json({error:'No se pudo registrar la confirmación. Inténtalo nuevamente.'},500);
 return json({ok:true});
}
