<template>
  <div
    class="modal show"
  >
    <div class="modal-dialog modal-lg">
      <div
        ref="searchProductsModalRef"
        class="modal-content"
      >
        <div class="modal-body">
          <div class="input-group mb-3">
            <span class="input-group-text">
              <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
            </span>
            <input
              v-autofocus
              v-model="searchProductName"
              class="form-control"
              placeholder="Wyszukaj produkt"
              type="text"
            >
            <button
              @click="$emit('hideSearchProducts')"
              aria-label="Close"
              class="btn-close ms-2 align-self-center"
              type="button"
            ></button>
          </div>

          <div
            v-if="matchingProducts.length"
            class="table table-hover listed-products"
          >
            <ListedProduct 
              v-for="product in matchingProducts"
              :product = product
            >
            </ListedProduct>
          </div>

          <template v-else>
            <p
              class="text-center text-secondary"
              v-if="searchProductName == ''"
            >Wpisz coś aby wyszukać swój produkt</p>

            <p
              class="text-center text-secondary"
              v-else
            >Nie ma takiego produktu</p>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// 
// imports
// 

  import { ref, computed } from 'vue';
  import { onClickOutside } from '@vueuse/core'

  // component
  import ListedProduct from '@/components/products/ListedProduct.vue';

  // stores
  import { useStoreProducts } from '@/stores/storeProducts.js'

// 
// storeProducts
// 

  const storeProducts = useStoreProducts()

// 
// emits
// 

  const emit = defineEmits(['hideSearchProducts'])

// 
// searching products
// 

  const searchProductName = ref('')

  const matchingProducts = computed(() => {
    if (searchProductName.value) {
      return storeProducts.products.list.filter(product => product.title.toLowerCase().startsWith(searchProductName.value.toLowerCase()))
    } else {
      return []
    }
  })

// 
// showSearchProducts
// 

  const searchProductsModalRef = ref(null)

  onClickOutside(searchProductsModalRef, () => {
      emit('hideSearchProducts')
    }
  )

// 
// autofocus input
// 

  const vAutofocus = {
    mounted(e) {
      e.focus()
    },
  }

</script>

<style scoped>

body {
  background-color: grey;
}

.modal {
  background-color: rgba(128, 128, 128, 0.404);
  display: block;
}

.listed-products{
  max-height: 60vh;
  overflow-y: auto;
}

</style>
