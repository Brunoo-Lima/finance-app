import { BarProgress } from '@/components/ui/bar-progress/bar-progress';
import s from './_goals.module.scss';

export const Goals = () => {
  return (
    <div className={s.goals__container}>
      <div className={s.card__custom__container}>
        <strong>Progresso Geral</strong>

        {/* <div className={s.progress__wrapper}>
          <p>
            <span>R$ 500</span> de <span>R$ 1.000</span>
          </p>

          <span>50%</span>
        </div> */}

        <BarProgress title={'R$ 500 de R$ 1.000'} percentage={50} />
      </div>
    </div>
  );
};
