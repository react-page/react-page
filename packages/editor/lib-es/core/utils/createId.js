// import ShortUniqueId from 'short-unique-id';
// REMOVED BECAUSE OF https://github.com/jeanlescure/short-unique-id/issues/31
// we do not need cryptographic save unique ids, so this poor mans solution is probably ok:
var LENGTH = 6;
export var createId = function () { return Math.random().toString(36).substr(2, LENGTH); };
//# sourceMappingURL=createId.js.map