import type { Metadata } from "next";
import { DashLayout } from "./_components/dash-layout";
import { PageContainer } from "@/components/ui/page-container/page-container";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Dashboard para sua conta.",
};

export default function DashboardPage() {
  return (
    <PageContainer>
      <DashLayout />
    </PageContainer>
  );
}
