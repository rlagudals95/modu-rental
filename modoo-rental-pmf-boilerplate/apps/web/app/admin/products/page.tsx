import { Card, Table, Td, Th } from '@repo/ui';
import { mockProducts } from '../../../lib/mock-store';

export default function AdminProductsPage() {
  return (
    <main className="space-y-4">
      <h1 className="text-2xl font-semibold">Products</h1>
      <Card>
        <Table>
          <thead><tr><Th>이름</Th><Th>카테고리</Th><Th>활성</Th></tr></thead>
          <tbody>
            {mockProducts.map((p) => (
              <tr key={p.id}><Td>{p.name}</Td><Td>{p.category}</Td><Td>{String(p.active)}</Td></tr>
            ))}
          </tbody>
        </Table>
      </Card>
    </main>
  );
}
