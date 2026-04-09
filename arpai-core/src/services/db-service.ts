import { supabase } from '../config/clients';

export const insertLog = async (
  event: string,
  payload: Record<string, unknown>,
  leadId?: string
): Promise<void> => {
  const { error } = await supabase.from('logs').insert({
    event,
    payload,
    lead_id: leadId ?? payload.leadId ?? null
  });

  if (error) {
    console.warn('Failed to write log:', error.message);
  }
};
