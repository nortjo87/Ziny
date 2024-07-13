// config/store/global.js
import { create } from 'zustand';

const useGlobalStore = create((set) => ({
  name: 'Ziny',
  setName: (name) => set(() => ({ name })),
}));

export default useGlobalStore;
