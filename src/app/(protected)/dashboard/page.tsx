import type { Metadata } from 'next';
import { DashLayout } from './_components/dash-layout';
import {
  PageActions,
  PageContainer,
  PageDescription,
  PageHeader,
  PageHeaderContent,
  PageTitle,
} from '@/components/ui/page-container/page-container';
import { AddButtonTransaction } from '../transacoes/_components/actions-header/add-button-transaction';
import { Username } from '@/components/ui/username/username';
import { ButtonCalendar } from './_components/button-calendar/button-calendar';

import s from './page.module.scss';

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Dashboard para sua conta.',
};

export default function DashboardPage() {
  return (
    <PageContainer>
      <Username />

      <PageHeader className={s.page__header__custom}>
        <PageHeaderContent>
          <PageTitle>Dashboard</PageTitle>
          <PageDescription>Visão geral das suas finanças.</PageDescription>
        </PageHeaderContent>

        <PageActions className={s.page__actions__custom}>
          <ButtonCalendar />
          <AddButtonTransaction />
        </PageActions>
      </PageHeader>
      <DashLayout />
    </PageContainer>
  );
}
