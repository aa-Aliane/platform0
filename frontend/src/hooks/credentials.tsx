import create from "zustand";
import { wordType } from "../components/Words";
import { api } from "../services/api";

export type wordsStateType = wordType[];

export interface wordsActionType {
  type: string;
  payload: number;
}

export const useCredentials = create((set) => ({
  access: "",
  refresh: "",
  words: [],
  set_access: (token: string) => set((state: any) => ({ access: token })),
  set_refresh: (token: string) => set((state: any) => ({ refresh: token })),
}));
