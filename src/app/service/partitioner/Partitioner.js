import forEach from 'lodash/collection/forEach';

export default class Partitioner {
    partition(elements) {
        var partitions = [], current = [];

        forEach(elements, function (v) {
            if (current.length < 1) {
                current.push(v);
                return;
            }

            var prev = current.slice(-1)[0];
            if (prev.plugin === v.plugin && prev.version === v.version) {
                current.push(v);
                return;
            }

            partitions.push(current);
            current = [];
            current.push(v);
        });

        if (current.length > 0) {
            partitions.push(current);
        }

        return partitions;
    }
}
