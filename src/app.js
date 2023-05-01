import { isInternetActive, speedTest } from "./utils.js";

// let worked, out;

let [worked, out] = isInternetActive();
if (worked) {
    console.log(out);
}

[worked, out] = speedTest();
if (worked) {
    console.log(out);
}
