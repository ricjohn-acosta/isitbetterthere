export const enableBeforeUnload = () => {
    window.onbeforeunload = function (e) {
        return "Discard changes?";
    };
}

export const disableBeforeUnload = () => {
    window.onbeforeunload = null;
}