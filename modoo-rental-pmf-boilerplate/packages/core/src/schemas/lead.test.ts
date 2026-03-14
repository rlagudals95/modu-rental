import { describe, expect, it } from 'vitest';
import { leadSchema } from './lead';

describe('leadSchema', () => {
  it('accepts valid lead', () => {
    const parsed = leadSchema.safeParse({
      name: 'Kim',
      phone: '01012345678',
      source: 'landing'
    });
    expect(parsed.success).toBe(true);
  });

  it('rejects invalid lead', () => {
    const parsed = leadSchema.safeParse({
      name: '',
      phone: '1'
    });
    expect(parsed.success).toBe(false);
  });
});
