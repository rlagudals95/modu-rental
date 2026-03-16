import { Card, Table, Td, Th } from '@repo/ui';
import { listConsultations } from '../../../lib/mock-store';

export default function AdminConsultationsPage() {
  const consultations = listConsultations();

  return (
    <main className="space-y-4">
      <h1 className="text-2xl font-semibold">Consultations</h1>
      <Card>
        <Table>
          <thead>
            <tr>
              <Th>이름</Th>
              <Th>연락처</Th>
              <Th>상품군</Th>
              <Th>희망일</Th>
              <Th>예산</Th>
              <Th>접수시각</Th>
            </tr>
          </thead>
          <tbody>
            {consultations.length === 0 ? (
              <tr>
                <Td colSpan={6}>아직 상담 요청이 없습니다.</Td>
              </tr>
            ) : (
              consultations.map((row) => (
                <tr key={row.id}>
                  <Td>{row.name}</Td>
                  <Td>{row.phone}</Td>
                  <Td>{row.productType}</Td>
                  <Td>{row.desiredDate || '-'}</Td>
                  <Td>{row.budgetRange || '-'}</Td>
                  <Td>{row.createdAt}</Td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </Card>
    </main>
  );
}
