export type LeadIntent = 'price' | 'availability' | 'trade' | 'credit' | 'appointment';
export type LeadUrgency = 'high' | 'medium' | 'low';
export type BuyerStage = 'early' | 'mid' | 'late';

export interface ClassificationResult {
  intent: LeadIntent;
  urgency: LeadUrgency;
  buyer_stage: BuyerStage;
  confidence: number;
}

export interface InventoryAnalysisResult {
  market_rank: number;
  pricing_position: 'strong' | 'weak';
  urgency: 'low' | 'medium' | 'high';
  recommended_action: 'hold' | 'drop' | 'push';
}
