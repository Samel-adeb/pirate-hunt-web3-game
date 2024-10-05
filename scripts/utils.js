
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export const showSuccessMessage = (message) => {
    toast.info(message, {
        position: "top-center",
    });
}

export const showFailedMessage = (message) => {
    toast.warning(message, {
        position: "top-center",
    });
}

export const showWariningMessage = (message) => {
    toast.warning(message, {
        position: "top-center",
    });
}
export const showInfoMessage = (message) => {
    toast.info(message, {
        position: "top-center",
    });
}



