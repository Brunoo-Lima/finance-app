import { PageContainer } from "@/components/ui/page-container/page-container";
import { TitlePage } from "@/components/ui/title-page/title-page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Investimentos",
  description: "Investimentos",
};

export default function InvestmentsPage() {
  return (
    <PageContainer>
      <TitlePage>Investimentos</TitlePage>
    </PageContainer>
  );
}
