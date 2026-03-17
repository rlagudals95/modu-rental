"use client";

import { usePathname } from "next/navigation";

import { Button } from "@pmf/ui";

import { TrackedLink } from "@/shared/ui/tracked-link";

export function SiteHeader() {
  const pathname = usePathname();

  if (pathname === "/") {
    return null;
  }

  return (
    <header className="sticky top-0 z-30 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <TrackedLink href="/" className="flex items-center gap-3">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-primary text-sm font-semibold text-primary-foreground shadow-sm">
            모렌
          </span>
          <div>
            <p className="text-sm font-semibold text-foreground">모두의렌탈</p>
            <p className="text-xs text-muted-foreground">계약 리스크까지 보는 렌탈 추천</p>
          </div>
        </TrackedLink>
        <div className="flex items-center gap-2">
          <Button asChild variant="outline" size="sm">
            <TrackedLink href="/consult">상담 요청</TrackedLink>
          </Button>
          <Button asChild size="sm">
            <TrackedLink href="/admin">운영 대시보드</TrackedLink>
          </Button>
        </div>
      </div>
    </header>
  );
}
