## Good practices

Some good practices which might assist you in your task.

### Test for exceptions

```js
import MyException from 'app/MyException';

function throwException () {
    throw new MyException();
}

describe('foo', function() {
    it('should throw exception', function() {
        expect(() => throwException()).toThrowError(MyException);
    });
});
```

### Fix commit history

```
git fetch origin
git diff origin/master > ~/diff.patch # any path outside the repo
git reset --hard origin/master
git apply ~/diff.patch
git commit -a
```
