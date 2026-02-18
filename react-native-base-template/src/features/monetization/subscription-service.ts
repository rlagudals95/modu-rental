import type { Entitlement, PaywallPlan } from './types';

/**
 * Replace with RevenueCat / StoreKit bridge implementation.
 */
export async function getPaywallPlans(): Promise<PaywallPlan[]> {
  return [
    { id: 'pro_monthly', title: 'Pro Monthly', priceText: '$4.99', period: 'monthly', trialDays: 7 },
    { id: 'pro_yearly', title: 'Pro Yearly', priceText: '$39.99', period: 'yearly', trialDays: 7 },
  ];
}

export async function getEntitlement(): Promise<Entitlement> {
  return { isPro: false };
}

export async function purchasePlan(_planId: string): Promise<Entitlement> {
  // TODO: connect to purchase SDK
  return { isPro: true };
}
