<template>
  <header><Navbar/></header>
  <main><router-view /></main>
  <footer></footer>
</template>


<script setup>
// 
// imports
// 
  import { RouterView } from 'vue-router'
  import { onMounted } from 'vue'
  import Navbar from '@/components/layout/Navbar.vue'

  // stores
  import { useStoreAuth } from '@/stores/storeAuth'

  const storeAuth = useStoreAuth()

  onMounted(() => {
    storeAuth.init()
  })


</script>


<style>
@import "bootstrap/dist/css/bootstrap.css";

  /* delete box-shadow- bootstrap style */
  .btn-close:focus,
  .navbar-toggler:focus,
  .page-link:focus,
  .accordion-button:focus,
  .form-check-input:focus,
  .form-select:focus
  {
    box-shadow: none;
  }
</style>
