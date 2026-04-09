import { supabase } from '../config/clients';
import { AppError } from '../utils/errors';
import { insertLog } from './db-service';

interface LeadInput {
  name: string;
  email: string;
  phone: string;
  vehicle: string;
  source: string;
}

const normalizePhone = (phone: string): string => phone.replace(/[^\d+]/g, '');

export const normalizeLead = (input: LeadInput): LeadInput => ({
  name: input.name.trim(),
  email: input.email.trim().toLowerCase(),
  phone: normalizePhone(input.phone),
  vehicle: input.vehicle.trim(),
  source: input.source.trim().toLowerCase()
});

export const findDuplicateLead = async (lead: LeadInput): Promise<Record<string, unknown> | null> => {
  const { data, error } = await supabase
    .from('leads')
    .select('*')
    .or(`email.eq.${lead.email},phone.eq.${lead.phone}`)
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) {
    throw new AppError(`Failed to check duplicates: ${error.message}`);
  }

  return data;
};

export const saveLead = async (lead: LeadInput): Promise<{ lead: Record<string, unknown>; duplicate: boolean }> => {
  const duplicateLead = await findDuplicateLead(lead);
  if (duplicateLead) {
    await insertLog('lead_duplicate_skipped', { leadId: duplicateLead.id, email: lead.email, phone: lead.phone }, String(duplicateLead.id));
    return { lead: duplicateLead, duplicate: true };
  }

  const { data, error } = await supabase.from('leads').insert(lead).select().single();
  if (error) throw new AppError(`Failed to save lead: ${error.message}`);

  await insertLog('lead_intake', { leadId: data.id }, String(data.id));
  return { lead: data, duplicate: false };
};

export const updateLeadClassification = async (
  leadId: string,
  classification: { intent: string; urgency: string; buyer_stage: string }
): Promise<void> => {
  const { error } = await supabase
    .from('leads')
    .update({
      intent: classification.intent,
      urgency: classification.urgency,
      stage: classification.buyer_stage
    })
    .eq('id', leadId);

  if (error) throw new AppError(`Failed to update lead classification: ${error.message}`);
};

export const assignRep = async (leadId: string, rep: string): Promise<void> => {
  const { error } = await supabase.from('leads').update({ assigned_rep: rep }).eq('id', leadId);
  if (error) throw new AppError(`Failed to assign rep: ${error.message}`);
};

export const updateLastContactDate = async (leadId: string, isoDate: string): Promise<void> => {
  const { error } = await supabase.from('leads').update({ last_contact_date: isoDate }).eq('id', leadId);
  if (error) throw new AppError(`Failed to update last contact date: ${error.message}`);
};
