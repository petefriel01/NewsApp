<script setup>
const emit = defineEmits(['item-clicked', 'update:modelValue']);

/**
 * Emit search query text.
 */
const handleInput = (e) => {
    emit('update:modelValue', e.target.value);
};
</script>
<template>
    <v-text-field
        solo
        hide-details
        label="Search for news articles"
        v-model="searchText"
        ref="searchInput"
        @input="handleInput"
    ></v-text-field>
</template>
