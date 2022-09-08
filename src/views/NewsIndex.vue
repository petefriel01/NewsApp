<script setup>
import {
    defineAsyncComponent, onBeforeMount, ref, watch, computed,
} from 'vue';
import { useStore } from 'vuex';
import debounce from 'lodash/debounce';

const OneColumn = defineAsyncComponent(() => import('@/layouts/OneColumn.vue'));
const AppModal = defineAsyncComponent(() => import('@/components/AppModal.vue'));
const AppSpinner = defineAsyncComponent(() => import('@/components/AppSpinner.vue'));
const NewsCard = defineAsyncComponent(() => import('@/components/NewsCard.vue'));
const SearchWidget = defineAsyncComponent(() => import('@/components/SearchWidget.vue'));
const store = useStore();
const newsList = ref([]);
const isVisible = ref(false);
const newsTitle = ref();
const newsTitleId = ref();
const isMaxLength = ref(false);
const searchText = ref();
const sources = ref();
const loading = ref(false);
const isError = ref(false);
const error = computed(() => store.get('content/error'));

/**
 * Catch emitted search text from SearchWidget.
 */
const handleSearch = (value) => {
    searchText.value = value;
};

/**
 * Close dialog action.
 */
const closeDialog = () => {
    isVisible.value = !isVisible.value;
};

const showArticleAlert = computed(() => {
    if (!isError.value && !loading.value) {
        return true;
    }
    return false;
});

/**
 * Controls dialog UI actions.
 *
 * @param {string} title new title st
 * @param {number} index id of new article to edit
 */
const handleDialog = ({ title, index }) => {
    isVisible.value = !isVisible.value;
    newsTitle.value = title;
    newsTitleId.value = index;
    isMaxLength.value = false;
};

/**
 * Returns list of new sources for ddl.
 *
 * @return {array}
 */
const getSourceList = async () => {
    await store
        .dispatch('content/getNewsSources')
        .then((response) => {
            sources.value = response;
        });
};

/**
 * Returns news articles by news source.
 *
 * @param {string} source new source id
 * @return {array} all new stories by id
 */
const filterHeadlines = async (source) => {
    loading.value = true;
    await store
        .dispatch('content/getNewsBySource', { source })
        .then((response) => {
            newsList.value = response;
            store.set('content/source', source);
            loading.value = false;
        });
};

/**
 * Handles inline title edit.
 *
 * @param {string} newTitle new title as per edit
 * @return {string} updated title
 */
const updateTitle = (newTitle) => {
    if (newTitle.length > 255) {
        isMaxLength.value = true;
        return;
    }
    isMaxLength.value = false;
    newsList.value = newsList.value.map((item, index) => {
        const temp = { ...item };
        if (index === newsTitleId.value) {
            temp.title = newTitle;
        }
        return temp;
    });
};

/**
 * Watch search query to execute new search.
 *
 * @param {string} searchText the search query text
 * @return {array} news list of matched articles
 */
watch(
    () => searchText.value,
    debounce(async (query) => {
        try {
            loading.value = true;
            await store
                .dispatch('content/getNewsBySearch', { query })
                .then((response) => {
                    newsList.value = response;
                    loading.value = false;
                });
        } catch (e) {
            console.log(e);
        }
    }, 1000),
);

/**
 * Returns error from erroneous api call.
 *
 * @return {array} axios error.
 */
const showError = async () => {
    loading.value = true;
    await store
        .dispatch('content/getNewsError')
        .then(() => {
            newsList.value = [];
            isError.value = true;
            loading.value = false;
        });
};

/**
 * Returns list of news headlines.
 *
 * @return {array}
 */
const getHeadlines = async () => {
    loading.value = true;
    await store
        .dispatch('content/getNewsHeadlines')
        .then((response) => {
            newsList.value = response;
            loading.value = false;
        });
};

/**
 * Handle error alert close on clickoutside.
 */
const onErrorOutside = () => {
    isError.value = !isError.value;
    getHeadlines();
};

onBeforeMount(async () => {
    console.log('on before mount');
    store.set('content/source', '');
    getHeadlines();
    getSourceList();
});
</script>
<template>
    <OneColumn>
        <v-row class="d-flex align-center">
            <v-col cols="12" xs="12" lg="4">
                <h2 class="text-h4">Headlines</h2>
            </v-col>
            <v-col cols="12" xs="12" lg="4"  class="d-flex align-center">
                <SearchWidget @update:model-value="handleSearch"/>
            </v-col>
            <v-col  cols="12" xs="12" lg="4" class="d-flex justify-end">
                <v-menu>
                    <template v-slot:activator="{ props }">
                        <v-btn
                            v-bind="props"
                        >
                            Filter
                        </v-btn>
                    </template>
                    <v-list>
                        <v-list-item
                            v-for="(source, index) in sources"
                            :key="index"
                            :value="source.id"
                            @click="filterHeadlines(source.id)"
                        >
                            <v-list-item-title>{{ source.name }}</v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-menu>
                <v-btn :to="{name: 'NewsHistory'}" class="mx-3">History</v-btn>
                <v-btn @click="showError()">Error</v-btn>
            </v-col>
        </v-row>
        <v-divider class="my-8"></v-divider>
        <v-alert type="warning"
                 v-if="isError"
                 v-click-outside="onErrorOutside"
                 @click="isError = true">
            {{error}}
        </v-alert>
        <v-row v-if="newsList.length > 0">
            <v-col
                v-for="(news, index) in newsList"
                :key="`news-list-${index}`"
                cols="12" xs="12" sm="6" md="4" lg="3"
            >
                <NewsCard
                    :v-if="news.urlToImage"
                    :source="news.source.name"
                    :title="news.title"
                    :content="news.content"
                    :image="news.urlToImage"
                    :url="news.url"
                    :index="index"
                    @item-clicked="handleDialog"
                />
            </v-col>
        </v-row>
        <div v-else-if="showArticleAlert"
             class="d-flex justify-center align-center my-16 py-16">
            <p class="font-weight-bold">NO ARTCLES FOUND.</p>
        </div>
    </OneColumn>
    <AppSpinner v-if="loading"/>
    <AppModal
        :visible="isVisible"
        :maxLength="isMaxLength"
        @item-clicked="closeDialog"
        @update:model-value="updateTitle"
        :title="newsTitle"/>
</template>
<style>
.dev{
    border: solid 1px red;;
}
</style>
