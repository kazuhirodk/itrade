import React from 'react'
import { Router, Scene, Stack } from 'react-native-router-flux'
import Login from '../Login/Login';
import SignUp from '../SignUp/SignUp';
import Home from '../Home/Home';
import ProfileEdit from '../Profile/ProfileEdit';
import ProductCreate from '../Product/ProductCreate';
import ProductEdit from '../Product/ProductEdit';
import ProdutosExpirados from '../Select/ProdutosExpirados';
import LikesExpirados from '../Select/LikesExpirados';
import Select from '../Select/Select';

const Routes = () => (
  <Router>
    <Stack key="root">
      <Scene key = "login" component = {Login} title = "Login" initial = {true} />
      <Scene key = "signup" component = {SignUp} title = "Cadastro" />
      <Scene key = "home" component = {Home} title = "Home" />
      <Scene key = "profileEdit" component = {ProfileEdit} title = "Editar Perfil" />
      <Scene key = "productCreate" component = {ProductCreate} title = "Cadastrar Produto" />
      <Scene key = "productEdit" component = {ProductEdit} title = "Editar Produto" />
      <Scene key = "likesExpirados" component = {LikesExpirados} title = "Likes Expirados" />
      <Scene key = "produtosExpirados" component = {ProdutosExpirados} title = "Produtos Expirados" />
      <Scene key = "select" component = {Select} title = "Tela de seleção" />      
    </Stack>
  </Router>
)

export default Routes;
