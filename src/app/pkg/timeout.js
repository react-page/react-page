export default {
    setTimeout: function(cb, wait) {
        if (window !== undefined && (typeof window.setTimeout === 'function')) {
            return window.setTimeout(cb, wait);
        } else if (typeof setTimeout === 'function') {
            return setTimeout(cb, wait);
        } else {
            throw 'setTimeout is not defined';
        }
    }
};
