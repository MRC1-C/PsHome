import create from "zustand";

export const useStore = create((set) => ({
  userName: "",
  monney: 0,
  timeplay: 1000,
  foods: [],
  setUserName: (value) => set(() => ({ userName: value })),
  setMonney: (value) => set(() => ({ monney: value })),
  setFoods: (value) => set(() => ({ foods: value })),
  setTimePlay: (value) => set(() => ({ timeplay: value })),
}));
