import React from 'react'
import { Router, Scene, Stack } from 'react-native-router-flux'
import Login from '../Login/Login';
import SignUp from '../SignUp/SignUp';
import Home from '../Home/Home';
import ProfileEdit from '../Profile/ProfileEdit';
import ProductCreate from '../Product/ProductCreate';
import ProductEdit from '../Product/ProductEdit';

const Routes = () => (
  <Router>
    <Stack key="root">
      <Scene key = "login" component = {Login} title = "Login" initial = {true} />
      <Scene key = "signup" component = {SignUp} title = "Cadastro" />
      <Scene key = "home" component = {Home} title = "Home" />
      <Scene key = "profileEdit" component = {ProfileEdit} title = "Editar Perfil" />
      <Scene key = "productCreate" component = {ProductCreate} title = "Cadastrar Produto" />
      <Scene key = "productEdit" component = {ProductEdit} title = "Editar Produto" />
    </Stack>
  </Router>
)

export default Routes;
