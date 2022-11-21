import useCurrentNodeWithPlugin from './useCurrentNodeWithPlugin';
export default (function (plugin) {
    var nodeEntry = useCurrentNodeWithPlugin(plugin);
    return Boolean(nodeEntry);
});
//# sourceMappingURL=usePluginIsActive.js.map