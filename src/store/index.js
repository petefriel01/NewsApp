import { createStore } from 'vuex';
import pathify from '@requarks/vuex-pathify';
import content from './modules/content';

export default createStore({
    state() {},
    mutations: {},
    getters: {},
    actions: {},
    modules: {
        content,
    },
    plugins: [pathify.plugin],
});
