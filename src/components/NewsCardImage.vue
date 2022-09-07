<script setup>
defineProps({
    image: {
        type: String,
        default: '',
    },
});
</script>
<template>
    <v-img
        v-if="image"
        :lazy-src="image"
        height="100%"
        width="100%"
        cover
        class="text-white"
    >
        <slot />
    </v-img>
</template>
