import {
  PageContainer,
  PageDescription,
  PageHeader,
  PageHeaderContent,
  PageTitle,
} from '@/components/ui/page-container/page-container';
import type { Metadata } from 'next';
import { Account } from './_components/account';

export const metadata: Metadata = {
  title: 'Conta',
  description: 'Conta',
};

export default function AccountPage() {
  return (
    <PageContainer>
      <PageHeader>
        <PageHeaderContent>
          <PageTitle>Conta</PageTitle>
          <PageDescription>Informações da conta.</PageDescription>
        </PageHeaderContent>
      </PageHeader>

      <Account />
    </PageContainer>
  );
}
