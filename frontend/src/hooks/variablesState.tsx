import create from "zustand";

export const useNewContext = create((set) => ({
  newContext: false,
  change_context: () =>
    set((state: any) => ({
      newContext: state.newContext === false ? true : false,
    })),
}));
