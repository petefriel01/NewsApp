<script setup>
defineProps({
    image: {
        type: String,
        default: 'This is the url',
    },
});
</script>
<template>
    <v-img
        :lazy-src="image"
        :src="image"
        height="100%"
        width="100%"
        cover
        class="text-white"
    >
        <slot />
    </v-img>
</template>
