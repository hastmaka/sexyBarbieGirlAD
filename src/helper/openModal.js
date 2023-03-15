import {adminSliceActions} from "../store/adminSlice";
import PropTypes from "prop-types";

/**
 * function to manage the global modal
 * @param children - element to render inside the modal
 * @param who - to control who is using the modal
 */
export const openModal = (children, who = null) => {
    window.dispatch(adminSliceActions.openModal(who));
    window.setChildren(children)
};

openModal.prototype = {
    children: PropTypes.element.isRequired,
    who: PropTypes.string.isRequired
}