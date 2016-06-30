import { LocalStoreAdapter } from "./adapter/local";
import uuid from "node-uuid";

const localStorageAdapter = new LocalStoreAdapter()

/**
 * Iterate through an editable content tree and generate ids where missing.
 *
 * @param {[]} rows
 * @param {[]} cells
 * @param {string} id
 * @param {{}} props
 */
export const hydrate = ({ rows = [], cells = [], id = uuid.v4(), ...props }) => ({
  ...props,
  id,
  rows: rows.map(hydrate),
  cells: cells.map(hydrate)
})

/**
 * ContentService is an abstraction layer for fetching and storing editable content trees.
 */
class ContentService {
  /**
   * Pass a list of adapters to use.
   *
   * @param {[]} adapters
   */
  constructor(adapters = [localStorageAdapter]) {
    this.adapters = adapters
  }

  /**
   * Pass a DOM entity and fetch it's content tree.
   *
   * @param {{}} domEntity a DOM entity returned by, for example, document.getElementById()
   * @returns {Promise}
   */
  fetch(domEntity) {
    return new Promise((res) => {
      const found = this.adapters.find((adapter) => adapter.fetch(domEntity))

      if (!found) {
        console.warn('No content state found for DOM entity:', domEntity)
        return res({
          id: uuid.v4(),
          rows: []
        })
      }

      const { rows = [], id = uuid.v4(), ...content } = found
      return res({
        ...content,
        id,
        rows: rows.map(hydrate)
      })
    })
  }

  /**
   * Persist a DOM entity's content tree.
   *
   * @param state
   */
  store(state = {}) {
    return new Promise((res) => {
      this.adapters.forEach((adapter) => adapter.store(state))
      res()
    })
  }
}

export default ContentService
