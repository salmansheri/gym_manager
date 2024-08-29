import { create } from "zustand";

type useCreateMemberModalState = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useCreateMemberModal = create<useCreateMemberModalState>(
  (set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
  })
);
