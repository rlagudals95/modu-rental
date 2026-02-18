import { Platform } from 'react-native';
import Purchases, { CustomerInfo, LOG_LEVEL, PurchasesOffering } from 'react-native-purchases';

import { env } from '@/src/config/env';

function getRevenueCatKey() {
  return Platform.OS === 'ios' ? env.rcAppleApiKey : env.rcGoogleApiKey;
}

export async function initRevenueCat(appUserId?: string) {
  const apiKey = getRevenueCatKey();
  if (!apiKey) throw new Error('RevenueCat API key is missing in .env');

  Purchases.setLogLevel(__DEV__ ? LOG_LEVEL.DEBUG : LOG_LEVEL.WARN);
  await Purchases.configure({ apiKey, appUserID: appUserId });
}

export async function getOfferings(): Promise<PurchasesOffering[]> {
  const offerings = await Purchases.getOfferings();
  return offerings.all ? Object.values(offerings.all) : [];
}

export async function getCustomerInfo(): Promise<CustomerInfo> {
  return Purchases.getCustomerInfo();
}

export async function purchasePackageByIdentifier(productIdentifier: string) {
  const offerings = await Purchases.getOfferings();
  const allPackages = Object.values(offerings.all ?? {}).flatMap((off) => off.availablePackages);
  const target = allPackages.find((pkg) => pkg.product.identifier === productIdentifier);

  if (!target) throw new Error(`Package not found: ${productIdentifier}`);

  return Purchases.purchasePackage(target);
}
