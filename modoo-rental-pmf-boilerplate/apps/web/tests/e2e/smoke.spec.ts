import { expect, test } from '@playwright/test';

test('landing page loads', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByText('모두의렌탈 PMF 실험 보일러플레이트')).toBeVisible();
});

test('consultation form submits', async ({ page }) => {
  await page.goto('/consult');
  await page.getByPlaceholder('이름').fill('홍길동');
  await page.getByPlaceholder('전화번호').fill('01011112222');
  await page.getByPlaceholder('관심 상품군').fill('가전');
  await page.getByRole('button', { name: '상담 요청 보내기' }).click();
  await expect(page.getByText('상담 요청이 접수되었습니다.')).toBeVisible();
});

test('admin leads page renders', async ({ page }) => {
  await page.goto('/admin/leads');
  await expect(page.getByRole('heading', { name: 'Leads' })).toBeVisible();
});
