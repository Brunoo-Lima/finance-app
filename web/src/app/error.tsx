'use client';

import { Button } from '@/components/ui/button/button';

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="error__wrapper">
      <h2>Algo deu errado</h2>
      <p>{error.message}</p>

      <Button variant="default" onClick={reset}>
        Tentar novamente
      </Button>
    </div>
  );
}
