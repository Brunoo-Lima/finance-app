import type { Metadata } from "next";
import { DashLayout } from "./_components/dash-layout";
import { PageContainer, PageHeader } from "@/components/ui/page-container";
import { TitlePage } from "@/components/ui/title-page";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Dashboard para sua conta.",
};

export default function DashboardPage() {
  return (
    <PageContainer>
      <PageHeader>
        <TitlePage>Dashboard</TitlePage>
      </PageHeader>

      <DashLayout />
    </PageContainer>
  );
}
