import Link from 'next/link';

export default function AdminHome() {
  return (
    <main className="space-y-4">
      <h1 className="text-2xl font-semibold">Admin</h1>
      <ul className="list-disc space-y-1 pl-6 text-blue-700">
        <li><Link href="/admin/leads">/admin/leads</Link></li>
        <li><Link href="/admin/products">/admin/products</Link></li>
        <li><Link href="/admin/experiments">/admin/experiments</Link></li>
      </ul>
    </main>
  );
}
