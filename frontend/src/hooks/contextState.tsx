import create from "zustand";
import { ContextType } from "../components/Words";
import { api } from "../services/api";



export type wordsStateType = contextType[];

export interface wordsActionType {
  type: string;
  payload: number;
}


export const useWords = create((set) => ({
  words: [],
  init_words: (words: wordType[]) => set((state:any) => ({words: words})),
  delete_word: (index: number) =>
    set((state: any) => ({
      words: state.words.filter((w: string, i: number) => i !== index),
    })),
}));
