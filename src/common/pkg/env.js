/* global process */
export const isProduction = (env) => (env || process.env).NODE_ENV === 'production'
