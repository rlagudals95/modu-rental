export type LeadSource = 'landing' | 'consult' | 'referral' | 'other';

export interface Lead {
  id: string;
  name: string;
  phone: string;
  email?: string;
  source: LeadSource;
  note?: string;
  createdAt: Date;
}

export interface ConsultationRequest {
  id: string;
  leadId?: string;
  desiredDate?: string;
  productType?: string;
  budgetRange?: string;
  details?: string;
  createdAt: Date;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  active: boolean;
  createdAt: Date;
}

export interface Experiment {
  id: string;
  key: string;
  hypothesis: string;
  status: 'draft' | 'running' | 'paused' | 'done';
  owner?: string;
  createdAt: Date;
}

export interface PageEvent {
  id: string;
  event: string;
  path: string;
  metadata?: Record<string, unknown>;
  createdAt: Date;
}
