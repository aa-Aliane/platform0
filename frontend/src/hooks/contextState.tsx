import create from "zustand";
import { api } from "../services/api";

export interface ContextType {
  id: number;
  word_id: number;
  context: string;
  keywords: string[];
  ref: string;
}

export type contextsStateType = ContextType[];

export interface contextsActionType {
  type: string;
  payload: any;
}

export const useContext = create((set) => ({
  contexts: [],
  init_contexts: (contexts: ContextType[]) =>
    set((state: any) => ({ contexts: contexts })),
  add_context: (context: ContextType) =>
    set((state: any) => ({
      contexts: [...state.contexts, context],
    })),
  delete_context: (index: number) =>
    set((state: any) => ({
      contexts: state.contexts.filter((w: string, i: number) => i !== index),
    })),
  update_context: (index: number, context: ContextType) =>
    set((state: any) => ({
      contexts: state.contexts.map((c: ContextType, i: number) => {
        console.log("fucking ", context);
        if (i === index) {
          return context;
        }
        return c;
      }),
    })),
}));
