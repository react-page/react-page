// flow-typed signature: e858415e63b6afea5a30ea78b2817cc2
// flow-typed version: cdb403dbea/react-addons-test-utils_v15.x.x/flow_>=v0.15.x

import React from 'react';

declare module 'react-addons-test-utils' {
  declare var Simulate: {
    [eventName: string]: (element: Element, eventData?: Object) => void;
  };
  declare function renderIntoDocument(instance: React.Element<any>): React.Component;
  declare function mockComponent(componentClass: React.ElementType, mockTagName?: string): Object;
  declare function isElement(element: React.Element<any>): boolean;
  declare function isElementOfType(element: React.Element<any>, componentClass: React.ElementType): boolean;
  declare function isDOMComponent(instance: React.Component): boolean;
  declare function isCompositeComponent(instance: React.Component): boolean;
  declare function isCompositeComponentWithType(instance: React.Component, componentClass: React.ElementType): boolean;
  declare function findAllInRenderedTree(tree: React.Component, test: (child: React.Component) => boolean): Array<React.Component>;
  declare function scryRenderedDOMComponentsWithClass(tree: React.Component, className: string): Array<Element>;
  declare function findRenderedDOMComponentWithClass(tree: React.Component, className: string): ?Element;
  declare function scryRenderedDOMComponentsWithTag(tree: React.Component, tagName: string): Array<Element>;
  declare function findRenderedDOMComponentWithTag(tree: React.Component, tagName: string): ?Element;
  declare function scryRenderedComponentsWithType(tree: React.Component, componentClass: React.ElementType): Array<React.Component>;
  declare function findRenderedComponentWithType(tree: React.Component, componentClass: React.ElementType): ?React.Component;
  declare class ReactShallowRender {
    render(element: React.Element<any>): void;
    getRenderOutput(): React.Element<any>;
  }
  declare function createRenderer(): ReactShallowRender;
}
