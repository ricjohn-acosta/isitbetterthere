const URL = process.env.environment || "http://localhost:3000"

const serverRedirect = (res, route) => {
    res.writeHead(302, {
        Location: URL + route
    });
    res.end();
}

export default serverRedirect