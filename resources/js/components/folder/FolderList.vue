<template>
    <div class="row mt-5">
        <div class="col-md-2 text-center" v-for="item in data" :key="item.directoryId">
            <router-link 
            :to="{name: 'FolderDocument', params: {directoryId: item.directoryId}}"
            class="text-gray">
                <font-awesome-icon icon="fa-solid fa-folder-closed" class="fs-1"/><br>
                {{ item.name }}
            </router-link>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    data: Array,
    meta: Object
})
</script>

<style>

</style>