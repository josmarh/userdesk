<template>
    <aside class="sidebar sidebar-default navs-rounded">
        <div class="sidebar-header d-flex align-items-center justify-content-start">
            <AuthLogo/>
            <div class="sidebar-toggle" data-toggle="sidebar" data-active="true">
                <i class="icon">
                    <svg width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4.25 12.2744L19.25 12.2744" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                        <path d="M10.2998 18.2988L4.2498 12.2748L10.2998 6.24976" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                    </svg>
                </i>
            </div>
        </div>
        <div class="sidebar-body pt-0 data-scrollbar">
            <div class="navbar-collapse" id="sidebar">
                <ul class="navbar-nav iq-main-menu">
                    <li class="nav-item">
                        <router-link :to="{name: 'Dashboard'}" 
                        class="nav-link"
                        :class="[$route.name == 'Dashboard' ? 'active':'']"
                        aria-current="page">
                            <i class="icon">
                                <svg width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M3 6.5C3 3.87479 3.02811 3 6.5 3C9.97189 3 10 3.87479 10 6.5C10 9.12521 10.0111 10 6.5 10C2.98893 10 3 9.12521 3 6.5Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M14 6.5C14 3.87479 14.0281 3 17.5 3C20.9719 3 21 3.87479 21 6.5C21 9.12521 21.0111 10 17.5 10C13.9889 10 14 9.12521 14 6.5Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M3 17.5C3 14.8748 3.02811 14 6.5 14C9.97189 14 10 14.8748 10 17.5C10 20.1252 10.0111 21 6.5 21C2.98893 21 3 20.1252 3 17.5Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M14 17.5C14 14.8748 14.0281 14 17.5 14C20.9719 14 21 14.8748 21 17.5C21 20.1252 21.0111 21 17.5 21C13.9889 21 14 20.1252 14 17.5Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                </svg>
                            </i>
                            <span class="item-name">Dashboard</span>
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link :to="{name: 'Chat'}" 
                        class="nav-link" 
                        aria-current="page"
                        :class="[$route.name == 'Chat' ? 'active':'']">
                            <font-awesome-icon icon="fa-solid fa-message" class="mt-1"/>
                            <span class="item-name">Chat</span>
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link :to="{name: 'Bot'}" 
                        class="nav-link" 
                        aria-current="page"
                        :class="[$route.name == 'Bot' ? 'active':'']">
                            <font-awesome-icon icon="fa-solid fa-robot" class="mt-1"/>
                            <span class="item-name">Bot</span>
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link :to="{name: 'Knowledge'}" 
                        class="nav-link" 
                        aria-current="page"
                        :class="[KnowledgeRoutes.includes($route.name) ? 'active':'']">
                            <font-awesome-icon icon="fa-solid fa-book" class="mt-1"/>
                            <span class="item-name">Knowledge</span>
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link"
                        :class="[accountRoutes.includes($route.name) ? 'active':'']"
                        data-bs-toggle="collapse" 
                        href="#sidebar-account" 
                        role="button" 
                        aria-expanded="false" 
                        aria-controls="sidebar-user">
                            <font-awesome-icon icon="fa-solid fa-gear" class="mt-1"/>
                            <span class="item-name">Account</span>
                            <i class="right-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                                </svg>
                            </i>
                        </a>
                        <ul class="sub-nav"
                        :class="[accountRoutes.includes($route.name) ? 'collapsed':'collapse']" 
                        id="sidebar-account" 
                        data-bs-parent="#sidebar">
                            <li class="nav-item" v-for="(item, i) in accountMenus" :key="i">
                                <router-link class="nav-link" :to="{name: item.route}">
                                    <i class="icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 0 24 24" fill="currentColor">
                                            <g>
                                                <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                            </g>
                                        </svg>
                                    </i>
                                    <i class="sidenav-mini-icon"> {{ item.label.split('')[0] }} </i>
                                    <span class="item-name">{{ item.label }}</span>
                                </router-link>
                            </li>
                        </ul>
                    </li>

                </ul>
            </div>
        </div>

    </aside>
</template>

<script setup>
import AuthLogo from '../AuthLogo.vue';

const KnowledgeRoutes = ['Knowledge','FolderDocument']
const accountRoutes = ['AccountUsers','AccountBilling','AccountIntegration']
const accountMenus = [
    {label: 'Users', route: 'AccountUsers'},
    {label: 'Billing', route: 'AccountBilling'},
    {label: 'Integrations', route: 'AccountIntegration'},
]

</script>

<style>

</style>