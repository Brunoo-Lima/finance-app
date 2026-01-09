import { Card } from "@/components/ui/card/card";
import s from "./_budget.module.scss";
import { AlertCircleIcon, SquarePenIcon } from "lucide-react";
import { budgetList } from "@/mocks/budget-list";
import { BarProgress2 } from "@/components/ui/bar-progress2/bar-progress2";

export const Budget = () => {
  return (
    <div className={s.budget__container}>
      <div className={s.cards__wrapper}>
        <Card text="Total Orçado" amount={4500} backgroundCustom="#171717" />
        <Card text="Total Gasto" amount={3730} backgroundCustom="#171717" />
        <Card text="Disponível" amount={570} backgroundCustom="#171717" />
        <Card
          text="Porcentagem usada"
          percentage={86.7}
          backgroundCustom="#171717"
        />
      </div>

      <div className={s.alert__container}>
        <div className={s.alert__header}>
          <AlertCircleIcon size={24} color="#e93030" />
          <strong>Categorias acima do orçamento</strong>
        </div>

        <div className={s.category}>
          <p>
            Educação <span>+R$ 80.00</span>
          </p>
        </div>
      </div>

      <div className={s.bars__container}>
        <div className={s.sub__header}>
          <strong>Todos os orçamentos</strong>

          <button type="button" className={s.button__manage}>
            <SquarePenIcon size={18} />
            Gerenciar orçamentos
          </button>
        </div>

        {budgetList.map((item) => (
          <div key={item.id} className={s.bar__container}>
            <BarProgress2
              title={item.category}
              value={item.amountUsed}
              valueTotal={item.amountTotal}
              percentage={item.percentageUsed}
              barClassName={item.percentageUsed > 100 ? s.limit__exceeded : ""}
            />

            <div className={s.bar__info}>
              <small className={s.period}>{item.period}</small>
              <small
                className={`${s.percentage} ${item.percentageUsed > 100 ? s.limit_percentage__exceeded : ""}`}
              >
                {item.percentageUsed}% usado
              </small>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
