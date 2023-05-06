import { Router } from "express";
import METADATA from "../../METADATA.js";

const ApiRouter = Router();

ApiRouter.get("/", (req, res) => {
    return res.send(`Server is Up!<br/>API version running is ${METADATA.version}`);
});

export default ApiRouter;
