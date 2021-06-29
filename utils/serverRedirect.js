const serverRedirect = (route) => {
    context.res.writeHead(302, {
        Location: process.env.environment + route
    });
    context.res.end();
}

export default serverRedirect