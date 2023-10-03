import { notify } from "notiwind";
import store from '../stores'

const helper = {
    appname: import.meta.env.VITE_APP_NAME,
    notifySuccess(message) {
        store.dispatch('setNotification',{
            type: 'Success',
            message: message
        })
    },
    notifyInfo(message) {
        store.dispatch('setNotification',{
            type: 'Info',
            message: message
        })
    },
    notifyWarning(message) {
        store.dispatch('setNotification',{
            type: 'Warning',
            message: message
        })
    },
    notifyError(err) {
        if(err.response) {
            if (err.response.data) {
                let errMsg;
                if (err.response.data.hasOwnProperty("message")) {
                    errMsg = err.response.data.message
                } else {
                    errMsg = err.response.data.error
                }
                store.dispatch('setNotification',{
                    type: 'Error',
                    message: errMsg
                })
            }
        }
    }
}

export default helper;