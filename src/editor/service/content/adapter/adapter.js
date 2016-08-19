// @flow
export class AbstractAdapter {
  fetch(element: Object) {
    return element
  }

  store(state: Object) {
    console.log(state)
  }
}
