import { LocalStoreAdapter } from './adapter/local'
import uuid from 'node-uuid'

const localStorageAdapter = new LocalStoreAdapter()

/**
 * Iterate through an editable content tree and generate ids where missing.
 *
 * @param {[]} rows
 * @param {[]} cells
 * @param {string} id
 * @param {{}} props
 */
export const hydrate = ({ rows = [], cells = [], id, ...props }) => ({
  ...props,
  id: id || uuid.v4(),
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
   * Pass a DOM entity and fetch
   *
   * @param {{}} domEntity
   * @returns {{}}
   */
  fetch(domEntity) {
    const found = this.adapters.find((adapter) => adapter.fetch(domEntity))
    if (!found) {
      console.warn('No content state found for DOM entity:', domEntity)
      return {
        rows: []
      }
    }

    const { rows = [], ...content } = found
    return {
      ...content,
      rows: rows.map(hydrate)
    }
  }

  store(state = {}) {
    this.adapters.forEach((adapter) => adapter.store(state))
  }
}

export default ContentService
