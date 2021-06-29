const serverRedirect = (res, route) => {
    res.writeHead(302, {
        Location: process.env.environment + route
    });
    res.end();
}

export default serverRedirect