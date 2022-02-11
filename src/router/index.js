import Vue from 'vue'
import VueRouter from 'vue-router'
import Connexion from '../views/ConfigurateurOffres/Connexion.vue'
import Deconnexion from '../views/ConfigurateurOffres/Deconnexion.vue'
import MentionsLegales from '../views/MentionsLegales.vue'
import Inscription from '../views/ConfigurateurOffres/Inscription.vue'
import Compte from '../views/ConfigurateurOffres/Compte.vue'
import AdminPage from '../views/ConfigurateurOffres/AdminPage.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Connexion',
    component: Connexion
  },
  {
    path: '/deconnexion',
    name: 'Deconnexion',
    component: Deconnexion
  },
  {
    path: '/mentionslegales',
    name: 'MentionsLegales',
    component: MentionsLegales
  },
  {
    path: '/inscription',
    name: 'Inscription',
    component: Inscription,
  },
  {
    path: '/compte',
    name: 'Compte',
    component: Compte,
    // beforeEnter: (to,from,next) => {
    //   if (to.name == 'Compte' && !sessionStorage.getItem('userId')) next({ name: 'Home' })
    //   next()
    // }
  },
  {
    path: '/admin-page',
    name: 'AdminPage',
    component: AdminPage,
    // beforeEnter: (to,from,next) => {
    //   if (to.name == 'AdminPage' && !sessionStorage.getItem('userId')) next({ name: 'Home' })
    //   next()
    // }
  }
]

const router = new VueRouter({
  routes,
  scrollBehavior() {
    return {x: 0, y: 0}
  }
})

export default router
