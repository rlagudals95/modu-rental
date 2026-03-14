'use client';

import { ConsultForm } from '../../components/consult-form';
import { addConsultation } from '../../lib/mock-store';

export default function ConsultPage() {
  return (
    <main className="space-y-4">
      <p className="text-sm text-slate-600">상담 신청 전용 페이지</p>
      <ConsultForm onSubmitRequest={addConsultation} />
    </main>
  );
}
