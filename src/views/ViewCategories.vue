<template>
  <div class="container-xxl my-5">
    <div v-if="storeProducts.products.list.length != 0 && storeProducts.products.isLoaded">
      
      <h2 class="text-center display-4 mb-5">
        Wybierz Kategorie produktu
        <small class="text-body-secondary fs-3 d-block">Ilość wszystkich produktów: {{ storeProducts.countAllProducts }}</small>
      </h2>
      <div class="row">
        <div
          v-for="(category, categoryKey) in storeProducts.getCategories"
          :key="categoryKey"
          class="col-md-6 mb-3"
        >
          <CategoriesCard :category = category />
        </div>
      </div>
    </div>

    <template
      v-else
    >
      
      <div class="text-center">
        <h2
          class="display-4 mb-5"
          v-if="storeProducts.products.isLoaded"
        >
          Przepraszamy ale nie mamy żadnych produktów
        </h2>

        <div
          class="spinner-border text-dark"
          role="status"
          v-else
        >
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
// 
// import
// 

  // components
  import CategoriesCard from '@/components/products/CategoriesCard.vue';
  // store
  import { useStoreProducts } from '@/stores/storeProducts.js'

// 
// storeProducts
// 

  const storeProducts = useStoreProducts()

</script>

<style scoped></style>
