export const determineFollowupStage = (lastContactDate: string): 'day1' | 'day3' | 'day7' | 'reengage' => {
  const last = new Date(lastContactDate).getTime();
  const now = Date.now();
  const diffDays = Math.floor((now - last) / (1000 * 60 * 60 * 24));

  if (diffDays <= 1) return 'day1';
  if (diffDays <= 3) return 'day3';
  if (diffDays <= 7) return 'day7';
  return 'reengage';
};
