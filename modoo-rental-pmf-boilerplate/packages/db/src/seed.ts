import { db, schema } from './client';

async function seed() {
  await db.insert(schema.products).values([
    { name: '행사용 의자 세트', category: 'event', description: '야외 행사 기본 세트' },
    { name: '가정용 공기청정기', category: 'home', description: '월 렌탈 상품' }
  ]);

  await db.insert(schema.experiments).values([
    { key: 'landing-headline-v1', hypothesis: '혜택 중심 카피가 전환율을 높인다', status: 'running', owner: 'pm' },
    { key: 'consult-form-short', hypothesis: '필드 수를 줄이면 완주율이 올라간다', status: 'draft', owner: 'pm' }
  ]);

  console.log('seed completed');
  process.exit(0);
}

seed().catch((e) => {
  console.error(e);
  process.exit(1);
});
