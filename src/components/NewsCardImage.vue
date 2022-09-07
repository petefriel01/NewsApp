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
        <div
            class="d-flex flex-row align-end"
            style="background-color:rgba(2, 165, 80, 0.4); height:100%;">
            <div class="flex flex-column">
                <slot />
            </div>
        </div>
    </v-img>

</template>
