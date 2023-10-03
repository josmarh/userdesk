<template>
    <div class="conatiner-fluid content-inner mt-5 py-0">
        <div>
            <h4 class="title ">{{pageTitle}}</h4>
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
</template>

<script setup>
import { computed } from "vue";
import store from "../../stores"

const notification = computed(() => store.state.notifications)
const props = defineProps({
    pageTitle: String
})
</script>