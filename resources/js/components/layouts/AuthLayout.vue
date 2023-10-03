<template>
    <vue-progress-bar></vue-progress-bar>
    <Sidebar/>
    <main class="main-content">
        <Header/>
        <router-view></router-view>
        <Footer/>
    </main>
</template>

<script setup>
import Sidebar from './Sidebar.vue';
import Header from './Header.vue';
import Footer from './Footer.vue';
</script>

<style>

</style>