import Vue from 'vue'
import VueRouter from 'vue-router'

import discovery from '@/views/discovery'
import playList from '@/views/playList'
import songs from '@/views/songs'
import mvs from '@/views/mvs'
import result from '@/views/result'
import list from '@/views/list'
import mv from '@/views/mv'

Vue.use(VueRouter)

const routes = [
  { path: '/', component: discovery },
  { path: '/discovery', component: discovery },
  { path: '/playlist', component: playList },
  { path: '/songs', component: songs },
  { path: '/mvs', component: mvs },
  { path: '/result', component: result },
  { path: '/list', component: list },
  { path: '/mv', component: mv }
]

const router = new VueRouter({
  routes
})

export default router
