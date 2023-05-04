export const addNeededSlices = (setRunApp, dispatch, confirm, setChildren, displayNotification) => {
    window.dispatch = dispatch;
    window.confirm = confirm;
    window.setChildren = setChildren;
    window.displayNotification = displayNotification;
    return setRunApp(true)
}

export const verifySession = () => {
    return (JSON.parse(localStorage.getItem('user')));
}