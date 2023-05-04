import {adminSliceActions} from "../../store/adminSlice";

export default function useNotification(){
    const displayNotification = ({type, title, content, important}) => {
        window.dispatch(adminSliceActions.showNotification({type, title, content, important}))
    };
    return { displayNotification }
};