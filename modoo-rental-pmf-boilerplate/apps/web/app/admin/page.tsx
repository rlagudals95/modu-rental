import Link from 'next/link';
import { Card } from '@repo/ui';
import { listConsultations, listLeads } from '../../lib/mock-store';

const links = [
  { href: '/admin/leads', label: '리드 목록' },
  { href: '/admin/consultations', label: '상담 요청 목록' },
  { href: '/admin/products', label: '상품 관리' },
  { href: '/admin/experiments', label: '실험 레지스트리' }
];

export default function AdminHome() {
  const leads = listLeads();
  const consultations = listConsultations();

  return (
    <main className="space-y-6">
      <section className="space-y-2">
        <h1 className="text-2xl font-semibold">운영 대시보드</h1>
        <p className="text-sm text-slate-600">오늘 유입과 상담 전환 현황을 빠르게 확인합니다.</p>
      </section>

      <section className="grid gap-3 md:grid-cols-3">
        <Card>
          <p className="text-sm text-slate-600">누적 리드</p>
          <p className="text-2xl font-bold">{leads.length}</p>
        </Card>
        <Card>
          <p className="text-sm text-slate-600">누적 상담 요청</p>
          <p className="text-2xl font-bold">{consultations.length}</p>
        </Card>
        <Card>
          <p className="text-sm text-slate-600">상담 전환율(단순)</p>
          <p className="text-2xl font-bold">
            {leads.length === 0 ? '0%' : `${Math.round((consultations.length / leads.length) * 100)}%`}
          </p>
        </Card>
      </section>

      <Card>
        <h2 className="mb-3 text-lg font-semibold">바로가기</h2>
        <ul className="grid gap-2 text-blue-700 md:grid-cols-2">
          {links.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="underline-offset-2 hover:underline">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </Card>
    </main>
  );
}
