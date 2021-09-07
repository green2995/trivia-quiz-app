import React from 'react'
import { Responsive } from './Context'
import Routes from './Routes'

const App = () => {
  return (
    <Responsive.Provider>
      <Routes />
    </Responsive.Provider>
  )
}

export default App
