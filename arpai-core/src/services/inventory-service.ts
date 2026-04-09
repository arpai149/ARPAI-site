import { InventoryAnalysisResult } from '../types/domain';

export const analyzeInventory = (msrp: number, price: number, daysInStock: number): InventoryAnalysisResult => {
  const discountPct = ((msrp - price) / msrp) * 100;
  const market_rank = Number(Math.max(1, Math.min(100, 50 + discountPct * 4 - daysInStock * 0.3)).toFixed(2));

  const pricing_position = price <= msrp * 0.96 ? 'strong' : 'weak';
  const urgency: InventoryAnalysisResult['urgency'] = daysInStock > 75 ? 'high' : daysInStock > 40 ? 'medium' : 'low';

  let recommended_action: InventoryAnalysisResult['recommended_action'] = 'hold';
  if (urgency === 'high' && pricing_position === 'weak') {
    recommended_action = 'drop';
  } else if (urgency !== 'low' && pricing_position === 'strong') {
    recommended_action = 'push';
  }

  return { market_rank, pricing_position, urgency, recommended_action };
};
