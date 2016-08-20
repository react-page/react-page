// @flow
import { AbstractAdapter } from './adapter'

export class LocalStoreAdapter extends AbstractAdapter {
  fetch(element: Object) {
    return null
  }

  store(state: Object) {
    console.log(state)
  }
}
