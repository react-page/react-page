import { createContext, useContext, useRef } from 'react';
export var CallbacksContext = createContext({});
/**
 * @returns the callbacks object of the current Editor.
 *
 * this object is memoized, alltough its better to use `usecallback` instead if you want to use a single callback
 */
export var useCallbackOptions = function () { return useContext(CallbacksContext); };
/**
 * get a single (memoized) callback
 * @param key the callback key
 * @returns the callback value
 */
export var useCallbackOption = function (key) {
    var callbacks = useCallbackOptions();
    var callback = callbacks[key];
    var lastcallback = useRef(callback);
    if (lastcallback.current !== callback) {
        lastcallback.current = callback;
    }
    return lastcallback.current;
};
//# sourceMappingURL=callbacks.js.map