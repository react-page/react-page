export declare class Logger {
    /**
     * Logs a warning. Warnings are things that are exceptional, but easily to recover from.
     */
    warn(...args: any[]): void;
    /**
     * Logs a debug message. Debug messages are things that help developers debugging things.
     */
    debug(...args: any[]): void;
    /**
     * Logs an info. Infos are things that might be interesting for someone who needs to take a closer look.
     */
    info(...args: any[]): void;
    /**
     * Logs an error. Error are things that are exceptional, but can be recovered from.
     */
    error(...args: any[]): void;
    /**
     * Logs a fatal error. Fatal errors are things that are exceptional and can not be recovered from.
     */
    fatal(...args: any[]): void;
    /**
     * Logs a message.
     */
    log(...args: any[]): void;
}
declare const instance: Logger;
export default instance;
//# sourceMappingURL=index.d.ts.map