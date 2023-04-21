import {adminSliceActions} from "../../store/adminSlice";

export default function useNotification(){
    const displayNotification = ({type, title, content, important}) => {
        window.dispatch(adminSliceActions.showNotification({type, title, content, important}))
    };
    const clearNotification = _ => {
        window.dispatch(adminSliceActions.closeNotification())
    };
    return { displayNotification, clearNotification }
};