import create from "zustand";
import { wordType } from "../components/Words";
import { api } from "../services/api";



export type wordsStateType = wordType[];

export interface wordsActionType {
  type: string;
  payload: number;
}


export const useWords = create((set) => ({
  n_words : 0,
  words: [],
  init_words: (words: wordType[]) => set((state:any) => ({words: words, n_words: words.length})),
  confirm_delete : (index: number) => set((state:any) =>({words: state.words.map((w:wordType, i:number) =>{
    if (i===index){
      const ret = w;
      w.step += 1;
      return ret
    }
    return w;
  })})),
  delete_word: (index: number) =>
    set((state: any) => ({
      words: state.words.filter((w: string, i: number) => i !== index),
    })),
}));
