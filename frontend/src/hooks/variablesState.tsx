import create from "zustand";

export const useNewContext = create((set) => ({
  newContext: false,
  change_context: () =>
    set((state: any) => ({
      newContext: state.newContext === false ? true : false,
    })),
}));

export const usePreviews = create((set) => ({
  previews: [],
  init_previews: (previews: boolean[]) =>
    set((state: any) => ({ previews: previews })),
  add_preview: (preview: boolean) =>
    set((state: any) => ({ previews: [...state.previews, preview] })),
  change_preview: (index: number) =>
    set((state: any) => ({
      previews: state.previews.map((p: boolean, i: number) => {
        if (i === index) {
          return p === false ? true : false;
        }
        return false;
      }),
    })),
  close_all: () =>
    set((state: any) => ({ previews: state.previews.map((p: any) => false) })),
}));
