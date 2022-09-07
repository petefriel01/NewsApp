<script setup>

const emit = defineEmits(['item-clicked', 'update:modelValue']);

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
