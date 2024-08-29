import { create } from "zustand";

type useMenuStateProps = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useMenu = create<useMenuStateProps>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
