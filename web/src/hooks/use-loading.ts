'use client';

import { useState, useEffect } from 'react';

export function useLoading(initialState = true, delay = 500) {
  const [loading, setLoading] = useState(initialState);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return loading;
}
