<template>
  <div class="accordion accordion-flush border-bottom border-black">
    <div class="accordion-item">
      <h2 class="accordion-header">
        <button
          @click.prevent="showAcordionOptions"
          class="accordion-button fw-bold collapsed"
          type="button"
        >
          {{ convertToTitleCase(filterKey) }}
        </button>
      </h2>
      <div class="accordion-collapse collapse">
        <div class="accordion-body">
          <div 
            v-if="filtersToCheckboxLayout.includes(filterKey)"
            class="filter-checkbox-scroll"
          >
            <FilterCheckboxLayout
              v-for= "(filterValue , filterValueIndex) in filterValues"
              :key="filterValueIndex"
              :filterKey = filterKey
              :filterValue = filterValue
            >
            </FilterCheckboxLayout>
          </div>
          
          <div
            v-else
          >
            <FilterRangeLayout
              :filterKey = filterKey
            >

            </FilterRangeLayout>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// 
// imports 
// 

  // components
  import FilterCheckboxLayout from '@/components/filters/filters-layout/FilterCheckboxLayout.vue';
  import FilterRangeLayout from '@/components/filters/filters-layout/FilterRangeLayout.vue';

  // composables
  import { convertToTitleCase } from '@/use/useConvertCamelToTitleCase'

// 
// props
// 

  const props = defineProps({
    filterKey: {
      type: String,
      required: true
    },
    filterValues: {
      required: true
    }
  })

// 
// filterToCheckboxLayout
// 

  const filtersToCheckboxLayout = ['brand', 'category']

// 
// showAcordionOptions
// 

  const showAcordionOptions = (e) => {
    let accordion = e.target.closest('.accordion')
    let accordionCollapse = accordion.querySelector('.accordion-collapse')

    e.target.classList.toggle('collapsed')
    accordionCollapse.classList.toggle('show')
  }
</script>

<style scoped>
.accordion-button:not(.colapsed) {
  background-color: inherit;
  box-shadow: none;
}
</style>

<style scoped>

.filter-checkbox-scroll {
  overflow-y: auto;
  max-height: 11em;
}


</style>