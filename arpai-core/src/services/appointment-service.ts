import { supabase } from '../config/clients';
import { insertLog } from './db-service';

export const setAppointment = async (payload: {
  lead_id: string;
  date: string;
  time: string;
  rep: string;
}): Promise<Record<string, unknown>> => {
  const { data, error } = await supabase.from('appointments').insert(payload).select().single();
  if (error) throw new Error(`Failed to set appointment: ${error.message}`);

  await insertLog('appointment_set', { leadId: payload.lead_id, appointmentId: data.id }, payload.lead_id);
  return data;
};
