<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const activeStory = computed(() => store.get('content/stories@active'));
</script>
<template>
    <v-row>
        <v-col>
            <v-card
                v-if="activeStory.urlToImage"
                class="mx-auto"
                max-width="50%"
            >
                <v-img
                    :lazy-src="activeStory.urlToImage"
                    :src="activeStory.urlToImage"
                    class="align-end text-white"
                    cover
                >
                    <v-card-title>
                        <h1 class="text-h3 text-wrap">{{activeStory.title}}</h1>
                    </v-card-title>
                </v-img>

                <v-card-subtitle class="pt-4">
                    {{activeStory.author}}
                </v-card-subtitle>

                <v-card-text>
                    <div v-html="$manatal.truncate(activeStory.content)"></div>
                </v-card-text>

            </v-card>
        </v-col>
    </v-row>
</template>
