/* eslint-disable no-console */
import consolePlugin from 'raven-js/plugins/console'
import { isProduction } from './const'

let Raven

export const connectToRaven = (errorReporting = true) => {
  if (Raven) {
    return Raven
  }

  if (isProduction && window !== 'undefined' && errorReporting) {
    Raven = require('raven-js')
    Raven.config('https://7ccaf04e48474399bb705ecbd317e6ce@sentry.io/95510').install()
  }

  return Raven
}

export const watchConsole = () => {
  consolePlugin(connectToRaven(), console)
}

export const logException = (ex: any, context: any) => {
  if (Raven) {
    Raven.captureException(ex, {
      extra: context
    })
  }

  throw ex
  // return window.console && console.error && console.error(ex)
}
