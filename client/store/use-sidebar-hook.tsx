import { create } from "zustand";

type sidebarAtom = {
    isExpanded: boolean,
    onOpen: () => void,
    onClose: () => void,
    onToggle: () => void
};

export const useSidebar = create<sidebarAtom>((set, get) => ({
    isExpanded: false,
    onOpen: () => set({ isExpanded: true }),
    onClose: () => set({isExpanded: false}),
    onToggle: () => set({ isExpanded: !get().isExpanded })
}))