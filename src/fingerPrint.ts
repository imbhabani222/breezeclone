import FingerprintJS from "@fingerprintjs/fingerprintjs";

// Initialize an agent at application startup.
const fpPromise = FingerprintJS.load();
let FingerPrint: any = fpPromise.then((fp) => fp.get());

export default FingerPrint;
