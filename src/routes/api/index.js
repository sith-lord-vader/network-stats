import { Router } from "express";
import METADATA from "../../METADATA.js";
import { isInternetActive, speedTest } from "../../utils.js";

const ApiRouter = Router();

ApiRouter.get("/", (req, res) => {
    return res.send(`
    Server is Up!<br/>API version running is ${METADATA.version}<br/><br/>
    <a href="/api/is-internet-active?packets=4">Check Ping</a><br/>
    <a href="/api/speed-test">SpeedTest</a><br/>
    `);
});

ApiRouter.get("/is-internet-active", (req, res) => {
    let data = req.query;
    let packets = 2;
    if (data.packets) {
        packets = parseInt(data.packets);
        if (!packets || packets < 1) return res.status(400).json({ worked: false, msg: "Err(packets): Provide valid positive integers only." });
    }
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.setHeader("Transfer-Encoding", "chunked");
    return isInternetActive(res, packets);
});

ApiRouter.get("/stream", function (req, res, next) {
    //when using text/plain it did not stream
    //without charset=utf-8, it only worked in Chrome, not Firefox
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.setHeader("Transfer-Encoding", "chunked");

    res.write("Thinking...");
    sendAndSleep(res, 1);
});

var sendAndSleep = function (response, counter) {
    if (counter > 10) {
        response.end();
    } else {
        response.write(" ;i=" + counter);
        counter++;
        setTimeout(function () {
            sendAndSleep(response, counter);
        }, 1000);
    }
};

ApiRouter.get("/speed-test", (req, res) => {
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.setHeader("Transfer-Encoding", "chunked");
    return speedTest(res);
});

export default ApiRouter;
