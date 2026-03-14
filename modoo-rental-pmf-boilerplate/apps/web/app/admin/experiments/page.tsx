import { Card, Table, Td, Th } from '@repo/ui';
import { mockExperiments } from '../../../lib/mock-store';

export default function AdminExperimentsPage() {
  return (
    <main className="space-y-4">
      <h1 className="text-2xl font-semibold">Experiments</h1>
      <p className="text-sm text-slate-600">실험 레지스트리: PMF 실험 가설과 상태를 추적합니다.</p>
      <Card>
        <Table>
          <thead><tr><Th>키</Th><Th>가설</Th><Th>상태</Th><Th>담당</Th></tr></thead>
          <tbody>
            {mockExperiments.map((e) => (
              <tr key={e.id}><Td>{e.key}</Td><Td>{e.hypothesis}</Td><Td>{e.status}</Td><Td>{e.owner}</Td></tr>
            ))}
          </tbody>
        </Table>
      </Card>
    </main>
  );
}
