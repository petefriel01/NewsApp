<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const activeStory = computed(() => store.get('content/stories@active'));

</script>
<template>
    <p>{{activeStory.title}}</p>
    <p>{{activeStory.author}}</p>
    <p>{{activeStory.description}}</p>
    <p>{{activeStory.url}}</p>
    <p>{{activeStory.urlToImage}}</p>
    <p>{{activeStory.publishedAt}}</p>
    <p>{{activeStory.content}}</p>
</template>
<style>

</style>
