"use client";

import dynamic from "next/dynamic";

import s from "./_card-pie.module.scss";

const PieChartCustom = dynamic(
  () => import("@/components/ui/charts/pie-chart/pie-chart-custom"),
  { ssr: false },
);

export const CardPieChart = () => {
  const data = [
    {
      name: "Ganhos",
      value: 60,
      fill: "#39be00",
    },

    {
      name: "Gastos",
      value: 40,
      fill: "#EF4444",
    },
    {
      name: "Investimentos",
      value: 60,
      fill: "#ffffff",
    },
  ];

  return (
    <div className={s.card__pie__chart_container}>
      <PieChartCustom data={data} />

      <div className={s.legend}>
        <ul>
          <li>
            <p>
              <span className={s.dot} style={{ background: "#39be00" }} />{" "}
              Ganhos
            </p>

            <b>60%</b>
          </li>
          <li>
            <p>
              {" "}
              <span className={s.dot} style={{ background: "#EF4444" }} />{" "}
              Gastos
            </p>

            <b>22%</b>
          </li>
          <li>
            <p>
              <span className={s.dot} style={{ background: "#ffffff" }} />{" "}
              Investimentos
            </p>

            <b>18%</b>
          </li>
        </ul>
      </div>
    </div>
  );
};
