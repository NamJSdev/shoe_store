import { create } from "zustand";

export interface ColorOption {
  value: string;
  label: string;
}
export type ShoeConfigsTypes = {
    id: number;
    code: string;
    desc: string;
}
export type ShoeModelsTypes = {
    id: number;
    code: string;
    name: string;
    price: string;
    style: string;
    desc: string;
    type: string;
    brand: string;
    material: string;
    sex: string;
    pictures: string;
    color: string;
}
export type ShoeProductsTypes = {
    id: number,
    status: string,
    size: string,
    color: string,
    price: string,
    style: string,
    desc: string,
    type: string,
    brand: string,
    material: string,
    sex: string,
    shoes_code: string,
    shoes_name: string,
    pictures: string
}

export interface SidebarState {
    isOpen: boolean;
    isMinimal: boolean;
    handleOpenOrClose: () => void;
    handleClose: () => void;
    handleChangeSidebar: () => void;
  }
export const useSidebarStore = create<SidebarState>()((set) => ({
    isOpen: false,
    isMinimal: false,
    handleOpenOrClose: () => set((state) => ({ ...state, isOpen: !state.isOpen })),
    handleClose: () => set((state) => ({ ...state, isOpen: false })),
    handleChangeSidebar: () => set((state) => ({ ...state, isMinimal: !state.isMinimal })),
  }));