<template>
    <div class="wrapper">
        <vue-progress-bar></vue-progress-bar>
        <router-view></router-view>
    </div>
</template>

<script setup>

</script>

<style>
button:disabled {
    cursor: not-allowed;
    pointer-events: all !important;
}
</style>