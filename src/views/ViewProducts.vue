<template>
  <!-- Info banner -->
  <div class="container-fluid bg-body-secondary">
    <div
      class="container-xxl p-0"
      ref="productsNavRef"
    >
      <ProductsNav 
      :productsLength = "filteredProductsArray.length"
      v-model = "productsOnPage"
      />
    </div>
  </div>

  <!-- Products -->
  <div
    class="w-100"
    :class="{ 'placeholder bg-white': placeholder}"
  >
    <div
      class="container-xxl p-0 placeholder-glow" 
    >
      <div
        v-if="filteredProductsArray.length > 0"
        class="row justify-content-center p-2 m-0 w-100"
      >
        <ProductCard
          v-for="product in arrayProductsToDisplay"
          :key = product.id
          :product = product
        />
      </div>

      <template
        v-else
      >
        <div class="text-center my-5">
          <h4
            class="display-6 mb-5"
            v-if="storeProducts.products.isLoaded && !placeholder"
          >
            Przepraszamy ale nie mamy żadnych takich produktów 
            <small class="text-body-secondary fs-5 d-block">
              <routerLink
                class="btn btn-outline-dark"
                :to="{
                  params: {
                    category: route.params.category
                  },
                  query: {
                    filters: undefined,
                    orderBy: route.query.orderBy
                  }
                }"
              >
                wyczyścić filtry
              </routerLink>
              <routerLink
                class="btn btn-outline-dark ms-3"
                to="/"
              >
                powróć do strony głównej
              </routerLink>
            </small>
          </h4>

          <div
            class="spinner-border text-dark"
            role="status"
            v-else
          >
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
      </template>

      <!-- footer- pagination -->
      <nav
        v-if="numbersOfPage > 1 && arrayProductsToDisplay.length"
        ref="paginationRef"
      >
        <ul
          class="pagination justify-content-center pagination-cursor-pointer noselect"
        >
          <li 
            class="page-item"
          >
            <a
              @click="handleChangePageClick(actualPage-1)"
              :class="{ disabled: pageIndexes.length == 1}"
              class="page-link link-dark"
            >
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          <li
            v-for="number in pageIndexes"
            class="page-item "
          >
            <a
              @click="handleChangePageClick(number)"
              :class="{ active: actualPage == number}"
              class="page-link link-dark"
            >
              {{ number }}
            </a>
          </li>
        <li
            class="page-item"
          >
            <a
              @click="handleChangePageClick(actualPage+1)"
              :class="{ disabled: pageIndexes.length == 1}"
              class="page-link link-dark"
            >
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script setup>
//
// import
//

  import { ref, computed, watch } from "vue"
  import { useRoute, useRouter } from "vue-router"

  import { promiseTimeout } from '@vueuse/core'

  // components
  import ProductsNav from "@/components/layout/ProductsNav.vue"
  import ProductCard from "@/components/products/ProductCard.vue"

  // stores
  import { useStoreProducts } from '@/stores/storeProducts.js'

  // composables
  import { changeSpecificQueryParam } from '@/use/useChangeSpecificQueryParam'

// 
// storeProducts
// 

  const storeProducts = useStoreProducts()

//
// route & router
//

  const route = useRoute()
  const router = useRouter()
  
// 
// products
//   

  const filteredProductsArray = computed(() => {
    let productsToDel = []

    storeProducts.getProductsFromCurrentCategory.forEach(product => {

      for (const filterKey in storeProducts.getProductsCurrentFilters) {

        if (Array.isArray(storeProducts.getProductsCurrentFilters[filterKey])) {
          if (!storeProducts.getProductsCurrentFilters[filterKey].includes(product[filterKey]) && !productsToDel.includes(product)) {
            productsToDel.push(product)
          }

        } else {
          if (product[filterKey] > storeProducts.getProductsCurrentFilters[filterKey].maxValue || product[filterKey] < storeProducts.getProductsCurrentFilters[filterKey].minValue && !productsToDel.includes(product)) {
            productsToDel.push(product)
          }

        }
      }
    })

    return storeProducts.getProductsFromCurrentCategory.filter(product => !productsToDel.includes(product))
  })

// 
// pagination
// 


  const productsOnPage = ref(15)

  const numbersOfPage = computed(()=> Math.ceil(filteredProductsArray.value.length / productsOnPage.value))

  let actualPage = computed(()=> route.query.page ? parseInt(route.query.page) : 1)

  const productsOnActualPage = computed(()=> filteredProductsArray.value.slice((actualPage.value - 1) * productsOnPage.value, productsOnPage.value * actualPage.value))

  const pageIndexes = computed(()=> {
    let indexTable = []
    let index = actualPage.value

    while (indexTable.length < 3 && index - 1 <= numbersOfPage.value && index > 0) {
      if (actualPage.value == numbersOfPage.value) {
        indexTable.unshift(index)
        index--
      } else {
        if (index === 1) {
          indexTable.push(index)
          index++
        } else { 
          indexTable.push(index - 1)
        }
        index++
      }

    }

    return indexTable
  })

  watch(()=> filteredProductsArray.value, (newFilterArrayValue, oldFilterArrayValue) => {
    if (JSON.stringify(newFilterArrayValue) !== JSON.stringify(oldFilterArrayValue)) {
      changeSpecificQueryParam('page', route, router)
    }
  })

  watch(()=> productsOnPage.value , () => {
    changeSpecificQueryParam('page', route, router)
    loadingProductsEffect()
  })

  // pagination - effects 

  const productsNavRef = ref(null)

  const handleChangePageClick = (nextPage) => {
    productsNavRef.value.scrollIntoView()

    if (nextPage === 0) {
      nextPage = numbersOfPage.value
    } else if (nextPage > numbersOfPage.value) {
      nextPage = 1
    }

    changeSpecificQueryParam('page', route, router, nextPage)
  }

// 
// loading effects
// 

  let arrayProductsToDisplay = ref(productsOnActualPage.value)

  const placeholder = ref(false)

  const loadingProductsEffect = async () => {
    placeholder.value = true

    await promiseTimeout(300)

    arrayProductsToDisplay.value = productsOnActualPage.value
    placeholder.value = false
  }

  watch(()=> route.fullPath, () => {
    loadingProductsEffect()
  })
  
</script>

<style scoped>

.pagination-cursor-pointer:hover {
  cursor: pointer;
}

</style>
