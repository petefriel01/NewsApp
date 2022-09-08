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

/**
 * Get title for live editing
 */
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
                <v-icon v-if="Math.abs(index % 2) == 0"
                        class="ma-4">mdi-newspaper-variant-outline
                </v-icon>
            </v-toolbar>
            <v-card-subtitle class="mt-auto">{{source}}</v-card-subtitle>
            <v-card-title class="text-wrap font-weight-bold">
                {{dynamicTitle}}
            </v-card-title>
            <v-card-text
                v-if="Math.abs(index % 2) == 0"
                v-html="$manatal.truncate(content)">
            </v-card-text>
            <v-card-actions>
                <v-btn
                    variant="outlined"
                    size="x-small"
                    :to="{
                        name: 'NewsShow',
                        params: { article: $manatal.title(title) }
                    }">
                    Read More</v-btn>
                <v-btn
                    variant="tonal"
                    size="x-small"
                    color="bg-grey lighten-4"
                    @click="openDialog(title, index)"
                >
                    Edit Title
                </v-btn>

            </v-card-actions>
        </component>
    </v-card>
</template>
