import { z } from 'zod';

export const consultationRequestSchema = z.object({
  name: z.string().min(2),
  phone: z.string().min(8),
  desiredDate: z.string().optional(),
  productType: z.string().min(1),
  budgetRange: z.string().optional(),
  details: z.string().max(1000).optional()
});

export type ConsultationRequestInput = z.infer<typeof consultationRequestSchema>;
