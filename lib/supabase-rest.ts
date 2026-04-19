import { config, hasSupabase } from './config';

const restBase = `${config.supabaseUrl}/rest/v1`;

const headers = {
  apikey: config.supabaseServiceKey,
  Authorization: `Bearer ${config.supabaseServiceKey}`,
  'Content-Type': 'application/json',
  Prefer: 'return=representation'
};

export const isDbEnabled = () => hasSupabase;

export async function supabaseInsert<T>(table: string, payload: Record<string, unknown>) {
  if (!hasSupabase) {
    return null as T | null;
  }

  const response = await fetch(`${restBase}/${table}`, {
    method: 'POST',
    headers,
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    throw new Error(`Supabase insert failed: ${table} (${response.status})`);
  }

  const rows = (await response.json()) as T[];
  return rows[0] ?? null;
}

export async function supabasePatch(table: string, filter: string, payload: Record<string, unknown>) {
  if (!hasSupabase) {
    return;
  }

  const response = await fetch(`${restBase}/${table}?${filter}`, {
    method: 'PATCH',
    headers,
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    throw new Error(`Supabase patch failed: ${table} (${response.status})`);
  }
}

export async function supabaseSelect<T>(table: string, query: string) {
  if (!hasSupabase) {
    return [] as T[];
  }

  const response = await fetch(`${restBase}/${table}?${query}`, {
    method: 'GET',
    headers: {
      apikey: config.supabaseServiceKey,
      Authorization: `Bearer ${config.supabaseServiceKey}`
    }
  });

  if (!response.ok) {
    throw new Error(`Supabase select failed: ${table} (${response.status})`);
  }

  return (await response.json()) as T[];
}
