<script setup>
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';

const headlines = ref();
const route = useRoute();

watch(
    () => route.meta?.showLogo,
    async (metaLayout) => {
        try {
            headlines.value = metaLayout;
        } catch (e) {
            console.log(e);
        }
    },
    { immediate: true },
);

</script>
<template>
    <v-app-bar app class="bg-transparent" elevation="0">
        <v-container>
            <div class="d-flex flex-row">
                <h1 class="text-h3" v-if="headlines">News</h1>
                <router-link :to="{name: 'NewsIndex'}" v-else>Back</router-link>
            </div>
        </v-container>
    </v-app-bar>
</template>

<style>
</style>
