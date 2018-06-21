import { storage } from './storageTool';
// 获取Token
export let getToken = (key, callback, errorCallback) => {
  storage.load(key, callback, errorCallback);
};
//设置token
export const setToken = (key, token) => {
  storage.save(key, token);
};

//删除token
export const delToken = key => {
  storage.remove(key);
};
