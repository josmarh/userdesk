<template>
    <div class="conatiner-fluid content-inner mt-5 py-0">
        <div>
            <div class="d-flex justify-content-between">
                <div>
                    <a class="nav-link d-flex align-items-center" href="#" id="k-titleDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <h4 class="title">{{pageTitle}}</h4>
                        <font-awesome-icon 
                        v-if="pageTitle"
                        icon="fa-solid fa-caret-down" 
                        class="px-2 text-black"/>
                    </a>
                    <ul class="dropdown-menu dropdown-menu-start" aria-labelledby="k-titleDropdown">
                        <li>
                            <a href="#" class="dropdown-item"
                            data-bs-toggle="modal" data-bs-target="#folderRenameModal">
                                <font-awesome-icon icon="fa-solid fa-pen" class="px-2"/>
                                Rename
                            </a>
                        </li>
                        <li>
                            <a href="#" class="dropdown-item"
                            data-bs-toggle="modal" data-bs-target="#folderDeleteModal">
                                <font-awesome-icon icon="fa-solid fa-trash" class="px-2"/>
                                Delete
                            </a>
                        </li>
                    </ul>
                </div>
                <div>
                    <router-link :to="{name: 'Knowledge'}" 
                    class="btn btn-primary">
                        Back
                    </router-link>
                </div>
            </div>
            <hr class="mb-4">
            <slot></slot>

            <div class="fixed z-10 notification"
            v-if="notification.message && notification.type">
                <div class="toast fade show" role="alert" aria-live="assertive" aria-atomic="true">
                    <div class="toast-header">
                        <strong class="me-auto">{{ notification.type }}</strong>
                        <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                    </div>
                    <div class="toast-body">
                        {{ notification.message }}
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Update modal -->
    <div class="modal fade" id="folderRenameModal" tabindex="-1" 
    aria-labelledby="folderRenameModalLabel" 
    aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="rightModalLabel">Rename Folder</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form @submit.prevent="updateFolder">
                        <div class="row">
                            <div class="form-group col-md-12">
                                <label class="form-label">Name:</label>
                                <input type="text" class="form-control" placeholder="Name" v-model="model.name" required>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary close-modal" data-bs-dismiss="modal">Close</button>
                                <button type="submit" class="btn btn-primary" :disabled="isDisabled.update">
                                    Save
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <!-- Delete modal -->
    <div class="modal fade" id="folderDeleteModal" tabindex="-1" 
    aria-labelledby="folderDeleteModalLabel" 
    aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="rightModalLabel">Delete Folder</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form @submit.prevent="deleteFolder">
                        <div class="row">
                            <p>Are you sure you want to delete this folder permanently?</p>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary close-modal" data-bs-dismiss="modal">Close</button>
                                <button type="submit" class="btn btn-danger" :disabled="isDisabled.delete">
                                    Delete
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
import { computed, ref, getCurrentInstance, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import store from "../../stores"
import folderStore from "../../stores/folder";
import helper from "../../includes/helper";

const route = useRoute()
const router = useRouter()
const notification = computed(() => store.state.notifications)
const internalInstance = getCurrentInstance();
const props = defineProps({
    pageTitle: String,
})

let model = ref({
    id: route.params.directoryId,
    name: props.pageTitle
})
watch(() => props.pageTitle, (newVal, oldVal) => {
    model.value.name = newVal
})
let isDisabled = ref({
    update: false,
    delete: false
});

const updateFolder = () => {
    internalInstance.appContext.config.globalProperties.$Progress.start();
    isDisabled.value.update = true
    folderStore
        .dispatch('updateFolder', model.value)
        .then(res => {
            internalInstance.appContext.config.globalProperties.$Progress.finish();
            isDisabled.value.update = false
            document.getElementsByClassName("close-modal")[0].click();
            model.value.name = ''
            helper.notifySuccess(res.message)
            folderStore.dispatch('showFolder', route.params.directoryId)
        })
        .catch(err => {
            internalInstance.appContext.config.globalProperties.$Progress.fail();
            isDisabled.value.update = false
            document.getElementsByClassName("close-modal")[0].click();
            helper.notifyError(err)
        })
}

const deleteFolder = () => {
    internalInstance.appContext.config.globalProperties.$Progress.start();
    isDisabled.value.delete = true
    folderStore
        .dispatch('deleteFolder', route.params.directoryId)
        .then(res => {
            internalInstance.appContext.config.globalProperties.$Progress.finish();
            isDisabled.value.delete = false
            document.getElementsByClassName("close-modal")[1].click();
            helper.notifySuccess(res.message)
            router.push({
                name: 'Knowledge'
            })
        })
        .catch(err => {
            internalInstance.appContext.config.globalProperties.$Progress.fail();
            isDisabled.value.delete = false
            document.getElementsByClassName("close-modal")[1].click();
            helper.notifyError(err)
        })
}
</script>

<style>

</style>