<script setup>
import { defineAsyncComponent } from 'vue';

const Header = defineAsyncComponent(() => import('@/components/BaseHeader.vue'));
const Footer = defineAsyncComponent(() => import('@/components/BaseFooter.vue'));
</script>
<template>
    <v-app>
        <Header/>
        <v-main>
            <router-view />
        </v-main>
        <Footer />
    </v-app>
</template>
<style>
</style>
