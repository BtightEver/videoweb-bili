import Vue from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'

import Home from '@/views/home/carouselMap.vue'
import Information from '@/views/information/aboutUs.vue'
import Message from '@/views/message/messagePlate.vue'
import Product from '@/views/product/productPlate.vue'
import videoPlate from '@/views/video/videoPlate.vue'
import Vtype from '@/views/video/v-type/videoType.vue'

export const constantRoutes = [
  {
    path: '/Login',
    component: () => import('@/views/user/Login'),
    hidden: true
  },
  {
    path: '/MainView',
    component: () => import('@/views/MainView'),
    hidden: true
  },
  {
    path: '/UserView',
    component: () => import('@/views/user/UserView'),
    hidden: true
  },
  {
    name: '/SearchView',
    path: '/SearchView',
    component: () => import('@/views/SearchView'),
    hidden: true,
    props(route) {
      return route.query
    }
  },
  {
    path: '/Registery',
    component: () => import('@/views/user/Registery'),
    hidden: true
  },
  {
    path: '/Update',
    component: () => import('@/views/user/Update'),
    hidden: true
  },
  {
    path: '/UpdatePassWord',
    component: () => import('@/views/user/UpdatePassword'),
    hidden: true
  },
  {
    path: '/Comment',
    component: () => import('@/views/video/Comment'),
    hidden: true
  },
  {
    path: '/Comment',
    component: () => import('@/views/video/Comment'),
    hidden: true
  },
  {
    path: '/PlayerView',
    component: () => import('@/views/video/PlayerView'),
    hidden: true,
    props(route) {
      return route.query
    }
  },
  {
    path: '/CollectionView',
    component: () => import('@/views/user/CollectionView'),
    hidden: true
  },
  {
    path: '/CommentView',
    component: () => import('@/views/user/CommentView'),
    hidden: true
  },
  {
    path: '/EditAccountView',
    component: () => import('@/views/user/EditAccountView'),
    hidden: true
  },
  {
    path: '/FavoriteView',
    component: () => import('@/views/user/FavoriteView'),
    hidden: true
  },
  {
    path: '/MessageView',
    component: () => import('@/views/user/MessageView'),
    hidden: true
  },
  {
    path: '/UserView',
    component: () => import('@/views/user/UserView'),
    hidden: true
  },
  {
    path: '/UploadView',
    component: () => import('@/views/user/UploadView'),
    hidden: true
  },
  {
    path: '/EditInfoView',
    component: () => import('@/views/user/EditInfoView'),
    hidden: true
  },


  {
    path: '/',
    component: Home,
    redirect: '/home',
    children: [
      {
        path: '/home',
        component: Home,
      }
    ]
  },
  {
    path: '/information',
    component: Information
  },
  {
    path: '/message',
    component: Message
  },
  {
    path: '/product',
    component: Product
  },
  {
    path: '/video',
    component: videoPlate,
    redirect: '/video/type/type1',
    children: [
      {
        path: 'type/:id',
        component: Vtype
      }
    ]
  },
  {
    path: '/banner1',
    component: () => import('@/views/home/banner/b1/carouselMap1')
  },
  {
    path: '/banner2',
    component: () => import('@/views/home/banner/b2/carouselMap2')
  },
  {
    path: '/banner3',
    component: () => import('@/views/home/banner/b3/carouselMap3')
  },
  {
    path: '/banner4',
    component: () => import('@/views/home/banner/b4/carouselMap4')
  },
  {
    path: '/banner5',
    component: () => import('@/views/home/banner/b5/carouselMap5')
  },

  {
    path: '/DigitalFinance/:id',
    component: () => import('@/views/product/digitalFinance/DigitalFinance.vue'),
  },
  {
    path: '/DigitalTechnology/:id',
    component: () => import('@/views/product/digitalTechnology/DigitalTechnology.vue')
  },
  {
    path: '/WisdomHealth-care/:id',
    component: () => import('@/views/product/wisdomHealth-care/WisdomHealth-care.vue')
  }
]

const router = createRouter({
  // mode: 'history', // require service support
  history: createWebHashHistory(),
  routes: constantRoutes
})


export default router
