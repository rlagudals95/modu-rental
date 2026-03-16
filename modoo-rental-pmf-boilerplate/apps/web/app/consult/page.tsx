'use client';

import Link from 'next/link';
import { ConsultForm } from '../../components/consult-form';
import { addConsultation } from '../../lib/mock-store';

export default function ConsultPage() {
  return (
    <main className="space-y-6">
      <section className="space-y-2">
        <p className="text-sm font-medium text-blue-700">상담 신청</p>
        <h1 className="text-2xl font-bold text-slate-900">필요 조건을 남겨주시면 맞춤 렌탈안을 제안드립니다</h1>
        <p className="text-sm text-slate-600">
          정보가 구체적일수록 더 정확한 견적을 드릴 수 있어요. 급한 건은 요청사항에 "긴급"을 적어주세요.
        </p>
      </section>

      <ConsultForm onSubmitRequest={addConsultation} />

      <p className="text-sm text-slate-600">
        아직 정리 전이라면?{' '}
        <Link href="/" className="font-semibold text-blue-700 underline-offset-2 hover:underline">
          빠른 연락 요청으로 이동
        </Link>
      </p>
    </main>
  );
}
