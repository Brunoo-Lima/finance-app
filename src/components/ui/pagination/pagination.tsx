import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import ReactPaginate from "react-paginate";

import s from "./_pagination.module.scss";

interface IPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (selectedPage: number) => void;
  marginLeft: "auto" | "0";
}

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  marginLeft,
}: IPaginationProps) => {
  const handlePageClick = (event: { selected: number }) => {
    onPageChange(event.selected + 1);
  };

  return (
    <div className={s.pagination__wrapper} style={{ marginLeft: marginLeft }}>
      <p className={s.text}>
        Mostrando página {currentPage} de {totalPages}
      </p>

      <ReactPaginate
        breakLabel="..."
        nextLabel={<ChevronRightIcon color="currentColor" />}
        previousLabel={<ChevronLeftIcon color="currentColor" />}
        pageCount={totalPages}
        forcePage={currentPage - 1}
        pageRangeDisplayed={3}
        marginPagesDisplayed={1}
        onPageChange={handlePageClick}
        containerClassName={s.pagination__container}
        pageClassName={s.page__item}
        pageLinkClassName={s.pageLink}
        activeClassName={s.active__page}
        previousClassName={s.button}
        nextClassName={s.button}
        breakClassName={s.break__item}
        disabledClassName={s.disabled}
        renderOnZeroPageCount={null}
      />
    </div>
  );
};
