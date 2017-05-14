// flow-typed signature: d5a9a0adae378a1e81a51455c28fd20f
// flow-typed version: 3c3f096590/classnames_v2.x.x/flow_>=v0.23.x

type $npm$classnames$Classes =
  string |
  {[className: string]: * } |
  Array<string> |
  false |
  void |
  null

declare module 'classnames' {
  declare function exports(
    ...classes: Array<$npm$classnames$Classes>
  ): string;
}
