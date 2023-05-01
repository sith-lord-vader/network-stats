import { execSync } from "child_process";

const isWin = process.platform === "win32";

export const speedTest = () => {
    let out;
    try {
        out = execSync("speedtest", { encoding: "utf-8" });
        return [true, out];
    } catch (error) {
        return [false, null];
    }
};

export const isInternetActive = () => {
    let out;
    try {
        if (isWin) {
            out = execSync("ping -n 4 8.8.8.8", { encoding: "utf-8" });
        } else {
            out = execSync("ping -c 4 8.8.8.8", { encoding: "utf-8" });
        }
        return [true, out];
    } catch (error) {
        console.error(error);
        return [false, null];
    }
};
