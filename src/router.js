import Vue from "vue"
import VueRouter from 'vue-router'

import Home from './pages/Home'
import GameNew from './pages/GameNew'
import GameRules from './pages/GameRules'
import UserInfo from './pages/UserInfo'

Vue.use(VueRouter)

const Foo = { template: '<div>foo</div>' }
const Bar = { template: '<div>bar</div>' }

const routes = [
  { path: '/', component: Home },
  { path: '/game-new', component: GameNew },
  { path: '/game-rules', component: GameRules },
  { path: '/user-info', component: UserInfo },
  { path: '/foo', component: Foo },
  { path: '/bar', component: Bar }
]

const router = new VueRouter({
  routes: routes
})

router.beforeEach((to, from, next) => {
  // if(from.path === to.path){
  //   location.reload()
  // }
  next()
})

export default router
