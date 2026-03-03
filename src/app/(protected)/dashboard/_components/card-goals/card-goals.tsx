'use client';

import dynamic from 'next/dynamic';
import s from './_card-goals.module.scss';
import { useGoals } from '@/hooks/use-goals';
import { useLoading } from '@/hooks/use-loading';
import { Skeleton } from '@/components/ui/loading/skeleton-pulse/skeleton-pulse';
import { BarProgress } from '@/components/ui/bar-progress/bar-progress';

// const BarProgress = dynamic(
//   () =>
//     import('@/components/ui/bar-progress/bar-progress').then(
//       (mod) => mod.BarProgress,
//     ),
//   { ssr: false },
// );

export const CardGoals = () => {
  const { allGoals } = useGoals();
  const loading = useLoading(true, 1000);

  return (
    <div className={s.card__container}>
      <div className={s.sub__header}>
        <p>Metas financeiras</p>
      </div>

      <div className={s.bars__progress}>
        {loading ? (
          <div className={s.bars__loading}>
            <Skeleton type="title" width={'100%'} />
            <Skeleton type="title" width={'100%'} />
          </div>
        ) : (
          allGoals.map((goal) => {
            const percentage =
              Math.round((goal.valueAchieved / goal.valueTotal) * 100) || 0;

            return (
              <BarProgress
                key={goal.id}
                title={goal.name}
                percentage={percentage}
              />
            );
          })
        )}
      </div>
    </div>
  );
};
