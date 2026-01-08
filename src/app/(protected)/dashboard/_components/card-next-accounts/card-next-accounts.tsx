import s from "./_card-next-accounts.module.scss";

export const CardNextAccounts = () => {
  return (
    <div className={s.card__next__account__container}>
      <div className={s.sub__header}>
        <p>Próximas contas</p>
      </div>

      <div className={s.accounts__container}>
        {[1, 2, 3].map((index) => (
          <div key={index} className={s.account}>
            <div className={s.text__container}>
              <p>Cartao de credito</p>
              <small>Venc: 15/12/2025</small>
            </div>

            <strong>R$ 2.700</strong>
          </div>
        ))}
      </div>
    </div>
  );
};
