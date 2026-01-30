import {
  PageActions,
  PageContainer,
  PageDescription,
  PageHeader,
  PageHeaderContent,
  PageTitle,
} from '@/components/ui/page-container/page-container';
import s from './_page.module.scss';
import type { Metadata } from 'next';
import { AddButtonGoal } from './_components/add-button-goal';

export const metadata: Metadata = {
  title: 'Metas Financeiras | MasterCash',
  description: 'Metas Financeiras',
};

export default function GoalsPage() {
  return (
    <PageContainer>
      <PageHeader className={s.page__header__custom}>
        <PageHeaderContent>
          <PageTitle>Metas Financeiras</PageTitle>
          <PageDescription>
            Gerencie todas as suas metas financeiras
          </PageDescription>
        </PageHeaderContent>

        <PageActions>
          <AddButtonGoal />
        </PageActions>
      </PageHeader>
    </PageContainer>
  );
}
