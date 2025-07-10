<template>
  <div
    class="form-check form-check-reverse text-start"
  >
    <label class="form-check-label">
      {{ filterValue }}
    </label>
    <input
      class="form-check-input me-0"
      type="checkbox"
      :checked="isChecked"
      @change="changeCheckboxHandler"
      :value="filterValue"
    />
  </div>
</template>

<script setup>
// 
// imports
// 

  import { computed } from 'vue';


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
      required: true
    },
    filterValue: {
      required: true
    },
  })

// 
// add & del filter  
//

  const changeCheckboxHandler = () => {
    if (!isChecked.value) {
      storeProducts.addFilter(props.filterValue, props.filterKey)
    } else {
      storeProducts.deleteFilter(props.filterValue, props.filterKey)
    }
  }

  const isChecked = computed(() => {
    if (JSON.stringify(storeProducts.getProductsCurrentFilters[props.filterKey]) == JSON.stringify(storeProducts.getProductsFilters[props.filterKey])) {
      return false
    } else {
      return storeProducts.getProductsCurrentFilters[props.filterKey].includes(props.filterValue) ? true : false
    }
  })

</script>
