<script setup>
import { defineAsyncComponent, onBeforeMount, ref } from 'vue';
import { useStore } from 'vuex';

const OneColumn = defineAsyncComponent(() => import('@/layouts/OneColumn.vue'));
const NewsCard = defineAsyncComponent(() => import('@/components/NewsCard.vue'));

const store = useStore();
const newsList = ref([]);

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
        <h2 class="text-h4">Headlines</h2>
        <v-row v-if="newsList">
            <v-col
                v-for="(news, index) in newsList"
                :key="news.source.id"
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
                    class="dev"
                />
            </v-col>
        </v-row>
    </OneColumn>
</template>
