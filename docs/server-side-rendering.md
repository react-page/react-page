# SSR

SSR works good now, but there is a little caveat: slate uses a keygenerator which might lead to missmatch in server and client. The problem and solution is described here: ianstormtaylor/slate#870 (comment)

With recent react you can do also this:

```typescript
// useCustomSlateKeygen.js

import { useRef } from 'react';
import { KeyUtils } from 'slate';

export default (uniqueId) => {
  const ref = useRef(null);
  if (!ref.current || ref.current !== uniqueId) {
    let key = 0;
    const keygen = () => {
      key += 1;
      return uniqueId + key;
    };

    KeyUtils.setGenerator(keygen);
    ref.current = uniqueId;
  }
};
```

and then you can use it right before HTMLRenderer:

```typescript
import { HTMLRenderer } from '@react-page/renderer';
import useCustomKeygen from './useCustomKeygen';

const Content = ({ style, className, contentUniqueId, content }) => {
  useCustomKeygen(contentUniqueId);

  return <HTMLRenderer plugins={plugins} state={content} />;
};
```
