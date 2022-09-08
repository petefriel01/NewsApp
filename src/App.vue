<script setup>
import { defineAsyncComponent } from 'vue';

const Header = defineAsyncComponent(() => import('@/components/BaseHeader.vue'));
</script>
<template>
    <v-app>
        <Header/>
        <v-main>
            <router-view />
        </v-main>
    </v-app>
</template>
<style>
</style>
