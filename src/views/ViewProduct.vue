<template>
  <div class="container-xxl mt-2">
    <div class="row align-items-start">
      <div class="col-12 col-md-6">
        <div class="row">
          <div class="col-12 col-md-3 product-images">
            <div class="d-flex flex-md-column align-items-center align-content-center">
              <div 
                v-for="image in product.images"
                :class="{ 'active-image-box' : activeImage === image}"
                class="m-2 overflow-hidden image-box-hover"
              >
                <img
                  @click.prevent="activeImage = image"
                  :src="image" alt="" 
                  :class=" {'product-image-active' : activeImage === image}"
                  class="img-fluid product-image-hover"
                >
              </div>
            </div>
          </div>
          <div
            @mousemove.stop="imageZoomIn"
            @mouseout="imageZoomOut"
            class="col-12 col-md-9 d-flex align-items-center align-content-center overflow-hidden justify-content-center p-0"
          >
            <div>
              <img 
                :src="activeImage" 
                alt=""
                class="img-fluid main-image"
              >
            </div>
          </div>
        </div>
      </div>
      <div class="col-12 col-md-6 text-start">
        <div class="ms-4">
          <h2 class="display-6"> {{ product.brand }} </h2>
          <h3 class="display-6 fw-semibold"> {{ product.title }} </h3>
          <h5 class="fs-3 fw-light"> <small class="text-body-secondary">{{ product.price }} $ </small></h5>
          <p class="mt-2"> {{ product.description }}</p>
          <div>
            <div  
              ref="stars"
              class="position-relative d-inline w-100 croped-star"
            >
              <font-awesome-icon v-for="star in 4" icon="fa-solid fa-star" class="text-warning stars" viewBox="0 0 576 512" />
              <font-awesome-icon icon="fa-solid fa-star" class="text-warning"/>
            </div>
            <span> / 5 <font-awesome-icon icon="fa-solid fa-star" /></span>
          </div>
          <div class="mt-3">
            <button type="button" class="btn btn-outline-dark w-75 me-2">Dodaj do koszyka</button>
            <button
              @click.prevent ="e => handleFavouriteClick(e, product, $router)"
              class="btn btn-outline-dark"
              type="button"
            >  
              <font-awesome-icon
                :class="{'favourite-added' : storeFavouritesProducts.favouritesProducts.includes(product)}"
                icon="fa-solid fa-heart"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="mt-5 more-products">
      <div>
        <h4>Więcej od {{ product.brand }}</h4>
      </div>

      <div class="mt-5 mb-2">
        <h4>Więcej w kategorii {{ product.category }}</h4>
        <!-- more-products scrollbar %% computed product item - BE REACTIVE -->
        <div class="d-flex flex-row overflow-auto"> 
          <template
            v-for="product in storeProducts.getProductsFromCategory(product.category)"
          >
            <ProductCard
              v-if="product.title !== route.params.productName"
              :key = product.id
              :product = product 
              class="me-2"
            />
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

  import { onBeforeMount, onMounted, ref, watch } from 'vue'
  import { useRoute } from 'vue-router'

  // components
  import ProductCard from "@/components/products/ProductCard.vue"

  // stores
  import { useStoreProducts } from '@/stores/storeProducts.js'
  import { useStoreFavouritesProducts } from '@/stores/storeFavouritesProducts.js'

  // composables
  import { handleFavouriteClick } from '@/use/useHandleFavouriteClick'
  
// 
// route
// 

  const route = useRoute()

// 
// define stores
// 

  const storeProducts = useStoreProducts() 
  const storeFavouritesProducts = useStoreFavouritesProducts() 

// 
// product
// 

  const product = ref(...storeProducts.products.list.filter(product => product.title == route.params.productName))

// 
// activeImage
// 

  const activeImage = ref(product.value.images[0])

// 
// imageZoom
// 

  const imageZoomIn = (e) => {
    let rect = e.target.getBoundingClientRect()
    // console.log(rect.x)
    // console.log(e.clientX)
    let offset = e.clientX - rect.x
    e.target.style.transform = `translate(${offset}px,0)`
  }

  const imageZoomOut = (e) => {
    e.target.style.transform = ''
  }

// 
// rating
// 

  const stars = ref()

  //  90 is width of pixels in full five stars rating
  const starsCrop = {
    width: 90 - ((Math.floor(product.value.rating / 5 * 10) / 10) * 90),
    left: ((Math.floor(product.value.rating / 5 * 10) / 10) * 90)
  }


  onMounted(()=> {
    stars.value.style.setProperty('--cropStarsWidth', `${starsCrop.width}px`)
    stars.value.style.setProperty('--cropStarsLeft', `${starsCrop.left}px`)
  })

</script>

<style scoped>

  .product-images {
    overflow: auto;
    max-height: 75vh;
  }
  .product-images::-webkit-scrollbar, 
  .more-products::-webkit-scrollbar {
    width: 20px;
  }
  .product-images::-webkit-scrollbar-track, 
  .more-products::-webkit-scrollbar-track {
    background-color: transparent;
  }
  .product-images::-webkit-scrollbar-thumb, 
  .more-products::-webkit-scrollbar-thumb {
    background-color: #706f6f;
    border-radius: 20px;
    border: 9px solid transparent;
    background-clip: content-box;
  }
  .product-images::-webkit-scrollbar-thumb:hover, 
  .more-products:-webkit-scrollbar-thumb:hover {
    background-color: #706f6f;
  }
  .image-box-hover {
    border: 1.5px solid rgba(0, 0, 0, 0) !important;
  }
  .image-box-hover:hover {
    border-color: black;
  }
  .product-image-hover:hover {
    transition: all 0.15s ease-in;
    transform: scale(1.2);
    cursor: pointer;
  }
  .active-image-box {
    border: 1.5px solid black !important;
  }
  .main-image {
    cursor: zoom-in;
  }
  .main-image:hover {
    transform: scale(2);
  }
  .croped-star::after{
    width: var(--cropStarsWidth);
    height: 100%;
    background-color: white;
    content: " ";
    position: absolute;
    left: var(--cropStarsLeft);
  }

</style>