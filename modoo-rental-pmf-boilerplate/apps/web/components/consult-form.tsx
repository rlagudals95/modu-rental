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

const productTypes = ['행사용품', '사무실/가전', '매장장비', '기타'];

export function ConsultForm({ onSubmitRequest }: { onSubmitRequest: (input: FormValues) => void }) {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<FormValues>({
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
        <h2 className="text-xl font-semibold">상담 신청서</h2>
        <Input placeholder="이름" {...register('name')} />
        {errors.name && <p className="text-xs text-red-600">이름을 입력해 주세요.</p>}

        <Input placeholder="전화번호" {...register('phone')} />
        {errors.phone && <p className="text-xs text-red-600">연락처를 입력해 주세요.</p>}

        <label className="block text-sm text-slate-700">
          관심 상품군
          <select
            className="mt-1 w-full rounded border border-slate-300 px-3 py-2 text-sm"
            defaultValue=""
            {...register('productType')}
          >
            <option value="" disabled>
              선택해 주세요
            </option>
            {productTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </label>
        {errors.productType && <p className="text-xs text-red-600">관심 상품군을 선택해 주세요.</p>}

        <Input placeholder="희망 상담일 (예: 3/20 오후)" {...register('desiredDate')} />
        <Input placeholder="예산 범위 (예: 월 20~30만원)" {...register('budgetRange')} />
        <Input placeholder="요청사항 (수량, 기간, 긴급 여부 등)" {...register('details')} />

        <Button type="submit" disabled={isSubmitting}>
          상담 요청 보내기
        </Button>
        {submitted && <p className="text-sm text-green-700">상담 요청이 접수되었습니다. 확인 후 연락드릴게요.</p>}
      </form>
    </Card>
  );
}
