<script setup>
import { defineAsyncComponent, onBeforeMount, ref } from 'vue';
import { useStore } from 'vuex';

const OneColumn = defineAsyncComponent(() => import('@/layouts/OneColumn.vue'));
const NewsCard = defineAsyncComponent(() => import('@/components/NewsCard.vue'));

const store = useStore();
const newsList = ref(null);

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
        <h1> Headlines</h1>
        <v-container class="bg-surface-variant">
            <v-row no-gutters>
                <v-col
                    v-for="(news) in newsList"
                    :key="news.title"
                    cols="12"
                    sm="4"
                >
                    <NewsCard
                        :date="date"
                        :title="news.title"
                        :content="news.content"
                    />
                </v-col>
            </v-row>
        </v-container>
    </OneColumn>
</template>
