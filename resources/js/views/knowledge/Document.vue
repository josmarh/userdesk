<template>
    <KnowledgeHeader :pageTitle="folder.data.name">
        <h5 class="mb-0">New Documents</h5>
        <p class="mb-0 text-gray">
            You can create a new document in this folder by writing, uploading an existing document or importing a webpage.
        </p>

        <div class="row mt-4">
            <div class="col-md-4">
                <div class="card bg-light-blue">
                    <div class="card-body">
                        <h5 class="mb-0">
                            <font-awesome-icon icon="fa-solid fa-pen-to-square"/>
                            Write
                        </h5>
                        <p class="mb-0 text-black">
                            Write or copy paste your document
                        </p>
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <div class="card bg-light-purple">
                    <div class="card-body">
                        <h5 class="mb-0">
                            <font-awesome-icon icon="fa-solid fa-cloud-arrow-up"/>
                            Upload
                        </h5>
                        <p class="mb-0 text-black">
                            PDF, Word or Powerpoint files
                        </p>
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <div class="card bg-light-green">
                    <div class="card-body">
                        <h5 class="mb-0">
                            <font-awesome-icon icon="fa-solid fa-link"/>
                            Import Website
                        </h5>
                        <p class="mb-0 text-black">
                            Webpages with text content
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <DocumentList/>
    </KnowledgeHeader>
</template>

<script setup>
import { computed, onMounted, getCurrentInstance } from 'vue';
import { useRoute } from 'vue-router'
import KnowledgeHeader from '../../components/folder/KnowledgeHeader.vue';
import DocumentList from '../../components/folder/DocumentList.vue';
import folderStore from "../../stores/folder";
import helper from '../../includes/helper';

const route = useRoute()
const internalInstance = getCurrentInstance();
const folder = computed(() => folderStore.state.folder)

const getFolder = () => {
    internalInstance.appContext.config.globalProperties.$Progress.start();
    folderStore
        .dispatch('showFolder', route.params.directoryId)
        .then(() => {
            internalInstance.appContext.config.globalProperties.$Progress.finish();
        })
        .catch(err => {
            internalInstance.appContext.config.globalProperties.$Progress.fail();
            helper.notifyError(err)
        })
}

onMounted(() => {
    getFolder();
})
</script>

<style>

</style>