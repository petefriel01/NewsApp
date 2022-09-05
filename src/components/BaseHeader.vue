<script setup>
// hi
</script>
<template>
    <v-app-bar app class="bg-blue">
        <v-container>
            <div class="d-flex flex-row">
                <h1 class="text-h3">News</h1>
                <v-spacer />
                <router-link :to="{name: 'NewsIndex'}">Users</router-link>
                <router-link :to="{name: 'NewsShow'}">Users</router-link>
            </div>
        </v-container>
    </v-app-bar>
</template>

<style>
</style>
