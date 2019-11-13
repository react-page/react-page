# React-Page Editor

this is a ready-to-use default editor that can be used both in editor mode (showing the ui) and read-only mode (rendering only static content).

If your platform supports code-splitting, you are good to go even for static rendering, because it will only bundle the nessesary code.

If your platform does not support code-splitting, you should use `import { HTMLRenderer } from '@react-page/renderer';`.
