<template>
    <div v-if="errorMsg" class="flex items-center justify-between py-3 px-5 rounded">
        {{errorMsg}}
        <span @click="errorMsg = ''" 
        class="w-8 h-8 flex items-center justify-center rounded-full transition-color cursor-pointer hover:bg-[rgba(0,0,0,0.2)]">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
        </span>
    </div>
</template>

<script setup>
import { ref, watch } from "vue"

const props = defineProps({
    error: String
})

let errorMsg = ref(props.error)

watch(() => props, (newVal, oldVal) => {
    errorMsg.value = newVal
    console.log(errorMsg.value)
})
</script>