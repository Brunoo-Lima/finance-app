import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { transactionsList } from "@/mocks/transactions-list";
import { CardTransaction } from "./card-transaction";
import Link from "next/link";

export const Transactions = () => {
  return (
    <Card className="rounded-[20px] p-6 bg-[#0B0B0D]">
      <CardHeader className="flex items-center justify-between border-b border-b-accent p-0">
        <CardTitle>Transações</CardTitle>

        <Link
          href={"/transacoes"}
          className="rounded-full w-max text-sm font-semibold border border-accent px-3 py-1 hover:bg-accent/95 transition-all duration-300"
        >
          Ver mais
        </Link>
      </CardHeader>

      <CardContent className="space-y-6 p-0">
        {transactionsList.map((transaction) => (
          <CardTransaction key={transaction.id} transaction={transaction} />
        ))}
      </CardContent>
    </Card>
  );
};
