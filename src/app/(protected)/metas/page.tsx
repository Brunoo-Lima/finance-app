import {
  PageContainer,
  PageHeader,
} from "@/components/ui/page-container/page-container";
import { TitlePage } from "@/components/ui/title-page/title-page";
import type { Metadata } from "next";
import { AddButtonGoal } from "./_components/add-button-goal";

export const metadata: Metadata = {
  title: "Metas",
  description: "Metas",
};

export default function GoalsPage() {
  return (
    <PageContainer>
      <PageHeader>
        <TitlePage>Metas Financeiras</TitlePage>
        <AddButtonGoal />
      </PageHeader>
    </PageContainer>
  );
}
