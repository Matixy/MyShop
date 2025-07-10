<template>
  <div
    class="row align-items-start mb-1 px-2 pt-2 pb-sm-0 pb-1 bg-body-secondary"
  >
    <div class="col-sm-4 col-12 mb-0">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">Produkty</li>
          <li class="breadcrumb-item fw-bolder">
            {{ convertToTitleCase(route.params.category) }}
          </li>
        </ol>
      </nav>
    </div>

    <div class="col-sm-4 col-6 mb-0 text-center">
      <div class="btn-group d-inline-block" ref="dropdownSortOptionsRef">
        <button
          @click.prevent="showSortOptions = !showSortOptions"
          ref="sortOptionsButtonRef"
          class="btn btn-outline-dark dropdown-toggle position-relative"
          type="button"
        >
          Sortuj
          <font-awesome-icon icon="fa-solid fa-sort" class="ms-2" />
        </button>
        <ul v-if="showSortOptions" class="dropdown-menu dropdown-menu-end show">
          <li>
            <button
              @click.prevent="sortOptionsClick('priceDESC') "
              :class="{ active: activeSortOption ===  'priceDESC'}"
              class="dropdown-item"
              type="button"
            >Cena od najwyższej</button>
          </li>
          <li>
            <button
              @click.prevent="sortOptionsClick('priceASC') "
              :class="{ active: activeSortOption ===  'priceASC'}"
              class="dropdown-item"
              type="button"
            >Cena od najniższej</button>
          </li>
          <li>
            <button
              @click.prevent="sortOptionsClick('titleASC') "
              :class="{ active: activeSortOption ===  'titleASC'}"
              class="dropdown-item"
              type="button"
            >Nazwa od A do Z</button>
          </li>
          <li>
            <button
              @click.prevent="sortOptionsClick('titleDESC') "
              :class="{ active: activeSortOption ===  'titleDESC'}"
              class="dropdown-item"
              type="button"
            >Nazwa od Z do A</button>
          </li>
        </ul>
      </div>
    </div>

    <div class="col-sm-4 col-6 mb-0 text-center">
      <button
        @click.prevent="showFiltersOptions = !showFiltersOptions"
        ref="filterOptionsButtonRef"
        class="btn btn-outline-dark dropdown-toggle"
        type="button"
      >
        Filtruj
        <font-awesome-icon icon="fa-solid fa-filter" class="ms-2" />
      </button>

      <div
        ref="offcanvasFiltersRef"
        class="offcanvas offcanvas-end text-start"
        :class="{ 'show ' : showFiltersOptions, 'hiding' : !showFiltersOptions}"
        tabindex="-1"
      >
        <div class="offcanvas-header">
          <h5 class="offcanvas-title">Filtruj</h5>
          <button
            @click.prevent="showFiltersOptions = false"
            type="button"
            class="btn-close"
          ></button>
        </div>
        <div class="offcanvas-body">
          <FilterAccordionMenu 
            v-for="(filterValues, filterKey) in storeProducts.getProductsFilters"
            :key= filterKey
            :filterKey = filterKey
            :filterValues = filterValues
          />
        </div>
      </div>
    </div>
  </div>

  <div class="row align-items-center px-2 pb-0 bg-body-secondary">
    <div class="col-6 col-sm-8">
      <p class="mb-1">Liczba produktów: {{ productsLength }}</p>
    </div>

    <div class="col-6 col-sm-4 mb-1">
      <select
        @change="$emit('update:modelValue', $event.target.value)"
        :value="modelValue"
        class="form-select form-select-sm m-auto w-auto"
        aria-label="Select number of products on side"
      >
        <option selected value="15">15 na stronie</option>
        <option value="30">30 na stronie</option>
        <option value="45">45 na stronie</option>
        <option value="100">100 na stronie</option>
      </select>
    </div>
  </div>
</template>

<script setup>
// 
// import
// 

  import { ref, computed } from "vue";
  import { useRoute, useRouter } from "vue-router";
  import { onClickOutside } from '@vueuse/core'

  // components
  import FilterAccordionMenu from "@/components/filters/FilterAccordionMenu.vue";

  // composables
  import { convertToTitleCase } from '@/use/useConvertCamelToTitleCase'
  import { changeSpecificQueryParam } from '@/use/useChangeSpecificQueryParam'

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
    modelValue: {
      required: true
    },
    productsLength: {
      type: Number,
      required: true
    }
  })

//
// route & router
//

  const route = useRoute()
  const router = useRouter()

// 
// activeSortOption
// 

  const activeSortOption = computed(()=> route.query.orderBy ? JSON.parse(route.query.orderBy) : undefined)

// 
// sortOptionsClick
// 

  const sortOptionsClick = (sortOption) => {
    if (sortOption === activeSortOption.value) sortOption = undefined

    sortOption = JSON.stringify(sortOption)

    changeSpecificQueryParam('orderBy', route, router, sortOption)
    showSortOptions.value = false
  }

// 
//  showSortOptions & showFiltersOptions
// 

  const showSortOptions = ref(false)
  const showFiltersOptions = ref(false)
  
  const offcanvasFiltersRef = ref(null)
  const dropdownSortOptionsRef = ref(null)

  const sortOptionsButtonRef = ref(null)
  const filterOptionsButtonRef = ref(null)

  onClickOutside(offcanvasFiltersRef, () => showFiltersOptions.value = false, {
    ignore: [filterOptionsButtonRef]
  })
  onClickOutside(dropdownSortOptionsRef, () => showSortOptions.value = false, {
    ignore: [sortOptionsButtonRef]
  })

</script>

<style scoped>

.dropdown-toggle::after {
  display: none;
}

</style>