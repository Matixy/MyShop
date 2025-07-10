<template>
  <div class="container">
    <div class="d-flex align-items-center">
      <input
        v-model="minInputValue"
        @blur="watchCorrectMinValue"
        :min="storeProducts.getProductsFilters[filterKey].minValue"
        :max="storeProducts.getProductsCurrentFilters[filterKey].maxValue - 1"
        class="form-control m-2"
        type="number"
      >
      <span>-</span>
      <input
        v-model="maxInputValue"
        @blur="watchCorrectMaxValue"
        :min="storeProducts.getProductsCurrentFilters[filterKey].minValue + 1"
        :max="storeProducts.getProductsFilters[filterKey].maxValue"
        class="form-control m-2"
        type="number"
      >
    </div>
    <div class="d-flex justify-content-center">
      <button
        @click.prevent="clearFilterHandler"
        class="btn btn-outline-danger m-2"
        type="button"
      >Wyczyść</button>

      <button
        @click.prevent="saveFilter"
        class="btn btn-outline-dark m-2"
        type="button"
      >Zapisz</button>
    </div>
  </div>
</template>

<script setup>
// 
// imports
// 

  import { ref, watch } from 'vue';
  import { useRoute } from 'vue-router';
  // stores
  import { useStoreProducts } from '@/stores/storeProducts.js'

// 
// storeProducts
// 

  const storeProducts = useStoreProducts()

// 
// props
// 

  const props = defineProps({
    filterKey: {
      type: String,
      required: true
    }
  })

// 
// route
// 

  const route = useRoute()

// 
// minInputValue // maxInputValue & filters functions
// 

  const minInputValue = ref(storeProducts.getProductsCurrentFilters[props.filterKey].minValue)
  const maxInputValue = ref(storeProducts.getProductsCurrentFilters[props.filterKey].maxValue)
  
  const saveFilter = () => {
    storeProducts.addFilter({
      minValue: minInputValue.value,
      maxValue: maxInputValue.value
    }, props.filterKey)
  }

  const clearFilterHandler = () => {
    storeProducts.clearFilter(props.filterKey)
    minInputValue.value = storeProducts.getProductsFilters[props.filterKey].minValue
    maxInputValue.value = storeProducts.getProductsFilters[props.filterKey].maxValue
  }

  const watchCorrectMinValue = () => {
    if (minInputValue.value >= maxInputValue.value) minInputValue.value = maxInputValue.value - 1

    if (minInputValue.value < storeProducts.getProductsFilters[props.filterKey].minValue) minInputValue.value = storeProducts.getProductsFilters[props.filterKey].minValue

  }

  const watchCorrectMaxValue = () => {
    if (minInputValue.value >= maxInputValue.value) maxInputValue.value = minInputValue.value + 1

    if (maxInputValue.value > storeProducts.getProductsFilters[props.filterKey].maxValue) maxInputValue.value = storeProducts.getProductsFilters[props.filterKey].maxValue

  }

// 
// reset values when change product 
// 

  watch(()=> route.query, (newPath, oldPath)=> {
    try {
      let newFilters = JSON.parse(newPath.filters)
      let oldFilters = JSON.parse(newPath.filters)
      if (JSON.stringify(newFilters[props.filterKey]) !== JSON.stringify(oldFilters[props.filterKey])) {
        minInputValue.value = storeProducts.getProductsFilters[props.filterKey].minValue
        maxInputValue.value = storeProducts.getProductsFilters[props.filterKey].maxValue
      }
    } catch {
      minInputValue.value = storeProducts.getProductsFilters[props.filterKey].minValue
      maxInputValue.value = storeProducts.getProductsFilters[props.filterKey].maxValue
    }
  })
  
</script>