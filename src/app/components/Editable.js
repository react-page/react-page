'use strict';

import React from 'react';
import map from 'lodash/collection/map';
import isEmpty from 'lodash/lang/isEmpty';
import merge from 'app/pkg/merge';
import reduce from 'lodash/collection/reduce'
import Partitioner from 'app/service/partitioner/Partitioner';
import PartitionStore from 'app/stores/Partition';
import crc32 from 'crc-32';
import Section from 'app/entity/Section';

let partitioner = new Partitioner();

export default class Editable extends React.Component {
    constructor(props) {
        super(props);
        let partitions = partitioner.partition(props.sections);
        this.state = {
            partitions: partitions
        };
    }

    renderPartitions(sections, index) {
        // [0] because we simply check the first item in the array as all following items have the same
        // plugin name and version (check out the Service\Partitioner\Partitioner docs)
        let plugin = this.props.plugins.get(sections[0].plugin, sections[0].version);

        // The partitionStore is a dedicated Redux store for each and every partition.
        let partitionStore = new PartitionStore(sections, index);

        // Subscribe to any changes the partitionStore might encounter.
        partitionStore.subscribe(() => {
            let state = partitionStore.getState();
            let partitions = this.state.partitions;
            let updated = state.sections;

            if (isEmpty(state.sections)) {
                // Remove this partition if all of it's children have been deleted
                partitions = partitions.splice(state.index, 1);
            } else {
                // Update the specified partition with it's new contents
                // Re-partition the editable.
                partitions[state.index] = updated;
                partitions = merge(partitions);
                partitions = partitioner.partition(partitions);
            }

            this.setState({partitions: partitions});
        });

        return plugin.render(sections, partitionStore);
    }

    render() {
        /*jshint ignore:start */
        return <div>{map(this.state.partitions, (partition, k) => {
            // Generate a unique string id by concatenating all ids of this partition together and use CRC32
            // to make things shorter
            let id = crc32.str(reduce(partition, (total, n) => total.concat(n.id), ''));
            return <div key={id}>{this.renderPartitions(partition, k)}</div>;
        })}</div>;
        /*jshint ignore:end */
    }
}
