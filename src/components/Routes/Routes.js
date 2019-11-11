import React from 'react'
import { Router, Scene, Stack } from 'react-native-router-flux'
import Login from '../Login/Login';
import SignUp from '../SignUp/SignUp';
import Home from '../Home/Home';
import ProfileEdit from '../Profile/ProfileEdit';
import ProductCreate from '../Product/ProductCreate';
import ProductEdit from '../Product/ProductEdit';
import ProductTrade from '../Product/ProductTrade';
import ProductMatches from '../Product/ProductMatches';
import Chat from '../Chat/Chat'

const Routes = () => (
  <Router>
    <Stack key="root">
      <Scene key = "login" component = {Login} title = "Login" initial = {true} />
      <Scene key = "signup" component = {SignUp} title = "Cadastro" />
      <Scene key = "chat" component = {Chat} title = "Chat" />
      <Scene key = "home" component = {Home} title = "Home" />
      <Scene key = "matches" component = {ProductMatches} title = "Seus Matches" />
      <Scene key = "profileEdit" component = {ProfileEdit} title = "Editar Perfil" />
      <Scene key = "productCreate" component = {ProductCreate} title = "Cadastrar Produto" />
      <Scene key = "productEdit" component = {ProductEdit} title = "Editar Produto" />
      <Scene key = "productTrade" component = {ProductTrade} title = "Troca de Produto" />
    </Stack>
  </Router>
)

export default Routes;
