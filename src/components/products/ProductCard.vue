<template class="product-card cursor-pointer" >
  <div
    @dblclick="$router.push({name: 'product', params: {productName: product.title}})"
    class="col-md-4 mb-3 d-flex align-items-stretch"
  >
    <div class="card border-dark w-100 product-card cursor-pointer">
      <div class="card-header text-center">{{product.brand}}</div>
      <div
        @mouseover="moveSlider"
        @mouseleave="returnSlider"
        class="overflow-hidden product-images"
      >
        <div
          @click.stop="e => handleFavouriteClick(e, product, $router)"
          :class="{'favourite-added' : storeFavouritesProducts.favouritesProducts.includes(props.product)}"
          class="z-2 position-absolute start-100 fav-icon p-2"
        >
          <font-awesome-icon icon="fa-solid fa-heart" class="mx-2" />
        </div>
        <div
          :id="`carousel-${product.id}`"
          class="carousel slide carousel-fade"
          data
        >
          <div class="carousel-inner">
            <div class="carousel-item active text-center">
              <img :src="product.thumbnail" class="img-card" :alt="`${product.title} image`">
            </div>
            <div
              v-for="image in product.images.slice(1)"
              class="carousel-item text-center"
            >
              <img :src="image" class="img-card" alt="...">
            </div>
          </div>
          <button
            class="carousel-control-prev carousel-controls bg-dark"
            @click.stop=""
            data-bs-slide="prev"
            :data-bs-target="`#carousel-${product.id}`"
            type="button"
          >
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button
            class="carousel-control-next carousel-controls bg-dark"
            @click.stop=""
            data-bs-slide="next"
            :data-bs-target="`#carousel-${product.id}`"
            type="button"
          >
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <div class="card-body d-flex flex-column justify-content-between">
        <div>
          <h5 class="card-title">{{product.title}}</h5>
          <p class="card-text">{{product.description}}</p>
          <p class="card-text">Ocena: {{product.rating}}</p>
        </div>
        <div class="text-center pt-3">
          <a class="btn btn-outline-dark">Kup {{product.price}} $</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// 
// imports
// 

  import { onMounted } from 'vue'

  // store
  import { useStoreFavouritesProducts } from '@/stores/storeFavouritesProducts.js'

  // composables
  import { handleFavouriteClick } from '@/use/useHandleFavouriteClick'

// 
// storeFavouritesProducts
// 

  const storeFavouritesProducts = useStoreFavouritesProducts()

// 
// props
// 

  const props = defineProps({
    product: {
      type: Object,
      required: true
    }
  })

// 
// product slider
// 

  let productSlider

// 
// slider is moving when hover to image
// 

  const moveSlider = () => {
    productSlider.cycle()
  }

  const returnSlider = () => {
    productSlider.pause()
    productSlider.to(0)
  }

// 
// set productSlider when component is mounted
// 

  onMounted(()=> {
    productSlider = new bootstrap.Carousel(document.querySelector(`#carousel-${props.product.id}`), {
      interval: 5000,
      ride: false,
      pause: false
    })
  })

</script>

<style scoped>
  .img-card {
    height: 10em;
  }

  .carousel-controls{
    transform: translateY(100%);
    transition: all 0.15s ease-in;
  }

  .product-images:hover .carousel-controls{
    transform: translateY(0%);
  }

</style>
