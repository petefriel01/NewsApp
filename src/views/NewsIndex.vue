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

const error = computed(() => store.get('content/error'));

const getSourceList = async () => {
    await store
        .dispatch('content/getNewsSources')
        .then((response) => {
            sources.value = response;
        });
};

const filterHeadlines = async (source) => {
    loading.value = true;
    await store
        .dispatch('content/getNewsBySource', { source })
        .then((response) => {
            newsList.value = response;
            loading.value = false;
        });
};

const showError = async () => {
    loading.value = true;
    await store
        .dispatch('content/getNewsError')
        .then(() => {
            newsList.value = [];
            loading.value = false;
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
        if (!searchText.value) return;
        try {
            loading.value = true;
            console.log(query);
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
        <v-row class="d-flex align-center dev">
            <v-col>
                <h2 class="text-h4 dev">Headlines</h2>
            </v-col>
            <v-col class="d-flex align-center dev">
                <SearchWidget @update:model-value="handleSearch"/>
            </v-col>
            <v-col class="d-flex justify-end">
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
        <v-alert type="warning" v-if="error">
            {{error}}
        </v-alert>
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

<style scoped>
/* .dev{
    border: solid 1px red;
} */
</style>
