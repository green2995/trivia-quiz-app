import React from 'react'
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch
} from "react-router-dom"
import Header from './Components/specific/Header'
import Home from './Pages/Home'
import Trivia from './Pages/Trivia'
import { AbsoluteFill, Flex } from './Styled/Generic'

const Routes = () => {
  return (
    <Router>
      <Header/>
      <Flex style={{flex: 1}}>
        <Switch>
          <Route exact path={"/"} render={() => <Redirect to={"/home"} />} />
          <Route path={"/home"} component={Home} />
          <Route path={"/trivia"} component={Trivia} />
        </Switch>
      </Flex>
    </Router>
  )
}



export default Routes
