import './bootstrap';

import { createApp } from 'vue';
import App from './App.vue'
import router from './router';
import store from './stores';

import Notifications from 'notiwind'
import VueProgressBar from "@aacassandra/vue3-progressbar";
import 'flowbite';

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faMessage, faRobot, faBook, faGear, faCircleUser, 
    faPlus, faFolderPlus, faFolderClosed, faEllipsisVertical,
    faCaretDown, faTrash, faPen, faPenToSquare, faCloudArrowUp,
    faLink, faArrowLeft
} from '@fortawesome/free-solid-svg-icons'
library.add( faMessage, faRobot, faBook, faGear, faCircleUser, 
    faPlus, faFolderPlus, faFolderClosed, faEllipsisVertical,
    faCaretDown, faTrash, faPen, faPenToSquare, faCloudArrowUp,
    faLink, faArrowLeft
)

const progressBarOptions = {
    color: "#FE9436",
    failedColor: "red",
    thickness: "3px",
    transition: {
        speed: "0.2s",
        opacity: "0.6s",
        termination: 300,
    },
    autoRevert: true,
    location: "top",
    inverse: false,
};

createApp(App)
    .use(router)
    .use(store)
    .use(Notifications)
    .use(VueProgressBar, progressBarOptions)
    .component('font-awesome-icon', FontAwesomeIcon)
    .mount("#app")