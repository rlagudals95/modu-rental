export type PaywallPlan = {
  id: string;
  title: string;
  priceText: string;
  period: 'monthly' | 'yearly' | 'lifetime';
  trialDays?: number;
};

export type Entitlement = {
  isPro: boolean;
  expiresAt?: string;
};
