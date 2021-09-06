import React from 'react'
import { Provider } from 'react-redux'
import { store } from './store'
import { Responsive } from './Context'
import Routes from './Routes'

const App = () => {
  return (
    <Provider store={store}>
      <Responsive.Context>
        <Routes />
      </Responsive.Context>
    </Provider>
  )
}

export default App
