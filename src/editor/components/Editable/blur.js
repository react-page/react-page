// @flow
let instantiated = 0

// We need to stop some events from bubbling up
const blurAll = (blurAllCells: Function) => (e: Event) => {
  let c = e.target
  if (c instanceof HTMLElement) {
    /* eslint no-cond-assign: ["off"] */
    while (c = c.parentElement) {
      if (c.classList.contains('editor-container')) {
        return
      }
    }
    /* eslint no-cond-assign: ["error"] */
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
