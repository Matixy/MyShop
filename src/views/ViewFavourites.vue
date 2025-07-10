<template>
  <div class="container-xxl my-5">
    <h2 class="text-center display-4 mb-5">Twoje polubione produkty</h2>

    <table
      v-if="storeFavouritesProducts.countFavouritesProducts"
      class="table table-hover"
    >
      <ListedProduct 
        v-for="product in storeFavouritesProducts.favouritesProducts"
        :product = product
      >
        <template #button>
          <button 
            @click.prevent = "storeFavouritesProducts.deleteFavouriteProduct(product.id)" 
            type="button" 
            class="btn-close align-self-center" 
            aria-label="Close">
          </button>
        </template>
      </ListedProduct>
    </table>

    <template
      v-else
    >
    <small class="text-body-secondary fs-3 d-block text-center"> Nie masz żadnych ulubionych produktów :(</small>
    </template>
  </div>
</template>

<script setup>
//
// imports
//

  import { onBeforeMount } from 'vue';
  import { useRouter } from 'vue-router';

  // component
  import ListedProduct from '@/components/products/ListedProduct.vue';

  // stores
  import { useStoreFavouritesProducts } from '@/stores/storeFavouritesProducts.js'
  import { useStoreAuth } from '@/stores/storeAuth.js'

// 
// router
// 

  const router = useRouter()

// 
// storeFavouritesProducts
// 

  const storeFavouritesProducts = useStoreFavouritesProducts()

// 
// storeAuth
// 

  const storeAuth = useStoreAuth()

onBeforeMount(() => {
  if (!storeAuth.user.id) {
    router.push({name:'user'})
  }
})

</script>

<style scoped></style>
