<script setup>
import { ref } from 'vue';

const overlay = ref(true);

</script>
<template>
    <div class="text-center">
        <v-overlay :model-value="overlay" class="align-center justify-center">
            <v-progress-circular
                indeterminate
                size="64"
                color="green"
            ></v-progress-circular>
        </v-overlay>
    </div>
</template>
