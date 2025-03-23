import { create } from "zustand";

export const useComponentsState = create((set) => ({
  componentsJson: null,
  setComponents: (data: any) => set((state) => ({ componentsJson: data })),
  reset: () => set({ componentsJson: null }),
}));
