// flow-typed signature: 1a447cbcc0990247169c07af13d29f78
// flow-typed version: 94e9f7e0a4/mousetrap_v1.x.x/flow_>=v0.28.x

declare module 'mousetrap' {
  declare function bind(key: string|Array<string>, fn: (e: Event, combo?: string) => mixed, eventType?: string): void;
  declare function unbind(key: string): void;
  declare function trigger(key: string): void;
  declare var stopCallback: (e: KeyboardEvent, element: Element, combo: string) => bool;
  declare function reset(): void;
}
