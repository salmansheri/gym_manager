import { create } from "zustand";

type useCreateSupplementModalType = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useCreateSupplementModal = create<useCreateSupplementModalType>(
  (set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
  })
);
