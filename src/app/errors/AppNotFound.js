module.exports = function(message, fileName, lineNumber) {
    return new Error(message, fileName, lineNumber);
};
