// @flow
export class AbstractAdapter {
  fetch(element: Object): ?Object {
    return element
  }

  store(state: Object) {
    console.log(state)
  }
}
