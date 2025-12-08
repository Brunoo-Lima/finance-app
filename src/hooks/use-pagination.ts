"use client";

import { useMemo, useState } from "react";

export const usePagination = <T>(
  data: T[],
  itemsPerPage: number,
  initialPage = 1,
) => {
  const [page, setPage] = useState(initialPage);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const paginatedData = useMemo(() => {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data.slice(startIndex, endIndex);
  }, [data, page, itemsPerPage]);

  const handlePageChange = (newPage: number) => {
    setPage(Math.max(1, Math.min(newPage, totalPages)));
  };

  return { page, totalPages, paginatedData, handlePageChange };
};
