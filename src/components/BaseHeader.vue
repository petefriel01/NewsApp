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
    <v-app-bar app class="bg-white" elevation="0">
        <v-container>
            <div class="d-flex flex-row">
                <h1 class="text-h3 font-weight-black text-center"
                    v-if="headlines">NEWS<span class="text-grey">TODAY</span>
                </h1>
                <v-btn :to="{name: 'NewsIndex'}" v-else>Back</v-btn>
            </div>
        </v-container>
    </v-app-bar>
</template>

<style>
</style>
