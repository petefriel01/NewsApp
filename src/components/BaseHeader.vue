<script setup>
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';

const headlines = ref();
const route = useRoute();

/**
 * Watch route meta data to show/hide logo
 */
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
    <v-app-bar app class="bg-white" elevation="0">
        <v-container>
            <div class="d-flex flex-row">
                <router-link
                    v-if="headlines"
                    to="/"
                    class="text-decoration-none mx-auto mr-sm-auto ml-sm-0">
                    <h1 class="text-h3 font-weight-black text-black text-center"
                    >NEWS<span class="text-grey">TODAY</span>
                    </h1>
                </router-link>
                <v-btn :to="{name: 'NewsIndex'}" v-else>Back</v-btn>
            </div>
        </v-container>
    </v-app-bar>
</template>

<style>
</style>
