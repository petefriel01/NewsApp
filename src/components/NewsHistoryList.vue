<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const history = computed({
    get: () => store.get('content/history'),
});

</script>
<template>
    <v-card
        v-if="history"
        class="mx-auto"
        max-width="50%"
    >
        <v-list disabled>
            <v-list-subheader>NEWS HISTORY</v-list-subheader>
            <v-list-item
                v-for="(item, i) in history"
                :key="i"
            >
                <template v-slot:prepend>
                    <v-icon icon="mdi-clock"></v-icon>
                </template>
                <v-list-item-title v-text="item"></v-list-item-title>
            </v-list-item>
        </v-list>
    </v-card>
</template>
