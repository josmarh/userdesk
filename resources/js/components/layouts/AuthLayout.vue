<template>
    <Sidebar/>
    <main class="main-content">
        <Header/>
        <router-view></router-view>
    </main>
</template>

<script setup>
import Sidebar from './Sidebar.vue';
import Header from './Header.vue';

</script>

<style>

</style>