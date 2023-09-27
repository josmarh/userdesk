import './bootstrap';

import { createApp } from 'vue';
import App from './App.vue'
import router from './router';
import store from './stores';

import Notifications from 'notiwind'
import 'flowbite';

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faMessage, faRobot, faBook, faGear, faCircleUser } from '@fortawesome/free-solid-svg-icons'
library.add( faMessage, faRobot, faBook, faGear, faCircleUser )

createApp(App)
    .use(router)
    .use(store)
    .use(Notifications)
    .component('font-awesome-icon', FontAwesomeIcon)
    .mount("#app")