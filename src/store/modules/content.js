import myAxios from '@/composables/useAxios';
import formatTitle from '@/composables/utils';
import { make } from '@requarks/vuex-pathify';

const state = {
    loading: false,
    stories: {
        active: {},
    },
};
const getters = {};
const mutations = {
    // creates SET_* functions
    ...make.mutations(state),
    setActiveStory(state, story) {
        state.stories.active = story;
    },
    startLoading(state) {
        state.loading = true;
    },
    stopLoading(state) {
        state.loading = false;
    },
    setNewsList(state, news) {
        state.news = news;
    },
};
    // https://newsapi.org/v2/top-headlines?country=us&apiKey=099148be22804e849a0c6fe022b7cf5e
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
    async getNewsArticle(_, data) {
        const news = await myAxios
            .get(`${process.env.VUE_APP_NEWS_API_URL}/top-headlines?country=us&apiKey=${process.env.VUE_APP_NEWS_API_KEY}`)
            .then((response) => {
                const newsStory = response.data.articles.filter(
                    (item) => formatTitle(item.title) === data.article,
                );
                console.log(newsStory);
                // commit('setActiveStory', newsStory);
                return newsStory || null;
            })
            .catch((error) => {
                console.log(error.message);
            });
        return news;
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
