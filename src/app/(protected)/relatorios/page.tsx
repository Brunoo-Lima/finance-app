import { PageContainer } from "@/components/ui/page-container/page-container";
import { TitlePage } from "@/components/ui/title-page/title-page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Relatórios",
  description: "Relatórios",
};

export default function ReportsPage() {
  return (
    <PageContainer>
      <TitlePage>Relatórios</TitlePage>
    </PageContainer>
  );
}
