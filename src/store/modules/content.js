import myAxios from '@/composables/useAxios';
import formatTitle from '@/composables/utils';
import { make } from '@requarks/vuex-pathify';

const state = {
    loading: false,
    stories: {
        active: {},
    },
    history: [],
    error: '',
};
const getters = {};
const mutations = {
    ...make.mutations(state),
    setActiveStory(state, story) {
        state.stories.active = story;
    },
    setNewsList(state, news) {
        state.news = news;
    },
    saveHistory(state, headline) {
        state.history.unshift(headline);
    },
    setError(state, error) {
        state.error = error;
    },
};

const actions = {
    ...make.actions(state),
    setActiveStory({ commit }, story) {
        commit('setActiveStory', story);
    },
    async getNewsHeadlines({ commit }) {
        const headlines = await myAxios
            .get(`${process.env.VUE_APP_NEWS_API_URL}/top-headlines?country=us&apiKey=${process.env.VUE_APP_NEWS_API_KEY}`)
            .then((response) => {
                commit('setNewsList', response.data.articles);
                return response.data.articles || null;
            })
            .catch((error) => {
                console.log(error.message);
            });
        return headlines;
    },
    async getNewsSources() {
        const headlines = await myAxios
            .get(`${process.env.VUE_APP_NEWS_API_URL}/sources?apiKey=${process.env.VUE_APP_NEWS_API_KEY}`)
            .then((response) => response.data.sources || null)
            .catch((error) => {
                console.log(error.message);
            });
        return headlines;
    },
    async getNewsBySource({ commit }, data) {
        console.log(data.source);
        const headlines = await myAxios
            .get(`${process.env.VUE_APP_NEWS_API_URL}/top-headlines?sources=${data.source}&apiKey=${process.env.VUE_APP_NEWS_API_KEY}`)
            .then((response) => {
                commit('setNewsList', response.data.articles);
                console.log(response.data.articles);
                return response.data.articles || null;
            })
            .catch((error) => {
                console.log(error.message);
            });
        return headlines;
    },
    async getNewsArticle({ commit }, data) {
        const news = await myAxios
            .get(`${process.env.VUE_APP_NEWS_API_URL}/top-headlines?country=us&apiKey=${process.env.VUE_APP_NEWS_API_KEY}`)
            .then((response) => {
                const newsStory = response.data.articles.filter(
                    (item) => formatTitle(item.title) === data.article,
                );
                commit('saveHistory', newsStory[0].title);
                return newsStory || null;
            })
            .catch((error) => {
                console.log(error.message);
            });
        return news;
    },
    async getNewsBySearch(_, data) {
        const news = await myAxios
            .get(
                `${process.env.VUE_APP_NEWS_API_URL}/top-headlines?country=us&q=${data.query}&apiKey=${process.env.VUE_APP_NEWS_API_KEY}`,
            )
            .then((response) => {
                console.log(response);
                return response.data.articles || null;
            })
            .catch((error) => {
                console.log(error.message);
            });
        return news;
    },
    async getNewsError({ commit }) {
        const error = await myAxios
            .get(
                `${process.env.VUE_APP_NEWS_API_URL}/sources?&apiKey`,
            )
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                commit('setError', error.response.data.message || error.message);
                console.log(error.response.data.message || error.message);
            });
        return error;
    },
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
};
