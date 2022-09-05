import myAxios from '@/composables/useAxios';
import { make } from '@requarks/vuex-pathify';

const state = {
    loading: false,
};
const getters = {};
const mutations = {
    // creates SET_* functions
    ...make.mutations(state),
    startLoading(state) {
        state.loading = true;
    },
    stopLoading(state) {
        state.loading = false;
    },
    setNews(state, news) {
        state.news = news;
    },
};
    // https://newsapi.org/v2/top-headlines?country=us&apiKey=099148be22804e849a0c6fe022b7cf5e
const actions = {
    ...make.actions(state),
    async getNewsHeadlines() {
        const result = await myAxios
            .get(`${process.env.VUE_APP_NEWS_API_URL}/top-headlines?country=us&apiKey=${process.env.VUE_APP_NEWS_API_KEY}`)
            .then((response) => {
                console.log(response.data.articles);
                return response.data.articles || null;
            })
            .catch((error) => {
                console.log(error.message);
            });
        return result;
    },
    async getNewsBySearch(_, data, { commit }) {
        const news = await myAxios
            .get(
                `${process.env.VUE_APP_NEWS_API_URL}/top-headlines?country=us&q=${data.searchText}&apiKey=${process.env.VUE_APP_NEWS_API_KEY}`,
            )
            .then((response) => {
                commit('setNews', response.data); // save state change
                return response.data.Search || null;
            })
            .catch((error) => {
                console.log(error.message);
            });
        return news;
    },
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
};
