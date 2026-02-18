import { Platform } from 'react-native';
import {
  AdEventType,
  InterstitialAd,
  RewardedAd,
  RewardedAdEventType,
  TestIds,
} from 'react-native-google-mobile-ads';

import { env } from '@/src/config/env';

function getInterstitialUnitId() {
  if (__DEV__) return TestIds.INTERSTITIAL;
  return Platform.OS === 'ios' ? env.admobInterstitialIos : env.admobInterstitialAndroid;
}

function getRewardedUnitId() {
  if (__DEV__) return TestIds.REWARDED;
  return Platform.OS === 'ios' ? env.admobRewardedIos : env.admobRewardedAndroid;
}

export async function showInterstitial() {
  const unitId = getInterstitialUnitId();
  if (!unitId) throw new Error('AdMob interstitial unit id is missing');

  const interstitial = InterstitialAd.createForAdRequest(unitId);
  return new Promise<boolean>((resolve) => {
    const loadedUnsub = interstitial.addAdEventListener(AdEventType.LOADED, () => {
      interstitial.show();
    });

    const closedUnsub = interstitial.addAdEventListener(AdEventType.CLOSED, () => {
      loadedUnsub();
      closedUnsub();
      resolve(true);
    });

    interstitial.load();
  });
}

export async function showRewarded() {
  const unitId = getRewardedUnitId();
  if (!unitId) throw new Error('AdMob rewarded unit id is missing');

  const rewarded = RewardedAd.createForAdRequest(unitId);
  return new Promise<{ rewarded: boolean }>((resolve) => {
    let earned = false;

    const loadedUnsub = rewarded.addAdEventListener(RewardedAdEventType.LOADED, () => {
      rewarded.show();
    });

    const earnedUnsub = rewarded.addAdEventListener(RewardedAdEventType.EARNED_REWARD, () => {
      earned = true;
    });

    const closedUnsub = rewarded.addAdEventListener(AdEventType.CLOSED, () => {
      loadedUnsub();
      earnedUnsub();
      closedUnsub();
      resolve({ rewarded: earned });
    });

    rewarded.load();
  });
}
