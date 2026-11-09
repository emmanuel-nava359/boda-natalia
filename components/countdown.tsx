'use client';
import {useEffect, useState} from 'react';
import {wedding} from '@/lib/wedding';
function count(){const d=Math.max(0,new Date(wedding.dateISO).getTime()-Date.now());return {days:Math.floor(d/86400000),hours:Math.floor(d/3600000)%24,minutes:Math.floor(d/60000)%60};}
export default function Countdown(){
 const [remaining,setRemaining]=useState<ReturnType<typeof count>|null>(null);
 useEffect(()=>{const update=()=>setRemaining(count());update();const id=setInterval(update,30000);return()=>clearInterval(id);},[]);
 return <div className="countdown" aria-label="Cuenta regresiva para la boda">
  {([['Días',remaining?.days],['Horas',remaining?.hours],['Minutos',remaining?.minutes]] as const).map(([label,value])=><div key={label}><strong>{value===undefined?'—':String(value).padStart(2,'0')}</strong><span>{label}</span></div>)}
 </div>;
}
