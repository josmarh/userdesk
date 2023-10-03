<template>
    <footer class="footer border-top">
        <div class="footer-body">
            <div class="right-panel">
                &copy {{ year }} {{ appname }}. All rights reserved.
            </div>
        </div>
    </footer>
</template>

<script setup>
const year = new Date().getFullYear()
const appname = import.meta.env.VITE_APP_NAME
</script>