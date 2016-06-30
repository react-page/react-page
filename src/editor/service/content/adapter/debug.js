const content = {
  1: {
    id: '1',
    rows: []
  },
  2: {
    id: '2',
    rows: []
  }
}

export class DebugAdapter {
  fetch(element) {
    const id = element.dataset.editableId
    return content[id] || null
  }

  store(state = {}) {
    console.warn('Debug adapter can\'t persist state: ', state)
  }
}
