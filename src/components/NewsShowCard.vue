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
                class="mx-auto"
                max-width="50%"
            >
                <v-img
                    :lazy-src="activeStory.urlToImage"
                    class="align-end text-white"
                    height="50%"
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
                    <!-- <div>{{activeStory.publishedAt}}</div> -->

                    <div v-html="$manatal.truncate(activeStory.content)"></div>
                </v-card-text>

                <!-- <v-card-actions>
                    <v-btn color="orange">
                        Share
                    </v-btn>

                    <v-btn color="orange">
                        Explore
                    </v-btn>
                </v-card-actions> -->
            </v-card>
        </v-col>
    </v-row>
<!--
    <p>{{activeStory.title}}</p>
    <p>{{activeStory.author}}</p>
    <p>{{activeStory.description}}</p>
    <p>{{activeStory.url}}</p>
    <p>{{activeStory.urlToImage}}</p>
    <p>{{activeStory.publishedAt}}</p>
    <p>{{activeStory.content}}</p> -->
</template>
<style>

</style>
