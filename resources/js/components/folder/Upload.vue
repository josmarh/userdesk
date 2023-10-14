<template>
    <div class="row mt-4">
        <div class="col-md-12">
            <span class="text-black cursor-pointer" @click="backToOptions">
                <font-awesome-icon icon="fa-solid fa-arrow-left pr-3" /> Options
            </span>
        </div>
    </div>
    <div class="card mt-2">
        <div class="card-body px-3 text-black">
            <div class="mb-3">
                <label class="form-label" for="file">Document uploads</label>
                <input type="file" class="form-control" id="file">
            </div>
            <p>Up to 5 files like word, powerpoint or PDF, upto 50 MB each.</p>

            <div class="row mt-4">
                <div class="col-md-12">
                    
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    fields: Object
})

const emit = defineEmits(['backToOptions'])

const backToOptions = () => {
    emit('backToOptions', 'back')
}
</script>

<style>

</style>