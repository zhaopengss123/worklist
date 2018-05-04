import Vue from 'vue'

/**
 * @module ElementUI
 * ---------------------------------------------------------------------------
 */
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)
    /**
     * @module baseCss
     * ---------------------------------------------------------------------------
     */
import '!style-loader!css-loader!less-loader!@less/reset.less';
import '!style-loader!css-loader!less-loader!@less/iconfont.less';

/**
 * @module Vuex
 * ---------------------------------------------------------------------------
 */
import stores from './store-conf';
const store = stores(Vue);


/**
 * @module Axios
 * ---------------------------------------------------------------------------
 */
import Axios from './axios-conf';
Axios(Vue, ElementUI, store);


/**
 * @module Filter
 * ---------------------------------------------------------------------------
 */
import Filter from './filter-conf';
Filter(Vue);


/**
 * @module Components
 * ---------------------------------------------------------------------------
 */
import AppComponents from './component-conf';
Vue.use(AppComponents);



/**
 * @module VueQuillEditor 
 */
import VueQuillEditor from 'vue-quill-editor'
Vue.use(VueQuillEditor)

/**
 * @module Vue
 * ---------------------------------------------------------------------------
 */
import App from './App';
import router from './router';
Vue.config.productionTip = false;
new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App }
});