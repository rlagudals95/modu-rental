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

const summarizeRecommendationContext = (message?: string) => {
  if (!message) {
    return "-";
  }

  const requiredFeature = /requiredFeature=([^;]+)/.exec(message)?.[1];
  const budgetBand = /monthlyBudgetBand=([^;]+)/.exec(message)?.[1];
  const moving = /movingWithinTwoYears=([^;]+)/.exec(message)?.[1];

  if (!requiredFeature && !budgetBand && !moving) {
    return "-";
  }

  return [
    requiredFeature ? `기능:${requiredFeature}` : null,
    budgetBand ? `예산:${budgetBand}` : null,
    moving ? `이사:${moving}` : null,
  ]
    .filter(Boolean)
    .join(" · ");
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
              <TableHead>이메일</TableHead>
              <TableHead>관심 제품</TableHead>
              <TableHead>추천 컨텍스트</TableHead>
              <TableHead>상태</TableHead>
              <TableHead>유입</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {leads.map((lead) => (
              <TableRow key={lead.id}>
                <TableCell className="font-medium text-slate-950">{lead.name}</TableCell>
                <TableCell>{lead.phone}</TableCell>
                <TableCell>{lead.email ?? "-"}</TableCell>
                <TableCell>{lead.productInterest}</TableCell>
                <TableCell className="text-xs text-slate-600">{summarizeRecommendationContext(lead.message)}</TableCell>
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
