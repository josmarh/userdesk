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
            <form @submit.prevent="createWrite">
                <div class="row">
                    <div class="form-group col-md-12">
                        <label class="form-label" for="fname">Title</label>
                        <input type="text" class="form-control" placeholder="Docuement title" v-model="model.name" required>
                    </div>
                    <div class="form-group col-md-12">
                        <label class="form-label" for="fname">Content</label>
                        <textarea class="form-control" rows="4" placeholder="Docuement content..." v-model="model.content" required></textarea>
                    </div>
                    <div class="col-md-12">
                        <button type="submit" class="btn btn-primary" :disabled="isDisabled">
                            Create
                        </button>
                    </div>
                </div>
            </form>
        </div>
    </div>

</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
    fields: Object
})
const emit = defineEmits(['backToOptions','createWrite'])

let model = ref(props.fields)
let isDisabled = ref(props.fields.disabled)

const backToOptions = () => {
    emit('backToOptions', 'back')
}

const createWrite = () => {
    emit('createWrite', model.value)
}
</script>

<style>

</style>