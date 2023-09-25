import { notify } from "notiwind";

const helper = {
    notifySuccess(message) {
        notify({
            group: "success",
            title: "Success",
            text: message
        }, 5000)
    },
    notifyInfo(message) {
        notify({
            group: "info",
            title: "Info",
            text: message
        }, 5000)
    },
    notifyWarn(message) {
        notify({
            group: "warn",
            title: "Warning",
            text: message
        }, 5000)
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
                notify({
                    group: "error",
                    title: "Error",
                    text: errMsg
                }, 5000)
            }
        }
    }
}

export default helper;