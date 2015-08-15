import Reflux from 'reflux';

export default {
    toolbar: Reflux.createActions(['pluginDragBegin']),
    editable: {
        section: Reflux.createActions(['focus', 'blur'])
    }
};
