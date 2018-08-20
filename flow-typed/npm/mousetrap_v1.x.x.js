// flow-typed signature: 808f7310b8034ba4e7444262b7f29c3e
// flow-typed version: da30fe6876/mousetrap_v1.x.x/flow_>=v0.25.x

declare module "mousetrap" {
  declare function bind(
    key: string | Array<string>,
    fn: (e: Event, combo?: string) => mixed,
    eventType?: string
  ): void;
  declare function unbind(key: string | Array<string>): void;
  declare function trigger(key: string): void;
  declare var stopCallback: (
    e: KeyboardEvent,
    element: Element,
    combo: string
  ) => boolean;
  declare function reset(): void;
}
