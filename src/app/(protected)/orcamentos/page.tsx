import {
  PageActions,
  PageContainer,
  PageDescription,
  PageHeader,
  PageHeaderContent,
  PageTitle,
} from "@/components/ui/page-container/page-container";
import type { Metadata } from "next";

import s from "./_page.module.scss";
import { AddButtonBudget } from "./_components/add-button-budget/add-button-budget";
import { Budget } from "./_components/budget/budget";

export const metadata: Metadata = {
  title: "Orçamentos",
  description: "Orçamentos",
};

export default function BudgetPage() {
  return (
    <PageContainer>
      <PageHeader className={s.page__header__custom}>
        <PageHeaderContent>
          <PageTitle>Orçamentos</PageTitle>
          <PageDescription>
            Gerencie seus orçamentos mensais e anuais
          </PageDescription>
        </PageHeaderContent>

        <PageActions>
          <AddButtonBudget />
        </PageActions>
      </PageHeader>

      <Budget />
    </PageContainer>
  );
}
