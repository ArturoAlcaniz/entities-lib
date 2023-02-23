const os = require("os");
const {createServer} = require("https");
const {parse} = require("url");
const next = require("next");
const cluster = require('node:cluster');
const numCPUs = os.cpus().length;

const dev = process.env.NODE_ENV !== "production";
const hostname = process.env.DOMAIN;
const port = 443;
// when using middleware `hostname` and `port` must be provided below
const app = next({dev, hostname, port});
const handle = app.getRequestHandler();
const fs = require("fs");
const httpsOptions = {
    key: fs.readFileSync("/app/certs/sslcache/tishoptfg.com/tishoptfg.com.key"),
    cert: fs.readFileSync(
        "/app/certs/sslcache/tishoptfg.com/tishoptfg.com.crt"
    ),
};

if(cluster.isMaster){
    console.log(`Master server started on ${process.pid}`);
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }
    cluster.on('exit', (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} died. Restarting`);
        cluster.fork();
    })
} else {
    console.log(`Cluster server started on ${process.pid}`)
    main();
}

async function main() {
    app.prepare().then(() => {
        createServer(httpsOptions, async (req, res) => {
            try {
                const parsedUrl = parse(req.url, true);
                const {pathname, query} = parsedUrl;

                if (pathname === "/a") {
                    await app.render(req, res, "/a", query);
                } else if (pathname === "/b") {
                    await app.render(req, res, "/b", query);
                } else {
                    await handle(req, res, parsedUrl);
                }
            } catch (err) {
                console.error("Error occurred handling", req.url, err);
                res.statusCode = 500;
                res.end("internal server error");
            }
        }).listen(port, (err) => {
            if (err) throw err;
            console.log(`> Ready on https://${hostname}:${port}`);
        });
    });
}
