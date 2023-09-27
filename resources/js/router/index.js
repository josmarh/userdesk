import { createRouter, createWebHistory } from 'vue-router'

import store from '../stores'
import AuthLayout from '../components/layouts/AuthLayout.vue'
import GuestLayout from '../components/layouts/GuestLayout.vue'
import Signin from '../views/auth/Signin.vue'
import Signup from '../views/auth/Signup.vue'
import ForgotPassword from '../views/auth/ForgotPassword.vue'
import Dashboard from '../views/Dashboard.vue'
import Chat from '../views/chat/Index.vue'
import Bot from '../views/bots/Index.vue'
import Knowledge from '../views/knowledge/Index.vue'
import AccountUsers from '../views/account/User.vue'
import AccountBilling from '../views/account/Billing.vue'
import AccountIntegration from '../views/account/Integration.vue'

const routes = [
    {
        path: '/auth',
        redirect: 'signin',
        component: GuestLayout,
        meta: {isGuest: true},
        children: [
            {path: 'signin', name: 'Signin', component: Signin},
            {path: 'signup', name: 'Signup', component: Signup},
            {path: 'forgot-password', name: 'ForgotPassword', component: ForgotPassword},
            // {path: '/reset-password/:email', name: 'ResetPassword', component: ResetPassword},
        ]
    },
    {
        path: '/',
        redirect: 'dashboard',
        component: AuthLayout,
        meta: {requiresAuth: true},
        children: [
            {path: 'dashboard', name: 'Dashboard', component: Dashboard},
            {path: 'conversations', name: 'Chat', component: Chat},
            {path: 'bots', name: 'Bot', component: Bot},
            {path: 'directories', name: 'Knowledge', component: Knowledge},
            {path: '/settings/users', name: 'AccountUsers', component: AccountUsers},
            {path: '/settings/billing', name: 'AccountBilling', component: AccountBilling},
            {path: '/settings/integrations', name: 'AccountIntegration', component: AccountIntegration},
        ]
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

// handling user auth
router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth && !store.state.user.token) {
        next({name: 'Signin'})
    }else if (store.state.user.token && to.meta.isGuest) {
        next({name: 'Dashboard'})
    }else {
        next();
    }
});

export default router;