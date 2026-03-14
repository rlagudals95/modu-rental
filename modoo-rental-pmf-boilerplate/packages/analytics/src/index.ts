export interface AnalyticsProvider {
  track(event: string, payload?: Record<string, unknown>): Promise<void> | void;
}

export class ConsoleAnalyticsProvider implements AnalyticsProvider {
  track(event: string, payload?: Record<string, unknown>) {
    console.info('[analytics]', event, payload ?? {});
  }
}

let provider: AnalyticsProvider = new ConsoleAnalyticsProvider();

export const setAnalyticsProvider = (nextProvider: AnalyticsProvider) => {
  provider = nextProvider;
};

export const track = async (event: string, payload?: Record<string, unknown>) => {
  await provider.track(event, payload);
};
