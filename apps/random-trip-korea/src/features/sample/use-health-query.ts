import { useQuery } from '@tanstack/react-query';

import { api } from '@/src/api/client';

type HealthResponse = {
  status: string;
};

async function fetchHealth(): Promise<HealthResponse> {
  // Replace with your own endpoint (e.g., /health)
  const res = await api.get('/health');
  return res.data;
}

export function useHealthQuery() {
  return useQuery({
    queryKey: ['health'],
    queryFn: fetchHealth,
  });
}
