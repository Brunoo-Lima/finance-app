import type { Metadata } from "next";
import { DashLayout } from "./_components/dash-layout";
import {
  PageActions,
  PageContainer,
  PageDescription,
  PageHeader,
  PageHeaderContent,
  PageTitle,
} from "@/components/ui/page-container/page-container";
import { AddButtonTransaction } from "./_components/add-button-transaction/add-button-transaction";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Dashboard para sua conta.",
};

export default function DashboardPage() {
  return (
    <PageContainer>
      <PageHeader>
        <PageHeaderContent>
          <PageTitle>Dashboard</PageTitle>
          <PageDescription>Visão geral das suas finanças.</PageDescription>
        </PageHeaderContent>

        <PageActions>
          <AddButtonTransaction />
        </PageActions>
      </PageHeader>
      <DashLayout />
    </PageContainer>
  );
}
