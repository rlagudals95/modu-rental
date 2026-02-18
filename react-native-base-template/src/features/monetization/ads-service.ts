/**
 * Replace with AdMob/AppLovin implementation.
 */
export function shouldShowInterstitial(actionsSinceLastAd: number) {
  return actionsSinceLastAd >= 5;
}

export async function showRewardedAd(placementId: string) {
  // TODO: integrate real rewarded ad SDK call
  return { placementId, rewarded: true };
}
