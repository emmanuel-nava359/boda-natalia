-- Ejecutar en SQL Editor de un proyecto NUEVO de Supabase, distinto del MVP.
-- Este esquema conserva confirmaciones y fotografías privadas.
create table if not exists public.wedding_rsvps (
 id uuid primary key default gen_random_uuid(),
 guest_name text not null check (char_length(guest_name) between 2 and 120),
 attending boolean not null,
 companions int not null default 0 check (companions between 0 and 10),
 message text not null default '',
 created_at timestamptz not null default now()
);
alter table public.wedding_rsvps enable row level security;

create table if not exists public.wedding_guest_photos (
 id uuid primary key default gen_random_uuid(),
 author text not null check (char_length(author) between 2 and 100),
 object_path text not null unique,
 approved boolean not null default false,
 created_at timestamptz not null default now()
);
alter table public.wedding_guest_photos enable row level security;

insert into storage.buckets (id,name,public,file_size_limit,allowed_mime_types)
values ('wedding-guest-photos','wedding-guest-photos',false,8388608,ARRAY['image/jpeg','image/png','image/webp'])
on conflict(id) do nothing;
-- Sin políticas anónimas: todas las lecturas/escrituras se hacen por API del servidor.
-- La aprobación se puede hacer en Supabase Table Editor (approved = true).
-- Nota de producción: añadir protección antiabuso (Turnstile y límite por IP)
-- antes de abrir las subidas a una audiencia numerosa.
