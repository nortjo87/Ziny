// config/store/global.js
import { create } from 'zustand';

const useGlobalStore = create((set) => ({
  uid:'',
  type: '',// type value is 'HPP' or 'Note'
  jOrN: '',// jOrN value is 'new' or 'join'
  projectName: '',
  projectCode: '',
  // projectNameList: [],
  // projectCodeList: [],
  // projectTypeList:[],



  setType: (type) => set(() => ({ type })),
  setJOrN: (jOrN) => set(() => ({ jOrN })),
  setUid: (uid) => set(() => ({ uid })),
  setProjectName: (projectName) => set(() => ({ projectName })),
  setProjectCode: (projectCode) => set(() => ({ projectCode })),
  // setProjectNameList: (projectNameList) => set(() => ({ projectNameList })),
  // setProjectCodeList: (projectCodeList) => set(() => ({ projectCodeList })),
  // setProjectTypeList: (projectTypeList) => set(() => ({ projectTypeList })),



}));

export default useGlobalStore;
