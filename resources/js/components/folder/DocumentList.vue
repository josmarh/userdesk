<template>
    <div class="card mt-2">
        <div class="card-body px-3">
            <div class="d-flex justify-content-between">
                <div>
                    <h5 class="mb-0">Saved Documents</h5>
                    <p class="mb-0 text-gray">
                        These are all uploaded documents that would be learned from.
                    </p>
                </div>
                <div>
                    <div class="form-group">
                        <input type="text" class="form-control" v-model="searchFilter" aria-describedby="document" placeholder="Search document">
                    </div>
                </div>
            </div>
            <div class="table-responsive">
                <table id="document-list-table" class="table table-striped" role="grid" data-toggle="data-table">
                    <thead>
                        <tr class="ligth">
                            <th>
                                <div class="form-check">
                                    <input type="checkbox" class="form-check-input" id="checkAll" value="checkAll" v-model="model.checkAll">
                                    <label class="form-check-label" for="checkAll"></label>
                                </div>
                            </th>
                            <th v-for="(item,i) in theaders" :key="i">{{ item }}</th>
                        </tr>
                    </thead>
                </table>
            </div>
        </div>
    </div>

</template>

<script setup>
import { ref, watch } from "vue";

let searchFilter = ref('')
const theaders = ['name','status','date edited','date created']

watch(searchFilter, (newVal, oldVal) => {

})

let model = ref({
    checkAll: []
})
</script>

<style>

</style>