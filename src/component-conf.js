/**
 * @module Components 配置信息
 * @author phuhoang
 * ---------------------------------------------------------------------------
 */


import AppTip from '@/components/tip.component';

const AppComponents = { 
  AppTip 
};

const install = Vue => {
  if (install.installed) return;
  Object.keys(AppComponents).forEach(key => Vue.component(key, AppComponents[key]));
 /*  Object.keys(AppComponents).forEach((key,value) => {
    console.log(key, value, AppComponents[key])
    Vue.component(key, AppComponents[key])
  }); */
};

export default {
  version: '0.0.1',
  install,
}