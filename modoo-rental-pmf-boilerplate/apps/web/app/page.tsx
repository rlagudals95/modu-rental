'use client';

import Link from 'next/link';
import { LeadForm } from '../components/lead-form';
import { addLead } from '../lib/mock-store';

const valueProps = [
  { title: '견적 1시간 내 회신', desc: '평일 09:00~20:00 기준, 접수 후 빠르게 연락드립니다.' },
  { title: '행사·사무실·가정 렌탈 통합 상담', desc: '카테고리별 업체를 따로 찾지 않아도 한 번에 비교 가능합니다.' },
  { title: '예산 맞춤 제안', desc: '희망 예산과 기간 기준으로 가능한 옵션만 추려서 제안합니다.' }
];

export default function HomePage() {
  return (
    <main className="space-y-10">
      <section className="rounded-2xl border border-slate-200 bg-slate-50 p-6 md:p-10">
        <p className="mb-2 text-sm font-medium text-blue-700">모두의렌탈 · 빠른 견적 연결</p>
        <h1 className="text-3xl font-bold leading-tight text-slate-900 md:text-4xl">
          필요한 렌탈, <br className="hidden md:block" />
          <span className="text-blue-700">한 번에 상담 받고</span> 바로 비교하세요
        </h1>
        <p className="mt-4 max-w-2xl text-slate-700">
          행사 물품, 사무 가전, 매장 장비까지. 연락처만 남기면 조건에 맞는 렌탈 옵션을 빠르게 안내해드립니다.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/consult"
            className="rounded-lg bg-blue-700 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-800"
          >
            상담 신청서 바로 작성
          </Link>
          <a href="#lead-form" className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-100">
            빠른 연락 요청
          </a>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {valueProps.map((item) => (
          <article key={item.title} className="rounded-xl border border-slate-200 bg-white p-5">
            <h2 className="text-base font-semibold text-slate-900">{item.title}</h2>
            <p className="mt-2 text-sm text-slate-600">{item.desc}</p>
          </article>
        ))}
      </section>

      <section className="grid gap-6 md:grid-cols-[1.3fr_1fr]">
        <div className="space-y-3 rounded-xl border border-slate-200 p-5">
          <h2 className="text-xl font-semibold text-slate-900">왜 모두의렌탈로 시작하나요?</h2>
          <ul className="space-y-2 text-sm text-slate-700">
            <li>• 상품군/예산/기간에 따라 실현 가능한 조합만 먼저 제안</li>
            <li>• 전화·문자·카톡 등 원하는 방식으로 상담 진행</li>
            <li>• 초기 비교 시간을 줄여 의사결정 속도 개선</li>
          </ul>
        </div>

        <div id="lead-form">
          <LeadForm onSubmitLead={addLead} />
        </div>
      </section>
    </main>
  );
}
