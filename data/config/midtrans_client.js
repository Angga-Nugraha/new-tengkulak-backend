import midtransClient from "midtrans-client";

export let coreApi = new midtransClient.CoreApi({
    isProduction: false,
    serverKey: "SB-Mid-server-_54oBdC6ilNBIEcXHDO3WUWF",
    clientKey: "SB-Mid-client-BIWssAE-utoPUbiI"
});