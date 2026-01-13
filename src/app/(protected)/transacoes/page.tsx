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
import { AddButtonTransaction } from '../dashboard/_components/add-button-transaction/add-button-transaction';
import { Button } from '@/components/ui/button/button';
import {
  DownloadIcon,
  PiggyBankIcon,
  TrendingDownIcon,
  TrendingUpIcon,
} from 'lucide-react';

import s from './_page.module.scss';
import { Card } from '@/components/ui/card/card';

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
          <Button variant="cancel">
            <DownloadIcon size={16} />
            Exportar
          </Button>
          <AddButtonTransaction />
        </PageActions>
      </PageHeader>

      <div className={s.cards__wrapper}>
        <Card
          text="Investido"
          amount={3500}
          icon={<PiggyBankIcon size={16} color="#ffffff" />}
          backgroundIcon="#FFFFFF14"
        />
        <Card
          text="Receita"
          amount={8150}
          icon={<TrendingUpIcon size={16} color="#39BE00" />}
          backgroundIcon="#39BE0014"
        />
        <Card
          text="Despesas"
          amount={2950}
          icon={<TrendingDownIcon size={16} color="#E93030" />}
          backgroundIcon="#F6352E14"
        />
      </div>

      <Transactions />
    </PageContainer>
  );
}
