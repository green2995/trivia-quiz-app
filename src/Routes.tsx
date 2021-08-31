import React from 'react'
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch
} from "react-router-dom"
import Home from './Pages/Home'
import Trivia from './Pages/Trivia'

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path={"/"} render={() => <Redirect to={"/home"} />} />
        <Route path={"/home"} component={Home} />
        <Route path={"/trivia"} component={Trivia} />
      </Switch>
    </Router>
  )
}

export default Routes