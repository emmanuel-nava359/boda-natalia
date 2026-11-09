import { NextResponse } from 'next/server';
import { randomUUID } from 'node:crypto';
import { getSupabaseAdmin } from '@/lib/supabase-admin';

export const runtime='nodejs';
const BUCKET='wedding-guest-photos';
const ACCEPT=new Set(['image/jpeg','image/png','image/webp']);
const json=(data:object,status=200)=>NextResponse.json(data,{status});

export async function GET(){
 const db=getSupabaseAdmin();
 if(!db) return json({items:[]});
 const {data,error}=await db.from('wedding_guest_photos').select('id,object_path,author,created_at').eq('approved',true).order('created_at',{ascending:false}).limit(36);
 if(error) return json({items:[]});
 const items=await Promise.all((data??[]).map(async item=>{
  const {data:signed}=await db.storage.from(BUCKET).createSignedUrl(item.object_path,60*30);
  return {id:item.id,author:item.author,url:signed?.signedUrl??'',created_at:item.created_at};
 }));
 return json({items:items.filter(x=>x.url)});
}

export async function POST(request:Request){
 const db=getSupabaseAdmin();
 if(!db) return json({error:'La galería estará disponible cuando configuremos el almacenamiento.'},503);
 const requiredCode=process.env.PHOTO_UPLOAD_ACCESS_CODE;
 if(!requiredCode) return json({error:'Las subidas aún no están habilitadas.'},503);
 let form:FormData;
 try{form=await request.formData();}catch{return json({error:'Formulario inválido.'},400);}
 const code=String(form.get('code')??'');
 if(code!==requiredCode) return json({error:'El código de acceso no es correcto.'},403);
 const author=String(form.get('author')??'').trim().slice(0,100);
 const file=form.get('photo');
 if(author.length<2||!(file instanceof File)) return json({error:'Escribe tu nombre y selecciona una fotografía.'},400);
 if(file.size>8*1024*1024 || !ACCEPT.has(file.type)) return json({error:'Solo JPG, PNG o WEBP de hasta 8 MB.'},400);
 const bytes=new Uint8Array(await file.arrayBuffer());
 const jpg=bytes[0]===0xff&&bytes[1]===0xd8&&bytes[2]===0xff;
 const png=bytes[0]===0x89&&bytes[1]===0x50&&bytes[2]===0x4e&&bytes[3]===0x47;
 const webp=String.fromCharCode(...bytes.subarray(0,4))==='RIFF'&&String.fromCharCode(...bytes.subarray(8,12))==='WEBP';
 if(!(jpg||png||webp)) return json({error:'El archivo no parece una fotografía válida.'},400);
 const ext=jpg?'jpg':png?'png':'webp';
 const path=`pending/${randomUUID()}.${ext}`;
 const {error:uploadError}=await db.storage.from(BUCKET).upload(path,bytes,{contentType:jpg?'image/jpeg':png?'image/png':'image/webp',upsert:false});
 if(uploadError) return json({error:'No pudimos cargar esa fotografía.'},500);
 const {error:insertError}=await db.from('wedding_guest_photos').insert({author,object_path:path,approved:false});
 if(insertError){ await db.storage.from(BUCKET).remove([path]);return json({error:'No pudimos registrar la fotografía.'},500);}
 return json({ok:true,message:'Foto recibida. Aparecerá en la galería después de su revisión.'});
}
