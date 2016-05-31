import React from 'react'

import configureStore from 'common/store'

const Editable = () => {
    // TODO plugins could apply middlewares here...? #38
    const store = configureStore()({})

    return (
        <div>
            <p>I'm the Ory Editor</p>
        </div>
    )
}

export default Editable
