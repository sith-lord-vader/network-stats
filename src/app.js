require("@babel/register");

import Express from "express";
import { createServer } from "http";

const App = Express();
const server = createServer(App);

// ? ---ENV---
let hostname = process.env.HOSTNAME || "0.0.0.0";
let port = process.env.PORT || 5555;
// ! ---ENV---

// ? ---Routers---
import ApiRouter from "./routes/api/index.js";
App.get("/", (req, res) => {
    return res.send(`
    API maintained by <a href="https://github.com/sith-lord-vader">Abhishek Adhikari (sith-lord-vader)</a>.<br/>
    Check API at <a href="/api">/api</a>
    `);
});
App.use("/api", ApiRouter);
// ! ---Routers---

server.listen(port, hostname, () => {
    console.log(`Server running on ${hostname}:${port}`);
});
