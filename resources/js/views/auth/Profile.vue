<template>
    <PageLayout pageTitle="Profile">
        <div class="row">
            <div class="col-md-6">
                <CardComponent card-title="Personal Information">
                    <div class="new-user-info">
                        <form @submit.prevent="updatePersonalInfo">
                            <div class="row">
                                <div class="form-group col-md-12">
                                    <label class="form-label" for="fname">Name:</label>
                                    <input type="text" class="form-control" id="name" placeholder="Name" v-model="user.name" required>
                                </div>
                                <div class="form-group col-md-12">
                                    <label class="form-label" for="email">Email:</label>
                                    <input type="email" class="form-control" id="email" placeholder="Email" v-model="user.email" required>
                                </div>
                            </div>
                            <button type="submit" class="btn btn-primary" :disabled="isDisabled">
                                Save
                            </button>
                        </form>
                    </div>
                </CardComponent>
            </div>
            <div class="col-md-6">
                <CardComponent card-title="Update Password">
                    <div class="new-user-info">
                        <form @submit.prevent="updatePassword">
                            <div class="row">
                                <div class="form-group col-md-12">
                                    <label class="form-label" for="cpass">Current Password:</label>
                                    <input type="password" class="form-control" id="cpass" 
                                    placeholder="Current Password" 
                                    v-model="userPass.current_password"
                                    required>
                                </div>
                                <div class="form-group col-md-12">
                                    <label class="form-label" for="pass">Password:</label>
                                    <input type="password" class="form-control" id="pass"
                                    placeholder="Password"
                                    v-model="userPass.new_password"
                                    required>
                                </div>
                                <div class="form-group col-md-12">
                                    <label class="form-label" for="rpass">Repeat Password:</label>
                                    <input type="password" class="form-control" id="rpass" 
                                    placeholder="Repeat Password"
                                    v-model="userPass.confirm_password"
                                    required>
                                </div>
                            </div>
                            <button type="submit" class="btn btn-primary" :disabled="isDisabled">
                                Save
                            </button>
                        </form>
                    </div>
                </CardComponent>
            </div>
        </div>
    </PageLayout>
</template>

<script setup>
import { ref, getCurrentInstance, computed } from 'vue'
import store from '../../stores';
import CardComponent from '../../components/CardComponent.vue';
import helper from '../../includes/helper';
import PageLayout from '../../components/layouts/PageLayout.vue';

const profile = computed(() => store.state.user.data)
const internalInstance = getCurrentInstance();
const user = ref({
    name: profile.value.name,
    email: profile.value.email,
});
const userPass = ref({
    current_password: '',
    new_password: '',
    confirm_password: '',
})
let isDisabled = ref(false);

const updatePersonalInfo = () => {
    internalInstance.appContext.config.globalProperties.$Progress.start();
    isDisabled.value = true;

    store
        .dispatch('updatePersonalInfo', {
            name: user.value.name,
            email: user.value.email
        })
        .then(res => {
            internalInstance.appContext.config.globalProperties.$Progress.finish();
            isDisabled.value = false;
            helper.notifySuccess(res.message)
        })
        .catch(err => {
            internalInstance.appContext.config.globalProperties.$Progress.fail();
            isDisabled.value = false;
            helper.notifyError(err)
        })
}

const updatePassword = () => {
    if (userPass.new_password !==  userPass.confirm_password) {;
        // store.dispatch("setErrorNotification", 'Password does not match');
        return false;
    }
    internalInstance.appContext.config.globalProperties.$Progress.start();
    isDisabled.value = true;

    store
        .dispatch('updatePassword', userPass.value)
        .then(res => {
            internalInstance.appContext.config.globalProperties.$Progress.finish();
            isDisabled.value = false;
            userPass.current_password = '';
            userPass.new_password = '';
            userPass.confirm_password = '';
            helper.notifySuccess(res.message)
        })
        .catch(err => {
            internalInstance.appContext.config.globalProperties.$Progress.fail();
            isDisabled.value = false;
            helper.notifyError(err)
        })
}
</script>

<style>

</style>