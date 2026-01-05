import { Button } from "@/components/ui/button/button";
import { PlusIcon } from "lucide-react";

export const AddButtonGoal = () => {
  return (
    <>
      <Button variant="default">
        <PlusIcon size={16} />
        Nova meta
      </Button>
    </>
  );
};
