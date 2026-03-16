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
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { source: 'landing', note: '' }
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
        <h2 className="text-lg font-semibold">30초 빠른 상담 요청</h2>
        <p className="text-sm text-slate-600">담당자가 확인 후 순차적으로 연락드립니다.</p>

        <Input placeholder="이름" {...register('name')} />
        {errors.name && <p className="text-xs text-red-600">이름을 2자 이상 입력해 주세요.</p>}

        <Input placeholder="연락처 (예: 01012345678)" {...register('phone')} />
        {errors.phone && <p className="text-xs text-red-600">연락처를 정확히 입력해 주세요.</p>}

        <Input placeholder="이메일 (선택)" {...register('email')} />
        <Input placeholder="필요한 렌탈 품목/기간 (선택)" {...register('note')} />

        <Button type="submit" disabled={isSubmitting}>
          상담 연락 받기
        </Button>
        {done && <p className="text-sm text-green-700">접수 완료! 빠르게 연락드릴게요.</p>}
      </form>
    </Card>
  );
}
