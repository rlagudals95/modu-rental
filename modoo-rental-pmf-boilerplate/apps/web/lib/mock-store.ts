import type { ConsultationRequestInput, LeadInput } from '@repo/core';

export interface StoredLead extends LeadInput {
  id: string;
  createdAt: string;
}

const leads: StoredLead[] = [];
const consultations: (ConsultationRequestInput & { id: string; createdAt: string })[] = [];

export const addLead = (lead: LeadInput) => {
  const row = { ...lead, id: crypto.randomUUID(), createdAt: new Date().toISOString() };
  leads.unshift(row);
  return row;
};

export const addConsultation = (request: ConsultationRequestInput) => {
  const row = { ...request, id: crypto.randomUUID(), createdAt: new Date().toISOString() };
  consultations.unshift(row);
  return row;
};

export const listLeads = () => leads;
export const listConsultations = () => consultations;

export const mockProducts = [
  { id: 'p1', name: '행사용 의자 세트', category: 'event', active: true },
  { id: 'p2', name: '공기청정기', category: 'home', active: true }
];

export const mockExperiments = [
  {
    id: 'e1',
    key: 'landing-headline-v1',
    hypothesis: '혜택 중심 문구가 문의 전환율을 높인다',
    status: 'running',
    owner: 'pm'
  },
  {
    id: 'e2',
    key: 'consult-short-form',
    hypothesis: '폼 필드를 줄이면 제출율이 올라간다',
    status: 'draft',
    owner: 'pm'
  }
];
