// @flow
export class AbstractAdapter {
  fetch(element: Object): ?Object {
    return null
  }

  store(state: Object) {
    console.log(state)
  }
}
