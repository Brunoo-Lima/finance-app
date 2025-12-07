import { PageContainer } from "@/components/ui/page-container/page-container";
import { TitlePage } from "@/components/ui/title-page/title-page";
import { Metadata } from "next";
import { Transactions } from "./_components/transactions";

export const metadata: Metadata = {
  title: "Transações",
  description: "Transações",
};

export default function TransactionsPage() {
  return (
    <PageContainer>
      <TitlePage>Transações</TitlePage>

      <Transactions />
    </PageContainer>
  );
}
