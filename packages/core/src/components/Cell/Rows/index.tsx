import * as React from 'react';

import Row from '../../../components/Row';

import {
  ComponetizedCell,
  SimplifiedModesProps,
} from '../../../types/editable';

class Rows extends React.PureComponent<
  Partial<ComponetizedCell & SimplifiedModesProps>
> {
  render() {
    const {
      node: { rows = [] },
      editable,
      id,
      ancestors = [],
      ...rest
    } = this.props;

    return (
      <div className="ory-cell-inner ory-cell-rows">
        {rows.map((r: string) => (
          <Row
            editable={editable}
            ancestors={[...ancestors, id]}
            id={r}
            key={r}
            {...rest}
          />
        ))}
      </div>
    );
  }
}

export default Rows;
