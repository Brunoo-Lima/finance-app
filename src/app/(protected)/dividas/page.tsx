import { PageContainer } from "@/components/ui/page-container/page-container";
import { TitlePage } from "@/components/ui/title-page/title-page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dividas",
  description: "Dividas",
};

export default function DebtsPage() {
  return (
    <PageContainer>
      <TitlePage>Dividas</TitlePage>
    </PageContainer>
  );
}
