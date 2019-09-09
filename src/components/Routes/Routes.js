import React from 'react'
import { Router, Scene, Stack } from 'react-native-router-flux'
import Login from '../Login/Login';
import SignUp from '../SignUp/SignUp';

const Routes = () => (
  <Router>
    <Stack key="root">
      <Scene key = "login" component = {Login} title = "Login" initial = {true} />
      <Scene key = "signup" component = {SignUp} title = "SignUp" />
    </Stack>
  </Router>
)

export default Routes;
