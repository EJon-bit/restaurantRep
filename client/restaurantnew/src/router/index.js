/* eslint-disable */
import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Menu from '@/components/Menu'//add any other pages like this
import ReserveList from '@/components/ReserveList'
import EditTables from '@/components/EditTables'
import EditMenu from '@/components/EditMenu'
import Login from '@/components/Login'
import UserReservePage from '@/components/UserReservePage'
//import { HotModuleReplacementPlugin } from 'webpack';

Vue.use(Router)
//Vue.use(HotModuleReplacementPlugin)

export default new Router({
  
  // defines the path for each page/component(i.e. for each .vue file in components folder)

  mode:'history',
  routes: [
      {
        path: '/',
        name: 'Home',
        component: Home
      },

      {     
        path: '/Menu',     
        name: 'Menu',     
        component: Menu    
      },
      {     
        path: '/ReserveList',     
        name: 'ReserveList',     
        component: ReserveList    
      },
      {     
        path: '/EditTables',     
        name: 'EditTables',     
        component: EditTables    
      },
      {     
        path: '/EditMenu',     
        name: 'EditMenu',     
        component: EditMenu    
      },
      {
        path: '/Login',     
        name: 'Login',     
        component: Login  

      },
      {
        path: '/Reservation/User',     
        name: 'UserReservePage',     
        component: UserReservePage 

      }
    ],
});
