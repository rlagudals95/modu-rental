import { listLeads } from "@pmf/db";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@pmf/ui";

import { StatusBadge } from "@/modules/admin/ui/status-badge";

const valueLabels: Record<string, string> = {
  one: "1인",
  two: "2인",
  three_plus: "3인+",
  owner: "자가",
  jeonse_monthly: "전·월세",
  yes: "있음",
  no: "없음",
  basic: "기본 정수",
  hot: "온수",
  ice: "얼음",
  under_30k: "3만원 미만",
  "30k_to_50k": "3~5만원",
  "50k_to_70k": "5~7만원",
  above_70k: "7만원+",
  self: "셀프",
  visit: "방문",
  narrow: "좁음",
  standard: "보통",
  price: "가격",
  maintenance: "관리",
  cancellation: "해지/위약금",
};

const parseMessage = (message?: string) => {
  if (!message) {
    return {} as Record<string, string>;
  }

  return Object.fromEntries(
    message
      .split(";")
      .map((item) => item.trim())
      .filter(Boolean)
      .map((item) => {
        const [key = "", value = ""] = item.split("=");
        return [key.trim(), value.trim()] as const;
      }),
  );
};

const onboardingSummary = (message?: string) => {
  const parsed = parseMessage(message);

  const fields: Array<[label: string, value?: string]> = [
    ["가구", parsed.householdSize],
    ["거주", parsed.housingType],
    ["이사", parsed.movingWithinTwoYears],
    ["기능", parsed.requiredFeature],
    ["예산", parsed.monthlyBudgetBand],
    ["관리", parsed.managementPreference],
    ["공간", parsed.installationSpace],
    ["우려", parsed.primaryConcern],
  ];

  const tokens = fields
    .filter(([, value]) => value)
    .map(([label, value]) => `${label}:${valueLabels[value!] ?? value}`);

  return tokens.length > 0 ? tokens.join(" · ") : "-";
};

export default async function AdminLeadsPage() {
  const leads = await listLeads();

  return (
    <Card>
      <CardHeader>
        <CardTitle data-testid="admin-leads-heading">Lead inbox</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>이름</TableHead>
              <TableHead>연락처</TableHead>
              <TableHead>관심 제품</TableHead>
              <TableHead>온보딩 요약</TableHead>
              <TableHead>상태</TableHead>
              <TableHead>유입</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {leads.map((lead) => (
              <TableRow key={lead.id}>
                <TableCell className="font-medium text-slate-950">{lead.name}</TableCell>
                <TableCell>{lead.phone}</TableCell>
                <TableCell>{lead.productInterest}</TableCell>
                <TableCell className="max-w-[360px] text-xs text-slate-600">
                  {onboardingSummary(lead.message)}
                </TableCell>
                <TableCell>
                  <StatusBadge value={lead.status} />
                </TableCell>
                <TableCell>{lead.source}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
