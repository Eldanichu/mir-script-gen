import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '@/views/Index.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'hash',
  base: './',
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index,
      children: [
        {
          path:'/scriptGen',
          name:'scriptGen',
          component:()=>import('@/views/pages/ScriptGen/index')
        }
      ]
    },
  ]
})

export default router
