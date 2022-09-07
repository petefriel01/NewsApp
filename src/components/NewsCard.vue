<script setup>
import { defineAsyncComponent, computed } from 'vue';

const NewsCardImage = defineAsyncComponent(() => import('@/components/NewsCardImage.vue'));

const emit = defineEmits(['item-clicked']);
const openDialog = (title, index) => emit('item-clicked', { title, index });

const props = defineProps({
    source: {
        type: String,
        default: 'This is the author',
    },
    title: {
        type: String,
        default: 'This is the title',
    },
    content: {
        type: String,
        default: 'This is the content',
    },
    image: {
        type: String,
        default: 'This is the image',
    },
    url: {
        type: String,
        default: 'This is the url',
    },
    index: {
        type: Number,
        default: null,
    },
});

const dynamicTitle = computed({
    get: () => props.title,
});

</script>
<template>
    <v-card class="d-flex flex-column" height="100%">
        <component :is="(Math.abs(index % 2) != 0) ? NewsCardImage : 'v-fragment'" :image="image">
            <v-toolbar
                color="transparent"
            >
                <v-spacer />
                <v-btn icon>
                    <v-icon>mdi-arrow-right</v-icon>
                </v-btn>
            </v-toolbar>
            <v-card-subtitle class="mt-auto">{{source}}</v-card-subtitle>
            <v-card-title class="text-wrap">
                {{dynamicTitle}}
            </v-card-title>
            <v-card-text
                v-if="Math.abs(index % 2) == 0"
                v-html="$manatal.truncate(content)">
            </v-card-text>
            <v-card-actions>
                <router-link :to="{
                    name: 'NewsShow',
                    params: { article: $manatal.title(title) }
                }">
                    Read More</router-link>
                <v-btn
                    color="primary"
                    @click="openDialog(title, index)"
                >
                    Open Dialog
                </v-btn>
            </v-card-actions>
        </component>
    </v-card>
</template>

<style>
    .dev{
        border: solid 1px red;
    }
</style>
