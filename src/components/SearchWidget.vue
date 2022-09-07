<script setup>

const emit = defineEmits(['item-clicked', 'update:modelValue']);

const handleInput = (e) => {
    emit('update:modelValue', e.target.value);
};

</script>
<template>
    <p>{{searchText}}</p>
    <v-text-field
        outlined
        v-model="searchText"
        ref="searchInput"
        @input="handleInput"
    ></v-text-field>
</template>
