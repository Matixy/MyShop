import { reactive, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { defineStore } from 'pinia'

// composables
import { deepCloneObject } from '@/use/useDeepCloneObject'
import { changeSpecificQueryParam } from '@/use/useChangeSpecificQueryParam'

const urlProducts = 'https://dummyjson.com/products?limit=0'

export const useStoreProducts = defineStore('storeProducts', () => {

  // route & router
  const route = useRoute()
  const router = useRouter()

  // ref's
  const products = reactive({
    list: [],
    fetch() {
      return new Promise ((resolve, reject) => {
        resolve(importProducts())
      })
    },
    isLoaded: false,
  })

  const categoryExisting = (categoryName) => {
    return new Promise ((resolve, reject) => {
      if(getProductsFromCategory(categoryName).length) {
        resolve(true)
      } else {
        resolve(false)
      }
    })
  }
  
  // Products
  const importProducts = async () => {
    await fetch(urlProducts)
      .then(res => res.json())
      .then(json => {
        products.list = [...json.products]
        products.isLoaded = true
      });
  }

  //  sorting

  const sort = (productsArray) => {
    if (route.query.orderBy) {
      let sortOption = JSON.parse(route.query.orderBy)
      if (sortOption === 'priceDESC') {
        productsArray.sort((a, b) => b.price - a.price)
      } else if (sortOption === 'priceASC') {
        productsArray.sort((a, b) => a.price - b.price)
      } else if (sortOption === 'titleASC') {
        productsArray.sort((a, b) => a.title.toLowerCase().localeCompare(b.title.toLowerCase()))
      } else if (sortOption === 'titleDESC') {
        productsArray.sort((a, b) => b.title.toLowerCase().localeCompare(a.title.toLowerCase()))
      }
    }

    return productsArray
  }

  // product getters 

  const countAllProducts = computed(() => products.list.length)
  const getProductsFromCurrentCategory = computed(()=> sort(getProductsFromCategory(route.params.category)))

  // Categories

  const getProductsFromCategory = (categoryName = route.params.category) => categoryName == 'allProducts' ? [...products.list] : [...products.list].filter(product => product.category === categoryName)

  const countProductsInCategory = (categoryName) => getProductsFromCategory(categoryName).length

  const prepareCategoriesArray = (array) => {
    return array.map(category => {
      return {
        name: category,
        numberOfProducts: countProductsInCategory(category)
      }
    })
  }

  const getCategories = computed(() => {
    let productsList = [...products.list]
    let categories = []

    for (const product of productsList) {
      if (!categories.includes(product.category)) categories.push(product.category)
    }
    
    categories = prepareCategoriesArray(categories)

    return categories
  })
  
  // filters

  const prepareNumberFilterOption = (array) => {
    return {
      minValue: Math.min(...array),
      maxValue: Math.max(...array)
    }
  }

  const setProductsFiltersObject = (products) => {
    const productsObject = deepCloneObject(products)

    // set which object key will not be filter key
    const noFiltersKeys = ["id", "title", "description", "thumbnail", "images"]
    if (!(route.params.category === 'allProducts')) noFiltersKeys.push("category")

    const filterData = {}

    for (const product of productsObject) {
      for (const filterKey in product) {
        if (!noFiltersKeys.includes(filterKey)) {
        
          if (!Object.keys(filterData).includes(filterKey)) filterData[filterKey] = []

          if (!filterData[filterKey].includes(product[filterKey])) filterData[filterKey].push(product[filterKey])
        }
      }
    }

    // sorting && setting number filters
    for (const filterKey in filterData) {
      typeof filterData[filterKey][0] === 'string' ? filterData[filterKey].sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase())) : filterData[filterKey] = prepareNumberFilterOption(filterData[filterKey])
    }

    return filterData
  }

  const getProductsFilters = computed(()=> setProductsFiltersObject(getProductsFromCurrentCategory.value))
  
  const getProductsCurrentFilters = computed(()=> {
    if (!route.query.filters) {
      return deepCloneObject(getProductsFilters.value)
    } else {
      let filters = deepCloneObject(getProductsFilters.value)
      let urlFilters = JSON.parse(route.query.filters)

      for (const filterKey in filters) {
        if (Object.keys(urlFilters).includes(filterKey)) {
          filters[filterKey] = urlFilters[filterKey]
        }
      }

      return filters
    }
  })

  // 
  // currentFilters manipulate
  // 

  const deleteFilter = (filterValue, filterKey) => {
    let filters = JSON.parse(route.query.filters)

    if (filters[filterKey].includes(filterValue)) {
      filters[filterKey].splice(filters[filterKey].indexOf(filterValue), 1)
      if (!filters[filterKey].length) delete filters[filterKey]
    }

    filters = JSON.stringify(filters)

    changeSpecificQueryParam('filters', route, router, filters)
  }

  const addFilter = (filterValue, filterKey) => {
    let filters 

    try {
      filters = JSON.parse(route.query.filters)
    } catch {
      filters = {}
    }

    if (typeof filterValue === 'object') {
      if(JSON.stringify(filterValue) !== JSON.stringify(getProductsFilters.value[filterKey])) {
        filters[filterKey] = filterValue
      }
    } else {
      if (filters[filterKey]) {
        filters[filterKey].push(filterValue)
      } else {
        filters[filterKey] = [filterValue]
      }
    }

    filters = JSON.stringify(filters)

    changeSpecificQueryParam('filters', route, router, filters)
  }

  const clearFilter = (filterKey) => {
    try {
      let filters = JSON.parse(route.query.filters)

      delete filters[filterKey]
  
      filters = JSON.stringify(filters)
  
      changeSpecificQueryParam('filters', route, router, filters)
    } catch {}
  }

  return { products, categoryExisting, getProductsFromCategory, deleteFilter, addFilter, clearFilter, setProductsFiltersObject, getProductsFromCurrentCategory, countAllProducts, getCategories, getProductsFilters, getProductsCurrentFilters }
})
