<template>
    <PageLayout pageTitle="Knowledge">
        <button type="button" class="btn btn-primary"
        data-bs-toggle="modal" data-bs-target="#folderModal">
            <font-awesome-icon icon="fa-solid fa-folder-plus"/>
            New Folder
        </button>

        <FolderList :data="folders.data" :meta="folders.meta"/>
    </PageLayout>

    <div class="modal fade" id="folderModal" tabindex="-1" aria-labelledby="folderModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="rightModalLabel">Create Folder</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form @submit.prevent="createFolder">
                        <div class="row">
                            <div class="form-group col-md-12">
                                <label class="form-label" for="fname">Name:</label>
                                <input type="text" class="form-control" id="name" placeholder="Name" v-model="model.name" required>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary close-modal" data-bs-dismiss="modal">Close</button>
                                <button type="submit" class="btn btn-primary" :disabled="isDisabled">
                                    Save
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, getCurrentInstance, computed, onMounted } from 'vue';
import PageLayout from '../../components/layouts/PageLayout.vue';
import CardComponent from '../../components/CardComponent.vue';
import helper from '../../includes/helper';
import folderStore from '../../stores/folder'
import FolderList from '../../components/folder/FolderList.vue';

const folders = computed(() => folderStore.state.folders)
const internalInstance = getCurrentInstance();
let model = ref({
    name: ''
})
let isDisabled = ref(false);

const getFolders = () => {
    internalInstance.appContext.config.globalProperties.$Progress.start();
    folderStore
        .dispatch('getFolders')
        .then(() => {
            internalInstance.appContext.config.globalProperties.$Progress.finish();
        })
        .catch(err => {
            internalInstance.appContext.config.globalProperties.$Progress.fail();
            helper.notifyError(err)
        })
}

const createFolder = () => {
    internalInstance.appContext.config.globalProperties.$Progress.start();
    isDisabled.value = true
    folderStore
        .dispatch('storeFolder', model.value)
        .then(res => {
            internalInstance.appContext.config.globalProperties.$Progress.finish();
            isDisabled.value = false
            document.getElementsByClassName("close-modal")[0].click();
            model.value.name = ''
            helper.notifySuccess(res.message)
            folderStore.dispatch('getFolders')
        })
        .catch(err => {
            internalInstance.appContext.config.globalProperties.$Progress.fail();
            isDisabled.value = false
            document.getElementsByClassName("close-modal")[0].click();
            helper.notifyError(err)
        })
}

onMounted(() => {
    getFolders();
})
</script>

<style>

</style>