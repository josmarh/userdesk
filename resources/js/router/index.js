import { createRouter, createWebHistory } from 'vue-router'

import store from '../stores'
import AuthLayout from '../components/layouts/AuthLayout.vue'
import GuestLayout from '../components/layouts/GuestLayout.vue'
import Signin from '../views/auth/Signin.vue'
import Signup from '../views/auth/Signup.vue'
import ForgotPassword from '../views/auth/ForgotPassword.vue'
import Dashboard from '../views/Dashboard.vue'

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
            {path: '/dashboard', name: 'Dashboard', component: Dashboard},
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