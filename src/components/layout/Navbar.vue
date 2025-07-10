<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary position-relative" aria-label="Page navigation">
    <div class="container-xxl position-relative">
      <div class="d-flex align-items-center">
        <div class="navbar-brand">
          <RouterLink class="navbar-text text-decoration-none" to="/">
            <h1 class="font-monospace">My Shop</h1>
          </RouterLink>
        </div>

        <IconAlertInNavbar
          linkTo = "/user"
        >
          <template #icon>
            <font-awesome-icon icon="fa-solid fa-user" class="mx-2 navbar-text"/>
          </template>
        </IconAlertInNavbar>

        <IconAlertInNavbar
          linkTo = "/cart"
        >
          <template #icon>
            <font-awesome-icon icon="fa-solid fa-cart-shopping" class="mx-2 navbar-text"/>
          </template>
        </IconAlertInNavbar>

        <IconAlertInNavbar
          linkTo = "/favourites"
          :alertText = "storeFavouritesProducts.countFavouritesProducts"
        >
          <template #icon>
            <font-awesome-icon icon="fa-solid fa-heart" class="mx-2 navbar-text"/>
          </template>
        </IconAlertInNavbar>
      </div>

      <button
        ref="hamburgerIconRef"
        @click.prevent="showMobileNav = !showMobileNav"
        class="navbar-toggler "
        type="button"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div
        ref="mobileNavRef"
        class="collapse navbar-collapse justify-content-end"
        :class="{'show': showMobileNav}"
      >
        <div class="nav-abs d-flex bg-body-tertiary px-2 py-2">
        <div class="navbar-text me-2">
            <RouterLink
              to="/products/allProducts"
              class="btn btn-outline-dark"
            >
              Wszystkie produkty
            </RouterLink>
        </div>
        <ul class="navbar-nav my-2 me-md-2">
          <li class="nav-item dropdown">
            <button
              @click="showCategories = !showCategories"
              type="button"
              class="btn dropdown-toggle "
            >
              Produkty
            </button>
            <ul
              class="dropdown-menu navbar-nav-scroll overflow-y-auto overflow-x-hidden"
              :class="{'show': showCategories}"
            >
              <li
                v-for="category in storeProducts.getCategories"
                :id="category.id"
              >
                <RouterLink class="dropdown-item" :to="`/products/${category.name}`">{{convertToTitleCase(category.name)}}</RouterLink>
              </li>
            </ul>
          </li>
        </ul>
        <form
          @click.prevent = openSearchMenu
          class="d-flex"
          role="search"
        >
          <input
            class="form-control  me-2"
            type="search"
            placeholder="Wyszukaj produkt"
            aria-label="Wyszukaj produkt"
          />
          <button class="btn btn-outline-dark" type="submit">
            <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
          </button>
        </form>
        </div>
      </div>
    </div>
  </nav>


  <SearchProducts
    @hideSearchProducts = hideSearchMenu
    ref="showSearchProductsRef"
    v-if="showSearchProducts"
  />
</template>

<script setup>
//
// imports
//

  import { ref, watch } from "vue"
  import { useRoute } from "vue-router"
  import { onClickOutside } from '@vueuse/core'

  // components
  import SearchProducts from '@/components/layout/SearchProducts.vue'
  import IconAlertInNavbar from '@/components/layout/IconAlertInNavbar.vue'
  
  // composables
  import { convertToTitleCase } from '@/use/useConvertCamelToTitleCase'

  // store
  import { useStoreProducts } from "@/stores/storeProducts"
  import { useStoreFavouritesProducts } from '@/stores/storeFavouritesProducts.js'

// 
// route
// 

  const route = useRoute()

// 
// storeProducts
// 

  const storeProducts = useStoreProducts()

// 
// storeFavouritesProducts
// 

  const storeFavouritesProducts = useStoreFavouritesProducts()
  
//
// show mobile nav
//
  
  const showMobileNav = ref(false)
  
// 
// show categories dropdown
// 
  
  const showCategories = ref(false)

// 
// showSearchProducts menu
// 

  const showSearchProducts = ref(false)
  const showSearchProductsRef = ref(null)

// 
// close Navbar when change route
// 

  watch(() => route.fullPath, () =>  {
    showMobileNav.value = false
    showCategories.value = false
    hideSearchMenu()
  })

// 
// block scroll when search menu is open
// 
  
  const openSearchMenu = () => {
    document.querySelector('body').classList.add('overflow-hidden')
    showSearchProducts.value = true
  }

  const hideSearchMenu = () => {
    document.querySelector('body').classList.remove('overflow-hidden')
    showSearchProducts.value = false
  }

// 
// click outside mobileNav
// 

  const mobileNavRef = ref(null)
  const hamburgerIconRef = ref(null)

  onClickOutside(mobileNavRef, () => {
    showMobileNav.value = false
    showCategories.value = false
  },  
    {
      ignore: [hamburgerIconRef, showSearchProductsRef]
    }
  )



</script>

<style scoped>

.btn-outline-dark:hover {
  color: #fff;
}

@media (max-width: 991.98px){
  .nav-abs {
    flex-direction: column;
    position: absolute;
    left: 0;
    width: 100%;
    z-index: 1;
  }
  
  .navbar-nav-scroll {
    --bs-scroll-height: 9em;
  }
}

@media (min-width: 992px){ 
  .navbar-nav-scroll {
    max-height: 20em;
  }
}

</style>
