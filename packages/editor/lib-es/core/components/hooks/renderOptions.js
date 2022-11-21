import { createContext, useContext, useRef } from 'react';
import deepEquals from '../../utils/deepEquals';
import { DEFAULT_RENDER_OPTIONS } from '../../defaultOptions';
export var RenderOptionsContext = createContext(DEFAULT_RENDER_OPTIONS);
/**
 * @returns the options object of the current Editor.
 *
 * this object is memoized, alltough its better to use `useOption` instead if you want to use a single option
 */
export var useRenderOptions = function () { return useContext(RenderOptionsContext); };
/**
 * get a single (memoized) option value
 * @param key the option key
 * @returns the option value
 */
export var useRenderOption = function (key) {
    var options = useRenderOptions();
    var option = options[key];
    var lastOption = useRef(option);
    if (!deepEquals(lastOption.current, option)) {
        lastOption.current = option;
    }
    return lastOption.current;
};
//# sourceMappingURL=renderOptions.js.map