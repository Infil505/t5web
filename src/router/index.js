import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // Página principal
    {
      path: '/',
      name: 'home',
      component: HomeView
    },

    // Vista de autores
    {
      path: '/autores',
      name: 'autores',
      component: () => import('../views/AuthorsView.vue')
    },

    // Vista de libros
    {
      path: '/libros',
      name: 'libros',
      component: () => import('../views/BooksView.vue')
    },

    // Vista de editoriales
    {
      path: '/editoriales',
      name: 'editoriales',
      component: () => import('../views/EditorialsView.vue')
    },

    // Vista de clasificación
    {
      path: '/clasificacion',
      name: 'clasificacion',
      component: () => import('../views/ClassificationView.vue')
    },


    {
      path: '/:pathMatch(.*)*',
      redirect: '/'
    }
  ]
})

export default router
