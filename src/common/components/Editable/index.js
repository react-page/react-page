import React from 'react'

import configureStore from 'common/store'
import createLocalStorage from 'src/common/storage/LocalStorage'

const Editable = () => {
    // TODO plugins could apply middlewares here...? #38
    const storage = configureStore()({})

    return (
        <div>
            <p>I'm the Ory Editor</p>
        </div>
    )
}

export default Editable
