/**
 * @module Axios 配置信息
 */

import axios from 'axios';
import VueAxios from 'vue-axios';
import Qs from 'qs';

export default (Vue, ElementUI, Store) => {
    axios.interceptors.request.use(res => {
        /* ------------ 加载token ------------- */
        /*  console.log(Store.state.LoginStore.userInfo) */
        res.data.token = Store.state.LoginStore.userInfo.token;
        //res.data.userName = Store.state.LoginStore.userInfo.userName;
        /* ------------ 序列化参数 ------------- */
        if (res.method === 'post') res.data = Qs.stringify(res.data);
        res.timeout = 5000;
        return res;
    });

    /* ----------------- 返回结果拦截, 如未登录直接跳转到登录页 ----------------- */
    axios.interceptors.response.use(res => {
        if (res.data.code && res.data.code == 1003) {
            // router.push('/login');
            window.location.href = 'http://192.168.1.159:8080/';
            //window.location.href = 'http://tusercenter.beibeiyue.cn/c/';
            //window.location.href = 'http://usercenter.beibeiyue.com/c/';
        }
        return res;
    }, err => {
        ElementUI.Message.error('请求错误, 请刷新页面重试~');
        // return Promise.reject(err);
        return err;
    })

    /* ------------------------- 默认请求格式, 和全局请求地址 ------------------------- */
    axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
    const Env = process.env.NODE_ENV === 'production' ? 'build' : 'dev';
    const Domain = require('../config')[Env].env.domain.replace(/"/g, '');
    axios.defaults.baseURL = Domain;

    Vue.use(VueAxios, axios);
}
