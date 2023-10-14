<template>
    <KnowledgeHeader :pageTitle="folder.data.name">
        <h5 class="mb-0">New Documents</h5>
        <p class="mb-0 text-gray">
            You can create a new document in this folder by writing, uploading an existing document or importing a webpage.
        </p>

        <div class="row mt-4" v-if="documents.status == false">
            <div class="col-md-4">
                <div class="card bg-light-blue border-2 cursor-pointer" @click="selectDocument('write')">
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
                <div class="card bg-light-purple border-2 cursor-pointer" @click="selectDocument('upload')">
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
                <div class="card bg-light-green border-2 cursor-pointer" @click="selectDocument('website')">
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
        <Write v-if="documents.write" :fields="model.write" @backToOptions="selectDocument" />
        <Upload v-else-if="documents.upload" :fields="model.uploads" @backToOptions="selectDocument" />
        <ImportWebsite v-else-if="documents.website" :fields="model.website" @backToOptions="selectDocument" />
        <DocumentList />
    </KnowledgeHeader>
</template>

<script setup>
import { computed, onMounted, getCurrentInstance, ref, onUnmounted } from 'vue';
import { useRoute } from 'vue-router'
import KnowledgeHeader from '../../components/folder/KnowledgeHeader.vue';
import DocumentList from '../../components/folder/DocumentList.vue';
import Write from '../../components/folder/Write.vue';
import Upload from '../../components/folder/Upload.vue';
import ImportWebsite from '../../components/folder/ImportWebsite.vue';
import folderStore from "../../stores/folder";
import helper from '../../includes/helper';


const route = useRoute()
const internalInstance = getCurrentInstance();
const folder = computed(() => folderStore.state.folder)

let documents = ref({
    write: false,
    upload: false,
    website: false,
    status: false
})

let model = ref({
    write: {
        title: '',
        content: null,
        disabled: false
    },
    uploads: [],
    website: {
        url: null,
        disabled: false
    }
})

const selectDocument = (documentType = null) => {
    switch (documentType) {
        case 'write':
            documents.value.write = true
            documents.value.upload = false
            documents.value.website = false
            documents.value.status = true
            break;
        case 'upload':
            documents.value.write = false
            documents.value.upload = true
            documents.value.website = false
            documents.value.status = true
            break;
        case 'website':
            documents.value.write = false
            documents.value.upload = false
            documents.value.website = true
            documents.value.status = true
            break;
    
        default:
            documents.value.write = false
            documents.value.upload = false
            documents.value.website = false
            documents.value.status = false
            break;
    }
}

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

const saveDocument = () => {
    internalInstance.appContext.config.globalProperties.$Progress.start();
    folderStore
        .dispatch('')
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

onUnmounted(() => {
    folderStore.dispatch('removeFolderInfo')
})
</script>

<style>

</style>