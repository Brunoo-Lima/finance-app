import { PageContainer } from "@/components/ui/page-container/page-container";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Conta",
  description: "Conta",
};

export default function AccountPage() {
  return (
    <PageContainer>
      <h1>Conta</h1>
    </PageContainer>
  );
}
