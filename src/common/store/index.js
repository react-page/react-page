import { identity } from 'ramda'
import { applyMiddleware, compose, createStore } from 'redux'

import rootReducer from 'common/reducers'

export default (...middlewares) => (initialState) => {
    const loadDevTools = typeof window === 'object' && typeof window.devToolsExtension !== 'undefined'

    const store = createStore(
        rootReducer,
        initialState,
        compose(
            applyMiddleware(...middlewares),
            loadDevTools ? window.devToolsExtension() : identity
        ))

    if (!isProduction()) {
        if (module.hot) {
            module.hot.accept('common/reducers', () => {
                const nextRootReducer = require('common/reducers')
                store.replaceReducer(nextRootReducer)
            })
        }
    }

    return store
}
