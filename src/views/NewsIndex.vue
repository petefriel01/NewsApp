<script setup>
import { defineAsyncComponent, onBeforeMount, ref } from 'vue';
import { useStore } from 'vuex';

const OneColumn = defineAsyncComponent(() => import('@/layouts/OneColumn.vue'));
const NewsCard = defineAsyncComponent(() => import('@/components/NewsCard.vue'));
const AppModal = defineAsyncComponent(() => import('@/components/AppModal.vue'));

const store = useStore();
const newsList = ref([]);
const isVisible = ref(false);
const newsTitle = ref();
const newsTitleId = ref();

const handleDialog = ({ title, index }) => {
    isVisible.value = !isVisible.value;
    newsTitle.value = title;
    newsTitleId.value = index;
};

const closeDialog = () => {
    isVisible.value = !isVisible.value;
};

// need function to update newsList.value with emitted value
// using array index as indentifier
const updateTitle = (newTitle) => {
    // return new array with new title
    newsList.value = newsList.value.map((item, index) => {
        const temp = { ...item };
        if (index === newsTitleId.value) {
            temp.title = newTitle;
        }
        return temp;
    });
};

onBeforeMount(async () => {
    await store
        .dispatch('content/getNewsHeadlines')
        .then((response) => {
            newsList.value = response;
        });
});
</script>

<template>
    <OneColumn>
        <v-row>
            <v-col>
                <h2 class="text-h4 dev mb-6">Headlines</h2>
            </v-col>
        </v-row>
        <v-row v-if="newsList">
            <v-col
                v-for="(news, index) in newsList"
                :key="`news-list-${index}`"
                cols="1"
                sm="3"
                class="dev"
            >
                <NewsCard
                    :v-if="news.urlToImage"
                    :date="news.publishedAt"
                    :title="news.title"
                    :content="news.content"
                    :image="news.urlToImage"
                    :url="news.url"
                    :index="index"
                    @item-clicked="handleDialog"
                    class="dev"
                />
            </v-col>
        </v-row>
    </OneColumn>
    <AppModal
        :visible="isVisible"
        @item-clicked="closeDialog"
        @update:model-value="updateTitle"
        :title="newsTitle"/>
</template>
