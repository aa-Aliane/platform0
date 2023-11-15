import create from "zustand";
import { wordType } from "../components/Words";
import { api } from "../services/api";

export type wordsStateType = wordType[];

export interface wordsActionType {
  type: string;
  payload: number;
}

const postFailedWordDel = (id: any) => {
  const refresh = localStorage.getItem("refresh");
  api.post("token/refresh/", { refresh: refresh }).then((res) => {
    localStorage.setItem("access", res.data.access);
    api.defaults.headers.common["Authorization"] = `Bearer ${res.data.access}`;
  });
  api.delete("words/" + String(id));
};

export const useWords = create((set) => ({
  updated: false,
  n_words: 0,
  n_filtered: 0,
  n_selected: 0,
  d_selected_step: 0,
  words: [],
  filtered: [],
  filter: "",
  display_words: [],
  set_updated: (value: Boolean) =>
    set(() => ({
      updated: value,
    })),
  refresh: () =>
    set(() => {
      const refresh = localStorage.getItem("refresh");
      api.post("token/refresh/", { refresh: refresh }).then((res) => {
        localStorage.setItem("access", res.data.access);
        api.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${res.data.access}`;
      });
    }),
  setFilter: (filter: string) =>
    set(() => ({
      filter: filter,
    })),
  init_words: (words: wordType[]) =>
    set(() => ({
      words: words.map((w: any) => {
        return { ...w, is_selected: false };
      }),
      n_words: words.length,
    })),
  set_filtered: (ws: wordType[]) =>
    set(() => ({
      filtered: ws.map((w: any) => {
        return w;
      }),
    })),
  confirm_delete: (index: number) =>
    set((state: any) => ({
      filtered: state.filtered.map((w: wordType, i: number) => {
        if (i === index) {
          const ret = w;
          w.step += 1;
          return ret;
        }
        return w;
      }),
    })),
  delete_word: (index: number, id: number) =>
    set((state: any) => ({
      filtered: state.filtered.filter((w: any, i: number) => {
        if (i !== index) return true;
        api.delete("words/" + String(id)).catch((err) => postFailedWordDel(id));
      }),
      n_words: state.n_words - 1,
      updated: true,
    })),

  confirm_d_selected: () =>
    set((state: any) => ({
      d_selected_step:
        state.d_selected_step < 3 ? state.d_selected_step + 1 : 0,
    })),
  delete_selected: () =>
    set((state: any) => ({
      filtered: state.filtered.filter((w: wordType) => {
        if (!w.is_selected) return w;
        api.delete("words/" + String(w.id)).catch((err) => {
          const refresh = localStorage.getItem("refresh");
          api.post("token/refresh/", { refresh: refresh }).then((res) => {
            localStorage.setItem("access", res.data.access);
            api.defaults.headers.common[
              "Authorization"
            ] = `Bearer ${res.data.access}`;
            api.delete("words/" + String(w.id));
          });
        });
      }),
      n_selected: 0,
      d_selected_step: 0,
      n_words: state.words.filter((w: wordType) => !w.is_selected).length,
    })),

  select_word: (index: number, value: Boolean) =>
    set((state: any) => ({
      filtered: state.filtered.map((w: wordType, i: number) => {
        if (i === index) return { ...w, is_selected: value };
        else return w;
      }),
      n_selected: value ? state.n_selected + 1 : state.n_selected - 1,
    })),
}));
