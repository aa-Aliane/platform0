import React, { useEffect } from "react";
import { usePagination } from "../hooks/paginationState";

interface PaginationInfoProps {
  nb_words: number;
}

export const PaginationInfo: React.FC<PaginationInfoProps> = ({ nb_words }) => {
  const words_per_page = usePagination((state: any) => state.words_per_page);
  const set_words_per_page = usePagination(
    (state: any) => state.set_words_per_page
  );
  const set_nb_pages = usePagination((state: any) => state.set_nb_pages);
  const set_all_pages = usePagination((state: any) => state.set_all_pages);
  const current_page = usePagination((state: any) => state.current_page);
  const all_pages = usePagination((state: any) => state.all_pages);
  const set_current_page = usePagination(
    (state: any) => state.set_current_page
  );

  useEffect(() => {
    let i = 0;
    if (nb_words % words_per_page) i = 1;

    const nb_pages = Math.floor(nb_words / words_per_page) + i;
    set_nb_pages(Math.min(nb_pages, 10));
    set_all_pages(nb_pages);
  }, [nb_words, words_per_page]);

  return (
    <div className="pagination__info">
      <p>
        {current_page}/{all_pages}
      </p>
      <p>عدد الكلمات في القاموس : {nb_words}</p>
      <ul>
        <li
          onClick={() => {
            set_words_per_page(10);
            set_current_page(1);
          }}
        >
          10
        </li>
        <li
          onClick={() => {
            set_words_per_page(20);
            set_current_page(1);
          }}
        >
          20
        </li>
        <li
          onClick={() => {
            set_words_per_page(50);
            set_current_page(1);
          }}
        >
          50
        </li>
      </ul>
    </div>
  );
};

export const Pagination: React.FC = () => {
  const pages = usePagination((state: any) => state.pages);
  const current_page = usePagination((state: any) => state.current_page);
  const set_current_page = usePagination(
    (state: any) => state.set_current_page
  );
  const set_pages = usePagination((state: any) => state.set_pages);
  const all_pages = usePagination((state: any) => state.all_pages);

  return (
    <ul className="pagination__pages">
      {pages &&
        pages.map((page: any, i: number) => (
          <li>
            <button
              key={i}
              data-selected={page === current_page}
              className="btn btn--pagination"
              onClick={() => {
                set_current_page(page);
                if (page > 6 && all_pages > 10) {
                  set_current_page(page);
                  set_pages(page - 5, Math.min(page + 4, all_pages));
                } else {
                  console.log("pageeeeeeeee", page);
                  set_pages(1, Math.min(10, all_pages));
                }
              }}
            >
              {page}
            </button>
          </li>
        ))}
    </ul>
  );
};
