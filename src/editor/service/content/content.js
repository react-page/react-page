import LocalStoreAdapter from './adapter/local'

class ContentService {
  constructor(adapters = [
    LocalStoreAdapter
  ]) {
    this.adapters = adapters
  }

  fetch(element) {
    return this.adapters.find((adapter) => adapter.fetch(element))
  }

  store(state = {}) {
    this.adapters.forEach((adapter) => adapter.store(state))
  }
}

export default ContentService
