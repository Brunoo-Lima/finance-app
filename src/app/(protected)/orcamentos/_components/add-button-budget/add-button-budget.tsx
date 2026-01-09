import { Button } from "@/components/ui/button/button";
import { PlusIcon } from "lucide-react";

export const AddButtonBudget = () => {
  return (
    <>
      <Button variant="default">
        <PlusIcon size={18} />
        Novo Orçamento
      </Button>
    </>
  );
};
