<template>
    <div class="row mt-4">
        <div class="col-md-12">
            <span class="text-black cursor-pointer" @click="backToOptions">
                <font-awesome-icon icon="fa-solid fa-arrow-left pr-3" /> Options
            </span>
        </div>
    </div>
    <div class="card mt-2">
        <div class="card-body px-3">
            <form @submit.prevent="createImport">
                <div class="row">
                    <div class="form-group col-md-12">
                        <label class="form-label" for="fname">Import Website</label>
                        <input type="utl" class="form-control" placeholder="https://website.com" v-model="model.url" required>
                    </div>
                    <div class="col-md-12">
                        <button type="submit" class="btn btn-primary" :disabled="isDisabled">
                            Import
                        </button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
    fields: Object
})
const emit = defineEmits(['backToOptions','createImport'])

let model = ref(props.fields)
let isDisabled = ref(props.fields.disabled)

const backToOptions = () => {
    emit('backToOptions', 'back')
}

const createImport = () => {
    emit('createImport', model.value)
}
</script>

<style>

</style>