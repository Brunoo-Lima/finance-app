import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { transactionsList } from "@/mocks/transactions-list";
import { CardTransaction } from "./card-transaction";

export const Transactions = () => {
  return (
    <Card className="rounded-[20px] p-6">
      <CardHeader className="flex items-center justify-between border-b border-b-accent p-0">
        <CardTitle>Transações</CardTitle>

        <Button variant="outline" className="rounded-full w-max">
          Ver mais
        </Button>
      </CardHeader>

      <CardContent className="space-y-6 p-0">
        {transactionsList.map((transaction) => (
          <CardTransaction key={transaction.id} transaction={transaction} />
        ))}
      </CardContent>
    </Card>
  );
};
