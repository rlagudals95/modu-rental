import { z } from 'zod';

export const leadSchema = z.object({
  name: z.string().min(2).max(50),
  phone: z.string().min(8).max(20),
  email: z.string().email().optional().or(z.literal('')),
  source: z.enum(['landing', 'consult', 'referral', 'other']).default('landing'),
  note: z.string().max(500).optional()
});

export type LeadInput = z.infer<typeof leadSchema>;
