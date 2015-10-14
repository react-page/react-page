import { createStore } from 'redux';
import reducer from 'app/reducers/Partition';

export default (partition, index) => {
    return createStore(reducer, {
        partition: partition,
        index: index
    });
}
