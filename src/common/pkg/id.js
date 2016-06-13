import md5 from "md5";

export const fromData = (data) => md5(JSON.stringify(data))