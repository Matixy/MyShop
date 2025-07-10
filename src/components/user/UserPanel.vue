<template>
  <div class="container-xxl mt-3 text-center">
    <div class=" mb-3 ">
      <div class="d-flex justify-content-center align-items-center">
        <span class="px-2 py-1 me-2 border border-dark border-2 rounded-5 img-thumbnail">
          <font-awesome-icon icon="fa-solid fa-user"/>
        </span>
        <h2 class="m-0">{{ storeAuth.user.displayName }}</h2>
      </div>
      <small> {{  storeAuth.user.email }} </small>
    </div>
    <div>
      <h3>Twoje zakupy: </h3>
      <div class="container text-center p-2">
        <div v-for="i in 3" class="row justify-content-center align-items-center align-items-stretch border border-bottom-0 m-auto mb-4">
          <div class="col-md-3 p-2 border-end border-bottom d-flex align-items-center justify-content-center">
            <p class="fs-5 m-0 ">Zamówienie <span class="fw-bold">#23137</span></p>
          </div>
          <div class="col-md-3 p-2 border-end border-bottom d-flex align-items-center justify-content-center">
            <p class="m-0">Data: <span class="fw-bold">25.06.2023</span></p>
          </div>
          <div class="col-md-3 p-2 border-end border-bottom d-flex align-items-center justify-content-center">
            <p class="m-0">Koszt całkowity: <span class="fw-bold">23$</span></p>
          </div>
          <div class="col-md-3 p-2 border-bottom d-flex align-items-center justify-content-center">
            <p class="m-0"> <router-link to="/" class="text-dark">Szczegóły zamówienia</router-link></p>
          </div>
        </div>
      </div>
    </div>
    <button @click="storeAuth.logoutUser" class="btn btn-outline-dark mb-3">Wyloguj się</button>
  </div>
</template>
<script setup>
// 
// import
// 

  // auth store
  import { useStoreAuth } from '@/stores/storeAuth'

  // components
  import ListedProduct from "@/components/products/ListedProduct.vue"

// 
// store
// 

  const storeAuth = useStoreAuth()



</script>

<style scoped>
p {
  margin: 0;
}


</style>