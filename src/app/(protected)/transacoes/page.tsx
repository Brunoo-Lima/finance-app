import {
  PageActions,
  PageContainer,
  PageDescription,
  PageHeader,
  PageHeaderContent,
  PageTitle,
} from '@/components/ui/page-container/page-container';
import type { Metadata } from 'next';
import { Transactions } from './_components/transactions';

import s from './_page.module.scss';
import { ActionsHeader } from './_components/actions-header/actions-header';
import { StatsCards } from './_components/stats-cards/stats-cards';

export const metadata: Metadata = {
  title: 'Transações',
  description: 'Transações',
};

export default function TransactionsPage() {
  return (
    <PageContainer>
      <PageHeader className={s.page__header__custom}>
        <PageHeaderContent>
          <PageTitle>Transações</PageTitle>
          <PageDescription>
            Gerencie todas as suas transações financeiras
          </PageDescription>
        </PageHeaderContent>

        <PageActions className={s.page__actions__custom}>
          <ActionsHeader />
        </PageActions>
      </PageHeader>

      <div className={s.cards__wrapper}>
        <StatsCards />
      </div>

      <Transactions />
    </PageContainer>
  );
}
