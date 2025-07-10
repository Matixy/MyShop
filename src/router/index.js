import { createRouter, createWebHashHistory } from 'vue-router'

// stores
import { useStoreProducts } from '@/stores/storeProducts.js'

// composables
import { deepCloneObject } from '@/use/useDeepCloneObject'

// functions 
function removeParams(to) {
  if (Object.keys(to.params).length)
    return { name: to.name, params: {}, query: to.query}
}

function removeQueryParams(to) {
  if (Object.keys(to.query).length)
    return { path: to.path, query: {}}
}

function removeEmptyQueryParamsObjects(to) {
  const queryObject = deepCloneObject(to.query)

  for (const queryKey in queryObject) {
    let queryParam = JSON.parse(queryObject[queryKey])
    if (typeof queryParam === 'object' && !Object.keys(queryParam).length) {
      delete queryObject[queryKey]
    }
  }

  if (JSON.stringify(to.query) !== JSON.stringify(queryObject)) {
    return {
      path: to.path, 
      query: queryObject
    }
  }
}

// components
import ViewCategories from '@/views/ViewCategories.vue'
import ViewProducts from '@/views/ViewProducts.vue'
import ViewFavourites from '@/views/ViewFavourites.vue'
import ViewUser from '@/views/ViewUser.vue'
import ViewProduct from '@/views/ViewProduct.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      alias: '/:pathMatch(.*)*',
      name: 'categories',
      beforeEnter: [removeParams, removeQueryParams],
      component: ViewCategories
    },
    {
      path: '/products/:category',
      name: 'products',
      query: {
        filters: Object,
        orderBy: String,
        page: Number,
      },
      component: ViewProducts
    },
    {
      path: '/favourites',
      name: 'favourites',
      component: ViewFavourites
    },
    {
      path: '/user',
      name: 'user',
      component: ViewUser
    },
    {
      path: '/product/:productName',
      name: 'product',
      component: ViewProduct
    }
  ]
})


router.beforeEach(async (to, from) => {
  const storeProducts = useStoreProducts()
  // fetch data from api when user go to site
  if (!from.name) {
    await storeProducts.products.fetch()
  }
  
  if (to.name == 'products') {
    // prevent invalid category name
    const categoryExist = await storeProducts.categoryExisting(to.params.category)
    if (!categoryExist) {
      return false
    }

    // prevent invalid queryParams names
    const correctQueryKeys = ['filters', 'orderBy', 'page']
    for (const queryKey in to.query) {
      if(!correctQueryKeys.includes(queryKey)) {
        return false
      }
    }

    // delete page query when equals 1 (default value)
    if (to.query.page === 1) {
      let queryObject = deepCloneObject(to.query)
      query.page = undefined
      return { path: to.path, query: queryObject}
    }

    return removeEmptyQueryParamsObjects(to)
  }


})


export default router
