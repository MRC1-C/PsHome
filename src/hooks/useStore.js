import create from "zustand";

export const useStore = create((set) => ({
  userName: "",
  admin: false,
  monney: 0,
  monneynow: 0,
  foods: [],
  mess: [],
  count: 0,
  countMess: 0,
  serviceFee: 0,
  setCount: (value) => set(() => ({ count: value })),
  setCountMess: (value) => set(() => ({ countMess: value })),
  setServiceFee: (value) => set(() => ({ serviceFee: value })),
  setUserName: (value) => set(() => ({ userName: value })),
  setAdmin: (value) => set(() => ({ admin: value })),
  setFoods: (value) => set(() => ({ foods: value })),
  setMess: (value) => set(() => ({ mess: value })),
  setMonney: (value) => set(() => ({ monney: value })),
  setMonneyNow: (value) => set(() => ({ monneynow: value })),
}));
