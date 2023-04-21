import {adminSliceActions} from "../../store/adminSlice";

let resolveCallback;
export default function useConfirmDialog(){
    const onConfirm = () => {
        window.dispatch(adminSliceActions.closeConfirmDialog());
        resolveCallback(true);
    };
    const onCancel = () => {
        window.dispatch(adminSliceActions.closeConfirmDialog());
        resolveCallback(false);
    };
    const confirm = ({type, title, content}) => {
        window.dispatch(adminSliceActions.showConfirmDialog({type, title, content}));
        return new Promise((res, rej) => {
            resolveCallback = res;
        });
    };
    return { onConfirm, onCancel, confirm }
}