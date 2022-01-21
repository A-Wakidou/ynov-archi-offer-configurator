import Vue from 'vue'
import VueRouter from 'vue-router'
import Connexion from '../views/ConfigurateurOffres/Connexion.vue'
import Deconnexion from '../views/ConfigurateurOffres/Deconnexion.vue'
import MentionsLegales from '../views/MentionsLegales.vue'
import Inscription from '../views/ConfigurateurOffres/Inscription.vue'
import Compte from '../views/ConfigurateurOffres/Compte.vue'
import AdminPage from '../views/ConfigurateurOffres/AdminPage.vue'
import ChangementMotDePasse from '../views/ConfigurateurOffres/ChangementMotDePasse.vue'
import ChangementEmail from '../views/ConfigurateurOffres/ChangementEmail.vue'
import SendMailForgottenPassword from '../views/ConfigurateurOffres/SendMailForgottenPassword.vue'
import ForgottenPassword from '../views/ConfigurateurOffres/ForgottenPassword.vue'
import ConfirmationsFormulairesCompte from '../views/ConfigurateurOffres/ConfirmationsFormulairesCompte.vue'

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
  },
  {
    path: '/send-mail-forgotten-password',
    name: 'SendMailForgottenPassword',
    component: SendMailForgottenPassword,
  },
  {
    path: '/forgotten-password/:token',
    name: 'ForgottenPassword',
    component: ForgottenPassword,
  },
  {
    path: '/modifier-m',
    name: 'ChangementMotDePasse',
    component: ChangementMotDePasse,
    // beforeEnter: (to,from,next) => {
    //   if (to.name == 'ChangementMotDePasse' && !sessionStorage.getItem('userId')) next({ name: 'Home' })
    //   next()
    // }
  },
  {
    path: '/modifier-e',
    name: 'ChangementEmail',
    component: ChangementEmail,
    // beforeEnter: (to,from,next) => {
    //   if (to.name == 'ChangementEmail' && !sessionStorage.getItem('userId')) next({ name: 'Home' })
    //   next()
    // }
  },
  {
    path: '/confirmation-compte/:name',
    name: 'ConfirmationsFormulairesCompte',
    component: ConfirmationsFormulairesCompte,
    props:true
  }
]

const router = new VueRouter({
  routes,
  scrollBehavior() {
    return {x: 0, y: 0}
  }
})

export default router
