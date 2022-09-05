<script setup>
import { defineAsyncComponent } from 'vue';

const NewsCardImage = defineAsyncComponent(() => import('@/components/NewsCardImage.vue'));

defineProps({
    date: {
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
        default: 'This is the url',
    },
    index: {
        type: Number,
        default: null,
    },
});

</script>
<template>

    <v-card class="d-flex flex-column" height="100%">
        <component :is="Math.abs(index % 2) != 0 ? NewsCardImage : 'v-fragment'" :image="image">

            <v-toolbar
                color="transparent"
            >
                <v-spacer />
                <v-btn icon>
                    <v-icon>mdi-arrow-right</v-icon>
                </v-btn>
            </v-toolbar>

            <v-spacer></v-spacer>

            <v-card-subtitle class="mt-auto">{{date}}</v-card-subtitle>
            <v-card-title>{{title}}</v-card-title>
            <v-card-text v-if="Math.abs(index % 2) == 0" v-html="content"></v-card-text>
            <v-card-actions>
                <v-btn variant="outlined">
                    Button
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
