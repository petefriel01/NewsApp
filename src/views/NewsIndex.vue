<script setup>
import {
    defineAsyncComponent, onBeforeMount, ref, watch,
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

const getSourceList = async () => {
    await store
        .dispatch('content/getNewsSources')
        .then((response) => {
            sources.value = response;
        });
};

const filterHeadlines = async (source) => {
    await store
        .dispatch('content/getNewsBySource', { source })
        .then((response) => {
            newsList.value = response;
        });
};

const handleDialog = ({ title, index }) => {
    isVisible.value = !isVisible.value;
    newsTitle.value = title;
    newsTitleId.value = index;
    isMaxLength.value = false;
};

const closeDialog = () => {
    isVisible.value = !isVisible.value;
};

// need function to update newsList.value with emitted value
// using array index as indentifier
// return new array with new title
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

const handleSearch = (value) => {
    searchText.value = value;
};

watch(
    () => searchText.value,
    debounce(async (query) => {
        try {
            console.log(query);
            await store
                .dispatch('content/getNewsBySearch', { query })
                .then((response) => {
                    newsList.value = response;
                });
        } catch (e) {
            console.log(e);
        }
    }, 1000),
);

onBeforeMount(async () => {
    loading.value = true;
    await store
        .dispatch('content/getNewsHeadlines')
        .then((response) => {
            newsList.value = response;
            loading.value = false;
        });
    getSourceList();
});
</script>

<template>
    <OneColumn>
        <v-row>
            <v-col>
                <h2 class="text-h4 dev mb-6">Headlines</h2>
            </v-col>
            <v-col>
                <router-link :to="{name: 'NewsHistory'}">History</router-link>
            </v-col>
            <v-col>
                <SearchWidget @update:model-value="handleSearch"/>
            </v-col>
            <v-col>
                <v-menu>
                    <template v-slot:activator="{ props }">
                        <v-btn
                            color="primary"
                            v-bind="props"
                        >
                            FILTER
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
            </v-col>
        </v-row>
        <v-row v-if="newsList">
            <v-col
                v-for="(news, index) in newsList"
                :key="`news-list-${index}`"
                cols="1"
                sm="3"
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
    </OneColumn>
    <AppSpinner v-if="loading"/>
    <AppModal
        :visible="isVisible"
        :maxLength="isMaxLength"
        @item-clicked="closeDialog"
        @update:model-value="updateTitle"
        :title="newsTitle"/>
</template>
