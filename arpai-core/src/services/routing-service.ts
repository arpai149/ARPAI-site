const DEFAULT_BDC_REP = process.env.DEFAULT_BDC_REP || 'BDC Team';
const DEFAULT_SALES_REP = process.env.DEFAULT_SALES_REP || 'Floor Sales';

export const routeLead = (
  intent: 'price' | 'availability' | 'trade' | 'credit' | 'appointment',
  aiContactSent: boolean,
  humanContactSent: boolean
): { assigned_rep: string; conflict_prevented: boolean } => {
  if (aiContactSent && humanContactSent) {
    return { assigned_rep: 'none', conflict_prevented: true };
  }

  const bdcIntents = new Set(['price', 'availability', 'appointment']);
  const assigned_rep = bdcIntents.has(intent) ? DEFAULT_BDC_REP : DEFAULT_SALES_REP;

  return { assigned_rep, conflict_prevented: false };
};
