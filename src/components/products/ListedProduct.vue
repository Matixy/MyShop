<template>
  <div
    @dblclick.prevent="$router.push({ name: 'product', params: {productName: product.title}})"
    class="container-fluid text-center border-bottom cursor-pointer"
  >
    <div class="row align-self-center">
      <div
        :style="`background-image: url(${product.thumbnail});`"
        class="col overflow-hidden image-listed align-self-center"
      >
      </div>
      <div class="col-4 align-self-center text-start ps-3">
        <p class="font-size-small fw-bold mb-0">{{ product.title }} </p>
        <p class="font-size-small mb-0">{{ product.brand }}</p>
      </div>
      <div class="col-4 align-self-center">
        <h5 class="text-danger">{{ product.price }} $</h5>
      </div>
      <slot name="button">

      </slot>
    </div>
  </div>
</template>

<script setup>
// 
// props
// 

  const props = defineProps({
    product: {
      type: Object,
      required: true
    }
  })

</script>

<style scoped>

  .font-size-small {
    font-size: 0.75rem;
  }

  .image-listed{
    background-position: left;
    background-repeat: no-repeat;
    background-size: contain;
    width: 100%;
    height: 5em;
  }

  @media (max-width: 575.98px) {   
    .image-listed{
      width: 5em;
    } 
  }

</style>