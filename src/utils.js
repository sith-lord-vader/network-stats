import { spawn } from "child_process";

const isWin = process.platform === "win32";

export const speedTest = res => {
    let st = spawn("speedtest");
    st.stdout.on("data", data => {
        res.write(data.toString().trim() + "<br/>");
    });

    st.stderr.on("data", data => {
        res.write(data.toString().trim());
    });

    st.on("close", code => {
        res.end();
    });
};

export const isInternetActive = (res, packets = 1) => {
    let ping;
    try {
        if (isWin) {
            ping = spawn("ping", ["-n", `${packets}`, "8.8.8.8"]);
        } else {
            ping = spawn("ping", ["-c", `${packets}`, "8.8.8.8"]);
        }

        ping.stdout.on("data", data => {
            res.write(data.toString().trim() + "<br/>");
        });

        ping.stderr.on("data", data => {
            res.write(data.toString().trim() + "<br/>");
        });

        ping.on("close", code => {
            res.end();
        });
    } catch (error) {
        res.write("error!" + "<br/>");
        res.end();
    }
};
