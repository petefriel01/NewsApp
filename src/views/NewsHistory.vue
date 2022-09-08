<script setup>
import {
    defineAsyncComponent, onBeforeMount,
} from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';

const OneColumn = defineAsyncComponent(() => import('@/layouts/OneColumn.vue'));
const NewsHistoryList = defineAsyncComponent(() => import('@/components/NewsHistoryList.vue'));

const store = useStore();

const {
    params: { article },
} = useRoute();

onBeforeMount(async () => {
    await store
        .dispatch('content/getNewsArticle', { article })
        .then((response) => {
            if (response) {
                store.dispatch('content/setActiveStory', response[0]);
            }
        });
});

</script>
<template>
    <OneColumn>
        <NewsHistoryList />
    </OneColumn>
</template>
