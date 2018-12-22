# Upgrading

The intent of this document is to make migration of breaking changes as easy as possible.
Please note that not all breaking changes might be included here.

## 0.6.0
We have added full typescript support in this release. That means you might get into trouble if you use typescript, write your own plugins and made false assumptions about props passed by ory editor.
Please report these cases if you think it's a problem on our end. Otherwise, fix your code :) As we don't want to halt your progress, if it indeed is a problem with our code, remember that you can easily override typescript types using paths property in tsconfig. Just remember to remove these dirty fixes as soon as we fix them on our end. That way you'll always end up with latest changes.
