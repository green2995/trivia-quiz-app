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
import { AbsoluteFill } from './Styled/Generic'

const Routes = () => {
  return (
    <Router>
      <Header/>
      <AbsoluteFill style={{marginTop: "3rem"}}>
        <Switch>
          <Route exact path={"/"} render={() => <Redirect to={"/home"} />} />
          <Route path={"/home"} component={Home} />
          <Route path={"/trivia"} component={Trivia} />
        </Switch>
      </AbsoluteFill>
    </Router>
  )
}



export default Routes
