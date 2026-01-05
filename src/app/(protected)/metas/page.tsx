import { PageContainer } from "@/components/ui/page-container/page-container";
import { TitlePage } from "@/components/ui/title-page/title-page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Metas",
  description: "Metas",
};

export default function GoalsPage() {
  return (
    <PageContainer>
      <TitlePage>Metas</TitlePage>
    </PageContainer>
  );
}
