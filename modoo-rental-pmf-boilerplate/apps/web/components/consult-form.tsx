'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { track } from '@repo/analytics';
import { consultationRequestSchema } from '@repo/core';
import { Button, Card, Input } from '@repo/ui';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const schema = consultationRequestSchema;
type FormValues = z.infer<typeof schema>;

export function ConsultForm({ onSubmitRequest }: { onSubmitRequest: (input: FormValues) => void }) {
  const [submitted, setSubmitted] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormValues>({
    resolver: zodResolver(schema)
  });

  return (
    <Card>
      <form
        className="space-y-3"
        onSubmit={handleSubmit(async (data) => {
          onSubmitRequest(data);
          await track('consultation_requested', { productType: data.productType });
          setSubmitted(true);
        })}
      >
        <h1 className="text-xl font-semibold">상담 신청</h1>
        <Input placeholder="이름" {...register('name')} />
        <Input placeholder="전화번호" {...register('phone')} />
        <Input placeholder="관심 상품군" {...register('productType')} />
        <Input placeholder="희망 상담일 (선택)" {...register('desiredDate')} />
        <Input placeholder="예산 범위 (선택)" {...register('budgetRange')} />
        <Input placeholder="요청사항 (선택)" {...register('details')} />
        {errors.productType && <p className="text-xs text-red-600">관심 상품군을 입력해 주세요.</p>}
        <Button type="submit" disabled={isSubmitting}>상담 요청 보내기</Button>
        {submitted && <p className="text-sm text-green-700">상담 요청이 접수되었습니다.</p>}
      </form>
    </Card>
  );
}
