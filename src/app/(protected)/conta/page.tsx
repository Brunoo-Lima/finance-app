import { PageContainer } from "@/components/ui/page-container/page-container";
import { TitlePage } from "@/components/ui/title-page/title-page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Conta",
  description: "Conta",
};

export default function AccountPage() {
  return (
    <PageContainer>
      <TitlePage>Conta</TitlePage>
    </PageContainer>
  );
}
