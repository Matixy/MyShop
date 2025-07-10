<template>
  <div class="card text-center mb-3">
    <div class="card-body">
      <h5 class="card-title">{{ convertToTitleCase(category.name) }}</h5>
      <p class="card-text"></p>
      <router-link :to="`products/${category.name}`" class="btn btn-outline-dark">Zobacz produkty</router-link>
    </div>
    <div class="card-footer text-body-secondary">
      Ilość produktów: {{ category.numberOfProducts }}
    </div>
  </div>
</template>

<script setup>
// 
// import
// 

  // composables
  import { convertToTitleCase } from '@/use/useConvertCamelToTitleCase'

// 
// props
// 

  const props = defineProps({
    category: {
      type: Object,
      required: true
    }
  })

</script>
