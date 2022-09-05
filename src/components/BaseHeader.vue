<script setup>
// hi
</script>
<template>
    <v-app-bar app class="bg-blue">
        <h1 class="text-primary text-h1">SOME TITLE IN HERE</h1>
        <v-spacer />
        <router-link :to="{name: 'NewsIndex'}">Users</router-link>
        <router-link :to="{name: 'NewsShow'}">Users</router-link>
    </v-app-bar>
</template>

<style>
</style>
