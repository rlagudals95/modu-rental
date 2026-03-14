import { Card, Table, Td, Th } from '@repo/ui';
import { listLeads } from '../../../lib/mock-store';

export default function AdminLeadsPage() {
  const leads = listLeads();

  return (
    <main className="space-y-4">
      <h1 className="text-2xl font-semibold">Leads</h1>
      <Card>
        <Table>
          <thead>
            <tr>
              <Th>이름</Th><Th>전화번호</Th><Th>소스</Th><Th>생성시각</Th>
            </tr>
          </thead>
          <tbody>
            {leads.length === 0 ? (
              <tr><Td colSpan={4}>아직 리드가 없습니다.</Td></tr>
            ) : (
              leads.map((lead) => (
                <tr key={lead.id}>
                  <Td>{lead.name}</Td><Td>{lead.phone}</Td><Td>{lead.source}</Td><Td>{lead.createdAt}</Td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </Card>
    </main>
  );
}
