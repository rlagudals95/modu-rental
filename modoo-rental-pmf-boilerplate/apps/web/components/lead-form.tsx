'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { track } from '@repo/analytics';
import { leadSchema } from '@repo/core';
import { Button, Card, Input } from '@repo/ui';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const schema = leadSchema;
type FormValues = z.infer<typeof schema>;

export function LeadForm({ onSubmitLead }: { onSubmitLead: (input: FormValues) => void }) {
  const [done, setDone] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { source: 'landing' }
  });

  return (
    <Card>
      <form
        className="space-y-3"
        onSubmit={handleSubmit(async (data) => {
          onSubmitLead(data);
          await track('lead_captured', { source: 'landing' });
          setDone(true);
        })}
      >
        <h2 className="text-lg font-semibold">상담 리드 남기기</h2>
        <Input placeholder="이름" {...register('name')} />
        {errors.name && <p className="text-xs text-red-600">이름을 2자 이상 입력해 주세요.</p>}
        <Input placeholder="전화번호" {...register('phone')} />
        <Input placeholder="이메일(선택)" {...register('email')} />
        <Button type="submit" disabled={isSubmitting}>문의 남기기</Button>
        {done && <p className="text-sm text-green-700">등록되었습니다. 곧 연락드릴게요.</p>}
      </form>
    </Card>
  );
}
