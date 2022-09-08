<script setup>
import { defineAsyncComponent, onBeforeMount } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';

const OneColumn = defineAsyncComponent(() => import('@/layouts/OneColumn.vue'));
const NewsShowCard = defineAsyncComponent(() => import('@/components/NewsShowCard.vue'));

const store = useStore();
const {
    params: { article },
} = useRoute();

onBeforeMount(async () => {
    if (article) {
        await store
            .dispatch('content/getNewsArticle', { article, filter: store.get('content/source') })
            .then((response) => {
                store.dispatch('content/setActiveStory', response[0]);
            });
    }
});
</script>
<template>
    <OneColumn>
        <NewsShowCard />
    </OneColumn>
</template>
