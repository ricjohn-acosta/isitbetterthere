export default (story) => {
    let toStr = "";
    for (var i = 0; i < story.length; i++) {
        if (story[i] === "\n") {
            toStr += " "
        } else {
            toStr += story[i].props.children + " "
        }
    }

    return toStr
}