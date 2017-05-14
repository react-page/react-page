// @flow
let instantiated = 0

// We need to stop some events from bubbling up, so we go up the tree from
// the event source and check if one of the parents is the root editor node.
// If not, we blur all cells because the editor lost focus.
const blurAll = (blurAllCells: Function) => (e: Event) => {
  let c = e.target
  if (c instanceof HTMLElement) {
    if (c.classList.contains('ory-prevent-blur')) {
      return
    }

    /* eslint no-cond-assign: ["off"] */
    while ((c = c.parentElement)) {
      if (c.classList.contains('ory-prevent-blur')) {
        return
      }
    }
    blurAllCells()
  }
}

export const enableGlobalBlurring = (blurAllCells: Function) => {
  if (instantiated === 0 && document && document.body) {
    document.body.addEventListener('mousedown', blurAll(blurAllCells))
    instantiated = 1
    return blurAll(blurAllCells)
  }

  if (instantiated > 0) {
    instantiated += 1
  }
}

export const disableGlobalBlurring = (blurAllCells: Function) => {
  if (!instantiated === 1 && document && document.body) {
    document.body.removeEventListener('mousedown', blurAll(blurAllCells))
    instantiated = 0
    return blurAll(blurAllCells)
  }

  if (instantiated > 0) {
    instantiated -= 1
  }
}
