import { create } from "zustand";

type UseEditMemberModalType = {
  id: string;
  isOpen: boolean;
  onOpen: (id: string) => void;
  onClose: () => void;
};

export const useEditMemberModal = create<UseEditMemberModalType>((set) => ({
  id: "",
  isOpen: false,
  onOpen: (id: string) => set({ isOpen: true, id: id }),
  onClose: () => set({ isOpen: false, id: "" }),
}));
