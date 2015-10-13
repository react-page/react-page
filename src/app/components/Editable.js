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

function hashIDs() {

}

export default class Editable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            partitions: partitioner.partition(props.sections)
        };
    }

    renderSections(sections, index) {
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
                partitions = partitions.splice(state.index, 1);
            } else {
                updated = map(updated, (s) => {
                    // TODO FIXME this causes the partition to be re-rendered, which cuases a loss of focus on contenteditable.
                    // TODO FIXME maybe we could replace this with a real diff.
                    s.id = null;
                    return new Section(s);
                });
                partitions[state.index] = updated;
                partitions = merge(partitions);
                partitions = partitioner.partition(partitions)
            }

            this.setState({partitions: partitions})
        });

        return plugin.render(sections, partitionStore);
    }

    render() {
        console.log('render: ', this.state.partitions);

        /*jshint ignore:start */
        return <div>{map(this.state.partitions, (sections, k) => {
            let id = reduce(sections, (total, n) => total.concat(n.id), '');
            return <div key={crc32.str(id)}>{this.renderSections(sections, k)}</div>;
        })}</div>;
        /*jshint ignore:end */
    }
}
