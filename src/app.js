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
App.use("/", ApiRouter);
// ! ---Routers---

server.listen(port, hostname, () => {
    console.log(`Server running on ${hostname}:${port}`);
});
