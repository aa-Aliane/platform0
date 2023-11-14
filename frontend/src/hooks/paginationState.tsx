import create from "zustand";
import { range } from "../utils";

interface PaginationState {
  words_per_page: number;
  nb_pages: number;
  all_pages: number;
  pages: number[];
  current_page: number;
}

export const usePagination = create<PaginationState>((set) => ({
  words_per_page: 10,
  nb_pages: 0,
  all_pages: 0,
  pages: range(0, 5, 1),
  current_page: 1,
  set_words_per_page: (nb: number) => set(() => ({ words_per_page: nb })),
  set_pages: (start: number, end: number) =>
    set(() => ({ pages: range(start, end, 1) })),
  set_nb_pages: (nb: number) =>
    set(() => ({ nb_pages: nb, pages: range(1, nb, 1) })),
  set_all_pages: (nb: number) => set(() => ({ all_pages: nb })),
  set_current_page: (page: number) =>
    set(() => ({
      current_page: page,
    })),
}));
