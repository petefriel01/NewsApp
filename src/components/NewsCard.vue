<script setup>

const props = defineProps({
    date: {
        type: String,
        default: 'This is the title',
    },
    title: {
        type: String,
        default: 'This is the title',
    },
    content: {
        type: String,
        default: 'This is the content',
    },
});

</script>
<template>
    <v-card
        class="ma-2 pa-2"
        :date="props.date"
        :title="props.title"
        :text="props.content"
    >
    </v-card>
</template>

<style>

</style>
