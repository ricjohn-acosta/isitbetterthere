const jsonError = (errorCode, message) => {
    return {error: errorCode, message}
}

export const sendError = (res, errorCode, message) => {
    res.setHeader('content-type', 'application/json')
    res.status(errorCode).send(jsonError(errorCode, message))
}