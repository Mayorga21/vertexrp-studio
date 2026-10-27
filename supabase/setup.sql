-- Ejecuta este script en Supabase: SQL Editor > New query > Run.
-- Crea la tabla de solicitudes. El público solo puede INSERTAR; no puede leer las solicitudes de otros.

create table if not exists public.solicitudes (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  producto    text not null check (producto in ('Mochila táctica urbana', 'Vehículo urbano original')),
  precio      text not null check (char_length(precio) <= 20),
  servidor    text not null check (char_length(servidor) between 1 and 100),
  discord     text not null check (char_length(discord) between 1 and 100),
  estilo      text check (char_length(estilo) <= 1500),
  estado      text not null default 'recibida'
              check (estado in ('recibida', 'modelado', 'texturizado', 'prueba', 'entregada', 'soporte'))
);

alter table public.solicitudes enable row level security;

grant insert on public.solicitudes to anon;

create policy "El publico puede enviar solicitudes"
  on public.solicitudes
  for insert
  to anon
  with check (estado = 'recibida');

-- No hay politica de SELECT para anon: las solicitudes solo las ves tu en el Table Editor del panel de Supabase.
