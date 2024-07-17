// config/store/global.js
import { create } from 'zustand';

const useGlobalStore = create((set) => ({
  type: '',// type value is 'HPP' or 'Note'
  jOrN: '',// jOrN value is 'new' or 'join'
  projectName: '',
  projectCode: '',



  setType: (type) => set(() => ({ type })),
  setJOrN: (jOrN) => set(() => ({ jOrN })),
  setProjectName: (projectName) => set(() => ({ projectName })),
  setProjectCode: (projectCode) => set(() => ({ projectCode })),


}));

export default useGlobalStore;
