import { createRouter, createWebHashHistory } from 'vue-router'
import { authGuard } from '@bcwdev/auth0provider-client'

function loadPage(page) {
  return () => import(`./pages/${page}.vue`)
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: loadPage('HomePage'),
    beforeEnter: authGuard
  },
  {
    path: '/projectpage/:id',
    name: 'ProjectPage',
    component: loadPage('ProjectPage'),
    beforeEnter: authGuard,
    children: [{
      path: 'backlogItems',
      name: 'BacklogItem',
      component: loadPage('BacklogItemPage')
    },
    {
      path: 'sprint/:sprintid',
      name: 'Sprint',
      component: loadPage('SprintsPage')
    }]
  },
  {
    path: '/account',
    name: 'Account',
    component: loadPage('AccountPage'),
    beforeEnter: authGuard
  }
]

export const router = createRouter({
  linkActiveClass: 'router-link-active',
  linkExactActiveClass: 'router-link-exact-active',
  history: createWebHashHistory(),
  routes
})
