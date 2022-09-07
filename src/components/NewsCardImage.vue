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
        <div style="background-color:rgba(2, 165, 80, 0.4);">
            <slot />
        </div>
    </v-img>

</template>
