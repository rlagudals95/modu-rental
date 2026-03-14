'use client';

import { LeadForm } from '../components/lead-form';
import { addLead } from '../lib/mock-store';

export default function HomePage() {
  return (
    <main className="space-y-6">
      <section className="space-y-2">
        <h1 className="text-3xl font-bold">모두의렌탈 PMF 실험 보일러플레이트</h1>
        <p className="text-slate-700">
          랜딩 → 상담요청 → 운영관리 흐름을 빠르게 검증하기 위한 시작점입니다.
        </p>
      </section>
      <LeadForm onSubmitLead={addLead} />
    </main>
  );
}
